import { useState } from "react";
export default function Player({name,symbol,isactive,change}){
const [player,setplayer]=useState(name);
const [isEditing,setisEditing]=useState(false);
function handelEditClick(){
setisEditing(Editing=>!Editing);
if(isEditing){
    change(symbol,player);
}
}
function handelChange(event){
console.log(event);
setplayer(event.target.value);
}
let playerName=(<span className="player-name">{player}</span>);
let btnCaption="Edit";
if(isEditing){
    playerName=<input type="text" required Value={player} onChange={handelChange}/>
    btnCaption="Save";
}
    return(
        
        <li className={isactive? "active":undefined}>
        <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handelEditClick}>{btnCaption}</button>
        </li>
        
        
        
    );
}