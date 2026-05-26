import { useState, useEffect, useRef } from "react";
import {
  FaYoutube, FaInstagram, FaGithub, FaFacebook,
  FaWhatsapp, FaPhoneAlt,
} from "react-icons/fa";

const WHATSAPP      = "918652468669";
const PHONE_DISPLAY = "+91 86524 68669";
const SHEET_URL     = "https://script.google.com/macros/s/AKfycbwmelwqQsOEdGV7qRSw9U3JRuo9z_O9CdYFneJkzn66NBPT0-q9JfJ_gEJ_7LAC3ReJ/exec";

/* ── hooks ── */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width:768px)");
    setM(mq.matches);
    const fn = e => setM(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return m;
}

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── styles ── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Familjen+Grotesk:wght@500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bd:#06142A; --ba:#1B6EE8; --bl:#58A2FF;
  --gl:#EAF0F8; --wh:#F3F8FF; --tm:#091D36; --ts:#4E6680;
  --green:#16A34A; --red:#DC2626;
  --sh:0 2px 28px rgba(6,20,42,0.09);
}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--wh);color:var(--tm);overflow-x:hidden;-webkit-font-smoothing:antialiased}
.fg{font-family:'Familjen Grotesk',sans-serif}
.sec{padding:clamp(64px,9vw,100px) clamp(20px,6vw,80px)}
.tag{display:inline-block;font-size:0.69rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:var(--ba);margin-bottom:14px}
.sh{font-family:'Familjen Grotesk',sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:var(--bd);line-height:1.12;letter-spacing:-0.025em;margin-bottom:16px}
.sh-w{color:#fff}
.bm{font-size:clamp(0.95rem,1.5vw,1.06rem);color:var(--ts);line-height:1.82}
.card{background:#fff;border:1px solid rgba(27,110,232,0.09);border-radius:18px;padding:clamp(20px,3vw,32px);transition:transform 0.25s,box-shadow 0.25s}
.card:hover{transform:translateY(-4px);box-shadow:var(--sh)}
.btn-p{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--ba);color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:0.97rem;transition:0.2s;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(27,110,232,0.25);font-family:'Plus Jakarta Sans',sans-serif}
.btn-p:hover{background:var(--bl);transform:translateY(-2px)}
.btn-o{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:var(--ba);padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:0.97rem;transition:0.2s;border:1.5px solid rgba(27,110,232,0.28);font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer}
.btn-o:hover{background:rgba(27,110,232,0.05);border-color:var(--ba);transform:translateY(-2px)}
.inp{width:100%;border:1.5px solid transparent;outline:none;background:var(--gl);border-radius:10px;padding:13px 15px;font-size:0.95rem;font-family:'Plus Jakarta Sans',sans-serif;transition:0.2s;color:var(--tm)}
.inp:focus{border-color:var(--ba);background:#fff}
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin-top:44px}
.nav-menu{display:none}
@media(max-width:768px){
  .nav-menu.open{display:flex;flex-direction:column;position:fixed;top:62px;left:0;right:0;background:rgba(243,248,255,0.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(27,110,232,0.1);z-index:99}
  .nav-menu.open a{padding:16px 6vw;text-decoration:none;color:var(--tm);border-bottom:1px solid rgba(27,110,232,0.05);font-weight:600;font-size:1rem}
  .nav-menu.open .nav-wa{padding:14px 6vw}
  .hide-mobile{display:none!important}
}
@media(max-width:480px){
  .btn-p,.btn-o{width:100%}
}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.25;transform:scale(1.8)}}
@keyframes waGlow{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5),0 8px 24px rgba(37,211,102,0.35)}50%{box-shadow:0 0 0 10px rgba(37,211,102,0),0 8px 24px rgba(37,211,102,0.35)}}
`;

const SOCIALS = [
  { icon: <FaYoutube />,  href: "https://youtube.com/@TechyArif07" },
  { icon: <FaInstagram />,href: "https://instagram.com/techyarif" },
  { icon: <FaGithub />,   href: "https://github.com/techyarif" },
  { icon: <FaFacebook />, href: "https://www.facebook.com/profile.php?id=61576369343027" },
];

function SocialIcon({ icon, href, dark = false }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, borderRadius: 11, textDecoration: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.95rem", transition: "all 0.2s",
        background: dark ? "rgba(255,255,255,0.07)" : "#fff",
        color: dark ? (hov ? "var(--bl)" : "rgba(255,255,255,0.55)") : (hov ? "var(--ba)" : "var(--ts)"),
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(27,110,232,0.09)",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: dark ? "none" : "var(--sh)",
      }}
    >{icon}</a>
  );
}

/* ── FLOATING WHATSAPP ── */
function FloatingWhatsApp() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=Hi Arif, I'm interested in LeadAlert. Please tell me more.`}
      target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", right: 22, bottom: 22, zIndex: 999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.75rem", textDecoration: "none",
        animation: "waGlow 2.2s ease-in-out infinite",
        transform: hov ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s",
      }}
    >
      <FaWhatsapp />
    </a>
  );
}

/* ── NAV ── */
function Nav() {
  const mobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Problem",    href: "#problem"  },
    { label: "LeadAlert",  href: "#solution" },
    { label: "Kaise Kaam Karta Hai", href: "#how" },
    { label: "About",      href: "#about"    },
    { label: "Contact",    href: "#contact"  },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(20px,6vw,80px)",
        background: scrolled || open ? "rgba(243,248,255,0.96)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: scrolled || open ? "1px solid rgba(27,110,232,0.09)" : "none",
        transition: "background 0.3s",
      }}>
        <div className="fg" style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--bd)" }}>
          Techy<span style={{ color: "var(--ba)" }}>Arif</span>
        </div>

        {!mobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{ textDecoration: "none", color: "var(--ts)", fontSize: "0.86rem", fontWeight: 500, transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--ba)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--ts)"}
              >{l.label}</a>
            ))}
            <a href={`tel:+${WHATSAPP}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "var(--ts)", fontWeight: 600, fontSize: "0.88rem", whiteSpace: "nowrap" }}>
              <FaPhoneAlt style={{ fontSize: "0.78rem" }} />
              {PHONE_DISPLAY}
            </a>
            <a href="#contact" className="btn-p" style={{ padding: "9px 18px", fontSize: "0.84rem", whiteSpace: "nowrap" }}>
              Free Trial →
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href={`tel:+${WHATSAPP}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "var(--ba)", fontWeight: 600, fontSize: "0.84rem" }}>
              <FaPhoneAlt />
              <span className="hide-mobile">{PHONE_DISPLAY}</span>
            </a>
            <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", fontSize: "1.5rem", color: "var(--bd)", cursor: "pointer" }}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        )}
      </nav>

      {mobile && (
        <div className={`nav-menu${open ? " open" : ""}`}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <div className="nav-wa">
            <a href="#contact" className="btn-p" onClick={() => setOpen(false)}>Free Trial Start Karein →</a>
          </div>
        </div>
      )}
    </>
  );
}

/* ── HERO ── */
function Hero() {
  const mobile = useIsMobile();
  return (
    <section className="sec" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "var(--wh)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 78% 35%, rgba(27,110,232,0.08) 0%,transparent 65%), radial-gradient(ellipse 45% 40% at 10% 78%, rgba(88,162,255,0.05) 0%,transparent 55%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(var(--ba) 1px,transparent 1px),linear-gradient(90deg,var(--ba) 1px,transparent 1px)", backgroundSize: "54px 54px" }} />

      <div style={{ width: "100%", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: mobile ? 44 : 80, flexWrap: "wrap" }}>

        {/* text */}
        <div style={{ flex: "1 1 380px", maxWidth: 600 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(27,110,232,0.07)", border: "1px solid rgba(27,110,232,0.18)", borderRadius: 100, padding: "6px 14px", marginBottom: 26, animation: "fadeUp 0.5s 0.1s both" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--ba)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Real Estate Agents ke liye</span>
          </div>

          <h1 className="fg" style={{ fontSize: "clamp(2.1rem,5.5vw,3.9rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.035em", color: "var(--bd)", marginBottom: 22, animation: "fadeUp 0.55s 0.2s both" }}>
            Meta Ad se lead aaya —{" "}
            <span style={{ color: "var(--ba)" }}>aur aapko ghanton baad pata chala?</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem,1.7vw,1.1rem)", color: "var(--ts)", lineHeight: 1.82, maxWidth: 480, marginBottom: 16, animation: "fadeUp 0.55s 0.28s both" }}>
            Jo agent pehle call karta hai — wo deal karta hai. LeadAlert aapko <strong style={{ color: "var(--tm)", fontWeight: 700 }}>5 seconds mein</strong> Telegram pe alert bhejta hai, saath mein ek ready WhatsApp message bhi.
          </p>

          <p style={{ fontSize: "clamp(0.9rem,1.4vw,0.98rem)", color: "var(--ts)", lineHeight: 1.75, maxWidth: 480, marginBottom: 36, animation: "fadeUp 0.55s 0.32s both", fontStyle: "italic" }}>
            "Pehle respond karo — deal pakki karo."
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.55s 0.38s both" }}>
            <a href="#contact" className="btn-p">15 Din Free Trial ⚡</a>
            <a href="#how"     className="btn-o">Kaise Kaam Karta Hai?</a>
          </div>

          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp 0.55s 0.45s both", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--ts)", fontWeight: 500 }}>Setup free hai</span>
            </div>
            <span style={{ color: "rgba(27,110,232,0.2)", fontSize: "0.8rem" }}>·</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--ts)", fontWeight: 500 }}>Credit card nahi chahiye</span>
            </div>
            <span style={{ color: "rgba(27,110,232,0.2)", fontSize: "0.8rem" }}>·</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--ts)", fontWeight: 500 }}>30 min mein ready</span>
            </div>
          </div>
        </div>

        {/* right card */}
        <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", width: mobile ? "100%" : "auto", animation: "fadeUp 0.6s 0.45s both" }}>
          <div style={{ background: "#fff", border: "1px solid rgba(27,110,232,0.10)", borderRadius: 20, padding: "28px 24px", width: "100%", maxWidth: 300, boxShadow: "var(--sh)" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ts)", marginBottom: 18 }}>
              Bina LeadAlert ke 😟
            </div>
            {[
              { emoji: "😟", text: "Lead aaya — aapko 2 ghante baad pata chala" },
              { emoji: "📵", text: "Tab tak lead ne 3 aur agents se baat ki" },
              { emoji: "💸", text: "Deal kisi aur ne ki" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 14px", background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.10)", borderRadius: 10, marginBottom: 8 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{r.emoji}</span>
                <span style={{ fontSize: "0.82rem", color: "var(--ts)", lineHeight: 1.55 }}>{r.text}</span>
              </div>
            ))}

            <div style={{ margin: "18px 0 14px", textAlign: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--ts)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              LeadAlert ke saath ✅
            </div>

            {[
              { emoji: "⚡", text: "Lead aaya — 5 seconds mein Telegram alert" },
              { emoji: "💬", text: "Ek tap mein WhatsApp — message ready" },
              { emoji: "🏆", text: "Aap pehle — deal aapki" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 14px", background: "rgba(22,163,74,0.05)", border: "1px solid rgba(22,163,74,0.13)", borderRadius: 10, marginBottom: 8 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{r.emoji}</span>
                <span style={{ fontSize: "0.82rem", color: "var(--ts)", lineHeight: 1.55 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROBLEM ── */
function Problem() {
  const pain = [
    {
      icon: "⏰",
      title: "Meta ka notification late aata hai ya spam mein jaata hai",
      desc: "Zyaadatar agents din mein ek-do baar manually Meta check karte hain. Tab tak lead cold ho chuka hota hai.",
    },
    {
      icon: "🔗",
      title: "Marketing agency ke through leads aate hain — delayed",
      desc: "Agar aapke ads koi agency manage kar raha hai, toh lead unke paas pehle jaata hai. Wo forward karte hain jab unhe yaad aata hai.",
    },
    {
      icon: "🏃",
      title: "Jo pehle call karta hai — wo deal karta hai",
      desc: "Same lead shayad 4-5 agents ke paas gaya ho. Pehle pounchne wala rapport banata hai. 2 ghante baad phone karna matlab deal miss karna.",
    },
  ];

  return (
    <section id="problem" className="sec" style={{ background: "var(--gl)" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Reveal><div className="tag" style={{ color: "var(--red)" }}>Asli Problem</div></Reveal>
        <Reveal delay={60}>
          <h2 className="sh fg">
            Aap Meta ads pe paise kharch kar rahe ho — lekin leads miss ho rahi hain, sirf isliye ki response late tha.
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <p className="bm" style={{ maxWidth: 600, marginBottom: 0 }}>
            Lead bura nahi tha. Timing buri thi. Yahi problem hai.
          </p>
        </Reveal>

        <div className="grid-3">
          {pain.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card" style={{ borderTop: "3px solid var(--red)", height: "100%" }}>
                <div style={{ fontSize: "2rem", marginBottom: 14 }}>{p.icon}</div>
                <h3 className="fg" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bd)", marginBottom: 10, lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--ts)", lineHeight: 1.72 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} style={{ marginTop: 56, textAlign: "center" }}>
          <p className="fg" style={{ fontSize: "clamp(1.1rem,2.5vw,1.45rem)", fontWeight: 600, color: "var(--bd)", lineHeight: 1.5 }}>
            Fix simple hai —{" "}
            <span style={{ color: "var(--ba)" }}>Lead aate hi aapko pata chale.</span>
          </p>
          <div style={{ marginTop: 22 }}>
            <a href="#solution" className="btn-p">Dekhein kaise →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    { num: "01", icon: "📋", t: "Koi aapka Meta Ad form fill karta hai", d: "Lead apna naam, number aur requirements form mein deta hai." },
    { num: "02", icon: "📩", t: "5 seconds mein aapke Telegram pe alert",  d: "Saare details — naam, phone, budget — seedha aapke Telegram pe. Cleanly formatted." },
    { num: "03", icon: "💬", t: "Ek tap — WhatsApp khula, message ready",  d: "Message pehle se likha hua hota hai. Bas Send dabao. Lead sunne wala pehla agent aap ho." },
  ];

  return (
    <section id="how" className="sec" style={{ background: "var(--wh)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Reveal><div className="tag">Kaise Kaam Karta Hai</div></Reveal>
        <Reveal delay={60}>
          <h2 className="sh fg">Teen steps. Bas itna hi.</h2>
        </Reveal>
        <Reveal delay={110}>
          <p className="bm" style={{ maxWidth: 520, marginBottom: 0 }}>
            Koi app download nahi, koi complicated setting nahi. Aap bas alerts receive karte raho.
          </p>
        </Reveal>

        <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ display: "flex", gap: 22, padding: "28px 0", borderBottom: i < steps.length - 1 ? "1px solid rgba(27,110,232,0.08)" : "none", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(27,110,232,0.08)", border: "1px solid rgba(27,110,232,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{s.icon}</div>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--ba)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Step {s.num}</div>
                  <div className="fg" style={{ fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 700, color: "var(--bd)", marginBottom: 8 }}>{s.t}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--ts)", lineHeight: 1.7 }}>{s.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} style={{ marginTop: 44, padding: "24px 28px", background: "rgba(27,110,232,0.05)", border: "1px solid rgba(27,110,232,0.12)", borderRadius: 16 }}>
          <p className="fg" style={{ fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 600, color: "var(--bd)", lineHeight: 1.55 }}>
            🛠️ Setup Arif karta hai — aapko kuch nahi karna. <span style={{ color: "var(--ba)" }}>30 minutes mein system ready.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── SOLUTION / PROMISE ── */
function Solution() {
  return (
    <section id="solution" className="sec" style={{ background: "var(--bd)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(27,110,232,0.15)", border: "1px solid rgba(27,110,232,0.28)", color: "var(--bl)", fontSize: "0.7rem", fontWeight: 700, padding: "5px 14px", borderRadius: 100, marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ⚡ LeadAlert
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="sh sh-w fg" style={{ fontSize: "clamp(1.9rem,4.5vw,3.1rem)" }}>
            Ek simple promise —<br />aap hamesha pehle pounchoge.
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <p style={{ fontSize: "clamp(1rem,1.7vw,1.12rem)", color: "rgba(255,255,255,0.52)", lineHeight: 1.82, maxWidth: 600, margin: "0 auto 48px" }}>
            LeadAlert aapke Meta lead form ko aapke Telegram se connect karta hai. Jab bhi koi form fill kare — aapko turant alert milega, saath mein WhatsApp link bhi. No delay. No middleman.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, textAlign: "left", marginBottom: 52 }}>
          {[
            { icon: "⚡", t: "5 seconds mein alert",      d: "Lead fill karte hi aapke Telegram pe notification." },
            { icon: "💬", t: "Ready WhatsApp message",     d: "Personalized message pehle se likha — bas ek tap." },
            { icon: "🛠️", t: "Aapko kuch nahi karna",      d: "Setup Arif karta hai. Aap sirf leads receive karo." },
            { icon: "🕐", t: "24/7 active rehta hai",      d: "Raat ke 2 baje lead aaya — alert aa jaayega." },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "18px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
              >
                <span style={{ fontSize: "1.35rem", flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div className="fg" style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 5 }}>{f.t}</div>
                  <div style={{ fontSize: "0.81rem", color: "rgba(255,255,255,0.40)", lineHeight: 1.6 }}>{f.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <a href="#contact" className="btn-p" style={{ fontSize: "1.05rem", padding: "15px 34px" }}>
            15 Din Free — Abhi Start Karein ⚡
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ── TRIAL STRIP ── */
function TrialStrip() {
  return (
    <section style={{ background: "var(--ba)", padding: "clamp(48px,6vw,68px) clamp(20px,6vw,80px)", textAlign: "center" }}>
      <Reveal>
        <h2 className="fg" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 12 }}>
          15 din bilkul free. Setup Arif karega. Credit card nahi chahiye.
        </h2>
        <p style={{ fontSize: "clamp(0.95rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.7)", maxWidth: 500, margin: "0 auto 30px" }}>
          Try karo. Agar 15 din mein aap faster respond nahi kar rahe — toh koi baat nahi.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "var(--ba)", padding: "14px 30px", borderRadius: 10, fontWeight: 700, fontSize: "1rem", textDecoration: "none", transition: "transform 0.2s", fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            Free Trial Shuru Karein ⚡
          </a>
          <a href={`https://wa.me/${WHATSAPP}?text=Hi Arif, LeadAlert ke baare mein baat karni thi.`} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "14px 30px", borderRadius: 10, fontWeight: 600, fontSize: "1rem", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)", transition: "0.2s", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            <FaWhatsapp /> WhatsApp Karein
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const projects = [
    { title: "LeadAlert", desc: "Meta lead notification system — Telegram alert + one-tap WhatsApp reply for real estate agents.", tag: "Live", tagC: "#16A34A", tagBg: "rgba(22,163,74,0.09)", img: "/assets/leadalert-logo.png", href: "#solution" },
    { title: "AutoPoster Pro", desc: "Facebook automation tool for consistent content posting and community engagement.", tag: "Project", tagC: "var(--ba)", tagBg: "rgba(27,110,232,0.08)", img: "/assets/autoposter-pro.png" },
    { title: "EMMA AI", desc: "Advanced AI assistant in Python with LLM, image generation, and vision controls.", tag: "Project", tagC: "#7C3AED", tagBg: "rgba(124,58,237,0.08)", img: "/assets/emma-ai.png" },
  ];

  return (
    <section id="about" className="sec" style={{ background: "var(--gl)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* who */}
        <div style={{ display: "flex", gap: "clamp(28px,5vw,72px)", flexWrap: "wrap", alignItems: "center", marginBottom: 72 }}>
          <div style={{ flex: "1 1 320px" }}>
            <Reveal><div className="tag">Kisne Banaya?</div></Reveal>
            <Reveal delay={60}><h2 className="sh fg">Arif — Navi Mumbai ka developer.</h2></Reveal>
            <Reveal delay={110}>
              <p className="bm" style={{ marginBottom: 14 }}>
                Main automation tools banata hoon jo real problems solve karte hain. LeadAlert tab banaya jab maine dekha ki agents ke paas leads aa rahe the — par unhe ghanton baad pata chal raha tha.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <p className="bm" style={{ marginBottom: 26 }}>
                Main poora setup karta hoon — Meta webhook, Telegram bot, sab kuch. Aapko sirf alerts receive karne hain.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {SOCIALS.map((s, i) => <SocialIcon key={i} {...s} />)}
              </div>
            </Reveal>
          </div>
          <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
            <div className="card" style={{ maxWidth: 270, width: "100%", padding: 18 }}>
              <img src="/assets/techyarif-logo.jpg" alt="TechyArif" style={{ width: "100%", borderRadius: 12, marginBottom: 12, objectFit: "cover", aspectRatio: "1/1", background: "var(--gl)" }} />
              <div className="fg" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 4 }}>TechyArif</div>
              <p style={{ fontSize: "0.83rem", color: "var(--ts)", lineHeight: 1.65 }}>Automation, AI experiments, content creation, aur ideas ko real products mein badalna.</p>
            </div>
          </div>
        </div>

        {/* projects */}
        <Reveal><div className="tag">Projects</div></Reveal>
        <Reveal delay={60}><h3 className="sh fg" style={{ fontSize: "clamp(1.4rem,3vw,1.9rem)" }}>Jo maine banaya hai.</h3></Reveal>
        <div className="grid-3">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="card" style={{ display: "flex", flexDirection: "column" }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", borderRadius: 11, marginBottom: 14, aspectRatio: "16/9", objectFit: "cover", background: "var(--gl)" }} />
                <span style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: p.tagC, background: p.tagBg, padding: "3px 10px", borderRadius: 100, alignSelf: "flex-start", marginBottom: 10 }}>{p.tag}</span>
                <h4 className="fg" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 7 }}>{p.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ts)", lineHeight: 1.65, flex: 1 }}>{p.desc}</p>
                {p.href && <a href={p.href} style={{ marginTop: 12, fontSize: "0.83rem", fontWeight: 600, color: "var(--ba)", textDecoration: "none" }}>Aur jaano →</a>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const [form, setForm]       = useState({ name: "", phone: "", project: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) { alert("Apna naam aur WhatsApp number daalein."); return; }
    try {
      setLoading(true);
      const data = new URLSearchParams();
      Object.entries({ name: form.name, phone: form.phone, project: form.project, message: form.msg }).forEach(([k, v]) => data.append(k, v));
      await fetch(SHEET_URL, { method: "POST", body: data });
      setSubmitted(true);
      setForm({ name: "", phone: "", project: "", msg: "" });
    } catch { alert("Kuch gadbad ho gayi. WhatsApp pe seedha message karein."); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="sec" style={{ background: "var(--wh)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <Reveal><div className="tag">Free Trial Shuru Karein</div></Reveal>
        <Reveal delay={60}><h2 className="sh fg">Ready ho? 15 din free mein try karein.</h2></Reveal>
        <Reveal delay={110}>
          <p className="bm" style={{ maxWidth: 480, margin: "0 auto 40px" }}>
            Neeche form bharo — Arif 24 ghante mein setup kar dega. Koi payment nahi, koi commitment nahi.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(26px,5vw,44px)", boxShadow: "var(--sh)", border: "1px solid rgba(27,110,232,0.08)" }}>
            {!submitted ? (
              <div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
                  {[["name","Aapka Naam","Rahul Sharma"],["phone","WhatsApp Number","+91 98765 43210"]].map(([k,l,p]) => (
                    <div key={k} style={{ flex: "1 1 200px" }}>
                      <label style={{ display: "block", textAlign: "left", marginBottom: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--ts)" }}>{l}</label>
                      <input className="inp" placeholder={p} value={form[k]} onChange={set(k)} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", textAlign: "left", marginBottom: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--ts)" }}>Aapka Project / Property</label>
                  <input className="inp" placeholder="e.g. Skyline Heights, Panvel" value={form.project} onChange={set("project")} />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", textAlign: "left", marginBottom: 6, fontSize: "0.8rem", fontWeight: 600, color: "var(--ts)" }}>Kuch poochna hai?</label>
                  <textarea rows={3} className="inp" style={{ resize: "none" }} placeholder="Questions ya details likhein..." value={form.msg} onChange={set("msg")} />
                </div>
                <button onClick={submit} className="btn-p" style={{ width: "100%", fontSize: "1rem", padding: "14px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }} disabled={loading}>
                  {loading ? "Bhej rahe hain..." : "Free Trial Shuru Karein →"}
                </button>
                <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(27,110,232,0.08)", display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={`https://wa.me/${WHATSAPP}?text=Hi Arif, LeadAlert ke baare mein baat karni thi.`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.86rem", color: "#25D366", textDecoration: "none", fontWeight: 600 }}>
                    <FaWhatsapp /> WhatsApp: {PHONE_DISPLAY}
                  </a>
                  <a href={`tel:+${WHATSAPP}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: "0.86rem", color: "var(--ba)", textDecoration: "none", fontWeight: 600 }}>
                    <FaPhoneAlt /> Call: {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>✅</div>
                <h3 className="fg" style={{ fontSize: "1.6rem", marginBottom: 10 }}>Ho gaya! Jald milenge.</h3>
                <p className="bm" style={{ marginBottom: 22 }}>Arif aapko WhatsApp pe kuch ghanton mein contact karega setup ke liye.</p>
                <button className="btn-o" onClick={() => setSubmitted(false)}>Aur message bhejein</button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background: "var(--bd)", padding: "28px clamp(20px,6vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="fg" style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            Techy<span style={{ color: "var(--bl)" }}>Arif</span>
          </div>
          <a href={`tel:+${WHATSAPP}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--bl)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
          >
            <FaPhoneAlt style={{ fontSize: "0.7rem" }} /> {PHONE_DISPLAY}
          </a>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", marginTop: 3 }}>Built in Navi Mumbai · © 2025</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIALS.map((s, i) => <SocialIcon key={i} {...s} dark />)}
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <style>{G}</style>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Solution />
      <TrialStrip />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}