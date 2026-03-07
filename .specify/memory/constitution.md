<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0 (Initial constitution for e-commerce towel store)
Modified principles: N/A (new constitution)
Added sections: Core Principles (6 principles), Technology Stack, Development Workflow, Governance
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section will reference these principles
  ✅ spec-template.md - Aligned with e-commerce requirements
  ✅ tasks-template.md - Task structure supports e-commerce development phases
Follow-up TODOs: None
-->

# Towel E-Commerce Store Constitution

## Core Principles

### I. Modern User Experience (NON-NEGOTIABLE)
All user-facing features MUST prioritize modern UX patterns: smooth animations, responsive design, intuitive navigation, and fast page loads. Animations should enhance usability, not distract. Mobile-first approach is mandatory. Page load times MUST be under 3 seconds on 3G connections. Rationale: User experience directly impacts conversion rates and customer satisfaction in e-commerce.

### II. Component-Based Architecture
Frontend MUST be built using React components with clear separation of concerns. Components must be reusable, testable, and follow single responsibility principle. Shared components (buttons, cards, modals) MUST live in a dedicated components directory. Feature-specific components MUST be co-located with their features. Rationale: Maintainability, scalability, and code reusability are critical for long-term project success.

### III. Payment Security (NON-NEGOTIABLE)
All payment processing MUST use PCI-compliant payment gateways (Stripe, PayPal, or equivalent). Payment credentials MUST NEVER be stored in frontend code or client-side storage. Payment flows MUST use secure server-side processing or verified third-party SDKs. All payment-related code MUST be reviewed for security vulnerabilities before deployment. Rationale: Payment security is legally and ethically mandatory for e-commerce operations.

### IV. Product Data Management
Product information (name, price, images, variants, inventory) MUST be structured and easily manageable. Product data structure MUST support: multiple images per product, size/color variants, pricing tiers, inventory tracking, and product categories. Data MUST be fetchable via API or structured data files. Rationale: Flexible product management enables business growth and operational efficiency.

### V. Performance Optimization
Images MUST be optimized (WebP format preferred, lazy loading required). Code splitting MUST be implemented for route-based chunks. Bundle size MUST be monitored and kept under 500KB initial load (gzipped). Critical CSS MUST be inlined. API calls MUST be debounced/throttled where appropriate. Rationale: Performance directly impacts SEO rankings, user retention, and conversion rates.

### VI. Deployment Readiness
Project MUST be deployable to production with minimal configuration. Build process MUST generate static assets ready for CDN deployment. Environment variables MUST be used for configuration (API keys, endpoints). Deployment documentation MUST be maintained. CI/CD pipeline SHOULD be set up for automated testing and deployment. Rationale: Smooth deployment process enables rapid iteration and reduces operational friction.

## Technology Stack

**Frontend Framework**: React 19+ with Vite  
**Styling**: Modern CSS with CSS Modules or Tailwind CSS (preferred for rapid development)  
**State Management**: React Context API or Zustand for cart/global state  
**Routing**: React Router for navigation  
**Payment Integration**: Stripe.js or PayPal SDK (server-side processing required)  
**Animation Library**: Framer Motion or React Spring for smooth animations  
**Image Optimization**: Vite image optimization plugins  
**Form Handling**: React Hook Form with validation  
**Testing**: Vitest for unit tests, React Testing Library for component tests

## Development Workflow

### Code Quality
- ESLint MUST be configured and passing before commits
- Components MUST be functional components using hooks
- Props MUST be typed or documented with PropTypes
- Code MUST be formatted consistently (Prettier recommended)

### Testing Requirements
- Critical user flows (add to cart, checkout) MUST have integration tests
- Payment flow MUST have end-to-end tests (using test payment credentials)
- Components with complex logic MUST have unit tests
- All tests MUST pass before deployment

### Git Workflow
- Feature branches MUST be used for new features
- Commits MUST have descriptive messages
- Pull requests MUST include description of changes and testing performed
- Main branch MUST always be deployable

### Performance Monitoring
- Lighthouse scores MUST be monitored (target: 90+ on all metrics)
- Bundle size MUST be tracked and reported in PRs
- Core Web Vitals MUST be measured in production

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of the change rationale
2. Update to this file with version increment
3. Review of impact on existing codebase
4. Update to relevant templates in `.specify/templates/`

All code reviews MUST verify compliance with these principles. Complexity beyond these principles MUST be justified with clear business or technical rationale.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
