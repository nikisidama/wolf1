"use client"

import { useSession } from "../context/SessionContext"
import { useRouter } from  "next/navigation"
import Link from "next/link"
import Logo from "./Logo"
import axios from 'axios'

const style = {
  link: "flex justify-center items-center h-full w-full text-foreground bg-transparent hover:text-accent hover:bg-gradient-to-t from-accent via-transparent to-transparent transition-colors group relative",
  underline: "w-full absolute bottom-0 left-0 bg-accent group-hover:pt-1 transition-all duration-200"
}

export const Header = () => {
  const router = useRouter();
  const { session, setSession } = useSession();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setSession(null);
      router.push("/"); // Redirect using the router
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
console.log(session)
  return <header className="fixed top-0 left-0 right-0 pt-4 z-50 bg-gradient-to-tl from-red-950/50 via-black/50 to-black/50">
    <nav className="flex justify-between font-[family-name:var(--font-geist-mono)]">
      <Link href={'/'} className={"flex justify-center items-center px-4 text-foreground bg-transparent hover:text-accent hover:bg-gradient-to-t from-accent via-transparent to-transparent transition-colors group relative"}>
        <Logo height={64} width={64} />
        <div className={style.underline} />
      </Link>
      <div className="flex flex-1 items-center">
        <Link href={'/home'} className={style.link}>Home
          <div className={style.underline} />
        </Link>
        <Link href={'/store'} className={style.link}>Store
          <div className={style.underline} />
        </Link>
        <Link href={'/blog'} className={style.link}>Blog
          <div className={style.underline} />
        </Link>
        <Link href={'/about'} className={style.link}>About
          <div className={style.underline} />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        {session ? ( <>
          {session.name}
          <div className="px-4">
            <Link href={'/home'}><div className="rounded-full w-10 h-10 bg-accent" /></Link>
          </div>
          <button className={`${style.link} px-6`} onClick={handleLogout}>Logout</button>
        </> )
          :  ( <>
            <Link href={'/login'} className={`${style.link} px-6`}>Login
              <div className={style.underline} />
            </Link>
            <Link href={'/signup'} className={`${style.link} px-6`}>Signup
              <div className={style.underline} />
            </Link>
          </> )
        }
      </div>
    </nav>
  </header>
}
