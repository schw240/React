import { AutoComplete } from 'antd';
import React from 'react';
import img1 from "./rsp/1.png"
import img2 from "./rsp/2.png"
import img3 from "./rsp/3.png"
import styles from './CssGame.css';

export default function Game() {
    
    return (
        <>  
            <div className={styles.message}>셋 중 하나를 선택해주세요</div>
            <div className={styles.boxs}>
                <img src={img1}/>
                <img src={img2}/>
                <img src={img3}/>
            </div>
        </>
    );
}