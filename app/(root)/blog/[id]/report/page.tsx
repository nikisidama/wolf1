import { useSession } from "@/app/context/SessionContext";
import { useRouter } from "next/router";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const router = useRouter();
  const { session, setSession } = useSession();

  
  return <div>{id}</div>
}