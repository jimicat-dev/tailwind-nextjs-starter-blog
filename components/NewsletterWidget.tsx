'use client'

import { useState } from 'react'

export default function NewsletterWidget() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-sm text-[#1A4D3A]">已訂閱，感謝！</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-sm text-gray-500">訂閱最新文章，直送信箱。</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-[#112E23] placeholder-gray-400 focus:border-[#1A4D3A] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded bg-[#1A4D3A] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8B2635] disabled:opacity-60"
      >
        {status === 'loading' ? '訂閱中...' : '訂閱'}
      </button>
      {status === 'error' && <p className="text-xs text-red-500">訂閱失敗，請稍後再試。</p>}
    </form>
  )
}
