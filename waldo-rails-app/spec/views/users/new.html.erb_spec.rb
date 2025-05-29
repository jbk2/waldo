require 'rails_helper'

RSpec.describe "users/new.html.erb", type: :view do
  describe 'new user form' do
    it 'has a form to create a new user' do
      assign(:user, User.new)
      render
      expect(rendered).to have_field('Password')
      expect(rendered).to have_field('Password confirmation')
      expect(rendered).to have_button('Create User')
    end
  end
end
