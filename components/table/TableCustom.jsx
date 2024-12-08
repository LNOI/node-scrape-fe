"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Spinner,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { ConvertHummanDateTime } from "../../lib/utils";
import Link from "next/link";
import { ToggleSubRowButton } from "../expandRow";

export default function CustomTable({
  columns,
  visible_columns = [],
  rows = [],
  isLoading = false,
}) {
  const headerColumns = React.useMemo(() => {
    return columns?.filter((column) =>
      Array.from(visible_columns).includes(column.uid)
    );
  }, [visible_columns]);

  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    switch (columnKey) {
      case "open_group":
        return (
          <ToggleSubRowButton rowId={data.id} data={data?.posts} type="posts" />
        );
      case "open_post":
        return (
          <ToggleSubRowButton
            rowId={data.id}
            data={data?.comments}
            type="comments"
          />
        );
      case "keyword":
        return <span>{cellValue}</span>;
      case "category":
        return (
          <>
            {(() => {
              switch (cellValue) {
                case "người cần bán":
                  return <Chip color="warning">Người cần bán</Chip>;
                case "người cần mua":
                  return <Chip color="success">Người cần mua</Chip>;
                default:
                  return <Chip color="default">?</Chip>;
              }
            })()}
          </>
        );
      case "detail_hc":
        return (
          <Button
            size="small"
            href={`/dashboard/scrape/${data.id}`}
            color="primary"
            showAnchorIcon
            variant="solid"
            as={Link}
            auto
          >
            Detail
          </Button>
        );
      case "link":
        return (
          <Button
            size="small"
            href={cellValue}
            color="primary"
            showAnchorIcon
            variant="solid"
            as={Link}
            auto
            target="_blank"
          >
            Detail
          </Button>
        );

      case "owner_link":
        return (
          <Avatar
            name={data?.owner_name}
            as={Link}
            href={cellValue}
            target="_blank"
          />
        );
      case "groups":
        return <span>{cellValue}</span>;
      case "posts":
        return <span>{cellValue}</span>;
      case "comments":
        return <span>{cellValue}</span>;
      case "status":
        return (
          <Chip
            size="sm"
            color={(() => {
              switch (cellValue) {
                case "completed":
                  return "success";
                case "pending":
                  return "warning";
                case "failed":
                  return "danger";
                default:
                  return "default";
              }
            })()}
            variant="flat"
          >
            {(() => {
              switch (cellValue) {
                case "completed":
                  return "Hoàn thành";
                case "pending":
                  return "Đang xử lý";
                case "failed":
                  return "Thất bại";
                default:
                  return "Không xác định";
              }
            })()}
          </Chip>
        );
      case "created_at":
        return <span>{ConvertHummanDateTime(cellValue)}</span>;
      default:
        return <span>{cellValue}</span>;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with dynamic content"
      selectionMode="single"
      onSelectionChange={(selected) => console.log(selected)}
    >
      <TableHeader columns={headerColumns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={rows}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item.id} id={`row-${item.id}`}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
