import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, Globe, Sparkles } from 'lucide-react'
import emLogo from '../assets/emLogo.png'

interface UrlInputScreenProps {
  onUrlSubmit: (url: string) => void
  onBack: () => void
}

export default function UrlInputScreen({ onUrlSubmit, onBack }: UrlInputScreenProps) {
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

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4 md:py-6 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Tillbaka</span>
          </button>
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src={emLogo} 
              alt="Effektiv Media" 
              className="w-6 h-6 md:w-8 md:h-8 rounded-lg object-contain"
            />
            <span className="text-base md:text-lg font-bold">Effektiv Media</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center w-full">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-1 md:space-x-2 mb-4 md:mb-6 lg:mb-8"
          >
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">1</div>
              <span className="text-blue-400 font-medium text-sm md:text-base">Ange webbplats</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs md:text-sm">2</div>
              <span className="text-gray-500 text-sm md:text-base">Analys</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs md:text-sm">3</div>
              <span className="text-gray-500 text-sm md:text-base">Rapport</span>
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 md:mb-6 lg:mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mb-3 md:mb-4 lg:mb-6 relative">
              <Globe className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
              <motion.div
                className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-900" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">
              Vilken webbplats vill du
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                analysera?
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 lg:mb-10 max-w-lg mx-auto">
              Ange din webbplats så gör vi en omfattande SEO-analys på bara några sekunder
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="exempel.se eller www.exempel.se"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-base md:text-lg bg-white/5 border-2 ${
                  !isValidUrl ? 'border-red-500' : 'border-white/10'
                } rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder-gray-400 text-white backdrop-blur-sm`}
              />
              {!isValidUrl && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 text-left"
                >
                  Ange en giltig webbplats-URL
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 md:space-x-3 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-base md:text-lg">Starta analys</span>
            </motion.button>
          </motion.form>

          {/* Features */}
          <motion.div
            className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl mb-1 md:mb-2">⚡</div>
              <span className="text-xs md:text-sm text-gray-400">Snabb analys</span>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl mb-1 md:mb-2">🔒</div>
              <span className="text-xs md:text-sm text-gray-400">100% säker</span>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl mb-1 md:mb-2">📊</div>
              <span className="text-xs md:text-sm text-gray-400">Detaljerad rapport</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}