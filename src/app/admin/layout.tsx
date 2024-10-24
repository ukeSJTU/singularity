"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function AdminPageLayout({ children }: { children: ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <nav className="h-full bg-background border-r border-border">
          <ul className="flex flex-col h-full">
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/articles">Articles</Link>
            </li>
            <li>
              <Link href="/admin/series">Series</Link>
            </li>
            <li>
              <Link href="/admin/projects">Projects</Link>
            </li>
            <li>
              <Link href="/admin/tools">Tools</Link>
            </li>
          </ul>
        </nav>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
