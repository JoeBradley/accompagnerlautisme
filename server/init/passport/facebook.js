import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebook } from '../../../config/secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
  if (!dbPassport || !dbPassport.facebook || !typeof dbPassport.facebook === 'function') {
    console.warn(unsupportedMessage('passport-facebook'));
    return;
  }
  passport.use(new FacebookStrategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
    profileFields: ['id', 'picture.type(large)', 'email', 'displayName', 'gender']
  }, dbPassport.facebook));
};