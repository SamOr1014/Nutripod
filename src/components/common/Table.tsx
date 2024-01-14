import { randomBytes } from 'crypto'
import {
  Table as ShadTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

export type RenderType = {
  render: React.ReactNode
  className?: string
}

export type TableProps = {
  renderData: Array<RenderType>
  renderHeaders: Array<RenderType>
} & React.HTMLAttributes<HTMLTableElement>

export const Table = ({
  renderData = [],
  renderHeaders,
  ...restProps
}: TableProps) => {
  return (
    <ShadTable {...restProps}>
      <TableHeader>
        <TableRow>
          {renderHeaders.map(({ render, className }) => {
            return (
              <TableHead
                key={randomBytes(32).toString()}
                className={className ?? ''}
              >
                {render}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {renderData.map((item) => {
          return (
            <TableRow key={randomBytes(32).toString()}>{item.render}</TableRow>
          )
        })}
      </TableBody>
    </ShadTable>
  )
}
