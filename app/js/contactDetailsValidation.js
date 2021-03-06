import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from './validation';

const contactDetailsValidation = createValidator({
  mobile: [maxLength(10)],
  landline: [maxLength(10)],
  street: [required],
  postalCode: [required, integer, maxLength(5)],
  city: [required]
});
export default memoize(10)(contactDetailsValidation);