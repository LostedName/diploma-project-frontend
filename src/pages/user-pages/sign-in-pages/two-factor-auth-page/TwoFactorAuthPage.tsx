import React, {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';

import './twoFactorAuthPage.scss';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { TokenType, deleteToken } from '../../../../services/jwt';
import CellInput from '../../../../components/UI/CellInput/CellInput';
import { Notify } from '../../../../services/toast';

const TwoFactorAuthPage: React.FC = () => {
  const { isTwoFactorAuthAvailable } = useTypedSelector((state) => state.userStore.states);
  const [sixDigitCode, setSixDigitCode] = useState<string>('');
  const [authErrorMessage, setAuthErrorMessage] = useState<string>('');
  const [isResendingCode, setIsResendingCode] = useState<boolean>(false);
  const [lastResendCodeTime, setLastResendCodeTime] = useState<number>(0);

  const {setTwoFactorAuthAvailableAction, userResendTwoFactorAuthCodeAsync, userConfirmTwoFactorAuthCodeAsync} = useActions();
  const navigate = useNavigate();

  const onBackClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTwoFactorAuthAvailableAction(false);
    deleteToken(TokenType.TwoFactorAuth);
  }

  const onSubmit = useCallback(async () => {
    console.log("CODE", sixDigitCode.toLowerCase());
    userConfirmTwoFactorAuthCodeAsync(sixDigitCode.toLowerCase(), setAuthErrorMessage, navigate)
  }, [sixDigitCode]);

  useEffect(() => {
    if (sixDigitCode.length === 6) {
      onSubmit();
    }
  }, [sixDigitCode, onSubmit]);

  const onResend = useCallback(async () => {
    if (isResendingCode) {
      return;
    }

    const now = Date.now();
    if (now - lastResendCodeTime < 60000 * 3) {
      Notify.warn('Пожалуйста, подождите перед отправкой нового кода');
      return;
    }

    setIsResendingCode(true);

    userResendTwoFactorAuthCodeAsync(navigate);
    setLastResendCodeTime(now);
    setIsResendingCode(false);
  }, [isResendingCode, lastResendCodeTime]);

  
  const onResendClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onResend();
  }

  useEffect(() => {
    if (!isTwoFactorAuthAvailable) {
      navigate('/login');
      return;
    };
  });
  return (
    <main className="two_factor_auth_page">
      <form className="two_factor_auth_form">
        <h1>2-ух факторная аутентификация</h1>
        <span className="phrase">Пожалуйста, проверьте почту, на неё был отправлен 6-ти значный код.</span>
        <div className='cells_wrapper'>
        <CellInput
                  sixDigitCode={sixDigitCode}
                  setSixDigitCode={setSixDigitCode}
                  setAuthErrorMessage={setAuthErrorMessage}
                  authErrorMessage={authErrorMessage}
                  cellNumber={6}
                  onChange={() => {}}
                  />
        </div>
        <small className="text-[#D64747] text-[12px] px-[12px]">{authErrorMessage}</small>
        <span className="phrase">Не получили код?</span>
        <button onClick={onResendClick}>Отправить код ещё раз</button>
        <button onClick={onBackClick}>Назад</button>
      </form>
    </main>
  );
}

export default TwoFactorAuthPage;