'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SwapButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function SwapButton({ onClick, disabled }: SwapButtonProps) {
  const [rotated, setRotated] = useState(false)

  const handleClick = () => {
    setRotated((prev) => !prev)
    onClick()
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
      className="shrink-0 cursor-pointer rounded-full border-dashed transition-all duration-200 hover:border-solid hover:bg-accent"
      aria-label="Swap units"
    >
      <ArrowUpDown
        className="h-4 w-4 transition-transform duration-300"
        style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
      />
    </Button>
  )
}
