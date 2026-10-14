# 📚 GLOSSARY INDEX

## Complete Reference Directory

**Version:** 1.0.0
**Last Updated:** January 26, 2026
**Status:** LIVING DOCUMENT (Updated as platform evolves)

---

## 📖 GLOSSARY STRUCTURE

This glossary contains **5 main sections** with **200+ terms** organized by domain:

### 1. **[CORE PLATFORM TERMS](./core-platform-terms.md)**

   Essential terminology for understanding zarishhealth architecture

- Platform concepts (PaaS, SaaS, DPI, Open Core)
- System architecture (Federated, Modular, Stateless)
- Technical patterns (API-first, FHIR-first, Static-first, Serverless)

### 2. **[HEALTHCARE &amp; STANDARDS](./healthcare-standards.md)**

   Medical, clinical, and healthcare interoperability standards

- FHIR R5 concepts (Resources, Profiles, Bundles)
- HL7 terminology (Messages, Segments, Data Types)
- Clinical standards (ICD-11, SNOMED CT, LOINC, HDX)
- Healthcare concepts (EMR, EHR, HIS, PHR, Pharmacy)

### 3. **[GOVERNANCE &amp; OPERATIONS](./governance-operations.md)**

   Decision-making, management, and operational terminology

- Governance structures (ADR, Architecture Council, CODEOWNERS)
- Operational models (Country Sovereignty, Data Residency)
- Quality assurance (Compliance, HIPAA, GDPR)
- Change management (Versioning, Deprecation, Breaking Changes)

### 4. **[DEVELOPMENT &amp; DEPLOYMENT](./development-deployment.md)**

   Engineering, DevOps, and infrastructure terminology

- Infrastructure (IaC, CloudFlare, GitHub Pages, Supabase)
- Development workflows (CI/CD, GitHub Actions, Automation)
- Languages & frameworks (Go, React, Node.js, TypeScript)
- Deployment concepts (Staging, Production, Rollback, Immutable)

### 5. **[DATA &amp; INTEGRATION](./data-integration.md)**

   Data management, interoperability, and ecosystem concepts

- Data concepts (SSOT, Data Minimization, Data Sovereignty)
- Integration patterns (Loose Coupling, Event-Driven, Contract-First)
- Analytics (ETL, Data Warehouse, Business Intelligence)
- Security & Privacy (Encryption, Authentication, Authorization)

---

## 🎯 HOW TO USE THIS GLOSSARY

### For Non-Coders

**You are here!** Start with:

1. [Core Platform Terms](./core-platform-terms.md) — Understand what zarishhealth *is*
2. [Governance &amp; Operations](./governance-operations.md) — Understand how decisions are made
3. Refer to other sections as needed for specific domains

### For Healthcare Workers

**Clinical context matters!** Focus on:

1. [Healthcare &amp; Standards](./healthcare-standards.md) — Your primary reference
2. [Data &amp; Integration](./data-integration.md) — How patient data flows
3. [Governance &amp; Operations](./governance-operations.md) — Compliance & privacy

### For Developers

**All sections relevant!** Recommended order:

1. [Core Platform Terms](./core-platform-terms.md) — Architecture overview
2. [Development &amp; Deployment](./development-deployment.md) — Technical details
3. [Healthcare &amp; Standards](./healthcare-standards.md) — Domain knowledge
4. [Data &amp; Integration](./data-integration.md) — Integration patterns
5. [Governance &amp; Operations](./governance-operations.md) — Project policies

### For Administrators

**Operational focus!** Start with:

1. [Governance &amp; Operations](./governance-operations.md) — Your primary reference
2. [Development &amp; Deployment](./development-deployment.md) — Infrastructure management
3. [Data &amp; Integration](./data-integration.md) — Security & compliance

---

## 🔍 QUICK LOOKUP TABLE

| Term                     | Definition                                          | See                                       |
| ------------------------ | --------------------------------------------------- | ----------------------------------------- |
| **ADR**            | Architecture Decision Record                        | [Governance](./governance-operations.md)   |
| **API**            | Application Programming Interface                   | [Core Platform](./core-platform-terms.md)  |
| **EMR**            | Electronic Medical Record                           | [Healthcare](./healthcare-standards.md)    |
| **FHIR**           | Fast Healthcare Interoperability Resources          | [Healthcare](./healthcare-standards.md)    |
| **GitHub Actions** | CI/CD automation platform                           | [Development](./development-deployment.md) |
| **Go**             | Programming language for backend                    | [Development](./development-deployment.md) |
| **HIPAA**          | Health Insurance Portability and Accountability Act | [Governance](./governance-operations.md)   |
| **IaC**            | Infrastructure as Code                              | [Development](./development-deployment.md) |
| **Open Core**      | Open-source core + optional commercial modules      | [Core Platform](./core-platform-terms.md)  |
| **PaaS**           | Platform as a Service                               | [Core Platform](./core-platform-terms.md)  |
| **React**          | JavaScript UI framework                             | [Development](./development-deployment.md) |
| **REST**           | Representational State Transfer                     | [Core Platform](./core-platform-terms.md)  |
| **SSOT**           | Single Source of Truth                              | [Core Platform](./core-platform-terms.md)  |
| **Supabase**       | Backend-as-a-service platform                       | [Development](./development-deployment.md) |

---

## 📊 TERM STATISTICS

| Category                 | # Terms        | Est. Read Time   |
| ------------------------ | -------------- | ---------------- |
| Core Platform            | 35+            | 15 min           |
| Healthcare & Standards   | 60+            | 25 min           |
| Governance & Operations  | 40+            | 20 min           |
| Development & Deployment | 50+            | 20 min           |
| Data & Integration       | 35+            | 15 min           |
| **TOTAL**          | **220+** | **95 min** |

---

## 🌍 LOCALIZATION & VARIANTS

Terms are presented in:

- **Primary Language:** English (Global standard)
- **Variants Noted:** Where country-specific terminology differs
  - **BGD:** Bangladesh-specific terms
  - **THA:** Thailand-specific terms
  - **MMR:** Myanmar-specific terms
  - **INT:** International/Global standard

Example:

```
HIS (Health Information System)
├── Global Definition: Integrated system managing patient health data
├── BGD Variant: Often called "National HIS" under DGHS
└── THA Variant: Part of "Thai Health Information System" (ThaiHIS)
```

---

## 🔐 GLOSSARY PHILOSOPHY

This glossary follows these principles:

1. **Non-Jargon First** — Plain language explanations before technical details
2. **Context Matters** — Each term includes use cases and relationships
3. **Standards-Based** — References official definitions where applicable
4. **Linked Terms** — Related concepts are cross-referenced
5. **Practical Examples** — Real-world examples from zarishhealth
6. **Evergreen** — Updated as platform evolves, versions tracked

---

## 📝 HOW TERMS ARE FORMATTED

Each term entry includes:

```markdown
### [TERM NAME]
**Category:** [Healthcare/Technical/Governance]  
**Synonyms:** Alt names this is known by  
**Abbreviation:** If applicable

**Definition:**
[Simple explanation in 1-2 sentences]

**Technical Explanation:**
[Deeper dive with technical details]

**In zarishhealth Context:**
[How this applies to our platform]

**Related Terms:**
- [Link to related terms]

**Example:**
[Real-world usage example]

**Learn More:**
[References, standards, documentation links]
```

---

## 🔄 NAVIGATION QUICK LINKS

### By Use Case

**"I want to understand zarishhealth basics"**
→ Read: [Core Platform Terms](./core-platform-terms.md)

**"I need to understand healthcare standards"**
→ Read: [Healthcare &amp; Standards](./healthcare-standards.md)

**"I want to know how decisions are made"**
→ Read: [Governance &amp; Operations](./governance-operations.md)

**"I need to set up infrastructure"**
→ Read: [Development &amp; Deployment](./development-deployment.md)

**"I need to understand data flow"**
→ Read: [Data &amp; Integration](./data-integration.md)

---

## 🎓 LEARNING PATHS

### **Path 1: Executive Summary (30 minutes)**

1. Start: What is zarishhealth? → [Core Platform](./core-platform-terms.md)
2. Understand: Governance model → [Governance](./governance-operations.md)
3. Goal: You can explain zarishhealth to others

### **Path 2: Healthcare Implementer (90 minutes)**

1. Start: Healthcare basics → [Healthcare Standards](./healthcare-standards.md)
2. Understand: How data flows → [Data &amp; Integration](./data-integration.md)
3. Understand: Security & compliance → [Governance](./governance-operations.md)
4. Goal: You can implement health modules

### **Path 3: Platform Developer (120 minutes)**

1. Start: Architecture → [Core Platform](./core-platform-terms.md)
2. Learn: Tech stack → [Development &amp; Deployment](./development-deployment.md)
3. Understand: Data patterns → [Data &amp; Integration](./data-integration.md)
4. Understand: Healthcare standards → [Healthcare Standards](./healthcare-standards.md)
5. Goal: You can extend the platform

### **Path 4: System Administrator (75 minutes)**

1. Start: Operations → [Governance &amp; Operations](./governance-operations.md)
2. Learn: Infrastructure → [Development &amp; Deployment](./development-deployment.md)
3. Understand: Data security → [Data &amp; Integration](./data-integration.md)
4. Goal: You can manage zarishhealth instances

---

## 📞 TERM REQUEST PROCESS

**Found a term that's missing or unclear?**

1. Create a GitHub Issue with label `glossary-request`
2. Use this template:
   ```
   **Term:** [Name]
   **Current Definition:** [What exists now, if anything]
   **Suggested Definition:** [Your proposed definition]
   **Context:** [Why this term matters]
   ```
3. We'll review and add to glossary within 1 week

---

## 📅 VERSION HISTORY

| Version | Date         | Changes                                         |
| ------- | ------------ | ----------------------------------------------- |
| 1.0.0   | Jan 26, 2026 | Initial release: 220+ terms across 5 categories |
| —      | —           | Future updates tracked here                     |

---

## 🔗 RELATED DOCUMENTS

- [zarishhealth Architecture Overview](../architecture/)
- [Contributing Guidelines](../governance/contributing.md)
- [Architecture Decision Records](../governance/adr/)
- [FHIR R5 Profiles](../standards/fhir-r5-profiles/)

---

## 📄 LICENSE

This glossary is part of zarishhealth and is licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

You are free to:

- ✅ Use and share this glossary
- ✅ Adapt and modify it for your own use
- ✅ Include it in derivative works

With the requirement:

- 📌 Provide attribution to zarishhealth

---

## 🎯 NEXT STEPS

1. **Read:** Choose a section above that matches your role
2. **Learn:** Go through terms systematically
3. **Bookmark:** Add to your browser for quick reference
4. **Contribute:** Suggest new terms or improvements via GitHub Issues
5. **Share:** Help others understand zarishhealth by sharing this glossary

---

**Made with ❤️ for the Global Health Community**

*zarishhealth — Digital Public Infrastructure for Healthcare*

---
