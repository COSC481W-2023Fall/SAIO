
import React from 'react'
import {render} from '@testing-library/react'
import App from "./frontend/src/App"

it("renders without crashing", () => {
    shallow(<App />);
  });
  