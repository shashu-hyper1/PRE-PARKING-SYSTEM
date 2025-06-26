export const isLoggedIn = () => {
  return localStorage.getItem('userEmail') !== null;
};

export const login = (email) => {
  localStorage.setItem('userEmail', email);
};

export const logout = () => {
  localStorage.clear();
};
