#!/bin/bash

# Update and Upgrade
echo "Updating system..."
sudo apt-get update && sudo apt-get upgrade -y

# Install Basic Tools
echo "Installing git, curl, build-essential..."
sudo apt-get install -y git curl build-essential

# Install Latest Node.js
echo "Installing Latest Node.js..."
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
echo "Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "Installing Nginx..."
sudo apt-get install -y nginx

# Allow Nginx in Firewall
sudo ufw allow 'Nginx Full'

# Install MySQL Server
echo "Installing MySQL Server..."
sudo apt-get install -y mysql-server

# Start MySQL
sudo systemctl start mysql.service

echo "---------------------------------------------------"
echo "Setup Complete!"
echo "Next Steps:"
echo "1. Secure MySQL: sudo mysql_secure_installation"
echo "2. Clone your repo: git clone https://github.com/MuhammadHasnain1412/vogue-clinic.git"
echo "3. Setup the app and database (Refer to DEPLOY_EC2.md)"
echo "---------------------------------------------------"
