import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profile } from '../../data';
import { Reveal } from '../shared/Reveal';

type ContactFormValues = { name: string; email: string; subject: string; message: string; website: string };
const initialContactForm: ContactFormValues = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [fields, setFields] = useState<ContactFormValues>(initialContactForm);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const mounted = useRef(true);
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const configured = Boolean(serviceId && templateId && publicKey);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; window.clearTimeout(timeoutRef.current); };
  }, []);

  const updateField = (key: keyof ContactFormValues, value: string) => {
    setFields(previous => ({ ...previous, [key]: value }));
    if (result) setResult(null);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || fields.website) return; // Honeypot field: silently ignore bot submissions
    const name = fields.name.trim();
    const email = fields.email.trim();
    const subject = fields.subject.trim();
    const message = fields.message.trim();
    if (!name || !email || !subject || !message) {
      setResult({ type: 'error', message: 'Please complete all fields before sending.' });
      return;
    }
    if (!configured) {
      const body = `Name: ${name}\nReply-to: ${email}\n\n${message}`;
      const draft = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setResult({ type: 'info', message: 'EmailJS is not connected yet. Your email app is opening with the message ready to send.' });
      window.location.href = draft;
      return;
    }
    setSending(true);
    setResult(null);
    try {
      await emailjs.send(serviceId!, templateId!, {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject,
        message,
        to_name: profile.fullName,
      }, { publicKey: publicKey! });
      if (mounted.current) {
        setResult({ type: 'success', message: 'Your message has been sent successfully. Thank you for reaching out!' });
        setFields(initialContactForm);
      }
    } catch {
      if (mounted.current) {
        setResult({ type: 'error', message: `Message could not be sent. Please email me directly at ${profile.email}.` });
      }
    } finally {
      if (mounted.current) setSending(false);
    }
  };

  return <section id="contact" className="contact section-anchor">
    <div className="contact-orb" />
    <div className="wrap contact-inner">
      <Reveal>
        <div className="eyebrow contact-eyebrow"><span className="availability-light" /> 06 / LET'S COLLABORATE</div>
        <span className="contact-sub">HAVE AN IDEA? LET'S BUILD SOMETHING GREAT.</span>
        <h2>LET'S MAKE<br/><i>IT <span>UNREAL</span><span className="contact-asterisk">✳</span></i></h2>
        <div className="contact-action-row flex flex-wrap items-center">
          <a className="contact-main-btn" href={`mailto:${profile.email}?subject=Let%27s%20create%20something%20amazing`}>EMAIL ME DIRECTLY <span><ArrowUpRight size={32}/></span></a>
          <button className="contact-copy" type="button" onClick={copyEmail}>{copied ? <Check size={19}/> : <Copy size={19}/>} {copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</button>
          <a className="hero-cv-link" href={profile.resume} download="Sankalpa_Sithmina_CV.pdf"><Download size={17} /> DOWNLOAD CV</a>
        </div>
      </Reveal>
      <Reveal className="contact-form-block" delay={0.15}>
        <div className="contact-form-intro"><span>CONTACT PORTAL / 001</span><span className="contact-live-indicator"><span className="availability-light" /> {configured ? 'DIRECT MESSAGING' : 'EMAIL DRAFT MODE'}</span></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-fields-grid">
            <label className="contact-field">YOUR NAME <input name="from_name" type="text" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={100} required value={fields.name} onChange={e => updateField('name', e.target.value)}/></label>
            <label className="contact-field">EMAIL ADDRESS <input name="from_email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required value={fields.email} onChange={e => updateField('email', e.target.value)}/></label>
          </div>
          <label className="contact-field">SUBJECT <input name="subject" type="text" placeholder="What would you like to build?" maxLength={180} required value={fields.subject} onChange={e => updateField('subject', e.target.value)}/></label>
          <label className="contact-field">MESSAGE <textarea name="message" placeholder="Tell me about your project, idea or collaboration..." rows={5} minLength={10} maxLength={5000} required value={fields.message} onChange={e => updateField('message', e.target.value)}/></label>
          <label className="contact-honeypot" aria-hidden="true">Website <input type="text" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={e => updateField('website', e.target.value)}/></label>
          {result && <p className={`contact-result ${result.type}`} role="status" aria-live="polite">{result.message}</p>}
          <div className="contact-form-footer"><span>{configured ? 'SECURE EMAILJS DELIVERY' : 'CONNECT EMAILJS TO SEND DIRECTLY'}</span><button className="contact-send-btn" type="submit" disabled={sending}><span>{sending ? 'SENDING...' : configured ? 'SEND MESSAGE' : 'OPEN EMAIL DRAFT'}</span><Send size={18}/></button></div>
        </form>
        {!configured && <p className="contact-emailjs-hint">Direct form delivery activates once EmailJS IDs are configured. Until then, the form opens your email app with your message prefilled.</p>}
      </Reveal>
      <div className="contact-lower">
        <div className="contact-available"><span className="availability-light" /> {profile.availability.toUpperCase()}</div>
        <div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer">GITHUB <Github size={17}/><ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN <Linkedin size={17}/><ArrowUpRight size={14}/></a><a href={`mailto:${profile.email}`}>EMAIL <ArrowUpRight size={14}/></a></div>
      </div>
    </div>
  </section>;
}
