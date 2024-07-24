import X from "/x.png"
import O from "/o.png"

const Square = ({ value, onSquareClick }) => {

  return (
    <button className='square' onClick={onSquareClick}>{value === 1 ? <img src={X} className="img-board-x" alt="X" /> : value === -1 ? <img src={O} className="img-board-o" alt="O" /> : ''}</button>
  )
}

export default Square
