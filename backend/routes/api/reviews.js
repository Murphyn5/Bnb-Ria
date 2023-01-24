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
        }

        reviewPOJO.Spot = spotPOJO

        reviewsPOJO.push(reviewPOJO)
    }

    console.log(reviews)

    return res.json(({
        Reviews: reviewsPOJO
    }))
  }


)

module.exports = router;
