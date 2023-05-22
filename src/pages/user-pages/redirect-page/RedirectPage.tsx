import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  redirectPath: string,
}

const RedirectPage: React.FC<RedirectProps> = ({redirectPath}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(redirectPath);
  });
  return null;
}

export default RedirectPage;