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
            } else{
                spotPOJO.previewImage = null
            }

            bookingPOJO.Spot = spotPOJO

            bookingsPOJO.push(bookingPOJO)
        }

        return res.json({
            Bookings: bookingsPOJO
        })
    }
)


router.delete(
    '/:id',
    requireAuth,
    async (req, res, next) => {
        const booking = await Booking.findByPk(req.params.id)

        if(!booking){
            let err = {}
            err.status = 404
            err.message = "Booking couldn't be found"
            return next(err)
        }

        if(booking.userId !== req.user.id){
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        console.log(typeof booking.startDate)

        const bookingStartDate = new Date(booking.startDate)

        if(bookingStartDate < Date.now()){
            let err = {}
            err.status = 403
            err.message = "Bookings that have been started can't be deleted"
            return next(err)
        }

        await booking.destroy()

        return res.json({
            message: "Successfully deleted",
            satusCode: 200
        })
    }
)

module.exports = router;
