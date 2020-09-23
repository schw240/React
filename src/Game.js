import { AutoComplete } from 'antd';
import React, { useState, useEffect } from 'react';
import img1 from "./rsp/1.png"
import img2 from "./rsp/2.png"
import img3 from "./rsp/3.png"
import './CssGame.css';

export default function Game() {
    
    const picks = [img1, img2, img3]
    const [myPick, setMyPick] = useState(null);
    const [comPick, setComPick] = useState(null);

    const click = (e) => {
        const select_myPick = e.target.getAttribute("user")
        const randomIndex = Math.floor(Math.random() * picks.length);

        setMyPick(picks[select_myPick]);
        setComPick(picks[randomIndex]);
    }


    return (
        <>  
            <div className="message">셋 중 하나를 선택해주세요</div>
            <div className="boxs">
                <img user={0} onClick={click} src={img1} />
                <img user={1} onClick={click} src={img2} />
                <img user={2} onClick={click} src={img3} />
            </div>
            <div className="results"><img src={myPick} /> <img src={comPick} /></div>
        </>
    );
}
