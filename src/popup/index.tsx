import React from 'react'
import { Popup } from './Popup'
import '@/index.css'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="system"></ColorModeScript>
      <Popup />
    </ChakraProvider>
  </React.StrictMode>
)
