# 05. DATA & INTEGRATION TERMS
## zarishhealth Glossary - Section 5

**Focus:** Data management, security, privacy, and ecosystem integration  
**Audience:** Data engineers, security officers, system integrators  
**Read Time:** ~15 minutes

---

## DATA MANAGEMENT

### Data Minimization
**Category:** Data Governance  
**Synonyms:** Minimal data collection, necessity principle  
**Related:** Privacy, GDPR, HIPAA, Security

**Definition:**
A principle to collect only the *minimum* data necessary for a specific purpose, no more.

**Technical Explanation:**
Data minimization means:
1. **Define Purpose:** Why collect this data?
2. **Identify Minimum:** What's absolutely needed?
3. **Don't Collect Extra:** "Nice to have" is not necessary
4. **Delete When Done:** Remove data after purpose fulfilled
5. **Regular Review:** Audit what data is stored

**In zarishhealth Context:**
```
Patient Registration Example:

Minimal Data (needed):
✅ Name (identify patient)
✅ Date of birth (calculate age)
✅ Gender (appropriate care)
✅ Contact (appointment reminders)
✅ National ID (health system link)

Extra Data (not needed - don't collect):
❌ Religion (not for health care)
❌ Ethnic background (not needed)
❌ Employer information (not needed)
❌ Family members' info (not needed)
```

**Benefits:**
- ✅ Privacy (less data = less risk if breached)
- ✅ Performance (less data to store/process)
- ✅ Compliance (meets GDPR/HIPAA requirements)
- ✅ Trust (users trust companies with less data)

**Learn More:**
- [GDPR Data Minimization](https://gdpr-info.eu/art-5-gdpr/)

---

### Data Classification
**Category:** Data Security  
**Synonyms:** Data sensitivity levels, data tiers  
**Related:** Security, Access Control, Encryption

**Definition:**
A system for categorizing data by sensitivity level to apply appropriate security controls.

**Technical Explanation:**
Common classification levels:
1. **Public:** Can be shared freely (marketing info)
2. **Internal:** For employees only (procedures)
3. **Confidential:** Restricted access (business data)
4. **Restricted:** Maximum protection (healthcare data)

**ZarishHealth Data Classification:**
```
Public:
- ZarishHealth documentation
- General health information (on website)
- Architecture diagrams
- Security: Minimal (publicly available)

Confidential:
- API keys, passwords
- System configurations
- Staff information
- Security: Strong (encrypted, limited access)

Restricted:
- Patient health records (PHI - Protected Health Info)
- Medications, diagnoses, test results
- Payments/billing information
- Security: Maximum (encrypted, audited, access logs)
```

**Security Controls by Level:**
```
Public Data:
- Location: Public GitHub repos
- Access: Anyone
- Encryption: No

Confidential Data:
- Location: Private GitHub repos
- Access: Team members only
- Encryption: Yes
- Audit logs: Yes

Restricted (Healthcare Data):
- Location: Encrypted databases
- Access: Doctors/staff only (role-based)
- Encryption: Yes (at-rest and in-transit)
- Audit logs: Yes (track every access)
- Compliance: HIPAA/GDPR standards
```

**Learn More:**
- [Data Classification Best Practices](https://en.wikipedia.org/wiki/Data_classification_(information_security))

---

### Data Retention
**Category:** Data Governance  
**Synonyms:** Retention policy, data deletion  
**Related:** Privacy, GDPR, Compliance

**Definition:**
A policy specifying how long different types of data are kept before being deleted.

**Technical Explanation:**
Retention policies answer:
1. **How long** is data kept?
2. **Why** that duration?
3. **How** is it deleted?
4. **Who** oversees deletion?

**ZarishHealth Retention Policy:**
```
Patient Health Records:
- Retention: Lifetime + 10 years after last visit
- Reason: Legal requirement for continuity of care
- Deletion: Secure deletion (unrecoverable)
- Exception: Patient request (right to be forgotten)

Audit Logs (who accessed what):
- Retention: 3 years
- Reason: Regulatory requirement
- Deletion: Archive to cold storage, then delete
- Exception: None (compliance required)

Session/Temporary Data:
- Retention: Until user logs out
- Reason: Not needed after session
- Deletion: Automatic
- Exception: None

System Backups:
- Retention: 30 days
- Reason: Disaster recovery
- Deletion: Automatic after retention
- Exception: None
```

**Benefits:**
- ✅ Compliance (meets legal requirements)
- ✅ Privacy (data deleted as promised)
- ✅ Storage (don't store unnecessary data)
- ✅ Security (less data = smaller attack surface)

**Learn More:**
- [GDPR Right to Erasure](https://gdpr-info.eu/art-17-gdpr/)

---

### Master Data Management (MDM)
**Category:** Data Governance  
**Synonyms:** Reference data, golden record  
**Related:** Data Quality, Deduplication, Integration

**Definition:**
A discipline for maintaining a single, authoritative version of key data (patients, providers, medications).

**Technical Explanation:**
MDM Problems It Solves:
1. **Duplicates:** Same person in system twice
2. **Inconsistencies:** Different hospitals have different info
3. **Conflict:** Hospital A says patient age is 45, Hospital B says 46
4. **Lack of trust:** Which version is correct?

**ZarishHealth MDM Architecture:**
```
Scenario: Patient "Mohammed Ahmed" visits 3 hospitals

Hospital A: Mohammed Ahmed, DOB: 1978-05-15, Blood Type: O+
Hospital B: Mohammad Ahmed, DOB: 1978-04-15, Blood Type: ?
Hospital C: Mohammad Amed, DOB: 1978-05-15, Blood Type: O+

MDM Process:
1. Detect: "These might be same person" (fuzzy matching)
2. Review: Human confirms (same person)
3. Merge: Create master record
4. Resolve: DOB = 1978-05-15 (most recent data)
5. Propagate: All hospitals get master record

Result:
Master Record (National Registry):
├── ID: NID-12345678
├── Name: Mohammed Ahmed
├── DOB: 1978-05-15
├── Blood Type: O+
└── Hospitals Linked: A, B, C
```

**Benefits:**
- ✅ Single patient: Prevents duplicate records
- ✅ Better care: Doctors see complete history
- ✅ Reduced errors: No conflicting info
- ✅ Data quality: Reconciles discrepancies

**Learn More:**
- [Master Data Management](https://www.gartner.com/en/information-technology/glossary/master-data-management)

---

## SECURITY & PRIVACY

### Encryption
**Category:** Security Technology  
**Synonyms:** Ciphering, data encryption  
**Related:** Confidentiality, TLS, Password Security

**Definition:**
The process of converting readable data into unreadable code that can only be read with a key.

**Technical Explanation:**
**Encryption in Transit:**
```
Without encryption:
User → Internet (plain text) → Server
         ⚠️ Anyone listening can read password/data

With HTTPS encryption:
User → Internet (encrypted) → Server
      └─ Only user & server can read
         ✅ Secure
```

**Encryption at Rest:**
```
Without encryption:
Data in Database (plain text)
⚠️ If server hacked, data leaked

With encryption:
Data in Database (encrypted)
├─ Data: [encrypted gibberish]
├─ Key: Separate, secure location
└─ ✅ If hacked, encrypted data useless without key
```

**Algorithm:**
```
Plain Text: "patient=123"
Key: [secret]
Encryption: AES-256 (military-grade)
Encrypted: "2k3n$mK9X@L2q"

Only someone with Key can decrypt
```

**In zarishhealth Context:**
- **In Transit:** HTTPS (TLS encryption)
- **At Rest:** Database encryption
- **Passwords:** Hashed (not encrypted)
- **API Keys:** Encrypted in storage
- **Audit Logs:** Encrypted (trace who accessed)

**Learn More:**
- [HTTPS & TLS](https://www.cloudflare.com/learning/ssl/what-is-https/)
- [AES Encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)

---

### Authentication
**Category:** Security Control  
**Abbreviations:** Auth  
**Synonyms:** Login, identity verification  
**Related:** Authorization, Passwords, 2FA

**Definition:**
The process of verifying that someone is who they claim to be, typically via login credentials.

**Technical Explanation:**
Authentication methods:
1. **Password:** Something you know
2. **OTP (One-Time Password):** Something you have (SMS code)
3. **Biometric:** Something you are (fingerprint, face)
4. **Multi-factor:** Combination (password + SMS code)

**ZarishHealth Authentication:**
```
Login Process:
1. User enters email: admin@hospital.com
2. User enters password: ••••••••
3. System verifies password (against stored hash)
4. If correct:
   - Generate session token
   - User logged in
5. Future requests include token (no password sent)
6. User logs out → token invalidated
```

**Best Practices:**
```
✅ Enforce strong passwords (min 12 characters)
✅ Hash passwords (never store plain text)
✅ Require password reset after N days
✅ Lock account after wrong attempts (prevent brute force)
✅ Log all login attempts (audit trail)
✅ Offer 2FA (two-factor authentication)
✅ Support SSO (single sign-on for enterprises)
```

**Learn More:**
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

### Authorization
**Category:** Security Control  
**Abbreviations:** Authz  
**Synonyms:** Access control, permissions  
**Related:** Authentication, Role-Based Access Control

**Definition:**
The process of determining what an authenticated user is allowed to do.

**Technical Explanation:**
Authorization answers: "Can this user do this action?"

**Role-Based Access Control (RBAC):**
```
Roles:
├── Doctor
│   ├── Permission: View patients
│   ├── Permission: Write prescriptions
│   ├── Permission: View lab results
│   └── Permission: NOT see billing
│
├── Pharmacist
│   ├── Permission: View medications
│   ├── Permission: Dispense medications
│   └── Permission: NOT write prescriptions
│
├── Lab Technician
│   ├── Permission: Order lab tests
│   ├── Permission: Enter results
│   └── Permission: NOT see medications
│
└── Administrator
    ├── Permission: Everything
    └── Permission: Manage users
```

**In zarishhealth Context:**
```
Example: View patient record
┌─ Authentication: "Is this doctor?"
│  └─ Verify login: Yes
└─ Authorization: "Can doctor see this patient?"
   ├─ Doctor's hospital = Patient's hospital?
   ├─ Patient consented?
   ├─ Doctor specialty matches?
   └─ "Yes, allowed to view"
```

**Learn More:**
- [OAuth 2.0 Authorization](https://oauth.net/2/)

---

### 2FA (Two-Factor Authentication)
**Category:** Security Control  
**Abbreviation:** 2FA, MFA (Multi-Factor)  
**Synonyms:** Two-step verification  
**Related:** Authentication, Passwords, Security

**Definition:**
A security system requiring two different verification methods to log in (e.g., password + SMS code).

**Technical Explanation:**
**Factor Types:**
```
Something You Know:
- Password
- PIN
- Security question

Something You Have:
- Phone (SMS code)
- Authenticator app (Google Authenticator, Authy)
- Security key (hardware token)

Something You Are:
- Fingerprint
- Face recognition
- Iris scan
```

**2FA Example Workflow:**
```
Login Attempt:
1. Enter email: doctor@hospital.com
2. Enter password: ••••••••
3. System sends SMS: "Code: 847392"
4. User enters code: 847392
5. Login successful
6. Session valid for 8 hours

If someone knows password but not phone:
- They can't log in (blocked at step 4)
- Phone owner needed to complete login
```

**Benefits:**
- ✅ Prevent unauthorized access (password alone not enough)
- ✅ Protect against phishing (code changes every login)
- ✅ Secure accounts (especially important for admins)

**In zarishhealth Context:**
- **Recommended:** For all doctor/admin accounts
- **Optional:** For patient portals (patients decide)
- **Method:** SMS or authenticator app
- **Cost:** Free (built into Supabase)

**Learn More:**
- [2FA Best Practices](https://www.microsoft.com/en-us/account/security/two-step-verification/about)

---

### Audit Logs
**Category:** Compliance & Security  
**Synonyms:** Access logs, activity logs  
**Related:** Compliance, HIPAA, Investigation

**Definition:**
A record of who accessed what data, when, and from where - used for security, compliance, and investigation.

**Technical Explanation:**
What to log:
```
Every database access should log:
├── When: Timestamp (2026-01-27 14:35:22)
├── Who: User ID / Username (doctor@hospital.com)
├── What: Action (Viewed patient record)
├── Which: Data accessed (Patient ID: 12345)
├── Where: IP address (203.0.113.42)
├── Result: Success/Failure
└── Duration: How long took (125ms)
```

**Audit Log Example:**
```
2026-01-27 14:35:22 | doctor@hospital.com | VIEWED_PATIENT | Patient:12345 | 203.0.113.42 | SUCCESS
2026-01-27 14:35:45 | nurse@hospital.com | PRESCRIBED_MEDICATION | Patient:12345, Med:Metformin | 203.0.113.50 | SUCCESS
2026-01-27 14:36:12 | attacker@gmail.com | VIEWED_PATIENT | Patient:54321 | 192.0.2.1 | BLOCKED
                    └─ Not a hospital staff ✅ Blocked attempt logged

Later Analysis:
"attacker@gmail.com tried to access patient data from non-hospital IP"
→ Investigate security breach
```

**Requirements (HIPAA/GDPR):**
- ✅ All access logged
- ✅ Logs encrypted
- ✅ Logs retained 3+ years
- ✅ Regular audit log review
- ✅ Unauthorized access investigation
- ✅ User can request access history

**Learn More:**
- [HIPAA Audit Requirements](https://www.hhs.gov/hipaa/for-professionals/security/audit-controls/index.html)

---

## INTEGRATION & INTEROPERABILITY

### API Integration
**Category:** System Integration  
**Synonyms:** API connectivity, system interface  
**Related:** REST, FHIR, Webhooks, Data Exchange

**Definition:**
The technical connection of two systems so they can exchange data through an Application Programming Interface.

**Technical Explanation:**
**Integration Scenarios:**

**1. Hospital A → ZarishHealth Platform**
```
Hospital has existing system
Hospital needs ZarishHealth functionality
Solution: API Integration

Hospital System → REST API → ZarishHealth
(Hospital keeps their system)
(Data syncs automatically)
```

**2. ZarishHealth Platform → National Registry**
```
ZarishHealth has patient records
National registry needs to aggregate
Solution: Daily sync

ZarishHealth → FHIR API → National Registry
(Automatic, scheduled)
(Patient IDs deduplicated)
```

**3. ZarishHealth Platform → International System**
```
NGO wants multi-country data
But wants each country separate
Solution: Federated APIs

BGD: ZarishHealth BGD → FHIR API ─┐
THA: ZarishHealth THA → FHIR API ─┼→ NGO Platform
MMR: ZarishHealth MMR → FHIR API ─┘
(Each country data stays in country)
```

**Learn More:**
- [API Integration Best Practices](https://swagger.io/resources/articles/api-integration/)

---

### ETL (Extract, Transform, Load)
**Category:** Data Integration  
**Abbreviation:** ETL  
**Synonyms:** Data pipeline, data integration  
**Related:** Data warehouse, Analytics, Integration

**Definition:**
A process for moving data from one system to another: extracting from source, transforming to fit destination, loading to destination.

**Technical Explanation:**
**Extract:**
```
Source: Hospital A's EMR
Extract: Get all patient records since last sync
Result: 250 patient records
```

**Transform:**
```
Hospital format: Different field names
Transform: Map to FHIR standard
Example:
  Hospital: "PatientName" → FHIR: "name.given" + "name.family"
  Hospital: "PatientAge" → FHIR: "birthDate" (calculate)
  Hospital: "PatientGender" → FHIR: "gender"
```

**Load:**
```
Destination: National Health Registry
Load: Insert 250 transformed records
Result: Registry now has Hospital A's data
```

**In zarishhealth Context:**
```
Daily ETL Job:
1. Extract: Get new/updated patients from all hospitals
2. Transform: Convert to FHIR format
3. Deduplicate: Is this patient already known?
4. Load: Add to national registry
5. Report: "Loaded 450 new records, 32 duplicates"
```

**Benefits:**
- ✅ Automated (no manual data entry)
- ✅ Scheduled (runs automatically at night)
- ✅ Transformation (data standardization)
- ✅ Tracking (audit trail of what moved)

**Learn More:**
- [ETL Best Practices](https://www.talend.com/resources/ebooks/what-is-etl/)

---

### Data Warehouse
**Category:** Analytics Infrastructure  
**Synonyms:** Analytics database, data mart  
**Related:** ETL, Analytics, Business Intelligence

**Definition:**
A centralized database optimized for analysis, separate from operational systems, combining data from multiple sources.

**Technical Explanation:**
**Operational DB vs Data Warehouse:**
```
Operational Database (ZarishHealth EMR):
├── Purpose: Run hospital operations
├── Data: Current patient data only
├── Queries: Fast lookups (get patient 123)
├── Design: Normalized (optimized for inserts)
└── Size: Smaller, focused

Data Warehouse (Analytics):
├── Purpose: Answer business questions
├── Data: Historical (5+ years)
├── Queries: Complex aggregations
│   "How many diabetes patients last year?"
│   "Which medications most prescribed?"
│   "What's average hospital stay by age?"
├── Design: Denormalized (optimized for reads)
└── Size: Larger, historical
```

**ZarishHealth Architecture:**
```
Hospitals → ZarishHealth EMR → Daily ETL → Data Warehouse
                                    └→ Analytics Reports
                                    └→ Dashboards
                                    └→ Research Data
```

**Benefits:**
- ✅ Doesn't slow operational system
- ✅ Historical analysis (trends)
- ✅ Complex reports (not possible in EMR)
- ✅ Research data (aggregate, anonymized)

**Learn More:**
- [Data Warehouse Design](https://www.snowflake.com/en/data-cloud/data-warehouse/)

---

### Loose Coupling
**Category:** System Design  
**Synonyms:** Decoupled, independent systems  
**Related:** Modularity, Scalability, Interoperability

**Definition:**
A system design where components are independent and communicate via well-defined interfaces, enabling changes without cascading failures.

**Technical Explanation:**
**Tight Coupling (BAD):**
```
Hospital A's EMR directly calls Hospital B's EMR
Hospital A → Hospital B (direct call)
           ↓
If Hospital B down → Hospital A broken ✗
If Hospital B changes → Hospital A breaks ✗
Difficult to scale (tight dependency)
```

**Loose Coupling (GOOD):**
```
Hospitals → ZarishHealth API → Hospital's individual systems
         (via standard interface)
              ↓
If Hospital B down → Hospital A still works ✓
If Hospital B changes → ZarishHealth still works ✓
Easy to scale (independent components)
```

**Benefits:**
- ✅ Resilience (one failure doesn't cascade)
- ✅ Flexibility (can swap implementations)
- ✅ Scalability (components scale independently)
- ✅ Reusability (components usable elsewhere)

**Learn More:**
- [Loose Coupling Design Pattern](https://en.wikipedia.org/wiki/Loose_coupling)

---

### Event-Driven Architecture
**Category:** System Design  
**Synonyms:** Event-based, event streaming  
**Related:** Webhooks, Real-time, Asynchronous

**Definition:**
A system design where components communicate through events, enabling real-time reactions without direct calls.

**Technical Explanation:**
**Traditional (Request-Response):**
```
Frontend → Backend → Database
"Get patient 123"
         ← "Here's patient 123"
(Synchronous, blocking)
```

**Event-Driven:**
```
Event: "Patient Admitted"
    ├→ EMR: Store patient record
    ├→ Pharmacy: Prepare admission orders
    ├→ Lab: Get ready for admission labs
    ├→ Billing: Start account
    └→ Analytics: Record event
(Asynchronous, parallel)
```

**In zarishhealth Context:**
```
Patient Event Stream:
PatientCreated → Triggers:
├─ Send welcome email
├─ Create pharmacy orders
├─ Create appointment slots
└─ Notify district health office

PatientDischarged → Triggers:
├─ Send discharge instructions
├─ Generate bill
├─ Archive records
└─ Notify follow-up clinics
```

**Benefits:**
- ✅ Real-time (things happen immediately)
- ✅ Scalable (no bottlenecks)
- ✅ Decoupled (components independent)
- ✅ Flexible (easy to add listeners)

**Learn More:**
- [Event-Driven Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture)

---

## STANDARDS & COMPLIANCE

### OpenHIE (Open Health Information Exchange)
**Category:** Healthcare Interoperability Standard  
**Abbreviation:** OpenHIE  
**Related:** FHIR, Interoperability, Architecture

**Definition:**
An international initiative providing open standards, reference architectures, and governance models for health information exchange.

**Technical Explanation:**
OpenHIE provides:
1. **Reference Architectures:** How to build HIS
2. **Standards:** Which standards to use (FHIR, HL7)
3. **Governance Models:** How to govern health data
4. **Training:** How to implement

**OpenHIE Layers:**
```
┌─ Presentation Layer (user interfaces)
├─ Service Delivery Layer (APIs)
├─ Information Exchange Layer (FHIR, HL7)
├─ Data & Security Services (encryption, auth)
├─ Infrastructure Layer (servers, networking)
└─ Governance Layer (policies, regulations)
```

**In zarishhealth Context:**
- ZarishHealth follows OpenHIE architecture
- Supports OpenHIE interoperability standards
- Can integrate with OpenHIE-based systems
- Bangladesh/Thailand/Myanmar can use for national HIS

**Learn More:**
- [OpenHIE Official](https://www.ohie.org/)

---

## ANALYTICS & INSIGHTS

### Business Intelligence (BI)
**Category:** Analytics & Reporting  
**Abbreviations:** BI  
**Synonyms:** Analytics, reporting, dashboards  
**Related:** Data Warehouse, Analytics, Decision Support

**Definition:**
Tools and processes for analyzing business data to support decision-making.

**Technical Explanation:**
BI Stack:
```
Data Warehouse (historical data)
         ↓
ETL (extract, transform, load)
         ↓
Analytics Engine (queries, calculations)
         ↓
Visualization (dashboards, reports)
         ↓
User (makes informed decisions)
```

**BI Questions ZarishHealth Answers:**
```
Hospital Level:
"How many patients admitted this month?"
"What's average length of stay?"
"Which diagnoses most common?"
"Top 10 prescribed medications?"

District Level:
"How many hospitals in district?"
"Disease prevalence by district?"
"Vaccination rates?"
"Mortality trends?"

National Level:
"Disease burden by region?"
"Healthcare capacity distribution?"
"Effectiveness of interventions?"
"Disparities in access?"
```

**Benefits:**
- ✅ Visibility (see what's happening)
- ✅ Accountability (measure outcomes)
- ✅ Decision-making (data-driven choices)
- ✅ Planning (resource allocation)
- ✅ Research (evidence for policy)

**Learn More:**
- [Business Intelligence Best Practices](https://en.wikipedia.org/wiki/Business_intelligence)

---

### DHIS2 (District Health Information System 2)
**Category:** Health Information System  
**Abbreviation:** DHIS2  
**Related:** National HIS, Analytics, Data Reporting

**Definition:**
An open-source platform for health information management used in 100+ countries, focusing on aggregate data reporting.

**Technical Explanation:**
**DHIS2 vs ZarishHealth:**
```
DHIS2:
├── Focus: Aggregate data (how many cases?)
├── Use: National reporting, surveillance
├── Data: Counts, indicators
└── Users: District/national planners

ZarishHealth:
├── Focus: Clinical details (patient records)
├── Use: Hospitals, patient care
├── Data: Individual records
└── Users: Doctors, clinicians
```

**Integration:**
```
ZarishHealth (Individual Patient Records)
    ↓ (Aggregate)
DHIS2 (National Reports)
    ↓
Ministry Decision-Making
```

**In zarishhealth Context:**
- ZarishHealth captures individual records
- ETL process aggregates to DHIS2 format
- DHIS2 used for national reporting
- Both systems complement each other

**Learn More:**
- [DHIS2 Official](https://dhis2.org/)

---

## SUMMARY TABLE

| Term | Category | See Also |
|------|----------|----------|
| Data Minimization | Governance | Privacy, GDPR |
| Data Classification | Security | Access control |
| Data Retention | Governance | Deletion, Privacy |
| MDM | Data Management | Deduplication |
| Encryption | Security | HTTPS, Passwords |
| Authentication | Security | Login, Password |
| Authorization | Security | RBAC, Permissions |
| 2FA | Security | Multi-factor |
| Audit Logs | Compliance | HIPAA, Tracking |
| API Integration | Integration | Systems, Data |
| ETL | Data Integration | Pipelines, Loading |
| Data Warehouse | Analytics | Reports, BI |
| Loose Coupling | Design | Independence |
| Event-Driven | Design | Real-time, Async |
| OpenHIE | Standards | Interoperability |
| BI | Analytics | Reporting, Dashboards |
| DHIS2 | Health System | Aggregate Reporting |

---

**[Back to Glossary Index](./index.md)**

---

*Last updated: January 26, 2026*  
*Version: 1.0.0*
