chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, action, text } = message

  if (type === 'tts') {
    if (action === 'speak') {
      console.log('tts speak:', text)
      chrome.tts.speak(text, { lang: 'en-US' })
    } else if (action === 'resume') {
      chrome.tts.resume()
    } else if (action === 'stop') {
      chrome.tts.stop()
    }
  }
})
