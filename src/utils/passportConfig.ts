import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User, { UserDocument } from '../models/User';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user: UserDocument | null = await User.findOne({ username });
      if (!user) return done(null, false);

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: UserDocument | null) => {
    done(err, user);
  });
});

export default passport;
