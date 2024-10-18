import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 bg-opacity-50 backdrop-blur-md shadow-md px-20 py-4 flex justify-between items-center">
      <div className="text-primary-50 font-bold text-xl">
        <Link href="/">
          Time <span className="text-accent-400">Hop</span>
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton className="bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition duration-300" />
        </SignedOut>
        <SignedIn>
          <UserButton className="bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition duration-300" />
        </SignedIn>
      </div>
    </nav>
  );
}
