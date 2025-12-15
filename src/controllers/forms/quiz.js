import { getQuestions } from '../../models/forms/quiz.js' 

const quizPage = (req, res) => {
    const questions = getQuestions();

    res.render('forms/quiz', {
        questions: questions
    });
}

const processQuiz = (req, res) => {

}

export { quizPage };