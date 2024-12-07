"use client"

import { useSession } from "../context/SessionContext"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/utils/cookie"
import { ModeToggle } from "./ThemeConfig"
import Link from "next/link"
import axios from "axios"
import Logo from "./Logo"

const style = {
  link: "flex justify-center items-center h-full w-full hover:text-accent hover:bg-gradient-to-t from-accent via-transparent to-transparent group relative",
  underline: "w-full absolute bottom-0 left-0 bg-accent group-hover:pt-64 group-hover:opacity-10 transition-all"
};

const Header = () => {
  const router = useRouter();
  const { session, setSession } = useSession();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      logoutUser();
      setSession(null);
      router.push("/");
    }
    catch (error) { console.error("Logout failed", error) }
  };

  return <header className="fixed top-0 left-0 right-0 pt-4 z-50 bg-gradient-to-t from-accent via-background to-background bg-[length:100%_170%]">
    <nav className="flex justify-between font-mono">
      <Link
        href={"/"}
        className="flex flex-col justify-center items-center px-2 sm:px-4 hover:text-accent hover:bg-gradient-to-t from-accent via-transparent to-transparent group relative"
      >
        <Logo height={48} width={48} />
        <div className={style.underline} />
      </Link>
      <div className="flex flex-1 items-center">
        <Link href={"/home"} className={style.link}>Home
          <div className={style.underline} />
        </Link>
        {/* <Link href={"/store"} className={style.link}>Store
          <div className={style.underline} />
        </Link> */}
        <Link href={"/user"} className={style.link}>Users
          <div className={style.underline} />
        </Link>
        <Link href={"/blog"} className={style.link}>Blog
          <div className={style.underline} />
        </Link>
        <Link href={"/about"} className={style.link}>About
          <div className={style.underline} />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <div className={style.link}>
          <div className={style.underline} />
          <ModeToggle />
        </div>
        {session?.email ? <>
          <Link href={"/home"} className={`${style.link} flex-1 px-6`}>
            <p className="flex items-center space-x-2 whitespace-nowrap">{session.profile?.name}</p>
            <div className={style.underline} />
          </Link>
          <button className={`${style.link} px-6`} onClick={handleLogout}>
            Logout
            <div className={style.underline} />
          </button>
        </> : <>
          <Link href={"/login"} className={`${style.link} px-6`}>Login
            <div className={style.underline} />
          </Link>
          <Link href={"/signup"} className={`${style.link} px-6`}>Signup
            <div className={style.underline} />
          </Link>
        </>
        }
      </div>
    </nav>
  </header>
}

export default Header