import daisyUiLogo from '../assets/images/logos/daisyui-logotype.svg';
import htmlLogo from '../assets/images/logos/html5-logo.svg';
import postgresLogo from '../assets/images/logos/postgres-logo.svg';
import railsLogo from '../assets/images/logos/rails-logo.svg';
import rspecLogo from '../assets/images/logos/rspec-logo.svg';
import tailwindcssLogo from '../assets/images/logos/tailwindcss-logotype.svg';
import viteLogo from '../assets/images/logos/vite-logo.svg';
import reactLogo from '../assets/images/logos/react-logo.svg';
import reactRouterLogo from '../assets/images/logos/react-router-logo.svg';

export default function Welcome() {

  
  return(
    <div className='mt-[4vh] md:mt-[7vh] xl:mt-[10vh] mx-4'>
      <div id="intro-text" className='max-w-180 mx-auto'>
        <p className="inline text-md text-gray-600">A toy Where's Waldo app, built by</p>
        <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">&nbsp;James Kemp</a>
        <p className='inline'>, to demonstrate use of the following libraries, technologies & techniques:&nbsp;</p>
        <div className='flex gap-20 md:gap-30 xl:gap-50 justify-center mt-3.5'>
          <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">Code repo</a>
          <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">Detailed readme</a>
        </div>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 mx-4 my-10'>
        <section id="rails" className='max-w-140'>
          <div id='section-header' className='flex gap-10 mb-3.5'>
            <div className='flex w-25'>
              <img src={railsLogo} alt="rails logo" className='w-22 inline' />
              <p className='inline text-[#CC0000] text-[0.8rem] font-variation-settings-wght-700 mt-[21px] ml-[2px]'>API</p>
            </div>
            <p className='text-3xl inline self-end w-6 mt-2'>+</p>
            <div className='flex w-25'>
              <img src={rspecLogo} alt="rspec logo" className='w-8 mt-1 inline' />
              <p className='inline text-red-600 text-[0.8rem] font-variation-settings-wght-700 mt-[21px] ml-1'>Rspec</p>
            </div>
          </div>
          <div className='grid grid-cols-[24px_auto] gap-2 text-sm text-gray-800'>
            <p className=''>🔄</p>
            <p className=''>Rails API app - API namespaced routes and controllers.</p>
            <p className=''>🔐</p>
            <p className=''>Rails 8 authentication implementation.</p>
            <p className=''>🗄️</p>
            <p className=''>ActiveStorage; attachments, variants.</p>
            <img src={postgresLogo} alt="postgres logo" className='w-[16px] inline'/>
            <p className=''>ActiveRecord; postgres, seeding, attachments.</p>
            <p className=''>📧</p>
            <p className=''>ActionMailer – transactional sign up and password reset mailers.</p>
            <img src={rspecLogo} alt="rspec logo" className='w-[17px] inline'/>
            <p className=''>All routes, models & mailers unit tested with Rspec.</p>
          </div>
        </section>
        <section id="react" className='max-w-140'>
          <div id='section-header' className='flex gap-10 mb-3.5'>
            <div className='flex w-25'>
              <img src={reactLogo} alt="react logo" className='w-9 inline' />
              <p className='inline text-[0.8rem] font-variation-settings-wght-500 mt-[21px] ml-[2px]'>React</p>
            </div>
            <p className='text-3xl inline self-end w-6 mt-2'>+</p>
            <div className='flex w-25'>
              <img src={viteLogo} alt="vite logo" className='w-7 mt-1 inline' />
              <p className='inline text-[0.8rem] font-variation-settings-wght-500 mt-[21px] ml-1'>Vite</p>
            </div>
          </div>
          <div className='grid grid-cols-[24px_auto] gap-2 text-sm text-gray-800'>
            <p className=''>🪝</p>
            <p className=''>Hooks; all the usual, custom useReducers.</p>
            <img src={reactRouterLogo} alt="react router logo" className='w-[16px] inline mt-[5px]'/>
            <p className=''>React Router; fully routed, declaratively, sprinkles of data mode.</p>
            <p className=''>📦</p>
            <p className=''>Heavy use of Context API for housing state.</p>
            <p className=''>🛠️</p>
            <p className=''>Utils - fetch from Rails API code held within servie utilities.</p>
            <p className=''>✅</p>
            {/* <img src={viteLogo} alt="vite logo" className='w-[16px] inline mt-[5px]'/> */}
            <p className=''>Full mocked component unit testing with Vite.</p>
            <p className=''>🔗</p>
            <p className=''>Core functionality integration tested, full test server setup</p>
          </div>
        </section>
      </div>

      {/* <br />
      <hr className='mx-auto max-w-[85vw] border-blue-500'/>
      <br /> */}
    </div>    
  )
}
