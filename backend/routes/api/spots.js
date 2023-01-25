const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, ReviewImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//Get Current User Reviews

router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const spots = await Spot.scope('showAllInfo').findAll({
            where: {
                ownerId: req.user.id,
            }
        })

        const spotsPOJO = []

        for (let i = 0; i < spots.length; i++) {

            let spot = spots[i]
            const spotPOJO = await spot.toJSON()

            //adds the averageStars

            const reviewSum = await Review.sum('stars', {
                where: {
                    spotId: spotPOJO.id
                }
            })

            const reviewCount = await Review.count({
                where: {
                    spotId: spotPOJO.id
                }
            })


            if (reviewCount > 0) {
                spotPOJO.avgRating = reviewSum / reviewCount
            }

            //adds to previewImage

            const spotImage = await SpotImage.findOne({
                where: {
                    spotId: spotPOJO.id
                }
            })


            if (spotImage.preview === true) {
                spotPOJO.previewImage = spotImage.url
            } else {
                spotPOJO.previewImage = null
            }

            spotsPOJO.push(spotPOJO)
        }




        return res.json({
            Spots: spotsPOJO
        })
    }
)

router.get(
    '/:id',
    async (req, res, next) => {
        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "Owner"
                },
                {
                    model: SpotImage
                }
            ]
        })

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }


        const spotPOJO = await spot.toJSON()

        //adds the averageStars

        const reviewSum = await Review.sum('stars', {
            where: {
                spotId: spotPOJO.id
            }
        })

        const reviewCount = await Review.count({
            where: {
                spotId: spotPOJO.id
            }
        })


        if (reviewCount > 0) {
            spotPOJO.avgRating = reviewSum / reviewCount
        }

        spotPOJO.numReviews = reviewCount

        return res.json(spotPOJO)
    }
)

router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            return next(err)
        }

        if (spot.ownerId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        await spot.destroy()

        return res.json({
            message: "Successfully deleted",
            satusCode: 200
        })
    }
)


router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.scope('showAllInfo').findAll()

        const spotsPOJO = []

        for (let i = 0; i < spots.length; i++) {

            let spot = spots[i]
            const spotPOJO = await spot.toJSON()

            //adds the averageStars

            const reviewSum = await Review.sum('stars', {
                where: {
                    spotId: spotPOJO.id
                }
            })

            const reviewCount = await Review.count({
                where: {
                    spotId: spotPOJO.id
                }
            })


            if (reviewCount > 0) {
                spotPOJO.avgRating = reviewSum / reviewCount
            }

            //adds to previewImage

            const spotImage = await SpotImage.findOne({
                where: {
                    spotId: spotPOJO.id
                }
            })


            if (spotImage.preview === true) {
                spotPOJO.previewImage = spotImage.url
            } else {
                spotPOJO.previewImage = null
            }

            spotsPOJO.push(spotPOJO)
        }




        return res.json({
            Spots: spotsPOJO
        })
    }
)

router.get(
    '/:id/reviews',
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }


        const reviews = await Review.findAll({
            where: {
                spotId: req.params.id
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


        return res.json({
            Reviews: reviews
        })
    }

)

module.exports = router;
