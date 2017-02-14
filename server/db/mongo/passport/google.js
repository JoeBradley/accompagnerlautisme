import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  console.log('start');
  if (req.user) {
    console.log('already someone in the session');
    return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'Il y a déjà un compte Google qui vous appartient.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken });
        user.profile.displayName = user.profile.displayName || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || profile._json.picture;
        user.save((err) => {
          done(err, user, { message: 'Le compte Google a été lié.' });
        });
      });
    });
  }
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    console.log(existingUser);
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        console.log('existing');
        console.log(existingEmailUser);
        return done(null, false, { message: 'Il y a déjà un compte qui utilise cette adresse email.' });
      }
      const user = new User();
      user.email = profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken });
      user.profile.displayName = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
