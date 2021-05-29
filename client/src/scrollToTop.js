import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: pathname[1] === 'p' ? 'auto' : 'smooth' });
  }, [pathname]);

  return null;
}
