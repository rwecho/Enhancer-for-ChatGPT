import { getPrompts, Prompt } from '@/services/PromptsService'
import { Button, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Column } from 'react-table'
import { DataTable } from '@/Components'

export const AwesomePrompts = () => {
  const [data, setData] = useState<Prompt[]>([])
  const columns = useMemo<Array<Column>>(
    () => [
      {
        Header: 'Command',
        accessor: 'command',
      },
      {
        Header: 'Act',
        accessor: 'act',
      },
      {
        Header: 'Prompt',
        accessor: 'prompt',
      },
    ],
    []
  )

  useEffect(() => {
    const loadData = async () => {
      const prompts = await getPrompts()
      setData(prompts)
    }
    loadData()
  }, [])

  const handleSync = async () => {
    const prompts = await getPrompts(true)
    setData(prompts)
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
        <DataTable columns={columns} data={data}></DataTable>
      </CardBody>
    </Card>
  )
}
