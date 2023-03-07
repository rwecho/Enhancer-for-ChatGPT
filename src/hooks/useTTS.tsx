import { useMemo } from 'react'
import { useSettings } from './useSettings'
import { useSpeechSynthesis } from './useSpeechSynthesis'

type SpeechFunctions = {
  speak: (text: string) => void
  pause: typeof window.speechSynthesis.pause
  resume: typeof window.speechSynthesis.resume
}

export const useTTS = (): SpeechFunctions => {
  const [settings] = useSettings()
  const [voices, speak] = useSpeechSynthesis()

  // Only memoize the speak function when voices or settings change
  const speechFuncs = useMemo(() => {
    const pitch = settings.speechPitch
    const rate = settings.speechRate
    const voice = voices.find((o) => o.name === settings.voice)

    return {
      speak: (text: string) =>
        voice
          ? speak(text, voice, pitch, rate)
          : console.warn(`Voice not found: ${settings.voice}`),
      pause: window.speechSynthesis.pause,
      resume: window.speechSynthesis.resume,
    }
  }, [settings, voices, speak])

  return speechFuncs
}
