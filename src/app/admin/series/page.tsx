import { SeriesTable } from "@/components/admin/series-table";
import { NewSeriesDialog } from "@/components/admin/new-series";

export default function SeriesAdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Series</h1>
      <div className="flex justify-end mb-4">
        <NewSeriesDialog />
      </div>
      <SeriesTable />
    </div>
  );
}
