import React from 'react';

const MapRouteAnimation: React.FC = () => {
    return (
        <div className="map-animation-container">
            <div className="absolute inset-0 bg-[#0a0c15] opacity-80"></div>

            <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 80 0 L 0 0 0 80"
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="0.5"
                            opacity="0.3"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <svg
                className="absolute w-full h-full"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <marker id="startMarker" viewBox="0 0 24 24" refX="12" refY="12"
                            markerWidth="12" markerHeight="12" orient="auto">
                        <path d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z"
                              fill="#4ade80" />
                    </marker>

                    <marker id="endMarker" viewBox="0 0 24 24" refX="12" refY="12"
                            markerWidth="12" markerHeight="12" orient="auto">
                        <path d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z"
                              fill="#ef4444" />
                    </marker>

                    <marker id="stopMarker" viewBox="0 0 24 24" refX="12" refY="12"
                            markerWidth="10" markerHeight="10" orient="auto">
                        <path d="M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z"
                              fill="#f59e0b" />
                    </marker>

                    <symbol id="trafficJam" viewBox="0 0 24 24" width="24" height="24">
                        <circle cx="12" cy="12" r="10" fill="#ef4444" fillOpacity="0.2" />
                        <path d="M4,16c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2v-4c0,-1.1 -0.9,-2 -2,-2H6c-1.1,0 -2,0.9 -2,2V16zM18,14h-4v-2h4V14zM6,14h4v-2H6V14zM10,14h4v-2h-4V14z"
                              fill="#ef4444" />
                    </symbol>

                    <symbol id="dangerAlert" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M1,21h22L12,2L1,21zM13,18h-2v-2h2V18zM13,14h-2v-4h2V14z"
                              fill="#f59e0b" />
                    </symbol>

                    <symbol id="stopIcon" viewBox="0 0 24 24" width="24" height="24">
                        <circle cx="12" cy="12" r="10" fill="#60a5fa" fillOpacity="0.2" />
                        <path d="M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10s10,-4.48 10,-10S17.52,2 12,2z M11,16H9V8h2V16zM15,16h-2V8h2V16z"
                              fill="#60a5fa" />
                    </symbol>

                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                        <feBlend in="SourceGraphic" in2="glow" mode="normal" />
                    </filter>
                </defs>

                <path
                    d="M 50,200 H 1150 M 50,400 H 1150 M 50,600 H 1150 M 200,50 V 750 M 500,50 V 750 M 700,50 V 750 M 950,50 V 750"
                    stroke="#2d3748"
                    strokeWidth="12"
                    opacity="0.5"
                />

                <path
                    d="M 100,150 H 1100 M 100,300 H 1100 M 100,500 H 1100 M 100,650 H 1100 M 350,100 V 700 M 600,100 V 700 M 800,100 V 700 M 1050,100 V 700"
                    stroke="#2d3748"
                    strokeWidth="6"
                    opacity="0.3"
                />

                <circle cx="200" cy="400" r="50" fill="rgba(239, 68, 68, 0.1)" className="pulse-slow" />
                <circle cx="950" cy="250" r="40" fill="rgba(245, 158, 11, 0.1)" className="pulse-slow" />

                <path
                    id="mainRoute"
                    d="M 50,650 C 150,600 220,550 300,500 Q 450,450 600,400 T 800,320 T 950,250 T 1100,220 L 1150,180"
                    stroke="#4f46e5"
                    strokeWidth="8"
                    strokeDasharray="15,15"
                    fill="none"
                    opacity="0.7"
                    className="route-path"
                    markerStart="url(#startMarker)"
                    markerEnd="url(#endMarker)"
                />

                <g className="stops">
                    <circle cx="300" cy="500" r="2" fill="transparent" markerStart="url(#stopMarker)" />
                    <circle cx="950" cy="250" r="2" fill="transparent" markerStart="url(#stopMarker)" />
                </g>

                <use href="#stopIcon" x="580" y="380" width="40" height="40" className="alert-icon pulse-slow" />

                <g className="vehicle">
                    <circle r="6" fill="#ffffff" filter="url(#glow)">
                        <animateMotion
                            dur="20s"
                            repeatCount="indefinite"
                            path="M 50,650 C 150,600 220,550 300,500 Q 450,450 600,400 T 800,320 T 950,250 T 1100,220 L 1150,180"
                        />
                    </circle>
                </g>

                {[...Array(10)].map((_, index) => (
                    <circle
                        key={index}
                        r={2 + Math.random() * 2}
                        fill={`rgba(${index % 2 ? '79, 70, 229' : '99, 102, 241'}, 0.8)`}
                        filter="url(#glow)"
                    >
                        <animateMotion
                            dur={`${12 + index * 3}s`}
                            repeatCount="indefinite"
                            path="M 50,650 C 150,600 220,550 300,500 Q 450,450 600,400 T 800,320 T 950,250 T 1100,220 L 1150,180"
                            keyPoints={index % 2 ? "0;1" : "1;0"}
                            keyTimes="0;1"
                            calcMode="linear"
                        />
                    </circle>
                ))}

                <g className="traffic-alerts">
                    <use href="#trafficJam" x="180" y="380" width="40" height="40" className="alert-icon pulse-slow">
                        <animateTransform
                            attributeName="transform"
                            type="scale"
                            values="1;1.2;1"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </use>

                    <use href="#dangerAlert" x="930" y="230" width="40" height="40" className="alert-icon pulse-slow">
                        <animateTransform
                            attributeName="transform"
                            type="scale"
                            values="1;1.2;1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </use>
                </g>

                <g className="poi">
                    <circle cx="250" cy="300" r="6" fill="#4ade80" opacity="0.6" className="pulse-slow" />
                    <circle cx="900" cy="450" r="6" fill="#4ade80" opacity="0.6" className="pulse-slow" />
                    <circle cx="150" cy="550" r="6" fill="#4ade80" opacity="0.6" className="pulse-slow" />
                    <circle cx="1050" cy="200" r="6" fill="#4ade80" opacity="0.6" className="pulse-slow" />
                </g>
            </svg>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-2/3 right-1/5 w-2 h-2 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute bottom-1/4 left-4/5 w-2 h-2 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-1/3 right-4/5 w-2 h-2 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute bottom-1/3 left-1/6 w-2 h-2 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-2/5 right-1/6 w-2 h-2 rounded-full bg-indigo-400/30 animate-ping"></div>
            </div>

            <style>{`
              .map-animation-container {
                position: absolute;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
              }

              .route-path {
                filter: drop-shadow(0 0 5px rgba(79, 70, 229, 0.5));
              }

              .vehicle circle {
                filter: drop-shadow(0 0 8px white);
              }

              .alert-icon {
                transform-origin: center;
                filter: drop-shadow(0 0 5px currentColor);
              }

              @keyframes pulse-slow {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 0.9; transform: scale(1.1); }
              }

              .pulse-slow {
                animation: pulse-slow 3s ease-in-out infinite;
              }
            `}</style>
        </div>
    );
};

export default MapRouteAnimation;