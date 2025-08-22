// Tooltip system for all charts
export class Tooltip {
  constructor() {
    this.tooltip = null
    this.createTooltip()
  }

  createTooltip() {
    // Remove existing tooltip if any
    const existing = document.getElementById('chart-tooltip')
    if (existing) existing.remove()

    // Create tooltip element
    this.tooltip = document.createElement('div')
    this.tooltip.id = 'chart-tooltip'
    this.tooltip.style.cssText = `
      position: absolute;
      background: rgba(15, 23, 42, 0.95);
      color: #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-family: Inter, system-ui, sans-serif;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.2s ease;
      border: 1px solid #334155;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      max-width: 200px;
      white-space: nowrap;
    `
    document.body.appendChild(this.tooltip)
  }

  show(text, event) {
    if (!this.tooltip) this.createTooltip()
    
    this.tooltip.textContent = text
    this.tooltip.style.opacity = '1'
    
    // Position tooltip near mouse cursor
    const x = event.pageX + 10
    const y = event.pageY - 10
    
    // Ensure tooltip stays within viewport
    const rect = this.tooltip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    let finalX = x
    let finalY = y
    
    if (x + rect.width > viewportWidth) {
      finalX = event.pageX - rect.width - 10
    }
    
    if (y < 0) {
      finalY = event.pageY + 20
    }
    
    this.tooltip.style.left = finalX + 'px'
    this.tooltip.style.top = finalY + 'px'
  }

  hide() {
    if (this.tooltip) {
      this.tooltip.style.opacity = '0'
    }
  }
}

// Global tooltip instance
export const tooltip = new Tooltip()

// Helper function to add tooltip to SVG elements
export function addTooltip(element, text) {
  element.addEventListener('mouseenter', (e) => {
    tooltip.show(text, e)
  })
  
  element.addEventListener('mousemove', (e) => {
    tooltip.show(text, e)
  })
  
  element.addEventListener('mouseleave', () => {
    tooltip.hide()
  })
}

