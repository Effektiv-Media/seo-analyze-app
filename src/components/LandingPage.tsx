import { useState } from 'react'
import { Search, BarChart3, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import emLogo from '../assets/emLogo.png'

interface LandingPageProps {
  onUrlSubmit: (url: string) => void
}

export default function LandingPage({ onUrlSubmit }: LandingPageProps) {
  const [url, setUrl] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(true)

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input.startsWith('http') ? input : `https://${input}`)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateUrl(url)) {
      setIsValidUrl(true)
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`
      onUrlSubmit(formattedUrl)
    } else {
      setIsValidUrl(false)
    }
  }

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Performance Analysis",
      description: "Get detailed insights into your website's loading speed and performance metrics"
    },
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "SEO Optimization",
      description: "Discover opportunities to improve your search engine rankings"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: "Accessibility Check",
      description: "Ensure your website is accessible to all users and meets web standards"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Best Practices",
      description: "Learn about modern web development best practices and security"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={emLogo} 
                alt="Effektiv Media" 
                className="w-10 h-10 rounded-lg object-contain"
              />
              <span className="text-2xl font-bold text-gray-900">Effektiv Media</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Få en <span className="text-blue-600">kostnadsfri</span><br />
              SEO-analys av din webbplats
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upptäck hur din webbplats presterar och få konkreta förslag på förbättringar som kan öka din synlighet i sökmotorer.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ange din webbplats (ex. exempel.se)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isValidUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {!isValidUrl && (
                  <p className="text-red-500 text-sm mt-1">Ange en giltig webbplats-URL</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Analysera min webbplats</span>
              </button>
            </div>
          </motion.form>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-500 text-sm mb-4">Använder samma verktyg som Google använder</p>
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <span className="font-semibold">Google Lighthouse</span>
              <span className="font-semibold">PageSpeed Insights</span>
              <span className="font-semibold">AI-driven analys</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}