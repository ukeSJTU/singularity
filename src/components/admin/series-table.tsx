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
import { EditSeriesDialog } from "@/components/admin/edit-series";
import { formatDate } from "@/lib/utils";

interface Series {
  id: string;
  title: string;
  views: number;
  published: boolean;
  createdAt: string;
}

export function SeriesTable() {
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    async function fetchSeries() {
      const response = await axios.get("/api/series");
      setSeries(response.data.series);
    }
    fetchSeries();
  }, []);

  const handleSave = async (updatedSeries: Series) => {
    try {
      const response = await axios.put(
        `/api/series/${updatedSeries.id}`,
        updatedSeries
      );
      setSeries(
        series.map((s) => (s.id === updatedSeries.id ? response.data : s))
      );
    } catch (error) {
      console.error("Error updating series:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this series?")) {
      try {
        await axios.delete(`/api/series/${id}`);
        setSeries(series.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Error deleting series:", error);
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
          {series.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.views}</TableCell>
              <TableCell>{s.published ? "Yes" : "No"}</TableCell>
              <TableCell>{formatDate(s.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <EditSeriesDialog
                    series={s}
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
                    onClick={() => handleDelete(s.id)}
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
