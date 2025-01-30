import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { CapsulesProvider } from "./_contexts/CapsulesContext";
import { ToastContainer } from "react-toastify";

// If loading a variable font, you don't need to specify the font weight
const exo = Exo({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <CapsulesProvider>
      <ClerkProvider>
        <html lang="en" className={exo.className}>
          <body className="bg-primary-800">
            <Navbar />
            <main className="flex mx-auto max-w-6xl justify-center">
              {children}
            </main>
            <ToastContainer />
          </body>
        </html>
      </ClerkProvider>
    </CapsulesProvider>
  );
}
