"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { DUMMY_DATA, chartConfig } from "@/lib/chart-config";

interface StatisticChartProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  selectedNetwork: string;
}

export default function StatisticChart({
  selectedTab,
  setSelectedTab,
  selectedNetwork,
}: StatisticChartProps) {
  const dailyChartRef = useRef(null);
  const weeklyChartRef = useRef(null);
  const monthlyChartRef = useRef(null);
  const chartInstances = useRef({});

  useEffect(() => {
    // Destroy tất cả chart instances cũ
    Object.values(chartInstances.current).forEach((chart) => {
      if (chart) chart.destroy();
    });

    // Tạo chart mới cho mỗi tab
    const createChart = (ref, period) => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        chartInstances.current[period] = new Chart(
          ctx,
          chartConfig(period, selectedNetwork)
        );
      }
    };

    createChart(dailyChartRef, "daily");
    createChart(weeklyChartRef, "weekly");
    createChart(monthlyChartRef, "monthly");
  }, [selectedNetwork]);

  return (
    <Card className="h-full">
      <CardBody>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          variant="bordered"
          aria-label="Thống kê theo thời gian"
        >
          <Tab key="day" title="Hôm nay">
            <div className="h-[500px] w-full p-4">
              <canvas ref={dailyChartRef} />
            </div>
          </Tab>
          <Tab key="week" title="Tuần này">
            <div className="h-[500px] w-full p-4">
              <canvas ref={weeklyChartRef} />
            </div>
          </Tab>
          <Tab key="month" title="Tháng này">
            <div className="h-[500px] w-full p-4">
              <canvas ref={monthlyChartRef} />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
} 