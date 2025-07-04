#!/bin/bash

echo "=== PM2 Status ==="
pm2 status

echo -e "\n=== PM2 Logs (Last 50 lines) ==="
pm2 logs carabao-product-check-fe --lines 50

echo -e "\n=== PM2 Process Info ==="
pm2 show carabao-product-check-fe

echo -e "\n=== Checking if port 4173 is in use ==="
netstat -tlnp | grep :4173 || echo "Port 4173 not found in use"

echo -e "\n=== Checking process on port 4173 ==="
lsof -i :4173 || echo "No process found on port 4173" 