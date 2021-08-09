import { useLocation } from 'react-router';

export const useURLSearchParams = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};
