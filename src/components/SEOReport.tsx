import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3, 
  Shield,
  Phone,
  Mail,
  Zap,
  Users,
  Search,
  Globe,
  Monitor,
  Smartphone,
  Clock,
  Database,
  Wifi,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react'
import type { AnalysisData, UserData } from '../App'

interface SEOReportProps {
  analysisData: AnalysisData
  userData: UserData
  onStartOver: () => void
  isAiLoading?: boolean
}

const MetricCard = ({ 
  score, 
  label, 
  icon: Icon, 
  description,
  trend = null 
}: { 
  score: number; 
  label: string; 
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  trend?: string | null;
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-500 to-emerald-400'
    if (score >= 70) return 'from-yellow-500 to-yellow-400'
    return 'from-red-500 to-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500/10 border-emerald-500/20'
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20'
    return 'bg-red-500/10 border-red-500/20'
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border p-4 ${getScoreBg(score)} backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${getScoreColor(score)} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold text-sm truncate">{label}</h4>
            <p className="text-gray-400 text-xs truncate">{description}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-white">{score}</div>
          {trend && <div className="text-xs text-gray-400">{trend}</div>}
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-linear-to-r ${getScoreColor(score)} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

const TechMetric = ({ label, value, unit, icon: Icon }: {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 backdrop-blur-sm">
    <div className="flex items-center space-x-2">
      <Icon className="w-4 h-4 text-blue-400 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-gray-400 text-xs truncate">{label}</p>
        <p className="text-white font-semibold text-sm">
          {value} {unit && <span className="text-gray-400 text-xs">{unit}</span>}
        </p>
      </div>
    </div>
  </div>
)

export default function SEOReport({ analysisData, userData, onStartOver, isAiLoading = false }: SEOReportProps) {
  const overallScore = Math.round(
    (analysisData.performance + analysisData.accessibility + analysisData.bestPractices + analysisData.seo) / 4
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <motion.header
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm md:text-lg">EM</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg md:text-2xl font-bold text-white">SEO-Analysrapport</h1>
                  <p className="text-gray-400 text-xs md:text-sm truncate">{analysisData.url}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={onStartOver}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-700 px-3 py-2 rounded-lg text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Ny Analys</span>
                </button>
               
              </div>
            </div>
          </div>
        </motion.header>

        {/* Welcome Section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-linear-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-2">Hej {userData.name}! 👋</h2>
                <p className="text-gray-300 text-sm md:text-base">Här är din omfattande webbplatsanalys och prestandarapport</p>
              </div>
              <div className="text-center md:text-right">
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 mb-2 relative overflow-hidden">
                  <div className="absolute inset-2 rounded-full border-4 border-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{overallScore}</div>
                    <div className="text-xs text-blue-100">av 100</div>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-400">Övergripande Poäng</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Metrics */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-400" />
            Core Web Vitals & Prestanda
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <MetricCard
              score={analysisData.performance}
              label="Prestanda"
              icon={Zap}
              description="Hastighet & optimering"
              trend="+5% denna månad"
            />
            <MetricCard
              score={analysisData.accessibility}
              label="Tillgänglighet"
              icon={Users}
              description="Användarupplevelse"
              trend="Stabil"
            />
            <MetricCard
              score={analysisData.bestPractices}
              label="Bästa Praxis"
              icon={Shield}
              description="Säkerhet & standarder"
              trend="+12% förbättring"
            />
            <MetricCard
              score={analysisData.seo}
              label="SEO-Poäng"
              icon={Search}
              description="Sökoptimering"
              trend="+8% tillväxt"
            />
          </div>
        </motion.section>

        {/* Technical Details */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
            <Monitor className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-400" />
            Tekniska Mätvärden
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <TechMetric label="Laddningstid" value="2.3" unit="sek" icon={Clock} />
            <TechMetric label="Sidstorlek" value="1.2" unit="MB" icon={Database} />
            <TechMetric label="Förfrågningar" value="45" icon={Wifi} />
            <TechMetric label="Mobil Poäng" value="89" icon={Smartphone} />
            <TechMetric label="Desktop" value="94" icon={Monitor} />
            <TechMetric label="Avvisningsfrekvens" value="34%" icon={TrendingUp} />
          </div>
        </motion.section>

        {/* AI Analysis Section */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="bg-linear-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm relative overflow-hidden">
            {/* Simple skeleton loading overlay */}
            {(isAiLoading || !analysisData.isAiAnalysisComplete) && (
              <motion.div
                className="absolute inset-0 bg-slate-900 rounded-2xl flex flex-col p-4 md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Skeleton header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-400/20 rounded-full animate-pulse" />
                    <div className="h-5 w-32 bg-purple-400/20 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-purple-400/20 rounded-full animate-pulse" />
                </div>
                
                {/* Skeleton content grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-purple-400/30 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-purple-400/30 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-purple-400/20 rounded animate-pulse" />
                      <div className="h-3 w-3/4 bg-purple-400/20 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-purple-400/20 rounded animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 bg-blue-400/30 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-blue-400/30 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-blue-400/20 rounded animate-pulse" />
                      <div className="h-3 w-5/6 bg-blue-400/20 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-blue-400/20 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Skeleton summary */}
                <div className="bg-slate-800/30 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-emerald-400/30 rounded animate-pulse" />
                    <div className="h-4 w-28 bg-emerald-400/30 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-400/20 rounded animate-pulse" />
                    <div className="h-3 w-4/5 bg-slate-400/20 rounded animate-pulse" />
                  </div>
                </div>
                
                {/* Loading text */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-purple-300 text-sm">AI analyserar...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 md:w-6 md:h-6 mr-3 text-purple-400" />
              AI-Driven Insikter
              <span className="ml-auto bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                {isAiLoading || !analysisData.isAiAnalysisComplete ? 'Laddar...' : 'Powered by AI'}
              </span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-purple-400" />
                  AI Rekommendationer
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Baserat på din webbplats prestanda har vår AI identifierat {analysisData.suggestions.length} konkreta förbättringsområden. 
                  Dessa rekommendationer är prioriterade efter potential impact på din SEO-ranking.
                </p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-blue-400" />
                  Prestanda Analys
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Din webbplats presterar {overallScore >= 80 ? 'utmärkt' : overallScore >= 60 ? 'bra' : 'under genomsnitt'} 
                  jämfört med branschstandard. Fokusera på {analysisData.performance < 70 ? 'hastighetsoptimering' : 'SEO-förbättringar'} 
                  för bästa resultat.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-600 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <Search className="w-4 h-4 mr-2 text-emerald-400" />
                AI Sammanfattning
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Din webbplats har en övergripande poäng på <span className="text-white font-semibold">{overallScore}/100</span>. 
                {overallScore >= 90 ? ' Utmärkt arbete! Din webbplats presterar mycket bra.' : 
                 overallScore >= 70 ? ' Bra grund, men det finns rum för förbättringar.' : 
                 ' Det finns betydande förbättringsmöjligheter.'} 
                Genom att implementera våra AI-genererade rekommendationer kan du potentiellt öka din poäng med 15-25 poäng.
              </p>
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Optimization Suggestions */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-4 md:p-6 backdrop-blur-sm h-full relative overflow-hidden">
              {/* Simple skeleton loading overlay */}
              {(isAiLoading || !analysisData.isAiAnalysisComplete) && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-2xl flex flex-col p-4 md:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Skeleton header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-emerald-400/20 rounded-full animate-pulse" />
                      <div className="h-4 w-36 bg-emerald-400/20 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-8 bg-emerald-400/20 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Skeleton suggestion items */}
                  <div className="space-y-3 flex-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                        <div className="w-3 h-3 bg-emerald-400/30 rounded-full animate-pulse shrink-0 mt-1" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-full bg-emerald-400/20 rounded animate-pulse" />
                          <div className="h-3 w-3/4 bg-emerald-400/20 rounded animate-pulse" />
                          {i % 2 === 0 && <div className="h-3 w-1/2 bg-emerald-400/20 rounded animate-pulse" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Loading text */}
                  <div className="flex items-center justify-center mt-4">
                    <motion.div
                      className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-emerald-300 text-sm">Genererar AI-förslag...</span>
                  </div>
                </motion.div>
              )}
              
              <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center">
                <Target className="w-4 h-4 md:w-5 md:h-5 mr-3 text-emerald-400" />
                Optimeringsmöjligheter
                <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                  {analysisData.suggestions.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-64 md:max-h-80 overflow-y-auto custom-scrollbar">
                {analysisData.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-2 p-2 md:p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-200 text-xs md:text-sm leading-relaxed block wrap-break-word overflow-wrap-anywhere">{suggestion}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Critical Issues */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-4 md:p-6 backdrop-blur-sm h-full relative overflow-hidden">
              {/* Simple skeleton loading overlay */}
              {(isAiLoading || !analysisData.isAiAnalysisComplete) && (
                <motion.div
                  className="absolute inset-0 bg-slate-900 rounded-2xl flex flex-col p-4 md:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Skeleton header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-amber-400/20 rounded-full animate-pulse" />
                      <div className="h-4 w-28 bg-amber-400/20 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-8 bg-amber-400/20 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Skeleton issue items */}
                  <div className="space-y-3 flex-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                        <div className="w-3 h-3 bg-amber-400/30 rounded-full animate-pulse shrink-0 mt-1" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-full bg-amber-400/20 rounded animate-pulse" />
                          <div className="h-3 w-4/5 bg-amber-400/20 rounded animate-pulse" />
                          {i === 0 && <div className="h-3 w-2/3 bg-amber-400/20 rounded animate-pulse" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Loading text */}
                  <div className="flex items-center justify-center mt-4">
                    <motion.div
                      className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-amber-300 text-sm">Analyserar problem...</span>
                  </div>
                </motion.div>
              )}
              
              <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 mr-3 text-amber-400" />
                Kritiska Problem
                <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                  {analysisData.issues.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-64 md:max-h-80 overflow-y-auto custom-scrollbar">
                {analysisData.issues.map((issue, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-2 p-2 md:p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg hover:bg-amber-500/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-amber-400 shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-200 text-xs md:text-sm leading-relaxed block wrap-break-word overflow-wrap-anywhere">{issue}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Action Items & CTA */}
        <motion.section
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-slate-600 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Redo att Optimera?</h3>
              <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
                Låt Effektiv Media implementera dessa förbättringar och öka din webbplats prestanda
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="text-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-slate-600/50 transition-colors">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                </div>
                <h4 className="font-semibold mb-2 text-sm md:text-lg text-white">SEO-Optimering</h4>
                <p className="text-gray-400 text-xs md:text-sm">Avancerade sökmotoroptimerings strategier</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-slate-600/50 transition-colors">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2 text-sm md:text-lg text-white">Webbutveckling</h4>
                <p className="text-gray-400 text-xs md:text-sm">Moderna, snabba och responsiva webbplatser</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-700/50 border border-slate-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-slate-600/50 transition-colors">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                </div>
                <h4 className="font-semibold mb-2 text-sm md:text-lg text-white">Prestanda</h4>
                <p className="text-gray-400 text-xs md:text-sm">Blixtsnabb laddning och optimering</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href={`tel:0101822590`}
                className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>Ring Nu</span>
              </a>
              <a
                href={`mailto:hej@effektivmedia.nu`}
                className="border-2 border-slate-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all duration-300 text-sm md:text-base"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>Skicka E-post</span>
              </a>
              <a
                href="https://effektivmedia.nu"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-slate-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all duration-300 text-sm md:text-base"
              >
                <Globe className="w-4 h-4 md:w-5 md:h-5" />
                <span>Besök Webbplats</span>
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
