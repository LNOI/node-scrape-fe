import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Switch } from '@nextui-org/switch'
import React from 'react'

export default function AutoMessage() {
  return (
    <div className="space-y-2">
    <div className="flex gap-2 items-center">
      <Switch size="sm" />
      <span>Gửi tin nhắn chào mừng</span>
    </div>
    <div className="flex gap-2 items-center">
      <Switch size="sm" />
      <span>Trả lời tin nhắn tự động</span>
    </div>
    <Button size="sm">Tùy chỉnh tin nhắn</Button>
  </div>
  )
}
