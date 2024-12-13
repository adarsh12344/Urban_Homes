import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
        <p className="text-lg font-bold text-blue-600 mt-1">
          ${property.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mt-2">{property.location}</p>
        <div className="flex gap-4 mt-3 text-gray-700">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.area} sqft</span>
        </div>
      </div>
    </div>
  );
}