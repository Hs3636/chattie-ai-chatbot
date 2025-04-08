import React from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import { useContext } from 'react';

const Main = () => {

    const {prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        input,
        setInput} = useContext(Context);

    return(
        <div className="main">
            <div className="nav">
                <div className="nav-element">
                    <img src={assets.image} alt="Chattie" className="logo" />
                    <p>Chattie</p>
                </div>
                <img src={assets.user_icon} alt=""/>
            </div>
            <div className="main-container">
                {!showResult ? <>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest some beautiful places to see on an upcoming road trip to Ladakh.</p>
                        <img src={assets.compass_icon} alt=" " />
                    </div>
                    <div className="card">
                        <p>Breifly summarize this concept: urban planning.</p>
                        <img src={assets.bulb_icon} alt=" " />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat.</p>
                        <img src={assets.message_icon} alt=" " />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code.</p>
                        <img src={assets.code_icon} alt=" " />
                    </div>
                </div>
                </> : 
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.image} alt="" />
                        {
                            loading ? <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div> : <p dangerouslySetInnerHTML={{__html:result}}></p>
                        }
                    </div>
                </div>
                }
                <div className="main-bottom">
                        <div className="search-box">
                            <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
    if (e.key === 'Enter' && input) {
      onSent(input);
    }
  }} value={input} type="text" placeholder="Enter a prompt here."/>
                            <div>
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input ? <img onClick={() => onSent(input)} src={assets.send_icon} alt="" /> : null }
                            </div>
                        </div>
                        <p className="bottom-info">
                            Chattie may display content that is biased, inaccurate, or otherwise inappropriate.<br /> Please use caution and your own judgement when interpreting and using the information provided by Chattie.
                        </p>
                </div>
            </div>
        </div>
    )
}

export default Main;