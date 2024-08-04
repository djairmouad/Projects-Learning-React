import { useRef } from "react";

export default function Answers({answers,answerSelected,answerState,onSelect}){
    const shuffledAnswer=useRef();
    if(!shuffledAnswer.current){
        shuffledAnswer.current = [...answers];
       shuffledAnswer.current.sort(() => Math.random() - 0.5);
   }
    return(
        <ul id="answers">
                        {shuffledAnswer.current.map((item) =>{
                            let isSelected=answerSelected===item;
                            let cssClass='';
                            if(answerState==="answered" && isSelected){
                                cssClass='selected';
                            }else if((answerState==='correct' || answerState==='wrong') && isSelected){
                                cssClass=answerState
                                }
                            return(
                            <li key={item} className="answer">
                                <button onClick={() => onSelect(item)} className={cssClass} disabled={answerState!==''}>{item}</button>
                            </li>
                        )
                        })}
                    </ul>
    )
}