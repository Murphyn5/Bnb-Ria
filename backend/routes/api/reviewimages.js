const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, ReviewImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        console.log('hi')
        const reviewImage = await ReviewImage.scope("showAllInfo").findByPk(req.params.id)

        if (!reviewImage) {
            let err = {}
            err.status = 404
            err.message = "Review Image couldn't be found"
            return next(err)
        }

        const review = await Review.findByPk(reviewImage.reviewId)

        if (review.userId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        await reviewImage.destroy()

        return res.json({
            message: "Successfully deleted",
            satusCode: 200
        })
    }
)

module.exports = router;
