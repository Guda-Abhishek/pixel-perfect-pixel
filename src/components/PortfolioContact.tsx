import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Copy, FileDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, PORTFOLIO_FILES } from "@/lib/contact-schema";
import { CONTACT } from "@/lib/portfolio-data";
const reveal = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: .3 } };
export function PortfolioContact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Portfolio enquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFeedback("");
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    const data = result.data;
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setFeedback("Email draft prepared. Send it in your email app; no message has been sent from this website.");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setCopyFeedback("Email copied to clipboard."); }
    catch { setCopyFeedback("Could not copy. Select the email address to copy it manually."); }
  };
  const field = "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground";
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border px-5 py-14 sm:px-12"><div className="mx-auto max-w-7xl"><p className="mb-2 text-xs text-primary">LET’S BUILD WHAT COMES NEXT</p><h2 className="mb-8 text-4xl font-bold sm:text-5xl">Ready for the Next Episode?</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div {...reveal} className="space-y-5 py-4 font-sans text-sm">
          <p className="text-accent">LET’S CONNECT</p>
          <div className="flex flex-wrap items-center justify-between gap-2"><span className="min-w-0 break-all"><span className="text-muted-foreground">email:</span> <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">{CONTACT.email}</a></span><Button variant="bare" size="auto" onClick={copy} aria-label="Copy email" className="min-h-11 min-w-11 rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent"><Copy />{copied ? "Copied" : "Copy"}</Button></div>
          <p><span className="text-muted-foreground">phone:</span> <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-accent">{CONTACT.phone}</a></p>
          <p><span className="text-muted-foreground">location:</span> {CONTACT.location}</p>
          <p role="status" className="text-xs text-accent">{copyFeedback}</p>
          <div className="flex flex-wrap gap-3 pt-4">
            {CONTACT.linkedin && <Button variant="portfolio" asChild><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></Button>}
            {CONTACT.github && <Button variant="portfolio" asChild><a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a></Button>}
            {PORTFOLIO_FILES.resume ? <Button variant="portfolio" asChild><a href={PORTFOLIO_FILES.resume} download><FileDown /> Resume</a></Button> : <p className="text-xs text-muted-foreground">Resume PDF available after upload</p>}
          </div>
        </motion.div>
        <motion.form {...reveal} onSubmit={submit} noValidate className="glass space-y-4 rounded-lg p-5 sm:p-8">
          {(["name", "email"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`contact-${k}`} className="mb-2 block text-xs font-medium capitalize">{k}</label>
              <input id={`contact-${k}`} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `error-${k}` : undefined} required autoComplete={k === "subject" ? "off" : k} aria-label={k} placeholder={k.charAt(0).toUpperCase() + k.slice(1)} type={k === "email" ? "email" : "text"} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={field} maxLength={k === "subject" ? 150 : k === "email" ? 255 : 100} />
              {errors[k] && <p id={`error-${k}`} role="alert" className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-xs font-medium">Message</label>
            <textarea id="contact-message" required aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "error-message" : undefined} aria-label="message" placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} maxLength={2000} />
            {errors["message"] && <p id="error-message" role="alert" className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>
          <Button variant="bare" size="auto" type="submit" className="w-full rounded-md bg-primary py-3 font-display text-xs font-bold text-primary-foreground transition-shadow hover:shadow-neon"><Mail /> OPEN EMAIL APP</Button>
          <p className="text-xs leading-relaxed text-muted-foreground">Opens your email app. Messages are not delivered by this website.</p>
          <p role="status" className="text-xs leading-relaxed text-accent">{feedback}</p>
        </motion.form>
      </div>
    </div></section>
  );
}
