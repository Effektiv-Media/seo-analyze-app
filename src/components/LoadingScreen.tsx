import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import emLogo from '../assets/emLogo.png'

interface LoadingScreenProps {
  websiteUrl: string
  error?: string | null
  onRetry?: () => void
  onBack?: () => void
}

export default function LoadingScreen({ websiteUrl, error, onRetry, onBack }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedSteps, setCheckedSteps] = useState<number[]>([])

  const loadingSteps = [
    "Ansluter till webbplatsen",
    "Laddar ned HTML-struktur", 
    "Analyserar sidprestanda",
    "Kontrollerar SEO-metadata",
    "Validerar tillgänglighet",
    "Mäter laddningstider",
    "Scannar säkerhetsaspekter",
    "Utvärderar mobilanpassning",
    "Granskar teknisk SEO",
    "Kontrollerar intern länkstruktur",
    "Analyserar bildoptimering",
    "Testar användarupplevelse",
    "Validerar Core Web Vitals",
    "Kontrollerar responsiv design",
    "Genomför djupanalys",
    "Genererar AI-rekommendationer",
    "Sammanställer rapport",
    "Slutför analys"
  ]

  useEffect(() => {
    if (!error) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const newStep = prev + 1
          if (newStep <= loadingSteps.length) {
            // Mark previous step as checked after a short delay
            setTimeout(() => {
              setCheckedSteps(checked => [...checked, prev])
            }, 200)
            return newStep
          }
          return prev
        })
      }, 2000) // Slower timing for smoother feel

      return () => clearInterval(interval)
    }
  }, [error, loadingSteps.length])

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4 md:py-6 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src={emLogo} 
              alt="Effektiv Media" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
            />
            <span className="text-lg md:text-xl font-bold">Effektiv Media</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-lg w-full text-center">
          {!error ? (
            // Upward-scrolling checklist animation
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                Analyserar din webbplats
              </h2>
              
              <p className="text-gray-300 mb-8 text-sm md:text-base">
                Vi genomför en omfattande analys av <span className="font-semibold text-blue-400">{websiteUrl}</span>
              </p>

              {/* Scrolling checklist container */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Natural gradient mask overlay */}
                
                
                {/* Scrolling container */}
                <div className="h-48 overflow-hidden relative">
                  <motion.div
                    className="space-y-3 py-6"
                    animate={{ 
                      y: currentStep * -60 // Slightly more spacing for smoother movement
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for smooth easing
                    }}
                  >
                    {loadingSteps.map((step, index) => {
                      // Calculate distance from current step for fade effect
                      const distanceFromCurrent = Math.abs(index - currentStep)
                      const opacity = distanceFromCurrent === 0 ? 1 : 
                                    distanceFromCurrent === 1 ? 0.7 : 
                                    distanceFromCurrent === 2 ? 0.4 : 
                                    distanceFromCurrent === 3 ? 0.2 : 0.1
                      
                      return (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 py-3 px-4 rounded-lg"
                          style={{ height: '52px' }}
                          initial={{ opacity: 0.6, scale: 0.98 }}
                          animate={{ 
                            opacity: checkedSteps.includes(index) ? 0.8 : opacity,
                            scale: index === currentStep ? 1.02 : 1,
                            x: index === currentStep ? 4 : 0
                          }}
                          transition={{ 
                            duration: 0.6,
                            ease: "easeOut"
                          }}
                        >
                        {/* Animated checkmark */}
                        <div className="relative w-6 h-6 shrink-0">
                          {checkedSteps.includes(index) ? (
                            <motion.div
                              initial={{ scale: 0, opacity: 0, rotate: -180 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ 
                                duration: 0.5,
                                ease: [0.68, -0.55, 0.265, 1.55] // Bouncy spring easing
                              }}
                              className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
                            >
                              <CheckCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          ) : index === currentStep ? (
                            <motion.div
                              className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full shadow-lg shadow-blue-400/30"
                              animate={{ rotate: 360 }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "linear" 
                              }}
                            />
                          ) : (
                            <motion.div 
                              className="w-6 h-6 border-2 border-gray-600 rounded-full"
                              animate={{ 
                                opacity: index < currentStep ? 0.3 : 0.6 
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                        
                        {/* Step text */}
                        <motion.span 
                          className={`text-sm md:text-base font-medium transition-all duration-500 ${
                            checkedSteps.includes(index) 
                              ? 'text-emerald-400 font-semibold' 
                              : index === currentStep 
                              ? 'text-blue-400 font-semibold' 
                              : 'text-gray-500 font-normal'
                          }`}
                          animate={{
                            opacity: checkedSteps.includes(index) ? 0.9 : opacity,
                            x: index === currentStep ? 2 : 0,
                            filter: `blur(${distanceFromCurrent > 2 ? (distanceFromCurrent - 2) * 0.5 : 0}px)`
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut"
                          }}
                        >
                          {step}...
                        </motion.span>
                      </motion.div>
                    )
                    })}
                  </motion.div>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-8 space-y-4">
                <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-linear-to-r from-blue-500 via-purple-500 to-emerald-500 h-3 rounded-full shadow-lg"
                    animate={{ 
                      width: `${(currentStep / loadingSteps.length) * 100}%` 
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
                </div>
                <motion.p 
                  className="text-xs md:text-sm text-gray-400 text-center"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Steg {Math.min(currentStep + 1, loadingSteps.length)} av {loadingSteps.length}
                </motion.p>
              </div>
            </motion.div>
          ) : (
            // Error state
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-red-400">
                Något gick fel
              </h2>
              
              <p className="text-gray-300 mb-6 md:mb-8 text-center text-sm md:text-base max-w-md">
                {error}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {onRetry && (
                  <motion.button
                    onClick={onRetry}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Försök igen</span>
                  </motion.button>
                )}
                
                {onBack && (
                  <motion.button
                    onClick={onBack}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Tillbaka</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}