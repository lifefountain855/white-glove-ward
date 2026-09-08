# white glove ward

## minimalist website style guide

### brand direction

**white glove ward** should feel:

* clean
* precise
* premium
* organized
* trustworthy
* modern
* effortless
* slightly technical
* understated

The website should **not** feel like a traditional cleaning-company website.

Avoid:

* excessive blue/green “cleaning” colors
* stock photos of spray bottles
* bubbly or playful typography
* excessive rounded cards
* gradients
* visual clutter
* excessive animations
* generic corporate layouts

The visual idea is:

> **precision, cleanliness, and order.**

The website should feel almost like a **high-end operations/productivity platform that happens to provide cleaning services.**

---

# 01 — typography

## primary typeface

### jetbrains mono

**JetBrains Mono is the primary typeface across the entire website.**

Use it for:

* navigation
* headings
* body copy
* buttons
* forms
* pricing
* service descriptions
* labels
* CTAs
* menus
* interactive states
* notifications
* footer
* all UX copy

The monospaced character gives the brand a distinctive, systematic personality.

### typography rules

**Everything must use one casing convention.**

Choose either:

**ALL UPPERCASE**

or

**all lowercase**

Do not mix them.

For the primary direction, **all lowercase is recommended**.

Example:

```text
white glove ward

professional home cleaning

book a cleaning

our services

how it works

get your free estimate
```

Avoid:

```text
White Glove Ward
Professional Home Cleaning
Book a Cleaning
OUR SERVICES
```

The casing rule applies to:

* headings
* paragraphs
* navigation
* buttons
* form labels
* placeholders
* error messages
* tooltips
* menus
* pricing
* badges
* notifications
* footer
* hover states
* modal dialogs

The consistency is part of the brand.

---

# 02 — accent typeface

## space grotesk

Use **Space Grotesk sparingly**.

It exists to create contrast against JetBrains Mono.

Best uses:

* tiny metadata
* numerical indicators
* section labels
* eyebrow text
* small timestamps
* utility information
* subtle annotations
* tiny UI indicators

Example:

```text
01 / services
```

or

```text
EST. 2026
```

or

```text
AVAILABLE IN YOUR AREA
```

Space Grotesk should never overpower JetBrains Mono.

### ratio

Aim for approximately:

**90% JetBrains Mono
10% Space Grotesk**

JetBrains Mono is the identity.

Space Grotesk is the accent.

---

# 03 — casing system

This is one of the most important rules.

## lowercase-first identity

The recommended website language is entirely lowercase.

```text
white glove ward

clean homes.
clear minds.

book a cleaning

services

pricing

about us

contact
```

Never introduce random capitalization for emphasis.

Avoid:

```text
white glove WARD
White glove ward
WHITE glove ward
White Glove Ward
```

The logo itself may retain its designed appearance, but **all surrounding interface text follows the casing system.**

---

# 04 — color system

The palette should be extremely restrained.

## primary colors

### black

```text
#111111
```

Primary background and dominant brand color.

### white

```text
#FFFFFF
```

Primary light background and text on dark surfaces.

### off-white

```text
#F5F5F3
```

Use sparingly for secondary page backgrounds.

### light gray

```text
#E6E6E3
```

Borders, dividers, inactive states.

### medium gray

```text
#8A8A86
```

Secondary text and metadata.

### charcoal

```text
#222222
```

Secondary dark surfaces.

---

## palette hierarchy

```text
#111111  primary black
#FFFFFF  primary white
#F5F5F3  off-white
#E6E6E3  border
#8A8A86  secondary text
#222222  secondary black
```

There should be **no traditional brand accent color**.

No blue.

No green.

No purple.

No gradients.

The lack of color becomes part of the identity.

---

# 05 — logo usage

The supplied logo should be treated as a **high-contrast symbol**, not as decorative artwork.

The mark works particularly well against:

```text
#111111
```

with the light glove symbol creating the contrast.

### preferred applications

**dark background**

```text
[ white glove ]

white glove ward
```

**light background**

Use the dark version of the mark when available.

### clear space

Maintain approximately **1× the height of the glove mark** around the logo.

Do not:

* stretch the logo
* rotate it
* add shadows
* add gradients
* place it inside unnecessary containers
* add decorative outlines
* change its proportions

### logo philosophy

The logo should behave almost like a **stamp of quality**.

It should not dominate every section.

---

# 06 — layout philosophy

The website should feel **structured rather than decorated.**

Think:

```text
────────────────────────────────

01 / SERVICES

professional cleaning
without the hassle.

────────────────────────────────

02 / PROCESS

01  book
02  we clean
03  you relax

────────────────────────────────
```

Large amounts of whitespace are encouraged.

The page should breathe.

---

# 07 — grid

Use a strict grid system.

### desktop

12-column grid.

Recommended:

```text
max-width: 1400px
padding: 32px
gap: 24px
```

### tablet

8-column grid.

### mobile

4-column grid.

Use consistent horizontal margins.

Avoid sections where every element is independently positioned.

The website should feel **engineered**.

---

# 08 — spacing system

Use a consistent spacing scale.

```text
4px
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

Prefer large spacing between major sections.

Example:

```text
section
    ↓
96–128px
    ↓
section
```

Instead of:

```text
section
 ↓
24px
 ↓
section
```

Whitespace communicates premium quality.

---

# 09 — border radius

Keep corners extremely restrained.

Preferred:

```text
0px
```

or

```text
2px
```

Maximum:

```text
4px
```

Avoid:

```text
16px
24px
32px
9999px
```

The brand should feel **architectural**, not bubbly.

---

# 10 — borders

Use thin borders to create structure.

Primary border:

```text
1px solid #E6E6E3
```

Dark-surface border:

```text
1px solid #333333
```

Borders should be subtle.

Use them to separate:

* navigation
* service rows
* pricing
* forms
* footer sections
* interactive elements

Avoid putting every element inside a bordered card.

---

# 11 — buttons

Buttons should be simple and functional.

## primary button

```text
┌──────────────────────────┐
│  book a cleaning     →   │
└──────────────────────────┘
```

Black background.

White text.

Minimal radius.

JetBrains Mono.

### hover

The interaction should feel deliberate rather than flashy.

Example:

```text
default
book a cleaning →

hover
book a cleaning   ↗
```

or subtle inversion:

```text
black → white
white → black
```

### secondary button

Transparent background.

Thin border.

Example:

```text
view services →
```

---

# 12 — navigation

The navigation should be extremely simple.

Example:

```text
┌─────────────────────────────────────────────────────────┐

white glove ward

services     pricing     about     faq

                              book a cleaning →

└─────────────────────────────────────────────────────────┘
```

Desktop navigation should remain compact.

Avoid:

* giant navigation bars
* dropdown-heavy menus
* excessive navigation items
* decorative icons

---

# 13 — hero section

The hero should be **very spacious**.

Recommended structure:

```text
01 / PROFESSIONAL HOME CLEANING


a cleaner home.
without the hassle.


reliable, detailed cleaning
for people who value their time.


[ book a cleaning → ]


trusted • thorough • worry-free
```

The headline should be large but not overly stylized.

### recommended hierarchy

Eyebrow:

```text
01 / professional home cleaning
```

Small.

Space Grotesk.

Then:

```text
a cleaner home.
without the hassle.
```

Large.

JetBrains Mono.

Then a short explanation.

Then CTA.

---

# 14 — section labeling

Use a technical labeling system throughout the website.

Examples:

```text
01 / services
02 / how it works
03 / pricing
04 / why white glove
05 / faq
06 / contact
```

This creates a sense of organization.

It also reinforces the company's **ward / operational / systematic** personality.

---

# 15 — service presentation

Do not use a grid of generic rounded cards.

Instead, use structured rows.

Example:

```text
01

standard clean
routine maintenance
for your home

                                              from $___
                                              view service →
──────────────────────────────────────────────────────

02

deep clean
a more detailed
reset for your home

                                              from $___
                                              view service →
──────────────────────────────────────────────────────

03

move-out clean
leave the property
ready for what's next

                                              from $___
                                              view service →
```

This feels more premium and distinctive.

---

# 16 — pricing

Pricing should feel transparent.

Example:

```text
cleaning plans

01
standard

weekly
$___

biweekly
$___

monthly
$___

────────────────────

02
deep clean

starting at
$___

[ get an estimate → ]
```

Use typography and spacing rather than colorful pricing cards.

---

# 17 — forms

Forms should feel like a **simple intake system**.

Example:

```text
01 / your home

what type of home is it?

[ apartment              ]

[ house                  ]

[ condo                   ]


02 / your cleaning

how often?

[ weekly ]

[ biweekly ]

[ monthly ]


03 / your estimate

[ get my estimate → ]
```

Large inputs.

Clear labels.

Minimal borders.

No unnecessary visual decoration.

---

# 18 — interaction design

Interactions should feel **quiet and intentional.**

Avoid:

* bouncing
* excessive parallax
* spinning elements
* flashy gradients
* dramatic page transitions
* excessive hover animations

Preferred interactions:

* subtle opacity changes
* 1–4px movement
* underline animations
* border transitions
* subtle, smooth page transitions
* arrow movement
* slight inversion
* smooth expansion

Example:

```text
view services →
              ↗
```

The arrow can move slightly on hover.

---

# 19 — animation

Animation should communicate function.

Recommended timing:

```text
150ms — micro interactions
250ms — buttons
400ms — section transitions
600–800ms — page entrance
```

Use easing that feels smooth and restrained.

Nothing should feel like a template animation.

---

# 20 — photography

Photography should be **minimal and editorial**.

If photography is used:

* natural lighting
* high contrast
* clean architecture
* real homes
* close-up details
* hands working
* clean surfaces
* subtle textures

Avoid obvious stock imagery.

Avoid:

* smiling models holding spray bottles
* fake cleaning poses
* excessive bright colors
* overly staged kitchens
* generic stock photography

Photography should feel closer to:

**architecture + hospitality + editorial lifestyle**

than a traditional cleaning advertisement.

---

# 21 — iconography

Icons should be minimal.

Preferred:

* line icons
* arrows
* simple geometric symbols
* tiny utility marks

Avoid:

* cartoon icons
* colorful illustrations
* 3D icons
* emoji
* excessive icon usage

The glove logo is the primary visual symbol.

---

# 22 — mobile experience

Mobile should not simply be a compressed desktop layout.

Prioritize:

1. headline
2. CTA
3. services
4. trust signals
5. process
6. pricing
7. FAQ
8. contact

Navigation:

```text
white glove ward                         ☰
```

or a minimalist menu button.

CTA buttons should generally be full-width on mobile.

---

# 23 — footer

The footer should feel like the final page of a well-organized document.

Example:

```text
────────────────────────────────────────────

white glove ward

professional cleaning.
without the hassle.


services
pricing
about
faq
contact


book a cleaning →


© 2026 white glove ward
```

Keep it sparse.

---

# 24 — voice & copy

The copy should be:

* direct
* confident
* concise
* human
* reassuring
* slightly clever
* never salesy

Avoid:

> We are passionate about providing the highest quality cleaning services to our valued customers.

Prefer:

> your home should feel clean.
> getting it there shouldn't be complicated.

Avoid excessive adjectives.

The brand should communicate confidence by **saying less**.

---

# 25 — brand language

Good:

```text
clean homes.
clear minds.

we handle the cleaning.
you handle everything else.

thorough by default.

your home.
our standard.

cleaning, without the hassle.
```

Avoid:

```text
the #1 cleaning company!!!

we're the BEST!!!

super amazing cleaning!!!

sparkling clean guaranteed!!!
```

The brand is confident enough not to shout.

---

# 26 — UI details

Tiny details should reinforce the identity.

Examples:

```text
01 / 06
```

```text
scroll ↓
```

```text
available in your area
```

```text
response time < 24h
```

```text
booking status: confirmed
```

```text
last updated 09.07.26
```

These details can use **Space Grotesk**.

They create the technical/operational personality without turning the website into a tech company.

---

# 27 — recommended homepage structure

```text
────────────────────────────────────────
NAVIGATION
────────────────────────────────────────

01 / HERO

a cleaner home.
without the hassle.

[ book a cleaning → ]


────────────────────────────────────────

02 / TRUST

thorough cleaning.
simple experience.

[ trust signal ] [ trust signal ] [ trust signal ]


────────────────────────────────────────

03 / SERVICES

what we clean

01  standard clean
02  deep clean
03  move-out clean


────────────────────────────────────────

04 / PROCESS

how it works

01
book

02
we clean

03
you relax


────────────────────────────────────────

05 / WHY WHITE GLOVE

your home.
our standard.

short brand statement


────────────────────────────────────────

06 / PRICING

simple pricing.
no surprises.


────────────────────────────────────────

07 / CTA

ready for a cleaner home?

[ book a cleaning → ]


────────────────────────────────────────

FOOTER
────────────────────────────────────────
```

---

# 28 — visual keywords

The designer should use these keywords as the north star:

```text
minimal
precise
monochrome
editorial
architectural
technical
premium
quiet
structured
clean
confident
intentional
```

The website should look like **a cleaning company designed by someone who normally designs premium software products.**

---

# 29 — design system summary

| Element           | Direction                 |
| ----------------- | ------------------------- |
| Primary typeface  | JetBrains Mono            |
| Accent typeface   | Space Grotesk             |
| Primary casing    | lowercase                 |
| Primary color     | #111111                   |
| Secondary color   | #FFFFFF                   |
| Supporting color  | #F5F5F3                   |
| Border            | #E6E6E3                   |
| Secondary text    | #8A8A86                   |
| Accent (code only do not implement)    | #641688                   |
| Radius            | 0–4px                     |
| Grid              | 12-column desktop         |
| Layout            | structured + spacious     |
| Photography       | editorial / architectural |
| Icons             | minimal line icons        |
| Animation         | subtle + functional       |
| Buttons           | rectangular / minimal     |
| Cards             | use sparingly             |
| Gradients         | none                      |
| Shadows           | minimal / preferably none |
| Visual style      | monochrome                |
| Brand personality | precise + premium         |
| Copy              | concise + confident       |

---

# 30 — core design principle

## make cleanliness visible through design.

The website shouldn't need to tell people that white glove ward is organized, thorough, reliable, and professional.

**The website itself should demonstrate those qualities.**

Every element should have a purpose.

Every spacing decision should feel intentional.

Every interaction should feel predictable.

Every page should feel clean.

**the website is the product before the customer ever books a cleaning.**
