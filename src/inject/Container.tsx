import { ChakraProvider, theme } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import { getTextAreaElement } from './selector'
import { Prompts } from './Prompts'
import { Toolbar } from './Toobar'

let root: Root | null = null
let div: HTMLElement | null = null
let textAreaId: string | null | undefined = null

export const Container = () => {
  useEffect(() => {
    var interval = setInterval(() => {
      const textArea = getTextAreaElement()
      if (textAreaId === textArea.getAttribute('data-id')) {
        return
      }

      textAreaId = textArea.getAttribute('data-id')
      root?.unmount()
      div?.remove()
      div = document.createElement('div')
      root = createRoot(div)
      document.body.appendChild(div)
      root.render(
        <ChakraProvider theme={theme}>
          <>
            <Toolbar></Toolbar>
            <Prompts></Prompts>
          </>
        </ChakraProvider>
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}
