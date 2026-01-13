import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SaaS To Do List App",
  description: "A SaaS to do list app built with Next.js. Organize tasks and boost productivity.",
  openGraph: {
    title: "SaaS To Do List App",
    description: "A SaaS to do list app built with Next.js. Organize tasks and boost productivity.",
    url: "https://your-saas-todo-list.com",
    siteName: "SaaS To Do List App",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-100 min-h-screen"}>
        {children}
      </body>
    </html>
  );
}