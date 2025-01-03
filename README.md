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

- 🌍 Localization
  
  - Supported Languages:
    - English: en
    - Canadian French: fr-ca
    - Portuguese-Brazil: pt-br
    - Simplified Chinese: zn
      
- 🤖 AI Agent

  - Users can interact with the AI Agent in any language. The Agent assists with managing tasks and categories, providing an intuitive and efficient experience.

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
│   ├── calendar/        # Calendar
│   ├── categories/      # Categories management
│   ├── dashboard/       # Dashboard with supervising charts
│   ├── login/           # Login
│   ├── settings/        # User settings
│   └── tasks/           # Tasks Management
├── hooks/             # Custom React hooks
├── lib/               # Core utilities
│   ├── api/             # API client
│   ├── constants/       # App constants
│   ├── queries/         # API queries
│   └── utils/           # Utility functions
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
   yarn install

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
   yarn dev

   # Start backend (from server directory)
   bun run dev
   ```

5. Open <http://localhost:3000> in your browser

## Available Scripts

In the client directory:

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run tests
- `yarn lint` - Lint the codebase
- `yarn lint:fix` - Lint and fix lint errors
- `yarn coverage` - Run tests with coverage report
- `yarn clean` - Delete dist, node_modules, nuke the project

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
