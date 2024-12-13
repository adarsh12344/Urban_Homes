import { User, Mail, Calendar, Bell, Key, LogOut } from 'lucide-react';
import { Button } from '../components/Button';

export function Profile() {
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024',
    savedProperties: 5,
    viewedProperties: 12,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {userProfile.name}
              </h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="h-4 w-4 mr-1" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Member since {userProfile.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Saved Properties</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {userProfile.savedProperties}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Viewed Properties</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {userProfile.viewedProperties}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                <Button variant="outline" className="inline-flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="inline-flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="inline-flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button variant="secondary" className="inline-flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}