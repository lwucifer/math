import Auth from './Auth';

const auth = $axios => {
  return new Auth($axios);
};

export {
  auth
};
