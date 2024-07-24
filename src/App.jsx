import {useState} from 'react';
import Board from './components/Board'
import './App.css'
import audioFondo from './assets/audio/fondo_aud.wav'
import fondo from "./assets/fondo1.webp"
import fondo2 from "./assets/fondo2.webp"
import fondo3 from "./assets/fondo3.webp"
import fondo4 from "./assets/fondo4.webp"
import fondo5 from "./assets/fondo5.webp"
import fondo6 from "./assets/fondo6.webp"

function Game() {

  const arrayImg = [fondo, fondo2, fondo3, fondo4, fondo5, fondo6];

  const [change, setChange] = useState(0);

  function changeBackground() {
    if(change === 5) {
      setChange(0);
    } else {
      setChange(change + 1);
    }
    new Audio(audioFondo).play();
  }

  document.body.style.backgroundImage = `url(${arrayImg[change]})`;

  return (
    <>
      <div className='game'>
          <Board changeBack={changeBackground}/>
      </div>
    </>
  )
}

export default Game