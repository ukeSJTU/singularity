import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ArticlesPage() {
  const articles = [
    { id: 1, title: "Getting Started with Next.js", description: "Learn the basics of Next.js and start building your first app.", date: "2024-01-15" },
    { id: 2, title: "Advanced React Patterns", description: "Explore advanced patterns and techniques in React development.", date: "2024-02-01" },
    { id: 3, title: "Mastering TypeScript", description: "Take your TypeScript skills to the next level with these pro tips.", date: "2024-02-15" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{article.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/articles/${article.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}