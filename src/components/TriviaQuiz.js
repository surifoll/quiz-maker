import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TriviaQuiz = ({ categoryId, difficulty, createCount }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showSubmit, setShowSubmit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {


        const fetchQuestions = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
                const data = await response.json();
                var refined = data.results.map(res => {
                    res.allAnswers = [...res.incorrect_answers, res.correct_answer].sort(() => Math.random() - 0.5);
                    return res;
                });
                setQuestions(refined);
                console.log(data.results)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [createCount, difficulty]);

    useEffect(() => {
        if (questions.length > 0) {
            const shuffledAnswers = questions.map((question) => {
                const filtered = question.incorrect_answers.filter(x => x.question != question);
                const allAnswers = [...filtered, question.correct_answer];
                return allAnswers.sort(() => Math.random() - 0.5);
            });
            setAnswers(shuffledAnswers);
        }
    }, [questions]);

    const handleAnswerClick = (question, selectedAnswer) => {

        const filtered = selectedAnswers.filter(x => x.question != question);
        const updatedSelectedAnswers = [...filtered, { question, selectedAnswer }];
        setSelectedAnswers(updatedSelectedAnswers);
        if (Object.keys(updatedSelectedAnswers).length === questions.length) {
            setShowSubmit(true);
        }
    };

    const handleSubmit = () => {
        navigate(
            '/quiz-evaluation',
            {
                state: { questions, selectedAnswers }
            }
        );
        console.log('Selected answers:', selectedAnswers);
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Trivia Quiz</h1>
            {loading ? (
                <p>Loading questions...</p>
            ) : (
                <div>
                    {
                        questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <h5 dangerouslySetInnerHTML={{ __html: question.question }}></h5>
                                <div>
                                    {question.allAnswers.map((answer, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            className={`btn btn-outline-success me-2 mb-2 ${selectedAnswers.find(x => x.question == question.question)?.selectedAnswer === answer ? 'active' : ''}`}
                                            onClick={() => handleAnswerClick(question.question, answer)}
                                        >
                                            {answer}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    {showSubmit && (
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Submit Answers
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TriviaQuiz;
