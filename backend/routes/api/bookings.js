const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Booking, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//Get Current User Bookings

router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const bookings = await Booking.findAll({
            where: {
                userId: req.user.id
            }
        })

        const bookingsPOJO = []

        for (let i = 0; i < bookings.length; i++) {

            let booking = bookings[i]
            const bookingPOJO = await booking.toJSON()

            const spot = await Spot.findByPk(bookingPOJO.spotId)

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

            bookingPOJO.Spot = spotPOJO

            bookingsPOJO.push(bookingPOJO)
        }

        return res.json(({
            Bookings: bookingsPOJO
        }))
    }


)

module.exports = router;
