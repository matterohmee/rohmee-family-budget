import { InsightsEngine } from '../insights/engine.js'

export function renderInsights(state, currentMonth) {
  const container = document.getElementById('insightsPanel')
  if (!container) return

  const engine = new InsightsEngine(state)
  const insights = engine.generateInsights(currentMonth)
  const recommendations = engine.generateRecommendations(currentMonth)

  container.innerHTML = ''

  // Insights section
  if (insights.length > 0) {
    const insightsSection = document.createElement('div')
    insightsSection.className = 'insights-section'
    insightsSection.innerHTML = `
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `
    container.appendChild(insightsSection)

    const grid = document.getElementById('insightsGrid')
    insights.forEach((insight, index) => {
      const card = createInsightCard(insight, index)
      grid.appendChild(card)
    })
  }

  // Recommendations section
  if (recommendations.length > 0) {
    const recommendationsSection = document.createElement('div')
    recommendationsSection.className = 'insights-section'
    recommendationsSection.innerHTML = `
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `
    container.appendChild(recommendationsSection)

    const list = document.getElementById('recommendationsList')
    recommendations.forEach((rec, index) => {
      const card = createRecommendationCard(rec, index)
      list.appendChild(card)
    })
  }

  // Add animations
  requestAnimationFrame(() => {
    const cards = container.querySelectorAll('.insight-card, .recommendation-card')
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  })
}

function createInsightCard(insight, index) {
  const card = document.createElement('div')
  card.className = `insight-card insight-${insight.type} insight-${insight.impact}`
  card.style.opacity = '0'
  card.style.transform = 'translateY(20px)'
  card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'

  const typeColors = {
    positive: 'var(--accent-success)',
    warning: 'var(--accent-warning)',
    neutral: 'var(--accent-secondary)',
    info: 'var(--accent-primary)'
  }

  const impactBadges = {
    high: { text: 'High Impact', color: 'var(--accent-danger)' },
    medium: { text: 'Medium Impact', color: 'var(--accent-warning)' },
    low: { text: 'Low Impact', color: 'var(--text-muted)' },
    positive: { text: 'Positive', color: 'var(--accent-success)' }
  }

  const badge = impactBadges[insight.impact] || { text: '', color: 'var(--text-muted)' }

  card.innerHTML = `
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${insight.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${insight.title}</h4>
        ${badge.text ? `<span class="insight-badge" style="color: ${badge.color}">${badge.text}</span>` : ''}
      </div>
    </div>
    <p class="insight-message">${insight.message}</p>
    ${insight.recommendation ? `
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${insight.recommendation}</p>
      </div>
    ` : ''}
  `

  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)'
    card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)'
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)'
    card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
  })

  return card
}

function createRecommendationCard(recommendation, index) {
  const card = document.createElement('div')
  card.className = `recommendation-card recommendation-${recommendation.priority}`
  card.style.opacity = '0'
  card.style.transform = 'translateY(20px)'
  card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'

  const priorityColors = {
    high: 'var(--accent-danger)',
    medium: 'var(--accent-warning)',
    low: 'var(--accent-secondary)'
  }

  card.innerHTML = `
    <div class="recommendation-header">
      <span class="recommendation-icon">${recommendation.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${recommendation.title}</h4>
        <span class="recommendation-priority" style="color: ${priorityColors[recommendation.priority]}">
          ${recommendation.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${recommendation.message}</p>
  `

  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateX(8px)'
    card.style.borderLeftColor = priorityColors[recommendation.priority]
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateX(0)'
    card.style.borderLeftColor = 'var(--panel-border)'
  })

  return card
}

// Add CSS styles for insights
export function addInsightsStyles() {
  const style = document.createElement('style')
  style.textContent = `
    .insights-section {
      margin-bottom: var(--gap-lg);
    }

    .insights-title {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--gap);
      padding-bottom: var(--gap-sm);
      border-bottom: 2px solid var(--panel-border);
    }

    .insights-icon {
      font-size: 1.5rem;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--gap);
    }

    .insight-card {
      background: rgba(10, 18, 36, 0.8);
      backdrop-filter: blur(15px);
      border: 1px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      box-shadow: var(--shadow-md);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .insight-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-primary);
      opacity: 0.7;
    }

    .insight-card.insight-positive::before {
      background: var(--gradient-success);
    }

    .insight-card.insight-warning::before {
      background: var(--gradient-warning);
    }

    .insight-header {
      display: flex;
      align-items: flex-start;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .insight-icon-wrapper {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: rgba(59, 130, 246, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .insight-emoji {
      font-size: 1.25rem;
    }

    .insight-meta {
      flex: 1;
    }

    .insight-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .insight-badge {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .insight-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 var(--gap-sm) 0;
    }

    .insight-recommendation {
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: var(--radius-sm);
      padding: var(--pad-sm);
      margin-top: var(--gap-sm);
    }

    .recommendation-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-primary);
      display: block;
      margin-bottom: 4px;
    }

    .insight-recommendation p {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .recommendations-list {
      display: flex;
      flex-direction: column;
      gap: var(--gap-sm);
    }

    .recommendation-card {
      background: rgba(10, 18, 36, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid var(--panel-border);
      border-left: 4px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      transition: all var(--transition-normal);
      cursor: pointer;
    }

    .recommendation-header {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .recommendation-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .recommendation-content {
      flex: 1;
    }

    .recommendation-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .recommendation-priority {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .recommendation-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 768px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
      
      .insight-card {
        padding: var(--pad-sm);
      }
      
      .insights-title {
        font-size: 1.125rem;
      }
    }
  `
  document.head.appendChild(style)
}

