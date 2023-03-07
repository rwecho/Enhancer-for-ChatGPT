import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  useConst,
  VStack,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { Select, NumberInput } from '@/Components'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useSettings } from '@/hooks/useSettings'

export const Settings = () => {
  return (
    <VStack>
      <TTSSettings></TTSSettings>
    </VStack>
  )
}

const TTSSettings = () => {
  const [voices, speak] = useSpeechSynthesis()

  const [settings, setSettings] = useSettings()

  const handleVoice = (voice: string) => {
    setSettings({ ...settings, voice: voice })
  }

  const handleRate = (rate: number) => {
    setSettings({ ...settings, speechRate: rate })
  }
  const handlePitch = (pitch: number) => {
    setSettings({ ...settings, speechPitch: pitch })
  }
  return (
    <Card variant={'elevated'} w="full">
      <CardHeader display={'flex'}>
        <Heading size="md" alignSelf={'center'}>
          Settings
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ md: 3, sm: 1 }} spacing={4}>
          <FormControl>
            <FormLabel htmlFor="voice">AI voice and language:</FormLabel>
            <Select
              items={voices}
              valueMember={(item) => item.name}
              textMember={(item) =>
                item.default ? `${item.name} - default` : item.name
              }
              value={settings.voice}
              onChange={handleVoice}
            ></Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="speechRate">
              AI talking speed(speech rate):
            </FormLabel>
            <NumberInput
              precision={2}
              step={0.1}
              value={settings.speechRate}
              onChange={(value) => handleRate(value)}
              min={0.1}
            ></NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="voicePitch">AI voice pitch:</FormLabel>
            <NumberInput
              precision={2}
              step={0.1}
              value={settings.speechPitch}
              onChange={(value) => handlePitch(value)}
              min={0.1}
            ></NumberInput>
          </FormControl>
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}
