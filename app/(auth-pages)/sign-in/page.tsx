import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex w-full justify-center items-start h-screen bg-gray-100 w-screen">
      <form className="flex flex-col min-w-64 max-w-md bg-white p-8 rounded-lg shadow-lg mt-24">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500 font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <Input name="email" placeholder="you@example.com" required className="p-2 border rounded" />
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Link
              className="text-xs text-blue-500 underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="p-2 border rounded"
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction} className="mt-4 bg-blue-500 text-white py-2 rounded">
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}