import { useState } from "react";
import { MessageCircle, X, Send, PhoneCall, Sparkles } from "lucide-react";

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Apna WhatsApp number yahan daalein (country code ke sath, bina + ke)
    const phoneNumber = "919876543210"; 
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Box Popup Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-card border border-accent/30 rounded-3xl shadow-2xl p-5 animate-scale-in backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h4 className="font-serif text-white font-bold text-base">CSA Advisory Desk</h4>
                <p className="text-[10px] text-accent uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse"></span> Online • Reply in minutes
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 text-xs text-zinc-300 leading-relaxed">
              👋 Hello! Looking for luxury properties or high-yield investments in Noida & Yamuna Expressway? How can our experts help you today?
            </div>
          </div>

          <form onSubmit={handleWhatsAppSend} className="flex flex-col gap-2.5">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your inquiry here..."
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent transition-colors"
              required
            />
            <div className="flex items-center justify-between pt-1">
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-accent transition-colors"
              >
                <PhoneCall className="size-3.5 text-accent" /> Call Direct
              </a>
              <button 
                type="submit"
                className="inline-flex items-center gap-2 bg-accent text-background font-semibold px-4 py-2 rounded-xl text-xs hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
              >
                <Send className="size-3.5" /> Send on WhatsApp
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Trigger Button with Pulse Animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative size-14 rounded-full bg-accent text-background flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:scale-105 transition-all duration-300 animate-pulse-ring"
        aria-label="Open Help Chat"
      >
        {isOpen ? (
          <X className="size-6 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="size-6 transition-transform duration-300 group-hover:scale-110" />
        )}
        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-green-500 border-2 border-background"></span>
      </button>
    </div>
  );
}