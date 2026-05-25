import { useState, useEffect, useRef } from "react";
import {
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

const WHATSAPP = "918652468669";

/* ── responsive hook ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setMobile(mq.matches);

    const fn = (e) => setMobile(e.matches);

    mq.addEventListener("change", fn);

    return () => mq.removeEventListener("change", fn);
  }, []);

  return mobile;
}

/* ── reveal ── */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const G = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Familjen+Grotesk:wght@400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing:border-box;
  margin:0;
  padding:0;
}

:root {
  --bd:#06142A;
  --ba:#1B6EE8;
  --bl:#58A2FF;
  --gl:#EAF0F8;
  --wh:#F3F8FF;
  --tm:#091D36;
  --ts:#4E6680;
  --sh:0 2px 28px rgba(6,20,42,0.09);
}

html {
  scroll-behavior:smooth;
}

body {
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--wh);
  color:var(--tm);
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

.fg {
  font-family:'Familjen Grotesk',sans-serif;
}

.sec {
  padding:clamp(72px,10vw,110px) clamp(20px,6vw,80px);
}

.tag {
  display:inline-block;
  font-size:0.72rem;
  font-weight:700;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--ba);
  margin-bottom:12px;
}

.sh {
  font-family:'Familjen Grotesk',sans-serif;
  font-size:clamp(1.9rem,4vw,3rem);
  font-weight:700;
  color:var(--bd);
  line-height:1.1;
  letter-spacing:-0.03em;
  margin-bottom:16px;
}

.bm {
  font-size:clamp(0.95rem,1.5vw,1.05rem);
  color:var(--ts);
  line-height:1.8;
}

.grid-3 {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:22px;
  margin-top:52px;
}

.grid-2 {
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:24px;
  margin-top:52px;
}

.card {
  background:#fff;
  border:1px solid rgba(27,110,232,0.08);
  border-radius:20px;
  padding:clamp(22px,3vw,34px);
  transition:0.25s;
}

.card:hover {
  transform:translateY(-5px);
  box-shadow:var(--sh);
}

.btn-p {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  background:var(--ba);
  color:#fff;
  padding:13px 26px;
  border-radius:10px;
  text-decoration:none;
  font-weight:600;
  font-size:0.95rem;
  transition:0.2s;
  border:none;
  cursor:pointer;
  box-shadow:0 4px 18px rgba(27,110,232,0.22);
}

.btn-p:hover {
  background:var(--bl);
  transform:translateY(-2px);
}

.btn-o {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  background:transparent;
  color:var(--ba);
  padding:13px 26px;
  border-radius:10px;
  text-decoration:none;
  font-weight:600;
  font-size:0.95rem;
  transition:0.2s;
  border:1.5px solid rgba(27,110,232,0.25);
}

.btn-o:hover {
  background:rgba(27,110,232,0.05);
}

.inp {
  width:100%;
  border:none;
  outline:none;
  background:var(--gl);
  border-radius:10px;
  padding:13px 14px;
  font-size:0.95rem;
  font-family:'Plus Jakarta Sans',sans-serif;
}

.nav-menu {
  display:none;
}

@media(max-width:768px){
  .nav-menu.open{
    display:flex;
    flex-direction:column;
    position:fixed;
    top:60px;
    left:0;
    right:0;
    background:rgba(243,248,255,0.97);
    backdrop-filter:blur(14px);
    border-bottom:1px solid rgba(27,110,232,0.1);
    z-index:99;
  }

  .nav-menu.open a{
    padding:16px 6vw;
    text-decoration:none;
    color:var(--tm);
    border-bottom:1px solid rgba(27,110,232,0.05);
    font-weight:600;
  }
}

@media(max-width:480px){
  .btn-p,.btn-o{
    width:100%;
  }
}
`;

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
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,6vw,80px)",
          background:
            scrolled || open
              ? "rgba(243,248,255,0.95)"
              : "transparent",
          backdropFilter: scrolled || open ? "blur(14px)" : "none",
          borderBottom:
            scrolled || open
              ? "1px solid rgba(27,110,232,0.08)"
              : "none",
        }}
      >
        <div
          className="fg"
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--bd)",
          }}
        >
          Techy<span style={{ color: "var(--ba)" }}>Arif</span>
        </div>

        {!mobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  textDecoration: "none",
                  color: "var(--ts)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            ))}

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="btn-p"
              style={{
                padding: "9px 18px",
                fontSize: "0.84rem",
              }}
            >
              Let's Talk →
            </a>
          </div>
        )}

        {mobile && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              color: "var(--bd)",
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {mobile && (
        <div className={`nav-menu${open ? " open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ── HERO ── */

function Hero() {
  const mobile = useIsMobile();

  return (
    <section
      className="sec"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(27,110,232,0.10), transparent 40%)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: mobile ? 40 : 70,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: "1 1 520px", maxWidth: 620 }}>
          <div className="tag">
            Developer • Creator • Builder
          </div>

          <h1
            className="fg"
            style={{
              fontSize: "clamp(2.4rem,6vw,4.8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.05em",
              marginBottom: 24,
              color: "var(--bd)",
            }}
          >
            I build digital products,
            automation systems,
            and practical tech experiences.
          </h1>

          <p
            className="bm"
            style={{
              maxWidth: 560,
              marginBottom: 36,
            }}
          >
            I'm Arif — a developer and creator from Navi Mumbai focused on
            building useful technology, automation workflows, creator tools,
            and software systems that solve real-world problems.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a href="#projects" className="btn-p">
              View My Work
            </a>

            <a href="#contact" className="btn-o">
              Contact Me
            </a>
          </div>

          {/* ── SOCIALS ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <FaYoutube />,
                href: "https://youtube.com/@TechyArif07",
              },
              {
                icon: <FaInstagram />,
                href: "https://instagram.com/techyarif",
              },
              {
                icon: <FaGithub />,
                href: "https://github.com/techyarif",
              },
              {
                icon: <FaFacebook />,
                href: "https://www.facebook.com/profile.php?id=61576369343027",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--bd)",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  boxShadow: "var(--sh)",
                  border: "1px solid rgba(27,110,232,0.08)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                  e.currentTarget.style.color = "var(--ba)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.color = "var(--bd)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: "1 1 360px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: 420,
              width: "100%",
              padding: 24,
            }}
          >
            <img
              src="/assets/profile.jpg"
              alt="Arif"
              style={{
                width: "100%",
                borderRadius: 18,
                marginBottom: 18,
                objectFit: "cover",
              }}
            />

            <div
              className="fg"
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              TechyArif
            </div>

            <p className="bm">
              Building systems, experimenting with automation, creating content,
              and turning ideas into real digital products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */

function About() {
  const items = [
    "Automation Systems",
    "Web Applications",
    "Creator Tools",
    "AI Workflows",
    "Digital Products",
    "Modern UI/UX",
  ];

  return (
    <section id="about" className="sec">
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div className="tag">What I Do</div>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="sh">
            I focus on building things that feel useful, practical, and real.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p
            className="bm"
            style={{
              maxWidth: 700,
            }}
          >
            My work revolves around automation, product building, digital
            experiences, and creator-focused systems. I enjoy simplifying
            repetitive workflows and turning ideas into tools people can
            actually use.
          </p>
        </Reveal>

        <div className="grid-3">
          {items.map((i, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <div className="card">
                <div
                  className="fg"
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                  }}
                >
                  {i}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ── */

function Projects() {
  const projects = [
    {
      title: "LeadAlert for Meta Ads",
      desc: "Meta lead notification system for real estate businesses with instant Telegram and WhatsApp workflows.",
      img: "/assets/leadalert-logo.png",
    },
    {
      title: "AutoPoster Pro",
      desc: "Facebook automation tool designed for consistent content posting and community engagement.",
      img: "/assets/autoposter-pro.png",
    },
    {
      title: "EMMA AI",
      desc: "An Advanced AI assistant in python with high-end features like LLM, Image generation & Vision controls",
      img: "/assets/emma-ai.png",
    },
  ];

  return (
    <section
      id="projects"
      className="sec"
      style={{
        background: "var(--gl)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div className="tag">Featured Projects</div>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="sh">
            Selected things I've built.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p
            className="bm"
            style={{
              maxWidth: 620,
            }}
          >
            A mix of automation systems, creator tools, experimental products,
            and business-focused software projects.
          </p>
        </Reveal>

        <div className="grid-3">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="card">
                <img
                  src={p.img}
                  alt={p.title}
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    marginBottom: 18,
                  }}
                />

                <h3
                  className="fg"
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: 10,
                  }}
                >
                  {p.title}
                </h3>

                <p className="bm">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── VISION ── */

function Vision() {
  return (
    <section id="vision" className="sec">
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div className="tag">Vision</div>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="sh">
            I want to build technology that genuinely improves everyday work.
          </h2>
        </Reveal>

        <Reveal delay={130}>
          <p className="bm">
            I'm interested in the intersection of software, automation,
            productivity, and creator-driven businesses. My goal is to keep
            experimenting, building systems, sharing knowledge, and creating
            products that make digital workflows simpler and more effective.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ── CONTACT ── */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    project: "",
    msg: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    try {
      setLoading(true);

      const data = new URLSearchParams();

      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("project", form.project);
      data.append("message", form.msg);

      await fetch(
        "https://script.google.com/macros/s/AKfycbwmelwqQsOEdGV7qRSw9U3JRuo9z_O9CdYFneJkzn66NBPT0-q9JfJ_gEJ_7LAC3ReJ/exec",
        {
          method: "POST",
          body: data,
        }
      );

      setSubmitted(true);

      setForm({
        name: "",
        phone: "",
        project: "",
        msg: "",
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="sec"
      style={{
        background: "var(--gl)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Reveal>
          <div className="tag">Contact</div>
        </Reveal>

        <Reveal delay={70}>
          <h2 className="sh">
            Let's build something useful together.
          </h2>
        </Reveal>

        <Reveal delay={130}>
          <p
            className="bm"
            style={{
              maxWidth: 560,
              margin: "0 auto 46px",
            }}
          >
            Whether it's an idea, collaboration, automation system, or digital
            product — feel free to reach out.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div
            style={{
              width: "100%",
              maxWidth: 760,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 22,
              padding: "clamp(28px,5vw,48px)",
              boxShadow: "var(--sh)",
              minHeight: 420,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!submitted ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    marginBottom: 14,
                  }}
                >
                  {[
                    ["name", "Your Name", "Rahul Sharma"],
                    ["phone", "WhatsApp Number", "+91 98765 43210"],
                  ].map(([k, l, p]) => (
                    <div key={k} style={{ flex: "1 1 240px" }}>
                      <label
                        style={{
                          display: "block",
                          textAlign: "left",
                          marginBottom: 6,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          color: "var(--ts)",
                        }}
                      >
                        {l}
                      </label>

                      <input
                        className="inp"
                        placeholder={p}
                        value={form[k]}
                        onChange={set(k)}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      display: "block",
                      textAlign: "left",
                      marginBottom: 6,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--ts)",
                    }}
                  >
                    Project / Idea
                  </label>

                  <input
                    className="inp"
                    placeholder="Tell me what you're working on"
                    value={form.project}
                    onChange={set("project")}
                  />
                </div>

                <div style={{ marginBottom: 22 }}>
                  <label
                    style={{
                      display: "block",
                      textAlign: "left",
                      marginBottom: 6,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--ts)",
                    }}
                  >
                    Message
                  </label>

                  <textarea
                    rows={4}
                    className="inp"
                    style={{ resize: "none" }}
                    placeholder="Write your message..."
                    value={form.msg}
                    onChange={set("msg")}
                  />
                </div>

                <button
                  onClick={submit}
                  className="btn-p"
                  style={{
                    width: "100%",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  maxWidth: 520,
                  animation: "fadeUp 0.5s ease",
                }}
              >
                <div
                  style={{
                    width: 82,
                    height: 82,
                    margin: "0 auto 22px",
                    borderRadius: "50%",
                    background: "rgba(27,110,232,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  ✅
                </div>

                <h3
                  className="fg"
                  style={{
                    fontSize: "2rem",
                    marginBottom: 14,
                  }}
                >
                  Thanks! I'll contact you soon.
                </h3>

                <p
                  className="bm"
                  style={{
                    marginBottom: 28,
                  }}
                >
                  Your message has been received successfully.
                  I’ll get back to you as soon as possible.
                </p>

                <button
                  className="btn-o"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
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
    <footer
      style={{
        background: "var(--bd)",
        padding: "28px clamp(20px,6vw,80px)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div
          className="fg"
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Techy<span style={{ color: "var(--bl)" }}>Arif</span>
        </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        {[
          {
            icon: <FaYoutube />,
            href: "https://youtube.com/@TechyArif07",
          },
          {
            icon: <FaInstagram />,
            href: "https://instagram.com/techyarif",
          },
          {
            icon: <FaGithub />,
            href: "https://github.com/techyarif",
          },
          {
            icon: <FaFacebook />,
            href: "https://www.facebook.com/profile.php?id=61576369343027",
          },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1rem",
              transition: "0.2s",
              textDecoration: "none",
            }}
          >
            {s.icon}
          </a>
        ))}
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
      <About />
      <Projects />
      <Vision />
      <Contact />
      <Footer />
    </>
  );
}