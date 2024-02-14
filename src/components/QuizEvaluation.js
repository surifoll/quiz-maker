import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizEvaluation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { questions, selectedAnswers } = location.state;

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (question.correct_answer == selectedAnswers.find(q => q.question === question.question)?.selectedAnswer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    };

    const getScoreColor = (score) => {
        if (score <= 1) {
            return 'text-danger';
        } else if (score <= 3) {
            return 'text-warning';
        } else {
            return 'text-success';
        }
    };

    const handleNewQuiz = () => {
        navigate('/');
    };

    const score = calculateScore();
    const scoreColor = getScoreColor(score);

    return (
        <div className="container mt-5">
            <h1>Quiz Evaluation</h1>
            <ul className="list-group mt-4">
                {questions.map((question, index) => (
                    <li key={index} className="list-group-item">
                        <h5>{question.question}</h5>
                        <div>
                            {question.allAnswers.map((answer, answerIndex) => {
                                const selectedAnswer = selectedAnswers.find(x => x.question == question.question)?.selectedAnswer;
                                const isCorrect = selectedAnswer === question.correct_answer;
                                const thisIsSelected = answer === selectedAnswers.find(x => x.question == question.question)?.selectedAnswer;
                                const wrongAnswerStyle = !isCorrect && thisIsSelected ? { 'backgroundColor': 'red', color: 'white' } : {};

                                return (
                                    <button
                                        key={answerIndex}
                                        className={`btn me-2 mb-2 ${question.correct_answer === answer ? 'active btn-outline-success' : 'btn-outline-success'}`}
                                        style={wrongAnswerStyle}
                                    >
                                        {answer}
                                    </button>
                                )

                            })

                            }
                        </div>
                        <p className={`mb-0 ${question.correct_answer === selectedAnswers.find(x => x.question == question.question)?.selectedAnswer ? 'text-success' : 'text-danger'}`}>
                            Your answer: {selectedAnswers.find(x => x.question == question.question)?.selectedAnswer || 'Not answered'}
                        </p>
                        <p className="mb-0 text-success">Correct answer: {question.correct_answer}</p>
                    </li>
                ))}
            </ul>
            <h4 className={`mt-4 ${scoreColor}`}>Final Score: {score}/5</h4>
            <button className="btn btn-primary mt-4" onClick={handleNewQuiz}>Create New Quiz</button>
        </div>
    );
};

export default QuizEvaluation;
