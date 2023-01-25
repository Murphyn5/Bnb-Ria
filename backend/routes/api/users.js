const express = require('express')
const {
  Validator
} = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;


    const otherUser1 = await User.scope("currentUser").findOne({
      where: {
        email: email
      }
    })

    const otherUser2 = await User.scope("currentUser").findOne({
      where: {
        username: username
      }
    })

    let err = {
      errors: []
    }

    if (otherUser1) {
      err.errors.push("User with that email already exists")
    }

    if (otherUser2) {
      err.errors.push("User with that username already exists")
    }

    if (err.errors.length > 0) {
      err.status = 403
      err.message = "User already exists"
      return next(err)
    }

    const user = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, user);

    const userPOJO = await user.toJSON()

    userPOJO.token = token

    return res.json({
      user: userPOJO
    });
  }
);

//Get Current User

router.get(
  '/current',
  requireAuth,
  async (req, res) => {
    const user = req.user
    return res.json({
      user: user
    });
  }


)

module.exports = router;
