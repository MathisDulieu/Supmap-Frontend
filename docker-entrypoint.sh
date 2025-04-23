#!/bin/sh

echo "window.env = {" > /usr/share/nginx/html/env-config.js
echo "  API_BASE_URL: '${API_BASE_URL}'," >> /usr/share/nginx/html/env-config.js
echo "  GOOGLE_API_KEY: '${GOOGLE_API_KEY}'" >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js

exec "$@"