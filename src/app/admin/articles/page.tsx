import { Button } from "@/components/ui/button";
import { ArticleTable } from "@/components/admin/article-table";
import { NewArticleDialog } from "@/components/admin/new-article";

export default function ArticlesAdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Articles</h1>
      <div className="flex justify-end mb-4">
        <NewArticleDialog />
      </div>
      <ArticleTable />
    </div>
  );
}
