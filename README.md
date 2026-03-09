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

## ⚡ Quick Start (5 Minutes)

**Already have Node.js installed?** Get the app running in 5 minutes:

```bash
# 1. Clone the project
git clone https://github.com/aifalabsglobal/learn_spark.git
cd learn_spark

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev

# 4. Open your browser to http://localhost:5173
# That's it! 🎉
```

**New to development?** Follow the full setup guide below (takes ~20 minutes).

## ✨ Features

- 📱 **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional interface built with Tailwind CSS
- 💻 **Code Examples**: Syntax-highlighted code blocks for various programming languages
- 🧭 **Easy Navigation**: Intuitive sidebar navigation for quick access to topics
- ⚡ **Fast Performance**: Optimized single-file output for quick loading
- 📚 **Well-Organized Content**: Structured sections covering all major Spark topics
- 🔍 **Developer-Friendly**: TypeScript for type safety and better developer experience

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system. This section explains what each tool does and why you need it.

### For the Web Application (Required)

#### 1. Node.js (v16.0.0 or higher)

**What is it?** Node.js lets you run JavaScript outside the browser. It's needed to manage dependencies and run the development server.

**Download**: [https://nodejs.org/](https://nodejs.org/)

**How to verify:**
```bash
node --version
# Output should be: v16.x.x or higher
```

#### 2. npm (v7.0.0 or higher)

**What is it?** npm (Node Package Manager) downloads and manages code libraries your project needs.

**Note:** npm comes automatically with Node.js. You don't need to install it separately.

**How to verify:**
```bash
npm --version
# Output should be: 7.x.x or higher
```

#### 3. Git (v2.25.0 or higher)

**What is it?** Git is a version control system. It downloads projects from GitHub and tracks changes you make.

**Download**: [https://git-scm.com/](https://git-scm.com/)

**How to verify:**
```bash
git --version
# Output should be: git version 2.25.0 or higher
```

#### 4. Code Editor (Optional but Recommended)

**VS Code** (recommended for this course)
- Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Extensions to install:
  - "ES7+ React/Redux/React-Native snippets" by dsznajder.es7-react-js-snippets
  - "Prettier" by esbenp.prettier-vscode
  - "TypeScript Vue Plugin" by Vue

**Alternatives:**
- WebStorm, Sublime Text, or any code editor you prefer

### For Hands-On Spark Learning (Optional but Recommended)

If you want to practice writing Spark code:

#### 1. Java Development Kit (v11 or higher)

**What is it?** Apache Spark is built on Java, so it needs Java to run.

**Download**: [https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

OR install via package manager:
```bash
# macOS with Homebrew
brew install openjdk@11

# Ubuntu/Debian
sudo apt-get install openjdk-11-jdk

# Windows with Winget
winget install OpenJDK.JDK.11
```

**How to verify:**
```bash
java -version
# Output should show: openjdk version "11.x.x" or higher
```

#### 2. Apache Spark (v3.5.0)

**What is it?** The distributed computing framework you'll be learning.

**Download**: [https://spark.apache.org/downloads.html](https://spark.apache.org/downloads.html)

**How to verify (after installation):**
```bash
spark-shell --version
```

#### 3. Python (v3.8 or higher)

**What is it?** Python lets you write Spark code. You'll use PySpark (Python API for Spark).

**Download**: [https://www.python.org/downloads/](https://www.python.org/downloads/)

**How to verify:**
```bash
python --version
# Output should show: Python 3.8.x or higher
```

### Quick Verification Script

Run this script to check if everything is installed:

**For macOS/Linux:**
```bash
#!/bin/bash
echo "🔍 Checking Prerequisites..."
echo ""

echo "Node.js:"
node --version || echo "❌ Not installed"

echo "npm:"
npm --version || echo "❌ Not installed"

echo "Git:"
git --version || echo "❌ Not installed"

echo "Java:"
java -version 2>&1 || echo "❌ Not installed"

echo "Python:"
python --version || echo "❌ Not installed"

echo ""
echo "✅ Check complete!"
```

**For Windows (PowerShell):**
```powershell
Write-Host "🔍 Checking Prerequisites..."
Write-Host ""

Write-Host "Node.js:"
node --version; if ($?) { } else { Write-Host "❌ Not installed" }

Write-Host "npm:"
npm --version; if ($?) { } else { Write-Host "❌ Not installed" }

Write-Host "Git:"
git --version; if ($?) { } else { Write-Host "❌ Not installed" }

Write-Host "Java:"
java -version 2>&1; if ($?) { } else { Write-Host "❌ Not installed" }

Write-Host "Python:"
python --version; if ($?) { } else { Write-Host "❌ Not installed" }

Write-Host ""
Write-Host "✅ Check complete!"
```

### Help Resources

If you get stuck:
- **Node.js issues**: Visit [nodejs.org/docs](https://nodejs.org/docs)
- **Git issues**: Visit [git-scm.com/book](https://git-scm.com/book)
- **Java issues**: Visit [oracle.com/java](https://www.oracle.com/java/technologies/javase-downloads.html)
- **Python issues**: Visit [python.org/getting-started](https://www.python.org/about/gettingstarted/)

### Installation Timeline

Here's how long each part typically takes:

| Task | Time | Notes |
|------|------|-------|
| Download & Install Node.js | 5 min | Simple installer |
| Download & Install Git | 5 min | Simple installer |
| Clone project | 1 min | Depends on internet |
| `npm install` | 2-5 min | First time longer |
| Download Java | 10 min | ~300MB file |
| Download Spark | 15 min | ~300MB file |
| Set environment variables | 5 min | Trickiest part |
| **Total** | **40-50 min** | One-time setup |

**Total All Prerequisites**: ~60-90 minutes for first-time setup (varies by internet speed)

## 🚀 Installation

This guide covers two parts:
1. **Web Application Setup** - Getting the learning app running locally
2. **Apache Spark Environment Setup** - Setting up Spark for hands-on learning

### Part 1: Web Application Setup (Required for Course Materials)

#### Step 1: Clone the Repository

Cloning means downloading a complete copy of the project from GitHub to your computer.

```bash
# Clone the repository using HTTPS (easiest for beginners)
git clone https://github.com/aifalabsglobal/learn_spark.git

# Navigate to the project directory
cd learn_spark
```

**What this does:**
- Downloads the complete project files
- Creates a folder named `learn_spark`
- Sets up Git to track changes

If you have SSH keys configured (skip this if unsure):
```bash
git clone git@github.com:aifalabsglobal/learn_spark.git
```

#### Step 2: Install Dependencies

Dependencies are like libraries or tools your project needs to run. Think of it like installing ingredients before cooking.

```bash
# Install all required npm packages
npm install
```

**What happens:**
- Reads `package.json` (the recipe file)
- Downloads React, TypeScript, Tailwind CSS, and other tools
- Creates a `node_modules` folder (you'll see a large folder appear)
- Generates `package-lock.json` (locks dependency versions)

**Expected output:**
```
added 180 packages in 45s
```

This might take 1-5 minutes depending on your internet speed.

### Part 2: Apache Spark Environment Setup (For Hands-On Learning)

This section teaches you how to set up Apache Spark locally so you can write and run Spark code.

#### What You're Installing

```
Java (JDK)
    ↓
Apache Spark
    ↓
Environment Variables
    ↓
PySpark (Python API for Spark)
    ↓
Ready to Write Spark Code!
```

#### Step 1: Install Java Development Kit (JDK)

**Why?** Apache Spark is built on Java, so you need Java installed.

**For Windows:**
```powershell
# Using Winget (Windows Package Manager)
winget install OpenJDK.JDK.11

# Or download manually from: https://www.oracle.com/java/technologies/downloads/
```

**For macOS:**
```bash
# Using Homebrew
brew install openjdk@11
```

**For Linux (Ubuntu/Debian):**
```bash
sudo apt-get install openjdk-11-jdk
```

**Verify Installation:**
```bash
java -version
```

Expected output shows something like:
```
openjdk version "11.0.x" 2021-10-19
```

#### Step 2: Download and Install Apache Spark

Spark is the main framework you'll be learning.

**For All Platforms:**

```bash
# Step 1: Download Spark (3.5.0 is the latest stable version)
# Visit: https://spark.apache.org/downloads.html
# Or use wget/curl:

wget https://downloads.apache.org/spark/spark-3.5.0/spark-3.5.0-bin-hadoop3.tgz

# Step 2: Extract the archive
# On Linux/macOS:
tar -xzf spark-3.5.0-bin-hadoop3.tgz

# On Windows (using 7-Zip or similar):
# Right-click → Extract All → Choose destination folder

# Step 3: Move to a permanent location
# On Linux/macOS:
sudo mv spark-3.5.0-bin-hadoop3 /opt/spark

# On Windows:
# Move the folder to C:\spark (or another location)
```

**What you just did:**
- Downloaded Spark (a 300MB+ file)
- Extracted it to get access to Spark tools
- Moved it to a standard location for easy access

#### Step 3: Set Environment Variables

Environment variables tell your computer where to find Spark.

**Understanding What You're Doing:**
```
SPARK_HOME = /opt/spark  (the folder where Spark lives)
PATH = $SPARK_HOME/bin:$PATH  (add Spark's tools to your system commands)
```

**For Linux/macOS:**

Edit your shell configuration file:
```bash
# Open the file in an editor
nano ~/.bashrc  # or ~/.zshrc if using zsh
```

Add these lines at the end:
```bash
export SPARK_HOME=/opt/spark
export PATH=$SPARK_HOME/bin:$PATH
```

Save and reload:
```bash
source ~/.bashrc
```

**For Windows:**

1. Open Environment Variables:
   - Press `Win + X` → Select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables" button
   - Click "New" under System variables

2. Create these two variables:

   **Variable 1:**
   - Name: `SPARK_HOME`
   - Value: `C:\spark` (or your Spark location)

   **Variable 2:**
   - Name: `JAVA_HOME`
   - Value: `C:\Program Files\Java\jdk-11` (your JDK location)

3. Edit `PATH` variable:
   - Find and click `PATH` → Click "Edit"
   - Add: `%SPARK_HOME%\bin`
   - Click OK

4. Restart your terminal for changes to take effect

#### Step 4: Install PySpark (Python API)

PySpark lets you write Spark code in Python instead of Scala.

```bash
# Make sure Python is installed first
python --version  # Should show Python 3.8+

# Install PySpark
pip install pyspark
```

**What PySpark is:**
- A Python library that communicates with Spark
- Lets you write Spark code in Python
- Works alongside the Apache Spark installation

#### Step 5: Verify Everything Works

Test each component to make sure installation was successful.

**Test Java:**
```bash
java -version
```

**Test Spark Scala Shell:**
```bash
spark-shell

# You should see:
# Scala> 
# Type :quit to exit
```

**Test PySpark:**
```bash
pyspark

# You should see:
# >>> 
# Type exit() to exit
```

**Test with Simple Code:**

Create a file `test_spark.py`:
```python
from pyspark.sql import SparkSession

# Create a Spark session (your entry point to Spark)
spark = SparkSession.builder.appName("test").getOrCreate()

# Create simple data
data = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]

# Create a DataFrame (Spark's main data structure)
df = spark.createDataFrame(data, ["name", "age"])

# Show the data
df.show()

# Stop the session
spark.stop()
```

Run it:
```bash
python test_spark.py
```

Expected output:
```
+-------+---+
|  name |age|
+-------+---+
| Alice | 25|
|   Bob | 30|
|Charlie | 35|
+-------+---+
```

### Verification Checklist

Before moving to development, make sure you have:

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Project cloned and npm packages installed
- [ ] Java/JDK 11+ installed (`java -version`)
- [ ] Apache Spark downloaded and extracted
- [ ] `SPARK_HOME` environment variable set
- [ ] PySpark installed (`pip show pyspark`)
- [ ] Can run commands: `spark-shell` and `pyspark`

### Troubleshooting Installation

**Issue: "Command not found: spark-shell"**
- Solution: Environment variables not set correctly
- Check: `echo $SPARK_HOME` (should show path)
- Fix: Re-read Step 3 and restart terminal

**Issue: "JAVA_HOME is not set"**
- Solution: Set `JAVA_HOME` environment variable
- Check: `java -version` works but Spark doesn't
- Fix: Add JAVA_HOME pointing to JDK installation

**Issue: npm install takes too long**
- This is normal! First install can take 5+ minutes
- Check internet connection
- Try: `npm install --legacy-peer-deps` if it fails

**Issue: Python/PySpark not working after install**
- Solution: Restart your terminal/IDE
- Check: `pip list | grep pyspark`
- Fix: `pip install --upgrade pyspark`

### Next Steps After Installation

1. **Run the Web App**: `npm run dev` (Section: Development)
2. **Explore the Course**: Open http://localhost:5173 in your browser
3. **Start Learning**: Go through Fundamentals section first
4. **Hands-On Practice**: Use PySpark to practice concepts from the course

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

**What does "Hot Module Replacement" mean?**
- When you save a file, the browser automatically refreshes
- You don't need to manually refresh the page
- You see changes instantly while working

### First Time Starting the App

1. **Run the dev server:**
   ```bash
   npm run dev
   ```

2. **Look for this output:**
   ```
   ➜ Local:   http://localhost:5173/
   ➜ press h to show help
   ```

3. **Open your browser** and go to `http://localhost:5173`

4. **You should see the Apache Spark course homepage** with sidebar navigation

### During Development

**Browser DevTools for Debugging:**
- Press `F12` on Windows/Linux or `Cmd+Option+I` on Mac
- This opens developer tools for inspecting elements
- Console tab shows error messages if something breaks

**Common HMR Behaviors:**
- ✅ Edit a React component → page refreshes automatically
- ✅ Edit CSS → changes apply instantly without refresh
- ✅ Edit TypeScript → compilation errors show in console
- ⚠️ Some changes (like env variables) need manual refresh (Ctrl+R)

### Understanding the Project Structure

```
src/
├── components/              # Reusable UI pieces
│   ├── Sidebar.tsx         # Navigation menu
│   ├── CodeBlock.tsx       # Code snippet display
│   └── Callout.tsx         # Info boxes
│
├── sections/               # Main course content (can edit!)
│   ├── Fundamentals.tsx    # Spark basics
│   ├── Architecture.tsx     # System internals
│   ├── SparkSQL.tsx        # SQL engine
│   ├── Streaming.tsx       # Real-time processing
│   ├── MLlibAndPerformance.tsx # ML & optimization
│   └── Projects.tsx        # Practical examples
│
├── utils/
│   └── cn.ts              # Helper function for styling
│
├── App.tsx                # Main app component
├── main.tsx               # Entry point (start here)
└── index.css              # Global styles
```

**Where to Edit Content:**
- **Add course content**: Edit files in `src/sections/`
- **Change navigation**: Edit `src/components/Sidebar.tsx`
- **Styling**: Use Tailwind CSS classes or edit `src/index.css`

### Code Style and Quality

#### TypeScript Best Practices

**What is TypeScript?**
- JavaScript with a "safety net" that checks for errors
- Catches bugs before they become problems
- More code, but fewer runtime errors

**Tips for using TypeScript:**
```typescript
// ✅ Good: Type annotations
const age: number = 25;
const name: string = "Alice";

// ❌ Avoid: Using 'any' type
const data: any = getData(); // Too loose!

// ✅ Good: Define component types
interface UserProps {
  name: string;
  age: number;
}

function UserCard({ name, age }: UserProps) {
  return <div>{name}, {age} years old</div>;
}
```

**Check for TypeScript errors:**
```bash
# See all type errors in your project
npx tsc --noEmit

# Fix common issues
npx tsc --noEmit --strict
```

#### React Components

**What is a React Component?**
- A reusable piece of the user interface
- Like a building block you can use multiple times
- Should do one thing well

**Writing Good Components:**

```typescript
// ✅ Good: Clear name, single responsibility
function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <pre className="bg-gray-900 p-4 rounded">
      <code>{code}</code>
    </pre>
  );
}

// ❌ Avoid: Too much logic in one component
function EverythingComponent() {
  // 500 lines of code doing multiple things
}
```

**Component Naming Convention:**
- Use PascalCase (CapitalLetter at start)
- Name describes what it does: `CodeBlock`, `Sidebar`, `Callout`
- ❌ Avoid: `comp1`, `thing`, `button2`

#### CSS/Styling with Tailwind

**What is Tailwind CSS?**
- Utility-first CSS library
- Instead of writing CSS, you use class names
- Faster to style, easier to maintain

**Example:**
```typescript
// ✅ Tailwind classes
<div className="bg-blue-500 p-4 rounded-lg shadow-lg">
  Hello World
</div>

// ❌ Don't write CSS manually (unless necessary)
<style>
  div { background-color: #3b82f6; /* bad */ }
</style>
```

**Common Tailwind Classes:**
- `bg-blue-500` = blue background
- `p-4` = padding (space inside)
- `m-2` = margin (space outside)
- `rounded-lg` = rounded corners
- `shadow-lg` = drop shadow
- `text-white` = white text
- `flex` = flexbox layout

**Using the cn() Utility Function:**

The `cn()` function helps combine classes cleanly:
```typescript
import { cn } from '@/utils/cn';

// Merge classes conditionally
const buttonClass = cn(
  "px-4 py-2 rounded",           // base styles
  isActive ? "bg-blue-500" : "bg-gray-300"  // conditional
);

<button className={buttonClass}>Click me</button>
```

### Editing Course Content

**Example: Adding content to Fundamentals section**

Open `src/sections/Fundamentals.tsx`:

```typescript
export function Fundamentals() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Spark Fundamentals</h2>
      
      {/* Your content here */}
      <p>Apache Spark is a unified computing engine...</p>
      
      {/* Use the CodeBlock component for code */}
      <CodeBlock 
        code='val rdd = sc.parallelize(List(1, 2, 3))'
        language="scala"
      />
      
      {/* Use Callout for important notes */}
      <Callout type="info">
        RDDs are immutable distributed datasets
      </Callout>
    </div>
  );
}
```

### Testing Your Changes

After editing:

1. **Check for errors in terminal:**
   ```bash
   # TypeScript compilation errors
   npm run build
   ```

2. **View in browser:**
   - Dev server already running? Check http://localhost:5173
   - Should auto-refresh when you save

3. **Check DevTools Console (F12):**
   - Any red errors?
   - Any warnings to fix?

### Useful Development Commands

```bash
# Start development with better error messages
npm run dev

# Check for type errors (no build)
npx tsc --noEmit

# Format code (make it pretty)
npx prettier --write src/

# Check if build works
npm run build

# Preview the production build locally
npm run preview
```

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
