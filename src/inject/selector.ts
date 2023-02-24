export const getTextAreaElement = () => {
  return document.querySelector(
    'main form>div>div:nth-child(2)>textarea'
  ) as HTMLTextAreaElement
}

export const getPromptContainerElement = () => {
  return document.querySelector('main form>div>div:nth-child(2)') as HTMLElement
}

export const getButtonElement = () => {
  return document.querySelector(
    'main form>div>div:nth-child(2)>button'
  ) as HTMLButtonElement
}

export const getThreadElement = () => {
  return (document.querySelector(
    "[class*='react-scroll-to-bottom']>[class*='react-scroll-to-bottom']>div"
  ) ?? document.querySelector('main .overflow-y-auto')) as HTMLElement
}
