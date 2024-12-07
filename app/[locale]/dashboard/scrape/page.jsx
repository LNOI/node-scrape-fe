"use client";

import React, { useState, useEffect } from "react";
import TableCustom from "@/components/table/TableCustom";
import {
  columns_history_scrape,
  visible_columns_history_scrape,
} from "../../../../lib/data";
import { Input, Button } from "@nextui-org/react";
import { fetchGet, fetchPost } from "../../../../lib/api";
export default function Dashboard() {
  const [setting, setSetting] = useState({});
  const [keyword, setKeyword] = useState("");
  const [num_groups, setNum_groups] = useState(0);
  const [num_posts, setNum_posts] = useState(0);
  const [num_comments, setNum_comments] = useState(0);
  // const [rows, setRows] = useState([]);
  const [hc_id, setHc_id] = useState("");
  const [hc_data, setHc_data] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [hc_selected, setHc_selected] = useState(null);
  const [isNew, setIsNew] = React.useState(false);
  const [ws_message, setWs_message] = React.useState({});

  const fetchScrapeHistory = async () => {
    try {
      setIsLoading(true);
      fetchGet(`history-scrape`, {
        page: paginationModel.page + 1,
        page_size: paginationModel.pageSize,
      }).then((res) => {
        setHc_data(res.data.items);
        setHasNextPage(res.data.total === res.data.page_size);
      });
    } catch (error) {
      console.error("Error fetching scrape history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hc_data.length === 0) {
      setIsLoading(true);
      fetchScrapeHistory();
    }
  }, []);

  const onScrape = () => {
    if (
      keyword === "" ||
      num_groups <= 0 ||
      num_posts <= 0 ||
      num_comments <= 0
    ) {
      return;
    }

    fetchPost(`history-scrape`, {
      keyword: keyword,
      num_groups: num_groups,
      num_posts: num_posts,
      num_comments: num_comments,
    }).then((res) => {
      console.log(res);
      setHc_id(res.data.id);
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 justify-center content-center">
        <Input
          className="w-2/4"
          placeholder="Search keyword"
          type="text"
          // height={40}
          label="Keyword"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></Input>
        <Input
          className="w-1/4"
          placeholder="1-100"
          type="number"
          // height={40}
          label="Number of GroupsKeyword"
          value={num_groups}
          onChange={(e) => {
            setNum_groups(e.target.value);
          }}
        ></Input>
        <Input
          className="w-1/4"
          placeholder="1-100"
          type="number"
          // height={40}
          label="Number of Posts"
          value={num_posts}
          onChange={(e) => {
            setNum_posts(e.target.value);
          }}
        ></Input>
        <Input
          className="w-1/4"
          placeholder="1-100"
          type="number"
          // height={40}
          label="Number of Comments"
          value={num_comments}
          onChange={(e) => {
            setNum_comments(e.target.value);
          }}
        ></Input>
        <Button className="h-12" variant="bordered" onClick={onScrape}>
          Scrape
        </Button>
      </div>
      <TableCustom
        columns={columns_history_scrape}
        visible_columns={visible_columns_history_scrape}
        rows={hc_data}
      ></TableCustom>
    </div>
  );
}
