const BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const token = localStorage.getItem('wg_token')
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }))
    const detail = Array.isArray(err.detail) ? err.detail.map(e => e.msg).join(', ') : err.detail
    throw new Error(detail || 'Request failed')
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/api/v1/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  me: () => request('/api/v1/auth/me'),

  // AI
  chat: (messages, systemPrompt) =>
    request('/api/v1/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model: 'flash', system_prompt: systemPrompt }),
    }),

  generateImage: (prompt, aspectRatio = '1:1') =>
    request('/api/v1/ai/imagen', {
      method: 'POST',
      body: JSON.stringify({ prompt, sample_count: 4, aspect_ratio: aspectRatio }),
    }),

  ttsGemini: (text, voiceName = 'Aoede') =>
    request('/api/v1/ai/tts/gemini', {
      method: 'POST',
      body: JSON.stringify({ text, voice_name: voiceName }),
    }),

  ttsElevenLabs: (text, voiceId) =>
    request('/api/v1/ai/tts/elevenlabs', {
      method: 'POST',
      body: JSON.stringify({ text, voice_id: voiceId }),
    }),

  generateVideo: (prompt, durationSeconds = 5) =>
    request('/api/v1/ai/veo', {
      method: 'POST',
      body: JSON.stringify({ prompt, duration_seconds: durationSeconds }),
    }),

  // Baitas AI character
  baitas: (message, history = [], lessonTitle = '', lessonWeek = 1) =>
    request('/api/v1/ai/baitas', {
      method: 'POST',
      body: JSON.stringify({ message, history, lesson_title: lessonTitle, lesson_week: lessonWeek }),
    }),

  // Students
  getMyKeys: (studentId) => request(`/api/v1/students/${studentId}/keys`),

  getStudentProgress: (studentId) => request(`/api/v1/students/${studentId}/progress`),

  createStudent: (email, displayName, password, avatarEmoji = '🧑') =>
    request('/api/v1/students', {
      method: 'POST',
      body: JSON.stringify({ email, display_name: displayName, password, avatar_emoji: avatarEmoji }),
    }),

  // Classes
  listClasses: () => request('/api/v1/classes'),

  createClass: (name, description = '') =>
    request('/api/v1/classes', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    }),

  addStudentToClass: (classId, studentId) =>
    request(`/api/v1/classes/${classId}/students/${studentId}`, { method: 'POST' }),

  getClassDashboard: (classId) => request(`/api/v1/dashboard/class/${classId}`),

  advanceStudentWeek: (classId, studentId) =>
    request(`/api/v1/classes/${classId}/students/${studentId}/week`, { method: 'PATCH' }),

  // API Keys
  setStudentKey: (studentId, provider, apiKey, label = '') =>
    request(`/api/v1/api-keys/student/${studentId}`, {
      method: 'PUT',
      body: JSON.stringify({ provider, api_key: apiKey, label }),
    }),

  revokeStudentKey: (studentId, provider) =>
    request(`/api/v1/api-keys/student/${studentId}/${provider}`, { method: 'DELETE' }),
}
