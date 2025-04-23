#!/bin/sh

echo "API_BASE_URL: ${API_BASE_URL}"
echo "GOOGLE_API_KEY: ${GOOGLE_API_KEY}"

cat > /usr/share/nginx/html/env-config.js << EOF
window.env = {
  API_BASE_URL: "${API_BASE_URL}",
  GOOGLE_API_KEY: "${GOOGLE_API_KEY}"
};
EOF

ls -la /usr/share/nginx/html/
cat /usr/share/nginx/html/env-config.js

exec "$@"