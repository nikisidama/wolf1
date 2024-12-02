import Logo from "../components/Logo";

export default function Loading() {
  return <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="animate-spin text-foreground">
      <Logo width={256} height={256} />
    </div>
  </div>
}