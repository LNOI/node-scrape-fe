"use client";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaSearch,
  FaRobot,
  FaComments,
  FaFacebookMessenger,
} from "react-icons/fa";
import Features from "@/components/dashboard/Features";

const SOCIAL_NETWORKS = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <FaFacebook className="text-blue-600" />,
  },
  // ... other networks
];

const FEATURES_LIST = [
  {
    id: "search",
    title: "Tìm kiếm khách hàng",
    icon: <FaSearch className="w-5 h-5" />,
  },
  {
    id: "post",
    title: "Đăng bài tự động",
    icon: <FaRobot className="w-5 h-5" />,
  },
  {
    id: "comment",
    title: "Bình luận tự động",
    icon: <FaComments className="w-5 h-5" />,
  },
  {
    id: "message",
    title: "Nhắn tin tự động",
    icon: <FaFacebookMessenger className="w-5 h-5" />,
  },
];

export default function Dashboard() {
  const [selectedNetwork, setSelectedNetwork] = useState("facebook");
  const [selectedFeature, setSelectedFeature] = useState("search");

  return (
    <div className="h-full min-h-screen p-4">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="space-y-4">
            {/* Network Selection */}
            <Card className="p-4">
              <Select
                label="Mạng xã hội"
                selectedKeys={[selectedNetwork]}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                variant="bordered"
                classNames={{
                  trigger: "h-12",
                }}
                startContent={
                  SOCIAL_NETWORKS.find((item) => item.value === selectedNetwork)
                    ?.icon
                }
              >
                {SOCIAL_NETWORKS.map((network) => (
                  <SelectItem
                    key={network.value}
                    value={network.value}
                    startContent={network.icon}
                  >
                    {network.label}
                  </SelectItem>
                ))}
              </Select>
            </Card>

            {/* Features Navigation */}
            <Card className="p-2">
              <div className="flex flex-col gap-1">
                {FEATURES_LIST.map((feature) => (
                  <Button
                    key={feature.id}
                    startContent={feature.icon}
                    className={`justify-start ${
                      selectedFeature === feature.id
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    variant={selectedFeature === feature.id ? "solid" : "light"}
                    onPress={() => setSelectedFeature(feature.id)}
                  >
                    {feature.title}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Features
            selectedNetwork={selectedNetwork}
            selectedFeature={selectedFeature}
          />
        </div>
      </div>
    </div>
  );
}
