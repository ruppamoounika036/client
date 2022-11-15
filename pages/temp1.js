import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import Link from 'next/link';

export default function Temp1() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {

    const [names, setnames] = useState([])
    const handler = async () => {
      await fetch('http://localhost:5001/api/viewfriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: session.user.email })
      }).then(response => {
        console.log("response:", response);
        return response.json()
      }).then(data => {
        console.log("data", data)
        setnames(data)
      })
        .catch((e) => { console.log("error,", e) })
    }
    const handlesubmit = async (e) => {
      e.preventDefault();
      await fetch('http://localhost:5001/api/friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: session.user.email, friend: e.target.fname.value })
      }).then(response => {
        console.log("rs", response);
      }).catch((e) => { console.log("error,", e) })
    }
    return (
      <>
      <Link href='/'>Back</Link>
        {console.log(session.user.id)}
        <form method='POST' onSubmit={(e) => handlesubmit(e)}>
          <input type="text" name="fname"></input>
          <input type="submit" value="Add"></input>
        </form>
        <button onClick={handler}>CLick here</button>

        {(typeof names != "undefined") ?
          (names.map((u, i) => {
            console.log(u)
            return <div key={i}>{u.friend}</div>
          })

          ) : (<p>loading</p>)}
      </>

    )
  }
  else {
    return (
      <>
        <div className="nav">{a}
          <Link href='/api/auth/signin' onClick={() => signIn()}>Signin </Link>
        </div>
      </>
    )
  }

}