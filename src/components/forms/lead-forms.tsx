import * as React from "react";
import { Send, ArrowRight, User, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/input";

/**
 * Form shells — presentational only.
 * onSubmit receives typed values; page/feature code wires it to server fns.
 */

/* ---------------- NewsletterForm ---------------- */
export interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  onSubscribe?: (email: string) => void | Promise<void>;
  loading?: boolean;
  variant?: "inline" | "stacked";
}

export function NewsletterForm({ onSubscribe, loading, variant = "inline", className, ...props }: NewsletterFormProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email.");
    await onSubscribe?.(email);
    setSuccess(true);
    setEmail("");
  };

  if (variant === "stacked") {
    return (
      <form onSubmit={submit} className={cn("space-y-3", className)} {...props}>
        <FloatingInput
          type="email"
          label="Email address"
          leftIcon={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error ?? undefined}
          success={success ? "You're subscribed. Watch your inbox." : undefined}
        />
        <Button type="submit" size="lg" className="w-full" loading={loading} rightIcon={<ArrowRight />}>
          Subscribe to launch alerts
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={cn(
        "flex w-full max-w-md items-center gap-1.5 rounded-full border border-border bg-card p-1.5 shadow-luxury-sm",
        className,
      )}
      {...props}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for property drops"
        className="h-11 flex-1 rounded-full border-0 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-text-tertiary"
        aria-label="Email"
      />
      <Button type="submit" variant="default" size="default" loading={loading}>
        <Send />
        Subscribe
      </Button>
    </form>
  );
}

/* ---------------- LeadForm / ContactForm ---------------- */
export interface LeadFormValues {
  name: string;
  phone: string;
  email: string;
  message?: string;
}

export interface LeadFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (values: LeadFormValues) => void | Promise<void>;
  loading?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string;
  includeMessage?: boolean;
  compact?: boolean;
}

export function LeadForm({
  onSubmit,
  loading,
  title = "Get in touch",
  description = "A property expert will reach out within 10 minutes.",
  submitLabel = "Request callback",
  includeMessage = true,
  compact = false,
  className,
  ...props
}: LeadFormProps) {
  const [values, setValues] = React.useState<LeadFormValues>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Partial<Record<keyof LeadFormValues, string>>>({});

  const update = <K extends keyof LeadFormValues>(k: K, v: LeadFormValues[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^\+?[\d\s-]{8,}$/.test(values.phone)) next.phone = "Enter a valid phone number.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length === 0) await onSubmit?.(values);
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "space-y-5 rounded-3xl border border-border bg-card p-6 shadow-luxury-card sm:p-8",
        compact && "p-5 sm:p-6",
        className,
      )}
      {...props}
    >
      {title || description ? (
        <div>
          {title ? <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
        </div>
      ) : null}
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <FloatingInput
          label="Full name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          leftIcon={<User />}
          error={errors.name}
          autoComplete="name"
        />
        <FloatingInput
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          leftIcon={<Phone />}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>
      <FloatingInput
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        leftIcon={<Mail />}
        error={errors.email}
        autoComplete="email"
      />
      {includeMessage ? (
        <div>
          <textarea
            placeholder="Tell us what you're looking for (BHK, budget, location)…"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
            className={cn(
              "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-text-tertiary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:border-accent/60",
            )}
          />
        </div>
      ) : null}
      <Button type="submit" size="lg" className="w-full" loading={loading} rightIcon={<ArrowRight />}>
        {submitLabel}
      </Button>
      <p className="text-center text-[11px] leading-relaxed text-text-tertiary">
        By submitting this form you agree to our terms of service and privacy policy.
      </p>
    </form>
  );
}

/** ContactForm — alias for LeadForm with different defaults. */
export function ContactForm(props: LeadFormProps) {
  return <LeadForm title="Send us a message" submitLabel="Send message" {...props} />;
}
