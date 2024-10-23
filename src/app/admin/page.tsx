"use client";

import { useState, useEffect } from "react";
import { ArticlesOverview } from "@/components/admin/articles-overview";
import { SeriesOverview } from "@/components/admin/series-overview";
import { ProjectsOverview } from "@/components/admin/projects-overview";
import { DashboardStats } from "@/components/admin/dashboard-stats";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [series, setSeries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    // For now, we'll use mock data
    setArticles([
      {
        id: "1",
        title: "Getting Started with Next.js",
        published: true,
        createdAt: "2024-10-01",
        views: 1000,
      },
      {
        id: "2",
        title: "Advanced React Patterns",
        published: false,
        createdAt: "2024-10-15",
        views: 500,
      },
    ]);
    setSeries([
      {
        id: "1",
        title: "Web Development Basics",
        articleCount: 5,
        published: true,
      },
      {
        id: "2",
        title: "Advanced JavaScript",
        articleCount: 3,
        published: false,
      },
    ]);
    setProjects([
      {
        id: "1",
        title: "Personal Blog",
        status: "In Progress",
        lastUpdated: "2024-10-20",
      },
      {
        id: "2",
        title: "E-commerce Site",
        status: "Completed",
        lastUpdated: "2024-09-30",
      },
    ]);
    setStats([
      { title: "Total Views", value: 5280, change: 12 },
      { title: "New Subscribers", value: 120, change: 10 },
      { title: "Avg. Read Time", value: 3.2, change: -2 },
      { title: "Total Articles", value: 25, change: 4 },
    ]);
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <DashboardStats stats={stats} />

      <div className="grid gap-8 md:grid-cols-2">
        <ArticlesOverview articles={articles} />
        <SeriesOverview series={series} />
      </div>

      <ProjectsOverview projects={projects} />
    </div>
  );
}
