import { useState } from 'react'
import '../App.css'
import Square from './Square'
import clickX from '../assets/audio/x.wav'
import clickO from '../assets/audio/o.wav'
import btnFondo from '../assets/btn-fondo.png'

const Board = ({ changeBack }) => {

  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(0))
  const [isWinner, setWinner] = useState(false)
  const [scores, setScores] = useState({ scoreX: 0, scoreO: 0, scoreT: 0 })

  function handleClick(i) {
    if (squares[i] || isWinner) {

      return
    }
    const newBoard = [...squares]

    newBoard[i] = xIsNext ? 1 : -1
    const audioToplay = xIsNext ? clickX : clickO
    new Audio(audioToplay).play()
    const winner = calculateWinner(newBoard)

    setSquares(newBoard)
    if (winner !== null) {

      setWinner(winner)
      setScores({ ...scores, [`score${winner}`]: scores[`score${winner}`] + 1 })
    }
    setXIsNext(!xIsNext)
  }

  function replay() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const cells = squares.map((square, i) => <Square key={i} value={square} onSquareClick={() => handleClick(i)} />)
  { isWinner || !squares.includes(null) ? <button className='btn-replay' onClick={replay}>Play again</button> : '' }
  const winnerComponent = isWinner ? <div className={isWinner === "X" ? 'square-value square-value-x' : 'square-value square-value-o'}>{isWinner}</div> : ''
  return (
    <>
      <div>
        <div className='options'>
          <div className='status'>{status}</div>
          <button className='btn-fondo' onClick={changeBack}><img src={btnFondo} alt="btn-fondo" /></button>
        </div>
        <div className='points'>
          <span>Player (X): {scores.scoreX}</span>
          <span className='points-o'>Player (O): {scores.scoreO}</span>
          <span>Tie: {scores.scoreT}</span>
        </div>
      </div>
      {winnerComponent}
      <div className='game-board'>
        {cells}

      </div>

    </>
  )
}

export default Board

function calculateWinner(squares) {
  let filas = new Array(3).fill(0)
  let columnas = new Array(3).fill(0)
  let diag1 = 0
  let diag2 = 0

  for (let i = 0; i < 9; i++) {

    filas[i % 3] += squares[i]
    columnas[parseInt(i / 3)] += squares[i]
  }
  for (let i = 0; i < 3; i++) {
    diag1 += squares[i * 3 + i]
    diag2 += squares[2 + i * 2]

  }
  const result = [...filas, ...columnas, diag1, diag2]

  if (result.includes(3))
    return "X"

  if (result.includes(-3))
    return "O"
  return null
}


/*
{winner || !squares.includes(null) ? <button className='btn-replay' onClick={replay}>Play again</button> : ''}
  < div className = 'board-row' >
          <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </ >
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        */
