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

router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => {

        const oldBooking = await Booking.findByPk(req.params.id)

        if (!oldBooking) {
            let err = {}
            err.status = 404
            err.message = "Booking couldn't be found"
            next(err)
        }

        if (oldBooking.userId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        const { startDate, endDate } = req.body;

        const bookingStartDate = new Date(startDate)
        const bookingEndDate = new Date(endDate)

        if(bookingEndDate <= bookingStartDate){
            let err = {}
            err.status = 403
            err.message = "endDate cannot be on or before startDate"
            return next(err)
        }

        if(oldBooking.endDate <= Date.now()){
            let err = {}
            err.status = 403
            err.message = "Past bookings can't be modified"
            return next(err)
        }

        if(bookingStartDate <= Date.now()){
            let err = {}
            err.status = 403
            err.message = "Bookings can't be made for past times!"
            return next(err)
        }

        const spot = await await Spot.scope('showAllInfo').findByPk(oldBooking.spotId)
        let bookings = await spot.getBookings()
        bookings = bookings.filter(booking => booking.id !== oldBooking.id)

        let err = {
            errors: []
        }

        for(let i = 0; i < bookings.length; i++){

            let pastbooking = bookings[i]
            const pastBookingStartDate = new Date(pastbooking.startDate)
            const pastBookingEndDate = new Date(pastbooking.endDate)

            if(pastBookingStartDate <= bookingStartDate && bookingStartDate < pastBookingEndDate || pastBookingStartDate === bookingStartDate){
                if(!err.errors.toString().includes("Start")){
                    err.errors.push("Start date conflicts with an existing booking")
                }
            }

            if(pastBookingStartDate < bookingEndDate && bookingEndDate <= pastBookingEndDate || pastBookingEndDate === bookingEndDate){
                if(!err.errors.toString().includes("End")){
                    err.errors.push("End date conflicts with an existing booking")
                }
            }

        }

        if (err.errors.length > 0) {
            err.status = 403
            err.message = "Sorry, this spot is already booked for the specified dates"
            return next(err)
        }

        const newBooking = await oldBooking.update({ userId: req.user.id, spotId: req.params.id, startDate, endDate });

        return res.json(
            newBooking
        );
    }
);


module.exports = router;
