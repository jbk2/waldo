export default function DifficultyIllustration({diffProps}) {

  return(
    <div className="flex justify-center items-center mb-4 text-xs">
      { Object.entries(diffProps).map(([key, value], index) => {
        return (
          <div key={index} className="ml-1 mr-2 flex items-center">
            <div className={`h-2 w-3  bg-${value.color}`}></div>
            <p className='ml-1'>{`${key}`}</p>
          </div>
        )})
      }
    </div>
  )
};