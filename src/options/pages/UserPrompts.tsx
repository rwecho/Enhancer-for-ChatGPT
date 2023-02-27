import { LoadingBox, DataTable } from '@/Components'
import useCreateAndUpdateModal from '@/hooks/useCreateAndUpdateModal'
import {
  addOrUpdateUserPrompt,
  getUserPrompts,
  normalizeAct,
  Prompt,
  removeUserPrompt,
} from '@/services/PromptsService'
import {
  Card,
  CardHeader,
  Heading,
  Button,
  CardBody,
  useToast,
} from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { CreateOrUpdateUserPromptModal } from './CreateOrUpdateUserPromptModal'

export const UserPrompts = () => {
  const [data, setData] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const createOrUpdateModal = useCreateAndUpdateModal()
  const toast = useToast()
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
      const prompts = await getUserPrompts()
      setData(prompts)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAdd = async () => {
    const prompt = await createOrUpdateModal.show(
      CreateOrUpdateUserPromptModal,
      undefined
    )
    if (!prompt) {
      return
    }
    let newPrompt = {
      ...prompt,
      command: normalizeAct((prompt as any).act),
    } as Prompt

    addOrUpdateUserPrompt(newPrompt)
    setData([...data, newPrompt])

    toast({
      title: 'tips',
      description: 'Add prompt success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const handleEdit = async (prompt: Prompt) => {
    let newPrompt = (await createOrUpdateModal.show(
      CreateOrUpdateUserPromptModal,
      prompt
    )) as Prompt

    if (!newPrompt) {
      return
    }
    newPrompt = {
      ...newPrompt,
      command: normalizeAct((newPrompt as any).act),
    } as Prompt

    addOrUpdateUserPrompt(newPrompt)
    setData([...data.filter((o) => o.command !== prompt.command), newPrompt])

    toast({
      title: 'tips',
      description: 'Update prompt success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  const handleDelete = async (prompt: Prompt) => {
    await removeUserPrompt(prompt)
    setData([...data.filter((o) => o.command !== prompt.command)])

    toast({
      title: 'tips',
      description: 'Remove prompt success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }
  return (
    <Card variant={'elevated'}>
      <CardHeader display={'flex'}>
        <Heading size="md" alignSelf={'center'}>
          User Custom Prompts
        </Heading>
        <Button ml={'auto'} onClick={handleAdd}>
          Add Prompt
        </Button>
      </CardHeader>
      <CardBody>
        <LoadingBox isLoading={isLoading}>
          <DataTable
            columns={columns}
            data={data}
            commands={[
              {
                title: 'edit',
                action: handleEdit,
              },
              {
                title: 'delete',
                action: handleDelete,
              },
            ]}
          ></DataTable>
        </LoadingBox>
      </CardBody>
    </Card>
  )
}
