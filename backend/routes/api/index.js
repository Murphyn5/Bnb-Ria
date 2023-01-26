const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spotimages.js');
const reviewImagesRouter = require('./reviewimages.js');
const spotsRouter = require('./spots.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter);

router.use('/spot-images', spotImagesRouter)

router.use('/review-images', reviewImagesRouter)

router.use('/spots', spotsRouter);

router.use('/bookings', bookingsRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
