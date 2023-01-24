const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//Get Current User

router.get(
  '/current',
  requireAuth,
  async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot
            },
            {
                model: User
            }
        ]
    })

    console.log(bookings)

    return res.json(({
        Bookings: bookings
    }))
  }


)

module.exports = router;
