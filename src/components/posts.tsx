import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

export function Posts() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/blog/post-1" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Oct 11, 2024 伪造一张诺贝尔奖获奖照片</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>
        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>

        <li>
          <Link href="/blog/post-2" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
            <span>Sep 21, 2024 PKU VPN 3 - 用校内服务器实现 PKU 内网和 Clash/Surge 兼容使用</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        </li>
      </ul>
    </section>
  )
}