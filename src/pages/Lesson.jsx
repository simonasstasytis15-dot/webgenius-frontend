import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import Week1, { WEEK1_STEPS } from './lessons/Week1'
import Week2, { WEEK2_STEPS } from './lessons/Week2'
import Week3, { WEEK3_STEPS } from './lessons/Week3'
import Week4, { WEEK4_STEPS } from './lessons/Week4'

const WEEKS = {
  1: { Component: Week1, total: WEEK1_STEPS, title: 'Kas yra AI menas?',          subtitle: 'AI, promtai, pirmasis paveikslėlis', icon: '🤖', gradient: 'from-brand-600/30 to-purple-600/15' },
  2: { Component: Week2, total: WEEK2_STEPS, title: 'Promtų menas',                subtitle: 'Recepto promtas, stiliai, kūryba',    icon: '✍️', gradient: 'from-purple-600/30 to-pink-600/15'  },
  3: { Component: Week3, total: WEEK3_STEPS, title: 'Istorija susitinka su AI',    subtitle: 'Personažai, scenos, iliustracijos',   icon: '📖', gradient: 'from-cyan-600/30 to-teal-600/15'   },
  4: { Component: Week4, total: WEEK4_STEPS, title: 'Etika ir didieji klausimai',  subtitle: 'Autorių teisės, kūryba, ateitis',    icon: '⚖️', gradient: 'from-amber-600/30 to-orange-600/15' },
}

// ── Student home: lesson overview ─────────────────────────────────────────────

function LessonHome({ currentWeek, user, onSelectWeek, onLogout }) {
  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <header className="glass border-b border-white/5 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🧠</span>
          <span className="font-display font-700 text-gradient text-lg">WebGenius</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">{user?.avatar_emoji || '🧑'} {user?.display_name}</span>
          <button onClick={onLogout}
            className="text-xs text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            Atsijungti
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="font-display text-3xl font-700 text-white mb-2">
              Sveiki, {user?.display_name}! 👋
            </h1>
            <p className="text-slate-400 text-sm">Pasirink pamoką ir tęsk savo AI kelionę.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(w => {
              const week = WEEKS[w]
              const isCurrent = w === currentWeek
              const isDone = w < currentWeek
              const isLocked = w > currentWeek

              return (
                <button key={w} onClick={() => onSelectWeek(w)}
                  className={`relative overflow-hidden rounded-3xl p-6 text-left border transition-all group ${
                    isCurrent
                      ? 'border-brand-500/40 hover:border-brand-500/60 hover:scale-[1.02]'
                      : isDone
                      ? 'border-white/10 hover:border-white/20 hover:scale-[1.02] opacity-80 hover:opacity-100'
                      : 'border-white/5 hover:border-white/15 hover:scale-[1.01] opacity-50 hover:opacity-70'
                  }`}>

                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${week.gradient} opacity-${isCurrent ? '100' : '50'}`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{week.icon}</span>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] text-slate-400 font-display font-700 uppercase tracking-widest">
                          Savaitė {w}
                        </span>
                        {isDone && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-display font-700">
                            ✓ Baigta
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/25 border border-brand-500/40 text-brand-300 font-display font-700">
                            ● Dabar
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500 font-display font-700">
                            🔒
                          </span>
                        )}
                      </div>
                    </div>
                    <h2 className="font-display text-lg font-700 text-white mb-1 leading-tight">{week.title}</h2>
                    <p className="text-slate-400 text-xs leading-relaxed">{week.subtitle}</p>

                    {isCurrent && (
                      <div className="mt-4 flex items-center gap-2 text-brand-300 text-xs font-display font-700">
                        Tęsti pamoką →
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Completion screen ─────────────────────────────────────────────────────────

function CompletionScreen({ weekNumber, title, xp }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="text-8xl mb-6">🎉</div>
      <h2 className="font-display text-4xl font-700 text-white mb-3">Savaitė {weekNumber} baigta!</h2>
      <p className="text-slate-400 text-sm mb-10 max-w-xs leading-relaxed">
        Puikus darbas! Tu baigei <strong className="text-slate-300">{title}</strong> pamoką.
      </p>
      <div className="px-12 py-6 rounded-3xl bg-gradient-to-br from-brand-500/20 to-purple-500/10 border border-brand-500/25 mb-8">
        <p className="text-brand-400 text-xs font-display font-700 uppercase tracking-widest mb-2">Šios savaitės taškai</p>
        <p className="text-6xl font-display font-700 text-brand-300">+{xp} XP</p>
      </div>
    </div>
  )
}

// ── Baitas free-question input ────────────────────────────────────────────────

function BaitasInput({ weekTitle, weekNumber, onReply }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const ask = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const question = input.trim()
    setInput('')
    onReply({ type: 'student', text: question })
    setLoading(true)
    try {
      const res = await api.baitas(question, [], weekTitle, weekNumber)
      onReply({ type: 'baitas', text: res.text })
    } catch {
      onReply({ type: 'baitas', text: 'Atsiprašau, įvyko klaida. Bandyk dar kartą! 🙏' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-white/5 bg-surface-950/95 backdrop-blur-sm px-4 py-3 flex-shrink-0">
      <form onSubmit={ask} className="max-w-2xl mx-auto flex gap-3 items-center">
        <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0 text-base">
          🤖
        </div>
        <input value={input} onChange={e => setInput(e.target.value)} disabled={loading}
          placeholder="Klausk Baito bet ką apie šią pamoką..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/40 text-sm transition-all disabled:opacity-50" />
        <button type="submit" disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-700 text-sm transition-all">
          {loading ? '...' : 'Klausk'}
        </button>
      </form>
    </div>
  )
}

// ── Free Q&A bubbles ──────────────────────────────────────────────────────────

function FreeBaitas({ text }) {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-brand-500/20">
        🤖
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-500 font-display font-700 mb-2 uppercase tracking-widest">Baitas</p>
        <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none px-5 py-4 text-slate-200 text-sm leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  )
}

function FreeStudent({ text, avatarEmoji }) {
  return (
    <div className="flex gap-4 flex-row-reverse animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-2xl flex-shrink-0">
        {avatarEmoji || '🧑'}
      </div>
      <div className="max-w-[75%] bg-brand-500/15 border border-brand-500/20 rounded-3xl rounded-tr-none px-5 py-4 text-brand-100 text-sm leading-relaxed">
        {text}
      </div>
    </div>
  )
}

// ── Main Lesson page ──────────────────────────────────────────────────────────

export default function Lesson() {
  const { user, logout } = useAuth()
  const [currentWeek, setCurrentWeek] = useState(1)
  const [activeWeek, setActiveWeek] = useState(null)   // null = show home
  const [currentStep, setCurrentStep] = useState(0)
  const [xp, setXp] = useState(0)
  const [freeChat, setFreeChat] = useState([])
  const bottomRef = useRef(null)

  const activeWeekData = WEEKS[activeWeek] || WEEKS[1]
  const { Component: WeekComponent, total, title } = activeWeekData
  const isComplete = currentStep > total
  const progress = Math.min(currentStep / total * 100, 100)

  const selectWeek = (w) => {
    setActiveWeek(w)
    setCurrentStep(0)
    setXp(0)
    setFreeChat([])
  }

  useEffect(() => {
    if (user?.id) {
      api.getStudentProgress(user.id)
        .then(data => setCurrentWeek(data.current_week || 1))
        .catch(() => {})
    }
  }, [user])

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 150)
  }, [currentStep, freeChat.length])

  const advance = (earnedXp = 5) => {
    setCurrentStep(s => s + 1)
    setXp(x => x + earnedXp)
  }

const handleReply = (msg) => {
    setFreeChat(prev => [...prev, msg])
  }

  if (!activeWeek) {
    return <LessonHome currentWeek={currentWeek} user={user} onSelectWeek={selectWeek} onLogout={logout} />
  }

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-3 flex items-center gap-4 flex-shrink-0">
        <button onClick={() => setActiveWeek(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors flex-shrink-0 group">
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span className="hidden sm:block">Visos pamokos</span>
        </button>

        {/* Progress bar */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500 font-body truncate">Savaitė {activeWeek}</span>
            <span className="text-xs text-brand-400 font-display font-700 flex-shrink-0 ml-2">+{xp} XP</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
          <span className="text-sm text-slate-400 hidden sm:block">
            {user?.avatar_emoji || '🧑'} {user?.display_name}
          </span>
          <button onClick={logout}
            className="text-xs text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
            Atsijungti
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

          {!isComplete ? (
            <WeekComponent currentStep={currentStep} advance={advance} user={user} />
          ) : (
            <CompletionScreen weekNumber={activeWeek} title={title} xp={xp} />
          )}

          {/* Free Baitas Q&A */}
          {freeChat.map((msg, i) =>
            msg.type === 'baitas'
              ? <FreeBaitas key={i} text={msg.text} />
              : <FreeStudent key={i} text={msg.text} avatarEmoji={user?.avatar_emoji} />
          )}

          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      <BaitasInput weekTitle={title} weekNumber={currentWeek} onReply={handleReply} />
    </div>
  )
}
