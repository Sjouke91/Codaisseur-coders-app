const initialState = {
  user: null, // the logged-in user
  accessToken: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOGEDIN":
      return { user: payload.user, accessToken: payload.jwt };

    case "USER_LOGOUT":
      return { user: null, accessToken: null };
    default:
      return state;
  }
};
