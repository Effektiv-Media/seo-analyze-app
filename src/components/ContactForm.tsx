import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, ArrowRight } from 'lucide-react'
import emLogo from '../assets/emLogo.png'
import type { UserData } from '../App'
import { submitLead } from '../services/apiService'

interface ContactFormProps {
  onSubmit: (data: UserData) => void
  websiteUrl: string
}

export default function ContactForm({ onSubmit, websiteUrl }: ContactFormProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Partial<UserData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Partial<UserData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Namn är obligatoriskt'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-post är obligatoriskt'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ange en giltig e-postadress'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer är obligatoriskt'
    } else if (!/^[+]?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Ange ett giltigt telefonnummer'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      setSubmitError(null)
      
      try {
        // Submit lead to API
        await submitLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'SEO Analys'
        })
        
        // Proceed to next step
        onSubmit(formData)
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Ett oväntat fel uppstod')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="h-screen bg-black text-white relative flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
        <div className="max-w-lg w-full">
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-1 md:space-x-2 mb-4 md:mb-6"
          >
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs md:text-sm">1</div>
              <span className="text-gray-500 text-sm md:text-base">Webbplats</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs md:text-sm">2</div>
              <span className="text-gray-500 text-sm md:text-base">Analys</span>
            </div>
            <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs md:text-sm font-bold">3</div>
              <span className="text-blue-400 font-medium text-sm md:text-base">Rapport</span>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Nästan klart! 🎉
            </h1>
            <p className="text-gray-300 mb-2 text-sm md:text-base">
              Vi har analyserat <span className="font-semibold text-blue-400">{websiteUrl}</span>
            </p>
            <p className="text-gray-300 text-sm md:text-base">
              Fyll i dina uppgifter för att se din kostnadsfria SEO-rapport
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Förnamn och efternamn *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ange ditt fullständiga namn"
                    className={`block w-full pl-10 pr-3 py-3 bg-white/5 border-2 ${
                      errors.name ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder-gray-400 text-white backdrop-blur-sm`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-postadress *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="din@email.se"
                    className={`block w-full pl-10 pr-3 py-3 bg-white/5 border-2 ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder-gray-400 text-white backdrop-blur-sm`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefonnummer *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="070-123 45 67"
                    className={`block w-full pl-10 pr-3 py-3 bg-white/5 border-2 ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder-gray-400 text-white backdrop-blur-sm`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                  <p className="text-red-400 text-sm">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'} text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 md:space-x-3 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span className="text-base md:text-lg">
                  {isSubmitting ? 'Skickar...' : 'Visa min SEO-rapport'}
                </span>
                {!isSubmitting && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
              </motion.button>
            </form>

            {/* Privacy Notice */}
            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
              <p className="text-xs md:text-sm text-gray-400 text-center leading-relaxed">
                Vi respekterar din integritet. Dina uppgifter används endast för att leverera rapporten och eventuell uppföljning. 
                Du kan när som helst avregistrera dig från vår kommunikation.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="mt-4 md:mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="grid grid-cols-3 gap-3 md:gap-4 text-sm text-gray-300">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">📊</div>
                <span className="text-xs md:text-sm">Detaljerad rapport</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">🚀</div>
                <span className="text-xs md:text-sm">Förbättringar</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4">
                <div className="text-xl md:text-2xl mb-1 md:mb-2">💡</div>
                <span className="text-xs md:text-sm">Expertråd</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}