# SE Ranking Affiliate Landingpage — Design System

## Mission
Eine hochwertige, vertrauenswürdige Affiliate-Landingpage für SE Ranking, die Professionalität, technische Kompetenz und Conversion-Optimierung vereint. Das Design muss sofort kommunizieren: "Das ist ein Premium-SEO-Tool, das Experten empfehlen."

## Brand
- **Produkt**: SE Ranking — All-in-One SEO-Plattform
- **Empfehler**: Jörg Zimmer, SEO & SEA Freelancer Berlin-Spandau
- **Zielgruppe**: SEO-Freelancer, Agenturen, lokale Unternehmen, E-Commerce
- **Positionierung**: Professionell, datengetrieben, effizient

## Style Foundations

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0e1a` | Haupt-Hintergrund |
| `--bg-secondary` | `#111827` | Karten-Hintergrund |
| `--bg-elevated` | `#1a2235` | Hover/Active States |
| `--text-primary` | `#f8fafc` | Haupttext |
| `--text-secondary` | `#94a3b8` | Sekundärer Text |
| `--text-muted` | `#64748b` | Subtile Texte |
| `--accent-primary` | `#38bdf8` | Primäre Akzente (CTAs) |
| `--accent-secondary` | `#818cf8` | Sekundäre Akzente |
| `--accent-gradient` | `linear-gradient(135deg, #38bdf8, #818cf8)` | Buttons/Highlights |
| `--border-subtle` | `rgba(148, 163, 184, 0.1)` | Subtile Borders |
| `--border-strong` | `rgba(148, 163, 184, 0.2)` | Fokus-Borders |
| `--success` | `#34d399` | Positive Indikatoren |
| `--warning` | `#fbbf24` | Warnungen |

### Typography
- **Font Family**: `Inter`, system-ui, sans-serif
- **H1**: 3.5rem / 700 / -0.02em / line-height 1.1
- **H2**: 2.25rem / 700 / -0.01em / line-height 1.2
- **H3**: 1.5rem / 600 / line-height 1.3
- **Body**: 1.125rem / 400 / line-height 1.7
- **Small**: 0.875rem / 400 / line-height 1.5
- **Eyebrow**: 0.75rem / 600 / uppercase / letter-spacing 0.15em

### Spacing Scale
- **xs**: 0.5rem (8px)
- **sm**: 1rem (16px)
- **md**: 1.5rem (24px)
- **lg**: 2.5rem (40px)
- **xl**: 4rem (64px)
- **2xl**: 6rem (96px)

### Border Radius
- **sm**: 8px (Buttons, Tags)
- **md**: 16px (Karten)
- **lg**: 24px (Panels)
- **xl**: 32px (Hero-Elemente)
- **full**: 999px (Pills, Avatare)

### Shadows
- **card**: `0 4px 24px rgba(0, 0, 0, 0.3)`
- **elevated**: `0 8px 40px rgba(0, 0, 0, 0.4)`
- **glow**: `0 0 40px rgba(56, 189, 248, 0.15)`

## Accessibility
- Mindestkontrast 4.5:1 für alle Texte
- Fokus-Indikatoren für alle interaktiven Elemente
- Semantische HTML-Struktur
- Alt-Texte für alle Bilder

## Writing Tone
- Professionell und kompetent
- Datengetrieben und konkret
- Kein Marketing-Flair, keine Hype-Sprache
- Klare Handlungsaufforderungen

## Rules: Do
- Verwende durchgehend das definierte Spacing-System
- Halte Kontraste hoch für Lesbarkeit
- Nutze Animationen subtil (max 300ms, ease-out)
- Setze echte SE Ranking-Daten und -Features ein
- Halte die Navigation minimal und fokussiert

## Rules: Don't
- Keine generischen Stock-Fotos von "glücklichen Teams"
- Keine überflüssigen Animationen oder Parallax-Effekte
- Keine mehr als 3 Farben pro Sektion
- Keine generischen Testimonials ohne Kontext
- Keine überladenen Pricing-Tabellen
