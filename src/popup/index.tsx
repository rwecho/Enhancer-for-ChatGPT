import React from 'react'
import { Popup } from './Popup'
import '@/index.css'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { LightOrDark } from '@/Components'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <LightOrDark>
        <Popup />
      </LightOrDark>
    </ChakraProvider>
  </React.StrictMode>
)
