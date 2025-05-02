import React, { useState } from 'react';
import {
    StarIcon,
    PlusIcon,
    TrashIcon,
    PencilIcon,
    HomeIcon,
    BriefcaseIcon,
    HeartIcon,
    CheckIcon,
    XIcon
} from 'lucide-react';
import { useFavoriteLocations, FavoriteLocation } from '../../hooks/map/useFavoriteLocations';

interface FavoriteLocationsProps {
    isAuthenticated: boolean;
    onSelectLocation: (address: string) => void;
}

type LocationType = 'HOME' | 'WORK' | 'FAVORITE' | 'OTHER';

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
                                                                 isAuthenticated,
                                                                 onSelectLocation
                                                             }) => {
    const {
        locations,
        loading,
        error,
        addLocation,
        updateLocation,
        deleteLocation
    } = useFavoriteLocations(isAuthenticated);

    const [isEditing, setIsEditing] = useState(false);
    const [editingLocation, setEditingLocation] = useState<FavoriteLocation | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newLocation, setNewLocation] = useState({
        name: '',
        formattedAddress: '',
        street: '',
        city: '',
        postalCode: '',
        country: 'France',
        locationType: 'FAVORITE' as LocationType
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{id: string, description: string}[]>([]);

    const getLocationIcon = (type: string) => {
        switch (type) {
            case 'HOME':
                return <HomeIcon size={18} className="text-green-600" />;
            case 'WORK':
                return <BriefcaseIcon size={18} className="text-blue-600" />;
            case 'FAVORITE':
                return <HeartIcon size={18} className="text-red-600" />;
            default:
                return <StarIcon size={18} className="text-amber-500" />;
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (!query.trim() || !window.google?.maps?.places) {
            setSearchResults([]);
            return;
        }

        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
            {
                input: query,
                componentRestrictions: { country: 'fr' },
                types: ['geocode', 'establishment']
            },
            (predictions, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    predictions
                ) {
                    setSearchResults(
                        predictions.map(p => ({
                            id: p.place_id,
                            description: p.description
                        }))
                    );
                } else {
                    setSearchResults([]);
                }
            }
        );
    };

    const handleSelectPlace = (placeId: string, description: string) => {
        setSearchQuery(description);
        setSearchResults([]);

        if (window.google?.maps?.places) {
            const map = new window.google.maps.Map(document.createElement('div'));
            const service = new window.google.maps.places.PlacesService(map);

            service.getDetails(
                {
                    placeId,
                    fields: ['address_component', 'formatted_address', 'geometry', 'name']
                },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        // Extract address components
                        let street = '';
                        let city = '';
                        let postalCode = '';
                        let country = 'France';

                        if (place.address_components) {
                            for (const component of place.address_components) {
                                const types = component.types;

                                if (types.includes('street_number') || types.includes('route')) {
                                    street += component.long_name + ' ';
                                }
                                if (types.includes('locality')) {
                                    city = component.long_name;
                                }
                                if (types.includes('postal_code')) {
                                    postalCode = component.long_name;
                                }
                                if (types.includes('country')) {
                                    country = component.long_name;
                                }
                            }
                        }

                        if (isEditing && editingLocation) {
                            setEditingLocation({
                                ...editingLocation,
                                formattedAddress: place.formatted_address || description,
                                coordinates: {
                                    lat: place.geometry?.location?.lat() || 0,
                                    lng: place.geometry?.location?.lng() || 0
                                },
                                street: street.trim(),
                                city,
                                postalCode,
                                country
                            });
                        } else {
                            setNewLocation({
                                ...newLocation,
                                formattedAddress: place.formatted_address || description,
                                street: street.trim(),
                                city,
                                postalCode,
                                country
                            });
                        }
                    }
                }
            );
        }
    };

    const handleSaveLocation = async () => {
        if (!newLocation.name || !newLocation.formattedAddress) {
            return;
        }

        try {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
                { address: newLocation.formattedAddress },
                async (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
                        const location = results[0].geometry.location;

                        await addLocation({
                            ...newLocation,
                            coordinates: {
                                lat: location.lat(),
                                lng: location.lng()
                            }
                        });

                        setNewLocation({
                            name: '',
                            formattedAddress: '',
                            street: '',
                            city: '',
                            postalCode: '',
                            country: 'France',
                            locationType: 'FAVORITE'
                        });
                        setShowAddForm(false);
                        setSearchQuery('');
                    }
                }
            );
        } catch (error) {
            console.error('Error saving location:', error);
        }
    };

    const handleUpdateLocation = async () => {
        if (!editingLocation) return;

        try {
            await updateLocation(editingLocation);
            setIsEditing(false);
            setEditingLocation(null);
        } catch (error) {
            console.error('Error updating location:', error);
        }
    };

    const startEditing = (location: FavoriteLocation) => {
        setIsEditing(true);
        setEditingLocation(location);
        setSearchQuery(location.formattedAddress);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditingLocation(null);
        setSearchQuery('');
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <StarIcon size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sign in to save favorites</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    You need to be logged in to save and access your favorite locations.
                </p>
            </div>
        );
    }

    if (loading && !locations.length) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center">
                    <StarIcon size={18} className="mr-2 text-amber-500" />
                    Favorite Locations
                </h3>

                {!showAddForm && !isEditing && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                    >
                        <PlusIcon size={16} className="mr-1" />
                        Add New
                    </button>
                )}
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {showAddForm && !isEditing && (
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-3">Add New Location</h4>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={newLocation.name}
                                onChange={e => setNewLocation({...newLocation, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Home, Office, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => handleSearch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Search for an address"
                            />

                            {searchResults.length > 0 && (
                                <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto absolute z-10 left-4 right-4">
                                    {searchResults.map(result => (
                                        <div
                                            key={result.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 truncate"
                                            onClick={() => handleSelectPlace(result.id, result.description)}
                                        >
                                            {result.description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                value={newLocation.locationType}
                                onChange={e => setNewLocation({...newLocation, locationType: e.target.value as LocationType})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                <option value="HOME">Home</option>
                                <option value="WORK">Work</option>
                                <option value="FAVORITE">Favorite</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={handleSaveLocation}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                            >
                                <CheckIcon size={16} className="mr-1" />
                                Save
                            </button>

                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setNewLocation({
                                        name: '',
                                        formattedAddress: '',
                                        street: '',
                                        city: '',
                                        postalCode: '',
                                        country: 'France',
                                        locationType: 'FAVORITE'
                                    });
                                    setSearchQuery('');
                                }}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                            >
                                <XIcon size={16} className="mr-1" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit form */}
            {isEditing && editingLocation && (
                <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-3">Edit Location</h4>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={editingLocation.name}
                                onChange={e => setEditingLocation({...editingLocation, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Home, Office, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => handleSearch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Search for an address"
                            />

                            {searchResults.length > 0 && (
                                <div className="mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto absolute z-10 left-4 right-4">
                                    {searchResults.map(result => (
                                        <div
                                            key={result.id}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 truncate"
                                            onClick={() => handleSelectPlace(result.id, result.description)}
                                        >
                                            {result.description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                value={editingLocation.locationType}
                                onChange={e => setEditingLocation({...editingLocation, locationType: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                <option value="HOME">Home</option>
                                <option value="WORK">Work</option>
                                <option value="FAVORITE">Favorite</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button
                                onClick={handleUpdateLocation}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                            >
                                <CheckIcon size={16} className="mr-1" />
                                Update
                            </button>

                            <button
                                onClick={cancelEditing}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                            >
                                <XIcon size={16} className="mr-1" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {locations.length === 0 ? (
                    <div className="text-center py-6">
                        <p className="text-gray-500">No saved locations yet</p>
                    </div>
                ) : (
                    locations.map(location => (
                        <div
                            key={location.id}
                            className="p-3 border rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="flex justify-between">
                                <div
                                    className="flex items-start cursor-pointer"
                                    onClick={() => onSelectLocation(location.formattedAddress)}
                                >
                                    <div className="flex-shrink-0 p-1">
                                        {getLocationIcon(location.locationType)}
                                    </div>
                                    <div className="ml-2">
                                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                                        <p className="text-sm text-gray-600 mt-0.5">{location.formattedAddress}</p>
                                    </div>
                                </div>

                                {!isEditing && (
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => startEditing(location)}
                                            className="p-1 text-gray-400 hover:text-indigo-600"
                                            aria-label="Edit location"
                                        >
                                            <PencilIcon size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteLocation(location.id)}
                                            className="p-1 text-gray-400 hover:text-red-600"
                                            aria-label="Delete location"
                                        >
                                            <TrashIcon size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoriteLocations;