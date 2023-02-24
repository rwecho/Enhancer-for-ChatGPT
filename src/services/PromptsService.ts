export type Prompt = {
  command: string
  act: string
  prompt: string
}

export const parsePrompts = (text: string) => {
  const rows = text.split(`\n`)
  const regex = /^"(.+)","(.+)"$/

  const prompts: Prompt[] = []
  rows.forEach((row, index) => {
    if (index === 0) {
      return
    }
    const matches = row.match(regex)
    if (matches?.length && matches.length >= 3) {
      const command = normalizeAct(matches[1])
      prompts.push({
        command,
        act: matches[1],
        prompt: matches[2].replaceAll('""', '"'), // trim one when there are double quotes
      })
    }
  })

  return prompts
}

const storageKey = 'awesome-prompts'

export const getPrompts = async (forceFetch = false) => {
  if (!forceFetch) {
    const data = await chrome.storage.local.get(storageKey)

    if (storageKey in data) {
      return data[storageKey] as Prompt[]
    }
  }
  const promptsUrl =
    'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv'

  const response = await fetch(promptsUrl)
  const content = await response.text()

  const prompts = parsePrompts(content)
  await chrome.storage.local.set({ [storageKey]: prompts })
  return prompts
}

const normalizeAct = (act: string) => {
  const regex1 = /[\s\`/]+/g
  let result = act.replace(regex1, '_')

  const regex2 = /[-()]/g
  return result.replace(regex2, '').toLowerCase()
}
