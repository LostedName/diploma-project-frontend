import React, {useEffect} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './signUpConfirmedPage.scss';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const SignUpConfirmedPage: React.FC = () => {
  const { isSignUpConfirmedAvailable } = useTypedSelector((state) => state.userStore.states);
  const {setSignUpConfirmedAvailableAction} = useActions();
  const navigate = useNavigate();

  const onGoToClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
    setSignUpConfirmedAvailableAction(false);
  }

  useEffect(() => {
    if (!isSignUpConfirmedAvailable) {
      navigate('/login');
      return;
    };
  });
  return (
    <main className="sign_up_confirmed_page">
      <form className="sign_up_confirmed_form">
        <h1>Your email successfully verified!</h1>
        <span className="phrase">Now you can sign in your account.</span>
        <button onClick={onGoToClick}>Go to sign in</button>
        <div className="bottom-phrase">
          <Link to="/login">Back</Link>
        </div>
      </form>
    </main>
  );
}

export default SignUpConfirmedPage;