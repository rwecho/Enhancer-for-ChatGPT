export const speak = (text: string) => {
  chrome.runtime.sendMessage({ type: 'tts', action: 'speak', text: text })
}

export const resume = () => {
  chrome.runtime.sendMessage({ type: 'tts', action: 'resume' })
}

export const stop = () => {
  chrome.runtime.sendMessage({ type: 'tts', action: 'stop' })
}
