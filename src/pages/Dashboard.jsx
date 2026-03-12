import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-950 bg-grid flex flex-col">
      <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <span className="font-display font-700 text-gradient text-xl">WebGenius</span>
          <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">Teacher</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user?.display_name}</span>
          <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            Sign out
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md animate-slide-up">
          <div className="text-6xl mb-6">🏗️</div>
          <h2 className="font-display text-2xl font-700 text-white mb-3">Teacher Dashboard</h2>
          <p className="text-slate-400 font-body text-sm leading-relaxed mb-8">
            The full teacher dashboard is coming soon. For now, use the API at <code className="text-brand-400 font-mono text-xs">/docs</code> to manage students and API keys.
          </p>
          <div className="glass rounded-xl p-4 text-left space-y-3">
            <p className="text-xs font-500 text-slate-500 uppercase tracking-wider">Quick actions</p>
            <a href="/docs" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-all">
              <span>📋</span>
              <div>
                <p className="text-sm font-display font-600 text-white">Open API Docs</p>
                <p className="text-xs text-slate-500">Manage students & keys</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
