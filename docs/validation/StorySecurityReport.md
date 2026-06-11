# Story Security Report

Status: REQUIRED BEFORE CLOSURE

## Required Security Checks

| Security Check | Required Result | Evidence |
| --- | --- | --- |
| Dependency Scan | PASS | Required before story closure |
| SAST Scan | PASS | Required before story closure |
| Secret Scan | PASS | Required before story closure |
| OWASP Review | PASS | Required before story closure |
| Authentication Review | PASS | Required before story closure |
| Authorization Review | PASS | Required before story closure |
| API Security Review | PASS | Required before story closure |
| Input Validation Review | PASS | Required before story closure |

## Vulnerability Gate

Story closure is blocked when Critical or High vulnerabilities, secret exposure, failed security scans, or unresolved dependency risk exist.
