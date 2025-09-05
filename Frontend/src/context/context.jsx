import {createContext, useState} from "react";
import aiResponse from "../config/ai.response";

export const Context = createContext();

const contextProvider = (props) =>{

    const [input, setInput] = useState("");
const [recentPrompt, setRecentPrompt] = useState('');
const [prevPrompts, setPrevPrompts] = useState([]);
const [showResult, setShowResult] = useState(false);
const [loading, setLoading] = useState(false);
const [resultData, setResultData] = useState('');


    const onSend = async (prompt) => {
        console.log(aiResponse(prompt));

    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSend,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default contextProvider;