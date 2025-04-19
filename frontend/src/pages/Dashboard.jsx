
import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import RetailerDashboard from './RetailerDashboard';
import NGODashboard from './NGODashboard';

const Dashboard = () => {
  const { isRetailer, isNGO, role, user } = useAuth();
  console.log('isRetailer?: ', isRetailer)
  console.log('isNGO?: ', isNGO)
  console.log('role ', role)
  console.log('user ', user.roles[0])

  return (
    <DashboardLayout>
      {isRetailer && <RetailerDashboard />}
      {isNGO && <NGODashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
