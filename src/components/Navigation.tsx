import { Building2, Home, UserCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Urban Homes
            </span>
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => onPageChange('listings')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === 'listings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Home className="h-5 w-5 mr-1" />
              Listings
            </button>
            <button
              onClick={() => onPageChange('profile')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                currentPage === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <UserCircle className="h-5 w-5 mr-1" />
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}