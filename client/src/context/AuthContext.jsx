import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { api } from "../services/api";


const AuthContext = createContext();



export const useAuth = () => useContext(AuthContext);





export function AuthProvider({ children }) {


  const [user,setUser] = useState(null);

  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    const checkUser = async()=>{


      try{


        const r = await api.get("/auth/me");


        setUser(
          r.data.user
        );


      }


      catch(err){


        localStorage.removeItem("token");

        setUser(null);


      }


      finally{


        setLoading(false);


      }


    };



    checkUser();


  },[]);









  const login = async(data)=>{


    const r = await api.post(
      "/auth/login",
      data
    );



    localStorage.setItem(
      "token",
      r.data.token
    );



    setUser(
      r.data.user
    );



    // IMPORTANT
    return r.data.user;


  };









  const register = async(data)=>{


    const r = await api.post(
      "/auth/register",
      data
    );



    localStorage.setItem(
      "token",
      r.data.token
    );



    setUser(
      r.data.user
    );



    return r.data.user;


  };









  const logout = ()=>{


    localStorage.removeItem(
      "token"
    );


    setUser(null);


  };







return(


<AuthContext.Provider


value={{

user,

loading,

login,

register,

logout

}}


>


{children}


</AuthContext.Provider>


);


}