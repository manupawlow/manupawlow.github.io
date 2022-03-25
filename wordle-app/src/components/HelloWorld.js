
import * as React from 'react';

const HelloWorld = () => {

    let stuffState = false;

    const doStuff = () => {

        console.log('doing stuff...');

        document.getElementById('stuff-id').hidden = stuffState;

        stuffState = !stuffState;
    }

     return (<>
        <button onClick={doStuff}>Click me!</button>
        <div id="stuff-id" hidden>you did stuff</div>
     </>)
        
}

export default HelloWorld;
