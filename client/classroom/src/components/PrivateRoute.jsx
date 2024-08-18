import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return !user ? children : null;
};

export default PrivateRoutes;


