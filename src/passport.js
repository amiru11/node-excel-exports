import bcrypt from 'bcrypt-nodejs'
import passport from 'passport'
import passportLocal from 'passport-local'

import models from './models/index'

const LocalStrategy = passportLocal.Strategy

export default () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      models.User.findOne({
        where: {
          username
        },
        attributes: ['id', 'username', 'password', 'nickname', 'isAdmin']
      })
        .then(user => {
          if (user) {
            const valid = bcrypt.compareSync(password, user.password)
            if (!valid) {
              return done(null, false, { message: 'Incorrect password.' })
            }

            const { id, username, nickname, isAdmin } = user

            return done(null, {
              id,
              username,
              nickname,
              isAdmin
            })
          } else {
            return done(null, false, { message: 'Incorrect username.' })
          }
        })
        .catch(err => done(err))
    })
  )
}
