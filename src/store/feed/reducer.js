const initialState = {
  loading: true,
  posts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOAD_POST":
      return { ...state, ...payload };

    default:
      return state;
  }
};
