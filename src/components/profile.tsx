import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

export function Profile() {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <Image
        src="/placeholder.svg?height=100&width=100"
        alt="Arthals"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="text-3xl font-bold">Arthals</h1>
      <div className="flex items-center space-x-2">
        <span>China / Beijing</span>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <GithubIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}