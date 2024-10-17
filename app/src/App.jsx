import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Quiz from './Components/Quiz';

function Main(){
  return(
    <>
      <div className="app bg-light">
        <div className="container">
          <div className="app_title">
            <h1 className="mt-4">Quiz Application</h1>
          </div>
          <div className="card mt-4 container">
            <h5 className="mt-3 text-danger">Read the following instruction given below, before start the quiz</h5>
            <ol>
              <li>Read the question carefully and answer the all question.</li>
              <li>The question based on computer programming.</li>
              <li>If your answer is wrong. No negative marks given</li>
              <li>Your score are calculated and display after the compeletion of all question.</li>
            </ol>
            <div className="comment">
              <h1 className="text-center">All THE BEST</h1>
            </div>
          </div>
          <div className="button mt-5">
            <Link to="/quiz" className="btn btn-primary">Start Quiz</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/quiz" element={<Quiz />}/>
      </Routes>
    </BrowserRouter>
  );
 
}