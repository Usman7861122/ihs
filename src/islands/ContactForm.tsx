import { useState, type FormEvent } from 'react';

interface Props { endpoint: string; interests: string[] }
const field = 'mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 text-[16px] text-ink outline-none transition-all duration-300 placeholder:text-black/35 hover:border-brand/50 focus:border-brand focus:shadow-[0_0_0_4px_rgba(201,111,58,0.15)]';
const label = 'block text-[14px] font-semibold text-black/70';

export default function ContactForm({ endpoint, interests }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // honeypot: bots fill this hidden field
    if (!endpoint) {
      setState('error');
      setMsg('This form is not connected yet. Please try again soon.');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...data, page: location.href }) });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      form.reset();
    } catch {
      setState('error');
      setMsg('Something went wrong. Please check your details and try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-white p-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand text-3xl text-white">✓</span>
        <h2 className="mt-6 text-[30px] font-medium">Thank you!</h2>
        <p className="mt-3 max-w-[420px] text-[17px] leading-8 text-black/60">We got your message. Our team will contact you soon, usually within one business day.</p>
        <button type="button" onClick={() => setState('idle')} className="btn btn-outline btn-sm mt-7"><span className="btn-label">Send another message</span></button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-7 md:p-10">
      <h2 className="text-[28px] font-medium">Get your free consultation</h2>
      <p className="mt-2 text-[16px] leading-7 text-black/60">Please do not include patient names or health details.</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="name" className={label}>Full name *</label><input id="name" name="name" required autoComplete="name" placeholder="Dr. Jane Smith" className={field} /></div>
        <div><label htmlFor="practice" className={label}>Practice name *</label><input id="practice" name="practice" required placeholder="Smith Orthopedics" className={field} /></div>
        <div><label htmlFor="email" className={label}>Email *</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@practice.com" className={field} /></div>
        <div><label htmlFor="phone" className={label}>Phone *</label><input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="(626) 555-0123" className={field} /></div>
        <div className="sm:col-span-2">
          <label htmlFor="interest" className={label}>What do you need help with?</label>
          <select id="interest" name="interest" defaultValue="" className={field}>
            <option value="">Choose one</option>
            {interests.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2"><label htmlFor="website-url" className={label}>Your website (if you have one)</label><input id="website-url" name="site" type="url" placeholder="https://" className={field} /></div>
        <div className="sm:col-span-2"><label htmlFor="message" className={label}>Message</label><textarea id="message" name="message" rows={4} placeholder="Tell us about your goals" className={field} /></div>
      </div>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14.5px] leading-6 text-black/60">
        <input type="checkbox" name="consent" required className="mt-1 size-4 accent-[#C96F3A]" />
        <span>I agree that Iron Health Solutions may contact me about my request. Read our <a href="/privacy-policy/" className="text-brand underline underline-offset-4">Privacy Policy</a>.</span>
      </label>
      {state === 'error' && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-700">{msg}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn btn-outline btn-lg mt-6 disabled:opacity-60"><span className="btn-label">{state === 'sending' ? 'Sending…' : 'Send my request'}</span></button>
    </form>
  );
}
