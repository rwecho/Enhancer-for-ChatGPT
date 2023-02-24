import { Box, BoxProps, Spinner } from '@chakra-ui/react'
import React from 'react'
export type LoadingBoxProps = { isLoading: boolean } & BoxProps

export const LoadingBox = (props: LoadingBoxProps) => {
  const { children, isLoading, ...rest } = props
  return (
    <Box {...rest} pos={'relative'}>
      {/* todo: how to show with delay time  */}
      {isLoading && (
        <Box
          bg="blackAlpha.100"
          backdropFilter="blur(1px) hue-rotate(200deg)"
          pos={'absolute'}
          display={'flex'}
          top={'0'}
          left={'0'}
          color={'white'}
          w={'full'}
          h={'full'}
          zIndex={999}
        >
          <Box m={'auto'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </Box>
      )}

      {children}
    </Box>
  )
}
