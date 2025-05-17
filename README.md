# 🧠 Miro Clone

A collaborative whiteboard web application inspired by [Miro](https://miro.com/). Built with modern tools like **Next.js**, **Liveblocks**, **Convex**, **Tailwind CSS**, and **Clerk** for real-time collaboration, persistence, and authentication.

---

## ✨ Features

- 🔐 **Authentication** with [Clerk](https://clerk.dev/)
- 🧑‍🤝‍🧑 **Real-time collaboration** using [Liveblocks](https://liveblocks.io/)
- 📝 **Persistent storage & backend logic** powered by [Convex](https://convex.dev/)
- ✏️ **Freehand drawing** with `perfect-freehand`
- 🧰 Rich **toolbar**, **layers**, and **selection tools**
- 📦 **State management** with `zustand`
- 🎨 **UI components** using [Radix UI](https://www.radix-ui.com/) and `lucide-react`
- ⚡ Built with **Next.js 15** and **React 19**

---

## 🛠️ Tech Stack

| Purpose                  | Technology                                                                 |
|--------------------------|----------------------------------------------------------------------------|
| Framework                | [Next.js 15](https://nextjs.org/)                                         |
| Language                 | TypeScript                                                                |
| Styling                  | [Tailwind CSS](https://tailwindcss.com/), `tailwindcss-animate`           |
| Real-time sync           | [Liveblocks](https://liveblocks.io/)                                      |
| Backend & storage        | [Convex](https://convex.dev/)                                             |
| Authentication           | [Clerk](https://clerk.dev/)                                               |
| UI Components            | [Radix UI](https://www.radix-ui.com/), `lucide-react`                     |
| Drawing engine           | [`perfect-freehand`](https://github.com/steveruizok/perfect-freehand)     |
| State Management         | [`zustand`](https://github.com/pmndrs/zustand)                            |
| Testing                  | Jest, React Testing Library                                               |

---

## Install dependencies
```bash
npm install
```

---

## Configure environment
Create a .env.local file and add your Clerk & Convex credentials.

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT_URL=your_convex_url

---

## 📁 Project Structure

```text
├── app/ # Next.js App Router
│ ├── (dashboard)/ # Authenticated routes
│ │ └── _components/ # Dashboard-specific components
│ ├── api/ # API routes
│ │ └── liveblocks-auth/ # Auth endpoint for Liveblocks
│ └── boards/ # Board routes
│ └── [boardId]/ # Dynamic board pages
│    ├── _components/ # Board-level UI components
│    └── _hooks/ # Board-specific hooks
├── components/ # Shared UI components
│ ├── auth/ # Loading auth components
│ ├── modals/ # Modal dialogs (e.g. for deletion)
│ └── ui/ # Custom UI primitives (Buttons, Inputs)
├── hooks/ # Reusable custom hooks
├── lib/ # Utility functions
├── store/ # Zustand stores
├── types/ # Shared TypeScript types
├── convex/ # Convex backend logic (functions, schema)
├── providers/ # Context providers (e.g. ConvexClient)
└── public/ # Static assets

```
---

## 🚀 Getting Started

```bash
npm run dev
```

### 1. Clone the repository

```bash
git clone https://github.com/your-username/miro-clone.git
cd miro-clone
