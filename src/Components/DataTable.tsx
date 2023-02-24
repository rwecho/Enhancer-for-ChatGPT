import {
  Table,
  Thead,
  Tr,
  Th,
  Flex,
  Heading,
  Tbody,
  Td,
  HStack,
  Button,
  Text,
  NumberInput,
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

export type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: Array<T>
}

export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const { columns, data } = props
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  })

  return (
    <>
      <Table variant="simple">
        <Thead bg={'gray.50'}>
          {table.getHeaderGroups().map((headerGroup, index: number) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <Flex justify="space-between" align="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Flex>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      <Flex align="center" fontSize="sm" fontWeight="normal">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Flex>
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>

      <HStack justifyContent={'center'} my={4}>
        <Text>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>

        <Select
          w={'auto'}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <Spacer></Spacer>
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </Button>
        <Spacer></Spacer>

        <NumberInput
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(_, value) => {
            const page = value - 1
            table.setPageIndex(page)
          }}
          min={0}
          max={table.getPageCount()}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </>
  )
}
