# 🔐 Auth Setup Plan

## 🧠 Auth Requirements Summary
- Each **User**:
  - Can **create and own** one Organization
  - Can **join multiple** Organizations as a **Member**
- Each **Organization**:
  - Has exactly **one Owner** (User)
  - Can have multiple **Members** (Users)
- Access control:
  - Only Owners can manage org-level settings
  - Members have limited permissions (customizable later)

---

## ✅ Step 1: Define Models (DB Schema)

### User
- id
- name
- email (unique)
- password_hash
- etc.

### Organization
- id
- name
- owner_id (FK → User.id, unique)

### OrganizationMember
- id
- user_id (FK → User.id)
- organization_id (FK → Organization.id)
- role (e.g. 'member', 'admin', 'viewer', etc. for future-proofing)

> ✅ Constraints:
> - `Organization.owner_id` must reference a User who is not already an owner of another org (enforce in logic)
> - A user can have many OrganizationMember entries

---

## ✅ Step 2: Auth System Setup

- [ ] Set up authentication system (e.g., JWT, sessions)
- [ ] Register endpoint (create user + org at once)
- [ ] Login endpoint
- [ ] Logout endpoint
- [ ] Protect routes with middleware

---

## ✅ Step 3: Organization Ownership Logic

- [ ] On signup, create:
  - User
  - Organization
  - OrganizationMember entry (user joins their own org)
- [ ] Prevent creating more than one org per user
- [ ] Create endpoints:
  - `GET /organizations` → List orgs user is part of
  - `GET /organizations/:id` → Org details if user is member

---

## ✅ Step 4: Join/Leave Org Features

- [ ] Endpoint to join org (e.g. with invite code or admin invite)
- [ ] Endpoint to leave org (unless owner)
- [ ] Prevent leaving own org if owner

---

## ✅ Step 5: Access Control & Middleware

- [ ] Middleware to:
  - Check user is authenticated
  - Check user is member of org on org-specific routes
  - Check if user is owner on owner-only routes

---

## 🧪 Step 6: Testing

- [ ] Unit test models
- [ ] Auth flow test: register, login, join org, etc.
- [ ] Access tests: only org members can access org data

---

## 🛠️ Optional Enhancements

- [ ] Invite system (email/token-based)
- [ ] Organization roles/permissions
- [ ] Org switching in UI
- [ ] Org-specific settings

