import { SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function CTA() {
  return (
    <section className=" text-primary-100 p-8 text-center my-12">
      <h2 className="text-4xl font-bold mb-4">
        Ready to Relive Your <span className="text-accent-400">Memories?</span>
      </h2>
      <p className="text-lg text-primary-200 mb-6">
        Start creating and sharing your special capsules with friends and family
        today.
      </p>

      <SignInButton className="bg-accent-500 hover:bg-accent-600 text-primary-50 py-3 px-8 rounded-lg text-lg font-semibold">
        Get Started Now
      </SignInButton>
    </section>
  );
}
