import {
  Table,
  Thead,
  Tr,
  Th,
  Flex,
  Heading,
  Tbody,
  Td,
} from '@chakra-ui/react'
import React from 'react'
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  Column,
} from 'react-table'

export type DataTableProps<T> = {
  columns: Column[]
  data: Array<T>
}

export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const { columns, data } = props
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance
  return (
    <Table {...getTableProps()} variant="simple">
      <Thead bg={'gray.50'}>
        {headerGroups.map((headerGroup: any, index: number) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column: any, index: number) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={index}
              >
                <Flex justify="space-between" align="center">
                  <Heading size={'sm'}>{column.render('Header')}</Heading>
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any, index: number) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell: any, index: number) => (
                <Td key={index}>
                  <Flex align="center" fontSize="sm" fontWeight="normal">
                    {cell.render('Cell')}
                  </Flex>
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
