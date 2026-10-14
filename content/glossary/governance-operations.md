# 03. GOVERNANCE & OPERATIONS TERMS
## zarishhealth Glossary - Section 3

**Focus:** Decision-making, management, compliance, and operational governance  
**Audience:** Leaders, administrators, governance bodies  
**Read Time:** ~20 minutes

---

## GOVERNANCE STRUCTURES

### ADR (Architecture Decision Record)
**Category:** Governance Document  
**Abbreviation:** ADR  
**Synonyms:** Architecture decision, design decision  
**Related:** Governance, Decision-making, Documentation

**Definition:**
A document recording a significant architectural decision, its rationale, alternatives considered, and consequences.

**Technical Explanation:**
ADR Format:
1. **Title:** What decision was made
2. **Status:** Accepted/Rejected/Deprecated
3. **Context:** Why this decision was needed
4. **Decision:** What was chosen
5. **Rationale:** Why this over alternatives
6. **Consequences:** What follows from this decision
7. **Alternatives:** Other options considered

**In zarishhealth Context:**
Each major decision gets an ADR:
- ADR-001: FHIR R5 as primary standard
- ADR-002: API-First architecture
- ADR-003: Country data sovereignty
- ADR-004: Open Core business model
- ADR-005: Serverless deployment
- ADR-006: Multi-country support

**Example ADR Structure:**
```markdown
# ADR-003: Country Data Sovereignty

**Status:** ACCEPTED (Jan 2026)

**Decision:**
Each country's health data stays in that country's infrastructure.
No data leaves country's borders without explicit consent.

**Rationale:**
- Regulatory: Local laws require data residency
- Trust: Countries trust their own government more
- Practical: Lower latency, faster access

**Consequences:**
- Need separate database per country
- Requires replication/federation mechanism
- Higher infrastructure complexity

**Alternatives Rejected:**
- Single global database: Violates sovereignty
- Country API with global backend: Still sends data abroad
```

**Why ADRs Matter:**
- ✅ Documents *why*, not just *what*
- ✅ Prevents re-litigating old decisions
- ✅ New team members understand philosophy
- ✅ Shows evolution of thinking

**Learn More:**
- [ADR on GitHub](https://adr.github.io/)
- [ADR Template](https://github.com/joelparkerhenderson/architecture_decision_record)

---

### CODEOWNERS
**Category:** Repository Governance  
**Synonyms:** Code owners, maintainers  
**Related:** GitHub, Access Control, Responsibility

**Definition:**
A file (`CODEOWNERS`) specifying who must review and approve changes to specific parts of a codebase.

**Technical Explanation:**
CODEOWNERS file:
```
# Global approvers (all changes)
* @you-username @co-maintainer

# FHIR profiles (health team approves)
fhir-r5-profiles/ @health-lead @fhir-expert

# BGD configs (Bangladesh team approves)
standards/country-configs/bgd/ @bgd-lead

# Documentation (you approve)
docs/ @you-username
```

**How It Works:**
1. Developer submits Pull Request
2. System checks CODEOWNERS file
3. Auto-requests review from owner
4. Owner can approve or request changes
5. Only owner can merge

**In zarishhealth Context:**
```
zs-docs CODEOWNERS:
* @your-name (overall)
fhir-r5-profiles/ @fhir-expert
governance/ @your-name
docs/ @your-name

zs-platform CODEOWNERS:
health/ @health-lead
ops/ @ops-lead
*.md @your-name
```

**Benefits:**
- ✅ Quality control (right people review)
- ✅ Accountability (clear owner)
- ✅ Distributed governance (teams own their parts)
- ✅ Prevents bottlenecks (multiple reviewers)

**Learn More:**
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

---

### Governance Council / Steering Committee
**Category:** Decision Body  
**Synonyms:** Steering committee, advisory board  
**Related:** ADRs, Decisions, Leadership

**Definition:**
A group of stakeholders who meet regularly to make decisions about platform direction, policies, and major changes.

**Technical Explanation:**
Typical Council Members:
1. **Product Owner:** You (vision, priorities)
2. **Technical Lead:** Architecture decisions
3. **Health Expert:** Clinical validity
4. **Ops Lead:** Infrastructure concerns
5. **Country Representatives:** BGD, THA, MMR leads

**Council Responsibilities:**
- Approve ADRs
- Review breaking changes
- Set priorities
- Handle disputes
- Allocate resources

**Meeting Cadence:**
- Monthly: Strategic decisions
- Weekly: Operational issues
- Ad-hoc: Urgent matters

**In zarishhealth Context:**
```
ZarishHealth Governance Council
├── Monthly Review Meeting
│   ├── Review new ADRs
│   ├── Approve breaking changes
│   └── Plan next priorities
├── Decision Log
│   └── All decisions tracked in ADRs
└── Transparency
    └── Meeting notes public (except sensitive)
```

**Learn More:**
- [Good Governance Practices](https://www.linux.com/training-tutorials/governance/)

---

## COMPLIANCE & STANDARDS

### HIPAA (Health Insurance Portability and Accountability Act)
**Category:** Healthcare Regulation  
**Abbreviation:** HIPAA  
**Jurisdiction:** United States  
**Synonyms:** Privacy Rule, Security Rule  
**Related:** GDPR, Data Privacy, Compliance

**Definition:**
US federal law regulating privacy and security of patient health information, especially in electronic systems.

**Technical Explanation:**
HIPAA Key Requirements:

**Privacy Rule:**
1. Patient right to access records
2. Minimize data collection (only what's needed)
3. Patient consent for use/disclosure
4. Breach notification (inform patient if data leaked)

**Security Rule:**
1. Access controls (who can see data)
2. Encryption (protect in transit & at rest)
3. Audit logs (track who accessed what)
4. Backup & disaster recovery
5. User authentication

**In zarishhealth Context:**
- ZarishHealth designed with HIPAA principles (good practice)
- Bangladesh: Must follow HIPAA if serving US-funded NGOs
- Thailand/Myanmar: Similar requirements (local versions)

**HIPAA Compliance Checklist:**
```
✅ Access controls (passwords, 2FA)
✅ Encryption (data encrypted in transit & at rest)
✅ Audit logs (track all access)
✅ User authentication (strong passwords)
✅ Data minimization (only collect what's needed)
✅ Patient consent (documented)
✅ Breach response plan (notify if leaked)
✅ Business Associate Agreements (if third-party vendor)
```

**Learn More:**
- [HIPAA Overview](https://www.hhs.gov/hipaa/index.html)
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)

---

### GDPR (General Data Protection Regulation)
**Category:** Data Privacy Regulation  
**Abbreviation:** GDPR  
**Jurisdiction:** European Union  
**Synonyms:** Data protection, privacy regulation  
**Related:** HIPAA, Data Privacy, Compliance

**Definition:**
EU regulation protecting personal data privacy and giving individuals control over their data.

**Technical Explanation:**
GDPR Key Principles:
1. **Lawfulness:** Only collect data for legitimate reasons
2. **Consent:** Get explicit permission (not pre-checked boxes)
3. **Transparency:** Tell users what you collect
4. **Purpose Limitation:** Use data only for stated purposes
5. **Minimization:** Collect minimum necessary
6. **Right to Deletion:** "Right to be forgotten"
7. **Data Portability:** Users can get their data
8. **Privacy by Design:** Privacy built in from start

**In zarishhealth Context:**
- ZarishHealth should follow GDPR principles (good practice)
- Especially if serving EU-funded NGOs
- Enables easy data portability (users can switch systems)

**GDPR Compliance Checklist:**
```
✅ Privacy policy (clear, plain language)
✅ Consent mechanism (explicit, not pre-checked)
✅ Data inventory (what data, why collected)
✅ Processing agreements (with vendors)
✅ Delete mechanisms (users can request deletion)
✅ Data portability (export user data)
✅ Breach notification (inform users within 72h)
✅ Privacy impact assessment (document risks)
```

**Learn More:**
- [GDPR Official](https://gdpr-info.eu/)
- [GDPR for Healthcare](https://ec.europa.eu/newsroom/dae/document.cfm?doc_id=59176)

---

### Data Residency
**Category:** Compliance Requirement  
**Synonyms:** Data sovereignty, data localization  
**Related:** GDPR, Privacy, Legal requirements

**Definition:**
A requirement that certain data must be stored within a specific country's borders, under that country's jurisdiction.

**Technical Explanation:**
Why data residency matters:
1. **Legal:** Country laws require it
2. **Trust:** Citizens trust their own government more
3. **Security:** Avoid data transfer vulnerabilities
4. **Sovereignty:** No foreign government can access data

**Examples:**
```
Bangladesh: Patient health data must be in Bangladesh
Thailand: Patient health data must be in Thailand
EU: Personal data must be in EU (GDPR)
Russia: Russian citizens' data must stay in Russia
```

**In zarishhealth Context:**
- **BGD Deployment:** Database in Bangladesh
- **THA Deployment:** Database in Thailand
- **MMR Deployment:** Database in Myanmar
- Each country has own complete copy of their data

**Architecture:**
```
Global ZarishHealth Platform
├── Bangladesh Deployment
│   └── Data: Bangladesh servers only
│       (patient records, medications, labs all in BGD)
├── Thailand Deployment
│   └── Data: Thailand servers only
├── Myanmar Deployment
│   └── Data: Myanmar servers only
└── Central Registry (optional)
    └── Patient IDs only (for deduplication)
        (not full health records)
```

**Learn More:**
- [Data Residency Requirements](https://www.techopedia.com/definition/30715/data-residency)

---

### Data Sovereignty
**Category:** Governance Principle  
**Synonyms:** National data ownership, data control  
**Related:** Data Residency, Governance, Compliance

**Definition:**
A principle that a nation has the right to govern data within its territory and control how data is used.

**Technical Explanation:**
Data Sovereignty includes:
1. **Physical location:** Data stored in country
2. **Legal jurisdiction:** Country's laws apply
3. **Control:** Country controls access
4. **Governance:** Country sets rules
5. **Ownership:** Country owns the data

**Difference from Data Residency:**
- **Residency:** Where data is stored (physical)
- **Sovereignty:** Who controls data (legal/political)

**In zarishhealth Context:**
Core philosophy:
> "Each country owns its health data. zarishhealth is a tool they use, not a company that owns their data."

**Governance Model:**
```
Bangladesh Ministry of Health:
- Owns all BGD patient data
- Controls access policies
- Decides who can see what
- ZarishHealth provides tools, BGD makes rules

Thailand Ministry of Health:
- Owns all THA patient data
- Makes independent decisions
- Different policies from BGD (allowed!)
- ZarishHealth supports both

Myanmar Ministry of Health:
- Eventually owns MMR data
- ZarishHealth enables this (not prevents it)
```

**Learn More:**
- [Data Sovereignty Explained](https://www.techopedia.com/definition/30715/data-sovereignty)

---

## OPERATIONAL CONCEPTS

### Change Management
**Category:** Process Management  
**Synonyms:** Change control, change process  
**Related:** Versioning, Breaking Changes, CI/CD

**Definition:**
A formal process for making changes to systems, ensuring quality, minimizing risk, and coordinating stakeholders.

**Technical Explanation:**
Change Management Process:
1. **Request:** Someone proposes a change
2. **Evaluate:** Assess impact, cost, risk
3. **Approve:** Gets sign-off from governance
4. **Implement:** Make the change
5. **Test:** Verify it works
6. **Deploy:** Roll out to production
7. **Verify:** Confirm success
8. **Document:** Record what changed

**In zarishhealth Context:**
```
Change Request: "Add support for ICD-11 codes"

1. Request: Issue created with description
2. Evaluate: Impact analysis
   - Where used? (Lab module, EMR)
   - Breaking? (No, can coexist with ICD-10)
   - Risk? (Low, well-tested standard)
3. Approve: Architecture council approves
4. Implement: Developers write code
5. Test: Automated + manual testing
6. Deploy: Roll to staging first, then production
7. Verify: Confirm data correctly coded
8. Document: Add to ADRs, update docs
```

**Benefits:**
- ✅ Controlled changes (not chaotic)
- ✅ Risk reduction (evaluate before change)
- ✅ Communication (everyone informed)
- ✅ Traceability (know who changed what, when, why)

**Learn More:**
- [Change Management Best Practices](https://www.atlassian.com/incident-management/change-management)

---

### Version Control Policy
**Category:** Development Governance  
**Synonyms:** Branching strategy, git workflow  
**Related:** CI/CD, Git, Branches

**Definition:**
A set of rules for how developers use version control (Git) to manage code changes.

**Technical Explanation:**
Common Strategies:
1. **Trunk-based:** One main branch (main), short-lived feature branches
2. **Git Flow:** Multiple branches (develop, release, hotfix)
3. **GitHub Flow:** Feature branches → PR → main

**ZarishHealth Strategy (Trunk-based):**
```
Main branch: Always production-ready
├── feature/patient-allergies: Development branch
│   └── Work happens here
├── fix/validation-bug: Bug fix branch
└── docs/glossary: Documentation branch

Workflow:
1. Developer creates branch from main
2. Makes changes
3. Tests locally
4. Submits Pull Request (PR)
5. Automated tests run (CI/CD)
6. Code review (human)
7. Merge to main (auto-deploys!)
8. Delete branch
```

**Benefits:**
- ✅ Simple process (fewer branches)
- ✅ Fast integration (quick feedback)
- ✅ Continuous deployment (code goes live quickly)
- ✅ Less merge conflicts

**Learn More:**
- [Trunk-Based Development](https://trunkbaseddevelopment.com/)

---

### Release Management
**Category:** Deployment Management  
**Synonyms:** Release, version release  
**Related:** Versioning, Change Management, Deployment

**Definition:**
A process for coordinating and planning when features go live to users.

**Technical Explanation:**
Release Process:
1. **Planning:** Decide what features in release
2. **Development:** Developers build features
3. **Testing:** QA tests thoroughly
4. **Staging Deploy:** Deploy to staging (test environment)
5. **User Acceptance Testing:** Stakeholders test
6. **Production Deploy:** Live for users
7. **Monitoring:** Watch for problems
8. **Support:** Help users with issues

**In zarishhealth Context:**
```
Release Cycle:
- v1.0.0: Initial launch (Patient module, EMR basics)
- v1.1.0: First update (Add lab module, FHIR support)
- v1.2.0: Second update (Add pharmacy module)
- v2.0.0: Major release (Major UI redesign, breaking changes)

Release Schedule:
- Releases every month (predictable)
- Breaking changes only in major versions
- Deprecation warnings for 6+ months before removal
```

**Learn More:**
- [Release Management Best Practices](https://en.wikipedia.org/wiki/Release_management)

---

### Incident Management
**Category:** Operations  
**Synonyms:** Issue response, crisis management  
**Related:** Monitoring, Uptime, SLA

**Definition:**
A process for detecting, responding to, and resolving system outages or serious problems.

**Technical Explanation:**
Incident Process:
1. **Detection:** Alert triggered (system down, errors spike)
2. **Alert:** On-call person notified
3. **Triage:** Assess severity
4. **Response:** Incident commander assigned
5. **Communication:** Notify stakeholders
6. **Fix:** Implement fix
7. **Verification:** Confirm system works
8. **Postmortem:** Learn what went wrong

**Severity Levels:**
- **Critical:** System down, data loss, security breach
- **Major:** Core features unavailable
- **Minor:** Edge cases, cosmetic issues

**In zarishhealth Context:**
```
Example Incident:

2026-01-27 14:30 UTC
Alert: Database CPU at 95% (threshold: 80%)

14:32 UTC: On-call DevOps notified
14:35 UTC: Incident Commander: Raj (DevOps lead)
14:36 UTC: Root cause identified: Runaway query (lab import)
14:40 UTC: Query killed, CPU normalizes
14:42 UTC: All systems normal, users unaffected
14:50 UTC: Communication sent to stakeholders
15:00 UTC: Postmortem scheduled for tomorrow

Postmortem Review:
- What went wrong? Query not optimized
- How catch earlier? Add query timeout
- How prevent? Code review process for database changes
```

**Learn More:**
- [Incident Management Best Practices](https://incident.io/guide/incident-management/)

---

### SLA (Service Level Agreement)
**Category:** Operations Contract  
**Abbreviation:** SLA  
**Synonyms:** Service level, uptime guarantee  
**Related:** Uptime, Reliability, Monitoring

**Definition:**
A formal agreement between provider and customer specifying service quality expectations and remedies if not met.

**Technical Explanation:**
SLA Components:
1. **Availability:** Uptime guarantee (99.9%)
2. **Response Time:** How fast system responds (<500ms)
3. **Support:** Available during what hours?
4. **Penalties:** What if SLA missed? (Credits, refunds)

**Example ZarishHealth SLA:**
```
ZarishHealth Health SLA
Availability: 99.9% uptime
- Measured: Rolling 30-day period
- Exclusions: Maintenance windows (4 per year, scheduled)
- Credit: If below 99.9%, 10% refund for that month

Response Time: 95% of requests <500ms
- Measurement: All API requests
- Exclusion: Complex reports (allowed to be slower)

Support: 24/7 for critical issues
- Critical: System down, data loss
- Major: Core features unavailable
- Minor: Cosmetic issues (business hours support)
```

**Learn More:**
- [SLA Explained](https://en.wikipedia.org/wiki/Service-level_agreement)

---

## STRATEGIC CONCEPTS

### Roadmap
**Category:** Planning  
**Synonyms:** Product roadmap, strategic plan  
**Related:** Priorities, Planning, Timeline

**Definition:**
A timeline showing planned features, improvements, and major releases over months/years.

**Technical Explanation:**
Roadmap Format:
```
Q1 2026 (Jan-Mar):
- v1.1: Lab module
- v1.2: Pharmacy module
- Infrastructure: CloudFlare CDN optimization
- Docs: FHIR profile guides

Q2 2026 (Apr-Jun):
- v2.0: Major UI redesign
- v2.1: Multi-language support (Bengali, Thai)
- Infrastructure: Add Thailand servers
- Security: HIPAA audit

Q3 2026 (Jul-Sep):
- v2.2: Advanced analytics
- v2.3: Offline mode
- Infrastructure: Add Myanmar servers
- Country customizations: BGD, THA, MMR

Q4 2026 (Oct-Dec):
- v3.0: Major architectural changes (if needed)
- Sustainability: Fundraising
- Training: NGO training program
```

**Benefits:**
- ✅ Clarity: Everyone knows what's coming
- ✅ Planning: Users can plan implementations
- ✅ Transparency: Shows commitment
- ✅ Flexibility: Can adjust based on feedback

**Learn More:**
- [Product Roadmap Best Practices](https://www.prodpad.com/blog/product-roadmap/)

---

### Sustainability
**Category:** Long-term Planning  
**Synonyms:** Long-term viability, business model  
**Related:** Open Core, Funding, Community

**Definition:**
A plan to ensure zarishhealth continues existing and improving long-term, beyond any single founder or organization.

**Technical Explanation:**
Sustainability includes:
1. **Funding:** How is development funded?
2. **Community:** Who contributes?
3. **Governance:** Who makes decisions?
4. **Ownership:** Who owns the code/assets?

**ZarishHealth Sustainability Model:**
```
Funding Sources:
├── Grants: Philanthropic foundations (Gates, GiveWell, etc.)
├── Donor organizations: NGOs implementing ZarishHealth
├── Government contracts: Countries adopting ZarishHealth HIS
├── Service contracts: Optional paid hosting/support
└── Voluntary contributions: Community support

Community:
├── Core team: Full-time (you + 2-3 developers)
├── Contributors: Part-time volunteers
├── Country leads: BGD, THA, MMR teams
└── Users: Thousands of NGOs

Governance:
├── Steering committee: Major decisions
├── Community council: Feedback and ideas
├── Transparent process: ADRs, public decisions
└── Distributed: Decentralized decision-making

Ownership:
├── Code: Open-source license (Apache 2.0 or GPL)
├── Assets: Held by non-profit entity
├── Platform: Community property (not one company's)
└── Data: Country-owned (not platform's)
```

**Learn More:**
- [Open Source Sustainability](https://www.redhat.com/en/blog/open-source-sustainability)

---

### Stakeholder Management
**Category:** Communication  
**Synonyms:** Stakeholder engagement, communication  
**Related:** Governance, Planning, Transparency

**Definition:**
A process for identifying, understanding, and keeping stakeholders informed and engaged.

**Technical Explanation:**
Stakeholder Types:
1. **Users:** NGOs using ZarishHealth (care about features, ease of use)
2. **Countries:** Ministry of Health (care about sovereignty, compliance)
3. **Donors:** Funding organizations (care about impact, sustainability)
4. **Developers:** People building ZarishHealth (care about architecture, tools)
5. **Community:** Broader ecosystem (care about interoperability)

**Communication Channels:**
```
For Users:
- Monthly webinars (feature demos)
- Documentation (self-serve learning)
- Community forum (peer support)
- Annual conference (networking)

For Countries:
- Quarterly meetings (strategic alignment)
- Regulatory workshops (compliance)
- Customization consultations (country needs)

For Donors:
- Annual report (impact, sustainability)
- Impact metrics (lives improved, systems deployed)
- Transparent budget (how money used)

For Developers:
- Weekly dev calls (technical discussion)
- GitHub discussions (decision-making)
- Conference talks (community visibility)
```

**Learn More:**
- [Stakeholder Management Best Practices](https://www.pmi.org/learning/library/stakeholder-management-perspectives-2934)

---

## SUMMARY TABLE

| Term | Category | See Also |
|------|----------|----------|
| ADR | Governance | Decision records |
| CODEOWNERS | Governance | GitHub, Permissions |
| Council | Governance | Leadership, Decisions |
| HIPAA | Compliance | US regulation |
| GDPR | Compliance | EU regulation |
| Data Residency | Compliance | Country storage |
| Data Sovereignty | Governance | Country control |
| Change Management | Operations | Process, Quality |
| Version Control | Development | Git workflow |
| Release Management | Deployment | Versions, Release |
| Incident Management | Operations | Crisis response |
| SLA | Contract | Service guarantee |
| Roadmap | Planning | Strategic plan |
| Sustainability | Long-term | Long-term viability |
| Stakeholder Management | Communication | Engagement |

---

**[Back to Glossary Index](./index.md)**

---

*Last updated: January 26, 2026*  
*Version: 1.0.0*
