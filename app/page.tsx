// import AuthButton from "../components/AuthButton";
// import { createSupabaseClient } from "@/utils/supabase/server";
// import Header from "@/components/Header";
// import ThemeToggleButton from "@/components/ThemeToggleButton";
// import Link from "next/link";

// export default async function Index() {
//   const canInitSupabaseClient = () => {
//     // This function is just for the interactive tutorial.
//     // Feel free to remove it once you have Supabase connected.
//     try {
//       createSupabaseClient();
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };

//   const isSupabaseConnected = canInitSupabaseClient();

//   return (
//     <div className="flex-1 w-full flex flex-col gap-12 items-center">
//       <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//         <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
//           <ThemeToggleButton />
//           {isSupabaseConnected && <AuthButton />}
//         </div>
//       </nav>

//       <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
//         <Header />
//       </div>
//       <h1 className="text-4xl lg:text-5xl !leading-tight mx-auto max-w-xl text-center">
//         Welcome to{" "}
//         <Link href={"/chat"} className="underline  font-semibold text-rose-500">
//           AI ChatHub
//         </Link>
//       </h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         Seamlessly Connect, Engage, and Innovate with Advanced AI-Powered
//         Conversations
//       </p>

//       <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
//         <p>
//           Powered by{" "}
//           <a
//             href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//             target="_blank"
//             className="font-bold hover:underline"
//             rel="noreferrer"
//           >
//             Supabase
//           </a>
//         </p>
//       </footer>
//     </div>
//   );
// }

import AuthButton from "../components/AuthButton";
import { createSupabaseClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createSupabaseClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <nav className="w-full bg-white dark:bg-gray-900 shadow-lg h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg font-bold text-gray-800 dark:text-white"
            >
              AI ChatHub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            {isSupabaseConnected && <AuthButton />}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full flex flex-col items-center justify-center text-center py-16 px-6">
        <Header />
        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Welcome to{" "}
          <Link href={"/chat"} className="underline text-rose-500">
            AI ChatHub
          </Link>
        </h1>
        <p className="text-xl lg:text-2xl mt-4 text-gray-700 dark:text-gray-300">
          Seamlessly Connect, Engage, and Innovate with Advanced AI-Powered
          Conversations
        </p>
      </main>

      <footer className="w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
