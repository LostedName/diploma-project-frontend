import React, {useEffect, useRef} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
const SignUpConfirmPage: React.FC = () => {
  const {userConfirmRegistrationAsync} = useActions();
  const navigate = useNavigate();
  const isRequestSent = useRef(false);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('token'));
  const token = searchParams.get('token');
  useEffect(() => {
    if (!isRequestSent.current) {
    if (!token) {
      navigate("/login");
      return;
    }
      isRequestSent.current = true;
      userConfirmRegistrationAsync(token, navigate);
    }
    
  });
  return null;
}

export default SignUpConfirmPage;