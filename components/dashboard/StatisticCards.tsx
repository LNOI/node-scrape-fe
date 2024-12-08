import { Card, CardBody } from "@nextui-org/card";
import { DUMMY_DATA } from "@/lib/chart-config";

interface StatisticCardsProps {
  selectedNetwork: string;
}

interface StatCardProps {
  title: string;
  value: number;
}

export default function StatisticCards({ selectedNetwork }: StatisticCardsProps) {
  const networkData = DUMMY_DATA[selectedNetwork as keyof typeof DUMMY_DATA];

  const calculateTotal = (period: 'daily' | 'weekly' | 'monthly'): number => {
    if (!networkData || !networkData[period]) return 0;
    return networkData[period].reduce((sum, item) => sum + (item.count || 0), 0);
  };

  return (
    <div className="grid grid-cols-3 xl:grid-cols-1 gap-4 h-full">
      <StatCard
        title="Hôm nay"
        value={calculateTotal('daily')}
      />
      <StatCard
        title="Tuần này"
        value={calculateTotal('weekly')}
      />
      <StatCard
        title="Tháng này"
        value={calculateTotal('monthly')}
      />
    </div>
  );
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="text-center">
          <p className="text-default-500">{title}</p>
          <h3 className="text-3xl font-bold text-primary">{value}</h3>
          <p>bài post</p>
        </div>
      </CardBody>
    </Card>
  );
} 