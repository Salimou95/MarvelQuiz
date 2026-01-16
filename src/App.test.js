import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './components/App';

test('renders without crashing', () => {
  const { container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(container).toBeTruthy();
});
