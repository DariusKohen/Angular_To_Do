const express = require('express')

const { User } = require('../db/models')

const router = express.Router()

// Verify Refresh Token Middleware
let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token')
    let _id = req.header('_id')
    let isSessionValid = false

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found'
            })
        }
        req.user_id = user._id
        req.userObject = user
        req.refreshToken = refreshToken

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true
                }
            }
        })
        if (isSessionValid) {
            next()
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }
    }).catch((e) => {
        res.status(401).send(e)
    })
}

/**
 * POST /users
 * Purpose: Sign up
 */
router.post('/users', (req, res) => {
    let newUser = new User(req.body)

    newUser.save().then(() => {
        return newUser.createSession()
    }).then((refreshToken) => {
        // Session created, Generate an access auth token for the user
        return newUser.generateAccessAuthToken().then((accessToken) => {
            // Access auth token generated
            return { accessToken, refreshToken }
        })
    }).then((authTokens) => {
        res.header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

/**
 * POST /users/login
 * Purpose: Login
 */
router.post('/users/login', (req, res) => {
    User.findByCredentials(
        req.body.email,
        req.body.password
    ).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created, Generate an access auth token for the user
            return user.generateAccessAuthToken().then((accessToken) => {
                // Access auth token generated
                return { accessToken, refreshToken }
            })
        }).then((authTokens) => {
            res.header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user)
        })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
router.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

module.exports = router