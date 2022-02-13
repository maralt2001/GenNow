import React from 'react';
import { render, screen } from '@testing-library/react';

import {Sidebar} from "./components/Sidebar";

test('render sidebar link home in navigation', () => {
  render(<Sidebar />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
