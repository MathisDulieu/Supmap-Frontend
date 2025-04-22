import React, { useState } from 'react';
import { XIcon, Clock, ArrowRight, CornerDownRight, ChevronDown, ChevronUp, MapPin, Car, Bike, PersonStanding, Train } from 'lucide-react';

interface RouteInfoProps {
    routeDetails: any;
    onClose: () => void;
    travelMode: 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';
}

const RouteInfo: React.FC<RouteInfoProps> = ({ routeDetails, onClose, travelMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(0);

    if (!routeDetails || !routeDetails.routes || routeDetails.routes.length === 0) {
        return null;
    }

    const routes = routeDetails.routes;
    const currentRoute = routes[selectedRoute];
    const legs = currentRoute.legs;

    // Calculate total distance and duration for the selected route
    const totalDistance = legs.reduce((total: number, leg: any) => total + leg.distance.value, 0);
    const totalDuration = legs.reduce((total: number, leg: any) => total + leg.duration.value, 0);

    // Format distance (convert meters to km if > 1000m)
    const formatDistance = (meters: number) => {
        if (meters < 1000) {
            return `${meters} m`;
        }
        return `${(meters / 1000).toFixed(1)} km`;
    };

    // Format duration (convert seconds to minutes or hours:minutes if > 60min)
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + 'min' : ''}`;
    };

    // Get arrival time
    const getArrivalTime = () => {
        const now = new Date();
        const arrivalDate = new Date(now.getTime() + totalDuration * 1000);
        return arrivalDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Get transport icon
    const getTransportIcon = () => {
        switch (travelMode) {
            case 'DRIVING':
                return <Car size={20} className="text-blue-500" />;
            case 'BICYCLING':
                return <Bike size={20} className="text-green-500" />;
            case 'WALKING':
                return <PersonStanding size={20} className="text-orange-500" />;
            case 'TRANSIT':
                return <Train size={20} className="text-purple-500" />;
            default:
                return <Car size={20} className="text-blue-500" />;
        }
    };

    const stripHtml = (html: string) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    };

    return (
        <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-white rounded-t-xl shadow-2xl z-30 transition-all duration-300 ease-in-out ${isExpanded ? 'h-3/4' : 'h-auto'}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                    {getTransportIcon()}
                    <h3 className="text-lg font-semibold ml-2">
                        {formatDuration(totalDuration)}
                    </h3>
                    <span className="mx-2 text-gray-500">·</span>
                    <span className="text-gray-600">
                        {formatDistance(totalDistance)}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                        {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Close route information"
                    >
                        <XIcon size={20} />
                    </button>
                </div>
            </div>

            {/* Route summary and arrival time */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Clock size={18} className="text-gray-500" />
                        <span className="ml-2 text-gray-700">
                            Arriving at <span className="font-semibold">{getArrivalTime()}</span>
                        </span>
                    </div>
                    {routes.length > 1 && (
                        <div className="text-sm text-indigo-600">
                            {routes.length} routes available
                        </div>
                    )}
                </div>

                {/* If multiple routes exist, show options */}
                {routes.length > 1 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {routes.map((route: any, idx: number) => {
                            const routeTotalDuration = route.legs.reduce(
                                (total: number, leg: any) => total + leg.duration.value, 0
                            );

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedRoute(idx)}
                                    className={`p-2 text-center rounded-md transition ${
                                        selectedRoute === idx
                                            ? 'bg-indigo-100 text-indigo-700 font-medium border-2 border-indigo-400'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {formatDuration(routeTotalDuration)}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Detailed directions */}
            {isExpanded && (
                <div className="overflow-y-auto p-4 pb-16" style={{ maxHeight: 'calc(100% - 160px)' }}>
                    <div className="space-y-4">
                        {legs.map((leg: any, legIndex: number) => (
                            <div key={legIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                                {legIndex > 0 && (
                                    <div className="mb-2 py-2 px-3 rounded-lg bg-gray-50 flex items-center">
                                        <MapPin size={16} className="text-indigo-600 mr-2" />
                                        <span className="font-medium">{leg.start_address}</span>
                                    </div>
                                )}

                                {leg.steps.map((step: any, stepIndex: number) => {
                                    const instruction = stripHtml(step.instructions);

                                    // Define the maneuver icon
                                    const getManeuverIcon = () => {
                                        if (step.maneuver) {
                                            if (step.maneuver.includes('right')) {
                                                return <CornerDownRight size={16} className="text-indigo-600 transform rotate-270" />;
                                            } else if (step.maneuver.includes('left')) {
                                                return <CornerDownRight size={16} className="text-indigo-600 transform rotate-180" />;
                                            }
                                        }
                                        return <ArrowRight size={16} className="text-indigo-600" />;
                                    };

                                    // Define transport mode for transit steps
                                    const getStepTransportMode = () => {
                                        if (travelMode === 'TRANSIT' && step.transit) {
                                            const { line } = step.transit;
                                            return (
                                                <div className={`px-2 py-1 rounded-md inline-flex items-center ${line.color ? '' : 'bg-blue-100'}`}
                                                     style={line.color ? { backgroundColor: line.color, color: line.text_color || 'white' } : {}}>
                                                    <span className="font-medium text-sm">{line.short_name || line.name}</span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    };

                                    return (
                                        <div key={stepIndex} className="ml-4 mb-3 last:mb-0">
                                            <div className="flex items-start mb-1">
                                                <div className="flex-shrink-0 mt-1 mr-3">
                                                    {getManeuverIcon()}
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-700">
                                                        {instruction}
                                                    </div>
                                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                                        <span>{formatDistance(step.distance.value)}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{formatDuration(step.duration.value)}</span>
                                                        {getStepTransportMode()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {legIndex === legs.length - 1 && (
                                    <div className="mt-3 py-2 px-3 rounded-lg bg-red-50 flex items-center">
                                        <MapPin size={16} className="text-red-600 mr-2" />
                                        <span className="font-medium">{leg.end_address}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RouteInfo;