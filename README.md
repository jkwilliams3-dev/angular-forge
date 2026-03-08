# AngularForge — Enterprise Admin Portal

**🚀 Live Demo:** https://angular-forge.vercel.app  
**📁 GitHub:** https://github.com/jkwilliams3-dev/angular-forge

> Production-quality enterprise admin portal demonstrating Angular 17+ standalone components, role-based access control, audit logging, and full 508 compliance. Built for the enterprise developer portfolio.

---

## Features

- **🔐 Auth & RBAC** — JWT-style login with role guards (Admin / Manager / Viewer). Role controls what actions are visible per user.
- **👥 User Management** — Full CRUD table with 50+ mock users, server-side pagination pattern, bulk actions, inline status toggles, reactive forms with validation
- **📋 Audit Log** — Timestamped log of every action with filter by user, action type, and date range — demonstrates compliance/security awareness
- **📊 Dashboard** — KPI cards, activity feed, quick actions panel with role-aware content
- **⚙️ Settings** — Organization config, security policies (MFA, session timeout), API integrations, notification preferences
- **♿ 508 / WCAG 2.1 AA** — ARIA labels, keyboard navigation, skip links, focus management, 4.5:1+ contrast throughout
- **📱 Fully Responsive** — Collapsible sidebar, mobile-optimized layouts

---

## Tech Stack

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## Getting Started

```bash
git clone https://github.com/jkwilliams3-dev/angular-forge.git
cd angular-forge
npm install
ng serve
```

Open http://localhost:4200

**Demo credentials:**
- Admin: `admin@acme.com` / `password`
- Manager: `manager@acme.com` / `password`
- Viewer: `viewer@acme.com` / `password`

---

## Architecture

```
src/app/
├── core/
│   ├── guards/        # AuthGuard, RoleGuard
│   ├── interceptors/  # AuthInterceptor (JWT injection)
│   ├── models/        # User, AuditLog, Role types
│   └── services/      # AuthService, UserService, AuditService
├── features/
│   ├── auth/          # Login component
│   ├── dashboard/     # Dashboard component
│   ├── users/         # UserList, UserForm components
│   ├── audit/         # AuditLog component
│   └── settings/      # Settings component
└── shared/
    ├── components/    # DataTable, Modal, KPICard, StatusBadge
    ├── directives/    # RoleVisible directive
    └── pipes/         # RelativeTime pipe
```

---

## Built by

**Jonathan Williams** — Senior Full-Stack Developer  
[LinkedIn](https://linkedin.com/in/jkwilliams3) · [GitHub](https://github.com/jkwilliams3-dev)
