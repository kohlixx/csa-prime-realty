import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion as RadixAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FaqAccordion — reusable FAQ list with luxury styling.
 * Wraps shadcn Accordion; data injected via props.
 */

export interface FaqItem {
  id?: string | number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export function FaqAccordion({
  items,
  className,
  defaultOpen,
}: {
  items: FaqItem[];
  className?: string;
  defaultOpen?: string;
}) {
  return (
    <RadixAccordion
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className={cn("divide-y divide-border rounded-3xl border border-border bg-card shadow-luxury-card", className)}
    >
      {items.map((item, i) => {
        const value = String(item.id ?? i);
        return (
          <AccordionItem key={value} value={value} className="border-0 px-6 first:pt-2 last:pb-2">
            <AccordionTrigger className="py-5 text-left text-[15px] font-medium text-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="pr-4">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pr-8 text-sm leading-relaxed text-text-secondary text-pretty">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </RadixAccordion>
  );
}
