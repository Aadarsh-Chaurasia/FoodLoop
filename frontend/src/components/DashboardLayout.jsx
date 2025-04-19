// components/DashboardLayout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user, logout, isRetailer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userType = isRetailer ? 'Retailer' : 'NGO';

  return (
    <div className="h-screen flex flex-col"> {/* Added a wrapping div for full height */}
      <header className="sticky top-0 z-10 bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px]">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-2">Menu</h2>
                  <nav className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start" onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                    {isRetailer ? (
                      <>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate('/inventory')}>
                          Inventory
                        </Button>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate('/requests')}>
                          Food Requests
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate('/listings')}>
                          Food Listings
                        </Button>
                        <Button variant="ghost" className="justify-start" onClick={() => navigate('/my-requests')}>
                          My Requests
                        </Button>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">FoodLoop</h1>
            <div className="flex-grow">
              <Navbar />
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Profile</SheetTitle>
                <SheetDescription>
                  Manage your account details and sign out.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="rounded-md border p-4">
                  <p className="text-sm font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="rounded-md border p-4">
                  <p className="text-sm font-medium leading-none">Account Type</p>
                  <p className="text-sm text-muted-foreground">{userType}</p>
                </div>
              </div>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign Out</span>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-grow overflow-y-auto">
        {children} {/* This is crucial for rendering the content passed to DashboardLayout */}
      </main>
    </div>
  );
};

export default DashboardLayout;