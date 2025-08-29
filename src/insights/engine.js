import { monthTotals, real } from '../state/calc.js'

export class InsightsEngine {
  constructor(state) {
    this.state = state
  }

  // Analyze spending patterns and generate insights
  generateInsights(currentMonth) {
    const insights = []
    
    // Get recent months data
    const recentMonths = this.getRecentMonths(currentMonth, 6)
    if (recentMonths.length < 3) return insights

    // Spending trend analysis
    const trendInsight = this.analyzeTrend(recentMonths)
    if (trendInsight) insights.push(trendInsight)

    // Budget variance analysis
    const varianceInsight = this.analyzeBudgetVariance(recentMonths)
    if (varianceInsight) insights.push(varianceInsight)

    // Category spending analysis
    const categoryInsights = this.analyzeCategorySpending(recentMonths)
    insights.push(...categoryInsights)

    // Savings rate analysis
    const savingsInsight = this.analyzeSavingsRate(recentMonths)
    if (savingsInsight) insights.push(savingsInsight)

    // Seasonal patterns
    const seasonalInsight = this.analyzeSeasonalPatterns(currentMonth)
    if (seasonalInsight) insights.push(seasonalInsight)

    return insights.slice(0, 8) // Limit to top 8 insights
  }

  getRecentMonths(currentMonth, count) {
    const currentYear = parseInt(currentMonth.slice(0, 4))
    const currentMonthNum = parseInt(currentMonth.slice(5, 7))
    const months = []

    for (let i = 0; i < count; i++) {
      let month = currentMonthNum - i
      let year = currentYear

      if (month <= 0) {
        month += 12
        year -= 1
      }

      const monthKey = `${year}-${month.toString().padStart(2, '0')}`
      if (this.state.months[monthKey]) {
        months.unshift({
          key: monthKey,
          data: monthTotals(this.state, monthKey),
          income: this.state.months[monthKey].income || 0
        })
      }
    }

    return months
  }

  analyzeTrend(months) {
    if (months.length < 3) return null

    const spendingTrend = this.calculateTrend(months.map(m => m.data.aTotal))
    const avgSpending = months.reduce((sum, m) => sum + m.data.aTotal, 0) / months.length

    if (Math.abs(spendingTrend) < avgSpending * 0.02) {
      return {
        type: 'neutral',
        category: 'trend',
        title: 'Stable Spending Pattern',
        message: 'Your spending has been consistent over the past few months.',
        impact: 'low',
        icon: '📊'
      }
    }

    if (spendingTrend > 0) {
      const increase = (spendingTrend / avgSpending) * 100
      return {
        type: 'warning',
        category: 'trend',
        title: 'Increasing Spending Trend',
        message: `Your spending has increased by ${increase.toFixed(1)}% on average per month. Consider reviewing your budget.`,
        impact: increase > 5 ? 'high' : 'medium',
        icon: '📈',
        recommendation: 'Review recent expenses and identify areas where you can cut back.'
      }
    } else {
      const decrease = Math.abs((spendingTrend / avgSpending) * 100)
      return {
        type: 'positive',
        category: 'trend',
        title: 'Decreasing Spending Trend',
        message: `Great job! Your spending has decreased by ${decrease.toFixed(1)}% on average per month.`,
        impact: 'positive',
        icon: '📉',
        recommendation: 'Keep up the good work! Consider allocating the savings to your emergency fund or investments.'
      }
    }
  }

  analyzeBudgetVariance(months) {
    const latestMonth = months[months.length - 1]
    const variance = latestMonth.data.aTotal - latestMonth.data.bTotal
    const variancePct = (variance / latestMonth.data.bTotal) * 100

    if (Math.abs(variancePct) < 5) {
      return {
        type: 'positive',
        category: 'budget',
        title: 'On-Track Budget Performance',
        message: `You're within ${Math.abs(variancePct).toFixed(1)}% of your budget this month.`,
        impact: 'positive',
        icon: '🎯'
      }
    }

    if (variance > 0) {
      return {
        type: 'warning',
        category: 'budget',
        title: 'Over Budget',
        message: `You've exceeded your budget by ${this.fmt(variance)} SEK (${variancePct.toFixed(1)}%).`,
        impact: variancePct > 15 ? 'high' : 'medium',
        icon: '⚠️',
        recommendation: 'Review your largest expense categories and look for areas to reduce spending.'
      }
    } else {
      return {
        type: 'positive',
        category: 'budget',
        title: 'Under Budget',
        message: `You're under budget by ${this.fmt(Math.abs(variance))} SEK (${Math.abs(variancePct).toFixed(1)}%).`,
        impact: 'positive',
        icon: '💰',
        recommendation: 'Consider moving this surplus to savings or investments.'
      }
    }
  }

  analyzeCategorySpending(months) {
    const insights = []
    const latestMonth = months[months.length - 1]
    
    // Find categories with significant changes
    if (months.length >= 2) {
      const previousMonth = months[months.length - 2]
      
      Object.keys(latestMonth.data.aParents).forEach(category => {
        const current = latestMonth.data.aParents[category] || 0
        const previous = previousMonth.data.aParents[category] || 0
        
        if (previous > 0) {
          const change = ((current - previous) / previous) * 100
          
          if (Math.abs(change) > 20 && Math.abs(current - previous) > 1000) {
            const icon = this.getCategoryIcon(category)
            
            if (change > 0) {
              insights.push({
                type: 'warning',
                category: 'spending',
                title: `${category} Spending Increased`,
                message: `${category} spending increased by ${change.toFixed(1)}% (${this.fmt(current - previous)} SEK).`,
                impact: change > 50 ? 'high' : 'medium',
                icon: icon,
                recommendation: `Review your ${category.toLowerCase()} expenses and look for ways to optimize.`
              })
            } else {
              insights.push({
                type: 'positive',
                category: 'spending',
                title: `${category} Spending Decreased`,
                message: `Great! ${category} spending decreased by ${Math.abs(change).toFixed(1)}% (${this.fmt(Math.abs(current - previous))} SEK).`,
                impact: 'positive',
                icon: icon
              })
            }
          }
        }
      })
    }

    return insights.slice(0, 3) // Limit category insights
  }

  analyzeSavingsRate(months) {
    const latestMonth = months[months.length - 1]
    const savingsRate = latestMonth.income > 0 ? 
      ((latestMonth.income - latestMonth.data.aTotal + (latestMonth.data.aSavings || 0)) / latestMonth.income) * 100 : 0

    if (savingsRate < 10) {
      return {
        type: 'warning',
        category: 'savings',
        title: 'Low Savings Rate',
        message: `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20%.`,
        impact: 'high',
        icon: '💸',
        recommendation: 'Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.'
      }
    } else if (savingsRate >= 20) {
      return {
        type: 'positive',
        category: 'savings',
        title: 'Excellent Savings Rate',
        message: `Outstanding! Your savings rate of ${savingsRate.toFixed(1)}% exceeds the recommended 20%.`,
        impact: 'positive',
        icon: '🌟'
      }
    } else {
      return {
        type: 'neutral',
        category: 'savings',
        title: 'Good Savings Rate',
        message: `Your savings rate of ${savingsRate.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,
        impact: 'medium',
        icon: '💪',
        recommendation: 'Look for small areas to cut expenses and boost your savings rate.'
      }
    }
  }

  analyzeSeasonalPatterns(currentMonth) {
    const month = parseInt(currentMonth.slice(5, 7))
    
    // Holiday season spending reminder
    if (month === 11 || month === 12) {
      return {
        type: 'info',
        category: 'seasonal',
        title: 'Holiday Season Alert',
        message: 'Holiday spending typically increases in November and December.',
        impact: 'medium',
        icon: '🎄',
        recommendation: 'Set a holiday budget and track gift expenses to avoid overspending.'
      }
    }

    // Summer vacation season
    if (month >= 6 && month <= 8) {
      return {
        type: 'info',
        category: 'seasonal',
        title: 'Summer Season',
        message: 'Summer months often see increased travel and entertainment expenses.',
        impact: 'medium',
        icon: '☀️',
        recommendation: 'Budget for vacation and summer activities to maintain your savings goals.'
      }
    }

    return null
  }

  calculateTrend(values) {
    const n = values.length
    const sumX = (n * (n - 1)) / 2
    const sumY = values.reduce((sum, val) => sum + val, 0)
    const sumXY = values.reduce((sum, val, i) => sum + i * val, 0)
    const sumX2 = values.reduce((sum, _, i) => sum + i * i, 0)

    return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  }

  getCategoryIcon(category) {
    const icons = {
      'Housing': '🏠',
      'Kids': '🧒',
      'Transport': '🚗',
      'Groceries & Dining': '🛒',
      'Insurance': '🛡️',
      'Health': '🏥',
      'Investments': '💼',
      'Lifestyle': '🎉'
    }
    return icons[category] || '📊'
  }

  fmt(n) {
    return Math.round(n).toLocaleString('sv-SE')
  }

  // Generate budget recommendations
  generateRecommendations(currentMonth) {
    const recommendations = []
    const recentMonths = this.getRecentMonths(currentMonth, 3)
    
    if (recentMonths.length === 0) return recommendations

    const latestMonth = recentMonths[recentMonths.length - 1]
    const avgSpending = recentMonths.reduce((sum, m) => sum + m.data.aTotal, 0) / recentMonths.length

    // Emergency fund recommendation
    const monthlyExpenses = avgSpending
    const emergencyFund = monthlyExpenses * 6
    recommendations.push({
      type: 'goal',
      title: 'Emergency Fund Target',
      message: `Build an emergency fund of ${this.fmt(emergencyFund)} SEK (6 months of expenses).`,
      priority: 'high',
      icon: '🛡️'
    })

    // Investment recommendation based on savings rate
    const savingsRate = latestMonth.income > 0 ? 
      ((latestMonth.income - latestMonth.data.aTotal + (latestMonth.data.aSavings || 0)) / latestMonth.income) * 100 : 0
    
    if (savingsRate > 15) {
      const investmentAmount = (latestMonth.income - latestMonth.data.aTotal + (latestMonth.data.aSavings || 0)) * 0.7
      recommendations.push({
        type: 'investment',
        title: 'Investment Opportunity',
        message: `Consider investing ${this.fmt(investmentAmount)} SEK monthly in index funds or ETFs.`,
        priority: 'medium',
        icon: '📈'
      })
    }

    return recommendations
  }
}

