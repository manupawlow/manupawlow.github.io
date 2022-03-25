
import * as React from 'react';
import { ethers } from 'ethers';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';

const WordManager = ({word}) => {
	
    const todayWord = word;
    
    const characters = [];
    
    for(var i = 0; i < todayWord.length; i++)
        characters.push(
            <input 
                type="text" 
                className="wordle-character" 
                id={`character${i}`} 
                key={`character${i}`} 
                maxLength="1"
                autoComplete="off"
            >
            </input>);

    Array.from(document.querySelectorAll('.wordle-character')).forEach(el => {
        el.addEventListener('keydown', e => {
            
            console.log("keeeyyyy");

            el.value = e.key;

            console.log(e.keyCode);
            //e.keyCode > 64 && e.keyCode < 91
            if((true)) {
                el.nextElementSibling.focus();
            }
        });
    })

    const validate = () => {
        let inputWord = "";
        for(var i = 0; i < todayWord.length; i++)
            inputWord += document.getElementById(`character${i}`);

        return inputWord === todayWord;
    }

    console.log(characters);

    //component return
     return (<>

        {characters}
     
        <button onClick={validate}>Send</button>

     </>)
        
}

export default WordManager;