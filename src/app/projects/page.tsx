import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    { id: 1, title: "Personal Blog Engine", description: "A custom-built blog engine using Next.js and GraphQL.", tags: ["Next.js", "GraphQL", "TypeScript"] },
    { id: 2, title: "Task Management App", description: "A full-stack task management application with real-time updates.", tags: ["React", "Node.js", "Socket.io"] },
    { id: 3, title: "AI-powered Code Assistant", description: "An AI-powered code assistant that helps developers write better code.", tags: ["Python", "Machine Learning", "NLP"] },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/projects/${project.id}`}>View Project</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}