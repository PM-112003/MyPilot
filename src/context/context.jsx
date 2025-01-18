import { createContext, useState } from "react";
import run from "../config/gemini_api";
import { use } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); // to take input
    const [recentPrompt, setRecentPrompt] = useState(""); // to put it in recent prompts on home fresh page
    const [prevPrompts, setPrevPrompts] = useState([]); // to store in history
    const [showResult, setShowResult] = useState(false); // to show 
    const [loading, setLoading] = useState(false); // to show the loading component
    const [resultData, setResultData] = useState(""); // to showcase the result on data

    // The given function, delayPara, introduces a delay when appending a word (or any string value) to a piece of text stored in a state variable,
    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }



    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
            setPrevPrompts(prev => [...prev, prompt]); // Add `prompt` to `prevPrompts`
            setRecentPrompt(prompt);
            response = await run(prompt);
        }
        else{
            // storing previous prompts
            setPrevPrompts(prev=>[...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        

        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0;i<responseArray.length;i++){
            if(i===0||(i%2!==1)){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>");
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        // setResultData(newResponse2);
        setLoading(false);
        setInput("");
    }

    // to access our state variables in sidebar and main components we put our state variables and their set fns in 
    // contextValue object

    // onSent()


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
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
