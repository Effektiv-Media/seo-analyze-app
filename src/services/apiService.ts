// API service for SEO analysis
// This file contains functions to integrate with various APIs

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const PAGESPEED_API_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const DEEPSEEK_API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY
const LEADS_API_ENDPOINT = 'https://leads.effektivmedia.nu/api/leads'
const LEADS_API_KEY = import.meta.env.VITE_LEADS_API_KEY

export interface LighthouseMetrics {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export interface DetailedMetrics {
  firstContentfulPaint: string
  speedIndex: string
  largestContentfulPaint: string
  totalBlockingTime: string
  timeToInteractive: string
  cumulativeLayoutShift: string
}

export interface DeepseekAnalysisResponse {
  suggestions: string[]
  priorityIssues: string[]
  opportunities: string[]
  technicalRecommendations: string[]
  businessImpact: string
  overallAssessment: string
}

export interface LeadData {
  name: string
  email: string
  phone: string
  source?: string
  company?: string
}

export interface SEOAnalysisResult {
  url: string
  metrics: LighthouseMetrics
  detailedMetrics: DetailedMetrics
  suggestions: string[]
  issues: string[]
  timestamp: Date
  loadingExperience?: Record<string, unknown>
}

// Real Google PageSpeed Insights API integration
export const analyzeWithPageSpeed = async (url: string): Promise<{
  metrics: LighthouseMetrics
  detailedMetrics: DetailedMetrics
  rawData: Record<string, unknown>
}> => {
  try {
    const apiUrl = new URL(PAGESPEED_API_ENDPOINT)
    apiUrl.searchParams.set('url', url)
    apiUrl.searchParams.set('key', GOOGLE_API_KEY)
    // Add all categories - use append() to add multiple values
    apiUrl.searchParams.append('category', 'performance')
    apiUrl.searchParams.append('category', 'accessibility')
    apiUrl.searchParams.append('category', 'best-practices')
    apiUrl.searchParams.append('category', 'seo')
    apiUrl.searchParams.set('strategy', 'desktop')

    console.log('Fetching PageSpeed data for:', url)
    console.log('API URL:', apiUrl.toString())
    
    const response = await fetch(apiUrl.toString())
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data.lighthouseResult) {
      throw new Error('No Lighthouse results returned')
    }

    const lighthouse = data.lighthouseResult
    const categories = lighthouse.categories
    const audits = lighthouse.audits

    console.log('Available categories:', Object.keys(categories || {}))
    console.log('Category data:', categories)

    // Extract main category scores (0-1 scale, convert to 0-100)
    const metrics: LighthouseMetrics = {
      performance: Math.round((categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((categories?.['best-practices']?.score ?? 0) * 100),
      seo: Math.round((categories?.seo?.score ?? 0) * 100),
    }

    // Extract detailed timing metrics
    const detailedMetrics: DetailedMetrics = {
      firstContentfulPaint: audits['first-contentful-paint']?.displayValue || 'N/A',
      speedIndex: audits['speed-index']?.displayValue || 'N/A',
      largestContentfulPaint: audits['largest-contentful-paint']?.displayValue || 'N/A',
      totalBlockingTime: audits['total-blocking-time']?.displayValue || 'N/A',
      timeToInteractive: audits['interactive']?.displayValue || 'N/A',
      cumulativeLayoutShift: audits['cumulative-layout-shift']?.displayValue || 'N/A',
    }

    console.log('PageSpeed analysis completed:', { metrics, detailedMetrics })

    return {
      metrics,
      detailedMetrics,
      rawData: data
    }
  } catch (error) {
    console.error('PageSpeed Insights API error:', error)
    throw new Error(`Failed to analyze website: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Deepseek AI-powered SEO analysis
export const analyzeWithDeepseekAI = async (
  url: string, 
  metrics: LighthouseMetrics, 
  detailedMetrics: DetailedMetrics
): Promise<DeepseekAnalysisResponse> => {
  
  if (!DEEPSEEK_API_KEY) {
    console.log('⚠️ Deepseek API failed, using fallback analysis')
    return getFallbackAnalysis(metrics)
  }

  try {
    // Prepare data for AI analysis
    const analysisPrompt = `
Analyze this website SEO performance data and provide actionable recommendations. Respond ONLY with valid JSON in the exact format specified.

Website: ${url}
Lighthouse Scores:
- Performance: ${metrics.performance}/100
- Accessibility: ${metrics.accessibility}/100  
- Best Practices: ${metrics.bestPractices}/100
- SEO: ${metrics.seo}/100

Key Metrics:
- First Contentful Paint: ${detailedMetrics.firstContentfulPaint}
- Speed Index: ${detailedMetrics.speedIndex}
- Largest Contentful Paint: ${detailedMetrics.largestContentfulPaint}
- Total Blocking Time: ${detailedMetrics.totalBlockingTime}
- Time to Interactive: ${detailedMetrics.timeToInteractive}
- Cumulative Layout Shift: ${detailedMetrics.cumulativeLayoutShift}

Respond with JSON in this exact format (no additional text):
{
  "suggestions": ["konkret actionable suggestion 1", "suggestion 2", "suggestion 3"],
  "priorityIssues": ["högsta prioritet issue 1", "issue 2"],
  "opportunities": ["optimization opportunity 1", "opportunity 2"],
  "technicalRecommendations": ["technical rec 1", "technical rec 2"],
  "businessImpact": "short description of business impact in Swedish",
  "overallAssessment": "brief overall assessment in Swedish"
}

Keep all text in Swedish. Make suggestions specific and actionable. Limit arrays to 2-4 items each.`

    console.log('Sending data to Deepseek AI for analysis...')

    const response = await fetch(DEEPSEEK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Du är en expert på webbprestanda och SEO. Svara alltid med valid JSON enligt specificerat format. Använd svenska språket.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_tokens: 800,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from Deepseek API')
    }

    const aiResponse = JSON.parse(data.choices[0].message.content) as DeepseekAnalysisResponse
    
    // Validate response structure
    if (!aiResponse.suggestions || !Array.isArray(aiResponse.suggestions)) {
      throw new Error('Invalid AI response structure')
    }

    console.log('Deepseek AI analysis completed successfully')
    return aiResponse

  } catch (error) {
    console.error('Deepseek AI analysis failed:', error)
    console.log('Falling back to rule-based analysis')
    return getFallbackAnalysis(metrics)
  }
}

// Fallback analysis when AI is not available
const getFallbackAnalysis = (metrics: LighthouseMetrics): DeepseekAnalysisResponse => {
  const suggestions: string[] = []
  const priorityIssues: string[] = []
  const opportunities: string[] = []
  const technicalRecommendations: string[] = []

  // Performance analysis
  if (metrics.performance < 70) {
    priorityIssues.push('Kritiskt låg prestanda påverkar användarupplevelsen')
    suggestions.push('Optimera bilder och använd moderna format som WebP')
    technicalRecommendations.push('Implementera lazy loading för bilder och videos')
  } else if (metrics.performance < 85) {
    opportunities.push('Förbättra laddningstider för bättre användarupplevelse')
    suggestions.push('Minifiera och komprimera CSS/JavaScript-filer')
  }

  // SEO analysis
  if (metrics.seo < 80) {
    priorityIssues.push('SEO-brister kan minska synligheten i sökmotorer')
    suggestions.push('Lägg till meta descriptions och optimera sidtitlar')
    technicalRecommendations.push('Implementera strukturerad data (Schema.org)')
  }

  // Accessibility analysis
  if (metrics.accessibility < 85) {
    suggestions.push('Förbättra tillgänglighet med alt-text och bättre kontrast')
    technicalRecommendations.push('Använd semantiska HTML-element')
  }

  // Best practices
  if (metrics.bestPractices < 85) {
    opportunities.push('Förbättra säkerhet och moderna webbstandarder')
    technicalRecommendations.push('Implementera HTTPS och Content Security Policy')
  }

  // Default suggestions if scores are good
  if (suggestions.length === 0) {
    suggestions.push('Fortsätt optimera Core Web Vitals')
    opportunities.push('Överväg Progressive Web App funktioner')
  }

  const businessImpact = metrics.performance < 70 
    ? 'Låg prestanda kan leda till högre avhoppningsfrekvens och lägre konverteringar'
    : 'God prestanda stödjer användarengagemang och sökmotorrankning'

  const overallAssessment = calculateOverallAssessment(metrics)

  return {
    suggestions: suggestions.slice(0, 4),
    priorityIssues: priorityIssues.slice(0, 3),
    opportunities: opportunities.slice(0, 3),
    technicalRecommendations: technicalRecommendations.slice(0, 4),
    businessImpact,
    overallAssessment
  }
}

const calculateOverallAssessment = (metrics: LighthouseMetrics): string => {
  const average = (metrics.performance + metrics.accessibility + metrics.bestPractices + metrics.seo) / 4
  
  if (average >= 90) return 'Utmärkt prestanda på alla områden - fortsätt så här!'
  if (average >= 80) return 'Bra grundläggande prestanda med utrymme för förbättringar'
  if (average >= 70) return 'Godkänd prestanda men flera områden behöver uppmärksamhet'
  return 'Betydande förbättringar krävs för optimal prestanda'
}

// Generate issues based on low scores and failed audits
export const extractIssues = (metrics: LighthouseMetrics, rawData: Record<string, unknown>): string[] => {
  const issues: string[] = []
  
  // Extract failed audits from Lighthouse data
  const lighthouse = rawData.lighthouseResult as Record<string, unknown>
  const audits = lighthouse?.audits as Record<string, unknown>
  
  if (audits) {
    // Check for common critical issues
    const criticalAudits = [
      'first-contentful-paint',
      'largest-contentful-paint',
      'speed-index',
      'meta-description',
      'document-title',
      'image-alt'
    ]
    
    criticalAudits.forEach(auditKey => {
      const audit = audits[auditKey] as Record<string, unknown>
      if (audit && audit.score !== null && (audit.score as number) < 0.9) {
        if (audit.title) {
          issues.push(`${audit.title}: ${audit.description || 'Behöver förbättras'}`)
        }
      }
    })
  }
  
  // Add score-based issues
  if (metrics.performance < 50) {
    issues.push('Kritiskt låg prestanda - webbplatsen laddar mycket långsamt')
  }
  
  if (metrics.seo < 70) {
    issues.push('SEO-problem upptäckta - kan påverka synlighet i sökmotorer')
  }
  
  if (metrics.accessibility < 80) {
    issues.push('Tillgänglighetsproblem - kan hindra användare med funktionsnedsättningar')
  }
  
  return issues.slice(0, 6) // Limit to 6 most important issues
}

// Updated comprehensive website audit with Deepseek AI
export const performFullAudit = async (url: string): Promise<SEOAnalysisResult> => {
  try {
    console.log('Starting full audit for:', url)
    
    // Get metrics from PageSpeed
    const pagespeedResult = await analyzeWithPageSpeed(url)
    const { metrics, detailedMetrics, rawData } = pagespeedResult
    
    console.log('PageSpeed analysis completed, getting AI insights...')
    
    // Get AI-powered analysis from Deepseek
    const aiAnalysis = await analyzeWithDeepseekAI(url, metrics, detailedMetrics)
    
    // Extract issues from audit results
    const issues = extractIssues(metrics, rawData)
    
    // Combine AI suggestions with extracted issues
    const combinedSuggestions = [
      ...aiAnalysis.suggestions,
      ...aiAnalysis.opportunities,
      ...aiAnalysis.technicalRecommendations
    ].slice(0, 8) // Limit to 8 suggestions
    
    const combinedIssues = [
      ...aiAnalysis.priorityIssues,
      ...issues
    ].slice(0, 6) // Limit to 6 issues
    
    console.log('Full audit with AI analysis completed')
    
    return {
      url,
      metrics,
      detailedMetrics,
      suggestions: combinedSuggestions,
      issues: combinedIssues,
      timestamp: new Date(),
      loadingExperience: (rawData.loadingExperience as Record<string, unknown>) || undefined
    }
  } catch (error) {
    console.error('Full audit failed:', error)
    throw new Error(`Kunde inte analysera webbplatsen: ${error instanceof Error ? error.message : 'Okänt fel'}`)
  }
}

// New function to perform staged analysis
export const performStagedAudit = async (
  url: string, 
  onPageSpeedComplete: (initialData: SEOAnalysisResult) => void
): Promise<SEOAnalysisResult> => {
  try {
    console.log('Starting staged audit for:', url)
    
    // Stage 1: PageSpeed Insights only
    const pageSpeedResult = await analyzeWithPageSpeed(url)
    
    // Create initial result with basic suggestions/issues from PageSpeed
    const basicIssues = extractIssuesFromPageSpeed(pageSpeedResult.rawData)
    const initialResult: SEOAnalysisResult = {
      url,
      metrics: pageSpeedResult.metrics,
      detailedMetrics: pageSpeedResult.detailedMetrics,
      suggestions: [
        'Optimera bilder för snabbare laddning',
        'Använd moderna bildformat som WebP',
        'Implementera lazy loading för bilder',
        'Komprimera CSS och JavaScript'
      ], // Basic suggestions while AI loads
      issues: basicIssues.slice(0, 3), // Show some basic issues
      timestamp: new Date(),
      loadingExperience: (pageSpeedResult.rawData.loadingExperience as Record<string, unknown>) || undefined
    }
    
    // Notify that PageSpeed is complete
    onPageSpeedComplete(initialResult)
    
    // Stage 2: AI Analysis (this takes longer)
    const aiAnalysis = await analyzeWithDeepseekAI(url, pageSpeedResult.metrics, pageSpeedResult.detailedMetrics)
    
    // Extract all issues from PageSpeed data
    const allIssues = extractIssues(pageSpeedResult.metrics, pageSpeedResult.rawData)
    
    // Combine AI suggestions with extracted issues
    const combinedSuggestions = [
      ...aiAnalysis.suggestions,
      ...aiAnalysis.opportunities,
      ...aiAnalysis.technicalRecommendations
    ].slice(0, 8)
    
    const combinedIssues = [
      ...aiAnalysis.priorityIssues,
      ...allIssues
    ].slice(0, 6)
    
    // Return final result with AI analysis
    return {
      ...initialResult,
      suggestions: combinedSuggestions,
      issues: combinedIssues
    }
  } catch (error) {
    console.error('Staged audit failed:', error)
    throw new Error(`Kunde inte analysera webbplatsen: ${error instanceof Error ? error.message : 'Okänt fel'}`)
  }
}

// Helper function to extract basic issues from PageSpeed data
const extractIssuesFromPageSpeed = (rawData: Record<string, unknown>): string[] => {
  const issues: string[] = []
  
  try {
    const audits = (rawData as { audits?: Record<string, { score?: number }> })?.audits || {}
    
    // Check for common performance issues
    if (audits['largest-contentful-paint']?.score !== undefined && audits['largest-contentful-paint'].score < 0.5) {
      issues.push('Långsam Largest Contentful Paint påverkar användarupplevelsen')
    }
    
    if (audits['first-contentful-paint']?.score !== undefined && audits['first-contentful-paint'].score < 0.5) {
      issues.push('Första innehållet laddas för långsamt')
    }
    
    if (audits['speed-index']?.score !== undefined && audits['speed-index'].score < 0.5) {
      issues.push('Hastighetindex visar långsam visuell laddning')
    }
    
    if (audits['cumulative-layout-shift']?.score !== undefined && audits['cumulative-layout-shift'].score < 0.75) {
      issues.push('Layout-skift påverkar användarupplevelsen negativt')
    }
    
  } catch (error) {
    console.warn('Could not extract basic issues:', error)
  }
  
  return issues
}

// Utility function to validate URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

// Function to format URL for display
export const formatUrl = (url: string): string => {
  if (!url.startsWith('http')) {
    return `https://${url}`
  }
  return url
}

// Function to submit lead data
export const submitLead = async (leadData: LeadData): Promise<void> => {
  try {
    const payload = {
      name: leadData.name,
      email: leadData.email,
      source: leadData.source || 'SEO Analys',
      phone: leadData.phone,
      company: leadData.company || ''
    }

    console.log('Submitting lead:', payload)
    
    const response = await fetch(LEADS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LEADS_API_KEY
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to submit lead: ${response.status} ${response.statusText}`)
    }

    console.log('Lead submitted successfully')
  } catch (error) {
    console.error('Error submitting lead:', error)
    throw new Error('Kunde inte skicka dina uppgifter. Försök igen senare.')
  }
}