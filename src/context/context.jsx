import { createContext, useState } from "react";
import { run } from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");


    const delayPara = (index, next) => {
        setTimeout(() => {
            setResult((prev) => prev + next);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResult("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined) {
            setPrevPrompts((prev) => [...prev, prompt]);
            setRecentPrompt(prompt);
            response = await run(prompt);
        }        
        else {
            setPrevPrompts((prev) => [...prev, recentPrompt]);
            setRecentPrompt(input);
            response = await run(input);
        }
        let responseArray = response.split("**");
        let newResponse = [];
        for(let i = 0; i < responseArray.length; i++){
            if(i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>");
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i < newResponseArray.length; i++){
            const newWord = newResponseArray[i];
            delayPara(i, newWord + " ");
        }
        // setResult(newResponse2);
        setLoading(false);
        setInput("");
    }

    // onSent("What is react js ?");

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;