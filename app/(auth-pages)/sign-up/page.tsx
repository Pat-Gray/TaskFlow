import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4 bg-gray-100">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-start h-screen bg-gray-100 w-screen">
      <form className="flex flex-col bg-white p-8 rounded-lg shadow-lg mt-24">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input name="email" placeholder="you@example.com" required className="p-2 border rounded" />
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="p-2 border rounded"
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up..." className="mt-4 bg-blue-500 text-white py-2 rounded">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <SmtpMessage />
      </form>
    </div>
  );
}