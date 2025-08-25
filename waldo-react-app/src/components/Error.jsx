import { useLocation, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function Error() {
  const { pathname, search } = useLocation();
  const error = useRouteError();
  const details = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : (error?.message ?? 'Unknown error');

  return (
    <div className="flex flex-col justify-center items-center mt-[20vh]">
      <h1 className='text-3xl'>
        Sorry, but no route matches; "{pathname}{search}".
      </h1>
      <p className='text-lg'>
        {details}
      </p>
      <div className='mt-6'>
        <Link to="/" className='link link-primary'>
          Go back to landing page here
        </Link>
      </div>
    </div>
  );
}