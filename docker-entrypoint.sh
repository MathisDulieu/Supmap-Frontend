#!/bin/sh

echo "API_BASE_URL: ${API_BASE_URL}"
echo "GOOGLE_API_KEY: ${GOOGLE_API_KEY}"

sed -i 's|<script src="./public/env-config.js"></script>||g' /usr/share/nginx/html/index.html
sed -i 's|<script src="/env-config.js"></script>||g' /usr/share/nginx/html/index.html

sed -i "s|<head>|<head>\n    <script>window.env = { API_BASE_URL: \"${API_BASE_URL}\", GOOGLE_API_KEY: \"${GOOGLE_API_KEY}\" };</script>|g" /usr/share/nginx/html/index.html

echo "Contenu injecté dans index.html :"
grep -A 3 "window.env" /usr/share/nginx/html/index.html

exec "$@"