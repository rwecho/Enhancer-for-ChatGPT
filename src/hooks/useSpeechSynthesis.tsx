import { useState, useEffect, useRef } from 'react'

type SpeakFunction = (
  text: string,
  voice: SpeechSynthesisVoice,
  pitch?: number,
  rate?: number
) => void

type UseSpeechSynthesisReturnType = [SpeechSynthesisVoice[], SpeakFunction]

export const useSpeechSynthesis = (): UseSpeechSynthesisReturnType => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  const speak = useRef(
    (text: string, voice: SpeechSynthesisVoice, pitch = 1, rate = 1) => {
      const synth = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice = voice
      utterance.pitch = pitch
      utterance.rate = rate
      synth.speak(utterance)
    }
  )

  useEffect(() => {
    if (typeof window === 'object' && window.speechSynthesis) {
      const synth = window.speechSynthesis

      const updateVoices = () => {
        const voices = synth.getVoices()
        setVoices(voices)
      }

      if (synth.getVoices().length) {
        updateVoices()
        return
      }
      synth.addEventListener('voiceschanged', updateVoices)

      return () => {
        synth.removeEventListener('voiceschanged', updateVoices)
      }
    }
  }, [])

  return [voices, speak.current]
}
