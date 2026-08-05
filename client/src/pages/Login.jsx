import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { useAuth } from "../context/AuthContext";


export default function Login() {


  const { login } = useAuth();

  const navigate = useNavigate();


  const [show, setShow] = useState(false);

  const [error, setError] = useState("");



  const [data, setData] = useState({

    role: "student",
    email: "",
    password: ""

  });





  const submit = async (e) => {

    e.preventDefault();

    setError("");

    try {


      const user = await login(data);


      console.log(
        "LOGIN USER:",
        user
      );


      console.log(
        "LOGIN ROLE:",
        user?.role
      );



      // Admin redirect

      if (user?.role === "admin") {

        navigate("/admin/dashboard");

      }


      // Student redirect

      else if (user?.role === "student") {

        navigate("/dashboard");

      }


      else {

        setError("Invalid user role");

      }


    }


    catch (err) {


      console.log(err);


      setError(
        err.response?.data?.message ||
        "Unable to sign in."
      );


    }


  };






  return (

    <AuthShell

      title="Welcome back."

      subtitle="Sign in to manage your reservations and favourite spaces."

    >


      <form onSubmit={submit}>


        {
          error &&

          <div className="error">

            {error}

          </div>

        }




        {/* Role */}

        <label>

          Login As


          <select

            value={data.role}

            onChange={(e) =>

              setData({

                ...data,

                role: e.target.value

              })

            }

          >


            <option value="student">

              👤 Student

            </option>



            <option value="admin">

              👨‍💼 Admin

            </option>



          </select>


        </label>







        {/* Email */}

        <label>

          Email


          <input

            required

            type="email"

            value={data.email}

            onChange={(e) =>

              setData({

                ...data,

                email: e.target.value

              })

            }

            placeholder="you@example.com"

          />


        </label>








        {/* Password */}

        <label>

          Password



          <span className="password">



            <input


              required

              minLength={8}

              type={show ? "text" : "password"}

              value={data.password}


              onChange={(e) =>

                setData({

                  ...data,

                  password: e.target.value

                })

              }


              placeholder="Your password"


            />




            <button


              type="button"


              onClick={() => setShow(!show)}


            >


              {

                show ?

                  <EyeOff size={18} />

                  :

                  <Eye size={18} />

              }


            </button>


          </span>


        </label>







        <Link

          className="forgot"

          to="/forgot-password"

        >

          Forgot Password?

        </Link>







        <button


          type="submit"


          className="button button-primary wide"


        >

          Login


        </button>







        <p className="form-switch">


          New to VidyaVerse?{" "}


          <Link to="/register">

            Create an account

          </Link>


        </p>





      </form>


    </AuthShell>


  );


}