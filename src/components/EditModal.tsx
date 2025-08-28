import React, { useState } from 'react'
import { Task } from '../models/Task'

export function EditModal({ task, onCancel, onSave }: { task: Task, onCancel: () => void, onSave: (task: Task) => void }) {
  const [name, setName] = useState(task.name)
  const [cost, setCost] = useState(String(task.cost))
  const [dueDate, setDueDate] = useState(task.dueDate || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ ...task, name, cost: Number(cost) || 0, dueDate: dueDate || null })
  }

  return (
    <div className="modal">
      <div className="modal-content card">
        <h3>Editar tarefa</h3>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={e => setName(e.target.value)} />
          <input type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} />
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}