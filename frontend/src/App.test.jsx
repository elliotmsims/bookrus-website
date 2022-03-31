import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('App renders', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText('Information about your favorite stories, all in one place')).toBeInTheDocument();
})

test('App buttons are not disabled', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const buttonItems = screen.getAllByRole('button');
    buttonItems.forEach((button) => {
        expect(button).not.toBeDisabled();
    });
});