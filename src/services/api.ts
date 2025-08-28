const API = import.meta.env.VITE_API_URL || 'https://list-backend-36o2.onrender.com/'

export const api = {
  async list() {
    const res = await fetch(`${API}/tasks`)
    return res.json()
  },
  async create(body: { name: string; cost: number; dueDate: string | null }) {
    const res = await fetch(`${API}/tasks`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if (!res.ok) throw await res.json()
    return res.json()
  },
  async update(id: number, body: { name: string; cost: number; dueDate: string | null }) {
    const res = await fetch(`${API}/tasks/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if (!res.ok) throw await res.json()
    return res.json()
  },
  async remove(id: number) {
    const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    return res.json()
  },
  async move(id: number, direction: 'up'|'down') {
    const res = await fetch(`${API}/tasks/${id}/move`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ direction }) })
    return res.json()
  }
}