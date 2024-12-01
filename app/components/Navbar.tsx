import Link from "next/link"
import Logo from "./Logo"

export const Navbar = async () => {
  return <header className="fixed top-0 left-0 right-0 pt-4 z-50 bg-gradient-to-tl from-red-950/50 via-black/50 to-black/50">
    <nav className="flex justify-between font-[family-name:var(--font-geist-mono)]">
      <Link href={'/'} className="flex justify-center items-center px-4 text-foreground bg-transparent hover:text-accent hover:bg-gradient-to-t from-accent via-transparent to-transparent transition-colors group relative">
        <Logo height={64} width={64} />
        <div className="w-full absolute bottom-0 left-0 bg-accent group-hover:pt-1 transition-all" />
      </Link>
      <div className="flex flex-1 items-center gap-6">
        <Link href={'/home'} className="flex justify-center items-center group relative h-full w-full">Home
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
        <Link href={'/store'} className="flex justify-center items-center group relative h-full w-full">Store
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
        <Link href={'/blog'} className="flex justify-center items-center group relative h-full w-full">Blog
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
        <Link href={'/about'} className="flex justify-center items-center group relative h-full w-full">About
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-6">
        <Link href={'/login'} className="flex justify-center items-center group relative h-full">Login
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
        <Link href={'/'} className="flex justify-center items-center group relative h-full">User
          <div className="w-full h-0.5 absolute bottom-0 left-0 bg-accent opacity-0 group-hover:opacity-100 transition" />
        </Link>
        <div className="px-4">
          <Link href={'/'}><div className="rounded-full w-10 h-10 bg-accent" /></Link>
        </div>
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
  </header>
}
