# Testing the React Frontend

- The testing environment uses "ViTest" since the React project was created with Vite

### Create a Test

- Test files created in frontend > src > `__tests__`
- Test files use the file extension: `.test.jsx`
  - Example: `sum.test.jsx` for testing 'sum.js'
- Test file imports the file to be tested with the relative file path
  - Example: `import { sum } from '../components/sum.js'`

### Running Tests

- Tests are from the command line
- Navigate to the frontend directory
- Run command: `npm run test`
  - This calls the "test" script that was added to the package.json scripts