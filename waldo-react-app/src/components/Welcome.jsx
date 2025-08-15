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
    // m-6 mt-34 md:mt-10 lg:mt-4
    <div className='mt-[2vh] md:mt-[6vh] xl:mt-[10vh] mx-4'>
      <div id="intro-text" className='max-w-180 mx-auto'>
        <p className="inline text-md text-gray-600">A toy Where's Waldo app, built by</p>
        <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">&nbsp;James Kemp</a>
        <p className='inline'>, to demonstrate use of the following libraries, technologies & techniques:</p>
        <span className="inline ml-2">
          <a href="https://github.com/jbk2/fakebook/blob/main/README.md" className="inline link link-primary text-sm">View the code</a>
        </span>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 m-6'>
        <section id="rails" className='max-w-140'>
          <div id='section-header' className='flex gap-10 mb-2'>
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
          <div className='grid grid-cols-[24px_auto] gap-0.5 text-sm text-gray-800'>
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
          <div id='section-header' className='flex gap-10 mb-2'>
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
          <div className='grid grid-cols-[24px_auto] gap-0.5 text-sm text-gray-800'>
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
      </div>

      <br />
      <hr className='mx-auto max-w-[85vw] border-blue-500'/>
      <br />
    </div>    
  )
}
