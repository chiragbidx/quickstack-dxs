import { SignUpForm } from "./SignUpForm";

export const metadata = {
  title: "Sign Up – SaaS To Do List",
  description: "Create a new SaaS To Do List account.",
};

export default function SignUp() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-1 text-center">Sign up</h2>
        <p className="text-gray-500 text-center mb-6">
          Create your account and start managing tasks.
        </p>
        <SignUpForm />
      </div>
    </main>
  );
}