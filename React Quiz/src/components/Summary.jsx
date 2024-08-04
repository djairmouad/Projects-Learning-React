import completImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ answerUser }) {
    const skippedAnswer = answerUser.filter((answer) => answer === null);
    const correctAnswer = answerUser.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedAnswerShare = Math.round((skippedAnswer.length / answerUser.length) * 100);
    const correctAnswerShare = Math.round((correctAnswer.length / answerUser.length) * 100);
    const wrongAnswerShare = 100 - correctAnswerShare - skippedAnswerShare;

    return (
        <div id="summary">
            <img src={completImg} alt="Quiz Completed" />
            <h2>Quiz Completed!</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{skippedAnswerShare}%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswerShare}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswerShare}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {answerUser.map((answer, index) => {
                    let cssClass = "user-answer";
                    if (answer === null) {
                        cssClass += ' skipped'
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong"
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
