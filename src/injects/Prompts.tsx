import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getPrompts, PromptWithTag } from '@/services/PromptsService'
import {
  Badge,
  Card,
  ChakraProvider,
  Kbd,
  List,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { createRoot, Root } from 'react-dom/client'
import {
  getButtonElement,
  getPromptContainerElement,
  getTextAreaElement,
} from './selector'
import useStateRef from '@/hooks/useStateRef'
import { throttleRAF } from '@/utils/utils'

let root: Root | null = null
let div: HTMLElement | null = null
export const Prompts = () => {
  const textArea = getTextAreaElement()
  const container = getPromptContainerElement()

  if (!textArea) {
    return <></>
  }

  const [prompts, setPrompts] = useState<PromptWithTag[]>()
  const promptsRef = useRef(prompts)

  useEffect(() => {
    promptsRef.current = prompts
  }, [prompts])

  useEffect(() => {
    const loadData = async () => {
      const prompts = await getPrompts()

      setPrompts(prompts)
    }
    loadData()
  }, [])

  const handlePrompts = (text: string) => {
    const promptRegex = /^\/([_a-z]*)/
    const matches = text.match(promptRegex)
    root?.unmount()
    div?.remove()

    if (!matches?.length || matches.length === 0) {
      return
    }

    const inputPrompt = matches[1]

    const filteredPrompts = promptsRef.current?.filter((o) =>
      o.command.includes(inputPrompt)
    )

    if (!filteredPrompts) {
      return
    }

    div = document.createElement('div')
    container.appendChild(div)

    root = createRoot(div)
    root.render(
      <React.StrictMode>
        <ChakraProvider>
          <PromptList prompts={filteredPrompts} handleRef={container} />
        </ChakraProvider>
      </React.StrictMode>
    )
  }

  const textChange = useCallback((e: Event) => {
    if (e.target instanceof HTMLTextAreaElement) {
      handlePrompts(e.target.value)
    }
  }, [])

  useEffect(() => {
    textArea.addEventListener('input', textChange)
    return () => {
      textArea.removeEventListener('input', textChange)
    }
  }, [])

  return <></>
}

const PromptList = ({
  prompts,
  handleRef,
}: {
  prompts: PromptWithTag[]
  handleRef: HTMLElement
}) => {
  const [selectIndex, setSelectIndex, selectIndexRef] = useStateRef(0)
  const textArea = getTextAreaElement()
  const submitButton = getButtonElement()

  const cardRef = useRef(null)

  const downHandler = (e: KeyboardEvent) => {
    const { key } = e
    if (key === 'ArrowDown') {
      e.preventDefault()
      if (prompts.length) {
        setSelectIndex((preIndex) =>
          preIndex < prompts.length - 1 ? preIndex + 1 : preIndex
        )
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (prompts.length) {
        setSelectIndex((preIndex) => (preIndex > 0 ? preIndex - 1 : preIndex))
      }
    } else if (key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      var prompt = prompts[selectIndexRef.current]

      submit(prompt)
    } else if (key === ' ') {
      var prompt = prompts[selectIndexRef.current]
      textArea.value = prompt.prompt
      textArea.dispatchEvent(new Event('input'))
    } else if (key === 'Tab') {
      e.preventDefault()
      var prompt = prompts[selectIndexRef.current]
      textArea.value = prompt.prompt
      textArea.dispatchEvent(new Event('input'))
    }
  }

  useEffect(() => {
    const downHandlerThrottled = throttleRAF(downHandler, {
      trailing: true,
    })

    handleRef.addEventListener('keydown', downHandlerThrottled, {
      capture: true,
    })

    return () => {
      handleRef.removeEventListener('keydown', downHandler, { capture: true })
    }
  }, [])

  useEffect(() => {
    const selectElement = document.querySelector(
      `#prompt-${selectIndex}`
    ) as HTMLElement

    if (selectElement && cardRef.current) {
      const elementRect = selectElement.getBoundingClientRect()
      const cardRect = (cardRef.current as HTMLElement).getBoundingClientRect()

      if (
        elementRect.bottom >= cardRect.bottom ||
        elementRect.bottom <= cardRect.top
      ) {
        selectElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }, [selectIndex])

  const handleItemClick = (index: number) => {
    setSelectIndex(index)
    const prompt = prompts[index]
    submit(prompt)
  }

  const submit = (prompt: PromptWithTag) => {
    textArea.value = prompt.prompt
    textArea.dispatchEvent(new Event('input'))
    submitButton.click()
  }

  return (
    <Card
      pos={'absolute'}
      bottom={'100%'}
      w={'full'}
      ml={'-4'}
      py={'3'}
      maxH={'240px'}
      mb={'4'}
      overflowY={'auto'}
      ref={cardRef}
    >
      <List spacing={0}>
        {prompts.map((prompt, index) => {
          const isActive = index === selectIndex
          return (
            <ListItem
              id={`prompt-${index}`}
              px={4}
              key={index}
              display="flex"
              onClick={() => handleItemClick(index)}
              sx={{
                bg: isActive ? 'gray.100' : undefined,
              }}
              cursor={'pointer'}
              py={'2'}
            >
              <Kbd
                display={'flex'}
                alignItems="center"
                sx={{
                  bg: isActive ? 'gray.900' : undefined,
                  color: isActive ? 'white' : undefined,
                }}
              >
                /{prompt.command}
              </Kbd>

              {prompt.tag === 'awesome' && (
                <Badge ml="1" alignSelf={'center'} fontSize="3xs">
                  {prompt.tag}
                </Badge>
              )}
              {prompt.tag === 'custom' && (
                <Badge ml="1" alignSelf={'center'} fontSize="3xs">
                  {prompt.tag}
                </Badge>
              )}
              <Spacer></Spacer>
              <Text>{prompt.act}</Text>
            </ListItem>
          )
        })}
      </List>
    </Card>
  )
}
