class Api::TestController < ApplicationController
  skip_before_action :require_authentication
  before_action :ensure_test_environment

  # create User fixture records in test db
  def load_user_fixtures
    Rails.logger.info "\e[42;1mLoading fixtures...\e[0m"
    User.destroy_all

    fixture_path = Rails.root.join("spec", "fixtures")
    fixture_file = fixture_path.join("users.yml")
    if File.exist?(fixture_file)
      puts "\e[42;1mFixture file exists and is readable\e[0m"
    else
      puts "\e[41;1mERROR: Fixture file not found!\e[0m"
      return render json: { error: "Fixture file not found" }, status: :unprocessable_entity
    end

    # Load fixtures with explicit transaction control and state clearing
    ActiveRecord::Base.transaction do
      begin
        puts "\e[42;1mStarting fixture loading in transaction\e[0m"
        
        if defined?(ActiveRecord::FixtureSet)
          ActiveRecord::FixtureSet.reset_cache
          puts "\e[42;1mCleared fixture cache\e[0m"
        end

        # Force reload of fixtures by creating a new fixture set
        fixture_set = ActiveRecord::FixtureSet.create_fixtures(fixture_path, ["users"])
        puts "\e[42;1mFixture loading completed without exception\e[0m"
        puts "\e[42;1mFixture set size: #{fixture_set.size}\e[0m"

        # Verify users were created within the transaction
        user_count = User.count
        puts "\e[42;1mUsers in transaction: #{user_count}\e[0m"

        if user_count == 0
          puts "\e[41;1mERROR: No users created in transaction!\e[0m"
          raise ActiveRecord::Rollback
        end
      rescue => e
        puts "\e[41;1mERROR during fixture loading: #{e.message}\e[0m"
        puts "\e[41;1mBacktrace: #{e.backtrace.first(3).join("\n")}\e[0m"
        raise ActiveRecord::Rollback
      end
    end

    # Debug: check if users were actually created
    user_count = User.count
    Rails.logger.info "\e[42;1mFixtures loaded successfully - #{user_count} users created\e[0m"
    render json: { message: "Fixtures loaded successfully", user_count: user_count }
  end

  # Reset entire test database to clean state
  def cleanup
    Rails.logger.info "\e[42;1mCleaning up test database...\e[0m"

    User.destroy_all
    Session.destroy_all
    Character.destroy_all
    Image.destroy_all

    Rails.logger.info "\e[42;1mTest database cleanup complete\e[0m"
    render json: { message: "Test database cleanup complete" }
  end

  # Return all fixture users' ids and emails (no passwords for security)
  def user_fixtures
    Rails.logger.info "\e[42;1mGetting fixture users...\e[0m"
    puts "\e[42;1mGetting fixture users...\e[0m"

    users = User.all.map do |user|
      {
        id: user.id,
        email_address: user.email_address,
      }
    end

    Rails.logger.info "\e[42;1mReturning #{users.length} fixture users data\e[0m"
    puts "\e[42;1mReturning #{users.length} fixture users data\e[0m"
    render json: { users: users }
  end

  # Return Rails environment info
  def environment_check
    Rails.logger.info "\e[42;1mGetting Rails environment...\e[0m"

    render json: { 
      environment: Rails.env,
      database: Rails.configuration.database_configuration[Rails.env]['database']
    }
  end


  def generate_password_reset_token
    email_address = params[:email_address]
    user = User.find_by(email_address: email_address)

    if user
      token = user.password_reset_token
      render json: { 
        token: token,
        email_address: email_address,
        message: "Password reset token generated for testing"
      }
    else
      render json: { 
        error: "User not found with email: #{email_address}" 
      }, status: :not_found
    end
  end

  private
  def ensure_test_environment
    unless Rails.env.test?
      render json: { error: "Test endpoints only available in test environment" }, 
             status: :forbidden
    end
  end
end 