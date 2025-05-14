# Deployment Guide

This document provides detailed instructions for deploying the Flash Loans Arbitrage Bot in various environments, from development to production.

## Deployment Options

The Flash Loans Arbitrage Bot can be deployed in several ways:

1. **Local Development Environment**
2. **Dedicated Server Deployment**
3. **Cloud Deployment**
4. **Docker Containerized Deployment**

## Prerequisites for All Deployments

- Node.js v20.x or higher
- MongoDB v5.0 or higher
- Redis v6.0 or higher
- Access to Ethereum node (Infura, Alchemy, or self-hosted)
- SSL certificate for production deployments

## Local Development Deployment

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/nawaf602/NBot.git
cd NBot
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your development settings
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application at `http://localhost:3000`

## Dedicated Server Deployment

### Server Requirements

- Ubuntu 20.04 LTS or later
- 4+ CPU cores
- 16GB+ RAM
- 50GB+ SSD storage
- Static IP address

### Setup Steps

1. Update the server:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Install MongoDB:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. Install Redis:
```bash
sudo apt install redis-server -y
sudo systemctl enable redis-server
```

5. Clone and set up the application:
```bash
git clone https://github.com/nawaf602/NBot.git
cd NBot
npm install
npm run build
```

6. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with production settings
```

7. Set up PM2 for process management:
```bash
sudo npm install -g pm2
pm2 start npm --name "flash-loans-bot" -- start
pm2 startup
pm2 save
```

8. Set up Nginx as a reverse proxy:
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/flash-loans-bot
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/flash-loans-bot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. Set up SSL with Certbot:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Cloud Deployment

### AWS Deployment

1. **EC2 Setup**:
   - Launch an EC2 instance (t3.large or better recommended)
   - Use Ubuntu Server 20.04 LTS AMI
   - Configure security groups to allow HTTP (80), HTTPS (443), and SSH (22)

2. **Database Setup**:
   - Option 1: Use MongoDB Atlas for managed MongoDB
   - Option 2: Set up MongoDB on a separate EC2 instance
   - Option 3: Use Amazon DocumentDB (MongoDB compatible)

3. **Redis Setup**:
   - Option 1: Use ElastiCache for Redis
   - Option 2: Set up Redis on the same EC2 instance

4. **Application Deployment**:
   - Follow the dedicated server deployment steps above
   - Update environment variables to point to your cloud resources

### Digital Ocean Deployment

1. **Droplet Setup**:
   - Create a Droplet (4GB RAM / 2 CPU or better)
   - Choose Ubuntu 20.04 LTS
   - Add SSH keys for secure access

2. **Database Setup**:
   - Option 1: Use MongoDB Atlas
   - Option 2: Set up MongoDB on the same Droplet
   - Option 3: Use Digital Ocean Managed Databases

3. **Application Deployment**:
   - Follow the dedicated server deployment steps above

## Docker Containerized Deployment

### Prerequisites

- Docker
- Docker Compose

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/nawaf602/NBot.git
cd NBot
```

2. Create a `.env` file:
```bash
cp .env.example .env
# Edit .env with your settings
```

3. Build and start the containers:
```bash
docker-compose up -d
```

4. Access the application at `http://localhost:3000`

### Docker Compose Configuration

The repository includes a `docker-compose.yml` file with the following services:

- **app**: The main application
- **mongodb**: MongoDB database
- **redis**: Redis cache
- **nginx**: Nginx reverse proxy

## Scaling Considerations

### Horizontal Scaling

For high-volume deployments, consider:

1. **Load Balancing**:
   - Set up multiple application instances
   - Use Nginx or a cloud load balancer
   - Configure sticky sessions if needed

2. **Database Scaling**:
   - MongoDB replica sets for redundancy
   - Sharding for horizontal scaling
   - Consider MongoDB Atlas for managed scaling

3. **Redis Clustering**:
   - Set up Redis Sentinel for high availability
   - Redis Cluster for horizontal scaling

### Monitoring and Maintenance

1. **Monitoring Setup**:
   - Prometheus for metrics collection
   - Grafana for visualization
   - Set up alerts for critical metrics

2. **Logging**:
   - ELK Stack (Elasticsearch, Logstash, Kibana)
   - Or use cloud services like AWS CloudWatch or DataDog

3. **Backup Procedures**:
   - Regular MongoDB backups
   - Database dump scripts
   - Offsite backup storage

## Deployment Checklist

Before going live, ensure:

- [ ] Environment variables are properly configured
- [ ] SSL certificates are installed and valid
- [ ] Database backups are configured
- [ ] Monitoring is set up
- [ ] Security hardening is complete
- [ ] Load testing has been performed
- [ ] Rollback procedures are documented

## Troubleshooting

### Common Issues

1. **Connection Errors**:
   - Check network configurations
   - Verify database connection strings
   - Ensure Redis is running

2. **Performance Issues**:
   - Monitor CPU and memory usage
   - Check database query performance
   - Optimize Node.js settings

3. **Deployment Failures**:
   - Check application logs
   - Verify environment variables
   - Ensure all dependencies are installed

### Support Resources

For additional deployment assistance:
- Check the logs in the `logs` directory
- Refer to the [Architecture Documentation](./ARCHITECTURE.md)
- Consult the [Security Guide](./SECURITY.md) for security best practices
