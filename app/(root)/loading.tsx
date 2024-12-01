import Image from "next/image";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Image
          className="dark:invert animate-spin"
          src="/wolfz_alpha.svg"
          alt="wolfz"
          width={180}
          height={180}
          priority
        />
    </div>
  );
}