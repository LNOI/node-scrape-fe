"use client";
import React, { useEffect, useState } from "react";
import TableCustom from "../../../components/table/TableCustom";
import { fetchGet } from "@/lib/api";

export default function Dashboard() {
  const [scrapeHistory, setScrapeHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScrapeHistory = async () => {
      try {
        setLoading(true);
        const data = await fetchGet("history-scrape", {
          page: 1,
          limit: 10,
          sort: "desc",
        });
        console.log("Scrape history data:", data);
        setScrapeHistory(data);
      } catch (error) {
        console.error("Error fetching scrape history:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScrapeHistory();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;

  return (
    <div>
      <TableCustom data={scrapeHistory} />
    </div>
  );
}
