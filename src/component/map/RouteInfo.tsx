import React, { useEffect, useState, useRef } from 'react';
import {
  XIcon,
  Clock,
  ArrowRight,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Car,
  Bike,
  PersonStanding,
  Train,
  Share2Icon,
  AlertTriangleIcon
} from 'lucide-react';
import { useRouteShare } from '../../hooks/map/useRouteShare';
import { TravelMode, Alert } from '../../hooks/map/types/map.ts';
import { useMediaQuery } from '../../hooks/map/useMediaQuery.ts';

interface RouteInfoProps {
  routeDetails: any;
  onClose: () => void;
  travelMode: TravelMode;
  onSelectRoute?: (idx: number) => void;
  selectedRouteIndex?: number;
  isAuthenticated: boolean;
  currentTravelMode?: TravelMode;
}

const RouteInfo: React.FC<RouteInfoProps> = ({
                                               routeDetails,
                                               onClose,
                                               travelMode,
                                               currentTravelMode = travelMode,
                                               onSelectRoute,
                                               selectedRouteIndex = 0,
                                               isAuthenticated
                                             }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<number>(selectedRouteIndex);
  const { qrUrl, isLoading, error, share } = useRouteShare();
  const [showQr, setShowQr] = useState(false);
  const [routeAlerts, setRouteAlerts] = useState<Alert[]>([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const directionsRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const modeHasChanged = currentTravelMode !== travelMode;

  useEffect(() => {
    setSelectedRoute(selectedRouteIndex);
    setShowQr(false);
  }, [selectedRouteIndex]);

  useEffect(() => {
    const alertsFromWindow = (window as any).currentRouteAlerts || [];
    setRouteAlerts(alertsFromWindow);
  }, [routeDetails, selectedRouteIndex]);

  useEffect(() => {
    if (isExpanded && directionsRef.current) {
      directionsRef.current.scrollTop = 0;
    }
  }, [selectedRoute, isExpanded]);

  useEffect(() => {
    if (panelRef.current) {
      const adjustHeight = () => {
        if (isExpanded) {
          const maxHeight = window.innerHeight * 0.8;
          panelRef.current!.style.maxHeight = `${maxHeight}px`;
        } else {
          panelRef.current!.style.maxHeight = 'auto';
        }
      };

      adjustHeight();
      window.addEventListener('resize', adjustHeight);
      return () => window.removeEventListener('resize', adjustHeight);
    }
  }, [isExpanded]);

  if (!routeDetails?.routes?.length) return null;

  let routes;
  let currentRoute;
  let legs;
  let totalDistance = 0;
  let totalDuration = 0;

  try {
    routes = routeDetails.routes;

    if (selectedRoute >= routes.length) {
      console.warn(`Selected route index ${selectedRoute} is out of bounds. Setting to 0.`);
      setSelectedRoute(0);
    }

    currentRoute = routes[selectedRoute];

    if (!currentRoute || !currentRoute.legs || !Array.isArray(currentRoute.legs)) {
      console.error('Invalid route structure: missing legs array');
      return null;
    }

    legs = currentRoute.legs;

    totalDistance = legs.reduce((sum: number, leg: any) => {
      if (leg && leg.distance && typeof leg.distance.value === 'number') {
        return sum + leg.distance.value;
      }
      return sum;
    }, 0);

    totalDuration = legs.reduce((sum: number, leg: any) => {
      if (leg && leg.duration && typeof leg.duration.value === 'number') {
        return sum + leg.duration.value;
      }
      return sum;
    }, 0);
  } catch (error) {
    console.error('Error processing route data:', error);
    return null;
  }

  const formatDistance = (m: number) =>
      m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;

  const formatDuration = (s: number) => {
    const min = Math.floor(s / 60);
    if (min < 60) return `${min} min`;
    const h = Math.floor(min / 60);
    const r = min % 60;
    return `${h}h ${r ? `${r}min` : ''}`;
  };

  const getArrivalTime = () =>
      new Date(Date.now() + totalDuration * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

  const getTransportIcon = () =>
      ({
        DRIVING: <Car size={20} className="text-blue-500" />,
        BICYCLING: <Bike size={20} className="text-green-500" />,
        WALKING: <PersonStanding size={20} className="text-orange-500" />,
        TRANSIT: <Train size={20} className="text-purple-500" />
      }[travelMode]);

  const stripHtml = (html: string) => {
    if (!html) return '';

    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleSelectRoute = (idx: number) => {
    if (idx >= routes.length) {
      console.warn(`Cannot select route ${idx}: index out of bounds`);
      return;
    }

    setSelectedRoute(idx);
    if (onSelectRoute) {
      onSelectRoute(idx);
    }
    setShowQr(false);
  };

  const handleShareClick = () => {
    if (!isAuthenticated) {
      return;
    }

    if (showQr) {
      setShowQr(false);
      return;
    }

    try {
      if (!legs || !legs.length) {
        console.error('No legs data available for sharing');
        return;
      }

      const start = legs[0].start_location;
      const end = legs[legs.length - 1].end_location;

      if (!start || !end || typeof start.lat !== 'function' || typeof end.lat !== 'function') {
        console.error('Invalid location data for sharing');
        return;
      }

      share(start.lat(), start.lng(), end.lat(), end.lng());
      setShowQr(true);
    } catch (error) {
      console.error('Error sharing route:', error);
    }
  };

  const alertCounts = routeAlerts.reduce((counts: {HIGH: number, MEDIUM: number, LOW: number, total: number}, alert) => {
    if (!alert) return counts;

    if (alert.severity) {
      counts[alert.severity]++;
    } else {
      counts.MEDIUM++;
    }
    counts.total++;
    return counts;
  }, {HIGH: 0, MEDIUM: 0, LOW: 0, total: 0});

  return (
      <div
          ref={panelRef}
          className={`route-info-panel fixed ${isMobile ? 'bottom-0 left-0 right-0 w-full' : 'bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg'} 
        bg-white rounded-t-xl shadow-2xl z-30
        transition-all duration-300 ease-in-out overflow-hidden 
        ${isExpanded ? 'h-auto' : 'h-auto'}`}
          style={{
            maxHeight: isExpanded ? '80vh' : 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            {getTransportIcon()}
            <h3 className="text-lg font-semibold ml-2">{formatDuration(totalDuration)}</h3>
            <span className="mx-2 text-gray-500">·</span>
            <span className="text-gray-600">{formatDistance(totalDistance)}</span>

            {alertCounts.total > 0 && (
                <div className="ml-2 flex items-center">
                  <AlertTriangleIcon
                      size={16}
                      className={`${
                          alertCounts.HIGH > 0
                              ? 'text-red-500'
                              : alertCounts.MEDIUM > 0
                                  ? 'text-amber-500'
                                  : 'text-blue-500'
                      }`}
                  />
                  <span className="ml-1 text-xs font-medium">
                {alertCounts.total} {alertCounts.total === 1 ? 'alert' : 'alerts'}
              </span>
                </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
                onClick={handleShareClick}
                disabled={isLoading || !isAuthenticated}
                className={`p-2 rounded-full ${
                    isAuthenticated
                        ? 'hover:bg-gray-100 text-indigo-600'
                        : 'text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Share route / show QR code"
                title={isAuthenticated ? "Share route" : "Sign in to share"}
            >
              <Share2Icon
                  size={20}
                  className={isLoading ? 'animate-spin' : ''}
              />
            </button>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>

            <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close route info"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto" style={{ maxHeight: isExpanded ? 'calc(80vh - 70px)' : 'auto' }}>
          {error && (
              <div className="p-4 text-center text-red-600 text-sm">
                {error}
              </div>
          )}

          {modeHasChanged && (
              <div className="p-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs rounded-md mx-4 mt-2">
                The transport mode has changed. Recalculate the route to see updated results.
              </div>
          )}

          {qrUrl && showQr && (
              <div className="p-4 flex justify-center border-b border-gray-200">
                <div className="flex flex-col items-center">
                  <img src={qrUrl} alt="QR code for route sharing" className="w-32 h-32" />
                  <p className="text-xs text-gray-500 mt-2 text-center max-w-xs">
                    Scan this QR code to share this route with others
                  </p>
                </div>
              </div>
          )}

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

            {alertCounts.total > 0 && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-start">
                    <AlertTriangleIcon
                        size={20}
                        className={`flex-shrink-0 mt-0.5 ${
                            alertCounts.HIGH > 0
                                ? 'text-red-500'
                                : alertCounts.MEDIUM > 0
                                    ? 'text-amber-500'
                                    : 'text-blue-500'
                        }`}
                    />
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-800">
                        {alertCounts.total} {alertCounts.total === 1 ? 'alert' : 'alerts'} on this route
                      </p>
                      <p className="text-xs text-gray-600">
                        {alertCounts.HIGH > 0 && (
                            <span className="text-red-600 font-medium">{alertCounts.HIGH} high severity</span>
                        )}
                        {alertCounts.HIGH > 0 && alertCounts.MEDIUM > 0 && ', '}
                        {alertCounts.MEDIUM > 0 && (
                            <span className="text-amber-600">{alertCounts.MEDIUM} medium</span>
                        )}
                        {(alertCounts.HIGH > 0 || alertCounts.MEDIUM > 0) && alertCounts.LOW > 0 && ', '}
                        {alertCounts.LOW > 0 && (
                            <span className="text-blue-600">{alertCounts.LOW} low</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
            )}

            {routes.length > 1 && (
                <div className="mt-3 space-y-2">
                  {routes.map((route: any, idx: number) => {
                    if (!route || !route.legs || !Array.isArray(route.legs)) {
                      return null;
                    }

                    const dur = route.legs.reduce((s: number, l: any) => {
                      return s + (l && l.duration && typeof l.duration.value === 'number' ? l.duration.value : 0);
                    }, 0);

                    const dist = route.legs.reduce((s: number, l: any) => {
                      return s + (l && l.distance && typeof l.distance.value === 'number' ? l.distance.value : 0);
                    }, 0);

                    const summary = route.summary || `Route ${idx + 1}`;
                    const routeSpecificAlerts = idx === selectedRoute ? alertCounts.total : 0;

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelectRoute(idx)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border shadow-sm transition ${
                                selectedRoute === idx
                                    ? 'bg-indigo-50 border-indigo-500'
                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                          <div className="flex flex-col items-start text-left">
                            <div className="flex items-center">
                              <span className="text-sm font-semibold">{summary}</span>
                              {routeSpecificAlerts > 0 && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            <AlertTriangleIcon size={12} className="mr-1" />
                                    {routeSpecificAlerts}
                          </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{formatDistance(dist)}</span>
                          </div>
                          <span
                              className={`text-sm font-medium ${
                                  selectedRoute === idx ? 'text-indigo-700' : 'text-gray-700'
                              }`}
                          >
                      {formatDuration(dur)}
                    </span>
                        </button>
                    );
                  })}
                </div>
            )}
          </div>

          {isExpanded && legs && legs.length > 0 && (
              <div
                  ref={directionsRef}
                  className="p-4 pb-16 overflow-y-auto"
                  style={{ maxHeight: '100%' }}
              >
                <div className="space-y-4">
                  {legs.map((leg: any, legIdx: number) => {
                    if (!leg) return null;

                    return (
                        <div key={legIdx} className="border-b border-gray-200 pb-4 last:border-b-0">
                          {legIdx > 0 && leg.start_address && (
                              <div className="mb-2 py-2 px-3 rounded-lg bg-gray-50 flex items-center">
                                <MapPin size={16} className="text-indigo-600 mr-2" />
                                <span className="font-medium">{leg.start_address}</span>
                              </div>
                          )}

                          {leg.steps && Array.isArray(leg.steps) && leg.steps.map((step: any, stepIdx: number) => {
                            if (!step) return null;

                            const instruction = stripHtml(step.instructions || '');

                            const maneuverIcon = () => {
                              if (step.maneuver?.includes('right'))
                                return (
                                    <CornerDownRight size={16} className="text-indigo-600 transform rotate-270" />
                                );
                              if (step.maneuver?.includes('left'))
                                return (
                                    <CornerDownRight size={16} className="text-indigo-600 transform rotate-180" />
                                );
                              return <ArrowRight size={16} className="text-indigo-600" />;
                            };

                            const transitDetails = () => {
                              if (travelMode === 'TRANSIT' && step.transit) {
                                const { line } = step.transit;
                                if (!line) return null;

                                return (
                                    <div
                                        className={`px-2 py-1 rounded-md inline-flex items-center ${
                                            line.color ? '' : 'bg-blue-100'
                                        }`}
                                        style={
                                          line.color
                                              ? { backgroundColor: line.color, color: line.text_color || 'white' }
                                              : {}
                                        }
                                    >
                              <span className="font-medium text-sm">
                                {line.short_name || line.name || ''}
                              </span>
                                    </div>
                                );
                              }
                              return null;
                            };

                            return (
                                <div key={stepIdx} className="ml-4 mb-3 last:mb-0">
                                  <div className="flex items-start mb-1">
                                    <div className="flex-shrink-0 mt-1 mr-3">{maneuverIcon()}</div>
                                    <div className="flex-grow">
                                      <div className="text-sm text-gray-700">{instruction}</div>
                                      <div className="flex items-center mt-1 text-xs text-gray-500">
                                        {step.distance && step.distance.value && (
                                            <span>{formatDistance(step.distance.value)}</span>
                                        )}
                                        {step.distance && step.duration && (
                                            <span className="mx-1">•</span>
                                        )}
                                        {step.duration && step.duration.value && (
                                            <span>{formatDuration(step.duration.value)}</span>
                                        )}
                                        {transitDetails()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            );
                          })}

                          {legIdx === legs.length - 1 && leg.end_address && (
                              <div className="mt-3 py-2 px-3 rounded-lg bg-red-50 flex items-center">
                                <MapPin size={16} className="text-red-600 mr-2" />
                                <span className="font-medium">{leg.end_address}</span>
                              </div>
                          )}
                        </div>
                    );
                  })}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default RouteInfo;