import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React from 'react'

export default function AutoPost() {
  return (
    <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="time"
              label="Thời gian"
              variant="bordered"
              className="w-32"
            />
            <Input
              type="number"
              label="Số bài/ngày"
              variant="bordered"
              className="w-32"
            />
          </div>
          <Button size="sm">Quản lý nội dung</Button>
        </div>
  )
}
