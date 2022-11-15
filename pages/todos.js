import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import Link from 'next/link';
export default function MyTodo() {
    const { data: session, status } = useSession()
    if (status === "authenticated") {
        const [add, setadd] = useState(false);
        const [view, setview] = useState(false);
        const [todos, settodos] = useState([]);

        const addtodos = async (e) => {
            console.log(session.user)
            e.preventDefault();
            await fetch('http://localhost:5000/api/addtodo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: e.target.task.value, type: e.target.type.value, userid: session.user.email })
            }).then(response => {
                console.log("response:", response);
            }).catch((e) => { console.log("error,", e) })
        }

        const listtodos = async (e) => {
            await fetch('http://localhost:5000/api/listtodo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid: session.user.email })
            }).then(response => {
                console.log("response:", response);
                return response.json()
            }).then(data => {
                console.log("data", data)
                settodos(data)
            })
                .catch((e) => { console.log("error,", e) })
        }
        return (
            <>
            <Link href='/'>Back</Link>
                <button onClick={() => setadd(!add)}>Add Todo</button>
                <br></br>
                <button onClick={(e) => { setview(!view); listtodos(e); }} >View Todos</button>
                {add &&
                    <div>
                        <form method='POST' onSubmit={(e) => addtodos(e)}>
                            Task: <input type="text" name="task"></input>
                            Type: <input type="text" name="type"></input>
                            <input type="submit" value="Save"></input>
                        </form>
                    </div>
                }
                {view &&
                    <div>
                        <h1>List:</h1>
                        {console.log(todos, todos.length)}
                        {(todos.length > 0) &&
                            todos.map((t, i) => {
                                //  <a class="eachtodo" href="/todos/<%= t._id %>">
                                return (<div > {t.task}-{t.type}</div>)
                                //  </a>
                            })

                        }
                    </div>
                }


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