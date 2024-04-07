import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useDirectAccessPreventer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.fromPreviousStep) {
      navigate('/expense/upload'); 
    }
  }, [location, navigate]);
}

export default useDirectAccessPreventer;