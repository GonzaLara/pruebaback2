import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash } from "../helpers/hash.util.js";
// import { usersManager } from "../dao/factory.js";
import usersRepository from "../repositories/users.repository.js";
import { createToken } from "../helpers/token.util.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const { city } = req.body;
        if (!city) {
          return done(null, null, {
            message: "Datos invalidos",
            statusCode: 400,
          });
        }

        let user = await usersRepository.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "Credenciales invalidas",
            statusCode: 401,
          });
        }

        user = await usersRepository.createOne(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await usersRepository.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "Credenciales invalidas",
            statusCode: 401,
          });
        }

        const verifyPass = compareHash(password, user.password);
        if (!verifyPass) {
          return done(null, null, {
            message: "Credenciales invalidas",
            statusCode: 401,
          });
        }

        const { isVerified } = user;
        if (!isVerified) {
          return done(null, null, {
            message: "Tenes que verificar tu cuenta primero",
            statusCode: 401,
          });
        }

        const data = {
          _id: user._id,
          role: user.role,
          email,
        };

        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await usersRepository.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: email,
            city: "Google",
          };
          user = await usersRepository.createOne(user);
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };

        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "user",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersRepository.readBy({ _id, role, email });
        if (!user) {
          return done(null, null, {
            message: "Prohibido",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "admin",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersRepository.readBy({ _id, role, email });
        if (!user || user?.role !== "ADMIN") {
          return done(null, null, {
            message: "Prohibido",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
