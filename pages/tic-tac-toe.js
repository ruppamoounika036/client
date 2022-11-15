import EntireBoard from '../components/tictactoe/EntireBoard/EntireBoard';
import Frame from '../components/tictactoe/Frame/Frame';
import GameEndModal from '../components/tictactoe/GameEndModal/GameEndModal';
import ModalPopup from '../components/tictactoe/ModalPopup/ModalPopup';
// import ScoreBoard from '../components/tictactoe/ScoreBoard/ScoreBoard';/
import StartModal from '../components/tictactoe/StartModal/StartModal';
import TicTacBoard from '../components/tictactoe/TicTacBoard/TicTacBoard';
import Link from 'next/link';

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function TicTacToe(props) {
  const { data: session, status } = useSession()
  const [state,setstate] =useState( {
    name:props.user,
    gameBoard: Array(9).fill(""),
    playerSide: "",
    playerScore: 0,
    computerSide: "",
    computerScore: 0,
    playerTurn: true,
    gameStatus: "game in play",
    strttime:new Date()
  })

  const postresult = async (p,c) => {
    await fetch('http://localhost:5000/api/tictactoe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: session.user.email, playerscore:p,computerscore:c, timespent:(new Date().getTime() -state.strttime.getTime()).toFixed(2)})
    }).then(response => {
      console.log("rs", response);
    }).catch((e) => { console.log("error,", e) })
  }

  const playerMove = (event) => {

    const { gameBoard, gameStatus, playerSide, 
      computerSide} = state;
    let clickedSquare = event.target.id;
    let currentGameState = [...gameBoard];

    if (currentGameState[clickedSquare] === '' && gameStatus === "game in play") {
      currentGameState[clickedSquare] = playerSide;
      setstate({...state,
        gameBoard: currentGameState,
        playerTurn: !state.playerTurn
      })
      
      if (isWinner(currentGameState) === playerSide) {
        console.log("winner",gameBoard)
        setstate({...state,
          playerScore: state.playerScore + 1
        })
        setstate({...state,
          gameStatus: "You win!",
        })
        postresult(1,0);
        

      } else if (currentGameState.includes('') && gameStatus === "game in play") {
        setTimeout(() =>computerMove(currentGameState, computerSide), 430);
      
      } else {
        setstate({...state,
          gameStatus: "Draw"
        })
        postresult(0,0);
      }
    } 
  }
 
  const isWinner = (gameBoard) => {
    const allWiningCombos = [
      [0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], 
      [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]
    ];

    for (const eachWiningLine of allWiningCombos) {

      if (
        gameBoard[eachWiningLine[0]] === gameBoard[eachWiningLine[1]] && 
        gameBoard[eachWiningLine[0]] === gameBoard[eachWiningLine[2]] &&
        gameBoard[eachWiningLine[0]] !== ""
      ) {
        return gameBoard[eachWiningLine[0]];  
      }
    }

    if (!gameBoard.includes('')) {
      return "draw";
    }

    return false;
  }

  const computerMove = (currentGameState, computerSide) => {
    let depth = 0;
    const bestIndexNum = miniMaxAI(currentGameState, computerSide, depth);
    
    currentGameState[bestIndexNum] = computerSide;
    setstate({...state,
      gameBoard: currentGameState,
      playerTurn: !state.playerTurn
    })
    if (isWinner(currentGameState) === computerSide) {
      setstate({
        computerScore: state.computerScore + 1
      })
      console.log("computer",gameBoard)
      setstate({...state,
        gameStatus: "You lose! ",
      })
      postresult(0,1);
    }
  }

  const miniMaxAI = (currentGameState, side, depth) => {
    const gameFate = isWinner(currentGameState);
    if (gameFate === false) {
      const winningChanceValues = [];

      for (let [i, square] of currentGameState.entries()) {
        const updatedGameState = [...currentGameState];

        if (square === '') {
          updatedGameState[i] = side;
          const newSide = (side === state.playerSide ? state.computerSide : state.playerSide);
          const value = miniMaxAI(updatedGameState, newSide, depth + 10);
          winningChanceValues.push({ 
            winningChanceValue: value,
            indexNum: i  
          });
        }
      }

      if (side === state.computerSide) {
        const maxWinningChance = winningChanceValues.reduce((val1, val2) => {
          
          if (val1.winningChanceValue < val2.winningChanceValue) {
            return val2;
          } else {
            return val1;
          }
        })

        if (depth === 0) {
          return maxWinningChance.indexNum;
        } else {
          return maxWinningChance.winningChanceValue;
        }

      } else {
        const minWinningChance = winningChanceValues.reduce((val1, val2) => {
          
          if (val1.winningChanceValue > val2.winningChanceValue) {
            return val2;
          } else {
            return val1;
          }
        })

        if (depth === 0) {
          return minWinningChance.indexNum;
        } else {
          return minWinningChance.winningChanceValue;
        }
      }

    } else {
      return calculateChanceOfWin(gameFate, side, depth);
    }
  }
  const calculateChanceOfWin = (gameFate, side, depth) => {

    if (gameFate === "draw") {
      return 0;
    } else if (gameFate === state.playerSide) {
      return depth - 100;
    } else if (gameFate === state.computerSide) {
      return 100 - depth;
    }
  }
  const chooseSide = (event) => {
    const side = event.target.innerHTML;
    setstate({...state,
      playerSide: side,
      computerSide: side === "X" ? "O" : "X"
    })
  }

  const hideElement = (hideClassName) => {
    return hideClassName += "hide";
  }

  const restartGame = () => {
    setstate({...state,
      gameBoard: Array(9).fill(""),
      gameStatus: "game in play",
      playerTurn: true
    })
  }
  const { gameBoard, playerTurn, playerSide, 
    gameStatus, playerScore, computerScore } = state;

  const showEndingModal = (text) => {
    return text;
  }

  let computerClassName = '';
  let playerClassName = '';
  let gameOverClassName = "hidden";

  if (gameStatus === "game in play") {

    if (playerTurn === true) {
      playerClassName += " currentTurn";

    } else {
      computerClassName += " currentTurn";
    }

  } else {
    computerClassName = "currentTurn";
    playerClassName = "currentTurn";
    gameOverClassName = showEndingModal("show");

    setTimeout(() => {
      restartGame()
    }, 1350);
  }

  let modalClassName = '';
  let hideClassName = '';

  if (playerSide !== '') {
    modalClassName = "fade";

    setTimeout(() => {
      hideElement(hideClassName);
    }, 2000);
  }
  return (
    <>
       <div className="App">
        <ModalPopup modalClassName={modalClassName} hideClassName={hideClassName}>
          <StartModal chooseSide={chooseSide} />
        </ModalPopup>
        <ModalPopup gameOverClassName={gameOverClassName}>
          <GameEndModal gameStatus={gameStatus}/>
        </ModalPopup>
        <header className="App-header">
          <h1>TIC TAC TOE</h1>
        </header>
        <main className="App-main">
          <EntireBoard>
            <Frame>
              {/* <ScoreBoard 
                playerClassName={playerClassName} 
                computerClassName={computerClassName} 
                playerScore={playerScore}
                computerScore={computerScore}
              /> */}
              <TicTacBoard playerMove={playerMove} gameBoard={gameBoard} />
            </Frame>
          </EntireBoard>
          <Link href='/'>Exit Game</Link>
        </main>
      </div>
    </>
  )
}
