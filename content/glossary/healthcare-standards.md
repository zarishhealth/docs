# 02. HEALTHCARE & STANDARDS TERMS
## ZarishHealthHealth Glossary - Section 2

**Focus:** Medical, clinical, healthcare systems, and interoperability standards  
**Audience:** Healthcare workers, clinicians, system integrators  
**Read Time:** ~25 minutes

---

## HEALTHCARE INFORMATION SYSTEMS

### EMR (Electronic Medical Record)
**Category:** Healthcare Information System  
**Abbreviation:** EMR  
**Synonyms:** Electronic health record (similar), medical record  
**Related:** EHR, PHR, HIS, Patient Data

**Definition:**
A digital system that stores a patient's medical information (symptoms, diagnoses, medications, test results) from a specific healthcare facility.

**Technical Explanation:**
EMR characteristics:
1. Focuses on *one facility* (hospital, clinic)
2. Contains clinical data (patient history, diagnoses)
3. Includes medications, allergies, tests
4. Owned by the facility (not patient)
5. Accessible only within that facility (usually)

**In ZarishHealthHealth Context:**
- ZarishHealth HIS includes EMR module
- Hospital enters patient data once
- Reduces paper records
- Faster clinical decisions
- Patient data searchable (by disease, medication, etc.)

**Example EMR Data:**
```
Patient: Mohammed Ahmed
Age: 45 | Gender: Male | Blood Type: O+

Medical History:
- Diabetes Type 2 (2015)
- Hypertension (2012)

Current Medications:
- Metformin 500mg twice daily
- Amlodipine 5mg once daily

Allergies:
- Penicillin (rash)

Recent Lab Results:
- HbA1c: 8.2% (Jun 2026)
- Creatinine: 1.1 (Jun 2026)
```

**BGD Context:**
In Bangladesh, DGHS (Directorate General of Health Services) promotes EMR implementation in government hospitals.

**THA Context:**
Thailand's ThaiHIS includes EMR as central component.

**Learn More:**
- [HL7 FHIR Patient Resource](http://hl7.org/fhir/R5/patient.html)
- [EMR Best Practices](https://www.healthit.gov/sites/default/files/2019-04/AHA_Best_Practice.pdf)

---

### EHR (Electronic Health Record)
**Category:** Healthcare Information System  
**Abbreviation:** EHR  
**Synonyms:** Electronic medical record (similar), health record  
**Related:** EMR, PHR, HIS

**Definition:**
A broader term for a digital record of a patient's *entire* health history across *multiple* facilities, owned by standards/systems (not one facility).

**Technical Explanation:**
EHR vs EMR:
- **EMR:** One hospital's data (Clinic A's view)
- **EHR:** Patient's complete health history (all clinics + hospitals)
- **PHR:** Patient's own record (they control it)

**In ZarishHealthHealth Context:**
- National EHR: Aggregates EMRs from all hospitals
- Patient ID ties records together
- Prevents duplicate tests/records
- Better continuity of care

**Example:**
```
Patient Mohammed goes to:
- Clinic A (2020): Diagnosed with Diabetes
- Hospital B (2022): Emergency appendectomy
- Clinic C (2024): Regular checkup

EMR (Clinic C's view): Only 2024 data
EHR (National view): 2020, 2022, 2024 data combined
```

**Learn More:**
- [EHR vs EMR](https://www.healthit.gov/sites/default/files/EHR_vs_EMR.pdf)

---

### PHR (Personal Health Record)
**Category:** Healthcare Information System  
**Abbreviation:** PHR  
**Synonyms:** Patient health record, personal record  
**Related:** EMR, EHR, Patient Data

**Definition:**
A health record *owned and controlled by the patient*, containing their health information which they can share with providers.

**Technical Explanation:**
PHR characteristics:
1. Patient owns the data
2. Patient controls who can access it
3. Can aggregate from multiple providers
4. Patient initiates sharing (not automatic)
5. Patient can correct/dispute data

**In ZarishHealthHealth Context:**
- ZarishHealth can include PHR module
- Patients share medical records with new doctors
- Patients control privacy
- Reduces need for paper copies

**Learn More:**
- [PHR Explained](https://www.healthit.gov/faq/what-personal-health-record-phr)

---

### HIS (Health Information System)
**Category:** Healthcare Information System  
**Abbreviation:** HIS  
**Synonyms:** Hospital information system, health system  
**Related:** EMR, EHR, Hospital Management

**Definition:**
An integrated system that manages *all* hospital operations: patient records, appointments, pharmacy, lab, billing, inventory.

**Technical Explanation:**
HIS includes:
1. **Clinical:** EMR, orders, results
2. **Administrative:** Appointments, admissions, discharge
3. **Financial:** Billing, insurance, payments
4. **Pharmacy:** Medications, inventory
5. **Lab:** Tests, results
6. **Imaging:** Radiology, X-rays

**In ZarishHealthHealth Context:**
- ZarishHealth HIS = complete hospital system
- Replaces multiple separate systems
- Single patient ID (integrated)
- Real-time data sharing between departments
- Reduces errors, improves efficiency

**HIS Workflow:**
```
Patient Arrives → Admit (EMR) → See Doctor → Lab Orders
→ Lab Tests → Results → Doctor Reviews → Pharmacy
→ Discharge → Billing
(All integrated in one system)
```

**BGD Context:**
- Government hospitals need HIS (DGHS policy)
- Many still use paper records
- ZarishHealth targets this gap

**THA Context:**
- Thailand has ThaiHIS (national standard)
- Hospitals must be compatible

**Learn More:**
- [HIS Best Practices](https://www.ibm.com/thought-leadership/en-us/article/healthcare-information-system)

---

## HEALTHCARE STANDARDS & PROTOCOLS

### FHIR R5 (Fast Healthcare Interoperability Resources Release 5)
**Category:** Healthcare Interoperability Standard  
**Abbreviation:** FHIR R5, FHIR  
**Synonyms:** HL7 FHIR, FHIR standard  
**Related:** HL7, Healthcare Standards, Healthcare Data

**Definition:**
A modern standard for exchanging healthcare data electronically using REST APIs and JSON/XML, enabling different health systems to communicate.

**Technical Explanation:**
FHIR key concepts:
1. **Resource:** A logical unit of data (Patient, Medication, Lab Result)
2. **Profile:** Rules about which fields are required/optional
3. **Bundle:** Container for multiple resources
4. **API:** RESTful endpoints for CRUD operations
5. **Terminology:** Uses standard medical codes (SNOMED, ICD-11, LOINC)

**FHIR Resources Used in ZarishHealth:**
```
Patient → Individual person
Encounter → Visit to healthcare facility
Practitioner → Doctor, nurse, healthcare worker
Medication → Medicine/drug
MedicationRequest → Prescription
MedicationAdministration → Medicine given to patient
Condition → Disease/diagnosis
Observation → Lab result, vital sign
DiagnosticReport → Summary of tests
Immunization → Vaccination
AllergyIntolerance → Drug/food allergies
Procedure → Surgery or treatment
Appointment → Scheduled visit
```

**FHIR JSON Example:**
```json
{
  "resourceType": "Patient",
  "id": "123",
  "meta": {
    "profile": ["https://fhir.ZarishHealthsphere.com/StructureDefinition/ZarishHealth-patient-bgd"]
  },
  "identifier": [{
    "system": "http://bgd.gov.bd/patient-id",
    "value": "12345678"
  }],
  "name": [{
    "given": ["Mohammed"],
    "family": "Ahmed"
  }],
  "birthDate": "1978-05-15",
  "gender": "male",
  "address": [{
    "country": "Bangladesh",
    "state": "Dhaka"
  }]
}
```

**FHIR Advantages:**
- ✅ RESTful (works with web technologies)
- ✅ JSON-friendly (easy to use)
- ✅ Extensible (profiles for country-specific needs)
- ✅ Wide adoption (growing standard)
- ✅ Multiple data formats (JSON, XML)

**Learn More:**
- [HL7 FHIR R5 Specification](http://hl7.org/fhir/R5/)
- [FHIR Explained Simply](https://www.hl7.org/implement/standards/fhir/)
- [FHIR Profile Development](https://www.hl7.org/fhir/R5/structuredefinition.html)

---

### HL7 (Health Level 7)
**Category:** Healthcare Interoperability Standard  
**Abbreviation:** HL7  
**Synonyms:** HL7 messages, HL7 protocol  
**Versions:** v2, v3, FHIR (newest)  
**Related:** FHIR, Healthcare Messaging, EDI

**Definition:**
A standard for exchanging healthcare information between systems, specifying how to format and transmit data.

**Technical Explanation:**
**HL7 v2** (older, still widely used):
- Text-based format
- Pipes and carets delimit fields
- Hospital-to-hospital communication
- Reliable but outdated

**HL7 v3** (attempted replacement, rarely used):
- XML-based
- Complex, difficult to implement
- Not widely adopted

**FHIR** (modern replacement):
- RESTful, JSON-friendly
- Modern web technologies
- Easier to implement
- Growing adoption

**HL7 v2 Example:**
```
MSH|^~\&|SendingApp|Hospital A|ReceivingApp|Hospital B|20260126120000||ADT^A01|12345|P|2.5
PID|||123456^^^Hospital||Ahmed^Mohammed||19780515|M|||Dhaka^Bangladesh
```
(Pipes and carets delimit fields)

**In ZarishHealthHealth Context:**
- Primary: FHIR (modern)
- Secondary: HL7 v2 bridges (for legacy systems)
- Don't require HL7 v2 expertise initially
- Can add if needed for integrations

**Learn More:**
- [HL7 Standards Overview](https://www.hl7.org/implement/standards/)
- [HL7 v2 vs FHIR](https://www.hl7.org/fhir/R5/comparison-v2.html)

---

### ICD-11 (International Classification of Diseases 11)
**Category:** Medical Coding Standard  
**Abbreviation:** ICD-11, ICD  
**Synonyms:** WHO Classification, Disease codes  
**Related:** SNOMED CT, LOINC, Medical Codes

**Definition:**
WHO's standard system for classifying diseases, conditions, and health procedures using unique codes for diagnosis and billing.

**Technical Explanation:**
ICD-11 structure:
```
Diseases & Conditions
├── A00-B99: Infectious diseases (A48: Other bacterial infections)
├── C00-D49: Cancers
├── E00-E89: Endocrine/metabolic (E11: Type 2 diabetes)
├── I00-I99: Circulatory diseases
├── J00-J99: Respiratory (J45: Asthma)
└── ... [20+ chapters total]
```

**Example ICD-11 Codes:**
```
Diabetes Type 2: 5A10.0 (ICD-11)
Hypertension: 9A00 (ICD-11)
Malaria: 1D40-1D44 (ICD-11)
```

**In ZarishHealthHealth Context:**
- Used for diagnosis coding
- FHIR Condition resource includes ICD-11 codes
- Enables standardized reporting
- Works across countries (global standard)

**BGD Context:**
- Bangladesh legally requires ICD-10-CM (older)
- ZarishHealth should support ICD-11 (future-proof)
- Can map ICD-10 → ICD-11 for compatibility

**THA Context:**
- Thailand transitioning from ICD-10 → ICD-11
- ZarishHealth supports both (bridge period)

**Learn More:**
- [ICD-11 Official Browser](https://icd.who.int/)
- [ICD-11 Implementation](https://www.who.int/standards/classifications/icd)

---

### SNOMED CT (SNOMED Clinical Terms)
**Category:** Medical Terminology Standard  
**Abbreviation:** SNOMED CT  
**Synonyms:** SNOMED, Clinical terminology  
**Related:** ICD-11, LOINC, Medical Concepts

**Definition:**
A comprehensive standard medical terminology system with hundreds of thousands of concepts and relationships between them.

**Technical Explanation:**
SNOMED CT includes:
1. **Concepts:** Medical ideas (e.g., "diabetes", "hypertension")
2. **Descriptions:** How concepts are named
3. **Relationships:** How concepts relate (diabetes "is a" metabolic disease)
4. **Hierarchies:** Organization of concepts

SNOMED is more detailed than ICD:
```
ICD-11: E11 (Type 2 diabetes)
SNOMED: 44054006 (Type 2 diabetes mellitus)
```

**Advantages:**
- Highly detailed
- Captures relationships
- Good for clinical decision support
- More searchable than ICD

**In ZarishHealthHealth Context:**
- Used for conditions, findings, procedures
- FHIR resources reference SNOMED concepts
- Enables semantic search ("show all diabetic patients")

**Learn More:**
- [SNOMED CT Browser](https://browser.ihtsdotools.org/)
- [SNOMED Implementation Guide](https://www.snomed.org/start-using-snomed-ct)

---

### LOINC (Logical Observation Identifiers Names and Codes)
**Category:** Lab & Observation Coding Standard  
**Abbreviation:** LOINC  
**Synonyms:** Lab codes, Observation codes  
**Related:** ICD-11, SNOMED CT, Lab Results

**Definition:**
A universal standard for naming and coding laboratory tests and clinical observations, making test results comparable across systems.

**Technical Explanation:**
LOINC codes identify:
1. **What** was measured (glucose, hemoglobin)
2. **Where** it was measured (blood serum, urine)
3. **How** it was measured (method)
4. **When** results are available (time aspect)

**LOINC Code Format:**
```
Each LOINC code = unique identifier for specific test

Examples:
2345-7: Glucose [Mass/volume] in Serum or Plasma
718-7: Hemoglobin [Mass/volume] in Blood
1559-0: Porphobilinogen [Mass/volume] in Urine
```

**In ZarishHealthHealth Context:**
- All lab tests use LOINC codes
- FHIR Observation resource includes LOINC codes
- Enables comparison across hospitals
- Prevents misinterpretation of test results

**Lab Example:**
```
Hospital A: "Glucose test" = LOINC 2345-7 = 120 mg/dL
Hospital B: "Blood sugar" = LOINC 2345-7 = 120 mg/dL
Same code → results are comparable, not duplicate tests
```

**Learn More:**
- [LOINC Official Site](https://loinc.org/)
- [LOINC Tutorial](https://loinc.org/get-started/)

---

## HEALTHCARE OPERATIONS & CONCEPTS

### Pharmacy Module
**Category:** Healthcare Operations  
**Synonyms:** Medication management, drug dispensing  
**Related:** EMR, HIS, Medications, Prescriptions

**Definition:**
The part of a health system that manages medications: inventory, prescriptions, dispensing, and tracking drug usage.

**Technical Explanation:**
Pharmacy functions:
1. **Inventory Management:** Stock tracking, reordering
2. **Prescription Fulfillment:** Verify prescriptions, dispense medications
3. **Drug Interactions:** Check for harmful combinations
4. **Expiry Management:** Remove expired drugs
5. **Reporting:** Usage statistics, cost analysis

**In ZarishHealthHealth Context:**
- ZarishHealth Pharmacy module:
  - Doctors write prescriptions (in EMR)
  - Pharmacy receives order automatically
  - Pharmacy dispenses and marks as given
  - Tracks inventory automatically

**Pharmacy Workflow:**
```
Doctor:
- Patient: Diabetes
- Prescription: Metformin 500mg 2x daily × 30 days
- Enters in EMR

Pharmacy:
- Receives prescription automatically
- Checks for drug interactions
- Checks inventory (do we have Metformin?)
- Dispenses to patient
- Updates inventory

Report:
- How much Metformin used this month?
- Cost analysis
- Which drugs are most-used?
```

**Learn More:**
- [Pharmacy Information System Best Practices](https://www.ashp.org/Professional-Development)

---

### Lab Module
**Category:** Healthcare Operations  
**Synonyms:** Laboratory, pathology, diagnostic tests  
**Related:** EMR, HIS, Observations, LOINC

**Definition:**
The part of a health system that manages laboratory tests: ordering, specimen handling, analysis, and result reporting.

**Technical Explanation:**
Lab functions:
1. **Test Ordering:** Doctor orders lab tests
2. **Specimen Collection:** Blood/urine/tissue collection
3. **Analysis:** Testing in laboratory
4. **Quality Control:** Ensure accuracy
5. **Result Reporting:** Send results to doctor
6. **Archival:** Store results for future reference

**In ZarishHealthHealth Context:**
- ZarishHealth Lab module:
  - Doctor orders tests (with LOINC codes)
  - Lab receives orders
  - Lab performs tests
  - Lab enters results
  - Results available immediately to doctor
  - Patient can view results

**Lab Workflow:**
```
Patient: Blood test ordered for diabetes monitoring

Doctor: Orders test (HbA1c - LOINC: 4548-4)
Lab: Receives order, collects sample
Lab: Analyzes sample (measures HbA1c)
Lab: Enters result (7.8%)
Doctor: Reviews result, adjusts medication
Patient: Sees result in their record
```

**Learn More:**
- [Laboratory Information System (LIS)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6113237/)

---

### Vital Signs
**Category:** Patient Health Metrics  
**Synonyms:** Biometrics, health measurements  
**Related:** Observations, Lab Results, Patient Monitoring

**Definition:**
Measurements of basic bodily functions that indicate a patient's physical condition: blood pressure, heart rate, temperature, breathing rate.

**Technical Explanation:**
Standard vital signs:
1. **Temperature:** 36.5-37.5°C (normal)
2. **Heart Rate / Pulse:** 60-100 bpm (normal)
3. **Blood Pressure:** 120/80 mmHg (normal)
   - First number (systolic) = pressure when heart beats
   - Second number (diastolic) = pressure between beats
4. **Respiratory Rate:** 12-20 breaths/min (normal)
5. **Oxygen Saturation (SpO2):** 95-100% (normal)

**In ZarishHealthHealth Context:**
- Recorded every patient visit
- FHIR Observation resource
- Trends tracked (e.g., increasing blood pressure)
- Alerts if abnormal (e.g., fever > 38.5°C)

**Vital Signs Example:**
```
Patient: Mohammed Ahmed
Date: Jan 26, 2026, 14:30

Vital Signs:
- Temperature: 38.2°C (Alert: Fever!)
- Blood Pressure: 145/95 mmHg (Alert: Elevated)
- Heart Rate: 88 bpm (Normal)
- Respiratory Rate: 18 /min (Normal)
- SpO2: 96% (Normal)

Interpretation: Patient has fever, needs evaluation
```

**Learn More:**
- [Vital Signs Monitoring](https://medlineplus.gov/ency/article/002341.htm)

---

### Allergies & Adverse Reactions
**Category:** Patient Safety  
**Synonyms:** Drug allergies, adverse reactions, intolerances  
**Related:** Pharmacy, Medications, Patient Safety

**Definition:**
Records of substances a patient is allergic or sensitive to, critical for preventing harmful medication interactions.

**Technical Explanation:**
Types of adverse reactions:
1. **Allergy:** Immune response (rash, anaphylaxis)
2. **Intolerance:** Non-immune reaction (nausea, headache)
3. **Contra-indication:** Drug not safe for condition

**Common Drug Allergies:**
- Penicillin (antibiotics)
- Sulfonamides
- NSAIDs (aspirin, ibuprofen)
- ACE inhibitors

**In ZarishHealthHealth Context:**
- EMR displays allergies prominently
- Pharmacy system checks before dispensing
- Doctor sees alerts before prescribing
- FHIR AllergyIntolerance resource

**Example:**
```
Patient Record:
Name: Mohammed Ahmed
ALLERGIES: ⚠️ PENICILLIN (rash)

Doctor wants to prescribe: Amoxicillin (penicillin-based)
System: ⚠️ ALERT! Patient allergic to penicillin
Doctor: OK, prescribe alternative (e.g., Azithromycin)
```

**Learn More:**
- [Medication Allergies](https://medlineplus.gov/ency/article/002452.htm)

---

### Clinical Decision Support
**Category:** Clinical Tools  
**Synonyms:** CDS, clinical rules, care protocols  
**Related:** EMR, Diagnosis, Treatment Guidelines

**Definition:**
A system that provides doctors with evidence-based suggestions during patient care (diagnosis, medication, tests).

**Technical Explanation:**
CDS examples:
1. **Drug Interaction Check:** "This patient on metoprolol, avoid propranolol"
2. **Allergy Alert:** "Patient allergic to penicillin, this antibiotic is penicillin-based"
3. **Guideline Reminder:** "Patient with diabetes, order HbA1c yearly"
4. **Order Set:** Pre-filled medication orders for common conditions
5. **Diagnostic Support:** "Based on symptoms, consider these diagnoses"

**In ZarishHealthHealth Context:**
- Passive alerts (EMR shows suggestions)
- Evidence-based (uses clinical guidelines)
- Reduces errors and improves quality
- Can be country-specific (BGD guidelines vs. THA guidelines)

**Example:**
```
Doctor enters: 65-year-old male with high blood pressure
CDS Suggestions:
- Order: ECG (check heart)
- Order: Lipid panel (check cholesterol)
- Suggest: ACE inhibitor medication
- Note: Check kidney function first
- Guideline: Blood pressure target <140/90 for this age
```

**Learn More:**
- [Clinical Decision Support Systems](https://www.healthit.gov/topic/clinical-decision-support)

---

## OPERATIONAL CONCEPTS

### Patient Registration & Demographics
**Category:** Administrative  
**Synonyms:** Patient intake, patient onboarding  
**Related:** EMR, HIS, Patient ID

**Definition:**
The process of collecting and recording a patient's basic information when they first visit a health facility.

**Technical Explanation:**
Demographics collected:
1. **Name:** Full name, preferred name
2. **Identification:** National ID, passport
3. **Birth Date:** Calculated age
4. **Gender:** For appropriate care
5. **Contact:** Address, phone number
6. **Insurance:** Insurance company, policy number
7. **Emergency Contact:** Who to contact

**In ZarishHealthHealth Context:**
- Single patient ID (national or facility)
- Prevents duplicate records
- Reduces errors
- Enables follow-up

**Registration Workflow:**
```
Patient Arrives → Receptionist enters demographics
→ System checks for duplicates
→ If new: Creates record and assigns ID
→ If existing: Loads existing record
→ Doctor sees complete history
```

**Learn More:**
- [Patient Registration Best Practices](https://www.healthit.gov/topic/patient-engagement)

---

### Appointment Scheduling
**Category:** Administrative  
**Synonyms:** Booking, clinic scheduling  
**Related:** EMR, HIS, Clinic Operations

**Definition:**
A system for booking patient appointments with doctors/clinics, managing availability and reducing wait times.

**Technical Explanation:**
Features:
1. **Doctor Availability:** Calendar of available slots
2. **Appointment Types:** Different durations (5 min check-in vs. 30 min consultation)
3. **Confirmation:** SMS/email reminders
4. **Cancellation:** Patients can reschedule
5. **No-show Tracking:** Analytics on attendance

**In ZarishHealthHealth Context:**
- Patients schedule with receptionists (online or in-person)
- Doctor sees appointments
- Reduces wait times
- Better resource planning
- Analytics: How busy is each clinic?

**Scheduling Example:**
```
Dr. Ahmed available:
Mon 9:00-10:00, 10:30-11:30, 14:00-15:00
Tue 9:00-12:00, 14:00-16:00
Wed OFF
Thu 10:00-11:00
...

Patient: "I want appointment with Dr. Ahmed"
System: "Tuesday 10:00 or Thursday 10:00?"
Patient: "Tuesday 10:00"
Appointment created, SMS reminder sent
```

**Learn More:**
- [Clinic Scheduling Best Practices](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568160/)

---

### Referrals
**Category:** Care Coordination  
**Synonyms:** Patient referral, specialist referral  
**Related:** EMR, Inter-facility communication

**Definition:**
A system for a primary care doctor to refer a patient to a specialist or higher-level facility.

**Technical Explanation:**
Referral process:
1. **Primary Doctor:** Patient needs specialist
2. **Referral Letter:** Details of patient condition
3. **Specialist:** Reviews referral, schedules appointment
4. **Communication:** Results sent back to primary
5. **Coordination:** Integrated care

**In ZarishHealthHealth Context:**
- Electronic referrals (not paper)
- Specialists see patient history immediately
- Feedback to primary doctor
- Track: How many referrals? To whom?

**Referral Example:**
```
Dr. Local Clinic: "Patient has suspected TB, needs chest X-ray"
Creates electronic referral to District Hospital

District Hospital Radiology:
- Receives referral, sees patient history
- Performs X-ray
- Enters results
- Results sent electronically to Dr. Local

Dr. Local: Sees results, adjusts treatment
```

**Learn More:**
- [Referral Management Systems](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5741564/)

---

### Discharge Summary
**Category:** Clinical Documentation  
**Synonyms:** Discharge note, hospital summary  
**Related:** EMR, HIS, Patient Continuity

**Definition:**
A document prepared when a patient leaves the hospital summarizing their stay, treatments, and follow-up care.

**Technical Explanation:**
Discharge summary includes:
1. **Reason for Admission:** Why admitted
2. **Hospital Course:** What happened, treatments given
3. **Diagnosis:** Final diagnosis
4. **Medications:** What patient takes home
5. **Follow-up:** Next appointments, tests
6. **Restrictions:** Activity limitations (e.g., "no heavy lifting")

**In ZarishHealthHealth Context:**
- Auto-generated from EMR
- Sent electronically to primary doctor
- Patient receives copy
- Reduces readmissions (clear instructions)

**Discharge Example:**
```
DISCHARGE SUMMARY
Patient: Mohammed Ahmed
Admission Date: Jan 15, 2026
Discharge Date: Jan 22, 2026

Reason: Appendicitis

Hospital Course:
- Day 1: Admitted, confirmed appendicitis via ultrasound
- Day 2: Appendectomy performed (successful)
- Days 3-7: Recovery, pain management, antibiotics
- Day 8: Discharged in good condition

Medications to Take Home:
- Amoxicillin 500mg 3x daily × 7 days
- Paracetamol 500mg as needed for pain

Follow-up:
- Surgeon appointment: Jan 29, 2026
- Suture removal: 10 days post-op
- Return to work: 2 weeks
```

**Learn More:**
- [Discharge Planning Best Practices](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7434738/)

---

## INTEROPERABILITY & DATA EXCHANGE

### Interoperability
**Category:** System Integration  
**Synonyms:** System integration, data exchange  
**Related:** FHIR, HL7, APIs, Standards

**Definition:**
The ability of different healthcare systems to communicate with each other and share patient data seamlessly.

**Technical Explanation:**
Levels of interoperability:
1. **Foundational:** Systems can exchange data (not necessarily understand it)
2. **Structural:** Systems understand data format (e.g., both use FHIR)
3. **Semantic:** Systems understand *meaning* of data (same medical codes)

**In ZarishHealthHealth Context:**
- FHIR = semantic interoperability
- National HIS talks to hospital HIS
- Hospital HIS talks to labs
- All via FHIR APIs

**Interoperability Benefit:**
```
Without Interoperability:
Patient: Hospital A → Hospital B (paper records, starts from scratch)

With Interoperability:
Patient: Hospital A → Hospital B (electronic records, history available)
```

**Learn More:**
- [Interoperability Explained](https://www.healthit.gov/sites/default/files/HCITF_Interoperability_2014.pdf)

---

### Master Data Management (MDM)
**Category:** Data Governance  
**Synonyms:** Master data, reference data  
**Related:** SSOT, Data Quality, Integration

**Definition:**
Systems and processes for maintaining *single, authoritative* copies of critical data across an organization.

**Technical Explanation:**
Master data includes:
1. **Patient:** Central patient record
2. **Provider:** Doctor/clinic information
3. **Medication:** Drug database
4. **ICD/SNOMED:** Medical codes
5. **Organizations:** Hospital registry

**MDM Process:**
```
Multiple hospitals submit: "Patient Mohammed Ahmed"
MDM System:
- Deduplicates (same person?)
- Standardizes data
- Creates: Master record
- Propagates: Updates to all hospitals
```

**In ZarishHealthHealth Context:**
- National patient registry (MDM)
- Each hospital syncs with master
- Prevents duplicates
- Ensures consistency

**Learn More:**
- [Master Data Management](https://www.techopedia.com/definition/30869/master-data-management-mdm)

---

## COUNTRY-SPECIFIC TERMINOLOGY

### Bangladesh (BGD) Specific Terms

#### DGHS (Directorate General of Health Services)
**Definition:** Government agency managing public health system in Bangladesh

**Context in ZarishHealth:**
- Policy maker for HIS implementation
- ZarishHealth should align with DGHS requirements
- Supports EMR adoption in government hospitals

#### National ID (NID)
**Definition:** Bangladesh national identity number used for patient identification

**Context in ZarishHealth:**
- Primary patient identifier in BGD
- Used for linking records across hospitals
- Critical for healthcare access

---

### Thailand (THA) Specific Terms

#### ThaiHIS
**Definition:** Thailand's national health information system standard

**Context in ZarishHealth:**
- ZarishHealth should support ThaiHIS interoperability
- Thai hospitals require ThaiHIS compliance
- Integration point for national reporting

#### Thai Health Insurance
**Definition:** Universal Health Coverage scheme covering most Thai population

**Context in ZarishHealth:**
- Insurance verification required in ZarishHealth
- Billing module must support Thai insurance
- Access to healthcare tied to insurance

---

### Myanmar (MMR) Specific Terms

#### National Patient Registry
**Definition:** Myanmar's ongoing effort to create national patient identification

**Context in ZarishHealth:**
- ZarishHealth can serve as foundation for registry
- Patient IDs will be standardized
- Currently fragmented healthcare system

---

## SUMMARY TABLE

| Term | Category | See Also |
|------|----------|----------|
| EMR | Health Info System | EHR, PHR, HIS |
| EHR | Health Info System | EMR, PHR, National |
| PHR | Health Info System | EMR, EHR, Patient-owned |
| HIS | Health Info System | Complete system |
| FHIR R5 | Healthcare Standard | REST, JSON |
| HL7 | Healthcare Standard | Legacy, v2 |
| ICD-11 | Diagnosis Codes | Disease classification |
| SNOMED CT | Clinical Terms | Medical concepts |
| LOINC | Lab Codes | Test identification |
| Pharmacy | Operations | Medications, inventory |
| Lab | Operations | Tests, results |
| Vital Signs | Patient Metrics | Temperature, BP, HR |
| Allergies | Patient Safety | Drug safety |
| CDS | Clinical Tools | Decision support |
| Registration | Administrative | Demographics |
| Appointments | Administrative | Scheduling |
| Referrals | Care Coordination | Specialist referral |
| Discharge | Documentation | Hospital summary |
| Interoperability | Integration | System communication |
| MDM | Data Governance | Master data |

---

**[Back to Glossary Index](./index.md)**

---

*Last updated: January 26, 2026*  
*Version: 1.0.0*
