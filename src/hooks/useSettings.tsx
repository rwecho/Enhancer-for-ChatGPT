import { useEffect, useState } from 'react'
import { useSpeechSynthesis } from './useSpeechSynthesis'

export type Settings = {
  voice?: string
  speechRate: number
  speechPitch: number
}

type SetSettingsFunction = (settings: Settings) => Promise<void>

type UseSettingsReturnType = [Settings, SetSettingsFunction]

const settingsStorageKey = 'app-settings'
export const useSettings = (): UseSettingsReturnType => {
  const [settings, _setSettings] = useState<Settings>({
    voice: '',
    speechPitch: 1,
    speechRate: 1,
  })

  const [voice, _] = useSpeechSynthesis()

  const setSettings = async (settings: Settings) => {
    _setSettings(settings)
    await chrome.storage.sync.set({
      [settingsStorageKey]: settings,
    })
  }

  useEffect(() => {
    const loadData = async () => {
      const data = await chrome.storage.sync.get(settingsStorageKey)
      if (settingsStorageKey in data) {
        _setSettings(data[settingsStorageKey])
      } else {
        const defaultVoice = voice.find((o) => o.default)

        _setSettings({
          voice: defaultVoice?.name ?? '',
          speechPitch: 1,
          speechRate: 1,
        })
      }
    }
    loadData()
  }, [])

  return [settings, setSettings]
}
