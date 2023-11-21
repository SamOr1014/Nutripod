'use client'
import { useRouter } from 'next/navigation'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

const NavButtons = () => {
  const router = useRouter()
  return (
    <ToggleGroup
      type="single"
      className="justify-start"
      onValueChange={(val) => {
        router.push(`/dashboard/${val}`)
      }}
    >
      <ToggleGroupItem value="/home">Home</ToggleGroupItem>
      <ToggleGroupItem value="/booking">Booking</ToggleGroupItem>
      <ToggleGroupItem value="/metrics">Metrics</ToggleGroupItem>
      <ToggleGroupItem value="/info">Info</ToggleGroupItem>
    </ToggleGroup>
  )
}

export default NavButtons
