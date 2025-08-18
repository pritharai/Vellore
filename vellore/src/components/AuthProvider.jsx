import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser, setLoading } from '../redux/authSlice';
import { getProfile } from '../services/userService';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true));

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }

      try {
        const user = await getProfile();
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        localStorage.removeItem('user');
        dispatch(clearUser());
      }
    };

    loadUser();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
