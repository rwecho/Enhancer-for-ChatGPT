import {
  Center,
  ChakraProvider,
  Collapse,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { getChatElements, getThreadElement } from './selector'
import { AiOutlineSound, AiOutlineStop } from 'react-icons/ai'
import { LightOrDark } from '@/Components'
import { useTTS } from '@/hooks/useTTS'

export const ChatToolbar = () => {
  const thread = getThreadElement()

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue

          if (node.matches('main div.w-full.border-b')) {
            injectChatToolbar(node)
          }
        }
      }
    })

    observer.observe(thread, {
      childList: true,
      subtree: true,
    })

    const staticElements = getChatElements()

    for (let element of staticElements) {
      injectChatToolbar(element as HTMLElement)
    }
    return () => {
      observer.disconnect()
    }
  }, [thread])

  const injectChatToolbar = (container: HTMLElement) => {
    const div = document.createElement('div')
    container.appendChild(div)

    const text = container.querySelector('div.text-base')
    if (!text) {
      return
    }
    const root = createRoot(div)
    root.render(
      <ChakraProvider>
        <LightOrDark>
          <ChatToolbarView
            container={container}
            text={text as HTMLElement}
          ></ChatToolbarView>
        </LightOrDark>
      </ChakraProvider>
    )
  }

  return <></>
}

const ChatToolbarView = ({
  text,
  container,
}: {
  text: HTMLElement
  container: HTMLElement
}) => {
  const { speak, pause, resume } = useTTS()

  const [mouseOver, setMouseOver] = useState(false)
  const handleTtsSpeak = () => {
    const textContent = text.textContent
    if (!textContent) {
      return
    }
    speak(textContent)
  }

  const handleTtsStop = () => {
    pause()
  }

  useEffect(() => {
    const handleMouseLeave = () => {
      setMouseOver(false)
    }
    const handleMouseEnter = () => {
      setMouseOver(true)
    }
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])
  return (
    <Collapse in={mouseOver} animateOpacity>
      <Center mb={4}>
        <HStack spacing={2}>
          <IconButton
            aria-label="speak text by tts"
            icon={<AiOutlineSound />}
            onClick={handleTtsSpeak}
            size={'sm'}
          />
          <IconButton
            aria-label="stop tts"
            icon={<AiOutlineStop />}
            onClick={handleTtsStop}
            size={'sm'}
          />
        </HStack>
      </Center>
    </Collapse>
  )
}
