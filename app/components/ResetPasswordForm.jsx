import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import resetPasswordValidation from '../js/resetPasswordValidation';

const ResetPasswordForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="password" type="password" size="4-8" component={RenderField} label="Nouveau mot de passe"/>
        <Field name="confirmPassword" type="password" size="4-8" component={RenderField} label="Confirmez votre mot de passe"/>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="submit" className="btn btn-info" disabled={submitting}>Mettre à jour</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'resetPassword',  // a unique identifier for this form
  validate: resetPasswordValidation,                // <--- validation function given to redux-form
  destroyOnUnmount: true
})(ResetPasswordForm);