import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header1';
import { AuthProvider } from '../../context/AuthContext';

describe('Header Component', () => {
  const renderHeader = (isLoggedIn = false) => {
    jest.spyOn(require('../../context/AuthContext'), 'useAuth')
      .mockImplementation(() => ({
        isLoggedIn
      }));

    return render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('displays sign in/up buttons when logged out', () => {
    renderHeader(false);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('displays dashboard when logged in', () => {
    renderHeader(true);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});