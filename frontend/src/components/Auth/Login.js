import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmailIcon, GoogleIcon, PasswordLock } from "../../assets/svg";
import { Loading, MetaData } from "../../helper";
import { clearErrors, loginAction } from "../../redux/actions/userAction";
import { Input, Label } from "../Common";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, err } = useSelector((state) => state.user);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const { email, password } = login;

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction(email, password));
  };

  const search = location.search;
  const redirect = search ? `/${search.split("=")[1]}` : "/account";

  useEffect(() => {
    if (err) {
      toast.error(err.message || err);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, err, isAuthenticated, navigate, redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <MetaData title="Login | Q - Commerce" />
      {loading && <Loading />}
      <div className="w-full max-w-lg flex flex-col shadow-md px-6 md:px-12 lg:px-14 py-8 md:py-12 lg:py-14 rounded-md bg-white">
        <button className="flex items-center justify-center my-8  rounded py-3 bg-gray-100">
          <GoogleIcon />
          <h3 className="ml-4 font-medium">Login with Google</h3>
        </button>
        <div className="relative mt-8 h-px bg-gray-400">
          <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              Or Login With Email
            </span>
          </div>
        </div>
        <form className="mt-10" onSubmit={loginSubmitHandler}>
          {/* Email  */}

          <div className="flex flex-col mb-7">
            <Label f="email">E-Mail Address</Label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                value={email}
                plc="Enter Your Email"
                icon={<EmailIcon />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Password  */}

          <div className="flex flex-col mb-7">
            <Label f="password">Password</Label>
            <div className="relative">
              <Input
                type="password"
                name="password"
                value={password}
                plc="Enter Your Password"
                icon={<PasswordLock />}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center -mt-4">
            <div className="flex ml-auto">
              <Link
                to="/password/forget"
                className="inline-flex text-xs sm:text-sm italic pt-2"
              >
                Forgot Your Password ?
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <input
              type="submit"
              value="Login"
              className="cursor-pointer w-full py-3 flex items-center justify-center text-sm sm:text-base font-medium text-center duration-500 rounded-md text-white bg-gray-900 hover:bg-gray-600"
            />
          </div>
        </form>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/auth/register"
            className="pt-1 font-medium text-xs text-center"
          >
            You don't have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
}
