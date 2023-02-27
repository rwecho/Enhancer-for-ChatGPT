chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, action, text } = message

  if (type === 'tts') {
    if (action === 'speak') {
      chrome.tts.speak(text)
    } else if (action === 'resume') {
      chrome.tts.resume()
    } else if (action === 'stop') {
      chrome.tts.stop()
    }
  }
})
