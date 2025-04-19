// components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isRetailer } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden lg:flex space-x-4 justify-center">
      <Button
        variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </Button>
      {isRetailer ? (
        <>
          <Button
            variant={isActive('/inventory') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/inventory')}
          >
            Inventory
          </Button>
          <Button
            variant={isActive('/requests') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/requests')}
          >
            Food Requests
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={isActive('/listings') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/listings')}
          >
            Food Listings
          </Button>
          <Button
            variant={isActive('/my-requests') ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => navigate('/my-requests')}
          >
            My Requests
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;