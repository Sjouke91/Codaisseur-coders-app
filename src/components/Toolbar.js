import React from "react";
import { selectUser } from "../store/Auth/selector";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../store/Auth/actions";

export default function Toolbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function logout(event) {
    console.log("pressed!");
    dispatch(userLogout);
  }
  return (
    <div>
      <nav>
        <ul>
          <li>
            {user ? (
              <h3>
                {user.name} <button onClick={(e) => logout()}>logout</button>{" "}
              </h3>
            ) : (
              <div>
                <Link to="/login">Login</Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
