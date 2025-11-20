'use client';
import PropTypes from 'prop-types';

// @react-router
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @project
import PageLoader from '@/components/PageLoader';
import useCurrentUser from '@/hooks/useCurrentUser';

/***************************  AUTH GUARD  ***************************/

export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { isProcessing, userData } = useCurrentUser();

  useEffect(() => {
    if (!isProcessing && (!userData || Object.keys(userData).length === 0)) {
      navigate('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isProcessing]);

  if (isProcessing) return <PageLoader />;

  return userData && Object.keys(userData).length > 0 ? children : null;
}

AuthGuard.propTypes = { children: PropTypes.node };
