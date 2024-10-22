import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ToolsPage() {
  const tools = [
    { id: 1, title: "Color Palette Generator", description: "Generate beautiful color palettes for your next project.", icon: "🎨" },
    { id: 2, title: "Markdown Editor", description: "A simple yet powerful markdown editor with live preview.", icon: "📝" },
    { id: 3, title: "Code Snippet Manager", description: "Organize and share your code snippets efficiently.", icon: "💻" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tools</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{tool.icon}</span>
                {tool.title}
              </CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={`/tools/${tool.id}`}>Use Tool</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}