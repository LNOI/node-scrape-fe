import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Switch } from '@nextui-org/switch'
import React from 'react'

export default function AutoComment() {
  return (
    <div className="space-y-2">
    <div className="flex gap-2 items-center">
      <Switch size="sm" />
      <span>Trả lời comment có từ khóa</span>
    </div>
    <div className="flex gap-2 items-center">
      <Switch size="sm" />
      <span>Trả lời tin nhắn chứa câu hỏi</span>
    </div>
    <Button size="sm">Cài đặt kịch bản</Button>
  </div>
  )
}
