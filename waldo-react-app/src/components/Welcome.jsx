import daisyUiLogo from '../assets/images/logos/daisyui-logotype.svg';
import htmlLogo from '../assets/images/logos/html5-logo.svg';
import postgresLogo from '../assets/images/logos/postgres-logo.svg';
import railsLogo from '../assets/images/logos/rails-logo.svg';
import rspecLogo from '../assets/images/logos/rspec-logo.svg';
import tailwindcssLogo from '../assets/images/logos/tailwindcss-logotype.svg';
import viteLogo from '../assets/images/logos/vite-logo.svg';
import reactLogo from '../assets/images/logos/react-logo.svg';

export default function Welcome() {

  
  return(
    <div className='m-6'>
      <div id="intro-text" className='max-w-180 mx-auto'>
        <p className="inline text-md">A facebook clone app, built by James Kemp, to demonstrate use of the following libraries, technologies & techniques: </p>
        <span className="inline ml-2"><a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">View the code</a></span>
      </div>
      <div id="rails" className='flex flex-col lg:flex-row justify-center gap-4 m-6'>
        <div id="rails-app" className='max-w-140'>
          <section>
            <ul className="">
              <li className="leading-7 pl-2 text-[14px] text-gray-800">🖇️&nbsp;&nbsp;Complex forms; nesting, custom actions, hotwire.</li>
              <li className="leading-7 pl-2 text-[14px] text-gray-800">👫&nbsp;&nbsp;Advanced associations; many to many, custom validation, callbacks, delegation.</li>
              <li className="leading-7 pl-2 text-[14px] text-gray-800">🔐&nbsp;&nbsp;Authentication with Devise; devise controller extension.</li>
              <li className="leading-7 pl-2 text-[14px] text-gray-800">⚙️&nbsp;&nbsp;Helpers & POROs:</li>
              <ul className="pl-6 list-disc list-inside">
                <li className="leading-5 text-[14px] text-gray-800">Hand built image processing; size, format, purge, via ActiveStorage (direct serve) & Vips.</li>
                <li className="leading-5 text-[14px] text-gray-800">Helpers; time formatting in views, devise controller & action helpers, conversation service.</li>
              </ul>
              <li className="mt-1 leading-7 pl-2 text-[14px] text-gray-800">🔔&nbsp;&nbsp;Notifications; hand built message UI Notification service.</li>
              <li className="mt-1 leading-7 pl-2 text-[14px] text-gray-800">📥&nbsp;&nbsp;ActiveJob;</li>
              <ul className="pl-6 list-disc list-inside">
                <li className="leading-5 text-[14px] text-gray-800">ProcessImageJob; size and format processing of uploaded images.</li>
                <li className="leading-5 text-[14px] text-gray-800">BroadcastMessageJob; building and broadcasting user scoped messages & conversations.</li>
                <li className="leading-5 text-[14px] text-gray-800">MessageNotificationJob; managing UI notifications for message read state.</li>
              </ul>
              <li className="mt-1 leading-7 pl-2 text-[14px] text-gray-800">🗄️&nbsp;&nbsp;ActiveStorage; attachments, variants, metadata, direct serve. </li>
              <li className="mt-1 leading-7 pl-[6px] text-[14px] text-gray-800">
                <span className="mr-[3px]"><img src={postgresLogo} alt="postgres logo" className='w-5'/></span>
                ActiveRecord; postgres, seeding, attachments, variants, metadata, direct serve.
              </li>
              <li className="leading-7 pl-2 text-[14px] text-gray-800">🔌&nbsp;&nbsp;ActionCable; managing conversation scoped subcriptions and broadcast DOM updates.</li>
              <li className="leading-7 pl-2 text-[14px] text-gray-800">📧&nbsp;&nbsp;ActionMailer; user_mailer sends welcome_email on user sign ups.</li>
            </ul>
          </section>
        </div>
        <section id="rails-testing" className='max-w-140'>
          <ul>
            <li className="leading-7 mb-2">
              <h3 className="text-lg font-jost italic font-black">TESTING</h3>
            </li>
            <ul className="pl-6 list-disc list-inside">
              <li className="leading-5 text-[14px] text-gray-800">Use of factories, fixtures, selenium.</li>
              <li className="leading-5 text-[14px] text-gray-800">All models, jobs, channels and mailers unit and where relevant integration tested.</li>
              <li className="leading-5 text-[14px] text-gray-800">Request and authentication tested on all routes.</li>
              <li className="leading-5 text-[14px] text-gray-800">System tests for all key features and user actions tested.</li>
            </ul>
          </ul>
        </section>
      </div>

      <br />
      <hr className='mx-auto max-w-[85vw] border-blue-500'/>
      <br />

      <div id="react">
        <section id="react-app">
        </section>
        
        <section id="react-testing">
         <ul>
          <li classNameName="leading-7 mb-2">
            <h3 className="text-lg font-jost italic font-black">DEVOPS</h3>
          </li>
          <ul className="pl-6 list-disc list-inside">
            <li className="leading-5 text-[14px] text-gray-800">Containerised microservice architecture on a manually configured AWS EC2 Ubuntu instance.</li>
            <li className="leading-5 text-[14px] text-gray-800">Docker built &amp; composed 5 services (ECR & docker-hub); web, sidekiq, nginx, postgres, redis.</li>
            <li className="leading-5 text-[14px] text-gray-800">Nginx web server, SSL only.</li>
            <li className="leading-5 text-[14px] text-gray-800">Bash scripting & systemd automates DNS records and server updates.</li>
          </ul>
         </ul>
        </section>
      </div>
    </div>    
  )
}
