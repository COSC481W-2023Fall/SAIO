# Test Setup

### Setup FastAPI Test

1. In terminal run pip install pytests requests httpx
3. Create a python file tests_*nameofpyfile.py 
5. In terminal run pytest

### Setup Jest Test

1. In terminal run npm install --save-dev jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer

2. In package.json file add jest and script configuration entries like this: 
  -{
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "@babel/preset-env": "<current-version>",
    "@babel/preset-react": "<current-version>",
    "babel-jest": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
}
3. In babel.config.js add this:
  module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
};
4. Create tests as filename.tests.js
5. In terminal run npm test 
