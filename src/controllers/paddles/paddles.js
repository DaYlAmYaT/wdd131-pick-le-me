import { getAllPaddles, getTop10Paddles, getPaddleById } from '../../models/paddles/paddles.js';

const paddlesPage = async (req, res) => {
    const sort = req.query.sort || 'alphabet'
    const paddles = await getAllPaddles(sort);

    res.render('paddles/list', {
        paddles: paddles,
        sort: sort
    });
};

const top10Page = async (req, res) => {
    const preference = req.query.preference;

    const top10 = await getTop10Paddles(preference);
    res.render('paddles/topTen', {
        preference: preference,
        paddles: top10
    });
};

const detailPage = async (req, res) => {
    const paddleID = req.params.paddleId;
    const paddle = await getPaddleById(paddleID);

    res.render('paddles/detail', {
        paddle: paddle
    });
}

export { paddlesPage, top10Page, detailPage };