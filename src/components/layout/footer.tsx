import Link from "next/link";
import { Twitter, Instagram, Facebook, Github } from "lucide-react";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#fffdfb] via-[#f5ede4] to-[#f0e5da] py-6 text-center text-gray-600 border-t">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} GlowNiva. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="https://github.com/Sreejan405/GlowNiva" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6 text-gray-600 hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
