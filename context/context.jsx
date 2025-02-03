import { createContext, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [model, setModel] = useState("gpt-4");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 5 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const deepSeek = async (prompt) => {
    try {
      const response = await axios.post("https://api.paul-miracle.info/generate", { 
        user_id: "Wesman687",
        prompt: prompt,
        model: "gpt-4"
      }, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000000 // Set a timeout of 10 seconds
      });
      return response.data.response;
    } catch (error) {
      console.error("API error:", error);
      throw new Error("Error connecting to AI."); // Rethrow the error for handling in onSent
    }
  };
  const resetTextareaSize = () => {
    const textarea = document.querySelector("textarea"); // Select the textarea
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
    }
  };

  const onSent = async () => {
    resetTextareaSize();
    console.log(input);
    setResultData("");
    setRecentPrompt(input);
    setInput("");
    setLoading(true);
    setShowResult(true);
    
    try {
      const response = await deepSeek(input);
      let responseArray = response.split("<b>");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        newResponse += (i === 0 || i % 2 !== 1) ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
      }
      let newResponse2 = newResponse.split("</br>").join("</br>");
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        delayPara(i, newResponseArray[i] + " ");
      }
    } catch (error) {
      console.error("API error:", error);
      setResultData("Error connecting to AI.");
    } finally {
      setLoading(false); // Ensure loading is set to false after processing
    }
  };


  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;