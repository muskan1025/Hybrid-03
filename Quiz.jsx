import React, { useState, useEffect } from 'react'
import AnswerSection from './AnswerSection'
import "./QuizStyle.css"

const Quiz = () => {
    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)

    // Fetch 5 random multiple-choice questions
    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple')
            const data = await response.json()

            const formattedQuestions = data.results.map((q) => {
                const answers = [...q.incorrect_answers, q.correct_answer]
                return {
                    ...q,
                    answers: answers.sort(() => Math.random() - 0.5) // Shuffle answers
                }
            })

            setQuestions(formattedQuestions)
        } catch (error) {
            console.error("Error fetching questions:", error)
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    // Handle answer selection
    const handleAnswerSelect = (questionIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer
        }))
    }

    // Submit quiz & calculate score
    const handleSubmitQuiz = () => {
        let calculatedScore = 0
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correct_answer) {
                calculatedScore++
            }
        })
        setScore(calculatedScore)
        setShowScore(true)
    }

    // Restart quiz
    const handlePlayAgainClick = () => {
        setShowScore(false)
        setScore(0)
        setSelectedAnswers({})
        fetchQuestions()
    }

    return (
        <div className='quiz'>
            <h1>Trivia API</h1>
            {showScore ? (
                <div className='score-section'>
                    <h2>Your Score: {score} / {questions.length}</h2>
                    <h3>Correct Answers:</h3>
                    <ul>
                        {questions.map((q, index) => (
                            <li key={index}>
                                <strong>Q{index + 1}:</strong> {q.question} <br />
                                <span className='correct-answer'>Correct: {q.correct_answer}</span>
                            </li>
                        ))}
                    </ul>
                    <button className='playAgain-btn' onClick={handlePlayAgainClick}>Play Again</button>
                </div>
            ) : (
                <>
                    {questions.length > 0 ? (
                        <div className='question-section'>
                            {questions.map((q, index) => (
                                <div key={index} className='question-block'>
                                    <div className='question-text'>{q.question}</div>
                                    <AnswerSection
                                        questionIndex={index}
                                        answers={q.answers}
                                        selectedAnswer={selectedAnswers[index]}
                                        handleAnswerSelect={handleAnswerSelect}
                                    />
                                </div>
                            ))}
                            <button className='submit-btn' onClick={handleSubmitQuiz}>Submit Quiz</button>
                        </div>
                    ) : <p>Loading...</p>}
                </>
            )}
        </div>
    )
}

export default Quiz