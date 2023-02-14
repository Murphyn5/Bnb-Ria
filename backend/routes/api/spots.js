const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

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

            if(reviewCount === 0){
                spotPOJO.avgRating = null
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

        if(reviewCount === 0){
            spotPOJO.avgRating = null
        }

        spotPOJO.numReviews = reviewCount

        return res.json(spotPOJO)
    }
)

router.put(
    '/:id',
    requireAuth,
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }

        if (spot.ownerId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        let err = {
            errors: []
        }

        if (!address) {
            err.errors.push("Street address is required")
        }

        if (!city) {
            err.errors.push("City is required")
        }

        if (!state) {
            err.errors.push("State is required")
        }

        if (!country) {
            err.errors.push("Country is required")
        }

        if (lat !== undefined ) {
            if (isNaN(parseFloat(lat))) {
                err.errors.push("Latitude is not valid")
            }
        }

        if (lng !== undefined) {
            if (isNaN(parseFloat(lng))) {
                err.errors.push("Longitude is not valid")
            }
        }

        if (name) {
            if (name.length >= 50) {
                err.errors.push("Name must be less than 50 characters")
            }
        }

        if (!description) {
            err.errors.push("Description is required")
        }

        if (!price) {
            err.errors.push("Price per day is required")
        }

        if (err.errors.length > 0) {
            err.status = 400
            err.message = "Validation error"
            return next(err)
        }

        const newSpot = await spot.update({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });

        return res.json(
            newSpot
        );
    }
);


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

    async (req, res, next) => {

        let queryMinPrice = 0
        let queryMaxPrice = 10000000000
        let queryMinLng = -1000
        let queryMaxLng = 1000
        let queryMinLat = -1000
        let queryMaxLat = 1000


        let err = {
            errors: []
        }



        if (req.query.minLat) {
            const minLat = parseFloat(req.query.minLat)

            if (isNaN(minLat)) {
                err.errors.push("Minimum latitude is invalid")
            }
            else {
                queryMinLat = minLat
            }
        }


        if (req.query.maxLat) {
            const maxLat = parseFloat(req.query.maxLat)

            if (isNaN(maxLat)) {
                err.errors.push("Maximum latitude is invalid")
            }
            else {
                queryMaxLat = maxLat
            }
        }


        if (req.query.minLng) {
            const minLng = parseFloat(req.query.minLng)

            if (isNaN(minLng)) {
                err.errors.push("Minimum longitude is invalid")
            }
            else {
                queryMinLng = minLng
            }
        }


        if (req.query.maxLng) {
            const maxLng = parseFloat(req.query.maxLng)

            if (isNaN(maxLng)) {
                err.errors.push("Maximum longitude is invalid")
            }
            else {
                queryMaxLng = maxLng
            }
        }


        if (req.query.minPrice) {
            const minPrice = parseFloat(req.query.minPrice)
            if (minPrice < 0) {
                err.errors.push("Minimum price must be greater than or equal to 0")
            } else if (!isNaN(minPrice)) {
                queryMinPrice = minPrice
            }
        }


        if (req.query.maxPrice) {
            const maxPrice = parseFloat(req.query.maxPrice)
            if (maxPrice < 0) {
                err.errors.push("Maximum price must be greater than or equal to 0")
            } else if (!isNaN(maxPrice)) {
                queryMaxPrice = maxPrice
            }
        }

        let query = {
            where: {
                lat: {
                    [Op.gte]: queryMinLat,
                    [Op.lte]: queryMaxLat,
                },
                lng: {
                    [Op.gte]: queryMinLng,
                    [Op.lte]: queryMaxLng,
                },
                price: {
                    [Op.gte]: queryMinPrice,
                    [Op.lte]: queryMaxPrice,
                }
            }
        };

        let page = req.query.page === undefined ? 1 : parseInt(req.query.page);
        let size = req.query.size === undefined ? 20 : parseInt(req.query.size);

        if (page < 0) err.errors.push("Page must be greater than or equal to 0")
        if (size < 0) err.errors.push("Size must be greater than or equal to 0")

        if (page > 10) page = 10
        if (size > 20) size = 20

        if (page >= 1 && size >= 1) {
            query.limit = size;
            query.offset = size * (page - 1);
        }


        if (err.errors.length > 0) {
            err.status = 400
            err.message = "Validation error"
            return next(err)
        }


        const spots = await Spot.scope('showAllInfo').findAll(query)

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

            if(reviewCount === 0){
                spotPOJO.avgRating = null
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
            Spots: spotsPOJO,
            page,
            size
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

router.get(
    '/:id/bookings',
    requireAuth,
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }

        let bookings

        if (req.user.id === spot.ownerId) {
            bookings = await Booking.findAll({
                where: {
                    spotId: req.params.id
                },
                include: [
                    {
                        model: User
                    }
                ]
            })

        } else {
            bookings = await Booking.scope("nonOwnerInfo").findAll({
                where: {
                    spotId: req.params.id
                },
            })
        }




        return res.json({
            Bookings: bookings
        })
    }
)

router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        let err = {
            errors: []
        }

        if (!address) {
            err.errors.push("Street address is required")
        }

        if (!city) {
            err.errors.push("City is required")
        }

        if (!state) {
            err.errors.push("State is required")
        }

        if (!country) {
            err.errors.push("Country is required")
        }

        if (lat !== undefined || lat !== '') {
            if (isNaN(parseFloat(lat))) {
                err.errors.push("Latitude is not valid")
            }
        }

        if (lng !== undefined || lng !== '') {
            if (isNaN(parseFloat(lng))) {
                err.errors.push("Longitude is not valid")
            }
        }

        if (name) {
            if (name.length >= 50) {
                err.errors.push("Name must be less than 50 characters")
            }
        }

        if (!description) {
            err.errors.push("Description is required")
        }

        if (description.length < 30) {
            err.errors.push("Description must be at least 30 characters")
        }

        if (!price) {
            err.errors.push("Price per day is required")
        }

        if (err.errors.length > 0) {
            err.status = 400
            err.message = "Validation error"
            return next(err)
        }


        const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });

        res.status(201)

        return res.json(
            spot
        );
    }
);

router.post(
    '/:id/reviews',
    requireAuth,
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }

        const { review, stars } = req.body;

        let err = {
            errors: []
        }

        if (!review) {
            err.errors.push("Review text is required")
        }

        if (stars !== undefined) {
            if (isNaN(parseInt(stars)) || stars < 1 || stars > 5) {
                err.errors.push("Stars must be an integer from 1 to 5")
            }
        }


        if (err.errors.length > 0) {
            err.status = 400
            err.message = "Validation error"
            return next(err)
        }


        const reviewRes = await Review.create({ userId: req.user.id, spotId: req.params.id, review, stars: parseInt(stars) });

        res.status(201)

        return res.json(
            reviewRes
        );
    }
);

router.post(
    '/:id/images',
    requireAuth,
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }

        if (spot.ownerId !== req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Current User does not have authorization required to complete this action!"
            return next(err)
        }

        const { url, preview } = req.body;

        if(!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg')) {
            let err = {}
            err.status = 403
            err.message = "Url must end with .png, .jpg, or .jpeg!"
            return next(err)
        }

        const spotImage = await SpotImage.create({ spotId: req.params.id, url, preview });

        const resSpotImage = await SpotImage.findByPk(spotImage.id)

        return res.json(
            resSpotImage
        );
    }
);

router.post(
    '/:id/bookings',
    requireAuth,
    async (req, res, next) => {

        const spot = await Spot.scope('showAllInfo').findByPk(req.params.id)

        if (!spot) {
            let err = {}
            err.status = 404
            err.message = "Spot couldn't be found"
            next(err)
        }

        if (spot.ownerId === req.user.id) {
            let err = {}
            err.status = 403
            err.message = "Owners aren't allowed to book their own spots!"
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

        if(bookingStartDate <= Date.now()){
            let err = {}
            err.status = 403
            err.message = "Bookings can't be made for past times!"
            return next(err)
        }

        const bookings = await spot.getBookings()

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

        const booking = await Booking.create({ userId: req.user.id, spotId: req.params.id, startDate, endDate });

        return res.json(
            booking
        );
    }
);


module.exports = router;
