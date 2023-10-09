# Create Frontend

### Documentation Links

- [Vite React Setup](https://vitejs.dev/guide/)
- [Tailwind Setup with React](https://tailwindcss.com/docs/guides/create-react-app)
- [Syncfusion Documentation](https://ej2.syncfusion.com/react/documentation/getting-started/vite)
- [Vitest Setup](https://vitest.dev/guide/)

### Create React Project

- `npm create vite@latest`
- Follow the terminal prompts
  - Type Project Name
  - Type Package Name
  - Select React
  - Select JavaScript

### Install Packages

- `cd` into project folder
- `npm i`
- `npm i react-router-dom`
- `npm i axios react-icons`

### Clear Default Code

- Delete everything in src > App.css
- Delete everything in src > index.css
- Delete everything in src > App.jsx

### Add Boilerplate code to App JSX

- Add this code to App.jsx
```
import './App.css'
function App() {
  return (
    <div>
      <p className='underline text-4xl'>Hello TailWind</p>
    </div>
  )
}
export default App
```

### Install TailwindCss

- `npm install -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`

### Add TailwindCSS Config Items

- Add to `tailwind.config.css`
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Add to index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Add Syncfusion

- `npm install @syncfusion/ej2-react-grids --save`
- `npm install -g npm-check-updates`
- Run a command for every package that should be used
- Base Packages:
```
"@syncfusion/ej2": "^23.1.39",
"@syncfusion/ej2-react-calendars": "^23.1.38",
"@syncfusion/ej2-react-charts": "^23.1.39",
"@syncfusion/ej2-react-dropdowns": "^23.1.39",
"@syncfusion/ej2-react-grids": "^23.1.39",
"@syncfusion/ej2-react-inputs": "^23.1.38",
"@syncfusion/ej2-react-kanban": "^23.1.36",
"@syncfusion/ej2-react-popups": "^23.1.38",
"@syncfusion/ej2-react-richtexteditor": "^23.1.39",
"@syncfusion/ej2-react-schedule": "^23.1.39",
```

### Update Syncfusion

- Used if packages need to be updated
- `ncu -u -f /^@syncfusion/`

### Run Project

- `npm run dev`

# React Vite Testing

### Setup

- Install ViTest
- `npm install -D vitest`
- Add new Script
  - Added to package.json
  - Looks for the "scripts" section near the top
  - add: `"test": "vitest"`

### Run Tests

- Run with: `npm run test`

