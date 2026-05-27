import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'

// ── Lesson metadata ───────────────────────────────────────────────────────────

const LESSONS = {
  1: { title: 'Kas yra AI menas?', subtitle: 'AI, promtai, pirmasis paveikslėlis', icon: '🤖', accent: 'brand' },
  2: { title: 'Promtų menas', subtitle: 'Recepto promtas, stiliai, kūryba', icon: '✍️', accent: 'purple' },
  3: { title: 'Istorija susitinka su AI', subtitle: 'Personažai, scenos, iliustracijos', icon: '📖', accent: 'cyan' },
  4: { title: 'Etika ir didieji klausimai', subtitle: 'Autorių teisės, kūryba, ateitis', icon: '⚖️', accent: 'amber' },
}

const ACCENT = {
  brand:  { bg: 'bg-brand-500/15',  border: 'border-brand-500/30',  text: 'text-brand-300',  dot: 'bg-brand-400',  activeBg: 'bg-brand-500/20',  activeBorder: 'border-brand-500/40' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-300', dot: 'bg-purple-400', activeBg: 'bg-purple-500/20', activeBorder: 'border-purple-500/40' },
  cyan:   { bg: 'bg-cyan-500/15',   border: 'border-cyan-500/30',   text: 'text-cyan-300',   dot: 'bg-cyan-400',   activeBg: 'bg-cyan-500/20',   activeBorder: 'border-cyan-500/40' },
  amber:  { bg: 'bg-amber-500/15',  border: 'border-amber-500/30',  text: 'text-amber-300',  dot: 'bg-amber-400',  activeBg: 'bg-amber-500/20',  activeBorder: 'border-amber-500/40' },
}

// ── Shared modal shell ────────────────────────────────────────────────────────

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl p-6 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-700 text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 transition-all text-sm'

// ── Modals ────────────────────────────────────────────────────────────────────

function CreateClassModal({ onClose, onCreated }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const cls = await api.createClass(name, description)
      onCreated(cls)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Create Class" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Class Name">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Spring 2025 — Group A" className={inputCls} required />
        </Field>
        <Field label="Description (optional)">
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Ages 10–12, Tuesday sessions" className={inputCls} />
        </Field>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={loading || !name.trim()}
          className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all">
          {loading ? 'Creating…' : 'Create Class'}
        </button>
      </form>
    </Modal>
  )
}

const EMOJIS = ['🧑', '👦', '👧', '🧒', '🐱', '🦊', '🐼', '🚀', '⭐', '🎮']

function CreateStudentModal({ classId, onClose, onCreated }) {
  const [form, setForm] = useState({ email: '', display_name: '', password: '', avatar_emoji: '🧑' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const student = await api.createStudent(form.email, form.display_name, form.password, form.avatar_emoji)
      await api.addStudentToClass(classId, student.id)
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Add Student" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Display Name">
          <input value={form.display_name} onChange={e => set('display_name', e.target.value)} placeholder="Maya" className={inputCls} required />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="maya@school.lt" className={inputCls} required />
        </Field>
        <Field label="Password">
          <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" className={inputCls} required />
        </Field>
        <Field label="Avatar">
          <div className="flex gap-2 flex-wrap mt-1">
            {EMOJIS.map(emoji => (
              <button key={emoji} type="button" onClick={() => set('avatar_emoji', emoji)}
                className={`text-xl p-2 rounded-lg border transition-all ${form.avatar_emoji === emoji ? 'border-brand-500 bg-brand-500/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                {emoji}
              </button>
            ))}
          </div>
        </Field>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={loading || !form.email || !form.display_name || !form.password}
          className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all">
          {loading ? 'Adding…' : 'Add to Class'}
        </button>
      </form>
    </Modal>
  )
}

function AssignKeyModal({ student, onClose, onAssigned }) {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.setStudentKey(student.student_id, 'gemini', apiKey, `${student.display_name}'s Gemini key`)
      onAssigned()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title={`Gemini Key — ${student.display_name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Gemini API Key">
          <input value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIzaSy…" className={inputCls + ' font-mono'} required />
          <p className="text-xs text-slate-500 mt-1.5">From Google AI Studio. Stored encrypted, never shown again.</p>
        </Field>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={loading || !apiKey.trim()}
          className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-white font-display font-600 text-sm transition-all">
          {loading ? 'Saving…' : 'Save Key'}
        </button>
      </form>
    </Modal>
  )
}

// ── Student row (class detail) ─────────────────────────────────────────────────

function StudentRow({ student, classId, onAssignKey, onRefresh }) {
  const [advancing, setAdvancing] = useState(false)
  const hasKey = student.api_keys?.gemini === 'active'

  const advanceWeek = async () => {
    setAdvancing(true)
    try {
      await api.advanceStudentWeek(classId, student.student_id)
      onRefresh()
    } catch (err) {
      alert(err.message)
    } finally {
      setAdvancing(false)
    }
  }

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">{student.avatar_emoji}</span>
          <div>
            <p className="font-display font-600 text-white text-sm">{student.display_name}</p>
            <p className="text-xs text-slate-500">{student.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white font-mono">Week {student.current_week}</span>
          <button onClick={advanceWeek} disabled={advancing} title="Advance to next week"
            className="text-xs text-brand-400 hover:text-brand-300 px-2 py-0.5 rounded bg-brand-500/10 hover:bg-brand-500/20 transition-all disabled:opacity-40">
            {advancing ? '…' : '+1'}
          </button>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className="text-sm text-amber-400 font-mono">{student.xp} XP</span>
      </td>
      <td className="py-3 px-4">
        <span className={`text-xs px-2 py-1 rounded-full border ${hasKey
          ? 'text-green-400 bg-green-400/10 border-green-400/20'
          : 'text-red-400 bg-red-400/10 border-red-400/20'}`}>
          {hasKey ? '✓ Active' : '✗ No key'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-3 text-xs text-slate-400">
          <span title="Chat">💬 {student.usage_today?.gemini_text ?? 0}</span>
          <span title="Image">🎨 {student.usage_today?.gemini_imagen ?? 0}</span>
          <span title="TTS">🎙 {student.usage_today?.gemini_tts ?? 0}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <button onClick={() => onAssignKey(student)}
          className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10 border border-white/10">
          {hasKey ? 'Replace key' : 'Assign key'}
        </button>
      </td>
    </tr>
  )
}

// ── Lesson student row ────────────────────────────────────────────────────────

function LessonStudentRow({ student, classId, targetWeek, onRefresh }) {
  const [advancing, setAdvancing] = useState(false)
  const isCurrent = student.current_week === targetWeek
  const isAhead = student.current_week > targetWeek

  const advanceWeek = async () => {
    setAdvancing(true)
    try {
      await api.advanceStudentWeek(classId, student.student_id)
      onRefresh()
    } catch (err) {
      alert(err.message)
    } finally {
      setAdvancing(false)
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all">
      <span className="text-xl">{student.avatar_emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-600 text-white text-sm">{student.display_name}</p>
        <p className="text-xs text-slate-500">{student.class_name}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2.5 py-1 rounded-full border font-display font-600 ${
          isAhead   ? 'bg-green-500/10 border-green-500/20 text-green-400' :
          isCurrent ? 'bg-brand-500/15 border-brand-500/30 text-brand-300' :
                      'bg-white/5 border-white/10 text-slate-500'
        }`}>
          {isAhead ? '✓ Done' : isCurrent ? 'Week ' + student.current_week : 'Week ' + student.current_week}
        </span>
        {!isAhead && (
          <button onClick={advanceWeek} disabled={advancing}
            className="text-xs text-brand-400 hover:text-brand-300 px-3 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 transition-all disabled:opacity-40 font-display font-600">
            {advancing ? '…' : 'Next week →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [view, setView] = useState('overview')         // 'overview' | 'class-detail' | 'lesson'
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)  // week number
  const [students, setStudents] = useState([])
  const [allStudents, setAllStudents] = useState([])   // flat list for lesson view
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [modal, setModal] = useState(null)

  const loadClasses = useCallback(async () => {
    setLoadingClasses(true)
    try {
      setClasses(await api.listClasses())
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingClasses(false)
    }
  }, [])

  const loadStudents = useCallback(async (classId) => {
    setLoadingStudents(true)
    try {
      setStudents(await api.getClassDashboard(classId))
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStudents(false)
    }
  }, [])

  const loadAllStudents = useCallback(async (classList) => {
    setLoadingStudents(true)
    try {
      const results = await Promise.all(
        classList.map(cls =>
          api.getClassDashboard(cls.id).then(students =>
            students.map(s => ({ ...s, class_name: cls.name, class_id: cls.id }))
          )
        )
      )
      setAllStudents(results.flat())
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingStudents(false)
    }
  }, [])

  useEffect(() => { loadClasses() }, [loadClasses])

  const openClass = (cls) => {
    setSelectedClass(cls)
    setSelectedLesson(null)
    setView('class-detail')
    loadStudents(cls.id)
  }

  const openLesson = (week) => {
    setSelectedLesson(week)
    setSelectedClass(null)
    setView('lesson')
    loadAllStudents(classes)
  }

  const refreshLesson = () => loadAllStudents(classes)

  const lessonStudents = allStudents.filter(s => s.current_week === selectedLesson)
  const lessonAhead    = allStudents.filter(s => s.current_week > selectedLesson)
  const lessonBehind   = allStudents.filter(s => s.current_week < selectedLesson)

  const weekCounts = [1, 2, 3, 4].reduce((acc, w) => {
    acc[w] = allStudents.filter(s => s.current_week === w).length
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 py-3.5 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🧠</span>
          <span className="font-display font-700 text-gradient text-lg">WebGenius</span>
          <span className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ml-1">Teacher</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">{user?.display_name}</span>
          <button onClick={logout}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-60 border-r border-white/5 flex-shrink-0 overflow-y-auto flex flex-col bg-surface-950/50">
          <div className="flex-1 p-3 space-y-6">

            {/* Classes section */}
            <div>
              <div className="flex items-center justify-between px-2 mb-1.5">
                <span className="text-[10px] text-slate-500 font-display font-700 uppercase tracking-widest">Classes</span>
                <button onClick={() => setModal('create-class')}
                  className="text-brand-400 hover:text-brand-300 transition-colors text-lg leading-none font-light w-6 h-6 flex items-center justify-center rounded hover:bg-brand-500/10">
                  +
                </button>
              </div>

              {loadingClasses ? (
                <p className="text-xs text-slate-600 px-2 py-1">Loading…</p>
              ) : classes.length === 0 ? (
                <button onClick={() => setModal('create-class')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all border border-dashed border-white/10">
                  + Create first class
                </button>
              ) : (
                <div className="space-y-0.5">
                  {classes.map(cls => (
                    <button key={cls.id} onClick={() => openClass(cls)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2.5 ${
                        selectedClass?.id === cls.id && view === 'class-detail'
                          ? 'bg-brand-500/15 text-brand-300 border border-brand-500/25'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}>
                      <span className="text-base">🏫</span>
                      <span className="flex-1 truncate font-body">{cls.name}</span>
                      <span className="text-xs text-slate-600 flex-shrink-0">{cls.student_count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lessons section */}
            <div>
              <div className="px-2 mb-1.5">
                <span className="text-[10px] text-slate-500 font-display font-700 uppercase tracking-widest">Lessons</span>
              </div>
              <div className="space-y-0.5">
                {[1, 2, 3, 4].map(week => {
                  const lesson = LESSONS[week]
                  const a = ACCENT[lesson.accent]
                  const isActive = selectedLesson === week && view === 'lesson'
                  const count = weekCounts[week] || 0
                  return (
                    <button key={week} onClick={() => openLesson(week)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2.5 ${
                        isActive
                          ? `${a.activeBg} ${a.text} border ${a.activeBorder}`
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}>
                      <span className="text-base flex-shrink-0">{lesson.icon}</span>
                      <span className="flex-1 truncate font-body">Week {week}</span>
                      {count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${isActive ? a.bg + ' ' + a.text + ' border ' + a.border : 'bg-white/8 text-slate-500'}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto">

          {/* Overview */}
          {view === 'overview' && (
            <div className="p-8 max-w-4xl">
              <div className="mb-8">
                <h1 className="font-display text-2xl font-700 text-white mb-1">Overview</h1>
                <p className="text-slate-400 text-sm">Select a class or lesson from the sidebar to get started.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6 border border-white/8 text-center">
                  <p className="text-4xl font-display font-700 text-white mb-1">{classes.length}</p>
                  <p className="text-slate-400 text-sm">Classes</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/8 text-center">
                  <p className="text-4xl font-display font-700 text-white mb-1">
                    {classes.reduce((s, c) => s + (c.student_count || 0), 0)}
                  </p>
                  <p className="text-slate-400 text-sm">Students</p>
                </div>
              </div>
            </div>
          )}

          {/* Class detail */}
          {view === 'class-detail' && selectedClass && (
            <div className="p-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-2xl font-700 text-white truncate">{selectedClass.name}</h1>
                  {selectedClass.description && <p className="text-slate-400 text-sm mt-0.5">{selectedClass.description}</p>}
                </div>
                <button onClick={() => loadStudents(selectedClass.id)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm transition-all">
                  🔄 Refresh
                </button>
                <button onClick={() => setModal('create-student')}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-display font-600 text-sm transition-all">
                  + Add Student
                </button>
              </div>

              {loadingStudents ? (
                <div className="text-center py-20 text-slate-500">Loading students…</div>
              ) : students.length === 0 ? (
                <div className="text-center py-20 animate-fade-in">
                  <div className="text-5xl mb-4">🧑‍🎓</div>
                  <p className="text-slate-400 mb-6">No students yet.</p>
                  <button onClick={() => setModal('create-student')}
                    className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-display font-600 text-sm transition-all">
                    Add Student
                  </button>
                </div>
              ) : (
                <div className="glass rounded-2xl border border-white/8 overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-white/8">
                        {['Student', 'Week', 'XP', 'API Key', "Today's Usage", ''].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs text-slate-500 uppercase tracking-wider font-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <StudentRow
                          key={student.student_id}
                          student={student}
                          classId={selectedClass.id}
                          onAssignKey={(s) => setModal({ type: 'assign-key', student: s })}
                          onRefresh={() => loadStudents(selectedClass.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Lesson detail */}
          {view === 'lesson' && selectedLesson && (
            <div className="p-8 animate-fade-in">
              {(() => {
                const lesson = LESSONS[selectedLesson]
                const a = ACCENT[lesson.accent]
                return (
                  <>
                    {/* Lesson header */}
                    <div className={`rounded-2xl p-6 border ${a.border} ${a.bg} mb-8 flex items-center gap-5`}>
                      <div className="text-5xl">{lesson.icon}</div>
                      <div className="flex-1">
                        <div className={`text-[10px] font-display font-700 uppercase tracking-widest mb-1 ${a.text}`}>Week {selectedLesson}</div>
                        <h1 className="font-display text-2xl font-700 text-white mb-0.5">{lesson.title}</h1>
                        <p className="text-slate-400 text-sm">{lesson.subtitle}</p>
                      </div>
                      <button onClick={() => { loadAllStudents(classes) }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm transition-all flex-shrink-0">
                        🔄
                      </button>
                    </div>

                    {loadingStudents ? (
                      <div className="text-center py-20 text-slate-500">Loading students…</div>
                    ) : allStudents.length === 0 ? (
                      <div className="text-center py-20">
                        <div className="text-5xl mb-4">🧑‍🎓</div>
                        <p className="text-slate-400">No students found. Add students to your classes first.</p>
                      </div>
                    ) : (
                      <div className="space-y-8">

                        {/* Currently on this week */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <h2 className="font-display font-700 text-white text-base">On this lesson</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${a.bg} ${a.text} border ${a.border}`}>{lessonStudents.length}</span>
                          </div>
                          {lessonStudents.length === 0 ? (
                            <p className="text-slate-500 text-sm px-1">No students on this week yet.</p>
                          ) : (
                            <div className="space-y-2">
                              {lessonStudents.map(s => (
                                <LessonStudentRow key={s.student_id} student={s} classId={s.class_id}
                                  targetWeek={selectedLesson} onRefresh={refreshLesson} />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Behind */}
                        {lessonBehind.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <h2 className="font-display font-700 text-slate-400 text-base">Not yet started</h2>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/10">{lessonBehind.length}</span>
                            </div>
                            <div className="space-y-2">
                              {lessonBehind.map(s => (
                                <LessonStudentRow key={s.student_id} student={s} classId={s.class_id}
                                  targetWeek={selectedLesson} onRefresh={refreshLesson} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Ahead */}
                        {lessonAhead.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <h2 className="font-display font-700 text-slate-400 text-base">Completed</h2>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{lessonAhead.length}</span>
                            </div>
                            <div className="space-y-2 opacity-60">
                              {lessonAhead.map(s => (
                                <LessonStudentRow key={s.student_id} student={s} classId={s.class_id}
                                  targetWeek={selectedLesson} onRefresh={refreshLesson} />
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}

        </main>
      </div>

      {/* Modals */}
      {modal === 'create-class' && (
        <CreateClassModal onClose={() => setModal(null)} onCreated={() => { setModal(null); loadClasses() }} />
      )}
      {modal === 'create-student' && selectedClass && (
        <CreateStudentModal classId={selectedClass.id} onClose={() => setModal(null)}
          onCreated={() => { setModal(null); loadStudents(selectedClass.id) }} />
      )}
      {modal?.type === 'assign-key' && (
        <AssignKeyModal student={modal.student} onClose={() => setModal(null)}
          onAssigned={() => { setModal(null); loadStudents(selectedClass.id) }} />
      )}
    </div>
  )
}
