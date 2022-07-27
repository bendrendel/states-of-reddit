import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import App from '../src/app/App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText(/learn/i)).toBeInTheDocument();
});
