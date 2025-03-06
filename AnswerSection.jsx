import React from 'react'
import "./QuizStyle.css"

const AnswerSection = ({ questionIndex, answers, selectedAnswer, handleAnswerSelect }) => {
    return (
        <div className="answer-section">
            {answers.map((answer, index) => (
                <button
                    key={index}
                    className={'answer-btn ${selectedAnswer === answer ? "selected" : ""}'}
                    onClick={() => handleAnswerSelect(questionIndex, answer)}
                >
                    {answer}
                </button>
            ))}
        </div>
    )
}

export default AnswerSection