import { useState } from "react";
import QUESTIONS from '../questions.js';
import Answers from "./Answers.jsx";
import QuestionTimer from './QuestionTimer.jsx';
export default function Question({
    index,onSkip,onSelectAnswer}){
   const [answer,setAnswer] =useState({
        selectedAnswer:'',
        isCorrect:null
    })
    let timer=10000;
    if(answer.selectedAnswer){
        timer=1000;
    }
    if(answer.isCorrect!==null){
        timer=2000;
    }
    function handelSelectAnswer(answer){
        setAnswer({
            selectedAnswer:answer,
            isCorrect:null
        })
       setTimeout(()=>{
        setAnswer({
            selectedAnswer:answer,
            isCorrect:QUESTIONS[index].answers[0]===answer
        })

        setTimeout(()=>{
            onSelectAnswer(answer)}
            ,2000)
       },1000)
    }
    let answerState='';
    if(answer.selectedAnswer && answer.isCorrect!==null){
        answerState=answer.isCorrect? 'correct':'wrong'
        console.log("hello world");
    }else if(answer.selectedAnswer){
        answerState='answered';
    }
    return(
        <div id="question">
                <QuestionTimer
                key={timer} 
                Timer={timer} 
                onTimeout={answer.selectedAnswer===""?onSkip:null}
                    mode={answerState}
                />
                    <h2>{QUESTIONS[index].text}</h2>
                    <Answers
                        answers={[...QUESTIONS[index].answers]}
                        answerSelected={answer.selectedAnswer}
                        answerState={answerState}
                        onSelect={handelSelectAnswer}  
                    />
                </div>
    )
}