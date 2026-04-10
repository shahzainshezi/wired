"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Mail, Phone, ArrowUp } from "lucide-react";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const NAV_LINKS = [
  { label: "Product", href: "#services" },
  { label: "The Problem", href: "#msps" },
  { label: "The Shift", href: "#tech" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Insights", href: "#insights" },
];

const FOOTER_GROUPS: { title: string; links: { label: string; href: string; icon?: React.ReactNode }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Product", href: "#services" },
      { label: "Features", href: "#how-it-works" },
      { label: "The Problem", href: "#msps" },
      { label: "The Shift", href: "#tech" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#insights" },
      { label: "Support", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "+1 (555) 000-0000", href: "tel:+15550000000", icon: <Phone size={14} /> },
      { label: "hello@mspwired.com", href: "mailto:hello@mspwired.com", icon: <Mail size={14} /> },
      { label: "San Francisco, CA", href: "#", icon: <MapPin size={14} /> },
    ],
  },
];


const HERO_STATS = [
  { line1: "Automated follow-up", line2: "for every lead" },
  { line1: "Full pipeline", line2: "visibility" },
  { line1: "Proven sales motion", line2: "built-in" },
];

const TOOL_BADGES = ["HubSpot", "Insight PRM", "GoHighLevel", "Klenty", "Meet Alfred", "GlassHive"];

const SERVICES = [
  {
    title: "Automated Follow-Up",
    desc: "Every lead is tracked and followed up automatically — without relying on memory, sticky notes, or manual reminders.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Pipeline Visibility",
    desc: "Know exactly where every deal stands at a glance. No spreadsheet archaeology. No status meetings.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Built-In Sales Motion",
    desc: "Your team always knows the next step. MSPWired installs a proven sales process directly into your business.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Revenue Visibility",
    desc: "Understand what's likely to close before month-end surprises. Forecast with confidence, not guesswork.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "MSP-Focused Design",
    desc: "Built specifically for managed service providers — not adapted from a generic enterprise sales platform.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "One Unified System",
    desc: "Replace the patchwork of CRM, spreadsheets, email, and SMS with a single system that keeps everything moving.",
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const MSP_ITEMS = [
  "Missed follow-ups that stall your own deals",
  "Disconnected tools that create operational friction",
  "Limited pipeline visibility and no forecast clarity",
  "Manual work that keeps your team from actually selling",
];

const TECH_ITEMS = [
  "Every lead gets consistent, automatic follow-up",
  "Your pipeline stays organized and current",
  "You can see what's likely to close before month-end",
  "Your team spends time selling, not tracking status",
];

const STEPS = [
  {
    number: "01",
    title: "Automate",
    desc: "Follow-up is handled automatically for every lead — no manual reminders, no dropped balls, no relying on memory.",
  },
  {
    number: "02",
    title: "Organize",
    desc: "Your pipeline stays clean, current, and easy to read at a glance so you always know where each deal stands.",
  },
  {
    number: "03",
    title: "Forecast",
    desc: "Gain clear visibility into what's likely to close before month-end surprises catch you off guard.",
  },
  {
    number: "04",
    title: "Sell",
    desc: "Your team always knows the next best action — spending time closing revenue instead of chasing status updates.",
  },
];

const PROOF_POINTS = [
  {
    label: "Not Another Tool",
    title: "A working system, not just features",
    body: "Most platforms give you features. MSPWired gives you a working system designed for MSPs, so you don't have to build one from scratch.",
  },
  {
    label: "MSP-Specific",
    title: "Built for how MSPs actually sell",
    body: "MSPWired is purpose-built for managed service providers — not a generic CRM adapted after the fact. It fits how you work.",
  },
  {
    label: "Who It's For",
    title: "Teams ready to stop patching their process",
    body: "MSP owners running sales themselves, small teams without a defined process, and leaders tired of managing multiple tools.",
  },
];

const BLOG_POSTS = [
  {
    tag: "Sales Automation",
    title: "Why MSP Sales Teams Keep Missing Follow-Ups — And How to Fix It for Good",
    date: "March 12, 2025",
  },
  {
    tag: "Pipeline Management",
    title: "How MSPs Can Get Full Pipeline Visibility Without Complex CRM Configurations",
    date: "February 28, 2025",
  },
  {
    tag: "Sales Process",
    title: "Installing a Proven Sales Motion: What MSPs Need to Know Before They Scale",
    date: "February 10, 2025",
  },
];

const BUILD_LIST = [
  "Automated follow-up for every lead in your pipeline",
  "Organized deal tracking with clear next-step guidance",
  "Revenue forecasting without spreadsheet guesswork",
  "Built-in sales motion proven for MSP businesses",
  "Full pipeline visibility across your entire team",
  "One unified system replacing disconnected tools",
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function FadeUp({ children, delay = 0, className = "", style = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      ...style
    }}>
      {children}
    </div>
  );
}

/* Blue gradient for text */
const OliveGrad = ({ children }: { children: React.ReactNode }) => (
  <span style={{ background: "linear-gradient(135deg, #8ea10a 0%, #c4db0d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
    {children}
  </span>
);

/* Check icon */
const Check = () => (
  <svg width="16" height="16" fill="none" stroke="#000000" strokeWidth="2.5" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

/* Dot bullet */
const Dot = () => <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4db0d", flexShrink: 0, marginTop: 7, display: "inline-block" }} />;

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function Home() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const showToTop = useScrolled(400);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ── NAVBAR ── */
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#141414", background: "#F2F3F5" }}>

      {/* NAV */}
      <header style={{
        position: "fixed",
        top: scrolled ? 0 : 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: scrolled ? "100%" : "calc(100% - 48px)",
        maxWidth: scrolled ? "none" : 1200,
        zIndex: 100,
        background: scrolled ? "rgba(20,20,20,0.98)" : "rgba(20,20,20,0.92)",
        backdropFilter: "blur(16px)",
        borderRadius: scrolled ? 0 : 13,
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "0 20px 60px rgba(0,0,0,0.45)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        height: 64,
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 45px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src="/logowired-D9tohZN6.png"
              alt="Wired"
              style={{ height: 44, width: "auto", objectFit: "contain" }}
            />
          </a>

          {/* Desktop nav — centered */}
          <nav style={{
            display: "flex", gap: 4, alignItems: "center", position: "absolute", left: "50%", transform: "translateX(-50%)"
          }} className="hidden md:flex">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{
                padding: "8px 16px", borderRadius: 100, fontSize: 13, fontWeight: 500,
                color: "rgba(255,255,255,0.8)", textDecoration: "none", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = "#fff"; (e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)"; (e.target as HTMLAnchorElement).style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* CTA */}
          <a href="#contact" className="btn-primary hidden md:inline-flex" style={{
            padding: "8px 20px", fontSize: 13, borderRadius: 100,
            background: "linear-gradient(135deg, #c4db0d 0%, #8ea10a 100%)"
          }}>
            Book a Demo
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu — adjusted for dock */}
        {menuOpen && (
          <div style={{
            position: "absolute", top: 72, left: 0, right: 0,
            background: "rgba(20,20,20,0.98)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: "16px 8px", display: "flex", flexDirection: "column", gap: 4,
            width: "100%", zIndex: -1,
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)"
          }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ padding: "12px 20px", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.8)", textDecoration: "none", borderRadius: 100 }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ padding: "12px 18px", fontSize: 14, marginTop: 8, textAlign: "center", justifyContent: "center", textDecoration: "none", borderRadius: 100 }}>
              Book a Demo
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section style={{ 
        paddingTop: 165, paddingBottom: 100, 
        backgroundImage: "linear-gradient(to right, rgba(10, 12, 14, 0.96) 20%, rgba(10, 12, 14, 0.7) 40%, rgba(196, 219, 13, 0.25) 100%), url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow effect */}
        <div style={{
          position: "absolute", top: "20%", left: "5%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(196, 219, 13, 0.1) 0%, transparent 70%)",
          filter: "blur(80px)", zIndex: 0, pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-hero">
            {/* Left */}
            <div style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {/* Badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(196, 219, 13, 0.15)", border: "1px solid rgba(196, 219, 13, 0.4)",
                borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600,
                color: "#c4db0d", marginBottom: 24,
                textShadow: "none"
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4db0d" }} />
                MSP Sales Automation &amp; Forecasting
              </div>

              <h1 style={{ 
                fontSize: "3.4rem", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", 
                marginBottom: 24, color: "#fff",
              }}>
                Build a Sales Engine That Just Works Even When You're Busy.
              </h1>

              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 40, maxWidth: 520 }}>
                Most MSP sales systems are held together with disconnected tools and manual follow-up.
                MSPWired gives you one system that keeps everything moving.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <a href="#how-it-works" className="btn-primary" style={{ padding: "14px 28px", fontSize: 15, textDecoration: "none" }}>
                  See How It Works
                  <svg width="18" height="18" fill="none" stroke="#000000" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#contact" className="btn-outline" style={{ 
                  padding: "14px 28px", fontSize: 15, textDecoration: "none", 
                  color: "#141414", borderColor: "rgba(255,255,255,0.2)" 
                }}>
                  Book a Demo
                </a>
              </div>

              {/* 3 stat pills */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {HERO_STATS.map((s) => (
                  <div key={s.line1} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 12, padding: "14px 16px",
                  }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{s.line1}</p>
                    <p style={{ fontSize: 12, color: "#c4db0d", fontWeight: 600, lineHeight: 1.3, marginTop: 4 }}>{s.line2}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero card */}
            <div>
              <div style={{
                background: "#fff", border: "1.5px solid #E6E8EC", borderRadius: 20,
                padding: 28, boxShadow: "0 8px 40px rgba(77,94,46,0.10), 0 2px 8px rgba(0,0,0,0.05)",
              }}>
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#c4db0d", marginBottom: 4 }}>
                      Sales Automation
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#141414" }}>Purpose-built for MSPs</p>
                  </div>
                  {/* Robot icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "linear-gradient(135deg, #e9f2a7 0%, #d5e65a 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="26" height="26" fill="none" stroke="#8ea10a" strokeWidth="1.6" viewBox="0 0 24 24">
                      <rect x="5" y="6" width="14" height="12" rx="2" />
                      <path d="M8 6V4a4 4 0 018 0v2" />
                      <circle cx="9" cy="12" r="1.5" fill="#8ea10a" />
                      <circle cx="15" cy="12" r="1.5" fill="#8ea10a" />
                      <path d="M9 16h6" />
                      <path d="M2 12h3M19 12h3" />
                    </svg>
                  </div>
                </div>

                {/* Stat */}
                <div style={{
                  background: "linear-gradient(135deg, #d5e65a 0%, #c4db0d 100%)",
                  borderRadius: 12, padding: "14px 18px", marginBottom: 20,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)",
                }}>
                  <p style={{ fontSize: 13, color: "#000000", opacity: 0.8, fontWeight: 600 }}>Pipeline Growth</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "#000000", letterSpacing: "-0.03em" }}>+127%</p>
                </div>

                {/* Feature list */}
                <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Every lead tracked and followed up automatically",
                    "Pipeline organized and visible at all times",
                    "Built-in sales motion your team can follow",
                    "Revenue forecast without spreadsheet guesswork",
                  ].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <Check />
                      <span style={{ fontSize: 13, color: "#555", lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Works with */}
                <div style={{ borderTop: "1px solid #E6E8EC", paddingTop: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 10 }}>
                    Works with
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {TOOL_BADGES.map(t => (
                      <span key={t} style={{
                        fontSize: 11, fontWeight: 600, padding: "4px 10px",
                        background: "#f4f8e0", border: "1px solid #d5e65a",
                        borderRadius: 6, color: "#8ea10a",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom badges */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ background: "#F2F3F5", border: "1px solid #E6E8EC", borderRadius: 10, padding: "10px 14px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#c4db0d", marginBottom: 2 }}>Automated</p>
                    <p style={{ fontSize: 11, color: "#555" }}>Follow-up for every lead</p>
                  </div>
                  <div style={{ background: "#F2F3F5", border: "1px solid #E6E8EC", borderRadius: 10, padding: "10px 14px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#c4db0d", marginBottom: 2 }}>Forecasting</p>
                    <p style={{ fontSize: 11, color: "#555" }}>Revenue visibility built-in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: "#F2F3F5", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c4db0d", marginBottom: 12 }}>
                Core Capabilities
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 12 }}>
                Everything an MSP needs to <OliveGrad>run a consistent sales operation.</OliveGrad>
              </h2>
              <p style={{ fontSize: 16, color: "#555", maxWidth: 580, lineHeight: 1.6 }}>
                MSPWired gives MSP sales teams the automation, visibility, and process they need to stop
                patching things together and start operating like a unified system.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 40 }}>
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 60}>
                <div className="card-shadow-hover" style={{
                  background: "#fff", border: "1px solid #E6E8EC",
                  borderRadius: 14, padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, marginBottom: 16,
                    background: "linear-gradient(135deg, #e9f2a7 0%, #d5e65a 100%)",
                    color: "#8ea10a", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#141414", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MSPs + TECH ── */}
      <section id="msps" style={{ background: "#fff", padding: "100px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* Row 1: The Problem (ZigZag: Image Left, Content Right) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "stretch", marginBottom: 120 }} className="grid-hero">
            <FadeUp style={{ height: "100%" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", height: "100%" }}>
                <img
                  src="/happy-person.png"
                  alt="Sales Success"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                />
              </div>
            </FadeUp>
            <FadeUp delay={100} style={{ height: "100%" }}>
              <div className="card-shadow" style={{
                border: "1px solid #E6E8EC", borderRadius: 24, padding: 40,
                background: "#fff", height: "100%",
              }}>
                <span style={{
                  display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", background: "#f4f8e0", border: "1px solid #d5e65a",
                  borderRadius: 20, padding: "4px 12px", color: "#8ea10a", marginBottom: 24,
                }}>The Problem</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
                  Your sales stack shouldn't feel like it's <OliveGrad>held together with duct tape.</OliveGrad>
                </h2>
                <p style={{ fontSize: 16, color: "#555", marginBottom: 32, lineHeight: 1.6 }}>
                  CRM. Spreadsheets. Email. SMS. Individually, they work. Together, they don't. Stop missing
                  follow-ups and stalling your own deals.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {MSP_ITEMS.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#141414" }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: "linear-gradient(135deg, #e9f2a7 0%, #d5e65a 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Check />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* Row 2: The Shift (ZigZag: Content Left, Image Right) */}
          <div id="tech" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "stretch" }} className="grid-hero">
            <FadeUp style={{ height: "100%" }}>
              <div className="card-shadow" style={{
                border: "1.5px solid #d5e65a", borderRadius: 24, padding: 40,
                background: "linear-gradient(145deg, #f4f8e0 0%, #fff 60%)", height: "100%",
              }}>
                <span style={{
                  display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", background: "#e9f2a7", border: "1px solid #d5e65a",
                  borderRadius: 20, padding: "4px 12px", color: "#8ea10a", marginBottom: 24,
                }}>The Shift</span>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
                  One system. One process. <OliveGrad>No duct tape solutions.</OliveGrad>
                </h2>
                <p style={{ fontSize: 16, color: "#555", marginBottom: 32, lineHeight: 1.6 }}>
                  MSPWired replaces fragmented tools with a unified, enterprise-ready sales motion
                  purpose-built for MSPs — so your team always knows what to do next.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {TECH_ITEMS.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#141414" }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        background: "linear-gradient(135deg, #d5e65a 0%, #c4db0d 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Check />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={100} className="order-first-mobile" style={{ height: "100%" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", height: "100%" }}>
                <img
                  src="/shift-tech.png"
                  alt="MSPWired Solution"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: "#F2F3F5", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c4db0d", marginBottom: 12 }}>
              What Is MSPWired?
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 12 }}>
              Built specifically <OliveGrad>for MSP sales.</OliveGrad>
            </h2>
            <p style={{ fontSize: 16, color: "#555", maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
              MSPWired is a sales automation and forecasting system that installs a proven sales motion into
              your business. Stop guessing at what's next. Know with MSPWired.
            </p>
          </FadeUp>

          {/* 4 steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }} className="grid-steps">
            {STEPS.map((step, i) => (
              <FadeUp key={step.number} delay={i * 80} style={{ height: "100%" }}>
                <div className="card-shadow-hover" style={{
                  background: "#fff", border: "1px solid #E6E8EC",
                  borderRadius: 14, padding: 24,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  position: "relative",
                  height: "100%",
                }}>
                  <p style={{
                    fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em",
                    background: "linear-gradient(135deg, #d5e65a 0%, #90C4F0 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: 12, lineHeight: 1,
                  }}>{step.number}</p>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#141414", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Customized engagement box */}
          <FadeUp delay={200}>
            <div style={{
              background: "#fff", border: "1px solid #E6E8EC", borderRadius: 16, padding: 32,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="grid-cols-2-mobile">
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#141414", marginBottom: 12 }}>See how it works in practice</h3>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
                    The best way to understand MSPWired is to see it. Book a 20-minute demo and watch how
                    the system handles follow-up, organizes pipeline, and gives you clear revenue visibility.
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#c4db0d", marginBottom: 6 }}>Why MSPs choose MSPWired</p>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                    Stop guessing, stop patching, and stop losing deals to follow-up gaps. MSPWired installs
                    a proven sales process that runs consistently — with or without you watching.
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#c4db0d", marginBottom: 14 }}>What MSPWired delivers</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {BUILD_LIST.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#555", lineHeight: 1.4 }}>
                        <Dot />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PROOF POINTS ── */}
      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c4db0d", marginBottom: 12 }}>
              Why MSPWired
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
              Not another tool to configure. <OliveGrad>A system that works.</OliveGrad>
            </h2>
            <p style={{ fontSize: 15, color: "#555", maxWidth: 640, lineHeight: 1.6, marginBottom: 48 }}>
              Most platforms give you features. MSPWired gives you a working system designed for MSPs,
              so you don't have to build one from scratch or hire a consultant to make sense of it.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-cols-3-mobile">
            {PROOF_POINTS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 80} style={{ height: "100%" }}>
                <div className="card-shadow-hover" style={{
                  border: "1px solid #E6E8EC", borderRadius: 16, padding: 28,
                  background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  height: "100%",
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#c4db0d", marginBottom: 10 }}>
                    {p.label}
                  </p>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#141414", marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS / BLOG ── */}
      <section id="insights" style={{ background: "#F2F3F5", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <FadeUp>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c4db0d", marginBottom: 10 }}>
                  Insights
                </p>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
                  Fresh thinking from <OliveGrad>the MSPWired blog.</OliveGrad>
                </h2>
                <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, marginTop: 10, maxWidth: 520 }}>
                  Practical articles on MSP sales operations, pipeline management, automation, and
                  building a sales process that works without constant manual effort.
                </p>
              </div>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 14, fontWeight: 600, color: "#8ea10a", textDecoration: "none",
              }}>
                Book a demo
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-cols-3-mobile">
            {BLOG_POSTS.map((post, i) => (
              <FadeUp key={post.title} delay={i * 80}>
                <a href="#" style={{ textDecoration: "none", display: "block" }}>
                  <div className="card-shadow-hover" style={{
                    background: "#fff", border: "1px solid #E6E8EC",
                    borderRadius: 14, padding: 24,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{
                      display: "inline-block", fontSize: 11, fontWeight: 700,
                      background: "#f4f8e0", border: "1px solid #d5e65a",
                      borderRadius: 20, padding: "3px 10px", color: "#8ea10a", marginBottom: 14,
                    }}>{post.tag}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#141414", lineHeight: 1.45, marginBottom: 16 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 12, color: "#888" }}>{post.date}</p>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Top banner with robot */}
          <FadeUp>
            <div className="banner-responsive" style={{
              background: "linear-gradient(135deg, #8ea10a 0%, #c4db0d 60%, #8ea10a 100%)",
              borderRadius: 20, padding: "40px 48px", marginBottom: 64,
              display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 16,
                background: "rgba(20,20,20,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="44" height="44" fill="none" stroke="#141414" strokeWidth="1.6" viewBox="0 0 24 24">
                  <rect x="5" y="6" width="14" height="12" rx="2" />
                  <path d="M8 6V4a4 4 0 018 0v2" />
                  <circle cx="9" cy="12" r="1.8" fill="#141414" />
                  <circle cx="15" cy="12" r="1.8" fill="#141414" />
                  <path d="M9 16h6" />
                  <path d="M2 12h3M19 12h3" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: "#141414", marginBottom: 6, letterSpacing: "-0.02em" }}>
                  See how it works in practice.
                </h2>
                <p style={{ fontSize: 15, color: "rgba(20,20,20,0.75)", lineHeight: 1.6 }}>
                  Book a 20-minute demo and get a clear look at how MSPWired helps MSPs stay consistent,
                  organized, and in control of their sales process.
                </p>
              </div>
              <a href="#contact-form" className="btn-primary" style={{
                background: "#fff", color: "#000000", padding: "12px 24px", fontSize: 14, flexShrink: 0,
                textDecoration: "none", fontWeight: 700,
              }}>
                Book a Demo
              </a>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }} className="grid-cols-2-mobile">
            {/* Contact info */}
            <FadeUp>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c4db0d", marginBottom: 12 }}>
                  Book a Demo
                </p>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 32 }}>
                  Book your MSPWired demo.
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    {
                      label: "What You'll See",
                      value: "Follow-up handled automatically, pipeline organized, and full visibility into what's coming next.",
                      href: null,
                      icon: <svg width="18" height="18" fill="none" stroke="#8ea10a" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
                    },
                    {
                      label: "What You Won't Get",
                      value: "No long presentations. No generic CRM demo. Just a clear look at how the system works for MSPs.",
                      href: null,
                      icon: <svg width="18" height="18" fill="none" stroke="#8ea10a" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
                    },
                    {
                      label: "Duration",
                      value: "20 minutes. Strategic and focused.",
                      href: null,
                      icon: <svg width="18" height="18" fill="none" stroke="#8ea10a" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
                    },
                  ].map(info => (
                    <div key={info.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: "linear-gradient(135deg, #e9f2a7 0%, #d5e65a 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 4 }}>
                          {info.label}
                        </p>
                        {info.href ? (
                          <a href={info.href} style={{ fontSize: 14, fontWeight: 600, color: "#8ea10a", textDecoration: "none" }}>
                            {info.value}
                          </a>
                        ) : (
                          <p style={{ fontSize: 14, fontWeight: 500, color: "#141414", whiteSpace: "pre-line", lineHeight: 1.5 }}>{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Form */}
            <FadeUp delay={120}>
              {sent ? (
                <div style={{
                  background: "#f4f8e0", border: "1.5px solid #d5e65a", borderRadius: 16,
                  padding: 40, textAlign: "center",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "linear-gradient(135deg, #8ea10a 0%, #c4db0d 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                  }}>
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#141414", marginBottom: 8 }}>Request Received!</h3>
                  <p style={{ fontSize: 14, color: "#555" }}>
                    Thank you for your interest. The MSPWired team will reach out to schedule your demo shortly.
                  </p>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} style={{
                  background: "#fff", border: "1px solid #E6E8EC", borderRadius: 16,
                  padding: 32, boxShadow: "0 4px 20px rgba(77,94,46,0.07)",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    {[
                      { label: "First Name", key: "firstName", type: "text" },
                      { label: "Last Name", key: "lastName", type: "text" },
                    ].map(({ label, key, type }) => (
                      <div key={key}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {label}
                        </label>
                        <input
                          type={type} required
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          style={{
                            width: "100%", padding: "10px 14px", fontSize: 14,
                            border: "1.5px solid #E6E8EC", borderRadius: 8,
                            outline: "none", color: "#141414", boxSizing: "border-box",
                            transition: "border-color 0.2s",
                          }}
                          onFocus={e => (e.target.style.borderColor = "#c4db0d")}
                          onBlur={e => (e.target.style.borderColor = "#E6E8EC")}
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { label: "Work Email", key: "email", type: "email" },
                    { label: "Company Name", key: "company", type: "text" },
                  ].map(({ label, key, type }) => (
                    <div key={key} style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {label}
                      </label>
                      <input
                        type={type} required
                        value={form[key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        style={{
                          width: "100%", padding: "10px 14px", fontSize: 14,
                          border: "1.5px solid #E6E8EC", borderRadius: 8,
                          outline: "none", color: "#141414", boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={e => (e.target.style.borderColor = "#c4db0d")}
                        onBlur={e => (e.target.style.borderColor = "#E6E8EC")}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      What's your main sales challenge?
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: "100%", padding: "10px 14px", fontSize: 14,
                        border: "1.5px solid #E6E8EC", borderRadius: 8,
                        outline: "none", color: "#141414", resize: "none", boxSizing: "border-box",
                        transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={e => (e.target.style.borderColor = "#c4db0d")}
                      onBlur={e => (e.target.style.borderColor = "#E6E8EC")}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{
                    width: "100%", padding: "13px 24px", fontSize: 15,
                    justifyContent: "center", cursor: "pointer", border: "none",
                  }}>
                    Book My Demo
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ 
        background: "#0D0F12", 
        padding: "80px 0 40px", 
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle footer glow */}
        <div style={{
          position: "absolute", bottom: -100, right: -100, width: 300, height: 300,
          background: "radial-gradient(circle, rgba(196, 219, 13, 0.03) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }} className="grid-hero">
            {/* Col 1: Brand */}
            <div>
              <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none", marginBottom: 24 }}>
                <img
                  src="/logowired-D9tohZN6.png"
                  alt="Wired"
                  style={{ height: 40, width: "auto", objectFit: "contain" }}
                />
              </a>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>
                Building the future of MSP sales through intelligent automation and forecasting. 
                Stop guessing and start closing with MSPWired.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>, href: "#" },
                  { icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: "#" },
                  { icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} style={{ 
                    width: 36, height: 36, borderRadius: "50%", 
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)", transition: "all 0.2s ease"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(196, 219, 13, 0.1)"; e.currentTarget.style.color = "#c4db0d"; e.currentTarget.style.borderColor = "rgba(196, 219, 13, 0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2,3,4: Links */}
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {group.title}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {group.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} style={{ 
                        fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", 
                        transition: "all 0.2s ease",
                        display: "flex", alignItems: "center", gap: 10
                      }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#c4db0d"; e.currentTarget.style.paddingLeft = "4px"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.paddingLeft = "0"; }}
                      >
                        {link.icon && <span style={{ color: "rgba(196, 219, 13, 0.6)" }}>{link.icon}</span>}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20
          }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }} suppressHydrationWarning>
              &copy; {new Date().getFullYear()} MSPWired Performance Systems. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>Privacy Policy</a>
              <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>Terms of Service</a>
              <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color="#fff"} onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .grid-hero { grid-template-columns: 1fr !important; }
          .grid-steps { grid-template-columns: 1fr 1fr !important; }
          .grid-cols-2-mobile { grid-template-columns: 1fr !important; }
          .grid-cols-3-mobile { grid-template-columns: 1fr 1fr !important; }
          .banner-responsive { 
            padding: 32px 24px !important; 
            gap: 24px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 600px) {
          .grid-steps { grid-template-columns: 1fr !important; }
          .grid-cols-3-mobile { grid-template-columns: 1fr !important; }
          .hidden.md\\:flex { display: none !important; }
          .hidden.md\\:inline-flex { display: none !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Scroll to Top Button */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c4db0d 0%, #8ea10a 100%)",
            color: "#000",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 1000,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            animation: "fadeUp 0.4s ease-out forwards",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-5px) scale(1.08)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(196, 219, 13, 0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
          }}
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
