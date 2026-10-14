# CORE PLATFORM TERMS

## ZarishHealthHealth Glossary - Section 1

**Focus:** Architecture, design patterns, and fundamental platform concepts
**Audience:** Everyone (essential reading)
**Read Time:** ~15 minutes

---

## ARCHITECTURE & DESIGN PATTERNS

### API-First Design

**Category:** Architectural Pattern
**Synonyms:** API-driven design, API-centric architecture
**Related:** REST, GraphQL, Contract-First Design

**Definition:**
An architectural approach where Application Programming Interfaces (APIs) are designed *first*, before implementing user interfaces or databases. Everything communicates through well-defined APIs.

**Technical Explanation:**
API-first means:

1. Define API contracts (OpenAPI/Swagger) before coding
2. Backend and frontend teams work independently
3. APIs are the contract between services
4. Multiple clients (web, mobile, integrations) use the same API
5. Easy to maintain backward compatibility

**In ZarishHealthHealth Context:**

- All health modules expose REST APIs
- FHIR endpoints are API contracts
- Documentation defines API behavior *before* implementation
- Multiple interfaces (web, mobile, integrations) share same APIs
- Enables vendor-neutral, modular architecture

**Example:**

```
Traditional approach:
Database → Backend Code → REST API → Frontend UI

API-First approach:
API Contract (OpenAPI) → Backend Implementation → Frontend Implementation
(Contracts defined first, everyone follows contract)
```

**Learn More:**

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/latest/OpenAPI-Specification)
- [API-First Design Principles](https://swagger.io/resources/articles/best-practices-in-api-first-design/)

---

### FHIR-First Design

**Category:** Healthcare Architectural Pattern
**Synonyms:** FHIR-centric design
**Related:** Healthcare Interoperability, API-First Design

**Definition:**
An architectural approach that treats FHIR (Fast Healthcare Interoperability Resources) as the *canonical* (primary) data format for all healthcare data, not an afterthought.

**Technical Explanation:**
FHIR-first means:

1. All health data stored in FHIR-compliant format
2. Internal APIs use FHIR Resources
3. Data transformations happen at boundaries (if needed)
4. Easy to exchange with other FHIR systems
5. Profiles enforce governance (what's allowed/required)

**In ZarishHealthHealth Context:**

- Patient data stored as FHIR Patient resource
- Medications stored as FHIR Medication resources
- Encounters stored as FHIR Encounter resources
- All country-specific variations use FHIR Profiles
- Integration with national systems via FHIR

**Contrast:**

```
Legacy approach: Custom internal format → API → HL7 conversion
FHIR-first approach: FHIR Resource → API → Other systems (natively compatible)
```

**Learn More:**

- [HL7 FHIR R5 Specification](http://hl7.org/fhir/R5/)
- [FHIR Implementation Guide Tutorial](https://www.hl7.org/fhir/R5/implementationguide.html)

---

### Static-First Architecture

**Category:** Infrastructure Pattern
**Synonyms:** Static site generation, JAMstack
**Related:** Serverless, GitHub Pages, CloudFlare Pages

**Definition:**
An architecture that prioritizes static HTML/CSS/JavaScript files (pre-built at deploy time) over dynamic server-generated content, served from global CDN.

**Technical Explanation:**
Static-first means:

1. Content generated at *build time* (not request time)
2. Served from CDN globally (faster, cheaper)
3. No database queries per request
4. Highly scalable (handles 10M requests for free)
5. Secure by default (no server vulnerabilities)

**In ZarishHealthHealth Context:**

- Documentation site (Docusaurus) is static HTML → GitHub Pages
- Landing pages static → CloudFlare Pages
- Reduces infrastructure cost to near-zero
- Perfect for healthcare where data is sensitive (static = secure)
- Can add dynamic APIs for real-time features

**Architecture:**

```
Static-first approach:
Build Time: React Code → HTML/CSS/JS → CDN
Request Time: User → CDN → Instant HTML (no server needed)

Dynamic approach (costly):
Request Time: User → Server → Database Query → Generate HTML → Send
```

**Learn More:**

- [JAMstack Architecture](https://jamstack.org/)
- [GitHub Pages Static Hosting](https://pages.github.com/)

---

### Serverless Architecture

**Category:** Infrastructure Pattern
**Synonyms:** Function-as-a-Service (FaaS), event-driven
**Abbreviation:** FaaS
**Related:** CloudFlare Workers, Supabase, AWS Lambda

**Definition:**
An architecture where code runs *without managing servers*. You write functions, cloud provider handles scaling, availability, and infrastructure.

**Technical Explanation:**
Serverless means:

1. Write functions (not full applications)
2. Cloud provider runs them when triggered
3. Auto-scales from 0 to 1000s of concurrent requests
4. Pay only for actual usage (minutes of execution)
5. No server management needed

**In ZarishHealthHealth Context:**

- API endpoints run on CloudFlare Workers
- Background jobs run on serverless platforms
- FHIR validation runs serverless
- Cost: $0 for small usage, minimal for large usage
- Perfect for NGO budgets (no monthly server costs)

**Example Workflow:**

```
Traditional Server (costs $50/month regardless of usage):
Always Running → High Cost → Wasted Resources

Serverless (costs $0.001 per 100,000 requests):
Only Runs When Needed → Low Cost → Efficient
```

**Learn More:**

- [CloudFlare Workers Documentation](https://workers.cloudflare.com/)
- [Serverless Framework](https://www.serverless.com/)

---

## PLATFORM MODELS

### PaaS (Platform-as-a-Service)

**Category:** Service Model
**Abbreviation:** PaaS
**Synonyms:** Platform as a Service
**Related:** SaaS, IaaS, Open Core

**Definition:**
A cloud service model where customers build and run their own applications *on* a provided platform, without managing underlying infrastructure.

**Technical Explanation:**
PaaS provides:

1. Development environment (pre-configured tools)
2. Deployment infrastructure (auto-scaling servers)
3. Managed services (databases, auth, storage)
4. Developer doesn't manage: servers, OS, networking

**In ZarishHealthHealth Context:**

- Organizations build custom health modules *on* ZarishHealth platform
- Platform provides: FHIR server, auth, APIs, hosting
- Developers focus on: business logic, not infrastructure
- Example: Health ministry builds refugee health module on ZarishHealth

**User Journey:**

```
SaaS (Ready-Made):
User → Pre-built App (ZarishHealth HIS) → Done

PaaS (DIY Platform):
Developer → ZarishHealth Platform → Build Custom Module → Deploy
```

**Learn More:**

- [NIST PaaS Definition](https://csrc.nist.gov/publications/detail/sp/800-145/final)

---

### SaaS (Software-as-a-Service)

**Category:** Service Model
**Abbreviation:** SaaS
**Synonyms:** Software as a Service
**Related:** PaaS, IaaS, Open Core

**Definition:**
A software delivery model where applications are hosted in the cloud and accessed through a web browser, rather than installed locally.

**Technical Explanation:**
SaaS means:

1. Software runs in cloud (not on your computer)
2. Access via browser or API
3. Vendor manages: servers, updates, backups, security
4. User pays subscription or per-use fee
5. No installation or maintenance needed

**In ZarishHealthHealth Context:**

- Organizations use ZarishHealth HIS (Health Information System) as SaaS
- They don't manage servers or updates
- ZarishHealth team maintains platform
- Organization focuses on patient care, not IT ops

**Example:**

```
Traditional Software (Licensed):
Buy → Install → Maintain → Upgrade (yourself) → Support

SaaS (Cloud):
Sign Up → Use in Browser → Auto-Updated → Support from vendor
```

**Learn More:**

- [NIST SaaS Definition](https://csrc.nist.gov/publications/detail/sp/800-145/final)

---

### IaaS / IaC (Infrastructure-as-Code)

**Category:** Service/Practice Model
**Abbreviation:** IaC, IaaS
**Synonyms:** Infrastructure as Code, Infrastructure as a Service
**Related:** Serverless, CloudFlare, Terraform

**Definition:**
IaC: Infrastructure managed through code files (declarative) instead of manual configuration.
IaaS: Cloud service providing virtualized computing resources (servers, storage, networking).

**Technical Explanation:**

**IaC means:**

1. Infrastructure defined in YAML/JSON files
2. Version controlled (like code)
3. Reproducible (same file = same infrastructure)
4. Automated deployment (click deploy, infrastructure created)

**IaaS means:**

1. Cloud provider rents: servers, storage, networking
2. You manage: OS, applications, data
3. Provider manages: physical hardware
4. Pay per resource usage

**In ZarishHealthHealth Context:**

- **IaC:** All infrastructure defined in Terraform files
  - Country can deploy entire HIS by `terraform apply`
  - No manual clicking in AWS/CloudFlare
  - Reproducible across countries
- **IaaS:** We use CloudFlare and Supabase (cloud providers manage hardware)

**Example Infrastructure-as-Code:**

```yaml
# terraform/main.tf
resource "cloudflare_zone" "ZarishHealth" {
  account_id = var.cloudflare_account_id
  zone       = "health.ZarishHealthsphere.com"
}

resource "cloudflare_page_rule" "cache" {
  zone_id = cloudflare_zone.ZarishHealth.id
  target  = "*.health.ZarishHealthsphere.com/*"
  actions {
    cache_level = "cache_everything"
  }
}

# One file defines entire infrastructure!
# Deploy: terraform apply → Infrastructure created automatically
```

**Learn More:**

- [Terraform Documentation](https://www.terraform.io/)
- [Infrastructure as Code Best Practices](https://www.hashicorp.com/resources/what-is-infrastructure-as-code)

---

### Open Core Model

**Category:** Business/Licensing Model
**Synonyms:** Open core, Freemium, Open-source core
**Related:** Open Source, Free Tier, Vendor Lock-in

**Definition:**
A business model where the *core* platform is open-source and free, while optional advanced features or commercial modules are paid.

**Technical Explanation:**
Open core means:

1. Core platform: open-source, free, community-driven
2. Core features: enough to be useful standalone
3. Premium features: optional (optional modules)
4. Commercial: businesses can charge for extensions/support
5. No vendor lock-in: core is portable

**In ZarishHealthHealth Context:**

- **Core (Free):** FHIR server, auth, basic HIS modules
- **Premium (Optional):** Advanced analytics, country-specific customizations, support
- **Philosophy:** NGOs get free, scalable platform. Support comes from voluntary contributions or pay-as-you-go services

**Model:**

```
Proprietary Software:
Pay → Use → No source → Vendor locked in

Open Core:
Core is Free & Open → Use → Can modify → Can switch
Premium Features Available → Pay if want advanced

vs.

Fully Free/Open:
All free → Sustainability challenge
```

**Learn More:**

- [Open Core Definition](https://en.wikipedia.org/wiki/Open-core_model)
- [Examples: GitLab, Supabase, DataDog](https://www.freecodecamp.org/news/open-core-software/)

---

## CORE CONCEPTS

### Federated Architecture

**Category:** System Design
**Synonyms:** Distributed, Decentralized
**Related:** Modular, Loosely Coupled, Microservices

**Definition:**
A system design where *independent* but *coordinated* services work together, each maintaining autonomy while participating in a larger ecosystem.

**Technical Explanation:**
Federated means:

1. Each service is independent (different tech, different team)
2. Services coordinate via APIs/standards (FHIR, REST)
3. Each can fail without taking down whole system
4. Each can scale independently
5. Each can be managed by different organization

**In ZarishHealthHealth Context:**

- Bangladesh health system = federation of hospitals
- Each hospital runs its own EMR (or ZarishHealth module)
- Hospitals coordinate via FHIR integration
- Central registry has patient IDs, hospitals have clinical details
- A hospital can switch systems without breaking national system

**Architecture:**

```
Centralized (single server):
All Data → Single Hospital Database → Single Point of Failure ✗

Federated (distributed):
Hospital A ↔ FHIR Standard ↔ Hospital B
Hospital B ↔ FHIR Standard ↔ National Registry
Each independent, coordinated via standard
```

**Learn More:**

- [Federated Systems Design](https://en.wikipedia.org/wiki/Federated_learning)
- [OpenHIE Federated Architecture](https://openhie.github.io/)

---

### Modular Architecture

**Category:** System Design
**Synonyms:** Component-based, Plugin-based
**Related:** Microservices, Loose Coupling, Separation of Concerns

**Definition:**
A system design where large applications are broken into *independent, replaceable modules* that each handle a specific concern.

**Technical Explanation:**
Modular means:

1. Each module: one responsibility (patient, pharmacy, lab)
2. Modules can be: developed independently, tested separately, replaced
3. Clear interfaces: modules communicate via APIs
4. Swappable: can replace pharmacy module with different one
5. Composable: can pick and choose modules needed

**In ZarishHealthHealth Context:**

- Patient Module: patient registration, demographics
- Pharmacy Module: medication ordering, inventory
- Lab Module: lab tests, results
- Each module can be built by different team
- A country can use all modules, or just some
- A module can be developed by partner organization

**Structure:**

```
ZarishHealthHealth Platform
├── Patient Module (manages patient data)
├── Pharmacy Module (manages medications)
├── Lab Module (manages tests)
├── Finance Module (manages billing)
└── Each module exposes APIs, can be replaced
```

**Learn More:**

- [Modular Software Design](https://en.wikipedia.org/wiki/Modularity_(software))

---

### SSOT (Single Source of Truth)

**Category:** Data Governance
**Synonyms:** Source of truth, golden record
**Abbreviation:** SSOT
**Related:** Data Sovereignty, Master Data, Authoritative Source

**Definition:**
A single, authoritative source for a piece of information, preventing conflicting or outdated copies elsewhere in the system.

**Technical Explanation:**
SSOT means:

1. *One* place where "true" data lives
2. All other places reference or copy from SSOT
3. Changes happen in SSOT first
4. All systems eventually consistent with SSOT
5. Conflicts resolved at SSOT

**In ZarishHealthHealth Context:**

- **Patient SSOT:** National ID + demographics at national registry
- Each hospital has copy of patient record
- Hospital updates go to national registry
- Hospital receives updates from registry
- No conflicting patient records

**Example:**

```
Without SSOT:
Hospital A: Patient Age = 25
Hospital B: Patient Age = 24 ← Conflict! Who's right?

With SSOT (National Registry):
National Registry: Patient Age = 25 ← Source of truth
Hospital A: syncs from registry → Age = 25
Hospital B: syncs from registry → Age = 25 ← Consistent
```

**Learn More:**

- [SSOT Design Pattern](https://en.wikipedia.org/wiki/Single_source_of_truth)

---

### Contract-First Design

**Category:** Development Pattern
**Synonyms:** API contracts, specification-first, schema-first
**Related:** API-First Design, OpenAPI, FHIR Profiles

**Definition:**
A development approach where the *contract* (specification) between components is defined *first*, before implementation.

**Technical Explanation:**
Contract-first means:

1. Define contract (API spec, data schema)
2. Frontend and backend develop against contract
3. Both can work independently
4. Breaking changes are visible immediately
5. Easier to maintain backward compatibility

**In ZarishHealthHealth Context:**

- FHIR Profiles = contracts for health data
- OpenAPI specs = contracts for REST APIs
- GraphQL schemas = contracts for GraphQL APIs
- Different teams can work on different modules using contracts
- Contracts catch incompatibilities early

**Development Flow:**

```
Traditional (code-first):
Backend Dev writes code → Frontend tries to use → "Doesn't match!" ✗

Contract-first:
Define contract → Backend implements contract → Frontend implements contract ✓
```

**Learn More:**

- [Contract-First API Development](https://www.postman.com/api-platform/api-design/)

---

## INTEGRATION & STANDARDS

### REST (Representational State Transfer)

**Category:** API Architecture
**Abbreviation:** REST
**Synonyms:** RESTful API
**Related:** HTTP, JSON, GraphQL, gRPC

**Definition:**
An architectural style for building APIs using standard HTTP methods (GET, POST, PUT, DELETE) to operate on resources.

**Technical Explanation:**
REST principles:

1. Resources (Patient, Medication, Lab Result)
2. Represented as nouns (not verbs)
3. Operations via HTTP methods:
   - GET = Retrieve
   - POST = Create
   - PUT = Update
   - DELETE = Remove
4. Stateless (each request independent)
5. Standard format (usually JSON)

**In ZarishHealthHealth Context:**

```
REST API Examples:
GET /api/patients/123 → Returns patient 123
POST /api/patients → Creates new patient
PUT /api/patients/123 → Updates patient 123
DELETE /api/patients/123 → Deletes patient 123
GET /api/patients/123/medications → Gets patient's medications
```

**Learn More:**

- [REST API Guide](https://restfulapi.net/)
- [HTTP Methods Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---

### GraphQL

**Category:** API Architecture
**Synonyms:** Graph query language
**Related:** REST, gRPC, Data fetching

**Definition:**
A query language for APIs that lets clients request *exactly* the data they need, with nested queries and powerful filtering.

**Technical Explanation:**
GraphQL means:

1. Client defines what data it wants
2. Single endpoint (not multiple REST endpoints)
3. Nested queries (get patient + medications + tests in one query)
4. Strong typing (what fields exist, what types)
5. Excellent for mobile (bandwidth efficient)

**In ZarishHealth Context:**

```
GraphQL Example:
query {
  patient(id: 123) {
    name
    age
    medications {
      name
      dosage
    }
    labResults {
      testName
      value
    }
  }
}
# Client gets ONLY requested data, not extra fields
```

**Learn More:**

- [GraphQL Official Site](https://graphql.org/)
- [GraphQL vs REST](https://www.apollographql.com/docs/apollo-server/whats-graphql/)

---

### gRPC (gRPC Remote Procedure Call)

**Category:** API Architecture
**Abbreviation:** gRPC
**Synonyms:** Remote Procedure Call
**Related:** REST, GraphQL, Protobuf

**Definition:**
A high-performance RPC framework for building distributed systems, using HTTP/2 and Protocol Buffers for extreme speed and efficiency.

**Technical Explanation:**
gRPC means:

1. Very fast (10x faster than REST)
2. Binary protocol (smaller than JSON)
3. Streaming support (real-time data)
4. Type-safe (Protocol Buffers enforce types)
5. Excellent for service-to-service communication

**In ZarishHealthHealth Context:**

- **REST:** Used for public APIs (web/mobile)
- **gRPC:** Used for internal service communication (FHIR server ↔ Analytics)
- Fast, efficient, low-latency
- Good for bandwidth-constrained environments

**Learn More:**

- [gRPC Official Site](https://grpc.io/)
- [Protocol Buffers Documentation](https://developers.google.com/protocol-buffers)

---

### Webhook

**Category:** Integration Pattern
**Synonyms:** HTTP callback, event notification
**Related:** Event-driven, Pub/Sub, Integration

**Definition:**
A mechanism where a system sends real-time data to another system via HTTP POST when an event occurs, rather than polling.

**Technical Explanation:**
Webhook means:

1. Event happens (patient admitted)
2. System sends HTTP POST to configured URL
3. Receiving system processes webhook
4. Real-time, not polling (more efficient)
5. Reliable delivery (retries on failure)

**In ZarishHealthHealth Context:**

```
Webhook Example:
1. Patient admitted to Hospital A
2. Hospital A sends webhook to analytics system
3. Analytics system immediately updates dashboards
4. No polling needed (efficient)
```

**Learn More:**

- [Webhook Best Practices](https://webhook.guide/)

---

## QUALITY & GOVERNANCE

### Versioning (Semantic Versioning)

**Category:** Release Management
**Abbreviation:** SemVer
**Synonyms:** Semantic versioning, version numbering
**Related:** Breaking Changes, Deprecation, API Evolution

**Definition:**
A systematic way of numbering software versions (MAJOR.MINOR.PATCH) to communicate what kind of changes were made.

**Technical Explanation:**
SemVer format: MAJOR.MINOR.PATCH (e.g., 1.3.2)

- **MAJOR** (1 → 2): Breaking changes (might break integrations)
- **MINOR** (1.2 → 1.3): New features (backward compatible)
- **PATCH** (1.2.3 → 1.2.4): Bug fixes (backward compatible)

**In ZarishHealthHealth Context:**

- FHIR R5 = Major version = big changes to profiles
- 1.2.0 = Minor = new EMR features
- 1.2.1 = Patch = bug fixes
- Communicates impact to integrating systems

**Examples:**

```
v1.0.0 → v1.0.1: Bug fix
v1.0.0 → v1.1.0: New feature (compatible)
v1.0.0 → v2.0.0: Breaking change (incompatible)
```

**Learn More:**

- [Semantic Versioning](https://semver.org/)

---

### Breaking Changes

**Category:** API Evolution
**Synonyms:** Incompatible changes, API breaking change
**Related:** Versioning, Deprecation, API Contract

**Definition:**
A modification to an API or data format that causes existing integrations to fail unless they're updated.

**Technical Explanation:**
Breaking changes:

1. Removed field from API response
2. Changed field type (string → integer)
3. Changed required parameters
4. Changed API endpoint URL
5. Changed data format (JSON structure)

**In ZarishHealthHealth Context:**

```
Non-breaking: Add optional field "preferredLanguage" to Patient
Breaking: Remove "gender" field from Patient ← Systems relying on it fail

When making breaking change:
1. Bump MAJOR version (v1.0.0 → v2.0.0)
2. Deprecate old version for 6+ months
3. Notify all integrations
4. Provide migration guide
```

**Learn More:**

- [API Versioning Strategies](https://api-university.com/blog/versioning-rest-api/)

---

### Deprecation

**Category:** API Evolution
**Synonyms:** Sunset, phase-out, end-of-life
**Related:** Versioning, Breaking Changes, API Lifecycle

**Definition:**
Formally announcing that a feature/API is no longer recommended and will be removed in the future, giving time for migration.

**Technical Explanation:**
Deprecation process:

1. Announce: "This feature is deprecated"
2. Timeline: "Will be removed in v3.0.0" (e.g., 12 months away)
3. Migration: Provide alternative method
4. Support: Help users migrate
5. Sunset: Remove in announced version

**In ZarishHealthHealth Context:**

```
Example: Deprecating HL7 v2 support
v1.0: Feature exists
v1.5: Mark as deprecated
       "HL7 v2 will be removed in v2.0 (Dec 2026)"
       "Use FHIR instead"
v2.0: Feature removed
```

**Learn More:**

- [Deprecation Policy Best Practices](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-deprecation-policy.md)

---

### Backward Compatibility

**Category:** API Evolution
**Synonyms:** Backward compatible, compatible change
**Related:** Versioning, Breaking Changes, API Contract

**Definition:**
The ability of a new version to work with data/systems created for older versions without modification.

**Technical Explanation:**
Backward compatible means:

1. Old code still works with new version
2. Old data still readable by new version
3. Typically achieved by:
   - Adding optional fields (not removing)
   - Supporting old and new formats
   - Not changing existing behavior

**In ZarishHealthHealth Context:**

```
Backward Compatible:
v1.0: Patient has fields: name, age, gender
v1.1: Add optional field: preferredLanguage
Old code: Still works (ignores preferredLanguage)
Old data: Still readable (new code doesn't require preferredLanguage)

Not Backward Compatible:
v1.0: Patient has gender field (required)
v2.0: Rename gender → biologicalSex
Old data: Can't be read (field doesn't exist)
```

**Learn More:**

- [Backward Compatibility](https://en.wikipedia.org/wiki/Backward_compatibility)

---

## DEPLOYMENT & RELIABILITY

### CI/CD (Continuous Integration/Continuous Deployment)

**Category:** DevOps Practice
**Abbreviation:** CI/CD
**Synonyms:** Continuous delivery, continuous deployment
**Related:** GitHub Actions, Automation, Testing

**Definition:**
Automated processes that continuously integrate code changes, test them, and deploy to production without manual intervention.

**Technical Explanation:**
**Continuous Integration:**

1. Developer commits code
2. Automated tests run immediately
3. Code linted/checked for errors
4. Merged only if tests pass

**Continuous Deployment:**

1. Code merged to main branch
2. Automatically deployed to production
3. No manual "release" step
4. Users get features immediately

**In ZarishHealthHealth Context:**

```
Manual Process (SLOW):
Dev writes code → Manual testing (days) → Manual deploy (error-prone)

CI/CD (FAST):
Dev writes code → Auto tests (seconds) → Auto deploy (minutes)
```

**Learn More:**

- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

---

### Staging vs. Production

**Category:** Environment
**Synonyms:** Pre-production, dev environment
**Related:** Deployment, Testing, CI/CD

**Definition:**
Two different environments for software:

- **Staging:** Test environment (looks exactly like production)
- **Production:** Live environment (users access it)

**Technical Explanation:**
**Staging:**

- Exact copy of production
- Used for testing before release
- Users don't see it
- Safe to test breaking changes

**Production:**

- Live, user-facing system
- Real patient data (if healthcare)
- Changes here impact real users
- Must be highly reliable

**In ZarishHealthHealth Context:**

```
Workflow:
1. Dev makes changes
2. Deploy to staging
3. Test thoroughly
4. Deploy to production (when ready)
5. Monitor for issues
```

**Learn More:**

- [Staging vs Production Environments](https://www.digitalocean.com/community/tutorials/what-is-a-staging-server)

---

### Rollback

**Category:** Deployment
**Synonyms:** Rollback, revert, undo deployment
**Related:** Immutable Versioning, Deployment, CI/CD

**Definition:**
The ability to revert a deployment to a previous version, undoing problematic changes.

**Technical Explanation:**
Rollback means:

1. New version deployed → Problem discovered
2. Switch back to previous version (immediately)
3. Fixes bugs in that version (hot fix)
4. Re-deploy updated version
5. Zero downtime for users

**In ZarishHealthHealth Context:**

```
Scenario: New lab module deployed → Bug found
1. Current: v1.2.0 (has bug)
2. Rollback: Switch to v1.1.0 (working)
3. Users: Continue working (no downtime)
4. Dev team: Fix bug, test, deploy v1.2.1
5. Production: Deploy v1.2.1
```

**Learn More:**

- [Blue-Green Deployments (enables rollback)](https://martinfowler.com/bliki/BlueGreenDeployment.html)

---

### Immutable Versioning

**Category:** Deployment
**Synonyms:** Immutable releases, fixed versions
**Related:** Rollback, Versioning, Reproducibility

**Definition:**
The practice of treating released versions as *immutable* (cannot be changed), ensuring reliability and reproducibility.

**Technical Explanation:**
Immutable versioning means:

1. v1.2.0 released (immutable, never changes)
2. If bug found in v1.2.0: create v1.2.1 (new version)
3. v1.2.0 forever stays the same (not updated)
4. Makes rollback safe and predictable
5. Anyone can deploy v1.2.0 and get identical result

**In ZarishHealthHealth Context:**

```
Mutable (BAD - unpredictable):
Deploy v1.2.0 today → Works
Deploy v1.2.0 tomorrow → Different code? (Someone updated it)

Immutable (GOOD - predictable):
Deploy v1.2.0 today → Works
Deploy v1.2.0 tomorrow → Same code (version never changes)
```

**Learn More:**

- [Immutable Releases](https://en.wikipedia.org/wiki/Immutable_object)

---

## CROSS-CUTTING CONCERNS

### Scalability

**Category:** Non-Functional Requirement
**Synonyms:** Horizontal scaling, auto-scaling
**Related:** Load balancing, Serverless, Stateless

**Definition:**
The ability of a system to handle increased load (more users, more data) without degrading performance.

**Technical Explanation:**
**Vertical scaling:** Add more power to one server (more RAM, CPU)
**Horizontal scaling:** Add more servers (better for cloud)

Scalable systems:

1. Stateless (no server dependency)
2. Load-balanced (distribute requests)
3. Auto-scaling (add servers when needed)
4. Database can handle load

**In ZarishHealthHealth Context:**

- ZarishHealth should handle 1 hospital or 1000 hospitals
- Users don't increase → no extra cost
- Users increase 10x → system handles it automatically
- Based on serverless = auto-scales by design

**Learn More:**

- [Scalability Concepts](https://en.wikipedia.org/wiki/Scalability)

---

### Uptime/Availability (SLA)

**Category:** Reliability Metric
**Synonyms:** Availability, Service Level Agreement
**Abbreviation:** SLA, 99.9% uptime
**Related:** Redundancy, Load Balancing, Monitoring

**Definition:**
A guarantee that a service will be available (operational) for a percentage of time. 99.9% uptime = down ~43 minutes per month.

**Technical Explanation:**
Common SLA levels:

- 99% = ~7.2 hours downtime per month
- 99.9% = ~43 minutes downtime per month
- 99.99% = ~4.3 minutes downtime per month
- 99.999% = ~26 seconds downtime per month

**In ZarishHealthHealth Context:**

- GitHub Pages: 99.9% SLA (healthcare-acceptable)
- ZarishHealth services: Target 99.9%
- For NGOs: 99% often acceptable (cost tradeoff)
- Mission-critical: 99.99% (requires expensive redundancy)

**Learn More:**

- [SLA Explained](https://en.wikipedia.org/wiki/Service-level_agreement)

---

### Monitoring & Observability

**Category:** Operations
**Synonyms:** Logging, monitoring, instrumentation
**Related:** Alerting, Health checks, Metrics

**Definition:**
The practice of collecting and analyzing data about system behavior to understand what's happening and detect problems.

**Technical Explanation:**
Three pillars of observability:

1. **Logs:** Detailed event records
2. **Metrics:** Numerical measurements (response time, errors)
3. **Traces:** Request paths through system

**In ZarishHealthHealth Context:**

```
Monitoring Examples:
- API response time: Should be <500ms
- Error rate: Should be <0.1%
- Database CPU: Should be <70%
- Patient data imports: Should complete in <5 minutes
```

**Learn More:**

- [Observability Engineering](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)

---

## SUMMARY TABLE

| Term                | Category        | See Also                   |
| ------------------- | --------------- | -------------------------- |
| API-First           | Architecture    | REST, GraphQL              |
| FHIR-First          | Healthcare      | FHIR R5, Profiles          |
| Static-First        | Infrastructure  | Serverless, CDN            |
| Serverless          | Infrastructure  | IaC, CloudFlare            |
| PaaS                | Service Model   | SaaS, IaaS                 |
| SaaS                | Service Model   | PaaS, IaaS                 |
| IaC                 | Deployment      | Terraform, CloudFlare      |
| Open Core           | Business Model  | Open Source, Licensing     |
| Federated           | System Design   | Modular, Loose Coupling    |
| Modular             | System Design   | Components, Modules        |
| SSOT                | Data Governance | Master Data, Authoritative |
| Contract-First      | Development     | API-First, OpenAPI         |
| REST                | API Design      | HTTP, JSON                 |
| GraphQL             | API Design      | Query Language             |
| gRPC                | API Design      | Protocol Buffers           |
| Webhook             | Integration     | Events, Callbacks          |
| Versioning          | Release         | SemVer, Versions           |
| Breaking Changes    | API Evolution   | Deprecation, SemVer        |
| Deprecation         | API Evolution   | End-of-life, Sunsetting    |
| Backward Compatible | Compatibility   | API Contracts              |
| CI/CD               | DevOps          | Automation, Testing        |
| Staging             | Environment     | Testing, Production        |
| Rollback            | Deployment      | Revert, Undo               |
| Immutable           | Versioning      | Fixed, Reproducible        |
| Scalability         | Performance     | Load, Auto-scaling         |
| SLA / Uptime        | Reliability     | Availability, Agreement    |
| Monitoring          | Operations      | Logging, Metrics           |

---

**[Back to Glossary Index](./index.md)**

---

*Last updated: January 26, 2026*
*Version: 1.0.0*
