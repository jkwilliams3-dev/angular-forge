# AngularForge — Enterprise Admin Portal

Build a **production-quality Angular 17+ enterprise admin portal** with a C#/.NET Core-style backend API mock. This showcases enterprise Angular + .NET expertise for a senior developer targeting $90-140/hr contracts.

## Tech Stack
- **Frontend**: Angular 17+ (standalone components)
- **Styling**: Tailwind CSS (not Angular Material — shows versatility)
- **State**: NgRx Signals or simple service-based state
- **Backend Mock**: JSON Server or in-memory mock service
- **Build**: Angular CLI

## What to Build

### 1. Authentication
- Login page with email/password form
- JWT-style auth flow (mock — store token in localStorage)
- Auth guard on protected routes
- Role-based access (Admin / Manager / Viewer)
- Logout + session timeout warning

### 2. Dashboard Page
- Welcome banner with user role badge
- 4 KPI cards: Users (2,847), Revenue ($89.4K), Active Projects (142), System Health (99.7%)
- Activity feed with timestamps and avatars
- Quick actions panel

### 3. User Management Page (RBAC Demo)
- Data table with 50+ mock users
- Columns: Name, Email, Role, Status (Active/Inactive/Pending), Last Login, Actions
- Features:
  - **Server-side** pagination (mock it — the pattern matters)
  - Column sorting (click headers)
  - Search/filter bar
  - Role-based action visibility (Admin sees delete, Manager sees edit only, Viewer sees nothing)
  - Bulk actions (select multiple, change role, deactivate)
  - Create/Edit user modal with reactive forms + validation
  - Inline status toggle
  - Export to CSV button

### 4. Audit Log Page
- Timestamped log entries showing: who did what, when, where
- Filter by: user, action type, date range
- Export capability
- This demonstrates compliance/security awareness — enterprise clients LOVE this

### 5. Settings Page
- Organization settings (company name, logo placeholder, timezone)
- Security settings (password policy, MFA toggle, session timeout)
- Integration settings (webhook URLs, API keys)
- Notification preferences

### 6. 508 Compliance (Non-Negotiable)
- ARIA labels on every interactive element
- Keyboard navigation through all features
- Skip-to-content link
- Focus management on modals
- Color contrast 4.5:1+ throughout
- Screen reader announcements for dynamic content
- `role` attributes on data tables

## File Structure
```
src/
  app/
    core/
      guards/
        auth.guard.ts
        role.guard.ts
      interceptors/
        auth.interceptor.ts
      services/
        auth.service.ts
        user.service.ts
        audit.service.ts
      models/
        user.model.ts
        audit.model.ts
    features/
      auth/
        login/
        login.component.ts
      dashboard/
        dashboard.component.ts
      users/
        user-list/
        user-form/
        users.component.ts
      audit/
        audit-log.component.ts
      settings/
        settings.component.ts
    shared/
      components/
        data-table/
        modal/
        kpi-card/
        status-badge/
      pipes/
        relative-time.pipe.ts
      directives/
        role-visible.directive.ts
    app.component.ts
    app.routes.ts
```

## Design Requirements
- Dark enterprise theme (slate/gray, blue accents)
- Professional typography
- Smooth page transitions
- Loading states (skeleton screens)
- Toast notifications for actions
- Breadcrumb navigation
- Responsive (sidebar collapses on mobile)

## Mock Data
- Generate 50+ realistic user records
- 100+ audit log entries
- Use realistic names, emails, timestamps
- No "Lorem ipsum" or "John Doe" — use diverse, realistic names

## After Building
1. `ng new angular-forge --standalone --routing --style=css` (or init manually)
2. Add Tailwind: `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init`
3. `ng build` — fix all errors
4. Commit: `git add -A && git commit -m "feat: AngularForge enterprise admin with RBAC and audit logging"`
5. README.md with:
   - Project description
   - Features list highlighting RBAC, audit logging, 508 compliance
   - Tech stack
   - Getting started
   - Architecture overview
   - "Built by Jonathan Williams" footer
