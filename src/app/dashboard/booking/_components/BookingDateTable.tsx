import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

//To be decided structure
const mockData = [
  {
    date: new Date(),
    time: '09:00',
    available: true,
  },
  {
    date: new Date(),
    time: '10:00',
    available: true,
  },
  {
    date: new Date(),
    time: '11:00',
    available: true,
  },
  {
    date: new Date(),
    time: '12:00',
    available: true,
  },
  {
    date: new Date(),
    time: '13:00',
    available: false,
  },
  {
    date: new Date(),
    time: '14:00',
    available: true,
  },
  {
    date: new Date(),
    time: '14:00',
    available: true,
  },
  {
    date: new Date(),
    time: '14:00',
    available: true,
  },
  {
    date: new Date(),
    time: '14:00',
    available: true,
  },
  {
    date: new Date(),
    time: '14:00',
    available: true,
  },
]

export const BookingDateTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="w-[50px] min-w-[50px]">Apply</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockData.map((item) => {
          return (
            <TableRow key={item.date.toISOString() + item.time}>
              <TableCell>{item.date.toLocaleDateString('zh-hk')}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <Button size="sm" variant="link" disabled={!item.available}>
                  Apply
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
