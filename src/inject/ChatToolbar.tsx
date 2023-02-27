import { Center, ChakraProvider, Collapse, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { getChatElements, getThreadElement } from './selector'
import { AiOutlineSound } from 'react-icons/ai'
import { speak } from '@/services/TtsService'

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
        <ChatToolbarView
          container={container}
          text={text as HTMLElement}
        ></ChatToolbarView>
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
  const [mouseOver, setMouseOver] = useState(false)
  const handleTts = () => {
    const textContent = text.textContent
    if (!textContent) {
      return
    }
    speak(textContent)
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
        <IconButton
          aria-label="Search database"
          icon={<AiOutlineSound />}
          onClick={handleTts}
        />
      </Center>
    </Collapse>
  )
}
