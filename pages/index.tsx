import { Inter } from "next/font/google";
import HeaderSEO from "@/components/HeaderSEO";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeaderSEO title={null} description={null} />
      <main className="bg-slate-600 min-h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </>
  );
}
