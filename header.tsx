import { MoreVertical, Instagram, MessageCircle, UserCog } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/80 px-6 py-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center gap-4">
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 hover:bg-accent transition-all duration-200 hover:scale-110 active:scale-95">
                <MoreVertical className="h-6 w-6 text-text-secondary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Sidebar menu with navigation links and user profile.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <div className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://i.ibb.co/cSPH2pTn/1758115269050.png" alt="Bikram" />
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xl font-semibold text-text-primary">Bikram</p>
                        <p className="text-sm text-text-muted">shomdas165@gmail.com</p>
                    </div>
                </div>
              </div>
              <div className="flex-grow p-6 pt-0">
                  <nav className="flex flex-col gap-2">
                    <Link href="https://wa.me/919954487795" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 text-base font-medium text-text-primary focus:bg-accent focus:text-primary rounded-lg cursor-pointer hover:bg-accent transition-colors">
                      <MessageCircle size={22} />
                      <span>WhatsApp</span>
                    </Link>
                    <Link href="https://www.instagram.com/bikram.m1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 text-base font-medium text-text-primary focus:bg-accent focus:text-primary rounded-lg cursor-pointer hover:bg-accent transition-colors">
                      <Instagram size={22} />
                      <span>Instagram</span>
                    </Link>
                    <Link href="https://admin-1rtw.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 text-base font-medium text-text-primary focus:bg-accent focus:text-primary rounded-lg cursor-pointer hover:bg-accent transition-colors">
                      <UserCog size={22} />
                      <span>Admin logging</span>
                    </Link>
                  </nav>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-text-primary">
          Previous Year Question Papers
        </h1>
      </div>
    </header>
  );
}
