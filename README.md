# TaskHawk

TaskHawk is a cutting-edge task management application built with React and TypeScript, offering a sleek and user-friendly interface designed to simplify task organization, track deadlines, and boost productivity.

## Features

- 📋 Task Management

  - Create, edit, and delete tasks
  - Assign priorities and due dates
  - Track task status
  - Categorize tasks

- 📁 Category Organization

  - Create custom categories
  - Organize tasks by category
  - Visual category cards with task counts

- 📊 Dashboard Analytics

  - Task status overview
  - Tasks per priority distribution
  - Upcoming deadlines
  - Task completion timeline

- 📅 Calendar View

  - Visual task timeline
  - Monthly, weekly, and daily views
  - Task status color coding

- 🌓 Dark Mode Support
  - Automatic theme detection
  - Manual theme toggle
  - Consistent styling across themes

## Tech Stack

- **Frontend**

  - React + TypeScript
  - Vite
  - TailwindCSS
  - PrimeReact UI Components
  - React Query
  - React Router
  - Formik
  - Yup

- **Backend**
  - Hono
  - Bun
  - REST API
  - Zod

## Project Structure

```bash
src/
├── common/            # Shared components
├── context/           # React context providers
├── features/          # Feature-based modules
│   ├── calendar/
│   ├── categories/
│   ├── dashboard/
│   ├── settings/
│   └── tasks/
├── hooks/             # Custom React hooks
├── lib/               # Core utilities
│   ├── api/           # API client
│   ├── constants/     # App constants
│   └── utils/         # Utility functions
└── tests/             # Test files
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/taskhawk-app.git
   cd taskhawk-app
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   bun install
   ```

3. Set up environment variables:

   ```bash
   # In client directory
   cp .env.example .env

   # In server directory
   cp .env.example .env
   ```

4. Start the development servers:

   ```bash
   # Start frontend (from client directory)
   bun run dev

   # Start backend (from server directory)
   bun run dev
   ```

5. Open <http://localhost:3000> in your browser

## Available Scripts

In the client directory:

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run test` - Run tests
- `bun run lint` - Lint the codebase
- `bun run coverage` - Run tests with coverage report

In the server directory:

- `bun run dev` - Start development server
- `bun start` - Start production server
- `bun run build` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
