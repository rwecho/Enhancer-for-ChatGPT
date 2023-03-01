export const getTextAreaElement = () => {
  if (isAboveMdBreakpoint()) {
    return document.querySelector(
      'main form>div>div:nth-child(2)>textarea'
    ) as HTMLTextAreaElement
  }

  return document.querySelector(
    'main form>div>div>textarea'
  ) as HTMLTextAreaElement
}

export const getPromptContainerElement = () => {
  return document.querySelector('main form>div') as HTMLElement
}

export const getButtonElement = () => {
  if (isAboveMdBreakpoint()) {
    return document.querySelector(
      'main form>div>div:nth-child(2)>button'
    ) as HTMLButtonElement
  }

  return document.querySelector('main form>div>div>button') as HTMLButtonElement
}

export const getThreadElement = () => {
  return (document.querySelector(
    "[class*='react-scroll-to-bottom']>[class*='react-scroll-to-bottom']>div"
  ) ?? document.querySelector('main .overflow-y-auto')) as HTMLElement
}

export const getChatElements = () => {
  return document.querySelectorAll('main div.w-full.border-b')
}

const isAboveMdBreakpoint = () => {
  // the chatgpt websit md breakpoint is 640
  return document.body.clientWidth > 640
}
