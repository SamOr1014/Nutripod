'use client'
import { useRouter } from 'next/navigation'
import { UserRole } from '~/types/UserRole'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

type Props = {
  role: UserRole
}

export default function NavButtons({ role }: Props) {
  const router = useRouter()
  return (
    <ToggleGroup
      type="single"
      className="justify-start"
      onValueChange={(val) => {
        router.push(`/dashboard/${val}`)
      }}
    >
      {role === UserRole.USER ? (
        <>
          <ToggleGroupItem value="/home">Home</ToggleGroupItem>
          <ToggleGroupItem value="/booking">Booking</ToggleGroupItem>
          <ToggleGroupItem value="/metrics">Metrics</ToggleGroupItem>
          <ToggleGroupItem value="/info">Info</ToggleGroupItem>
        </>
      ) : (
        <>
          <ToggleGroupItem value="/dietitian-home">Home</ToggleGroupItem>
          <ToggleGroupItem value="/dietitian-booking">Booking</ToggleGroupItem>
          <ToggleGroupItem value="/dietitian-metrics">Metrics</ToggleGroupItem>
          <ToggleGroupItem value="/dietitian-info">Info</ToggleGroupItem>
        </>
      )}
    </ToggleGroup>
  )
}
