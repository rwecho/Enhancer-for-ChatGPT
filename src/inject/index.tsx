import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Container } from './Container'
import '@/index.css'

let root: Root | null = null
let div: HTMLElement | null = null

async function render() {
  root?.unmount()

  div?.remove()
  div = document.createElement('div')
  document.body.appendChild(div)
  root = createRoot(div)
  root.render(<Container></Container>)
}

window.addEventListener('resize', render)

if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  render()
} else {
  document.addEventListener('DOMContentLoaded', render)
}
