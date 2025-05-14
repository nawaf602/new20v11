# Installation Guide

This guide provides detailed instructions for setting up the Flash Loans Arbitrage Bot on your system.

## Prerequisites

Before installation, ensure you have the following prerequisites:

- **Node.js**: Version 20.x or higher
- **MongoDB**: Version 5.0 or higher
- **Redis**: Version 6.0 or higher
- **Git**: For cloning the repository
- **Ethereum Node Access**: Via Infura, Alchemy, or your own node

## System Requirements

- **CPU**: 4+ cores recommended
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 20GB free space
- **Network**: Stable internet connection with low latency

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/nawaf602/NBot.git
cd NBot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit the `.env.local` file with your specific configuration:

- Set your MongoDB connection string
- Configure your Redis URL
- Add your Web3 provider URL (Infura/Alchemy)
- Set your JWT secret for authentication
- Configure flash loan provider addresses

### 4. Database Setup

Ensure MongoDB is running, then initialize the database:

```bash
npm run db:setup
```

### 5. Build the Application

```bash
npm run build
```

### 6. Start the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm run start
```

## Verification

After installation, verify the setup by:

1. Accessing the web interface at `http://localhost:3000`
2. Logging in with the default credentials (admin/admin)
3. Changing the default password immediately
4. Verifying connection to blockchain networks
5. Testing a small transaction to ensure proper configuration

## Troubleshooting

### Common Issues

1. **Connection Errors**:
   - Verify MongoDB and Redis are running
   - Check network connectivity to Web3 provider

2. **Authentication Issues**:
   - Ensure JWT_SECRET is properly set
   - Clear browser cookies and cache

3. **Transaction Failures**:
   - Verify wallet has sufficient funds
   - Check gas price settings
   - Ensure correct network configuration

### Support

For additional support:
- Check the logs in the `logs` directory
- Refer to the [User Guide](./USER_GUIDE.md) for operational instructions
- Consult the [API Documentation](./API_DOCUMENTATION.md) for integration details
