import React, {useEffect} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './signUpCheckEmailPage.scss';
import { useActions } from '../../../../hooks/useActions';
import { Notify } from '../../../../services/toast';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const SignUpCheckEmailPage: React.FC = () => {
  const { isResendConfirmEmailAvailable } = useTypedSelector((state) => state.userStore.states);
  const {userResendRegistrationVerifyLinkAsync, setResendVerifySignUpAvailableAction} = useActions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const onResendClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email) {
      userResendRegistrationVerifyLinkAsync(email, navigate);
    } else {
      Notify.warn("Email не может быть пустым.");
    }
  }

  useEffect(() => {
    if (!isResendConfirmEmailAvailable) {
      navigate("/login");
    }
    return () => {
      setResendVerifySignUpAvailableAction(false);
    }
  });
  return (
    <main className="sign_up_check_email_page">
      <form className="sign_up_check_email_form">
        <h1>Check your email</h1>
        <span className="phrase">We sent a validation link {email}</span>
        <span className="phrase">Did not receive the email? Check your spam filter or resend.</span>
        <button onClick={onResendClick}>Click to resend</button>
        <div className="bottom-phrase">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </main>
  );
}

export default SignUpCheckEmailPage;