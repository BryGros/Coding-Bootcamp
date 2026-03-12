# Chore 12: Initialize React Frontend

**Estimated Time:** 15-20 minutes

## Task
Set up React application with routing, HTTP client, and proper folder structure

## Steps

### Part 1: Create React App
- [ ] Navigate to project root
- [ ] Run: `npm create vite@latest client -- --template react`
- [ ] Navigate to client folder: `cd client`
- [ ] Install dependencies: `npm install`

### Part 2: Install Core Dependencies
- [ ] Install routing and HTTP client:
  ```bash
  npm install react-router axios
  ```

### Part 3: Install Styling Framework and Icons (from Planning Chore 6)
- [ ] Follow installation instructions based on your Planning Chore 6 decision:
  - **React Bootstrap:** https://react-bootstrap.github.io/docs/getting-started/introduction
  - **Tailwind CSS:** https://tailwindcss.com/docs/guides/vite
  - **DaisyUI:** https://daisyui.com/docs/install/
  - **Ant Design:** https://ant.design/docs/react/introduce
- [ ] Follow icon library installation instructions (if chosen in Planning Chore 6):
  - **React Icons:** https://react-icons.github.io/react-icons/
  - **Font Awesome:** https://docs.fontawesome.com/web/use-with/react/

### Part 4: Add Google Fonts (from Planning Chore 5)
- [ ] If using Google Fonts, follow the instructions at: https://fonts.google.com/
- [ ] Add the `<link>` tag to `index.html` in `<head>` section
- [ ] Update `src/index.css` with your chosen font-family

### Part 5: Create Folder Structure
- [ ] Navigate to `src` folder: `cd src`
- [ ] Create project folders:
  ```bash
  mkdir components pages hooks context utils
  ```
- [ ] Folder structure should look like:
  ```
  src/
  ├── components/    (Reusable UI components)
  ├── pages/         (Route-level page components)
  ├── hooks/         (Custom React hooks)
  ├── context/       (React Context for state management)
  ├── utils/         (Helper functions)
  ├── App.jsx
  ├── App.css
  ├── main.jsx
  └── index.css
  ```

### Part 6: Test Setup
- [ ] Navigate back to client folder: `cd ..`
- [ ] Test: `npm run dev`
- [ ] Verify React app opens in browser at http://localhost:5173
- [ ] Stop the dev server (Ctrl+C)

## Acceptance Criteria

- [ ] React app created successfully with Vite
- [ ] react-router installed
- [ ] axios installed
- [ ] Styling framework/library installed (from Planning Chore 6)
- [ ] Icon library installed (if chosen in Planning Chore 6)
- [ ] Google Fonts added (if chosen in Planning Chore 5)
- [ ] All folders created (components, pages, hooks, context, utils)
- [ ] App runs without errors
- [ ] Default React page displays in browser at http://localhost:5173
