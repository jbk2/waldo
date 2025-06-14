export default function AuthLayout({title, subtitle, children}) {

  return(
    <div className="card top-[10vh] pt-6 w-80 z-60 bg-base-100 shadow-md mx-auto">
      <div data-testid="auth-form" className="card-title flex flex-col">
        <h1 className="text-xl font-bold -mb-1">{title}</h1>
        <div>
          <p className="font-medium text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="card-body">
      {children}
      </div>
    </div>
  )
}