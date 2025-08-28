import React, { useState } from 'react'

export function TaskForm({ onSubmit }: { onSubmit: (name: string, cost: number, dueDate: string | null) => void }) {
  const [name, setName] = useState('')
  const [cost, setCost] = useState('')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return alert('Nome obrigatório')
    onSubmit(name, Number(cost) || 0, dueDate || null)
    setName(''); setCost(''); setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <input placeholder="Nome da tarefa" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Custo (R$)" type="number" step="0.01" value={cost} onChange={e => setCost(e.target.value)} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button type="submit">Incluir</button>
    </form>
  )
}