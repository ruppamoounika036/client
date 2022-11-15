import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Link from "next/link"
Chart.register(ArcElement);

export default function Temp1() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {

        const [data, setdata] = useState({ t: 0, p: 0, c: 0, d: 0 })

        const [show, setshow] = useState(false)
        const[chart,setchart] = useState({ });
        const opt= {
          
          }
        const handler = async () => {
            
            await fetch('http://localhost:5000/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid: session.user.email })
            }).then(response => {
                console.log("response:", response);
                return response.json()
            }).then(data => {
                console.log("data", data)
                setdata(data)
                setchart({...chart, labels: [
                    'Won',
                    'Lost',
                    'Draw'
                ],datasets:[{
                    color:"black",
                    label: 'Tic-Tac-Toe',
                    data:[data.p, data.c, data.d],
                    backgroundColor: [
                        '#69F542',
                        '#FF5733',
                        '#4287f5'
                    ],
                    hoverBackgroundColor: [
                        '#69F542',
                        '#FF5733',
                        '#4287f5'
                    ]
                }],  plugins: {
                    datalabels: {
                      formatter: (value) => {
                        return value + '%';
                      }
                    }
                  }
            });
                console.log(chart)
                setshow(true)

            })
                .catch((e) => { console.log("error,", e) })

        }

        return (
            <>
            <Link href='/'>Back</Link>
                <h2>Profile</h2>
                <button onClick={handler}>ViewProfile</button>
                {show &&
                    <>
                        <h1>No.of games played today:{data.t}</h1>
                        <h1 style={{color:"#69F542"}}>Won:{data.p}</h1>
                        <h1 style={{color:"#FF5733"}}>Lost:{data.c}</h1>
                        <h1 style={{color:'#4287f5'}}>Draw:{data.d}</h1>
                        {console.log(chart)}
                        <div className="wrapper">
                             <Doughnut
                            data={chart}
                            width="300px"
                            height="300px"
                            options={opt}
                        />
                        </div>
                    </>
                }
            </>

        )
    }
    else {
        return (
            <>
                <div className="nav">
                    <Link href='/api/auth/signin' onClick={() => signIn()}>Signin </Link>
                </div>
            </>
        )
    }

}
