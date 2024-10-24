import { Button } from "@/components/ui/button";
import { ArticleTable } from "@/components/admin/article-table";

export default function ArticlesAdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Manage Articles</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => alert("Create new article")}>New Article</Button>
      </div>
      <ArticleTable />
    </div>
  );
}
