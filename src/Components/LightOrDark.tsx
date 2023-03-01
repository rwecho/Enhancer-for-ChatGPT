import { isDark } from '@/utils/themeUtils'
import { DarkMode, LightMode } from '@chakra-ui/react'
import React from 'react'

export const LightOrDark = ({ children }: { children: JSX.Element }) => {
  if (isDark()) {
    return <DarkMode>{children}</DarkMode>
  }

  return <LightMode>{children}</LightMode>
}
