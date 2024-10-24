import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const mockData = {
  articles: 10,
  series: 5,
  projects: 8,
  tools: 12,
};

const DashboardCard = ({ title, count }: { title: string; count: number }) => (
  <Card className="card">
    <CardHeader>
      <Link href={`/admin/${title.toLowerCase()}`}>
        <CardTitle>{title}</CardTitle>
      </Link>
    </CardHeader>
    <CardContent>
      <p>{count}</p>
    </CardContent>
    <CardFooter>
      <Link href={`/admin/${title.toLowerCase()}`}>
        <ArrowRightIcon /> View all
      </Link>
    </CardFooter>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DashboardCard title="Articles" count={mockData.articles} />
      <DashboardCard title="Series" count={mockData.series} />
      <DashboardCard title="Projects" count={mockData.projects} />
      <DashboardCard title="Tools" count={mockData.tools} />
    </div>
  );
}
