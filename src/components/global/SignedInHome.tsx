import React from "react";
import HeroInput from "./HeroInput";
import * as motion from "motion/react-client";
import { WavyBackground } from "@/components/ui/wavy-background";

const SignedInHome = () => {
  return (
    <div className="relative overflow-x-hidden flex flex-col items-center px-4 pt-0 min-h-screen">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
          <div className="absolute inset-0 bg-linear-to-r from-zinc-900/0 via-zinc-800/20 to-white/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-linear-to-bl from-white/8 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center  flex flex-col flex-1 items-center justify-center">
        {/* <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-zinc-700/40 tracking-tight select-none">
            Cheerios
          </h1>
        </motion.div> */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-sm mb-6"
        >
          Paste a product URL to generate your complete marketing kit
        </motion.p>
        <HeroInput />
      </div>
    </div>
  );
};

export default SignedInHome;
