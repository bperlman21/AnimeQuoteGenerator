import { useState } from 'react'
import './App.css'

async function fetchQuote(setQuote, setAuthor) {
    const URL = "https://animechan.io/api/v1/quotes/random"; // Original URL
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const content = json.data.content || "No quote found.";
        setQuote(content);
        const character = json.data.character.name || "No character found.";
        setAuthor(character);
    } catch (err) {
        console.error("Error fetching quote:", err.message);
        setQuote("Failed to fetch quote. Please try again later.");
    }
}

function App() {
    const [quote, setQuote] = useState("Click the button to get a quote!");
    const [author, setAuthor] = useState("");

    const handleClick = () => {
        fetchQuote(setQuote, setAuthor);
    };

  return (
    <>
        <div id={"quote-box"}>
            <h1>Anime Quote Generator</h1>
            <div id={"quote-container"}>
              <span id={"text"}>
                  {quote !== "Click the button to get a quote!" ? `"${quote}"` : quote}
              </span>
            </div>
            <div id={"author-container"}>
              <span id={"author"}>
                  {author !== "" ? `-${author}` : author}
              </span>
            </div>
            <div id={"button-container"}>
                <a href="twitter.com/intent/tweet" target="_blank">
                    <img src="https://seeklogo.com/images/T/twitter-logo-2629C04D18-seeklogo.com.png"
                         className="twitter-logo" alt="Twitter logo"/>
                </a>
                <button id={"new-quote"} onClick={handleClick}>
                    New Quote
                </button>
            </div>
        </div>
    </>
  )
}

export default App
