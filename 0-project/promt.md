# Your mission
Build a website with the stack provided the accomplishes the main message and style guide. 

# Main Message
## White glove ward: 

> **A modern, highly reliable cleaning company built around easy online booking, transparent fixed pricing, recurring service, and specialized move-out/turnover cleaning.**

There are plenty of cleaners, but many still operate like traditional local service businesses: call/text for a quote, manually schedule, relatively vague pricing, and inconsistent online presence.

That creates room for a company that feels more like **Uber/Airbnb for cleaning** than a traditional maid service.

we are not really competing on:

> “Our vacuum is better.”

They’re competing on:

> **“You can trust us to make this problem disappear.”**

That’s the real product.


# Stack
- framework: React19 Web TS with Vite for building
- ui/ux: tailwindcssV4
- animation: motion (prev framer motion)
- database: supabase - postgreSQL (provide sql for tables to create and request needed auth)
- hosting: cloudflare pages
- serverless functions: cloudflare

# Style
Refer to `./styleguide.jpg` and `./styleguide.md`.

# Pages
1. home
2. services
3. pricing
4. about
5. faq

# Features 
## 1. 

## 2. Customer aquisition / Company portal
*(different levels of auth in supabase)*
### Customer

1. Enter address
2. Select home size
3. Select service
4. See exact price
5. Pick date
6. Pay (build only ui/ux not connectors, add simulate for testing)
7. Get cleaner notification
8. Receive completion photos
9. Rate service
10. Automatically schedule next cleaning

### Cleaner
Gets:

- route
- customer
- checklist
- estimated time
- special instructions
- gives before/after photos
- payment (build only ui/ux not connectors)
- rating

### Manager

Gets:

- scheduling
- customer management
- recurring revenue
- total revenue 
- payroll (build only ui/ux not connectors)
- route optimization
- reviews
- customer acquisition
- performance metrics