"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { get, post } from "../../../../lib/api";
import CustomTable from "../../../../components/table/TableCustom";
import { columns_groups, visible_columns_groups } from "../../../../lib/data";
import { Button } from "@nextui-org/button";
import { AIIcon } from "../../../../lib/icons";

export default function page({ params }) {
  const { data: session, status, update } = useSession();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (params?.hc_id) {
      abs_loading();
      get(`history-scrape/${params?.hc_id}`)
        .then((res) => {
          abs_loading();
          setData(res.data);
        })
        .catch((error) => {
          abs_loading();
          setData({});
          console.log(error);
        });
    }
  }, [params]);

  const abs_loading = () => {
    // console.log(!isLoading);
    setIsLoading((prev) => !prev);
  };

  const send_message = () => {
    post(`message`).then((res) => {
      console.log(res);
    });
  };

  const generate_category = () => {
    abs_loading();
    post(`llm/${params?.hc_id}/category`, {
      type: "COMMENT",
    })
      .then((res) => {
        // console.log("Post response:", res);
        // console.log("Post successful, starting get request");
        get(`history-scrape/${params?.hc_id}`)
          .then((res) => {
            console.log("Get response:", res);
            setData(res.data);
            abs_loading();
          })
          .catch((error) => {
            console.log("Get request error:", error);
            abs_loading();
            setData([]);
          });
      })
      .catch((error) => {
        console.log("Post request error:", error);
        abs_loading();
        setData([]);
      });
  };

  const generate_comments = () => {
    get(`/llm/${params?.hc_id}/category`)
      .then((res) => {
        if (res.status === 200) {
          get(`history-scrape/${params?.hc_id}`)
            .then((res) => {
              // console.log(res.data);
              setData(res.data);
            })
            .catch((error) => {
              setData({});
              console.log(error);
            });
        }
      })
      .catch((error) => {
        setData({});
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Keyword: {data?.keyword} </h1>
        <Button
          color="primary"
          variant="bordered"
          size="sm"
          radius="sm"
          // startContent={<AIIcon />}
          onClick={send_message}
        >
          <span className="text-white">AI MESSAGE</span>
        </Button>

        <Button
          color="primary"
          variant="bordered"
          size="sm"
          radius="sm"
          startContent={<AIIcon />}
          onClick={generate_category}
        >
          <span className="text-white">AI MESSAGE</span>
        </Button>
      </div>
      <CustomTable
        columns={columns_groups}
        visible_columns={visible_columns_groups}
        rows={data?.groups}
        isLoading={isLoading}
      ></CustomTable>
    </div>
  );
}
