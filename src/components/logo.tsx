import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  const logoUrl = "https://drive.google.com/uc?export=view&id=1nDh1jRD4hFnVzZfiRP7Nv91t9jUPfKDl";

  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative w-96 h-28">
        <Image
          src={logoUrl}
          alt="GlowNiva Cosmetics Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
