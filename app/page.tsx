import Link from "next/link";

export const metadata = {
  title: "SaaS To Do List App",
  description: "A SaaS to do list app built with Next.js. Organize tasks and boost productivity.",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">SaaS To Do List - Example 3</h1>
        <p className="text-lg text-gray-600 mb-8">
          Simple, powerful, and team-ready To Do list SaaS. Organize your work, collaborate, and accomplish more — fast.
        </p>
        <Link href="/sign-in">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-medium transition">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
