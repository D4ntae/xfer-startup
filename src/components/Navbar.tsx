import { Button } from "@/components/ui/button";
import { useState } from "react";

const URL = "http://localhost:3000"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-screen items-stretch bg-slate-800 shadow-md">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <a href="/" className="flex flex-shrink-0 items-center">
              {/* Replace with your logo */}
              <span className="text-2xl font-bold text-slate-400">StartupX</span>
            </a>
            <div className="ml-10 hidden items-center space-x-8 md:flex">
              <a href="/blog" className="text-slate-200 hover:text-slate-400">
                Blog
              </a>
              <a href="/about" className="text-slate-200 hover:text-slate-400">
                About
              </a>
              <p onClick={() => fetch(URL + "/api/download", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    file: "app"
                                })})} className="text-slate-200 hover:cursor-pointer hover:text-slate-400">
                Download
              </p>
              <a href="/submit" className="text-slate-200 hover:text-slate-400">
                Submit
              </a>
            </div>
          </div>

          {/* Right-side Button */}
          <div className="flex items-center">
          <a href="/login" className="text-slate-200 hover:text-slate-400">
            Sign in
          </a>
            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="#home" className="block text-slate-200 hover:text-slate-400">
              Home
            </a>
            <a href="#features" className="block text-slate-200 hover:text-slate-400">
              Features
            </a>
            <a href="#about" className="block text-slate-200 hover:text-slate-400">
              About
            </a>
            <a href="#contact" className="block text-slate-200 hover:text-slate-400">
              Contact
            </a>
            <Button variant="default" className="w-full bg-blue-400">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

