import { RenderType, Table } from '~/components/common/Table'
import { Button } from '~/components/ui/button'
import { TableCell } from '~/components/ui/table'

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
  const headers: RenderType[] = [
    { render: 'Date' },
    { render: 'Time' },
    {
      render: 'Apply',
      className: 'w-[50px] text-center',
    },
  ]

  const data: RenderType[] = mockData.map((item) => {
    return {
      render: (
        <>
          <TableCell>{item.date.toLocaleDateString()}</TableCell>
          <TableCell>{item.time}</TableCell>
          <TableCell>
            <Button disabled={!item.available} variant="link">
              Apply
            </Button>
          </TableCell>
        </>
      ),
    }
  })
  return <Table renderHeaders={headers} renderData={data} />
}
