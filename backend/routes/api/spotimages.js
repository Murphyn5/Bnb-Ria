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
        const spotImage = await SpotImage.scope("showAllInfo").findByPk(req.params.id)

        if (!spotImage) {
            let err = {}
            err.status = 404
            err.message = "Spot Image couldn't be found"
            return next(err)
        }

        const spot = await Spot.findByPk(spotImage.spotId)

        if (spot.ownerId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        console.log('hi')

        await spotImage.destroy()

        return res.json({
            message: "Successfully deleted",
            satusCode: 200
        })
    }
)

module.exports = router;
