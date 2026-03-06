import React from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Show, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <Wrapper className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/productdescription.png"
            alt="Logo"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="text-xl font-bold">LMNOP</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Show when={"signed-out"}>
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/sign-up">Register</Link>
            </Button>
          </Show>
          <Show when={"signed-in"}>
            <UserButton />
          </Show>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
