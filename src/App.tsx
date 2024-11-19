import { loadWords } from "./words";

function App() {
  const language = "en";
  const words = loadWords(language);

  return (
    <div>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
