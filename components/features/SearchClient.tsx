"use client";
import { Input } from '@nextui-org/input';
import { Chip } from '@nextui-org/chip';
import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Slider } from '@nextui-org/slider';
import { Button } from '@nextui-org/button';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Toaster } from "sonner";
import { fetchPost, fetchGet } from "@/lib/api";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import TableCustom from "@/components/table/TableCustom";

interface ScrapingConfig {
  keywords: string;
  maxGroups: number;
  maxPosts: number;
  minLikes: number;
  minComments: number;
}

interface ScrapeHistory {
  id: number;
  keyword: string;
  num_groups: number;
  num_posts: number;
  num_likes: number;
  num_comments: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export default function SearchClient() {
  const [keywords, setKeywords] = useState('');
  const [maxGroups, setMaxGroups] = useState(50);
  const [maxPosts, setMaxPosts] = useState(100);
  const [minLikes, setMinLikes] = useState(10);
  const [minComments, setMinComments] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ScrapeHistory[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchScrapeHistory();
  }, []);

  const fetchScrapeHistory = async () => {
    try {
      const data = await fetchGet("history-scrape");
      console.log(data?.data?.items);
      setHistory(data?.data?.items);
    } catch (error) {
      toast.error("Không thể tải lịch sử thu thập");
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleStartScraping = async () => {
    if (!keywords.trim()) {
      toast.error("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }
    
    const config = {
      keyword: keywords,
      num_groups: maxGroups,
      num_posts: maxPosts,
      num_likes: minLikes,
      num_comments: minComments
    };
    
    setIsLoading(true);
    try {
      await fetchPost("history-scrape", config);
      toast.success("Bắt đầu thu thập dữ liệu thành công!");
      fetchScrapeHistory();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const columns = [
    {
      name: "THỜI GIAN",
      uid: "created_at",
    },
    {
      name: "TỪ KHÓA",
      uid: "keyword",
    },
    {
      name: "SỐ NHÓM",
      uid: "num_groups",
    },
    {
      name: "BÀI VIẾT",
      uid: "num_posts",
    },
    {
      name: "COMMENTS",
      uid: "num_comments",
    },
    {
      name: "TRẠNG THÁI",
      uid: "status",
    },
  ];

  const visible_columns = [
    "created_at",
    "keyword",
    "num_groups",
    "num_posts",
    "num_likes",
    "num_comments",
    "status",
  ];

  return (
    <div className="space-y-6">
      {/* Từ khóa tìm kiếm */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Từ khóa tìm kiếm</h3>
        <Input
          label="Từ khóa"
          placeholder="VD: cần mua, đang tìm..."
          variant="bordered"
          onChange={(e) => setKeywords(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <Chip size="sm" variant="flat" color="primary">cần mua</Chip>
          <Chip size="sm" variant="flat" color="primary">đang tìm</Chip>
          <Chip size="sm" variant="flat" color="primary">tìm mua</Chip>
          <Chip size="sm" variant="flat" color="primary">cần tìm</Chip>
          <Chip size="sm" variant="flat" color="primary">ai biết</Chip>
          <Chip size="sm" variant="flat" color="primary">giúp mình</Chip>
        </div>
      </div>

      <Divider />

      {/* Giới hạn số lượng */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Giới hạn số lượng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2">Số nhóm tối đa</p>
                  <Slider 
                    size="sm"
                    step={10}
                    maxValue={200}
                    minValue={0}
                    value={maxGroups}
                    onChange={(value) => setMaxGroups(value as number)}
                    className="max-w-md"
                    showSteps={true}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 100, label: "100" },
                      { value: 200, label: "200" },
                    ]}
                  />
                  <p className="text-small text-default-500 mt-1">
                    Đã chọn: {maxGroups} nhóm
                  </p>
                </div>

                <div>
                  <p className="text-sm mb-2">Số bài viết/nhóm</p>
                  <Slider 
                    size="sm"
                    step={10}
                    maxValue={500}
                    minValue={0}
                    value={maxPosts}
                    onChange={(value) => setMaxPosts(value as number)}
                    className="max-w-md"
                    showSteps={true}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 250, label: "250" },
                      { value: 500, label: "500" },
                    ]}
                  />
                  <p className="text-small text-default-500 mt-1">
                    Đã chọn: {maxPosts} bài/nhóm
                  </p>
                </div>

                
              </div>
            </CardBody>
          </Card>

          {/* Bộ lọc tương tác */}
          <Card>
            <CardBody>
              <div className="space-y-4">
                <h4 className="text-medium">Lọc theo tương tác</h4>
                
                <div>
                  <p className="text-sm mb-2">Số lượng thích tối thiểu</p>
                  <Slider 
                    size="sm"
                    step={5}
                    maxValue={100}
                    minValue={0}
                    value={minLikes}
                    onChange={(value) => setMinLikes(value as number)}
                    className="max-w-md"
                    showSteps={true}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 50, label: "50" },
                      { value: 100, label: "100" },
                    ]}
                  />
                  <p className="text-small text-default-500 mt-1">
                    Tối thiểu: {minLikes} likes
                  </p>
                </div>

                <div>
                  <p className="text-sm mb-2">Số lượng bình luận tối thiểu</p>
                  <Slider 
                    size="sm"
                    step={5}
                    maxValue={100}
                    minValue={0}
                    value={minComments}
                    onChange={(value) => setMinComments(value as number)}
                    className="max-w-md"
                    showSteps={true}
                    marks={[
                      { value: 0, label: "0" },
                      { value: 50, label: "50" },
                      { value: 100, label: "100" },
                    ]}
                  />
                  <p className="text-small text-default-500 mt-1">
                    Tối thiểu: {minComments} comments
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          color="primary"
          size="lg"
          isLoading={isLoading}
          onClick={handleStartScraping}
          className="px-8"
        >
          {isLoading ? "Đang xử lý..." : "Bắt đầu thu thập"}
        </Button>
      </div>

      {/* History Table */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Lịch sử thu thập dữ liệu</h3>
        
        <TableCustom
          columns={columns}
          visible_columns={visible_columns}
          rows={history}
          isLoading={loadingHistory}
        />
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}
