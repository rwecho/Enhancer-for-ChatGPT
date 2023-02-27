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

export type ExtraCommand<T> = {
  title: string
  action: (row: T) => void
}
export type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: Array<T>
  commands?: Array<ExtraCommand<T>>
}
const getVisiblePages = (maxPageSize: number, pageIndex: number) => {
  if (maxPageSize <= 5) {
    return Array.from(Array(maxPageSize).keys())
  }
  if (pageIndex <= 2) {
    return Array.from(Array(5).keys())
  }
  if (pageIndex >= maxPageSize - 2) {
    return Array.from(Array(5).keys()).map((i) => i + maxPageSize - 5)
  }
  return Array.from(Array(5).keys()).map((i) => i + pageIndex - 2)
}

export const DataTable = <T extends object>(props: DataTableProps<T>) => {
  const { columns, data, commands } = props
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

  const visiblePages = getVisiblePages(
    table.getPageCount(),
    table.getState().pagination.pageIndex
  )

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

              {commands && commands.length > 0 && (
                <Th>
                  <Flex justify="space-between" align="center">
                    <Heading size={'sm'}>Operations</Heading>
                  </Flex>
                </Th>
              )}
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

                {commands && commands.length > 0 && (
                  <Td>
                    {commands.map((command, index) => {
                      return (
                        <Button
                          key={index}
                          onClick={() => command.action(row.original)}
                        >
                          {command.title}
                        </Button>
                      )
                    })}
                  </Td>
                )}
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

        {visiblePages.map((page, index) => (
          <Button
            key={index}
            onClick={() => table.setPageIndex(page)}
            rounded={0}
            color={
              page === table.getState().pagination.pageIndex
                ? 'white'
                : undefined
            }
            bg={
              page === table.getState().pagination.pageIndex
                ? 'teal.500'
                : undefined
            }
          >
            {page + 1}
          </Button>
        ))}
        <Button
          onClick={() => table.nextPage()}
          disabled={
            !table.getCanNextPage() &&
            table.getState().pagination.pageIndex < table.getPageCount() - 1
          }
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
          min={1}
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
