const mongoose = require("mongoose")
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

const jwtSecret = "kwapk3zrswa262hbs4merzwtg39fhfk6v24u4yyssxz9whrxkh6"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  sessions: [
    {
      token: {
        type: String,
        required: true
      },
      expiresAt: {
        type: Number,
        required: true
      }
    }
  ]
})

UserSchema.methods.toJSON = function () {
  // Return the document except the password and sessions
  return _.omit(this.toObject(), ["password", "sessions"])
}

UserSchema.methods.generateAccessAuthToken = function () {
  return new Promise((resolve, reject) => {
    // Create the JSON Web Token
    jwt.sign({ _id: this._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (err, token) => {
      if (!err) {
        resolve(token)
      } else {
        reject()
      }
    })
  })
}

UserSchema.methods.generateRefreshAuthToken = function () {
  // This method simply generates a 64byte hex string - it doesn't save it to the database. saveSessionToDatabase() does that.
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (!err) {
        // Return the token
        return resolve(buf.toString("hex"))
      }
    })
  })
}

UserSchema.methods.createSession = function () {
  return this.generateRefreshAuthToken().then((refreshToken) => {
      return saveSessionToDatabase(user, refreshToken)
    }).then((refreshToken) => {
      // Saved to database, return the refresh token
      return refreshToken
    }).catch((e) => {
      return Promise.reject("Failed to save session to database.\n" + e)
    })
}

// Model methods

UserSchema.statics.getJWTSecret = () => {
  return jwtSecret
}

UserSchema.statics.findByIdAndToken = function (_id, token) {
  // Used in auth middleware (verifySession)
  return this.findOne({
    _id,
    "sessions.token": token,
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
        return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user)
        } else {
          reject()
        }
      })
    })
  })
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  let secondsSinceNow = Date.now() / 1000
  return expiresAt <= secondsSinceNow
}

// Middlewares section

// Runs before a user document is saved
UserSchema.pre("save", function (next) {
  let user = this
  let costFactor = 10

  if (user.isModified("password")) {
    // Generate salt and hash password
    bcrypt.genSalt(costFactor, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

// Helper methods
let saveSessionToDatabase = (user, refreshToken) => {
  return new Promise((resolve, reject) => {
    let expiresAt = generateRefreshTokenExpiryTime()

    user.sessions.push({ token: refreshToken, expiresAt })
    user.save().then(() => {
      return resolve(refreshToken)
    }).catch((e) => {
      reject(e)
    })
  })
}

let generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = 10
  let secondsUntilExpire = daysUntilExpire * 24 * 60 * 60

  return Date.now() / 1000 + secondsUntilExpire
}

const User = mongoose.model("User", UserSchema)

module.exports = User
