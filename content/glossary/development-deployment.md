# 04. DEVELOPMENT & DEPLOYMENT TERMS

## ZarishHealthHealth Glossary - Section 4

**Focus:** Engineering, DevOps, languages, frameworks, and infrastructure
**Audience:** Developers, DevOps engineers, system administrators
**Read Time:** ~20 minutes

---

## PROGRAMMING LANGUAGES

### Go (Golang)

**Category:** Programming Language
**Abbreviation:** Go
**Synonyms:** Golang
**Current Version (Jan 2026):** 1.23.5
**Related:** Backend, APIs, Performance

**Definition:**
A modern programming language designed for building fast, scalable backend systems with excellent concurrency support.

**Technical Explanation:**
Go characteristics:

1. **Fast:** Compiles to native binary (very fast)
2. **Simple:** Clean syntax, easy to learn
3. **Concurrent:** Built-in concurrency (goroutines)
4. **Statically typed:** Catch errors at compile time
5. **Cross-platform:** Compile for any OS

**In ZarishHealthHealth Context:**

- **FHIR Server:** Written in Go
  - Handles 1000s of concurrent requests
  - Fast (ms response times)
  - Minimal memory usage
  - Excellent for low-bandwidth countries
- **APIs:** Go for backend services
- **Tools:** Command-line utilities, data processing

**Go Code Example:**

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from ZarishHealth FHIR Server")
}

// Go is simple, readable, and fast
// Perfect for healthcare systems
```

**Advantages for ZarishHealth:**

- ✅ Very fast (FHIR queries instant)
- ✅ Low resource usage (costs less)
- ✅ Excellent concurrency (many hospitals simultaneously)
- ✅ Small binaries (easy to deploy)
- ✅ Great FHIR libraries available

**Learn More:**

- [Go Official Site](https://golang.org/)
- [FHIR Go Libraries](https://github.com/google/fhir)

---

### Node.js & JavaScript/TypeScript

**Category:** Programming Language
**Abbreviation:** Node.js, JS, TS
**Current Version (Jan 2026):** 24.13.0 (LTS)
**Related:** Frontend, Backend APIs, Real-time

**Definition:**
JavaScript runtime for building server-side applications, APIs, and tools. TypeScript adds strong typing.

**Technical Explanation:**
Node.js characteristics:

1. **Event-driven:** Non-blocking I/O (very fast)
2. **JavaScript:** Uses popular language
3. **NPM Ecosystem:** Millions of packages
4. **Full-stack:** Same language for frontend + backend
5. **Async-first:** Built for concurrency

**TypeScript:** JavaScript + Static typing

```typescript
// JavaScript (no type checking)
function getPatient(id) {
  return db.find(id);
}

// TypeScript (type checking)
function getPatient(id: number): Patient {
  return db.find(id);
}
// Catches type errors at compile time!
```

**In ZarishHealthHealth Context:**

- **Frontend:** React (Node.js + JavaScript)
- **APIs:** Hono or Express for REST/GraphQL
- **Tools:** Build scripts, deployment automation
- **Real-time:** WebSocket APIs for live updates
- **Advantages:** Same language everywhere, rapid development

**Learn More:**

- [Node.js Official Site](https://nodejs.org/)
- [TypeScript Official Site](https://www.typescriptlang.org/)

---

### React

**Category:** Frontend Framework
**Abbreviation:** React
**Current Version (Jan 2026):** 19.0.0
**Related:** JavaScript, UI, Frontend

**Definition:**
A JavaScript library for building interactive user interfaces with reusable components.

**Technical Explanation:**
React concepts:

1. **Components:** Reusable UI pieces (Button, Form, Table)
2. **Props:** Data passed to components
3. **State:** Component's internal data
4. **Hooks:** Functions to add state/side effects
5. **Virtual DOM:** Efficient rendering

**React Example:**

```jsx
function PatientForm() {
  const [name, setName] = React.useState("");
  
  return (
    <div>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)}
        placeholder="Patient name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

**In ZarishHealthHealth Context:**

- **ZarishHealth UI:** Platform built with React
- **Reusable:** Components shared across modules
- **Fast:** Minimal page reloads
- **Mobile-friendly:** Responsive design
- **Real-time:** Updates instantly

**Advantages for ZarishHealth:**

- ✅ Modern UI (doctors want good UX)
- ✅ No page refreshes (faster workflow)
- ✅ Reusable components (faster development)
- ✅ Works offline (with service workers)
- ✅ Works on all devices (web + mobile)

**Learn More:**

- [React Official Site](https://react.dev/)
- [React Hooks](https://react.dev/reference/react)

---

## FRAMEWORKS & TOOLS

### Docusaurus

**Category:** Documentation Tool
**Current Version (Jan 2026):** 3.7.0
**Synonyms:** Doc site generator, static site generator
**Related:** Documentation, Static HTML, GitHub Pages

**Definition:**
A tool for building beautiful documentation websites quickly, converting Markdown files to static HTML.

**Technical Explanation:**
Docusaurus features:

1. **Markdown-first:** Write docs in Markdown
2. **Static:** Generates static HTML (fast, secure)
3. **Responsive:** Works on all devices
4. **Search:** Full-text search built-in
5. **Versioning:** Multiple doc versions

**In ZarishHealth Context:**

- **zarishhealth.github.io:** Built with Docusaurus
- **Content:** Written in Markdown
- **No CMS needed:** Git-based workflow
- **Version management:** Different versions of docs
- **Automatic deploy:** GitHub → zarishhealth.github.io

**Docusaurus File Structure:**

```
docs/
├── docs/
│   ├── intro.md
│   ├── getting-started.md
│   ├── health/
│   │   ├── emr.md
│   │   ├── pharmacy.md
│   │   └── lab.md
│   └── governance/
│       ├── contributing.md
│       └── roadmap.md
├── docusaurus.config.js
└── package.json
```

**Learn More:**

- [Docusaurus Official](https://docusaurus.io/)
- [Markdown Guide](https://www.markdownguide.org/)

---

### Hono

**Category:** Web Framework
**Abbreviation:** Hono
**Related:** APIs, Cloudflare Workers, REST

**Definition:**
A lightweight, fast web framework for building APIs, especially designed for edge computing and serverless.

**Technical Explanation:**
Hono characteristics:

1. **Lightweight:** Minimal overhead
2. **Fast:** Very quick request handling
3. **Edge-friendly:** Works on CloudFlare Workers
4. **TypeScript:** Full type support
5. **Middleware:** Easy to add auth, validation, etc.

**Hono Example:**

```typescript
import { Hono } from 'hono'

const app = new Hono()

// GET patient by ID
app.get('/api/patients/:id', (c) => {
  const id = c.req.param('id')
  // Fetch patient from database
  return c.json({ id, name: 'Mohammed Ahmed' })
})

// POST create new patient
app.post('/api/patients', (c) => {
  // Validate input
  // Save to database
  return c.json({ success: true })
})

export default app
```

**In ZarishHealthHealth Context:**

- **APIs:** Built with Hono
- **Cloudflare Workers:** Run on edge (low latency)
- **Scalable:** Handles millions of requests
- **Cost-effective:** Serverless (pay per use)
- **Type-safe:** TypeScript for fewer bugs

**Learn More:**

- [Hono Official](https://hono.dev/)
- [Cloudflare Workers + Hono](https://hono.dev/docs/getting-started/cloudflare-workers)

---

### Supabase

**Category:** Backend-as-a-Service
**Abbreviation:** Supabase
**Related:** Database, Auth, Real-time
**Current Version (Jan 2026):** Latest

**Definition:**
An open-source Firebase alternative providing database, auth, storage, and real-time APIs without building backend.

**Technical Explanation:**
Supabase components:

1. **PostgreSQL:** Powerful relational database
2. **Authentication:** User login/signup
3. **Real-time:** Live data updates
4. **Storage:** File uploads (images, documents)
5. **Vector Search:** AI-powered search

**Supabase Pricing:**

```
Free Tier (perfect for ZarishHealth):
- PostgreSQL database: 500MB
- Auth: 50,000 users
- Storage: 1GB
- Real-time: Included
- Cost: $0

Paid (if you grow):
- More database storage: $25/month
- Higher limits: Scales with you
```

**In ZarishHealthHealth Context:**

```
ZarishHealth Backend Architecture:
├── React Frontend (UI)
├── Hono APIs (Cloudflare Workers)
├── Supabase Backend:
│   ├── PostgreSQL (patient data, medications)
│   ├── Auth (login/logout)
│   ├── Storage (document uploads)
│   └── Real-time (updates to dashboards)
└── Go FHIR Server (specialized health data)
```

**Learn More:**

- [Supabase Official](https://supabase.com/)
- [Supabase Free Tier](https://supabase.com/pricing)

---

### Tailwind CSS

**Category:** CSS Framework
**Current Version (Jan 2026):** 4.0.2
**Synonyms:** Utility CSS, atomic CSS
**Related:** Styling, Frontend, UI Design

**Definition:**
A utility-first CSS framework for building modern, responsive UIs without writing custom CSS.

**Technical Explanation:**
Tailwind approach:

```jsx
// Traditional: Write CSS
<style>
  .button {
    background: blue;
    padding: 10px 20px;
    border-radius: 5px;
  }
</style>
<button class="button">Click me</button>

// Tailwind: Use utilities
<button class="bg-blue-500 px-5 py-2 rounded">
  Click me
</button>
```

**Advantages:**

- ✅ Fast development (no custom CSS)
- ✅ Consistent design (predefined colors, sizes)
- ✅ Responsive (mobile-first)
- ✅ Small bundle (unused utilities removed)
- ✅ Dark mode (built-in)

**In ZarishHealthHealth Context:**

- **UI:** ZarishHealth UI uses Tailwind
- **Consistency:** All screens look cohesive
- **Responsive:** Works on phones, tablets, desktop
- **Rapid:** Developers build UIs fast
- **Professional:** Polished appearance

**Learn More:**

- [Tailwind Official](https://tailwindcss.com/)

---

## INFRASTRUCTURE & DEPLOYMENT

### CloudFlare

**Category:** CDN & Edge Computing
**Abbreviation:** CF
**Related:** DNS, Edge, Performance, Security

**Definition:**
A global network providing DNS, CDN, edge computing, and security services that sits between users and origin servers.

**Technical Explanation:**
CloudFlare services:

1. **DNS:** Fast domain name resolution
2. **CDN:** Caches content globally (faster)
3. **Edge:** Code runs near users (low latency)
4. **DDoS Protection:** Blocks attacks
5. **Firewall:** Web Application Firewall (WAF)

**In ZarishHealthHealth Context:**

```
Traditional:
User → Internet → Origin Server (in US) → Slow

With CloudFlare:
User → CloudFlare Edge (nearby country) → Origin
     (instant!)

Benefits:
- 🚀 Very fast (content served from nearby)
- 🔒 DDoS protection (attacks blocked)
- 💰 Cheaper (CDN caches reduces origin load)
- 🌍 Global reach (servers in 200+ cities)
```

**ZarishHealth CloudFlare Setup:**

```
CloudFlare manages:
├── DNS (ZarishHealthsphere.com)
├── CDN (serves static files fast)
├── Edge (runs code on CloudFlare Workers)
├── Caching (reduces database load)
├── DDoS (protects from attacks)
└── HTTPS (free SSL certificates)

Cost: Free tier + ~$20/month if needed
```

**Learn More:**

- [CloudFlare Official](https://www.cloudflare.com/)
- [CloudFlare Workers](https://workers.cloudflare.com/)

---

### GitHub Pages

**Category:** Static Hosting
**Related:** Static HTML, Documentation, Deployment

**Definition:**
A free hosting service for static HTML websites, directly from GitHub repositories.

**Technical Explanation:**
How it works:

```
1. Push HTML to GitHub repo
2. GitHub Pages detects it
3. Serves as website at username.github.io
4. Or with custom domain (ZarishHealthsphere.com)
5. HTTPS automatic
6. No server needed
```

**In ZarishHealthHealth Context:**

- **docs.ZarishHealthsphere.com:** Hosted on GitHub Pages
- **Docusaurus builds:** Static HTML
- **Deployed:** Automatically on every push
- **Cost:** $0
- **Scalability:** Unlimited traffic (no costs!)
- **Reliability:** GitHub's infrastructure (99.9% uptime)

**GitHub Pages Setup:**

```
1. Create repo: zs-docs/docs-site
2. Push static HTML to repo
3. Enable Pages in repo settings
4. Add custom domain: docs.ZarishHealthsphere.com
5. GitHub auto-issues SSL cert
6. Website live at https://docs.ZarishHealthsphere.com
```

**Learn More:**

- [GitHub Pages Official](https://pages.github.com/)

---

### PostgreSQL

**Category:** Database
**Current Version (Jan 2026):** 17.2
**Abbreviation:** Postgres, PG
**Related:** Database, SQL, Data Storage

**Definition:**
A powerful, open-source relational database system excellent for healthcare data.

**Technical Explanation:**
PostgreSQL features:

1. **Relational:** Tables with relationships
2. **ACID:** Data integrity guaranteed
3. **JSON:** Can store JSON documents
4. **Powerful:** Complex queries, aggregations
5. **Free:** Open-source, no licensing costs

**Why PostgreSQL for Healthcare:**

```
Patient-Medication Relationship:
CREATE TABLE patients (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  birth_date DATE,
  gender VARCHAR(10)
);

CREATE TABLE medications (
  id INT PRIMARY KEY,
  patient_id INT REFERENCES patients(id),
  name VARCHAR(255),
  dosage VARCHAR(100),
  prescribed_date DATE
);

# Query: Get all medications for patient 123
SELECT m.name, m.dosage
FROM medications m
WHERE m.patient_id = 123;

# Very efficient, data integrity, relational!
```

**In ZarishHealthHealth Context:**

- **Data:** All patient, medication, lab data
- **Provided:** Supabase includes PostgreSQL
- **Local:** Can self-host if needed
- **Performance:** Millions of records, instant queries
- **Cost:** Free (Supabase free tier)

**Learn More:**

- [PostgreSQL Official](https://www.postgresql.org/)
- [PostgREST (REST API from SQL)](https://postgrest.org/)

---

## CI/CD & AUTOMATION

### GitHub Actions

**Category:** CI/CD Platform
**Related:** Automation, Testing, Deployment
**Cost:** Free for public repos

**Definition:**
A tool for automating tasks in GitHub: run tests, build code, deploy, validate - all triggered by events.

**Technical Explanation:**
GitHub Actions workflow:

```yaml
name: Tests and Deploy

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy

# Triggered on: Every push or PR
# Runs: Tests, build, deploy automatically
# Cost: Free!
```

**In ZarishHealthHealth Context:**

```
ZarishHealth CI/CD Pipelines:

1. On every commit:
   ✅ Run tests
   ✅ Lint code (check style)
   ✅ Check FHIR profiles valid
   ✅ Build documentation

2. On merge to main:
   ✅ Build production code
   ✅ Deploy to staging
   ✅ Run integration tests

3. On tag (release):
   ✅ Create release notes
   ✅ Deploy to production
   ✅ Notify stakeholders
```

**Benefits:**

- ✅ Automated (no manual steps)
- ✅ Consistent (same process every time)
- ✅ Fast (catches errors immediately)
- ✅ Free (no additional cost)

**Learn More:**

- [GitHub Actions Official](https://github.com/features/actions)

---

### Docker & Containers

**Category:** Containerization
**Abbreviation:** Docker
**Related:** Deployment, Reproducibility
**Optional:** ZarishHealth uses containers for complex deploys

**Definition:**
A tool for packaging applications and their dependencies into containers that run the same anywhere.

**Technical Explanation:**

```
Without Docker:
"Works on my Mac"
"Doesn't work on Windows"
"Different version on server"
(Dependency hell!)

With Docker:
Dockerfile defines: OS + Dependencies + Code
→ Container = same everywhere
→ Dev machine = Server = Production
→ "If it works in container, it works everywhere"
```

**Dockerfile Example:**

```dockerfile
FROM golang:1.23

WORKDIR /app

COPY . .

RUN go build -o fhir-server .

EXPOSE 8080

CMD ["./fhir-server"]

# This container:
# - Uses Go 1.23
# - Builds the FHIR server
# - Runs the server
# - Works exactly the same everywhere!
```

**In ZarishHealthHealth Context:**

- **Optional:** Can use for complex deployments
- **Development:** Developers get same environment
- **Production:** Deploy same container to servers
- **Scaling:** Easy to run multiple containers
- **Easy for non-coders:** Skip for now, use later if needed

**Learn More:**

- [Docker Official](https://www.docker.com/)

---

### Terraform / Infrastructure as Code

**Category:** Infrastructure Automation
**Abbreviation:** IaC, Terraform
**Related:** Deployment, CloudFlare, AWS

**Definition:**
A tool for defining infrastructure (servers, databases, networking) in code files, version-controlled and reproducible.

**Technical Explanation:**

```terraform
# main.tf - Define infrastructure

resource "cloudflare_zone" "ZarishHealth" {
  account_id = var.account_id
  zone       = "health.ZarishHealthsphere.com"
}

resource "cloudflare_page_rule" "cache" {
  zone_id = cloudflare_zone.ZarishHealth.id
  target  = "*.health.ZarishHealthsphere.com/*"
  actions {
    cache_level = "cache_everything"
  }
}

# Deploy:
terraform init
terraform apply

# Result: Infrastructure created automatically!
# Can destroy: terraform destroy
# Version control: infrastructure in Git
```

**In ZarishHealthHealth Context:**

- **Optional:** Start with manual CloudFlare setup
- **Future:** IaC when deploying to multiple countries
- **Benefit:** Countries can replicate infrastructure
- **Easy:** One file, everyone gets same setup

**Learn More:**

- [Terraform Official](https://www.terraform.io/)

---

## VERSION CONTROL

### Git

**Category:** Version Control System
**Abbreviation:** Git
**Related:** GitHub, Branches, Commits

**Definition:**
A system for tracking code changes, enabling collaboration and maintaining history.

**Technical Explanation:**
Git concepts:

1. **Repository:** Project folder with history
2. **Commit:** Snapshot of code at a point in time
3. **Branch:** Parallel version of code
4. **Push:** Send commits to server (GitHub)
5. **Pull Request:** Propose changes (code review)

**Basic Workflow:**

```bash
# Clone repository
git clone https://github.com/zarishhealth/docs.git
cd docs-site

# Create feature branch
git checkout -b feature/patient-allergies

# Make changes
# Edit files...

# Stage changes
git add .

# Commit (snapshot)
git commit -m "Add patient allergy tracking"

# Push to server
git push origin feature/patient-allergies

# Create Pull Request on GitHub (for review)
# Get approved, merge to main

# Deployed!
```

**Learn More:**

- [Git Official](https://git-scm.com/)
- [GitHub Guide](https://github.com/skills)

---

### GitHub

**Category:** Collaboration Platform
**Abbreviation:** GitHub
**Related:** Git, Version Control, Hosting

**Definition:**
A web platform for hosting Git repositories, enabling collaboration, code review, and project management.

**Technical Explanation:**
GitHub features:

1. **Repositories:** Store code
2. **Issues:** Track bugs/features
3. **Pull Requests:** Code review
4. **Actions:** Automation
5. **Discussions:** Community chat
6. **Pages:** Website hosting

**In ZarishHealthHealth Context:**

- **zs-docs organization:** Platform + docs
- **zs-platform organization:** Health + ops
- **Issues:** Feature requests, bug reports
- **Pull Requests:** Code review process
- **Pages:** docs.ZarishHealthsphere.com hosted here
- **Actions:** Automated tests and deploys
- **Cost:** Free for open-source

**Learn More:**

- [GitHub Official](https://github.com/)

---

## TESTING

### Unit Tests

**Category:** Testing Practice
**Synonyms:** Unit testing, code testing
**Related:** Quality, CI/CD, Automation

**Definition:**
Tests that verify small pieces of code (functions) work correctly in isolation.

**Technical Explanation:**

```javascript
// Code being tested
function calculateBMI(weight, height) {
  return weight / (height * height);
}

// Unit test
test('Calculate BMI correctly', () => {
  const bmi = calculateBMI(70, 1.7); // 70kg, 1.7m
  expect(bmi).toBeCloseTo(24.2, 1); // ~24.2 is normal
});

test('Handle zero height', () => {
  expect(() => calculateBMI(70, 0)).toThrow();
});
```

**Benefits:**

- ✅ Catches bugs early
- ✅ Documents code behavior
- ✅ Enables refactoring safely
- ✅ Faster than manual testing

**In ZarishHealthHealth Context:**

- Every API has unit tests
- FHIR profiles validated
- Automated in GitHub Actions
- Required before merge

**Learn More:**

- [Jest Testing Framework](https://jestjs.io/)

---

### Integration Tests

**Category:** Testing Practice
**Synonyms:** End-to-end testing
**Related:** Quality, Testing, Validation

**Definition:**
Tests that verify multiple components work together correctly.

**Technical Explanation:**

```javascript
// Integration test: Full workflow
test('Patient registration workflow', async () => {
  // Create patient record
  const patient = await createPatient({
    name: 'Mohammed Ahmed',
    dob: '1978-05-15'
  });
  expect(patient.id).toBeDefined();
  
  // Add medication
  const med = await addMedication(patient.id, {
    name: 'Metformin',
    dosage: '500mg'
  });
  expect(med.patientId).toBe(patient.id);
  
  // Retrieve and verify
  const retrieved = await getPatient(patient.id);
  expect(retrieved.medications.length).toBe(1);
});
```

**Benefits:**

- ✅ Tests real workflows
- ✅ Catches integration issues
- ✅ Verifies data flow

**Learn More:**

- [Integration Testing Best Practices](https://www.testim.io/blog/integration-testing/)

---

## SUMMARY TABLE

| Term              | Category        | See Also       |
| ----------------- | --------------- | -------------- |
| Go                | Language        | Backend, FHIR  |
| Node.js           | Language        | Frontend, API  |
| React             | Framework       | UI, Frontend   |
| TypeScript        | Language        | Type safety    |
| Docusaurus        | Documentation   | Static HTML    |
| Hono              | Framework       | APIs, Edge     |
| Supabase          | Backend         | Database, Auth |
| Tailwind          | Styling         | CSS, UI        |
| CloudFlare        | CDN             | Edge, DNS      |
| GitHub Pages      | Hosting         | Static sites   |
| PostgreSQL        | Database        | Data storage   |
| GitHub Actions    | CI/CD           | Automation     |
| Docker            | Containers      | Deployment     |
| Terraform         | IaC             | Infrastructure |
| Git               | Version Control | Code history   |
| GitHub            | Platform        | Collaboration  |
| Unit Tests        | Testing         | Quality        |
| Integration Tests | Testing         | Workflows      |

---

**[Back to Glossary Index](./index.md)**

---

*Last updated: January 26, 2026*
*Version: 1.0.0*
