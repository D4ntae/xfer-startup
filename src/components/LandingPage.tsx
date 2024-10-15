import React from "react";

export default function LandingPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-900 via-orange-900 to-slate-900">
      {/* Circular Gradient Background */}
      <div className="absolute inset-0 flex w-full items-center justify-center">
        <div
          className="bg-gradient-radial h-screen w-full rounded-full from-orange-300 via-yellow-300 to-transparent opacity-70"
          style={{
            background: "radial-gradient(circle, rgba(213, 135, 90,1) 0%, rgba(229, 155, 70,0.6) 60%, transparent 80%)",
          }}
        ></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          We build stuff blazingly fast
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl">
          The stuff is built with an e/acc mindset using generative AI and blockchain technologies.
        </p>
      </div>
    </div>
  );
}
