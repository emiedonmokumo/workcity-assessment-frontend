import { createContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  token: string;
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: User, expiresAt: string) => void; // ISO string
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: '',
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedExpiresAt = localStorage.getItem('expiresAt');

    if (!storedToken || !storedUser || !storedExpiresAt) {
      setIsLoggedIn(false);
      return;
    }

    const expiresAtMs = new Date(storedExpiresAt).getTime();

    if (Date.now() >= expiresAtMs) {
      logout(); // Expired session
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
    setIsLoggedIn(true);

    const timeout = expiresAtMs - Date.now();
    const timer = setTimeout(logout, timeout);
    setLogoutTimer(timer);
  }, []);

  const login = (newToken: string, newUser: User, expiresAt: string) => {
    const expiresAtMs = new Date(expiresAt).getTime();

    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('expiresAt', expiresAt); // store as ISO string

    if (logoutTimer) clearTimeout(logoutTimer);
    const timeout = expiresAtMs - Date.now();
    const timer = setTimeout(logout, timeout);
    setLogoutTimer(timer);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    setIsLoggedIn(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresAt');

    if (logoutTimer) clearTimeout(logoutTimer);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
