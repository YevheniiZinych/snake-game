import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { getPlayers } from "./redux/Players/selectors";
import { fetchPlayers, addPlayers } from "./redux/Players/playersOperation";
import { LeaderBoard } from "./components/LeaderBoard/LeaderBoard";
import { checkName } from "./helpers/checkName";

function App() {
  let totalGridSize = 20;

  let snakeInitialPosition = [
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 1,
    },
  ];

  // Game State
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState(snakeInitialPosition);
  const [direction, setDirection] = useState("LEFT");
  const [playerName, setPlayerName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const { players } = useSelector(getPlayers);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  function renderBoard() {
    let cellArray = [];

    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let classes = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnakeHead = snake[0].x === row && snake[0].y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        if (isFood) {
          classes = `${classes} food`;
        }

        if (isSnake) {
          classes = `${classes} snake`;
        }

        if (isSnakeHead) {
          classes = `${classes} snake-head`;
        }

        let cell = <div key={`${row}-${col}`} className={classes}></div>;

        cellArray.push(cell);
      }
    }

    return cellArray;
  }

  function renderFood() {
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);

    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function gameOver() {
    setSnake(snakeInitialPosition);
    setScore(0);
    setPlayerName("");
    dispatch(addPlayers({ name: playerName, point: score }));

    // dispatch(fetchPlayers());
  }

  function updateGame() {
    // Checking For Game Over
    if (
      snake[0].x < 0 ||
      snake[0].x > 20 ||
      snake[0].y < 0 ||
      snake[0].y > 20
    ) {
      gameOver();
      return;
    }

    // Checking If snake bit itself
    const isBit = snake
      .slice(1)
      .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    if (isBit) {
      gameOver();
      return;
    }

    let newSnake = [...snake];
    if (direction === "UP") {
      newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
    }
    if (direction === "DOWN") {
      newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
    }
    if (direction === "LEFT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
    }
    if (direction === "RIGHT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
    }

    // checking if food was eaten or not
    if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
      // Ate Food
      setScore((sco) => sco + 5);
      renderFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
      default:
        break;
    }
  }

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake;

    if (playerName) {
      moveSnake = setInterval(updateGame, 400);
    } else {
      return;
    }

    return () => clearInterval(moveSnake);
  });

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const confirmPlayer = () => {
    const result = checkName(inputValue, players);

    if (result) return;

    setPlayerName(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);

    return () => document.removeEventListener("keydown", updateDirection);
  });
  return (
    <main className="main">
      <div className="wrapper">
        <h1>Welcome to the GAME</h1>
        <h2>Enter yor name and play</h2>
        <label>
          <div> Players name</div>
          <input type="text" value={inputValue} onChange={handleInput} />
          <button onClick={confirmPlayer}>Ok</button>
        </label>
        <div className="score_wrap">
          <div className="score">{playerName}</div>
          <div className="score">
            Score : <span>{score}</span>
          </div>
        </div>
        <div className="board">{renderBoard()}</div>
      </div>
      <LeaderBoard players={[...players]} />
      <Toaster />
    </main>
  );
}

export default App;
