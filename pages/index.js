
import Link from "next/link"
import { useSession,signIn,signOut } from 'next-auth/react'
import { useState } from "react"
// import { getAllUsers } from "../services/service"
// import Calling from "../components/tictactoe/Calling"
import Calling from "../components/tictactoe/games_screen/Calling"
// import { getAllUsers } from "../services/service"
export default function Home() {
  const [a,seta]=useState(10)
   const { data: session, status } = useSession()

//    const result = calling();

//    console.log("mydata")
//    console.log(result)
//    calling();
    // if(status === "authenticated")
    // {
    //     console.log(session.user._id,status)
    return (
        <>
        
        {/* <h1>Your Mail is: {session.user.email}</h1> */}
        <Link href='/temp1'>Temp1</Link><br></br>
        <Link href='/todos'>Todos</Link><br></br>
        <Link href='/tic-tac-toe'>Tic Tac Toe</Link><br></br>
        <Link href='/profile'>Profile</Link><br></br>
        <Link href= '/menja'>menja</Link>
        {/* <Link href='/api/auth/signout'  onClick={()=>signOut()}>Signout</Link><br></br>   */}
        <Calling />
       {/* {result.map((resp,index)=>{
            // return <div>{resp}</div>
            console.log(resp,index);
        })} */}
     
  
        
        {/* <Link href='/'>Back</Link> */}
        <br>
        </br>
         </>
    )
    // }
    // else
    // {
    //     return (
    //         <>
    //          <div className="nav">
    //          <Link href='/api/auth/signin' onClick={()=>signIn()}>Signin </Link>
    //          </div>
    //    </>
    //     )    
    // }
 
}
