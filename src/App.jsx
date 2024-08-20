import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [title, setTitle] = useState("let's play");
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [positions, setPositions] = useState([]);
  const [activeArr, setActiveArr] = useState([]);
  const [number, setNumber] = useState(1);
  const [classTitle, setClassTitle] = useState("");

  const [count, setCount] = useState(0);
  const [isStopTime, setIsStopTime] = useState(false);

  const counts = count.toFixed(1);
  useEffect(() => {
    if (title === "all cleared") {
      setClassTitle("title success");
    } else if (title === "game over") {
      setClassTitle("title game-over");
    } else {
      setClassTitle("title");
    }
  }, [title]);

  useEffect(() => {
    const newPositions = numbers.map(() => {
      const x = Math.floor(Math.random() * 90); // Random position from 0% to 90%
      const y = Math.floor(Math.random() * 90);

      return { x, y };
    });

    setPositions(newPositions);
  }, [numbers]);

  useEffect(() => {
    const newActive = numbers.map(() => {
      const active = false;
      return { active };
    });

    setActiveArr(newActive);
  }, [numbers]);

  useEffect(() => {
    if (isStopTime) {
      const timerId = setInterval(() => {
        setCount((prevState) => prevState + 0.1);
      }, 100);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [isStopTime]);

  const handlePlay = () => {
    const num = Number(inputValue); // Chuyển đổi giá trị nhập vào thành số

    if (num > 0) {
      setIsStopTime(true);
      setCount(0);
      setTitle("let's play");
      setNumber(1);
      const newNumbers = Array.from({ length: num }, (v, i) => i + 1); // Tạo mảng [1, 2, ..., num]
      newNumbers.sort((a, b) => b - a);
      setNumbers(newNumbers); // Cập nhật mảng
    }
  };

  const updateIsActive = (index) => {
    const newActiveArr = [...activeArr];

    newActiveArr[index].active = true;

    setActiveArr(newActiveArr);
  };

  const handleActive = (index) => {
    updateIsActive(index);
    setTimeout(() => {
      numbers.splice(index, 1);
      if (numbers.length === 0) {
        setTitle("all cleared");
        setIsStopTime(false);
      }
    }, 2000);
    if (numbers[index] === number) {
      setNumber(number + 1);
    } else {
      setTitle("game over");
      setIsStopTime(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h3 className={classTitle}>{title}</h3>
        <div className="input-container">
          <label className="points-label" htmlFor="points">
            Points:
          </label>
          <input
            className="points-input"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="time-display">
          <label className="time-label" htmlFor="time">
            Time:
          </label>

          <span>{counts}s</span>
        </div>

        <button className="restart-button" onClick={handlePlay}>
          {!isStopTime ? "Play" : "Restart"}
        </button>

        <div className="number-list">
          {numbers.map((item, index) => (
            <button
              className={
                activeArr[index]?.active ? "active number-item" : "number-item"
              }
              onClick={() => handleActive(index)}
              key={index}
              style={{
                position: "absolute",
                left: `${positions[index]?.x}%`,
                top: `${positions[index]?.y}%`,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
