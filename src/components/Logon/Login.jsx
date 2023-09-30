
import {  GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.console";
import { useState } from "react";
const Login = () => {
    const [user,setUser] = useState(null);
    const auth  =   getAuth(app);
    const googleProvider = new GoogleAuthProvider();
      const githubProvider  =  new GithubAuthProvider();
    const handleGoogleSignIn = () =>{
          signInWithPopup(auth,googleProvider)
          .then(result=>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
          })
          .catch(error=>{
            console.log("error",error.message);
          })
    }

    const handleSignOut = ()=>{
         signOut(auth)
         .then(result=>{
            console.log(result);
             setUser(null);
         })
         .catch(error=>{
            console.log(error);
         })
    }

    const handleGithubSignIn = ()=>{
         signInWithPopup(auth , githubProvider).then(result=>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
         }).catch(error=>{
             console.log(error);
         })

    }

    return (
        <div>
        {  user ? <button 
             onClick={handleSignOut}
               >
            Sign Out
           </button> 
           :
           <>
                <button 
            onClick={handleGoogleSignIn}
           >
   Google login 
           </button>

           <button   
            onClick={handleGithubSignIn}
                 >
             Github Login
           </button>
           </>
           
           }
         {  user &&  <div>
            <h3>user:{user?.displayName}</h3>
            <p>Email:{user?.email}</p>
            <img src={user?.photoURL} alt="" />
           </div>}
        </div>

    );
};

export default Login;