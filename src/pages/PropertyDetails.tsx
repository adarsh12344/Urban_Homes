import { Property } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { properties } from '../data/properties';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
}

interface Suggestion {
  property: Property;
  score: number;
}

export function PropertyDetails({ property, onBack }: PropertyDetailsProps) {
  const [suggestions, setSuggestions] = useState<Property[]>([]);

  useEffect(() => {
    // Simulate AI-powered suggestions
    // In a real app, this would use the OpenAI API to generate suggestions
    const getSuggestions = () => {
      const similarProperties = properties
        .filter(p => p.id !== property.id)
        .map(p => ({
          property: p,
          score: calculateSimilarityScore(property, p)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2)
        .map(s => s.property);

      setSuggestions(similarProperties);
    };

    getSuggestions();
  }, [property]);

  const calculateSimilarityScore = (p1: Property, p2: Property): number => {
    const priceWeight = 0.4;
    const bedroomsWeight = 0.2;
    const bathroomsWeight = 0.2;
    const areaWeight = 0.2;

    const priceDiff = 1 - Math.abs(p1.price - p2.price) / Math.max(p1.price, p2.price);
    const bedroomsDiff = 1 - Math.abs(p1.bedrooms - p2.bedrooms) / Math.max(p1.bedrooms, p2.bedrooms);
    const bathroomsDiff = 1 - Math.abs(p1.bathrooms - p2.bathrooms) / Math.max(p1.bathrooms, p2.bathrooms);
    const areaDiff = 1 - Math.abs(p1.area - p2.area) / Math.max(p1.area, p2.area);

    return (
      priceDiff * priceWeight +
      bedroomsDiff * bedroomsWeight +
      bathroomsDiff * bathroomsWeight +
      areaDiff * areaWeight
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Listings
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${property.price.toLocaleString()}
              </p>
            </div>
            <Button variant="outline" className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Save
            </Button>
          </div>

          <div className="flex items-center text-gray-600 mt-4">
            <MapPin className="h-5 w-5 mr-2" />
            {property.location}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="flex items-center">
              <Bed className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-lg">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-lg">{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Square className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-lg">{property.area} sqft</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Similar Properties You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
                onClick={() => window.scrollTo(0, 0)}
              >
                <img
                  src={suggestion.imageUrl}
                  alt={suggestion.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {suggestion.title}
                  </h3>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    ${suggestion.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mt-2">{suggestion.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}