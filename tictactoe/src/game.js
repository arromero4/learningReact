import './App.css';
import React from 'react';


function Square(props) {
    return (
      <button
        className="square" 
        onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    
    renderSquare(i) {
      return <Square 
            value={this.props.squares[i]}
            onClick={()=> this.props.onClick(i)}
          />;
    }
  
    render() {

      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            history:[{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0 
        })
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];
        const squares = current.squares.slice()
        if(calculateWinner(squares) || squares[i]) return 

        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }


    render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
        const desc = move ?'Go to move #' + move: 'Go to game start'
        return(
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}>
                {desc}
                </button>
            </li>
        )
    })

    let status
    if(winner){
        status = 'Winner: ' + winner
    }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
    //hacia arriba
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    //hacia abajo
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    //diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
 console.log(lines[i])
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

//------------------------------------------------------------------------------------
//------------------REVISA HACIA ARRIBA--------------------------

        //squares[0] && squares[0] === squares[1] && squares[0] === squares[2])
        //  x          x                      o        x              o
        
        //squares[3] && squares[3] === squares[4] && squares[3] === squares[5])
        //  null          null             x            null          null

        //squares[6] && squares[6] === squares[7] && squares[6] === squares[8])
        //  null          null             null           null          x


//------------------------------------------------------------------------------------
//------------------REVISA HACIA ABAJO--------------------------
        //squares[0] && squares[0] === squares[3] && squares[0] === squares[6])
        //  x          x                      o        x              o
        
        //squares[1] && squares[1] === squares[4] && squares[1] === squares[7])
        //  null          null             x            null          null

        //squares[2] && squares[2] === squares[5] && squares[2] === squares[8])
        //  null          null             null           null          x

//------------------------------------------------------------------------------------
//------------------REVISA HACIA DIAGONAL-------------------------
        //squares[0] && squares[0] === squares[4] && squares[0] === squares[8])
        //  x          x                      X        x              X
        //retorna true - x 
        
        //squares[2] && squares[2] === squares[4] && squares[2] === squares[6])
        //  o          o             x            o          null


        //console.log(squares[a], squares[b], squares[c])
        //console.log(lines[i])
        return squares[a];
      }
    }
    return null;
  }
  export default Game 