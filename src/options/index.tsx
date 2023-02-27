import React from 'react'
import '@/index.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Layout, Page404 } from './shared'
import { AwesomePrompts, UserPrompts } from './pages'
import { CreateAndUpdateModalProvider } from '@/hooks/useCreateAndUpdateModal'

const root = createRoot(document.getElementById('root')!)

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
})
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark"></ColorModeScript>
      <CreateAndUpdateModalProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout></Layout>}>
              <Route index element={<AwesomePrompts></AwesomePrompts>}></Route>
              <Route
                path="/user-prompts"
                element={<UserPrompts></UserPrompts>}
              ></Route>
            </Route>
            <Route path="*" element={<Page404></Page404>}></Route>
          </Routes>
        </HashRouter>
      </CreateAndUpdateModalProvider>
    </ChakraProvider>
  </React.StrictMode>
)
