import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import TurndownService from 'turndown'

export const openBlobInNewTab = (blob: Blob) => {
  const blobUrl = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = blobUrl
  anchor.target = '_blank'
  anchor.click()
  anchor.remove()
}

export const exportPdf = async (element: HTMLElement) => {
  const canvas = await html2canvas(element, {})
  const imageData = canvas.toDataURL('image/png')
  const orientation = canvas.width > canvas.height ? 'l' : 'p'

  const ratio = window.devicePixelRatio
  const pdf = new jsPDF(orientation, 'pt', [
    canvas.width / ratio,
    canvas.height / ratio,
  ])

  var pdfWidth = pdf.internal.pageSize.getWidth()
  var pdfHeight = pdf.internal.pageSize.getHeight()
  pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
  const pdfPrivate = (pdf as any).__private__
  const data = pdfPrivate.getArrayBuffer(pdfPrivate.buildDocument())

  openBlobInNewTab(
    new Blob([new Uint8Array(data)], { type: 'application/pdf' })
  )
}

export const exportImage = async (element: HTMLElement) => {
  const canvas = await html2canvas(element, {})
  const imageData = canvas.toDataURL('image/png')

  const byteString = atob(imageData.split(',')[1])
  const data = new Uint8Array(new ArrayBuffer(byteString.length))
  for (let i = 0; i < byteString.length; i++) {
    data[i] = byteString.charCodeAt(i)
  }

  openBlobInNewTab(new Blob([data], { type: 'image/jpeg' }))
}

export const exportMarkdown = (elements: Array<HTMLElement>) => {
  const content = Array.from(
    elements.map((i) => {
      const j = i.cloneNode(true) as HTMLElement
      if (/dark\:bg-gray-800/.test(i.getAttribute('class') ?? '')) {
        j.innerHTML = `<blockquote>${i.innerHTML}</blockquote>`
      }
      return j.innerHTML
    })
  ).join('<hr />')

  const turndownService = new TurndownService()

  const data = turndownService.turndown(content)
  openBlobInNewTab(new Blob([data], { type: 'text/plain' }))
}
