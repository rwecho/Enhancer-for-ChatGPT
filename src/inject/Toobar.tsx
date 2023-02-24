import React from 'react'
import { FaFilePdf, FaImage } from 'react-icons/fa'
import { exportPdf, exportImage } from '@/services/ExportService'
import { Button, Card, VStack } from '@chakra-ui/react'
import { getThreadElement } from './selector'

export const Toolbar = () => {
  const thread = getThreadElement()
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

  return (
    <Card pos={'absolute'} top={'4'} right={'4'}>
      <VStack minW={'32'} spacing={0}>
        <Button
          w={'full'}
          leftIcon={<FaFilePdf></FaFilePdf>}
          borderRadius={'0'}
          variant="ghost"
          onClick={handlePdf}
          fontWeight={'normal'}
          justifyContent={'flex-start'}
        >
          Export Pdf
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
          Export Image
        </Button>
      </VStack>
    </Card>
  )
}
