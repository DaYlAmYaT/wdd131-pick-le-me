import { getQuestions } from '../../models/forms/quiz.js' 

const quizPage = async (req, res) => {
    const questions = await getQuestions();

    res.render('quiz', {
        questions: questions
    });
}

export { quizPage };