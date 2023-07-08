import {Link, useLocation, useNavigate} from "react-router-dom";
import {updateProfile} from "@firebase/auth";
import {auth} from "../../config/firebase";
import {useForm} from "react-hook-form";
import {uesAuthContext} from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/Button";

const Register = () => {
  const {createUser, logInUserWithGoogle, logOutUser} = uesAuthContext();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const {name, email, password, photo_url} = data;

    createUser(email, password)
      .then(() => {
        // update user name and photoURL
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo_url,
        })
          .then(() => {
            // Profile updated!
            navigate(from, {replace: true});
            reset();
          })
          .catch((error) => {
            return setError("firebase-profile", {
              type: "manual",
              message: error.message,
            });
          });

        axios
          .post("/users", {
            name,
            email,
          })
          .then(function () {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Goggle Logged In Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            setError("");
            navigate("/");
          })
          .catch(function () {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Already user exist!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Already user exist!",
          showConfirmButton: false,
          timer: 1500,
        });
        return setError("firebase-create-account", {
          type: "manual",
          message: error.message,
        });
      });
  };

  // google authentication handle
  const handleLoginWithGoogle = () => {
    logInUserWithGoogle()
      .then(({user}) => {
        const newUser = {
          name: user?.displayName || "unknown",
          email: user?.email,
        };
        axios
          .post("/users", newUser)
          .then(function () {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Goggle Logged In Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            setError("");
            navigate("/");
          })
          .catch(function () {
            logOutUser();
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Already user exist!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch((error) => setError("logInUser", error.message));
  };

  // show error message component
  const ShowError = ({msg}) => (
    <>{errors && <p className="mb-4 text-red-600">{errors[msg]?.message}</p>}</>
  );

  const Input = ({label, id, type = "text", placeholder, regOptions = {}}) => {
    return (
      <div className="mb-6">
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400">
          {label}
        </label>
        <input
          type={type}
          {...register(id, regOptions)}
          id={id}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-600 dark:focus:ring-blue-600"
          placeholder={placeholder}
        />
        <ShowError msg={id} />
      </div>
    );
  };

  return (
    <section className="flex h-screen items-center justify-center dark:bg-gray-800">
      <div className="relative rounded-lg border p-8 shadow dark:border-gray-600 dark:text-gray-400 md:w-[450px]">
        <h2 className="text-2xl font-bold">Register Your Account</h2>
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={handleLoginWithGoogle}
            type="button"
            className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white py-1 pe-4 ps-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="google"
              className="inline-block h-8 w-8"
            />
            Sign up with Google
          </button>
        </div>
        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-4 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            or
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Your Name"
            id="name"
            placeholder="Enter your name"
            regOptions={{required: "Name is required"}}
          />
          <Input
            label="Your email"
            type="email"
            id="email"
            placeholder="Enter your email"
            regOptions={{
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            }}
          />
          <Input
            label="Your password"
            id="password"
            type="password"
            placeholder="Enter your password"
            regOptions={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            }}
          />
          <Input
            label="Your photo URL"
            type="url"
            id="photo_url"
            placeholder="Enter your photo URL"
            regOptions={{
              required: "Photo URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Invalid photo URL format",
              },
            }}
          />
          {/* Error message for firebase */}
          <ShowError msg="firebase-create-account" />
          <ShowError msg="firebase-profile" />
          <Button
            type="submit"
            text="Create an account"
            className="mb-4 w-full"
          />
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-primary-700 hover:underline dark:text-gray-400">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
