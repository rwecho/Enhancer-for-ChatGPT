import { getPrompts, Prompt } from '@/services/PromptsService'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { DataTable, LoadingBox } from '@/Components'
import { ColumnDef } from '@tanstack/react-table'
import { delay } from '@/services/promise'

export const AwesomePrompts = () => {
  const [data, setData] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const columns = useMemo<Array<ColumnDef<Prompt>>>(
    () => [
      {
        header: 'Command',
        accessorKey: 'command',
      },
      {
        header: 'Act',
        accessorKey: 'act',
      },
      {
        header: 'Prompt',
        accessorKey: 'prompt',
      },
    ],
    []
  )

  const loadData = async () => {
    try {
      setIsLoading(true)
      const prompts = await getPrompts()
      setData(prompts)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSync = async () => {
    await loadData()
  }

  return (
    <Card variant={'elevated'}>
      <CardHeader display={'flex'}>
        <Heading size="md" alignSelf={'center'}>
          Awesome chatGPT Prompts
        </Heading>
        <Button ml={'auto'} onClick={handleSync}>
          Sync
        </Button>
      </CardHeader>
      <CardBody>
        <LoadingBox isLoading={isLoading}>
          <DataTable columns={columns} data={data}></DataTable>
        </LoadingBox>
      </CardBody>
    </Card>
  )
}
