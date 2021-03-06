import memoize from 'lru-memoize';
import {createValidator, required, minLength, maxLength, email, match} from './validation';

const registerValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)],
  email: [required, email],
  password: [required, minLength(6)],
  confirmPassword: [required, match('password')],
  captcharesponse : [required]
});
export default memoize(10)(registerValidation);