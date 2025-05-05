// src/lib/auth.ts

export const setAuthData = (accessToken: string, refreshToken: string, user: object) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getAccessToken = () => localStorage.getItem('accessToken');
  export const getRefreshToken = () => localStorage.getItem('refreshToken');
  export const getUser = () => {
    const user = localStorage.getItem('user');

  try {
    if (!user || user === 'undefined') return null;
    return JSON.parse(user);
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
  };
  
  export const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };
  