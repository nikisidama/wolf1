import Link from "next/link"
import Image from "next/image"

export const Navbar = async () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-tl from-red-950 via-black to-black">
      <nav className="flex justify-between gap-8 p-4 px-6 font-[family-name:var(--font-geist-mono)]">
        <Link href={'/'} className="flex justify-center items-center">
          <Image src={"/wolfz_alpha.svg"} alt="logo" width={64} height={64} className="dark:invert" />
        </Link>
        <div className="flex flex-1 items-center gap-6">
          <Link href={'/'}>Home</Link>
          <Link href={'/'}>Store</Link>
          <Link href={'/'}>Blog</Link>
          <Link href={'/'}>About</Link>
        </div>
        <div className="flex justify-center items-center gap-6">
          <Link href={'/'}>Login</Link>
          <Link href={'/'}>User</Link>
          <Link href={'/'}><div className="rounded-full w-10 h-10 bg-white" /></Link>
          {/* {session && session?.user ? (<>
            <Link href={'/'}>Something</Link>
            <Link href={`/user/${session.user.id}`}><span>{session?.user?.name}</span></Link>
            <button onClick={signOut}>Logout</button>
          </>) : (<>
            <form
              action={async () => {
                "use server"
                await signIn(provider: "github" );
              }}>
            <button type="submit">
              Login
            </button>
          </form>
        </>)} */}
        </div>
      </nav>
    </header >
  )
}
