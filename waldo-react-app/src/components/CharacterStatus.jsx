// import { characters } from '';
import waldo from '../assets/images/waldo-head.png';
import wenda from '../assets/images/wenda-head.png';
import odlaw from '../assets/images/odlaw-head.png';
import { capitalize } from '../utils/stringUtils';

export default function CharacterStatus({ characters }) {

  const headshots = {
    waldo: waldo,
    wenda: wenda,
    odlaw: odlaw
  }

  return(
    <>
      {characters.map((char) => {
        return(
          <div key={char.name} id={`${char.name}-status`}
            className={`flex flex-col gap-1 items-center w-20
              ${char.clicked ? 'animate-scale-pulse-twice font-[620] underline-offset-3 \
              underline decoration-1.5 decoration-wavy decoration-green-600' : ''}`}>
            <img src={headshots[char.name]} alt={char.name} className='h-10' />
            <p className='text-sm'>{char.clicked ? 'Found ✅' : 'Not Found'}</p>
          </div>
        )
      })}
    </>
  )
}