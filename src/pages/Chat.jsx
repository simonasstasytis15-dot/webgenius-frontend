import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'

const TOOLS = [
  { id: 'chat',   icon: '💬', label: 'AI Chat',    desc: 'Talk to Gemini' },
  { id: 'image',  icon: '🎨', label: 'Image Studio', desc: 'Create with Imagen 3' },
  { id: 'voice',  icon: '🎙️', label: 'Voice Studio', desc: 'Text-to-speech' },
  { id: 'video',  icon: '🎬', label: 'Video Gen',  desc: 'Generate with Veo 2' },
]

const SYSTEM_PROMPT = `You are a friendly and encouraging AI assistant for WebGenius, a creative coding and AI art school for kids aged 10-12. 
Help students with their creative projects — writing stories, creating art prompts, coding, and learning about AI.
Keep responses concise, fun, and encouraging. Use simple language. Add relevant emojis occasionally.`

function ChatMessage({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
        isUser ? 'bg-brand-500/20 border border-brand-500/30' : 'bg-white/5 border border-white/10'
      }`}>
        {isUser ? '🧑' : '🤖'}
      </div>
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
        isUser
          ? 'bg-brand-500/20 border border-brand-500/20 text-brand-100 rounded-tr-sm'
          : 'bg-white/5 border border-white/8 text-slate-200 rounded-tl-sm'
      }`}>
        {msg.text}
      </div>
    </div>
  )
}

function ImageResult({ data }) {
  // Gemini Imagen returns base64 images
  const images = data?.predictions || []
  if (!images.length) return <p className="text-slate-400 text-sm">No images generated.</p>
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {images.map((pred, i) => (
        <img
          key={i}
          src={`data:image/png;base64,${pred.bytesBase64Encoded}`}
          alt={`Generated ${i+1}`}
          className="rounded-xl w-full aspect-square object-cover border border-white/10"
        />
      ))}
    </div>
  )
}

export default function Chat() {
  const { user, logout } = useAuth()
  const [activeTool, setActiveTool] = useState('chat')
  const [messages, setMessages] = useState([
    { role: 'model', text: `Hey ${user?.display_name?.split(' ')[0] || 'there'}! 👋 I'm your WebGenius AI assistant. What are we creating today?` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageResult, setImageResult] = useState(null)
  const [ttsText, setTtsText] = useState('')
  const [ttsResult, setTtsResult] = useState(null)
  const [videoPrompt, setVideoPrompt] = useState('')
  const [videoResult, setVideoResult] = useState(null)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ── Chat ──────────────────────────────────────────────────────────────────

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userText = input.trim()
    setInput('')
    setError('')

    const newMessages = [...messages, { role: 'user', text: userText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiMessages = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }))
      const res = await api.chat(apiMessages, SYSTEM_PROMPT)
      const replyText = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'Hmm, I had trouble responding. Try again!'
      setMessages(prev => [...prev, { role: 'model', text: replyText }])
    } catch (err) {
      setError(err.message)
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ Something went wrong. Your teacher may need to check your API key.' }])
    } finally {
      setLoading(false)
    }
  }

  // ── Image ─────────────────────────────────────────────────────────────────

  const generateImage = async (e) => {
    e.preventDefault()
    if (!imagePrompt.trim() || loading) return
    setLoading(true)
    setError('')
    setImageResult(null)
    try {
      const res = await api.generateImage(imagePrompt)
      setImageResult(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ── TTS ───────────────────────────────────────────────────────────────────

  const generateTTS = async (e) => {
    e.preventDefault()
    if (!ttsText.trim() || loading) return
    setLoading(true)
    setError('')
    setTtsResult(null)
    try {
      const res = await api.ttsGemini(ttsText)
      // Gemini TTS returns audio in the content parts
      const audioPart = res?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)
      if (audioPart) {
        const audioUrl = `data:audio/wav;base64,${audioPart.inlineData.data}`
        setTtsResult(audioUrl)
      } else {
        setError('No audio returned. Check your API key.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ── Video ─────────────────────────────────────────────────────────────────

  const generateVideo = async (e) => {
    e.preventDefault()
    if (!videoPrompt.trim() || loading) return
    setLoading(true)
    setError('')
    setVideoResult(null)
    try {
      const res = await api.generateVideo(videoPrompt)
      setVideoResult(res)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 bg-grid flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <span className="font-display font-700 text-gradient text-xl">WebGenius</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 font-body">
            {user?.avatar_emoji || '🧑'} {user?.display_name}
          </span>
          <button
            onClick={logout}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - tools */}
        <aside className="w-56 glass border-r border-white/5 p-4 flex flex-col gap-2 flex-shrink-0">
          <p className="text-xs font-500 text-slate-500 uppercase tracking-wider px-2 mb-2">Tools</p>
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setError('') }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                activeTool === tool.id
                  ? 'bg-brand-500/20 border border-brand-500/30 text-brand-300'
                  : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{tool.icon}</span>
              <div>
                <p className="font-display font-600 text-sm">{tool.label}</p>
                <p className="text-xs text-slate-500">{tool.desc}</p>
              </div>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* ── CHAT ── */}
          {activeTool === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
                {loading && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm">🤖</div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/8 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                      <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {error && <p className="px-6 pb-2 text-red-400 text-xs">{error}</p>}
              <form onSubmit={sendMessage} className="p-4 border-t border-white/5 flex gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything, get creative help, or just chat..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all font-body text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all glow-brand"
                >
                  Send
                </button>
              </form>
            </>
          )}

          {/* ── IMAGE STUDIO ── */}
          {activeTool === 'image' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-2xl font-700 text-white mb-2">Image Studio</h2>
                <p className="text-slate-400 text-sm mb-8">Describe what you want to create and Imagen 3 will bring it to life.</p>

                <form onSubmit={generateImage} className="space-y-4 mb-8">
                  <textarea
                    value={imagePrompt}
                    onChange={e => setImagePrompt(e.target.value)}
                    placeholder="A magical forest with glowing mushrooms and tiny fairies, digital art style, vibrant colors..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all font-body text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !imagePrompt.trim()}
                    className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all glow-brand flex items-center gap-2"
                  >
                    {loading ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Generating...</>
                    ) : '🎨 Generate 4 images'}
                  </button>
                </form>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                {imageResult && <ImageResult data={imageResult} />}
              </div>
            </div>
          )}

          {/* ── VOICE STUDIO ── */}
          {activeTool === 'voice' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-2xl font-700 text-white mb-2">Voice Studio</h2>
                <p className="text-slate-400 text-sm mb-8">Turn any text into a voiceover using Gemini TTS.</p>

                <form onSubmit={generateTTS} className="space-y-4 mb-8">
                  <textarea
                    value={ttsText}
                    onChange={e => setTtsText(e.target.value)}
                    placeholder="In a land far, far away, there lived a young inventor named Zara who could talk to machines..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all font-body text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !ttsText.trim()}
                    className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all glow-brand flex items-center gap-2"
                  >
                    {loading ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Generating...</>
                    ) : '🎙️ Generate voiceover'}
                  </button>
                </form>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                {ttsResult && (
                  <div className="glass rounded-xl p-4">
                    <p className="text-sm text-slate-400 mb-3 font-body">Your voiceover is ready:</p>
                    <audio controls src={ttsResult} className="w-full" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── VIDEO ── */}
          {activeTool === 'video' && (
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-2xl font-700 text-white mb-2">Video Generator</h2>
                <p className="text-slate-400 text-sm mb-2">Create short videos with Google Veo 2.</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-8">
                  ⏱ Takes 2–3 minutes to generate
                </div>

                <form onSubmit={generateVideo} className="space-y-4 mb-8">
                  <textarea
                    value={videoPrompt}
                    onChange={e => setVideoPrompt(e.target.value)}
                    placeholder="A cute robot learning to paint watercolors in a sunny studio, cinematic..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all font-body text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !videoPrompt.trim()}
                    className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all glow-brand flex items-center gap-2"
                  >
                    {loading ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Generating...</>
                    ) : '🎬 Generate video'}
                  </button>
                </form>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                {videoResult && (
                  <div className="glass rounded-xl p-4">
                    <p className="text-xs text-slate-400 font-mono mb-2">Operation: {videoResult.name}</p>
                    <p className="text-sm text-slate-300">Video generation started! Poll the operation above to check when it's ready.</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
