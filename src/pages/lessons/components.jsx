import { useState } from 'react'
import { api } from '../../lib/api'

// ── Continue button ───────────────────────────────────────────────────────────

export function ContinueBtn({ onClick, label = 'Tęsti →' }) {
  return (
    <button onClick={onClick}
      className="mt-4 px-7 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-400 active:scale-95 text-white text-sm font-display font-700 transition-all hover:scale-105 shadow-lg shadow-brand-500/30 animate-fade-in">
      {label}
    </button>
  )
}

// ── Baitas character message ──────────────────────────────────────────────────

export function BaitasMsg({ children, active, onContinue, accent = 'brand' }) {
  const colors = {
    brand: 'from-brand-400 to-brand-600 shadow-brand-500/30',
    purple: 'from-purple-400 to-purple-600 shadow-purple-500/30',
    cyan: 'from-cyan-400 to-cyan-600 shadow-cyan-500/30',
    amber: 'from-amber-400 to-amber-600 shadow-amber-500/30',
  }
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[accent]} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
        🤖
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-500 font-display font-700 mb-2 uppercase tracking-widest">Baitas</p>
        <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-none px-5 py-4 text-slate-200 text-sm leading-relaxed">
          {children}
        </div>
        {active && onContinue && <ContinueBtn onClick={onContinue} />}
      </div>
    </div>
  )
}

// ── Info card grid ────────────────────────────────────────────────────────────

export function InfoCard({ emoji, title, description, color = 'brand' }) {
  const border = {
    brand: 'border-brand-500/30 bg-brand-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    pink: 'border-pink-500/30 bg-pink-500/5',
  }
  return (
    <div className={`rounded-2xl border p-5 ${border[color]}`}>
      <div className="text-3xl mb-3">{emoji}</div>
      <p className="font-display font-700 text-white text-sm mb-1.5">{title}</p>
      <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
    </div>
  )
}

// ── Divider with label ────────────────────────────────────────────────────────

export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-white/5" />
      <span className="text-[10px] text-slate-600 font-display font-600 uppercase tracking-widest whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

// ── Highlight box ─────────────────────────────────────────────────────────────

export function HighlightBox({ children, color = 'brand', icon }) {
  const styles = {
    brand: 'bg-brand-500/10 border-brand-500/25 text-brand-200',
    purple: 'bg-purple-500/10 border-purple-500/25 text-purple-200',
    amber: 'bg-amber-500/10 border-amber-500/25 text-amber-200',
    green: 'bg-green-500/10 border-green-500/25 text-green-200',
  }
  return (
    <div className={`rounded-2xl border p-5 text-sm leading-relaxed ${styles[color]}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  )
}

// ── Quiz card ─────────────────────────────────────────────────────────────────

export function QuizCard({ question, options, correct, explanation, active, onContinue }) {
  const [selected, setSelected] = useState(null)
  const isCorrect = selected === correct

  return (
    <div className="glass rounded-3xl border border-yellow-500/20 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-yellow-500/10 to-transparent">
        <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-lg">🧠</div>
        <span className="text-sm font-display font-700 text-yellow-300">Viktorina</span>
      </div>
      <div className="p-6">
        <p className="text-slate-100 text-base font-display font-600 mb-5 leading-relaxed">{question}</p>
        <div className="space-y-2.5 mb-5">
          {options.map((opt, i) => {
            const answered = selected !== null
            let cls = 'w-full px-4 py-3.5 rounded-2xl border text-sm text-left transition-all flex items-center gap-3 '
            if (!answered) {
              cls += 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 cursor-pointer hover:scale-[1.01]'
            } else if (i === correct) {
              cls += 'bg-green-500/20 border-green-500/40 text-green-200'
            } else if (i === selected) {
              cls += 'bg-red-500/15 border-red-500/30 text-red-300'
            } else {
              cls += 'bg-white/2 border-white/5 text-slate-600 cursor-default'
            }
            return (
              <button key={i} className={cls} onClick={() => selected === null && setSelected(i)} disabled={answered}>
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-display font-700 flex-shrink-0 ${
                  !answered ? 'bg-white/10' :
                  i === correct ? 'bg-green-500/30 text-green-300' :
                  i === selected ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-600'
                }`}>
                  {answered && i === correct ? '✓' : answered && i === selected ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
        {selected !== null && (
          <div className={`px-4 py-3.5 rounded-2xl text-sm mb-4 animate-fade-in ${
            isCorrect ? 'bg-green-500/10 border border-green-500/20 text-green-300' : 'bg-orange-500/10 border border-orange-500/20 text-orange-300'
          }`}>
            {isCorrect ? '🎉 Puiku! ' : '💡 Beveik! '}{explanation}
          </div>
        )}
        {selected !== null && active && onContinue && <ContinueBtn onClick={onContinue} />}
      </div>
    </div>
  )
}

// ── Reflection card ───────────────────────────────────────────────────────────

export function ReflectionCard({ question, placeholder, active, onSave }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  const save = () => {
    if (!text.trim()) return
    setSaved(true)
    onSave?.()
  }

  return (
    <div className="glass rounded-3xl border border-amber-500/20 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-transparent">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg">📝</div>
        <span className="text-sm font-display font-700 text-amber-300">Tavo žurnalas</span>
      </div>
      <div className="p-6">
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{question}</p>
        {saved ? (
          <div className="px-4 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm text-center">
            ✅ Puikus darbas! Tavo mintys išsaugotos.
          </div>
        ) : (
          <>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder={placeholder || 'Rašyk čia savo mintis...'}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/40 text-sm resize-none mb-4 leading-relaxed" />
            <button onClick={save} disabled={!text.trim()}
              className="px-6 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-sm font-display font-700 transition-all disabled:opacity-40 hover:scale-105">
              Išsaugoti ✓
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Inline Chat ───────────────────────────────────────────────────────────────

export function InlineChat({ starter, label, onFirstUse, accentColor = 'brand' }) {
  const [input, setInput] = useState(starter || '')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasUsed, setHasUsed] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput('')
    const newMessages = [...messages, { role: 'user', text }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await api.chat(newMessages)
      const reply = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'Klaida. Bandyk dar kartą.'
      setMessages(prev => [...prev, { role: 'model', text: reply }])
      if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: `Klaida: ${err.message}` }])
      if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-3xl border border-brand-500/20 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-brand-500/10 to-transparent">
        <div className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-lg">💬</div>
        <span className="text-sm font-display font-700 text-brand-300">{label || 'Pokalbis su AI'}</span>
      </div>
      <div className="max-h-72 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-slate-600 text-center py-8">Pakeisk tekstą žemiau arba rašyk savą klausimą ↓</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg flex-shrink-0 mt-0.5">{m.role === 'user' ? '🧑' : '🤖'}</span>
            <div className={`text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed max-w-[85%] ${
              m.role === 'user'
                ? 'bg-brand-500/15 border border-brand-500/20 text-brand-100 rounded-tr-none'
                : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
            }`}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <span className="text-lg">🤖</span>
            <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex gap-1 items-center">
              {[0, 150, 300].map(d => <span key={d} className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
            </div>
          </div>
        )}
      </div>
      <form onSubmit={send} className="border-t border-white/5 flex items-center gap-2 px-4 py-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Rašyk čia..."
          className="flex-1 py-2 bg-transparent text-white placeholder-slate-600 focus:outline-none text-sm" />
        <button type="submit" disabled={loading || !input.trim()}
          className="px-4 py-1.5 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-brand-300 text-xs font-display font-700 transition-all disabled:opacity-30">
          Siųsti →
        </button>
      </form>
    </div>
  )
}

// ── Inline Image ──────────────────────────────────────────────────────────────

export function InlineImage({ starter, label, onFirstUse }) {
  const [prompt, setPrompt] = useState(starter || '')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasUsed, setHasUsed] = useState(false)

  const generate = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await api.generateImage(prompt)
      setImages(res?.predictions || [])
      if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
    } catch (err) {
      setError(err.message)
      if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-3xl border border-purple-500/20 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-transparent">
        <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg">🎨</div>
        <span className="text-sm font-display font-700 text-purple-300">{label || 'Paveikslėlio kūrimas'}</span>
      </div>
      <div className="p-5">
        <form onSubmit={generate} className="flex gap-3 mb-4">
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={2} placeholder="Aprašyk paveikslėlį angliškai..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40 text-sm resize-none" />
          <button type="submit" disabled={loading || !prompt.trim()}
            className="px-5 py-2 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 text-sm font-display font-700 transition-all disabled:opacity-40 self-start whitespace-nowrap hover:scale-105">
            {loading ? '⏳' : '✨ Kurti'}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mb-3 px-1">⚠️ {error}</p>}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-10 text-slate-500 text-sm">
            <span className="text-xl animate-spin">🎨</span>
            Kuriama... užtruks ~20 sek.
          </div>
        )}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5">
            {images.map((pred, i) => (
              <img key={i} src={`data:image/png;base64,${pred.bytesBase64Encoded}`} alt={`Paveikslėlis ${i + 1}`}
                className="rounded-2xl w-full aspect-square object-cover border border-white/10 hover:scale-[1.02] transition-transform cursor-zoom-in shadow-lg" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Inline Voice ──────────────────────────────────────────────────────────────

export function InlineVoice({ starter, label, onFirstUse }) {
  const [text, setText] = useState(starter || '')
  const [audioUrl, setAudioUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasUsed, setHasUsed] = useState(false)

  const generate = async (e) => {
    e.preventDefault()
    if (!text.trim() || loading) return
    setLoading(true)
    setError('')
    setAudioUrl(null)
    try {
      const res = await api.ttsGemini(text)
      const audioPart = res?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)
      if (audioPart) {
        setAudioUrl(`data:audio/wav;base64,${audioPart.inlineData.data}`)
        if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
      } else {
        setError('Audio negeneruotas. Patikrink API raktą.')
        if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
      }
    } catch (err) {
      setError(err.message)
      if (!hasUsed) { setHasUsed(true); onFirstUse?.() }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-3xl border border-green-500/20 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-transparent">
        <div className="w-9 h-9 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-lg">🎙️</div>
        <span className="text-sm font-display font-700 text-green-300">{label || 'Balso sintezė'}</span>
      </div>
      <div className="p-5">
        <form onSubmit={generate} className="flex gap-3 mb-4">
          <textarea value={text} onChange={e => setText(e.target.value)} rows={2} placeholder="Rašyk tekstą, kurį nori išgirsti..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-green-500/40 text-sm resize-none" />
          <button type="submit" disabled={loading || !text.trim()}
            className="px-5 py-2 rounded-2xl bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 text-sm font-display font-700 transition-all disabled:opacity-40 self-start whitespace-nowrap hover:scale-105">
            {loading ? '⏳' : '🔊 Groti'}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mb-3 px-1">⚠️ {error}</p>}
        {audioUrl && <audio controls src={audioUrl} className="w-full rounded-xl" autoPlay />}
      </div>
    </div>
  )
}
