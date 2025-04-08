import React, {useState} from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets.js';
import {Context} from '../../context/context.jsx';
import {useContext} from 'react';


const Sidebar = () => {

    const [expanded, setExpanded] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt((prompt) => prompt);
        await onSent(prompt);
    } 

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick = {() => setExpanded(prev => !prev)} className="menu" src={assets.menu_icon} alt=" " />
                <div onClick={()=>{newChat()}} className="new-chat">
                    <img src={assets.plus_icon} alt=" " />
                    {expanded ? <p>New Chat</p> : null}
                </div>
                {
                    expanded ? <div className="recent">
                            <p className="recent-title">Recent</p>
                            {prevPrompts.length > 0 ? prevPrompts.map((item, index) => {
                                return (
                                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                        <img src={assets.message_icon} alt=" " />
                                        <p>{item.slice(0, 18)}...</p>
                                    </div>
                                );
                            }) : null}
                        </div> : null
                }
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt=" " />
                    {expanded ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt=" " />
                    {expanded ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt=" " />
                    {expanded ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;