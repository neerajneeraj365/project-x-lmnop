"use client";

import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

import { Suspense } from "react";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import { Star } from "lucide-react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {[
        { top: "15%", left: "15%", size: 45, opacity: 0.19 },
        { top: "25%", right: "12%", left: undefined, size: 29, opacity: 0.19 },
        { top: "70%", left: "4%", size: 18, opacity: 0.19 },
        { top: "85%", right: "8%", left: undefined, size: 50, opacity: 0.19 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute text-primary"
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            opacity: s.opacity,
          }}
        >
          <Star className="size-5" style={{ width: s.size, height: s.size }} />
        </div>
      ))}
      <div className="flex flex-col gap-4 items-center justify-center flex-1">
        <ClerkLoading>
          <div className="flex flex-col items-center justify-center flex-1">
            <Spinner className="w-10 h-10" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image
                src="/logo/productdescription.png"
                alt="Descrifly"
                width={32}
                height={32}
              />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              DescriFly
            </span>
          </Link>
          {children}
        </ClerkLoaded>
      </div>
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="relative text-center text-zinc-100 max-w-lg">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-8">
          <Image
                src="/logo/productdescription.png"
                alt="Descrifly"
                width={80}
                height={80}
              />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            AI Product Descriptions for Every Product
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Generate SEO-optimized product descriptions and
            sales-ready copy in seconds. Built for fashion brands, ecommerce
            sellers, and modern businesses.
          </p>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-4 mt-12">
            <div>
              <p className="text-3xl font-bold">300%</p>
              <p className="text-sm text-primary-foreground/70">More Reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold">2,000+</p>
              <p className="text-sm text-primary-foreground/70">Businesses</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9</p>
              <p className="text-sm text-primary-foreground/70">Avg Rating</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
