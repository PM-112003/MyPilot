import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import '../main/main.css';
import { Context } from "../../context/context";

export default function Main(){
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    return(
        <div className="main">
            <div className="nav">
                <p>MyPilot</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult?
                <>
                    <div className="greet">
                    <p><span>Hello Dev.</span></p>
                    <p>How can I help you?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest beautiful places to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati veritatis dolorem.</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, dicta.</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>improve readability of this code: </p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                :
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {/* to make only useful text display and not the html tags, we use the dsinnerhtml property */}
                            {
                                loading?<div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                :
                                // our html is not from external source so it's safe to render like this!
                                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                             
                        </div>
                    </div>

                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        MyPilot may display inaccurate info, including about people, so double check the answers
                    </p>
                </div>
            </div>
        </div>
    )
}