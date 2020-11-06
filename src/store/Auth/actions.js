// src/store/auth/actions.js

import axios from "axios";

// A thunk creator
export function login(email, password) {
  return async function thunk(dispatch, getState) {
    try {
      const res = await axios.post(
        "https://codaisseur-coders-network.herokuapp.com/login",
        {
          email,
          password,
        }
      );

      const { jwt } = res.data;

      try {
        const me = await axios.get(
          "https://codaisseur-coders-network.herokuapp.com/me",
          { headers: { Authorization: `Bearer ${jwt}` } }
        );

        const user = me.data;

        dispatch(userLogedIn(user, jwt));
        localStorage.setItem("jwt", jwt);
      } catch (e) {
        console.log("is it here?", e.message);
        localStorage.removeItem("jwt");
      }
    } catch (e) {
      console.log("is it here?", e.message);
      localStorage.removeItem("jwt");
    }
  };
}

export function userLogedIn(user, jwt) {
  return {
    type: "USER_LOGEDIN",
    payload: { user, token: jwt },
  };
}

export const bootstrapLogin = () => async (dispatch, getState) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    // make /me call
    const userProfile = await getUserProfile(jwt);
    console.log("user profile loaded automatically", userProfile);
    dispatch(userLogedIn(userProfile, jwt));
  } else {
    console.log("no token stored in localstorage");
  }
};

const getUserProfile = async (token) => {
  try {
    // request GET to /me
    const response = await axios.get(
      "https://codaisseur-coders-network.herokuapp.com/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export function userLogout(dispatch, getState) {
  console.log("do i get here");
  dispatch({ type: "USER_LOGOUT" });
  localStorage.removeItem("jwt");
}
