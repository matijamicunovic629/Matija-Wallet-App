import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; // Adjust the import based on your project structure

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
