import { Header } from "@/components/header";
import { PaperFetcherClient } from "@/components/paper-fetcher-client";
import { RefreshCw, Instagram, MessageCircle } from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="container mx-auto max-w-5xl flex-1 px-4 sm:px-6 py-8">
        <PaperFetcherClient />
        
        <div className="rounded-2xl border-none bg-card p-4 sm:p-7 text-sm text-text-secondary shadow-lg">
          <strong>How to download</strong>
          <p className="mt-2">
            Click the Download button on the right of any paper. If it's a Google Drive link, it will open a direct-download link for a better experience.
          </p>
        </div>
      </main>
      
      <footer className="mt-6 border-t border-blue-500/20 py-8 text-center text-sm text-white/80">
        <div className="mb-3 flex items-center justify-center gap-4">
            <Link href="https://wa.me/919954487795" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-white transition-colors hover:text-white hover:underline">
                <MessageCircle size={18} />
                <span>WhatsApp</span>
            </Link>
            <span>&bull;</span>
            <Link href="https://www.instagram.com/bikram.m1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium text-white transition-colors hover:text-white hover:underline">
                <Instagram size={18} />
                <span>Instagram</span>
            </Link>
        </div>
        <p className="m-0">Developed by Bikram</p>
      </footer>
    </div>
  );
}
