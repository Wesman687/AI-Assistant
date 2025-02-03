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
        headers: { "Content-Type": "application/json" }
      });
      return response.data.response;
    } catch (error) {
      console.error("API error:", error);
      console.log("Error connecting to AI.");
    }
  };

  const onSent = async () => {
    console.log(input)
    setResultData("");
    setRecentPrompt(input);
    setInput(" ");
    setLoading(true);
    setShowResult(true);
    let response;
    try {
      response = await deepSeek(input);
    } catch (error) {
      console.error("API error:", error);
      console.log("Error connecting to AI.");
      response = "Error connecting to AI.";
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
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