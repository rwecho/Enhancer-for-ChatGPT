import { ChakraProvider, theme } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { getTextAreaElement } from './selector'
import { Prompts } from './Prompts'
import { Toolbar } from './Toobar'
import { CreateAndUpdateModalProvider } from '@/hooks/useCreateAndUpdateModal'
import { ChatToolbar } from './ChatToolbar'

let root: Root | null = null
let div: HTMLElement | null = null
let textArea: HTMLElement | null | undefined = null

export const Container = () => {
  useEffect(() => {
    var interval = setInterval(() => {
      const newTextArea = getTextAreaElement()
      if (!newTextArea || textArea === newTextArea) {
        return
      }

      textArea = newTextArea
      root?.unmount()
      div?.remove()
      div = document.createElement('div')
      root = createRoot(div)
      document.body.appendChild(div)
      root.render(
        <ChakraProvider theme={theme}>
          <CreateAndUpdateModalProvider>
            <Toolbar></Toolbar>
            <Prompts></Prompts>
            <ChatToolbar></ChatToolbar>
          </CreateAndUpdateModalProvider>
        </ChakraProvider>
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}
