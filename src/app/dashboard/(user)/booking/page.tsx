import { BookingCalendar } from '~/app/dashboard/(user)/booking/_components/BookingCalendar'
import { BookingDateTable } from '~/app/dashboard/(user)/booking/_components/BookingDateTable'
import { Separator } from '~/components/ui/separator'

const BookingPage = () => {
  return (
    <div className="h-full w-full border rounded-md overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-h-full overflow-y-auto">
        <div className="grid grid-rows-[1fr_1fr_12fr] border-r max-h-full overflow-y-auto p-3">
          <div className="text-center p-5 text-xl">Please Select a date</div>
          <Separator className="my-2" />
          <div className="grid place-items-center flex-1">
            <BookingCalendar />
          </div>
        </div>
        <div className="grid grid-rows-[1fr_1fr_12fr] border-l max-h-full overflow-y-auto p-3">
          <div className="text-center p-5 text-xl">Available Date</div>
          <Separator className="my-2" />
          <div className="overflow-y-auto">
            <BookingDateTable />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
