

import { useSession, signIn } from 'next-auth/react'
import { useState} from 'react'
import { useRouter } from 'next/router';



 const Sign=()=>{
  
  
  const router = useRouter();
  const [isLogin,setIsLogin]= useState(false)

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = event.target.email.value;
    const enteredPassword = event.target.password.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(result)
      if (!result.error) {
        // set some auth state
        console.log("unable to signin",result.error)
        router.replace('/');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
   <>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
      Email:
        <input type='email' name='email' required /><br></br>
         Password:
        <input type='password' name='password' required /><br></br>
        <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
        </form>
        <div >
            <button onClick={()=>{ setIsLogin((prevState) => !prevState);}}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      
      </>
  );
}
async function createUser(email, password) {
  const response = await fetch('http://localhost:5000/api/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;


}
export default Sign