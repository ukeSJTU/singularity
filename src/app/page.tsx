import { Profile } from '@/components/profile'
import { About } from '@/components/about'
import { Posts } from '@/components/posts'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Profile />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <About />
          <Posts />
        </div>
      </main>
    </div>
  )
}