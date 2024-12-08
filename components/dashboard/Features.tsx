"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { FaSearch, FaRobot, FaComments, FaFacebookMessenger } from "react-icons/fa";
import SearchClient from "../features/SearchClient";
import AutoPost from "../features/AutoPost";
import AutoComment from "../features/AutoComment";
import AutoMessage from "../features/AutoMessage";

interface FeaturesProps {
  selectedNetwork: string;
  selectedFeature: string;
}

export default function Features({ selectedNetwork, selectedFeature }: FeaturesProps) {
  const [autoSearch, setAutoSearch] = useState(false);
  const [autoPost, setAutoPost] = useState(false);
  const [autoComment, setAutoComment] = useState(false);
  const [autoMessage, setAutoMessage] = useState(false);

  const features = [
    {
      id: "search",
      title: "Tìm kiếm khách hàng",
      description: "Tự động tìm kiếm khách hàng tiềm năng dựa trên từ khóa",
      icon: <FaSearch className="w-5 h-5" />,
      isEnabled: autoSearch,
      setEnabled: setAutoSearch,
      config: <SearchClient />,
    },
    {
      id: "post",
      title: "Đăng bài tự động",
      description: "Tự động đăng bài theo lịch đã cài đặt",
      icon: <FaRobot className="w-5 h-5" />,
      isEnabled: autoPost,
      setEnabled: setAutoPost,
      config: <AutoPost />, 
    },
    {
      id: "comment",
      title: "Bình luận tự động",
      description: "Tự động phản hồi comment theo kịch bản",
      icon: <FaComments className="w-5 h-5" />,
      isEnabled: autoComment,
      setEnabled: setAutoComment,
      config: <AutoComment />, 
    },
    {
      id: "message",
      title: "Nhắn tin tự động",
      description: "Tự động nhắn tin cho khách hàng tiềm năng",
      icon: <FaFacebookMessenger className="w-5 h-5" />,
      isEnabled: autoMessage,
      setEnabled: setAutoMessage,
      config: <AutoMessage />,
    },
  ];

  // Tìm feature được chọn
  const selectedFeatureConfig = features.find(f => f.id === selectedFeature);

  if (!selectedFeatureConfig) return null;

  return (
    <Card className="p-4">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-default-100 rounded-lg">
          {selectedFeatureConfig.icon}
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <p className="text-md font-semibold">{selectedFeatureConfig.title}</p>
          </div>
          <p className="text-small text-default-500">
            {selectedFeatureConfig.description}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className={"opacity-100"}>
          {selectedFeatureConfig.config}
        </div>
      </CardBody>
    </Card>
  );
} 