import { SignInForm } from "./SignInForm";

export const metadata = {
  title: "Sign In – SaaS To Do List",
  description: "Access your SaaS To Do List account.",
};

export default function SignIn() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-1 text-center">Sign in</h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Sign in to manage your tasks.
        </p>
        <SignInForm />
      </div>
    </main>
  );
}