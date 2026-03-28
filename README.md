# Take Action TODO

A full-stack CRUD Todo application built with **Next.js**, **Prisma**, **MongoDB Atlas**, **Zustand**, and **Tailwind CSS**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (Pages Router) |
| UI | React 19, Tailwind CSS 4 |
| State | Zustand |
| ORM | Prisma |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast (custom wave cards) |

## Features

- **Full CRUD** — Create, read, update, and delete todos
- **Inline Editing** — Edit todo titles directly with Enter/Escape keyboard support
- **Completion Toggle** — Mark todos as completed or reopen them
- **Dark / Light Mode** — Toggle between themes with consistent accent color
- **Progress Tracker** — Gradient-border card showing completed/total count
- **Custom Toasts** — 4 types (success, warn, error, info) with wave-card design
- **Scroll to Top** — Fixed button appears on scroll
- **Responsive** — Works on desktop and mobile
- **Long Text Handling** — Overflowing todo titles word-break automatically

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Logo + dark/light toggle
│   ├── ProgressCard.js    # Completed task counter card
│   ├── TodoForm.js        # New todo input + add button
│   ├── TodoItem.js        # Single todo row (checkbox, edit, delete)
│   ├── TodoList.js        # Todo list container
│   ├── ScrollToTop.js     # Scroll-to-top button
│   └── Footer.js          # Copyright footer
├── lib/
│   ├── prisma.js          # Prisma singleton client
│   └── toast.js           # Custom toast notification system
├── pages/
│   ├── index.js           # Main page
│   ├── _app.js            # App wrapper (Toaster provider)
│   ├── _document.js       # HTML skeleton (favicon, fonts)
│   └── api/todos/
│       ├── index.js       # GET (list) + POST (create)
│       └── [id].js        # PUT (update) + DELETE
├── services/
│   └── todoService.js     # Fetch abstraction layer
├── store/
│   └── useTodoStore.js    # Zustand global state
└── styles/
    └── globals.css        # Tailwind, tooltips, scrollbar, glass effects
```

## API Endpoints

| Method | Endpoint | Description | Body |
|---|---|---|---|
| GET | /api/todos | List all todos | — |
| POST | /api/todos | Create a todo | `{ "title": "string" }` |
| PUT | /api/todos/[id] | Update a todo | `{ "title": "string", "completed": bool }` |
| DELETE | /api/todos/[id] | Delete a todo | — |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/take-action-todo.git
cd take-action-todo

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory:
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>"

# Generate Prisma client
npx prisma generate

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

This project is for demonstration purposes.
