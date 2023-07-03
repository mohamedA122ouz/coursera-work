import './App.css';
import { useState } from "react";
import Body from './body';
//https://api.adviceslip.com
async function get(url) {
  return (await fetch(url)).json();
}
async function data() {
  let data = await get("https://api.adviceslip.com/advice");
  return data;
}


function App() {
  let [apiData, setData] = useState({slip:{id:"000",advice:"loading..."}});
  function handleClick() {
    data().then((data=>setData(data)));
  }
  return (
    <div className="App">
      <Body onClick={handleClick} advice={apiData} onload={handleClick} />
    </div>
  );
}

export default App;
