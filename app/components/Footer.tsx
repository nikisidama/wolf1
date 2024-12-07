import Logo from "./Logo"

const Footer = () => {
    return <footer className="py-6 mt-16 z-50  bg-gradient-to-t from-accent via-background to-background bg-[length:200%_200%] animate-gradient-xy">
        <div className="mx-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-accent sm:justify-start ">
                <Logo width={64} height={64} />
            </div>

            <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
                Copyright &copy; 2024. All rights reserved.
            </p>
        </div>
    </footer>
}

export default Footer