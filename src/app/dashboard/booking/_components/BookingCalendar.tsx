'use client'
import { useMemo } from 'react'
import {
  formatStringToDate,
  useBookingStore,
} from '~/app/dashboard/booking/_store/bookingStore.hook'
import { Calendar } from '~/components/ui/calendar'

export const BookingCalendar = () => {
  const { bookingDate, setBookingDate } = useBookingStore()
  const calendarDate = useMemo(
    () => formatStringToDate(bookingDate),
    [bookingDate],
  )
  return (
    <div>
      <Calendar
        mode="single"
        className="w-min"
        selected={calendarDate}
        onSelect={(date) => {
          date && setBookingDate(date)
        }}
      />
      <div>Booking Date: {bookingDate}</div>
    </div>
  )
}
