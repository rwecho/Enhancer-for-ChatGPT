import React from 'react'
import { Popup } from './Popup'
import '@/index.css'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, theme } from '@chakra-ui/react'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Popup />
    </ChakraProvider>
  </React.StrictMode>
)
