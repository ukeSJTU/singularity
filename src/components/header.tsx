import Link from 'next/link'
import { MoonIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-background">
      <Link href="/" className="text-xl font-bold">
        Arthals&apos; ink
      </Link>
      <nav className="flex items-center space-x-4">
        <Link href="/blog" className="text-foreground hover:text-primary">
          Blog
        </Link>
        <Link href="/projects" className="text-foreground hover:text-primary">
          Projects
        </Link>
        <Link href="/links" className="text-foreground hover:text-primary">
          Links
        </Link>
        <Link href="/about" className="text-foreground hover:text-primary">
          About
        </Link>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoonIcon className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  )
}