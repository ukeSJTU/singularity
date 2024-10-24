import Link from "next/link";
import { MoonIcon, SearchIcon, LayoutDashboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 h-16 bg-background z-50">
      <Link href="/" className="text-xl font-bold">
        uke
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/articles" className="text-foreground hover:text-primary">
          Articles
        </Link>
        <Link href="/series" className="text-foreground hover:text-primary">
          Series
        </Link>
        <Link href="/projects" className="text-foreground hover:text-primary">
          Projects
        </Link>
        <Link href="/tools" className="text-foreground hover:text-primary">
          Tools
        </Link>
        <Link href="/admin" className="text-foreground hover:text-primary">
          <LayoutDashboardIcon className="h-5 w-5" />
        </Link>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoonIcon className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  );
}
