import GeminiLogo from "./GeminiLogo";
import NextLogo from "./NextLogo";
import PineConeLogo from "./PineConeLogo";
import PrismaLogo from "./PrismaLogo";
import ShadCnLogo from "./ShadCnLogo";
import SupabaseLogo from "./SupabaseLogo";
import VercelLogo from "./VercelLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center flex-wrap">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://gemini.google.com/" target="_blank" rel="noreferrer">
          <GeminiLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://sdk.vercel.ai/" target="_blank" rel="noreferrer">
          <VercelLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://www.pinecone.io/" target="_blank" rel="noreferrer">
          <PineConeLogo />
        </a>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-2" />
    </div>
  );
}
