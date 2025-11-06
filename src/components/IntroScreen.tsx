import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Search, Zap, Target } from 'lucide-react'
import logo1 from '../assets/1.png'
import logo2 from '../assets/2.png'
import logo3 from '../assets/3.png'
import logo4 from '../assets/4.png'
import emLogo from '../assets/emLogo.png'

interface IntroScreenProps {
  onGetStarted: () => void
}

export default function IntroScreen({ onGetStarted }: IntroScreenProps) {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Prestanda",
      description: "Analysera laddningstider"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Score",
      description: "Sökoptimering"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Tillgänglighet",
      description: "Webbtandarder"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Säkerhet",
      description: "Bästa praxis"
    }
  ]

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 bg-cyan-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-4 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img 
              src={emLogo} 
              alt="Effektiv Media" 
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-contain"
            />
            <span className="text-lg md:text-xl font-bold">Effektiv Media</span>
          </div>
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-xs lg:text-sm text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Hem</a>
            <a href="#" className="hover:text-white transition-colors">Om oss</a>
            <a href="#" className="hover:text-white transition-colors">Tjänster</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6"
          >
            <Search className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-gray-300">SMART SEO ANALYS</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
              Smartare genom design.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                Förenklat av AI.
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 lg:mb-10 max-w-xl lg:max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Automatisera din webbplatsanalys, prioritera det viktiga och fokusera på vad som verkligen spelar roll. 
            Här möter kraftfull AI praktiska affärslösningar.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={onGetStarted}
            className="inline-flex items-center space-x-2 md:space-x-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 mb-6 md:mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-base md:text-lg">Kom igång nu</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>

          {/* Features grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 text-center hover:bg-white/10 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-2 md:mb-3 lg:mb-4 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Bottom section */}
      <motion.div
        className="relative z-10 text-center pb-4 md:pb-6 lg:pb-8 shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4">Samarbetar med världens ledande företag</p>
        <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8 opacity-60">
          <img src={logo1} alt="Partner 1" className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain rounded" />
          <img src={logo2} alt="Partner 2" className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain rounded" />
          <img src={logo3} alt="Partner 3" className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain rounded" />
          <img src={logo4} alt="Partner 4" className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain rounded" />
        </div>
      </motion.div>
    </div>
  )
}