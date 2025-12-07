import { getAllPaddles, getTop10Paddles, getPaddleById } from '../../models/paddles/paddles.js';

const paddlesPage = async (req, res) => {
    const paddles = await getAllPaddles();

    res.render('paddles/list', {
        paddles: paddles
    });
};

const top10Page = async (req, res) => {
    const top10 = await getTop10Paddles();
    res.addScript('<script src="/js/second.js"></script>');
    res.render('paddles/topTen', {
        paddles: top10
    });
};

const detailPage = async (req, res) => {
    const paddleID = req.params.id;
    const paddle = await getPaddleById(paddleID);

    res.render('paddles/detail', {
        paddle: paddle
    });
}

export { paddlesPage, top10Page, detailPage };