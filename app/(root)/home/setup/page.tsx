import SetupForm from "@/app/components/SetupForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Setup",
  description: "setup wolf"
}

export default function Page() {

  return <div className="flex flex-col items-center gap-4 w-full h-full">
    <h1>Complete Your <p className="text-accent">Profile</p></h1>
    <SetupForm />
  </div>
}
