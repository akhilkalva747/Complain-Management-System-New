// Auth helpers - manage JWT token in sessionStorage

export const setToken = (token) => sessionStorage.setItem('jwtToken', token);

export const getToken = () => sessionStorage.getItem('jwtToken');

export const removeToken = () => sessionStorage.removeItem('jwtToken');

export const isAuthenticated = () => !!getToken();

export const logout = (role) => {
  sessionStorage.clear();
  // Redirect handled by calling code
  return `/${role}/login`;
};
