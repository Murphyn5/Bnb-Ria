const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, ReviewImage, Review } = require('../../db/models');
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
                model: Spot
            },
            {
                model: User
            },
            {
                model: ReviewImage
            }
        ]
    })

    console.log(reviews)

    return res.json(({
        Reviews: reviews
    }))
  }


)

module.exports = router;
