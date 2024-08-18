import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrincipalRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'principal') {
      navigate('/');
    }
  }, [user, navigate]);

  return user.role== 'principal' ? children : null;
};

export default PrincipalRoute;


