# Hagz — Court Booking Admin Dashboard

Hagz (حجز, "booking") is the admin panel for a football-court booking platform. Admins use it to review courts that owners submit, manage the courts and players already on the platform, look at a court's bookings and invoices, and add other admins.

It's a front-end project built with React, TypeScript and Vite. There is no real backend yet: all data comes from a local mock API (`json-server` reading `db.json`).

> Status: UI prototype. Most screens are built and read from the mock API, but authentication, the Settings/Add Admin forms and parts of Court Details are still front-end only. See [What's done and what's missing](#whats-done-and-whats-missing).

---

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Routes and screens](#routes-and-screens)
- [Mock API (db.json)](#mock-api-dbjson)
- [Shared pieces](#shared-pieces)
- [What's done and what's missing](#whats-done-and-whats-missing)
- [Known issues](#known-issues)

---

## Tech stack

| Area | Library |
|---|---|
| Framework | React 18 + TypeScript 5.6 |
| Build tool | Vite 6 |
| Routing | React Router 7 (`createBrowserRouter`) |
| Forms | React Hook Form 7 |
| HTTP | Axios |
| UI | Bootstrap 5, React Bootstrap (modals), react-pro-sidebar |
| Icons | react-icons, Font Awesome |
| Calendar | Schedule-X (week / month / day / agenda views, drag & drop) |
| Carousel | react-slick |
| Notifications | react-hot-toast |
| Mock API | json-server |

## Getting started

You need Node.js 18 or newer.

```bash
npm install

# terminal 1 – mock API on http://localhost:3000
npm run serve-json

# terminal 2 – the app on http://localhost:5173
npm run dev
```

The app expects the mock API on port 3000. The base URL is set in `src/services.ts`, though several components still call `http://localhost:3000` directly.

To log in, register a new account from the Register page, or use one of the users already in `db.json` (collection `user`).

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run serve-json` | Start json-server on `db.json` |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |

> `npm run build` currently fails because of TypeScript errors (see [Known issues](#known-issues)). `npm run dev` works because Vite doesn't type-check.

## Project structure

```
src/
├── App.tsx                 # Router: auth routes + dashboard routes
├── main.tsx                # Entry point, imports Bootstrap/Font Awesome/CSS
├── services.ts             # Axios instance (baseURL = http://localhost:3000)
├── Context/
│   └── SearchContext.tsx   # Shared search, sort and pagination state
├── hooks/
│   └── useToggle.ts        # Boolean toggle (used for show/hide password)
├── interfaces/
│   └── interfaces.ts       # TypeScript types for forms and API data
├── validations/
│   └── validation.ts       # Email and password rules for React Hook Form
├── modules/                # One folder per screen
│   ├── AuthComponents/     # Login, Register, ForgetPassword, ResetPassword
│   ├── Dashboard/
│   ├── PendingRequest/
│   ├── CourtList/
│   ├── CourtDetails/
│   ├── CourtSlider/        # "Newly added courts" carousel on the dashboard
│   ├── UsersList/
│   ├── Settings/
│   ├── AddAdmins/
│   ├── AddAdminForm/
│   └── Pagination/
├── shareComponents/        # Layouts and reusable UI
│   ├── AuthLayout/         # Wrapper for the auth screens
│   ├── MasterLayout/       # Sidebar + navbar + <Outlet/>
│   ├── sidebar/            # Collapsible side menu
│   ├── Navbar/             # Top bar: search box, user menu, logout
│   ├── Header/             # Page banner (title + image)
│   ├── SearchInput/        # Table search box + filter dropdown
│   ├── ViewModal/          # Court details popup
│   ├── viewTopUser/        # Player details popup
│   ├── DeleteConfirm/      # Delete confirmation popup
│   └── NoData/             # Empty state
├── assets/images/
├── index.css / App.css / media.css   # Global styles and breakpoints
└── svgAssests.tsx          # Inline SVGs
```

## Routes and screens

### Auth (inside `AuthLayout`)

| Path | Screen | What it does today |
|---|---|---|
| `/` | Login | Fetches every user from `/user` and compares email and password in the browser. On a match it shows a toast and goes to `/dashboard`. |
| `/register` | Register | Username, email, country, Egyptian phone number (`01[0125]xxxxxxxx`), password, confirm password. Posts to `/user` and saves `userName` in `localStorage`. |
| `/forget-password` | Forgot password | Email form. Only logs the data to the console. |
| `/reset-password` | Reset password | Email, OTP, new password, confirm. Only logs the data to the console. |

### Dashboard (inside `MasterLayout`)

| Path | Screen | What it does today |
|---|---|---|
| `/dashboard` | Dashboard | Stat cards (`/userInfo`), newly added courts carousel (`/newCourts`), top users table (`/topUsers`), pending requests list (`/pendingTableInfo`). "View" buttons open popups. "Total Deactivated" is hard-coded to 200. |
| `/pending-request` | Pending requests | Table of courts waiting for approval. Sort by any column, search with highlighted matches, filter, 5 rows per page, view details, delete. |
| `/court-list` | Manage courts | Same table pattern for `/courtList`, plus an activate/deactivate toggle (PATCH `status`) and a link to the court's details. |
| `/court-details/:id` | Court details | Tabs: Schedule (Schedule-X calendar with sample events), court info form (PATCH to `/courtList/:id`), history table (`/courtHistory`), invoices table, earnings cards. |
| `/users-list` | Users | Players from `/topUsers`: search, sort, paginate, view, delete. |
| `/settings` | Settings | Profile tab (photo upload preview + fields) and Password tab. The save buttons only show a toast. |
| `/add-admins` | Admins | Admins from `/Add_Admins`: search, sort, paginate, view, delete. Button to add a new admin. |
| `/add-admins-form` | Add admin | Profile, Access and Password tabs. The save buttons only show a toast. |

### How the tables work

Pending Requests, Court List, Users, Admins and Court Details all follow the same pattern:

- **Sort**: the up/down arrows in each header call json-server with `?_sort=field` or `?_sort=-field` (descending).
- **Filter**: the dropdown in `SearchInput` adds a query such as `status=Pending`. A "discard filter" button clears it.
- **Search**: filters the current page in the browser by court name, owner, status, description or price. `getHighlightedText` wraps matches in a yellow `<span>`.
- **Pagination**: done in the browser, 5 rows per page, with the `Pagination` component.
- **Delete**: opens `DeleteConfirm`, then sends `DELETE /<collection>/:id`.

Pending Requests and Court Details read this state from `SearchContext`. Court List, Users and Admins keep their own copy of the same state inside the component.

## Mock API (db.json)

json-server turns every top-level key in `db.json` into a REST endpoint on `http://localhost:3000`.

| Endpoint | Used by | Fields |
|---|---|---|
| `/user` | Login, Register | `id, userName, email, country, phoneNumber, password, confirmPassword` |
| `/userInfo` | Dashboard stat cards | `id, title, number, icon` |
| `/newCourts` | Court carousel | `id, title, image` |
| `/topUsers` | Dashboard, Users | `id, rank, image, name, idNumber, playedMatches, cancelledMatches, upComing` |
| `/pendingRequests` | Not used | `id, rank, image, title` |
| `/pendingTableInfo` | Dashboard, Pending Requests | `id, courtName, image, Price, Description, ownerName, category, status, idNumber` |
| `/courtList` | Court List, Court Details | Same as above plus `registrationNumber, location, data` |
| `/courtHistory` | Court Details | `id, userName, idNumber, amountPaid, date, playedTimes, appProfit, image, invoices, status` |
| `/Add_Admins` | Admins | `id, userName, idNumber, image, phoneNumber, role` |

Court Details also asks for `/invoices`, which isn't in `db.json`, so that table stays empty.

## Shared pieces

- **`MasterLayout`**: sidebar on the left, navbar on top, page content in `<Outlet/>`.
- **`Sidebar`**: links to Dashboard, Pending Requests, Manage Courts, Users, Settings and Add admins. Clicking the logo collapses it.
- **`Navbar`**: search input (not wired up yet), user dropdown showing `localStorage.userName`, and a Logout link back to `/`.
- **`Header`**: page banner. Takes `title`, `img` and an `svg` decoration.
- **`SearchContext`**: holds the pending-requests list, search keyword, current page, rows per page (5), current filter and the highlight helper.
- **`useToggle`**: `const [isVisible, toggleVisible] = useToggle(false)`, used for show/hide password buttons.
- **`validation.ts`**: `emailValidation` and `PasswordValidation` (6+ chars, upper and lower case, number, special character). The password rule exists but no form uses it yet.

## What's done and what's missing

**Done**

- Login, register, forgot-password and reset-password screens with validation
- Main layout with collapsible sidebar and navbar
- Dashboard with stats, carousel, top users and pending requests
- Tables with sort, filter, search with highlighting, pagination and delete
- Court activate/deactivate and court info editing
- Court schedule calendar (sample data)
- Settings and Add Admin screens (UI only)
- Accessibility labels for screen readers on icon buttons and sidebar links

**Missing**

- Real authentication: login is checked in the browser against plaintext passwords, there's no token, no protected routes, and logout doesn't clear anything
- Forgot / reset password don't send anything
- Approve and reject buttons on pending requests do nothing
- Settings and Add Admin forms don't save
- The court calendar uses hard-coded events, not real bookings
- Earnings cards and the "Total Deactivated" number are hard-coded
- The navbar search box does nothing
- The `/invoices` endpoint doesn't exist
- The production build fails because of type errors
- No tests

These are tracked as GitHub issues.

## Known issues

- **`npm run build` fails**: `tsc -b` reports 15 errors. Examples: `createContext()` is called without a default value, `SearchContext` calls a `sortedItem` function that doesn't exist, `topUser` requires fields that the popups never pass, and `CourtList` compares a `string` status with `true`.
- **`status` has two types**: it's a string in `db.json` ("Pending", "Active"), but `toggleActivate` saves `!status`, which turns it into a boolean.
- **Real-looking data in a public repo**: `db.json` has emails, phone numbers and plaintext passwords. Replace them with fake data.
- **Build cache in git**: the `.vite/` folder is committed. It should be in `.gitignore`.
- **API URL is repeated**: some components use `axiosInstance` and others hard-code `http://localhost:3000`. It should come from one place, ideally an environment variable (`VITE_API_URL`).
- **Image paths**: images in `db.json` point to `./src//assets/...`, which only works in dev mode.
