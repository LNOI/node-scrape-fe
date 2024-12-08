interface DataPoint {
  hour?: number;
  day?: string;
  week?: number;
  count: number;
}

interface NetworkData {
  daily: DataPoint[];
  weekly: DataPoint[];
  monthly: DataPoint[];
}

interface DummyData {
  facebook: NetworkData;
  instagram: NetworkData;
  tiktok: NetworkData;
}

export const DUMMY_DATA: DummyData = {
  facebook: {
    daily: [
      { hour: 0, count: 15 },
      // ... data
    ],
    weekly: [
      { day: "Thứ 2", count: 320 },
      // ... data
    ],
    monthly: [
      { week: 1, count: 1200 },
      // ... data
    ],
  },
  instagram: {
    // Tương tự như facebook nhưng với số liệu khác
    daily: [/* ... */],
    weekly: [/* ... */],
    monthly: [/* ... */],
  },
  tiktok: {
    // Tương tự như facebook nhưng với số liệu khác
    daily: [/* ... */],
    weekly: [/* ... */],
    monthly: [/* ... */],
  },
};

export const chartConfig = (period: string, network: string) => {
  const data = DUMMY_DATA[network][period];
  let labels, values;

  switch (period) {
    case "daily":
      labels = data.map((item) => item.hour + "h");
      values = data.map((item) => item.count);
      break;
    case "weekly":
      labels = data.map((item) => item.day);
      values = data.map((item) => item.count);
      break;
    case "monthly":
      labels = data.map((item) => "Tuần " + item.week);
      values = data.map((item) => item.count);
      break;
    default:
      labels = [];
      values = [];
  }

  return {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Số lượng bài post",
          data: values,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Số lượng bài post đã cào",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
    },
  };
}; 