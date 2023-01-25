const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//Get Current User Reviews

router.get(
  '/current',
  requireAuth,
  async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User
            },
            {
                model: ReviewImage
            }
        ]
    })

    const reviewsPOJO = []

    for (let i = 0; i < reviews.length; i++) {

        let review = reviews[i]
        const reviewPOJO = await review.toJSON()

        const spot = await Spot.findByPk(reviewPOJO.spotId)

        const spotPOJO = await spot.toJSON()

        //adds to previewImage

        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spotPOJO.id
            }
        })


        if (spotImage.preview === true) {
            spotPOJO.previewImage = spotImage.url
        } else{
            spotPOJO.previewImage = null
        }

        reviewPOJO.Spot = spotPOJO

        reviewsPOJO.push(reviewPOJO)
    }

    return res.json({
        Reviews: reviewsPOJO
    })
  }

)

router.post(
    '/:id/reviewimages',
    requireAuth,
    async (req, res, next) => {

        const review = await Review.findByPk(req.params.id)

        if (!review) {
            let err = {}
            err.status = 404
            err.message = "Review couldn't be found"
            next(err)
        }

        if (review.userId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        const reviewImages = await review.getReviewImages()

        if(reviewImages.length === 10){
            let err = {}
            err.status = 403
            err.message = "Maximum number of images for this resource was reached"
            return next(err)
        }

        const { url } = req.body;

        const reviewImage = await ReviewImage.create({ reviewId: req.params.id, url });

        const resReviewImage = await ReviewImage.findByPk(reviewImage.id)

        return res.json(
            resReviewImage
        );
    }
);

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const review = await Review.findByPk(req.params.id)

        if(!review){
            let err = {}
            err.status = 404
            err.message = "Review couldn't be found"
            return next(err)
        }

        if(review.userId !== req.user.id){
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        await review.destroy()

        return res.json({
            message: "Successfully deleted",
            satusCode: 200
        })
    }
)

module.exports = router;
