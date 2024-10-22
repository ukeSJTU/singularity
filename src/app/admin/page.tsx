import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, FileText, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const adminSections = [
    { id: 1, title: "Dashboard", description: "View site statistics and analytics", icon: BarChart },
    { id: 2, title: "User Management", description: "Manage user accounts and permissions", icon: Users },
    { id: 3, title: "Content Management", description: "Create, edit, and organize content", icon: FileText },
    { id: 4, title: "Site Settings", description: "Configure site-wide settings and options", icon: Settings },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {adminSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-6 w-6" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={`/admin/${section.id}`}>Go to {section.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}