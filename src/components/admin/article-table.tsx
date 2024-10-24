"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import axios from "axios";
import { EditArticleDialog } from "./edit-article";
import { formatDate } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  views: number;
  published: boolean;
  createdAt: string;
}

export function ArticleTable() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get("/api/articles");
      setArticles(response.data.articles);
    }
    fetchArticles();
  }, []);

  const handleSave = async (updatedArticle: Article) => {
    try {
      const response = await axios.put(
        `/api/articles/${updatedArticle.id}`,
        updatedArticle
      );
      setArticles(
        articles.map((article) =>
          article.id === updatedArticle.id ? response.data : article
        )
      );
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`/api/articles/${id}`);
        setArticles(articles.filter((article) => article.id !== id));
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Views", accessor: "views" },
    { header: "Published", accessor: "published" },
    { header: "Created At", accessor: "createdAt" },
    { header: "Actions", accessor: "id" },
  ];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessor}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.views}</TableCell>
              <TableCell>{article.published ? "Yes" : "No"}</TableCell>
              <TableCell>{formatDate(article.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <EditArticleDialog
                    article={article}
                    onSave={handleSave}
                    trigger={
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
