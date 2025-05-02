import React, { useEffect, useState } from 'react';
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
}

const RouteInfo: React.FC<RouteInfoProps> = ({
                                               routeDetails,
                                               onClose,
                                               travelMode,
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

  useEffect(() => {
    setSelectedRoute(selectedRouteIndex);
    setShowQr(false);
  }, [selectedRouteIndex]);

  useEffect(() => {
    const alertsFromWindow = (window as any).currentRouteAlerts || [];
    setRouteAlerts(alertsFromWindow);
  }, [routeDetails, selectedRouteIndex]);

  if (!routeDetails?.routes?.length) return null;

  const routes = routeDetails.routes as any[];
  const currentRoute = routes[selectedRoute];
  const legs = currentRoute.legs as any[];

  const totalDistance = legs.reduce((sum: number, leg: any) => sum + leg.distance.value, 0);
  const totalDuration = legs.reduce((sum: number, leg: any) => sum + leg.duration.value, 0);

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
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const handleSelectRoute = (idx: number) => {
    setSelectedRoute(idx);
    onSelectRoute?.(idx);
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

    const start = legs[0].start_location;
    const end = legs[legs.length - 1].end_location;

    share(start.lat(), start.lng(), end.lat(), end.lng());
    setShowQr(true);
  };

  const alertCounts = routeAlerts.reduce((counts: {HIGH: number, MEDIUM: number, LOW: number, total: number}, alert) => {
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
          className={`route-info-panel fixed ${isMobile ? 'bottom-0 left-0 right-0 w-full' : 'bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg'} 
        bg-white rounded-t-xl shadow-2xl z-30
        transition-all duration-300 ease-in-out ${isExpanded ? 'h-4/5' : 'h-auto'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
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

        {error && (
            <div className="p-4 text-center text-red-600 text-sm">
              {error}
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
                  const dur = route.legs.reduce((s: number, l: any) => s + l.duration.value, 0);
                  const dist = route.legs.reduce((s: number, l: any) => s + l.distance.value, 0);
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

        {isExpanded && (
            <div className="overflow-y-auto p-4 pb-16" style={{ maxHeight: 'calc(100% - 180px)' }}>
              <div className="space-y-4">
                {legs.map((leg: any, legIdx: number) => (
                    <div key={legIdx} className="border-b border-gray-200 pb-4 last:border-b-0">
                      {legIdx > 0 && (
                          <div className="mb-2 py-2 px-3 rounded-lg bg-gray-50 flex items-center">
                            <MapPin size={16} className="text-indigo-600 mr-2" />
                            <span className="font-medium">{leg.start_address}</span>
                          </div>
                      )}

                      {leg.steps.map((step: any, stepIdx: number) => {
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
                            {line.short_name || line.name}
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
                                    <span>{formatDistance(step.distance.value)}</span>
                                    <span className="mx-1">•</span>
                                    <span>{formatDuration(step.duration.value)}</span>
                                    {transitDetails()}
                                  </div>
                                </div>
                              </div>
                            </div>
                        );
                      })}

                      {legIdx === legs.length - 1 && (
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