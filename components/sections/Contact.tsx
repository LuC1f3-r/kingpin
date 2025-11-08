'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(2, 'We need a signal to lock onto.'),
  email: z.string().email('Transmit a valid frequency.'),
  message: z.string().min(10, 'Tell us more so the forge can adapt.')
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  return (
    <section id="contact" className="section-shell">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Initiate Connection</p>
          <h2 className="font-heading text-4xl md:text-5xl">Connect with the Forge</h2>
          <p className="text-muted-foreground">
            Ready to merge the future intelligence of your brand? Transmit your signal and our custodians will return shortly with a personalized ritual.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function ContactForm({ compact, onSuccess }: { compact?: boolean; onSuccess?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'sent'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const playPing = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    const context = new AudioCtor();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = 'sine';
    osc.frequency.value = 640;
    gain.gain.value = 0.001;
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + 0.2);
    osc.onended = () => context.close();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setStatus('pending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setStatus('sent');
        playPing();
        reset();
        onSuccess?.();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className={`glass-panel space-y-4 rounded-3xl border border-white/10 ${compact ? 'p-4' : 'p-6'}`}
      aria-live="assertive"
    >
      <div>
        <label className="text-xs uppercase tracking-[0.3em]">Name</label>
        <input
          {...register('name')}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Cipher name"
        />
        {errors.name && <p className="mt-1 text-xs text-warning">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em]">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="relay@domain.com"
        />
        {errors.email && <p className="mt-1 text-xs text-warning">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.3em]">Message</label>
        <textarea
          {...register('message')}
          className="mt-2 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
          placeholder="Tell us about the neural frontier you want to explore."
        />
        {errors.message && <p className="mt-1 text-xs text-warning">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={status === 'pending'}>
        {status === 'pending' ? 'Transmitting…' : status === 'sent' ? 'Signal Locked' : 'Transmit Signal'}
      </Button>
    </form>
  );
}
