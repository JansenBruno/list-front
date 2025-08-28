import React, { useEffect, useState } from 'react'
import { Task } from './models/Task'
import { api } from './services/api'
import { TaskForm } from './components/TaskForm'
import { EditModal } from './components/EditModal'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editing, setEditing] = useState<Task | null>(null)

  async function load() {
    const data = await api.list()
    setTasks(data)
  }

  useEffect(() => { load() }, [])

  async function onCreate(name: string, cost: number, dueDate: string | null) {
    await api.create({ name, cost, dueDate })
    await load()
  }

  async function onDelete(id: number) {
    if (!confirm('Confirma exclusão?')) return
    await api.remove(id)
    await load()
  }

  async function onMove(id: number, direction: 'up'|'down') {
    await api.move(id, direction)
    await load()
  }

  async function onSaveEdit(task: Task) {
    await api.update(task.id, { name: task.name, cost: task.cost, dueDate: task.dueDate })
    setEditing(null)
    await load()
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <TaskForm onSubmit={onCreate} />

      <div className="card list">
        {tasks.length === 0 && <p>Nenhuma tarefa</p>}
        {tasks.map((t, idx) => (
          <div key={t.id} className={`task ${t.cost >= 1000 ? 'high-cost' : ''}`}>
            <div className="left">
              <div className="title">{t.name}</div>
              <div className="meta">R$ {t.cost.toFixed(2)} • {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</div>
            </div>
            <div className="actions">
              <button onClick={() => onMove(t.id, 'up')} disabled={idx===0}>↑</button>
              <button onClick={() => onMove(t.id, 'down')} disabled={idx===tasks.length-1}>↓</button>
              <button onClick={() => setEditing(t)}>✏️</button>
              <button onClick={() => onDelete(t.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <EditModal task={editing} onCancel={() => setEditing(null)} onSave={onSaveEdit} />
      )}
    </div>
  )
}