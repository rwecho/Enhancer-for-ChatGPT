export const isDark = () => {
  const htmlClassName = document.documentElement.className
  return htmlClassName && htmlClassName.includes('dark')
}
