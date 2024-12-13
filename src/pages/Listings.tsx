import { useState } from 'react';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { Search } from 'lucide-react';
import { Input } from '../components/Input';
import { Property } from '../types';

interface ListingsProps {
  onPropertySelect: (property: Property) => void;
}

export function Listings({ onPropertySelect }: ListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Available Properties
        </h1>
        <div className="w-72">
          <div className="relative">
            <Input
              label=""
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2" />
          </div>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No properties found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => onPropertySelect(property)}
              className="cursor-pointer"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}