import { useState, useEffect } from "react";
import { loadWords } from "./lib/words";
import { differenceInSeconds } from "date-fns";
import { TypingPerformance } from "./lib/performance/TypingPerformance";

const App = () => {
  const language = "en";
  const length = 15;

  const [words, setWords] = useState<string>("");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [time, setTime] = useState<number>(0);

  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  useEffect(() => {
    setWords(loadWords(language, length));
  }, [language, length]);

  useEffect(() => {
    if (isFinished) {
      const typingPerformance = new TypingPerformance({
        charactersTyped: words.length,
        errors: errorCount,
        timeInMinutes: time / 60,
        totalWords: correctCount,
        correctWords: correctCount - errorCount,
      });

      setWpm(typingPerformance.calculateFinalWPM());
      setAccuracy(typingPerformance.calculateAccuracy());
    }
  }, [isFinished, correctCount, errorCount, time, words]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 1) {
      setStartTime(new Date());
    }

    if (value.length < currentInput.length) {
      setCurrentInput(value);
      return;
    }

    if (value.length <= words.length) {
      const currentChar = words[currentIndex];
      const enteredChar = value[value.length - 1];

      if (enteredChar === currentChar) {
        setCorrectCount((prev) => prev + 1);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setErrorCount((prev) => prev + 1);
      }
    }

    setCurrentInput(value);

    if (currentIndex + 1 === words.length) {
      setTime(differenceInSeconds(new Date(), startTime));
      setIsFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-semibold mb-4">Typing Practice</h1>
      <p className="text-lg mb-4">
        <strong>Words:</strong> {words}
      </p>
      <input
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        autoFocus
        className="w-full md:w-1/2 p-3 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <p className="text-2xl mb-2">
        <strong>Next Character:</strong>{" "}
        <span className="text-blue-600">
          {words[currentIndex] || "Finished!"}
        </span>
      </p>
      <div className="text-lg mt-4">
        <p>
          <strong>Correct:</strong> {correctCount}
        </p>
        <p>
          <strong>Errors:</strong> {errorCount}
        </p>
        <p>
          <strong>WPM:</strong> {isFinished ? wpm.toFixed(2) : "-"}
        </p>
        <p>
          <strong>Accuracy:</strong>{" "}
          {isFinished ? accuracy.toFixed(2) + "%" : "-"}
        </p>
      </div>
      {isFinished && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded-lg">
          <h2 className="text-2xl font-semibold">¡Has terminado!</h2>
          <p>Tu puntuación final:</p>
          <p>Correctos: {correctCount}</p>
          <p>Errores: {errorCount}</p>
          <p>Tiempo: {time} segundos</p>
          <p>WPM Final: {wpm.toFixed(0)}</p>
          <p>Precisión: {accuracy}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
