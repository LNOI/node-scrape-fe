// "use client";
import { useState } from "react";
import { createRoot } from "react-dom/client";

import { Button, Tooltip } from "@nextui-org/react";
import CustomTable from "./table/TableCustom";
import {
  columns_comments,
  columns_posts,
  visible_columns_comments,
  visible_columns_posts,
} from "../lib/data";

export const ToggleSubRowButton = ({ rowId, data, type = "posts" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // console.log(data);
  const toggleSubRow = () => {
    const rowToInsertAfter = document.getElementById(`row-${rowId}`);
    if (rowToInsertAfter) {
      if (isExpanded) {
        const existingRow = document.getElementById(`subrow-${rowId}`);
        if (existingRow) {
          existingRow.remove();
        }
      } else {
        const newRow = document.createElement("tr");
        newRow.id = `subrow-${rowId}`;
        const newCell = document.createElement("td");
        newCell.colSpan = 100;
        newCell.className = "px-4 py-4";

        const root = createRoot(newCell);
        root.render(
          <CustomTable
            columns={type === "posts" ? columns_posts : columns_comments}
            visible_columns={
              type === "posts"
                ? visible_columns_posts
                : visible_columns_comments
            }
            rows={data}
          />
        );

        newRow.appendChild(newCell);
        rowToInsertAfter.insertAdjacentElement("afterend", newRow);
      }

      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Tooltip content={isExpanded ? "Collapse" : "Expand"}>
      <Button onClick={toggleSubRow} size="sm" variant="light" isIconOnly>
        {isExpanded ? "-" : "+"}
      </Button>
    </Tooltip>
  );
};
