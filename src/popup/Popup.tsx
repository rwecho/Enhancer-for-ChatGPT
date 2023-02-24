import { Button, Divider, IconButton, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaFilePdf, FaImage } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

export const Popup = () => {
  const handlePdf = () => {}
  const handleImage = () => {}
  const handleOptions = () => {
    chrome.tabs.create({ url: 'options.html' })
  }
  return (
    <VStack minW={'32'} spacing={0}>
      <Button
        w={'full'}
        leftIcon={<FiSettings></FiSettings>}
        borderRadius={'0'}
        variant="ghost"
        onClick={handleOptions}
        fontWeight={'normal'}
        justifyContent={'flex-start'}
      >
        Options
      </Button>
    </VStack>
  )
}
