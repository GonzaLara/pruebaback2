import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { usersManager } from "../data/manager.mongo.js";
import { createToken } from "../helpers/token.util.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  // Nombre de la estrategia
  "register",
  // Constructor de la estrategia
  new LocalStrategy(
    // Objeto de configuracion de la estrategia
    { passReqToCallback: true, usernameField: "email" },
    // Callback de la logica de la estrategia
    async (req, email, password, done) => {
      try {
        const { city } = req.body;
        if (!city) {
          return done(null, null, {
            message: "Datos invalidos",
            statusCode: 400,
          });
        }

        // validar si el usuario ya fue registrado
        let user = await usersManager.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "Credenciales invalidas",
            statusCode: 401,
          });
        }

        // registrar usuario, crearlo con la contraseña protegida
        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);
        // Gracias a este done se agregan los datos del usuario
        // al objeto de requerimientos(req.user)
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
        // validar si el usuario ya fue registrado
        let user = await usersManager.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "Credenciales invalidas",
            statusCode: 401,
          });
        }

        const verify = compareHash(password, user?.password);
        // validar si la contraseña es correcta
        if (!verify) {
          return done(null, null, {
            message: "Credenciales invalidas",
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
        let user = await usersManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await usersManager.createOne(user);
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
        const user = await usersManager.readBy({ _id, role, email });
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
        const user = await usersManager.readBy({ _id, role, email });
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
