import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginThunkService } from "../../store/thunk/UserThunk";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { Loader } from "lucide-react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const loginuser = async () => {
  try {
    const response = await dispatch(LoginThunkService({ email, password })).unwrap(); // ✅ wait for real data

    // ✅ Login successful — check role and navigate
    if (response.result.role === "admin") {
      nav("/admin/home");
    } else {
      nav("/");
    }

  } catch (err) {
    //  Login failed — error already set in Redux
    console.log("Login failed", err);
  }
};

  // signup
  const navtosignup = () => {
    nav("/signup");
  };

  if (loading) return <Loader />;

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          className="input"
          placeholder="Email"
          value={email}
        />

        <label className="label">Password</label>
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          className="input"
          placeholder="Password"
          value={password}
        />
        {error && <ErrorMessage message={error} />}
        <button onClick={() => loginuser()} className="btn btn-neutral mt-4">
          Login
        </button>
        <button onClick={navtosignup} className="btn btn-neutral mt-4">
          Sign up
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
