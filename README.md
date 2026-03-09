# Apache Spark Course Documentation

A comprehensive, interactive web application providing detailed documentation and educational materials about Apache Spark. Built with React, TypeScript, and modern web technologies for an optimal learning experience.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Git Workflow](#git-workflow)
- [Contributing Guidelines](#contributing-guidelines)
- [Technologies Used](#technologies-used)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

This project is an educational resource for learning Apache Spark. It provides structured, easy-to-navigate documentation covering:

- **Fundamentals**: Core concepts and architecture of Apache Spark
- **Spark SQL**: SQL processing engine and DataFrame operations
- **Streaming**: Real-time data processing capabilities
- **MLlib & Performance**: Machine learning library and optimization strategies
- **Projects**: Practical examples and real-world use cases
- **Architecture**: Deep dive into Spark's internal architecture

The application features a responsive sidebar navigation, syntax-highlighted code blocks, and interactive callout components for notes and important information.

## ✨ Features

- 📱 **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional interface built with Tailwind CSS
- 💻 **Code Examples**: Syntax-highlighted code blocks for various programming languages
- 🧭 **Easy Navigation**: Intuitive sidebar navigation for quick access to topics
- ⚡ **Fast Performance**: Optimized single-file output for quick loading
- 📚 **Well-Organized Content**: Structured sections covering all major Spark topics
- 🔍 **Developer-Friendly**: TypeScript for type safety and better developer experience

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: v16.0.0 or higher ([download](https://nodejs.org/))
- **npm**: v7.0.0 or higher (comes with Node.js)
- **Git**: v2.25.0 or higher ([download](https://git-scm.com/))
- **Code Editor**: VS Code or similar (optional but recommended)

### Verify Installation

```bash
node --version
npm --version
git --version
```

All commands should return version numbers without errors.

## 🚀 Installation

### 1. Clone the Repository

```bash
# Clone the repository using HTTPS
git clone https://github.com/aifalabsglobal/learn_spark.git

# Or using SSH (if you have SSH keys configured)
git clone git@github.com:aifalabsglobal/learn_spark.git

# Navigate to the project directory
cd learn_spark
```

### 2. Install Dependencies

```bash
# Install all required npm packages
npm install
```

This will read `package.json` and install all dependencies and devDependencies into the `node_modules` directory.

## 💻 Development

### Start the Development Server

```bash
npm run dev
```

This command:
- Starts the Vite development server
- Serves the application on `http://localhost:5173` (or next available port)
- Enables Hot Module Replacement (HMR) for instant code updates
- Watches for file changes and auto-refreshes the browser

### Development Workflow

1. Open your browser and navigate to `http://localhost:5173`
2. Make changes to files in the `src/` directory
3. See changes reflected immediately thanks to HMR
4. Open browser DevTools (F12) to debug and inspect elements

### Code Style and Quality

#### TypeScript
- All TypeScript files should have proper type annotations
- Avoid using `any` type when possible
- Use strict mode (enabled in `tsconfig.json`)

#### React Components
- Use functional components with hooks
- Keep components focused and reusable
- Use meaningful component names in PascalCase

#### CSS/Styling
- Use Tailwind CSS utility classes for styling
- Avoid inline styles where possible
- Use the `cn()` utility function (from `src/utils/cn.ts`) for conditional class merging

### Editing Content

The main content sections can be found in `src/sections/`:
- `Fundamentals.tsx`: Basic Spark concepts
- `Architecture.tsx`: System architecture overview
- `SparkSQL.tsx`: SQL engine documentation
- `Streaming.tsx`: Streaming documentation
- `MLlibAndPerformance.tsx`: Machine learning and optimization
- `Projects.tsx`: Practical projects and examples

Reusable components are in `src/components/`:
- `Sidebar.tsx`: Navigation sidebar
- `CodeBlock.tsx`: Syntax-highlighted code display
- `Callout.tsx`: Important notes and callouts

## 🔨 Building for Production

### Create Optimized Production Build

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Bundles and minifies code
- Applies Tailwind CSS purging
- Outputs a single optimized `index.html` file (via vite-plugin-singlefile)
- Creates the production-ready build in the `dist/` directory

### Output Structure

After building, you'll have:
- `dist/index.html`: Single self-contained HTML file with all assets embedded
- Ready for deployment to any static hosting service

### Preview the Built Application

```bash
npm run preview
```

This starts a local server previewing the production build to verify everything works correctly.

## 📁 Project Structure

```
apache-spark/
├── src/
│   ├── components/
│   │   ├── Callout.tsx           # Callout component for highlights/notes
│   │   ├── CodeBlock.tsx          # Code snippet display with syntax highlighting
│   │   └── Sidebar.tsx            # Navigation sidebar component
│   ├── sections/
│   │   ├── Architecture.tsx       # Spark architecture documentation
│   │   ├── Fundamentals.tsx       # Core concepts and fundamentals
│   │   ├── MLlibAndPerformance.tsx# ML library and optimization docs
│   │   ├── Projects.tsx           # Practical projects and examples
│   │   ├── SparkSQL.tsx           # Spark SQL documentation
│   │   └── Streaming.tsx          # Streaming documentation
│   ├── utils/
│   │   └── cn.ts                  # Utility for class name merging (clsx wrapper)
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Application entry point
├── .vscode/                       # VS Code settings and extensions
├── index.html                     # HTML entry point
├── package.json                   # Project metadata and dependencies
├── package-lock.json              # Locked dependency versions
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── README.md                      # This file
└── .gitignore                     # Git ignore rules

### Key Directories

- **src/**: All source code
- **src/components/**: Reusable React components
- **src/sections/**: Main content sections
- **dist/**: Build output (generated during build)
- **node_modules/**: Installed dependencies (generated during installation)
```

## 🌿 Git Workflow

This project follows a standard Git workflow. Here are best practices:

### Branching Strategy

We use a simplified Git Flow strategy:

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features
- **`feature/*`**: Feature branches for new features
- **`fix/*`**: Bug fix branches
- **`docs/*`**: Documentation-only changes

### Creating a Feature Branch

```bash
# Update main branch to latest
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Stage your changes
git add .

# Commit with meaningful message
git commit -m "feat: add new Spark concept to fundamentals section"
```

### Commit Message Convention

Follow Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(fundamentals): add RDD explanation with examples"
git commit -m "fix(CodeBlock): resolve syntax highlighting issue for Python"
git commit -m "docs: update installation instructions"
git commit -m "refactor(Sidebar): improve component performance"
```

### Pushing Changes - Step by Step

#### Quick Push (5 Steps)

```bash
# Step 1: Check your changes
git status

# Step 2: Stage all changes
git add .

# Step 3: Commit your changes with a message
git commit -m "feat: your descriptive commit message"

# Step 4: Push to your branch
git push origin feature/your-feature-name

# Step 5: Create a Pull Request on GitHub
# Go to https://github.com/yourusername/apache-spark/pulls
# Click "New Pull Request" and select your branch
```

#### Detailed Push Workflow

**Step 1: Review Your Changes Before Pushing**

```bash
# See which files have been modified
git status

# See exactly what changed in each file
git diff

# See changes that are already staged
git diff --staged
```

**Step 2: Stage Your Changes**

```bash
# Option A: Stage all changes
git add .

# Option B: Stage specific files
git add src/components/MyComponent.tsx
git add src/sections/MySection.tsx

# Option C: Stage interactively (choose which parts to add)
git add -p
```

**Step 3: Commit with Meaningful Message**

```bash
# Format: type(scope): subject
git commit -m "feat(components): add new Callout component"

# With longer description (opens text editor)
git commit

# Then write:
# feat(components): add new Callout component
#
# - Supports multiple callout types (info, warning, error)
# - Styled with Tailwind CSS
# - Accepts customizable icons
```

**Step 4: Pull Latest Changes (Prevent Conflicts)**

```bash
# Fetch latest changes from remote
git fetch origin

# Check if main has new commits
git log --oneline main..origin/main

# Update your branch with latest main
git rebase origin/main

# Or merge if you prefer
git merge origin/main
```

**Step 5: Push to Remote Repository**

```bash
# Push your branch
git push origin feature/your-feature-name

# Force push (only if you've rebased, use carefully!)
git push origin feature/your-feature-name --force-with-lease

# Push and set upstream (first time)
git push -u origin feature/your-feature-name
```

**Step 6: Create a Pull Request on GitHub**

```
1. Go to https://github.com/aifalabsglobal/learn_spark
2. Click the "Pull requests" tab
3. Click "New pull request"
4. Select your branch as the source
5. Main should be the target
6. Add a descriptive title and description
7. Click "Create pull request"
```

#### Complete Real-World Example

```bash
# Start fresh
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-streaming-section

# Make your changes
# ... edit src/sections/Streaming.tsx ...

# Check what you changed
git status
git diff

# Stage changes
git add src/sections/Streaming.tsx

# Commit
git commit -m "feat(Streaming): add Spark Streaming fundamentals section"

# Pull latest main to avoid conflicts
git fetch origin
git rebase origin/main

# Push to remote
git push origin feature/add-streaming-section

# Then create PR on GitHub interface
```

#### Troubleshooting Push Issues

**Error: "rejected" on push**
```bash
# Someone pushed changes to this branch
# Update your local copy first
git pull origin feature/your-feature-name
# Then push again
git push origin feature/your-feature-name
```

**Error: "remote origin not found"**
```bash
# Make sure origin is configured correctly
git remote -v

# If not configured, add it
git remote add origin https://github.com/aifalabsglobal/learn_spark.git
```

**Accidentally pushed to wrong branch?**
```bash
# Force undo the last push (use with caution!)
git push origin HEAD --force-with-lease
# Or manually revert commits
git revert HEAD~1
git push origin branch-name
```

**Want to amend last commit?**
```bash
# Make additional changes
# ... edit files ...

# Add to previous commit (before pushing)
git add .
git commit --amend --no-edit

# Then push with force
git push origin feature/your-feature-name --force-with-lease
```

### Syncing with Remote

```bash
# Fetch all changes from remote
git fetch origin

# Rebase your branch on latest main (recommended)
git rebase origin/main

# Or merge if you prefer
git merge origin/main
```

### Stashing Changes

If you need to switch branches without committing:

```bash
# Save untracked changes
git stash

# List stashes
git stash list

# Apply stash
git stash pop
```

## 📝 Contributing Guidelines

### Before You Start

1. **Check existing issues**: Browse GitHub issues to avoid duplicate work
2. **Create an issue first**: For new features, create an issue to discuss
3. **Fork if external**: External contributors should fork the repository
4. **Keep branches updated**: Regularly pull changes from main

### Making Changes

1. **One feature per branch**: Keep branches focused on a single feature or fix
2. **Keep commits atomic**: Each commit should be a logical unit
3. **Write descriptive commit messages**: Explain the "why", not just the "what"
4. **Test locally**: Verify your changes work before pushing

### Quality Standards

- ✅ **Type-safe**: All TypeScript code must compile without errors
- ✅ **No console errors**: Check browser console for errors
- ✅ **Responsive design**: Test on different screen sizes
- ✅ **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- ✅ **Accessibility**: Ensure content is readable and accessible

### Submitting a Pull Request

1. Push your feature branch
2. Go to GitHub and create a Pull Request
3. Write a clear title and description
4. Reference related issues (e.g., "Fixes #42")
5. Wait for review and address feedback
6. Maintainers will merge when approved

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Related Issue
Fixes #123

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Performance improvement
- [ ] Refactoring

## Changes Made
- Bullet point 1
- Bullet point 2

## Testing
How to test this change:
1. Step 1
2. Step 2

## Checklist
- [ ] Code follows project style guidelines
- [ ] Changes are tested locally
- [ ] Documentation is updated
- [ ] No breaking changes introduced
```

## 🛠 Technologies Used

### Core Framework
- **React** (19.2.3): UI library for building interactive components
- **TypeScript** (5.9.3): JavaScript with static typing

### Build Tools
- **Vite** (7.2.4): Lightning-fast build tool and dev server
- **@vitejs/plugin-react** (5.1.1): React JSX support for Vite
- **vite-plugin-singlefile** (2.3.0): Bundles build output into single HTML file

### Styling
- **Tailwind CSS** (4.1.17): Utility-first CSS framework
- **@tailwindcss/vite** (4.1.17): Tailwind CSS plugin for Vite
- **clsx** (2.1.1): Utility for constructing className strings
- **tailwind-merge** (3.4.0): Merge Tailwind CSS classes intelligently

### Utilities
- **lucide-react** (0.577.0): Beautiful, consistent icon library
- **react-dom** (19.2.3): React rendering for DOM

### Development Tools
- **@types/react** (19.2.7): TypeScript definitions for React
- **@types/react-dom** (19.2.3): TypeScript definitions for React DOM
- **@types/node** (22.0.0): TypeScript definitions for Node.js

## 📜 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Preview
```bash
npm run preview
```
Serves the production build locally for testing.

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Vite will automatically try the next available port
# Or specify a custom port
npm run dev -- --port 3000
```

### Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -r node_modules
npm install
```

### Build Fails

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Rebuild from scratch
npm run build -- --force
```

### Hot Module Replacement (HMR) Not Working

1. Check that the dev server is running
2. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Restart the dev server

### Git Issues

```bash
# Check git status
git status

# View commit log
git log --oneline

# Find which branch you're on
git branch

# Undo uncommitted changes (use with caution!)
git checkout -- .
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check existing documentation
- Review past issues for solutions

## 🔗 Useful Resources

- [Apache Spark Official Documentation](https://spark.apache.org/documentation.html)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Git Documentation](https://git-scm.com/doc)

---

**Last Updated**: March 2026

**Repository**: [aifalabsglobal/learn_spark](https://github.com/aifalabsglobal/learn_spark)

**Organization**: [AIFALabs Global](https://github.com/aifalabsglobal)

---

*Happy learning! 🚀 Enjoy exploring Apache Spark!*
