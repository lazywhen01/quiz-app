const questions = [
    {
        question: 'What is 1 + 1',
        answers: [
            { text: '1', correct: false},
            { text: '2', correct: true},
            { text: '3', correct: false},
            { text: '4', correct: false},
        ]
    },
    {
        question: 'What is 1 + 5',
        answers: [
            { text: '10', correct: false},
            { text: '2', correct: false},
            { text: '6', correct: true},
            { text: '4', correct: false},
        ]
    },
    {
        question: 'What is 5 + 5',
        answers: [
            { text: '10', correct: true},
            { text: '7', correct: false},
            { text: '9', correct: false},
            { text: '11', correct: false},
        ]
    },
    {
        question: 'What is 6 + 7',
        answers: [
            { text: '11', correct: false},
            { text: '12', correct: false},
            { text: '14', correct: false},
            { text: '13', correct: true},
        ]
    },
    {
        question: 'What is 6 + 6',
        answers: [
            { text: '10', correct: false},
            { text: '12', correct: true},
            { text: '9', correct: false},
            { text: '11', correct: false},
        ]
    },
]

const questionElement = document.getElementById('question') 
const answerElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

startQuiz = () => {
    currentQuestionIndex = 0
    score = 0 
    nextButton.innerHTML = 'Next';
    showQuestion();
} 
showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML =  '<i>' + questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerElement.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    }) 
}
resetState = () => {
    nextButton.style.display = 'none'
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild)
    }
}

selectAnswer = (e) => {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === 'true'
    if(isCorrect){
        selectBtn.classList.add('correct')
        score++
    }else{
        selectBtn.classList.add('incorrect')
    }
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display = 'block'
}
showScore = () => {
    resetState()
    questionElement.innerHTML = `You score ${score} out of ${questions.length}`
    nextButton.innerHTML = 'Play again'
    nextButton.style.display = 'block'
}
handleNextButton = () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener('click', ()=>{
     if(currentQuestionIndex < questions.length){
        handleNextButton()
     }else{
        startQuiz()
     }
})

startQuiz()