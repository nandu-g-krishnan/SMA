# GitHub Project Configuration

Status: Partially Complete

## Repository

| Field | Value | Status |
| --- | --- | --- |
| GitHub URL | `https://github.com/nandu-g-krishnan/SMA` | Provided |
| GitHub Organization/User | `nandu-g-krishnan` | Derived from URL |
| Repository Name | `SMA` | Derived from URL |
| Personal or Organization Repository | Personal repository | Assumed from user-owned namespace; confirm if this is an organization account |
| Repository Visibility | Requires user confirmation before remote mutation | Required |
| GitHub Token Availability | Requires user confirmation before remote mutation | Required |
| GitHub Project Type | Project V2 preferred; requires user confirmation before remote mutation | Required |
| Classic Project or Project V2 | Project V2 recommended for fields and iterations | Required |

## Workflow

| Field | Value | Status |
| --- | --- | --- |
| Branch Strategy | Feature Branch recommended for governed delivery | Requires confirmation |
| Environment Strategy | Dev, QA, UAT, Prod recommended | Requires confirmation |
| Desired Labels | Use SMA default label strategy unless overridden | Requires confirmation |
| Desired Milestones | MVP, Phase 2, Institutional Hardening recommended | Requires confirmation |
| Desired Iterations | Two-week iterations recommended | Requires confirmation |
| Desired Custom Fields | Use SMA Project V2 field strategy unless overridden | Requires confirmation |
| Story Point Scale | 1-3-5-8-13 recommended | Requires confirmation |
| Sprint Length | Two weeks recommended | Requires confirmation |
| Iteration Structure | Sprint-based Project V2 iterations recommended | Requires confirmation |

## Remaining Required Inputs

Before GitHub automation scripts may create or mutate remote GitHub resources, confirm:

- Personal or organization repository
- GitHub Project V2 enabled: Yes or No
- GitHub Personal Access Token available: Yes or No
- Repository visibility
- Preferred workflow: Feature Branch, GitFlow, or Trunk Based
- Environments: Dev, QA, UAT, Prod, or custom
- Desired milestones
- Desired iterations
- Desired custom fields, if different from the SMA defaults
- Story point scale
- Sprint length
- Iteration structure
