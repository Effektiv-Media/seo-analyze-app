# SEO Analyze - Effektiv Media

En modern React-applikation för SEO-analys av webbplatser. Denna landingsida är designad för att generera leads genom att erbjuda kostnadsfria SEO-rapporter.

## Funktioner

- **Responsiv landingsida** med modern design
- **URL-validering** för webbplatser
- **Animerad laddningsskärm** med steg-för-steg progress
- **Enkel kontaktformulär** för leadgenerering
- **Detaljerad SEO-rapport** med visuella metriker
- **Mobilvänlig design** med Tailwind CSS
- **Smooth animationer** med Framer Motion

## Teknisk stack

- **React 19** med TypeScript
- **Vite** för snabb utveckling
- **Tailwind CSS v4** för styling
- **Framer Motion** för animationer
- **Lucide React** för ikoner
- **Axios** för API-anrop

## Installation

```bash
npm install
npm run dev
```

## Projektstruktur

```
src/
├── components/
│   ├── LandingPage.tsx    # Startsida med URL-input
│   ├── LoadingScreen.tsx  # Animerad laddningsskärm
│   ├── ContactForm.tsx    # Formulär för användaruppgifter
│   └── SEOReport.tsx      # Detaljerad rapport
├── services/
│   └── apiService.ts      # API-integration (mock)
├── App.tsx                # Huvudkomponent med state
└── main.tsx              # Entry point

```

## Användarflöde

1. **Landingsida**: Användaren anger sin webbplats-URL
2. **Laddning**: Animerad skärm visar analysprocessen
3. **Kontaktformulär**: Användaren fyller i namn, e-post och telefon
4. **Rapport**: Detaljerad SEO-rapport med förbättringsförslag

## API-integration

### Google PageSpeed Insights

För att integrera med riktiga API:er, uppdatera `src/services/apiService.ts`:

```typescript
// Exempel för PageSpeed Insights API
const API_KEY = 'your-google-api-key'
const PAGESPEED_API = 'https://www.googleapis.com/pagespeed/v5/runPagespeed'

export const analyzeWithPageSpeed = async (url: string): Promise<LighthouseMetrics> => {
  const response = await fetch(`${PAGESPEED_API}?url=${url}&key=${API_KEY}`)
  const data = await response.json()
  
  return {
    performance: data.lighthouseResult.categories.performance.score * 100,
    accessibility: data.lighthouseResult.categories.accessibility.score * 100,
    bestPractices: data.lighthouseResult.categories['best-practices'].score * 100,
    seo: data.lighthouseResult.categories.seo.score * 100,
  }
}
```

### Deepseek AI Integration

```typescript
// Exempel för AI-driven förslag
export const getAISuggestions = async (url: string, metrics: LighthouseMetrics): Promise<string[]> => {
  const response = await fetch('https://api.deepseek.com/v1/suggestions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your-deepseek-api-key',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, metrics })
  })
  
  const data = await response.json()
  return data.suggestions
}
```

## Miljövariabler

Skapa en `.env` fil för API-nycklar:

```env
VITE_GOOGLE_PAGESPEED_API_KEY=your-google-api-key
VITE_DEEPSEEK_API_KEY=your-deepseek-api-key
```

## Lead-hantering

Kontaktformulärdata kan integreras med:
- **CRM-system** (HubSpot, Salesforce)
- **E-postmarknadsföring** (Mailchimp, SendGrid)
- **Databas** för leadlagring
- **Google Sheets** för enkel hantering

## Deployment

### Vercel (Rekommenderat)
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Ladda upp dist/ mappen till Netlify
```

## Anpassning för Instagram-annonser

- **Call-to-action**: "Få kostnadsfri SEO-analys"
- **Målgrupp**: Företagsägare, marknadsförare
- **Landningssida**: Optimerad för mobil (Instagram-trafik)
- **Leadmagnet**: Kostnadsfri SEO-rapport

## Förbättringar för produktion

1. **Analytics**: Lägg till Google Analytics/GTM
2. **A/B-testning**: Testa olika versioner av formulär
3. **Säkerhet**: Implementera rate limiting för API-anrop
4. **SEO**: Lägg till meta tags och strukturerad data
5. **Prestanda**: Implementera code splitting och lazy loading

## Support

För frågor kontakta Effektiv Media utvecklingsteam.