import React from 'react';
import { Code, Lock, Route, AlertTriangle, Clock, Database, Globe, Terminal } from 'lucide-react';

const API: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                API Reference
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                Integrate Supmap's powerful navigation and traffic services into your applications
                with our comprehensive API suite. This guide covers basic API access, usage patterns,
                and key functionality.
            </p>

            <div id="api#authentication" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Authentication
                </h2>

                <p className="text-gray-300 mb-6">
                    All requests to the Supmap API require authentication. We use API keys to identify
                    your application and track usage limits.
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Lock className="w-5 h-5 mr-2 text-indigo-400" />
                            Obtaining API Access
                        </h4>
                    </div>
                    <div className="p-5">
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                            <li>Create a developer account at <span className="text-indigo-400">developers.supmap.com</span></li>
                            <li>Navigate to the API Dashboard</li>
                            <li>Select "Create New API Key"</li>
                            <li>
                                Choose the services you need access to
                                <div className="mt-1 ml-6 text-sm text-gray-400">
                                    Different API services may have different pricing tiers and quotas
                                </div>
                            </li>
                            <li>
                                Set restrictions for your API key
                                <div className="mt-1 ml-6 text-sm text-gray-400">
                                    You can restrict keys by IP address, HTTP referrer, or mobile app
                                </div>
                            </li>
                            <li>Copy your API key and keep it secure</li>
                        </ol>
                    </div>
                </div>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 flex justify-between items-center border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Code className="w-5 h-5 mr-2 text-indigo-400" />
                            Authentication Example
                        </h4>
                        <span className="text-xs text-gray-400">JavaScript</span>
                    </div>
                    <div className="p-0">
                        <pre className="text-gray-300 text-sm overflow-x-auto p-5">
                            <code>
{`// Add your API key to the request URL
const url = 'https://api.supmap.com/v1/routes' + 
    '?origin=48.8584,2.2945' +
    '&destination=48.8606,2.3376' +
    '&key=YOUR_API_KEY';

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Route data:', data);
  })
  .catch(error => {
    console.error('Error fetching route:', error);
  });`}
                            </code>
                        </pre>
                    </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                    <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Security Notice
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Never expose your API key in client-side code. For web applications, create a
                        proxy server to make API requests with your key. Mobile applications should use
                        app restrictions to prevent key misuse.
                    </p>
                </div>
            </div>

            <div id="api#routes" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Routes API
                </h2>

                <p className="text-gray-300 mb-6">
                    The Routes API provides directions and navigation data between locations, including
                    traffic-aware routing, turn-by-turn directions, and estimated travel times.
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Route className="w-5 h-5 mr-2 text-green-400" />
                            Core Endpoints
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="space-y-4">
                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">GET /v1/routes</h5>
                                    <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded">GET</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Calculate routes between two or more locations
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">origin</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">destination</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">waypoints</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">alternatives</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">avoid</span>
                                </div>
                            </div>

                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">GET /v1/distance-matrix</h5>
                                    <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded">GET</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Calculate travel times and distances between multiple origins and destinations
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">origins</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">destinations</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">mode</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">departure_time</span>
                                </div>
                            </div>

                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">GET /v1/route-eta</h5>
                                    <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded">GET</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Get estimated time of arrival for a specific route with traffic updates
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">route_id</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">current_location</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">departure_time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 flex justify-between items-center border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Terminal className="w-5 h-5 mr-2 text-indigo-400" />
                            Example Request & Response
                        </h4>
                        <span className="text-xs text-gray-400">Route Calculation</span>
                    </div>
                    <div className="p-0">
                        <pre className="text-gray-300 text-sm overflow-x-auto p-5">
                            <code>
{`// Request
GET https://api.supmap.com/v1/routes?origin=40.7128,-74.0060&destination=40.7484,-73.9857&alternatives=true&key=YOUR_API_KEY

// Response
{
  "status": "OK",
  "routes": [
    {
      "summary": "Broadway",
      "distance": {
        "value": 4828,
        "text": "4.8 km"
      },
      "duration": {
        "value": 1200,
        "text": "20 minutes"
      },
      "legs": [
        {
          "steps": [
            {
              "instruction": "Head north on Broadway toward W 34th St",
              "distance": { "value": 400, "text": "0.4 km" },
              "duration": { "value": 120, "text": "2 mins" },
              "start_location": { "lat": 40.7128, "lng": -74.0060 },
              "end_location": { "lat": 40.7162, "lng": -74.0037 }
            },
            // More steps...
          ]
        }
      ],
      "polyline": {
        "points": "kyrwFv_sbM}@DuBJqCN_AD..."
      }
    },
    // Alternative routes...
  ]
}`}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>

            <div id="api#alerts" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Alerts API
                </h2>

                <p className="text-gray-300 mb-6">
                    The Alerts API gives you access to real-time traffic incidents and road condition reports
                    from the Supmap community. You can both consume and contribute alerts.
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                            Core Endpoints
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="space-y-4">
                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">GET /v1/alerts</h5>
                                    <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded">GET</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Retrieve traffic incidents in a specific area
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">area</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">types</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">limit</span>
                                </div>
                            </div>

                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">POST /v1/alerts/report</h5>
                                    <span className="text-xs px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded">POST</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Report a new traffic incident to the community
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">type</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">location</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">description</span>
                                </div>
                            </div>

                            <div className="p-3 bg-[rgba(30,33,45,0.6)] rounded-lg border border-indigo-900/20">
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-white font-medium">GET /v1/alerts/route</h5>
                                    <span className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded">GET</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-2">
                                    Get incidents along a specific route
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">route_id</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">buffer</span>
                                    <span className="text-xs py-1 px-2 rounded-full bg-indigo-500/10 text-indigo-400">types</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">Alert Types</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                <span>accident</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                                <span>road_closed</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                <span>traffic_jam</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                <span>construction</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <span>police</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <span>hazard</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                                <span>weather</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                                <span>other</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">Usage Notes</h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Higher API tier required for alert reporting
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Incidents older than 2 hours automatically expire
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Abuse detection limits false reports
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Community verification improves alert accuracy
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="api#rate-limits" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Rate Limits
                </h2>

                <p className="text-gray-300 mb-6">
                    API usage is subject to rate limits to ensure fair usage and system stability.
                    These limits vary by endpoint and your subscription tier.
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-indigo-400" />
                            Rate Limit Tiers
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs text-gray-400 uppercase border-b border-indigo-900/30">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Tier</th>
                                    <th scope="col" className="px-4 py-3">Routes API</th>
                                    <th scope="col" className="px-4 py-3">Alerts API</th>
                                    <th scope="col" className="px-4 py-3">Other Endpoints</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b border-indigo-900/30">
                                    <td className="px-4 py-3 font-medium text-white">Free</td>
                                    <td className="px-4 py-3">100 requests/day</td>
                                    <td className="px-4 py-3">100 requests/day</td>
                                    <td className="px-4 py-3">50 requests/day</td>
                                </tr>
                                <tr className="border-b border-indigo-900/30">
                                    <td className="px-4 py-3 font-medium text-white">Basic</td>
                                    <td className="px-4 py-3">1,000 requests/day</td>
                                    <td className="px-4 py-3">2,000 requests/day</td>
                                    <td className="px-4 py-3">500 requests/day</td>
                                </tr>
                                <tr className="border-b border-indigo-900/30">
                                    <td className="px-4 py-3 font-medium text-white">Professional</td>
                                    <td className="px-4 py-3">10,000 requests/day</td>
                                    <td className="px-4 py-3">20,000 requests/day</td>
                                    <td className="px-4 py-3">5,000 requests/day</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium text-white">Enterprise</td>
                                    <td className="px-4 py-3">Custom limits</td>
                                    <td className="px-4 py-3">Custom limits</td>
                                    <td className="px-4 py-3">Custom limits</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-gray-400 text-sm">
                            <p>All tiers also have per-minute rate limits to prevent abuse. If you exceed your rate limits, requests will return a 429 status code.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        Rate Limit Headers
                    </h4>
                    <p className="text-gray-300 text-sm">
                        All API responses include headers to help you track your rate limit usage:<br />
                        <code className="text-indigo-300">X-RateLimit-Limit</code>: Your total request allowance<br />
                        <code className="text-indigo-300">X-RateLimit-Remaining</code>: Number of requests remaining<br />
                        <code className="text-indigo-300">X-RateLimit-Reset</code>: Time when the limit resets (Unix timestamp)
                    </p>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Additional Resources</h2>
                <p className="text-gray-300 mb-4">
                    For more detailed API documentation and additional code samples:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="#" className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors">
                        <div className="mr-4 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">Developer Portal</h3>
                            <p className="text-gray-400 text-sm">Full API documentation and playground</p>
                        </div>
                    </a>

                    <a href="#" className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors">
                        <div className="mr-4 p-2 bg-green-500/10 rounded-lg text-green-400">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">API Status Dashboard</h3>
                            <p className="text-gray-400 text-sm">Check current API operational status</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default API;