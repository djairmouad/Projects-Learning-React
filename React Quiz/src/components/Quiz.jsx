import { useCallback, useState } from "react";
import Question from "./Question.jsx";
import QUESTIONS from '../questions.js';
import Summary from "./Summary.jsx";
export default function Quiz() {
    const [answerUser, setAnswersUser] = useState([]);
    const activeQuestionIndex =answerUser.length ;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length ? true:false;


       const handelSelectAnswer=useCallback( function handelSelectAnswer(answer) {
            setAnswersUser((prevUser) => {
                const newUser = [...prevUser];
                newUser.push(answer);
                return newUser;
            });
        },[])

    const handelSkipAnswer= useCallback(()=>{
        handelSelectAnswer(null)
    },[handelSelectAnswer])
    if (quizIsComplete) {
        return (
           <Summary answerUser={answerUser}/>
        );
    } else {
        return (
            <div id="quiz">
                <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handelSelectAnswer} 
                onSkip={handelSkipAnswer}   
                selectedAnswer={answerUser[answerUser.length -1]}
                />
            </div>
        );
    }
}
