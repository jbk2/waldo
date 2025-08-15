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
        <p className="inline text-md text-gray-600">A toy Where's Waldo app, built by</p>
        <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">&nbsp;James Kemp</a>
        <p className='inline'>, to demonstrate use of the following libraries, technologies & techniques:</p>
        <span className="inline ml-2">
          <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">View the code</a>
        </span>
      </div>
      <div id="rails" className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 m-6'>
        <section id="rails-app" className='max-w-140'>
          <div className='flex mb-2 ml-1'>
            <img src={railsLogo} alt="rails logo" className='w-22' />
            <p className='inline text-[#CC0000] text-[0.8rem] font-variation-settings-wght-700 mt-[22px] ml-[2px]'>API</p>
          </div>
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
        <section id="rails-testing" className='max-w-140'>
          <div className='flex mb-2 ml-1'>
            <img src={rspecLogo} alt="rspec logo" className='w-8' />
            <p className='inline text-red-600 text-[0.8rem] font-variation-settings-wght-700 mt-[21px] ml-1'>RSPEC</p>
          </div>
          <ul className="pl-6 list-disc list-outside">
            <li className="leading-6 text-[14px] text-gray-800">Use of factories, fixtures, selenium.</li>
            <li className="leading-6 text-[14px] text-gray-800">All models, jobs, channels and mailers unit and where relevant integration tested.</li>
            <li className="leading-6 text-[14px] text-gray-800">Request and authentication tested on all routes.</li>
            <li className="leading-6 text-[14px] text-gray-800">System tests for all key features and user actions tested.</li>
          </ul>
        </section>
      </div>

      <br />
      <hr className='mx-auto max-w-[85vw] border-blue-500'/>
      <br />

      <div id="react" className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 m-6'>
        <section id="react-app" className='max-w-140'>
          <div className='flex mb-2 ml-1'>
            <img src={reactLogo} alt="react logo" className='w-8' />
            <p className='inline text-red-600 text-[0.8rem] font-variation-settings-wght-700 mt-[21px] ml-1'>RSPEC</p>
          </div>
          <ul className="pl-6 list-disc list-inside">
            <li className="leading-5 text-[14px] text-gray-800">Containerised microservice architecture on a manually configured AWS EC2 Ubuntu instance.</li>
            <li className="leading-5 text-[14px] text-gray-800">Docker built &amp; composed 5 services (ECR & docker-hub); web, sidekiq, nginx, postgres, redis.</li>
            <li className="leading-5 text-[14px] text-gray-800">Nginx web server, SSL only.</li>
            <li className="leading-5 text-[14px] text-gray-800">Bash scripting & systemd automates DNS records and server updates.</li>
          </ul>
        </section>
        
        <section id="react-testing" className='max-w-140'>
          <div className='flex mb-2 ml-1'>
            <img src={viteLogo} alt="vite logo" className='w-8' />
            <p className='inline text-red-600 text-[0.8rem] font-variation-settings-wght-700 mt-[21px] ml-1'>RSPEC</p>
          </div>
          <ul className="pl-6 list-disc list-inside">
            <li className="leading-5 text-[14px] text-gray-800">Containerised microservice architecture on a manually configured AWS EC2 Ubuntu instance.</li>
            <li className="leading-5 text-[14px] text-gray-800">Docker built &amp; composed 5 services (ECR & docker-hub); web, sidekiq, nginx, postgres, redis.</li>
            <li className="leading-5 text-[14px] text-gray-800">Nginx web server, SSL only.</li>
            <li className="leading-5 text-[14px] text-gray-800">Bash scripting & systemd automates DNS records and server updates.</li>
          </ul>
        </section>
      </div>
    </div>    
  )
}
