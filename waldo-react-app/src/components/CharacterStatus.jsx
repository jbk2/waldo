// import { characters } from '';
import { useContext } from 'react';
import waldo from '../assets/images/waldo-head.png';
import wenda from '../assets/images/wenda-head.png';
import odlaw from '../assets/images/odlaw-head.png';
import { GameContext } from "../contexts/GameContext"

export default function CharacterStatus() {
  console.log('CharacterStatus rendered now >>', Date.now);
  const { characters } = useContext(GameContext)
  const headshots = {
    waldo: waldo,
    wenda: wenda,
    odlaw: odlaw
  }
  const characterOrder = ['waldo', 'wenda', 'odlaw'];
  const charactersToRender = characters || [
    { id: 'waldo', name: 'waldo', clicked: false },
    { id: 'wenda', name: 'wenda', clicked: false },
    { id: 'odlaw', name: 'odlaw', clicked: false }
  ];
  const sortedCharacters = charactersToRender.sort((a, b) => 
    characterOrder.indexOf(a.name) - characterOrder.indexOf(b.name)
  );

  return(
    <>
      {sortedCharacters.map((char) => {
        return(
          <div key={char.name} id={`${char.name}-status`}
            className={`flex flex-col gap-1 items-center w-20
              ${char.clicked ? 'animate-scale-pulse-twice font-[620] underline-offset-3 \
              underline decoration-1.5 decoration-wavy decoration-green-600' : ''}`}>
            <img src={headshots[char.name]} alt={char.name} className='h-10' />
            <p role="status" className='text-sm'>{char.clicked ? 'Found ✅' : 'Not Found'}</p>
          </div>
        )
      })}
    </>
  )
}