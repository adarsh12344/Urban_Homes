import { useState } from 'react';
import { Listings } from './pages/Listings';
import { Profile } from './pages/Profile';
import { Navigation } from './components/Navigation';
import { Auth } from './pages/Auth';
import { PropertyDetails } from './pages/PropertyDetails';

export default function App() {
  const [currentPage, setCurrentPage] = useState('auth');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('listings');
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <Auth onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'listings':
        return selectedProperty ? (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setSelectedProperty(null)}
          />
        ) : (
          <Listings onPropertySelect={setSelectedProperty} />
        );
      case 'profile':
        return <Profile />;
      default:
        return <Listings onPropertySelect={setSelectedProperty} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {renderPage()}
    </div>
  );
}