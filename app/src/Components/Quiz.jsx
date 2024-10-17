import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

export default function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [useranswer, setUseranswer] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const [button, setButton] = useState('Submit');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/questions');
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.log("Unable to fetch", error);
            }
        };
        fetchData();
    }, []);

    const handleAnswerChange = (questionId, answer) =>{
        setUseranswer((prevAnswers) =>({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };
    const checkanswer = async(e) =>{
        setButton('Submitted')
        e.preventDefault();
        let correctanswer = 0;
        let totalanswer = questions.length;
        questions.forEach((question) =>{
            if (useranswer[question._id] === question.correct) {
                correctanswer += 1
            }
        });
        if (correctanswer === totalanswer) {
            setMessage(alert(`Congratulations! You answered all questions correctly.\nYour Score:${correctanswer}`));
            setError('');
        } else {
            setError(alert(`You got ${correctanswer} out of ${totalanswer} questions correct.`));
            setMessage('');
        }
    };
    

    return (
        <div className="app bg-light">
            <div className="quiz container">
            <h1 className="mt-4">Multiple Choice Questions</h1>
                <div className="card mt-5 container">
                    <div className="instruction mt-4">
                        <h5 className="text-danger">Read the following instruction given below</h5>
                        <ol>
                            <li>There are one rounds <br /><b>Round 1:</b>&nbsp;Multiple choice question.</li>
                            <li>Attend all the questions and finishing of two rounds score will be display.</li>
                            <li>It contain 10 question and 10 marks</li>
                            <li><b>Total :</b> 10 points</li>
                        </ol>
                    </div>
                </div>
                <div className="card mt-5 container">    
                    <div className="questions">
                        <form onSubmit={checkanswer}>
                            {questions.map((question, index) => (
                                <div key={index} className="question-block mt-3">
                                    <h4>{index + 1}) {question.Q}</h4>
                                    <div className="answers ms-4">
                                        {question.answers.map((answer, i) => (
                                                
                                                <label htmlFor={`${question._id}-${i}`} className="me-3 form-control">
                                                    <input 
                                                        type="radio" 
                                                        name={question.Q} 
                                                        id={`${question._id}-${i}`}
                                                        value={i} 
                                                        onChange={() => handleAnswerChange(question._id, i)} 
                                                        className="me-2"
                                                        required
                                                    />
                                                    {answer}
                                                </label>
                                            ))}
                                    </div>      
                                </div>
                                
                            ))}
                            <div className="button mb-3 mt-3">
                                <button type="submit" className="btn btn-primary">{button}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
