export type Prompt = {
  command: string
  act: string
  prompt: string
}

export type PromptWithTag = Prompt & {
  tag: 'custom' | 'awesome'
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

const promptsStorageKey = 'awesome-prompts'

export const getAwesomePrompts = async (forceFetch = false) => {
  if (!forceFetch) {
    const data = await chrome.storage.local.get(promptsStorageKey)

    if (promptsStorageKey in data) {
      return data[promptsStorageKey] as Prompt[]
    }
  }
  const promptsUrl =
    'https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv'

  const response = await fetch(promptsUrl)
  const content = await response.text()

  const prompts = parsePrompts(content)
  await chrome.storage.local.set({ [promptsStorageKey]: prompts })
  return prompts
}

export const getPrompts = async () => {
  const userPrompts = await getUserPrompts()
  const awesomePrompts = await getAwesomePrompts()

  return [
    ...userPrompts.map((p) => {
      return { ...p, tag: 'custom' }
    }),

    ...awesomePrompts.map((p) => {
      return { ...p, tag: 'awesome' }
    }),
  ] as Array<PromptWithTag>
}

const userStorageKey = 'user-customs'

export const getUserPrompts = async () => {
  const data = await chrome.storage.local.get(userStorageKey)

  if (userStorageKey in data) {
    return data[userStorageKey] as Prompt[]
  }

  return []
}

export const addOrUpdateUserPrompt = async (prompt: Prompt) => {
  const data = await chrome.storage.local.get(userStorageKey)
  let prompts = [] as Prompt[]
  if (userStorageKey in data) {
    prompts = data[userStorageKey] as Prompt[]
  }

  await chrome.storage.local.set({
    [userStorageKey]: [
      ...prompts.filter((p) => p.command !== prompt.command),
      prompt,
    ],
  })
}

export const removeUserPrompt = async (prompt: Prompt) => {
  const data = await chrome.storage.local.get(userStorageKey)

  let prompts = [] as Prompt[]

  if (userStorageKey in data) {
    prompts = data[userStorageKey] as Prompt[]
  }

  await chrome.storage.local.set({
    [userStorageKey]: [...prompts.filter((p) => p.command !== prompt.command)],
  })
}

export const normalizeAct = (act: string) => {
  const regex1 = /[\s\`/]+/g
  let result = act.replace(regex1, '_')

  const regex2 = /[-()]/g
  return result.replace(regex2, '').toLowerCase()
}
