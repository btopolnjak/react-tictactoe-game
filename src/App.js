import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Intro from "./components/Intro";

function App() {
  
  // Handle intro scene and game over
  const [gameOverScene, setGameOverScene] = useState(false);
  const [introScene, setIntroScene] = useState(true);

  // Define available fields to fill X or O
  const [fields, setFields] = useState([
    {id: "one", player: null, clicked: false},
    {id: "two", player: null, clicked: false},
    {id: "three", player: null, clicked: false},
    {id: "four", player: null, clicked: false},
    {id: "five", player: null, clicked: false},
    {id: "six", player: null, clicked: false},
    {id: "seven", player: null, clicked: false},
    {id: "eight", player: null, clicked: false},
    {id: "nine", player: null, clicked: false}
  ])
  
  // Define player turn - X (true), O (false)
  const [playerTurn, setPlayerTurn] = useState(true);

  // Define result
  const [result, setResult] = useState(null);
  
  function newGame() {
    const currentFields = [...fields];
    currentFields.forEach(field => field.player = null);
    currentFields.forEach(field => field.clicked = false);
    setFields(currentFields);
    setGameOverScene(false);
    setIntroScene(false);
  }

  function checkForWinner(player) {
    const {
      0: {player: one},
      1: {player: two},
      2: {player: three},
      3: {player: four},
      4: {player: five},
      5: {player: six},
      6: {player: seven},
      7: {player: eight},
      8: {player: nine},
    } = fields
    
    const combinations = [
      [one, two, three],
      [four, five, six],
      [seven, eight, nine],
      [one, four, seven],
      [two, five, eight],
      [three, six, nine],
      [one, five, nine],
      [three, five, seven]
    ]
    
    const winner = combinations.some(array => {
      return array.every(check => {
        return check === (player)
      });
    });

    if (winner) {
      setResult(`${player} wins the game`)
      setGameOverScene(true);
    } else if (fields.every(field => field.clicked)) {
      setResult("It's a draw");
      setGameOverScene(true);
      return "nice One!"
    } else {
      setPlayerTurn(!playerTurn)
    };
  }

  useEffect(() => {
    if (!playerTurn) cpuPlayer()
  }, [playerTurn])

  function cpuPlayer() {
    // Copy fields array
    const currentFields = [...fields];
    // Check available fields
    const availableFields = currentFields.filter(field => !field.clicked);
    const pickedField = Math.floor(Math.random() * availableFields.length);
    currentTurn(availableFields[pickedField]);
  }

  function currentTurn(field) {
    // Define current player turn
    const currentPlayer = playerTurn ? "X" : "O";
    // Check if field is already filled
    if (field.innerText) return;
    // Copy fields array
    const currentFields = [...fields];
    // Find clicked field and update with player data
    const clickedField = currentFields.find(click => click.id === field.id);
    clickedField.player = currentPlayer;
    clickedField.clicked = true;
    currentFields.splice((currentFields.indexOf(clickedField)), 1, clickedField)
    setFields(currentFields);
    // Check for winner or draw
    checkForWinner(currentPlayer);
  }

  return (
    <main>
      <GameBoard 
        currentTurn={currentTurn}
        fields={fields}
      />
      {introScene && <Intro
        setIntroScene={setIntroScene}
        newGame={newGame}
      />}
      {gameOverScene && <GameOver
        setGameOverScene={setGameOverScene}
        setIntroScene={setIntroScene}
        newGame={newGame}
        result={result}
      />}
    </main>
  );
}

export default App;
