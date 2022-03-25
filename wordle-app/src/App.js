import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld.js'
import ConnectButton from './components/ConnectButton.js'
import WordManager from './components/WordManager.js';
import Owner from './components/Owner';
import OwnerOf from './components/OwnerOf';

import { words } from './Words.js';

function App() {

  const todayWord = words[0];

  return <>
    <div className="App">

      <Owner></Owner>
      
      <br></br>

      <OwnerOf></OwnerOf>
      {/* <WordManager word={todayWord}></WordManager> */}
    
    </div>
  </>
}

export default App;
