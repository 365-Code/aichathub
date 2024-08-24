import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import ChatState from "@/context/ChatState";
import {
  Fira_Code,
  Karla,
  Montserrat,
  Poppins,
  Roboto,
} from "next/font/google";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI ChatHub - Your second brain",
  description:
    "An RAG build with Vercel AI SDK, Google Gemini, PineCone, Supabase, and ... many more popular technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="bg-background text-foreground">
        <ChatState>
          <ThemeProvider attribute="class">
            <main className="min-h-screen flex flex-col">{children}</main>
          </ThemeProvider>
        </ChatState>
      </body>
    </html>
  );
}
