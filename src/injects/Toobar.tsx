import React from 'react'
import { FaFilePdf, FaImage } from 'react-icons/fa'
import { exportPdf, exportImage } from '@/services/ExportService'
import { Button, Card, Show, useToast, VStack } from '@chakra-ui/react'
import { getThreadElement } from './selector'
import { TbTerminal } from 'react-icons/tb'
import useCreateAndUpdateModal from '@/hooks/useCreateAndUpdateModal'
import { CreateOrUpdateUserPromptModal } from '@/options/pages/CreateOrUpdateUserPromptModal'
import {
  addOrUpdateUserPrompt,
  normalizeAct,
  Prompt,
} from '@/services/PromptsService'

export const Toolbar = () => {
  const thread = getThreadElement()
  const createOrUpdateModal = useCreateAndUpdateModal()
  const toast = useToast()
  const handlePdf = () => {
    if (!thread) {
      return
    }

    exportPdf(thread)
  }
  const handleImage = () => {
    if (!thread) {
      return
    }

    exportImage(thread)
  }

  const handlePrompt = async () => {
    const promptText = await navigator.clipboard.readText()
    const prompt = await createOrUpdateModal.show(
      CreateOrUpdateUserPromptModal,
      {
        act: '',
        command: '',
        prompt: promptText,
      }
    )
    if (!prompt) {
      return
    }

    let newPrompt = {
      ...prompt,
      command: normalizeAct((prompt as any).act),
    } as Prompt

    await addOrUpdateUserPrompt(newPrompt)

    toast({
      title: 'tips',
      description: 'Add prompt success',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Card pos={'absolute'} top={{ base: '16', md: '4' }} right={'4'}>
      <VStack
        minW={{
          md: '32',
        }}
        spacing={0}
      >
        <Button
          w={'full'}
          leftIcon={<FaFilePdf></FaFilePdf>}
          borderRadius={'0'}
          variant="ghost"
          onClick={handlePdf}
          fontWeight={'normal'}
          justifyContent={'flex-start'}
        >
          <Show above="md">Export Pdf</Show>
        </Button>
        <Button
          w={'full'}
          leftIcon={<FaImage></FaImage>}
          borderRadius={'0'}
          variant="ghost"
          onClick={handleImage}
          fontWeight={'normal'}
          justifyContent={'flex-start'}
        >
          <Show above="md">Export Image</Show>
        </Button>

        <Button
          w={'full'}
          leftIcon={<TbTerminal></TbTerminal>}
          borderRadius={'0'}
          variant="ghost"
          onClick={handlePrompt}
          fontWeight={'normal'}
          justifyContent={'flex-start'}
        >
          <Show above="md">Add a prompt</Show>
        </Button>
      </VStack>
    </Card>
  )
}
