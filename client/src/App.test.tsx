import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Sidebar} from "./components/sidebar";

test('sidebar links', () => {
  render(<App />);
  const linkElement1 = screen.getByText('Home');
  const linkElement2 = screen.getByText('Import');
  const linkElement3 = screen.getByText('DataView');
  expect(linkElement1 && linkElement2 && linkElement3).toBeInTheDocument();
});

test('load Sidebar and find link Homea', async () => {
  render(<Sidebar/>)
  const items = screen.getByText("Home")
  expect(items).toHaveClass('link-name')

})
