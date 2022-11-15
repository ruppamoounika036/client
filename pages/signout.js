import Link from "next/link";

export default function Signout()
{
    return(
        <>
        Logged out Successfully
        <Link href='/'>Signin Again</Link>
        </>
    )
}