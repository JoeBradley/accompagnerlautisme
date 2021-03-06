import memoize from 'lru-memoize';
import {createValidator, required, minLength, match} from './validation';

const resetPasswordValidation = createValidator({
  password: [required, minLength(6)],
  confirmPassword: [required, match('password')],
});
export default memoize(10)(resetPasswordValidation);