"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleCartClick = () => {
    toast({
        title: "Coming Soon!",
        description: "Shopping cart functionality is under development.",
    })
  }

  return (
    <header className="shadow-md bg-gradient-to-r from-white via-[#fef9f6] to-[#fdf6f0] w-full">
      <div className="flex justify-start items-center py-4 px-4 md:px-8 w-full">
        <div className="flex-shrink-0">
            <Logo />
        </div>
        
        <div className="flex-grow flex justify-end items-center">
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center ml-6">
                <Button onClick={handleCartClick} variant="ghost" size="icon">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="sr-only">Shopping Cart</span>
                </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
          <div className="flex justify-between items-center px-8 py-4 border-b">
            <Logo />
            <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
              <X className="h-6 w-6" />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-grow gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-headline hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
             <Button onClick={handleCartClick} variant="ghost" size="icon" className="mt-4">
                <ShoppingCart className="h-8 w-8" />
                <span className="sr-only">Shopping Cart</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
