# Tasks: E-Commerce Towel Store Website

**Input**: Design documents from `/specs/001-towel-store/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - not explicitly requested in specification, so test tasks are not included. Focus on implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/` at repository root (frontend-focused)
- Paths shown below follow the structure defined in plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project directory structure (src/components/, src/pages/, src/hooks/, src/services/, src/store/, src/data/, src/utils/, public/images/)
- [x] T002 Install core dependencies: react, react-dom, react-router-dom in package.json
- [x] T003 [P] Install state management: zustand in package.json
- [x] T004 [P] Install form handling: react-hook-form in package.json
- [x] T005 [P] Install animations: framer-motion in package.json
- [x] T006 [P] Install styling: tailwindcss, postcss, autoprefixer as dev dependencies
- [x] T007 [P] Install payment gateway: @stripe/stripe-js in package.json
- [x] T008 Configure Tailwind CSS: Create tailwind.config.js and postcss.config.js
- [x] T009 Configure Vite for image optimization: Update vite.config.js with image optimization plugins
- [x] T010 Create .env file with environment variables (VITE_STRIPE_PUBLISHABLE_KEY, VITE_API_URL)
- [x] T011 [P] Configure ESLint: Update eslint.config.js for React and modern JavaScript
- [x] T012 [P] Create base CSS file: Setup Tailwind directives in src/index.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T013 Setup React Router: Create router configuration in src/App.jsx with base routes
- [x] T014 Create Layout component: Implement src/components/layout/Layout.jsx with Header and Footer
- [x] T015 Create Header component: Implement src/components/layout/Header.jsx with navigation and cart icon placeholder
- [x] T016 Create Footer component: Implement src/components/layout/Footer.jsx with links and information
- [x] T017 Create product data structure: Create src/data/products.json with sample products following data-model.md structure
- [x] T018 Create categories data: Create src/data/categories.json with category definitions
- [x] T019 [P] Create product service: Implement src/services/productService.js to load products from JSON
- [x] T020 [P] Create cart store: Implement src/store/cartStore.js using Zustand with localStorage persistence
- [x] T021 [P] Create product store: Implement src/store/productStore.js using Zustand for product state
- [x] T022 Create utility functions: Implement src/utils/formatters.js for price formatting and currency display
- [x] T023 Create validation utilities: Implement src/utils/validators.js for form validation
- [x] T024 Setup Framer Motion: Configure AnimatePresence for page transitions in Layout component

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse and View Products (Priority: P1) 🎯 MVP

**Goal**: A visitor can browse the towel store website, view product listings organized by categories, and see product details including images, prices, descriptions, and available variants. The website displays products in an attractive, modern layout with smooth animations.

**Independent Test**: Navigate to homepage, view product categories, click on products, verify product information displays correctly. Works independently without cart or checkout functionality.

### Implementation for User Story 1

- [x] T025 [P] [US1] Create HomePage component: Implement src/pages/HomePage.jsx with category sections and featured products
- [x] T026 [P] [US1] Create ProductListPage component: Implement src/pages/ProductListPage.jsx for category/product listing view
- [x] T027 [P] [US1] Create ProductCard component: Implement src/components/product/ProductCard.jsx to display product in listings
- [x] T028 [P] [US1] Create ProductImage component: Implement src/components/product/ProductImage.jsx with lazy loading and WebP support
- [x] T029 [US1] Create useProducts hook: Implement src/hooks/useProducts.js to fetch and manage product data
- [x] T030 [US1] Update productService: Add getProductsByCategory and getFeaturedProducts methods in src/services/productService.js
- [x] T031 [US1] Add routing for HomePage: Configure route for "/" in src/App.jsx
- [x] T032 [US1] Add routing for ProductListPage: Configure route for "/products" and "/category/:categoryId" in src/App.jsx
- [x] T033 [US1] Add animations to ProductCard: Use Framer Motion for hover effects and loading animations in src/components/product/ProductCard.jsx
- [x] T034 [US1] Implement responsive grid layout: Add Tailwind CSS grid classes for mobile/tablet/desktop in ProductListPage
- [x] T035 [US1] Add category navigation: Update Header component to include category links in src/components/layout/Header.jsx
- [x] T036 [US1] Style HomePage with Tailwind: Apply modern styling with animations to homepage sections

**Checkpoint**: At this point, User Story 1 should be fully functional - users can browse products by category and view product listings independently

---

## Phase 4: User Story 2 - Add to Cart and Checkout (Priority: P2)

**Goal**: A customer can add products to their shopping cart, review cart contents, modify quantities, remove items, and proceed to checkout. The cart persists across page navigation and displays item count in the header.

**Independent Test**: Add products to cart, view cart contents, update quantities, remove items, verify cart persists. Works as shopping list even without payment processing.

### Implementation for User Story 2

- [ ] T037 [P] [US2] Create VariantSelector component: Implement src/components/product/VariantSelector.jsx for size/color selection
- [ ] T038 [P] [US2] Create CartItem component: Implement src/components/cart/CartItem.jsx to display cart item with quantity controls
- [ ] T039 [P] [US2] Create CartSummary component: Implement src/components/cart/CartSummary.jsx to show cart totals
- [ ] T040 [P] [US2] Create CartIcon component: Implement src/components/cart/CartIcon.jsx with item count badge
- [ ] T041 [US2] Create CartPage component: Implement src/pages/CartPage.jsx to display full cart view
- [ ] T042 [US2] Update cartStore: Add addItem, removeItem, updateQuantity, clearCart methods in src/store/cartStore.js
- [ ] T043 [US2] Create useCart hook: Implement src/hooks/useCart.js to interact with cart store
- [ ] T044 [US2] Update Header: Integrate CartIcon component with cart count in src/components/layout/Header.jsx
- [ ] T045 [US2] Add "Add to Cart" functionality: Update ProductCard to handle variant selection and add to cart in src/components/product/ProductCard.jsx
- [ ] T046 [US2] Add routing for CartPage: Configure route for "/cart" in src/App.jsx
- [ ] T047 [US2] Implement cart persistence: Ensure cartStore persists to localStorage using Zustand persist middleware
- [ ] T048 [US2] Add cart animations: Use Framer Motion for cart item add/remove animations in CartItem component
- [ ] T049 [US2] Implement quantity validation: Add validation to prevent adding more than available inventory in cartStore
- [ ] T050 [US2] Create CheckoutPage placeholder: Implement src/pages/CheckoutPage.jsx with order summary (payment in US3)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can browse products and manage cart

---

## Phase 5: User Story 3 - Complete Purchase with Payment (Priority: P3)

**Goal**: A customer can complete their purchase by entering shipping information, selecting a payment method, and processing payment securely. The system processes payment through a secure payment gateway and confirms the order.

**Independent Test**: Fill checkout form, select payment method, enter test payment credentials, verify order confirmation. Enables actual transactions.

### Implementation for User Story 3

- [ ] T051 [P] [US3] Create CheckoutForm component: Implement src/components/checkout/CheckoutForm.jsx with shipping address fields
- [ ] T052 [P] [US3] Create PaymentForm component: Implement src/components/checkout/PaymentForm.jsx with Stripe.js integration
- [ ] T053 [P] [US3] Create OrderSummary component: Implement src/components/checkout/OrderSummary.jsx to display order details
- [ ] T054 [US3] Create payment service: Implement src/services/paymentService.js for Stripe payment processing
- [ ] T055 [US3] Create usePayment hook: Implement src/hooks/usePayment.js to handle payment flow
- [ ] T056 [US3] Update CheckoutPage: Integrate CheckoutForm, PaymentForm, and OrderSummary in src/pages/CheckoutPage.jsx
- [ ] T057 [US3] Add form validation: Use React Hook Form with validation rules for shipping form in CheckoutForm
- [ ] T058 [US3] Integrate Stripe.js: Setup Stripe Elements in PaymentForm component with secure card input
- [ ] T059 [US3] Implement payment processing: Add createPaymentIntent and confirmPayment methods in paymentService
- [ ] T060 [US3] Create OrderConfirmationPage: Implement src/pages/OrderConfirmationPage.jsx to display order confirmation
- [ ] T061 [US3] Add routing for CheckoutPage: Configure route for "/checkout" in src/App.jsx
- [ ] T062 [US3] Add routing for OrderConfirmationPage: Configure route for "/order-confirmation/:orderId" in src/App.jsx
- [ ] T063 [US3] Implement error handling: Add error messages and retry logic for payment failures in PaymentForm
- [ ] T064 [US3] Preserve cart on payment failure: Ensure cart contents remain if payment fails in CheckoutPage
- [ ] T065 [US3] Clear cart on success: Clear cart after successful payment confirmation in OrderConfirmationPage

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work - complete purchase flow is functional

---

## Phase 6: User Story 4 - Search and Filter Products (Priority: P4)

**Goal**: A visitor can search for products by name or keywords and filter products by category, price range, size, color, or other attributes. Search results update dynamically as filters are applied.

**Independent Test**: Enter search terms, apply filters, verify results update correctly. Makes product discovery efficient.

### Implementation for User Story 4

- [ ] T066 [P] [US4] Create SearchBar component: Implement src/components/common/SearchBar.jsx with search input
- [ ] T067 [P] [US4] Create FilterPanel component: Implement src/components/common/FilterPanel.jsx with category, price, size, color filters
- [ ] T068 [US4] Update productService: Add searchProducts and filterProducts methods in src/services/productService.js
- [ ] T069 [US4] Create useSearch hook: Implement src/hooks/useSearch.js to manage search state and debounce search input
- [ ] T070 [US4] Create useFilters hook: Implement src/hooks/useFilters.js to manage filter state
- [ ] T071 [US4] Update ProductListPage: Integrate SearchBar and FilterPanel with dynamic product filtering in src/pages/ProductListPage.jsx
- [ ] T072 [US4] Add search highlighting: Highlight matching terms in product names in ProductCard component
- [ ] T073 [US4] Implement filter persistence: Store active filters in URL query parameters for shareable links
- [ ] T074 [US4] Add empty state: Display helpful message when no products match search/filter criteria in ProductListPage
- [ ] T075 [US4] Add filter animations: Use Framer Motion for smooth filter transitions in FilterPanel
- [ ] T076 [US4] Update Header: Add SearchBar to Header component in src/components/layout/Header.jsx

**Checkpoint**: At this point, User Stories 1-4 should all work - users can browse, cart, checkout, and search/filter products

---

## Phase 7: User Story 5 - View Product Details and Variants (Priority: P5)

**Goal**: A visitor can view detailed product information including multiple images, full description, specifications (size, fabric, care instructions), available variants (sizes, colors), pricing, and related products.

**Independent Test**: Navigate to product pages, view all product details, select different variants, verify information accuracy. Provides complete product information.

### Implementation for User Story 5

- [ ] T077 [P] [US5] Create ProductDetailPage component: Implement src/pages/ProductDetailPage.jsx with full product details
- [ ] T078 [P] [US5] Create ProductImageGallery component: Implement src/components/product/ProductImageGallery.jsx with image zoom/lightbox
- [ ] T079 [P] [US5] Create ProductSpecs component: Implement src/components/product/ProductSpecs.jsx to display specifications
- [ ] T080 [US5] Update VariantSelector: Enhance for product detail page with price updates in src/components/product/VariantSelector.jsx
- [ ] T081 [US5] Create RelatedProducts component: Implement src/components/product/RelatedProducts.jsx to show related products
- [ ] T082 [US5] Update productService: Add getProductById, getProductBySlug, and getRelatedProducts methods in src/services/productService.js
- [ ] T083 [US5] Add routing for ProductDetailPage: Configure route for "/products/:id" and "/products/:slug" in src/App.jsx
- [ ] T084 [US5] Implement image gallery animations: Use Framer Motion for smooth image transitions in ProductImageGallery
- [ ] T085 [US5] Add variant price calculation: Display updated price when variant is selected in ProductDetailPage
- [ ] T086 [US5] Integrate RelatedProducts: Display related products at bottom of ProductDetailPage
- [ ] T087 [US5] Add breadcrumb navigation: Show category path in ProductDetailPage header
- [ ] T088 [US5] Update ProductCard: Add link to product detail page in src/components/product/ProductCard.jsx

**Checkpoint**: All user stories should now be independently functional - complete e-commerce experience

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T089 [P] Add loading states: Implement loading skeletons for products, cart, and checkout across all pages
- [ ] T090 [P] Add error boundaries: Create ErrorBoundary component for graceful error handling in src/components/common/ErrorBoundary.jsx
- [ ] T091 [P] Optimize images: Convert all product images to WebP format and add responsive srcset attributes
- [ ] T092 [P] Implement code splitting: Add route-based code splitting for all pages in src/App.jsx
- [ ] T093 Add SEO meta tags: Implement meta tags for each page using react-helmet or similar
- [ ] T094 [P] Add accessibility features: Ensure ARIA labels, keyboard navigation, and screen reader support
- [ ] T095 [P] Performance optimization: Implement lazy loading for images, code splitting, and bundle size optimization
- [ ] T096 Add analytics tracking: Integrate analytics for page views and user interactions (optional)
- [ ] T097 [P] Mobile optimization: Test and optimize for mobile devices (320px+), tablet (768px+), desktop (1024px+)
- [ ] T098 Add 404 page: Create NotFoundPage component for invalid routes in src/pages/NotFoundPage.jsx
- [ ] T099 [P] Documentation: Update README.md with setup instructions, deployment guide, and project structure
- [ ] T100 Run quickstart.md validation: Verify all setup steps from quickstart.md work correctly
- [ ] T101 Lighthouse audit: Run Lighthouse and optimize to achieve 90+ scores on all metrics
- [ ] T102 Final testing: Test complete user flows (browse → cart → checkout → payment → confirmation)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for product display, but cart can be built independently
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US2 for cart, but payment can be built independently
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Can work independently, enhances US1
- **User Story 5 (P5)**: Can start after Foundational (Phase 2) - Enhances US1, can work independently

### Within Each User Story

- Components before pages (components are reusable)
- Services/hooks before components that use them
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories can start in parallel (if team capacity allows)
- Components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create HomePage component: Implement src/pages/HomePage.jsx"
Task: "Create ProductListPage component: Implement src/pages/ProductListPage.jsx"
Task: "Create ProductCard component: Implement src/components/product/ProductCard.jsx"
Task: "Create ProductImage component: Implement src/components/product/ProductImage.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Browse and View Products)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Cart functionality)
4. Add User Story 3 → Test independently → Deploy/Demo (Payment enabled)
5. Add User Story 4 → Test independently → Deploy/Demo (Search enabled)
6. Add User Story 5 → Test independently → Deploy/Demo (Full product details)
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Browse Products)
   - Developer B: User Story 2 (Cart) - can start in parallel
   - Developer C: User Story 4 (Search) - can start in parallel
3. After US1/US2 complete:
   - Developer A: User Story 3 (Payment)
   - Developer B: User Story 5 (Product Details)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Total tasks: 102 tasks across 8 phases
- MVP scope: Phases 1-3 (Setup + Foundational + US1) = ~36 tasks

