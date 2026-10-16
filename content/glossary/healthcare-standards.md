---
title: Healthcare standards
description: Plain-language definitions of health information standards mentioned in the blueprint.
slug: /glossary/healthcare-standards
sidebar_position: 3
status: adopted
last_reviewed: "2026-10-16"
audience: Health-program teams, clinicians, and developers
---


## FHIR

**Fast Healthcare Interoperability Resources (FHIR)** is a standard from Health Level Seven International (HL7) for representing and exchanging health information. The blueprint proposes FHIR for clinical data interfaces. The existence of the proposal does not mean a FHIR server or implementation guide is available.

## FHIR release

A **FHIR release** is a published version of the FHIR specification. The blueprint proposes R5 initially and notes that R4 is widely deployed. Implementers must name and test the exact release they support; do not infer support from a badge or repository name.

## FHIR resource

A **FHIR resource** is a standardized unit of health information, such as `Patient`, `Observation`, or `ServiceRequest`. Resources follow the specification for the selected FHIR release.

## FHIR profile

A **profile** adds rules to a FHIR resource for a particular use, such as requiring or restricting certain fields. A profile must be published and tested before software can claim to conform to it.

## SMART App Launch

**SMART App Launch** is a standard for connecting applications to FHIR systems using authorization and launch context. Confirm the supported version, FHIR release, and security configuration for an actual deployment.

## Terminology system

A **terminology system** defines codes and their meanings. The blueprint names systems such as SNOMED CT, LOINC, and ICD-11, but their identifiers, availability, and licensing must be confirmed for each intended use and jurisdiction.

## Synthetic data

**Synthetic data** is invented data created for examples or tests. It must not identify or describe a real patient, beneficiary, staff member, or organization. Use obviously fictional values and avoid copying records or screenshots.

## Further reading

- [HL7 FHIR R5 specification](https://hl7.org/fhir/R5/)
- [SMART App Launch](https://hl7.org/fhir/smart-app-launch/)
- [SNOMED CT licensing](https://www.snomed.org/licensing)
- [LOINC](https://loinc.org/)
- [ICD-11](https://www.who.int/standards/classifications/classification-of-diseases)
