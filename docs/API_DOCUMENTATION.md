# API Documentation

This document provides comprehensive information about the Flash Loans Arbitrage Bot API endpoints, request/response formats, and authentication mechanisms.

## Authentication

### Obtaining Access Tokens

```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

### Refreshing Tokens

```
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

### Authentication Headers

All API requests (except auth endpoints) require the following header:

```
Authorization: Bearer {accessToken}
```

## Arbitrage Endpoints

### Get Arbitrage Opportunities

```
GET /api/arbitrage/opportunities
```

**Query Parameters:**
- `minProfit` (optional): Minimum profit percentage (default: 0.5)
- `limit` (optional): Maximum number of opportunities to return (default: 10)
- `tokens` (optional): Comma-separated list of token addresses to filter by

**Response:**
```json
{
  "opportunities": [
    {
      "id": "opp123456",
      "tokenIn": {
        "symbol": "ETH",
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      },
      "tokenOut": {
        "symbol": "USDC",
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      },
      "route": [
        {
          "exchange": "Uniswap V3",
          "pool": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
        },
        {
          "exchange": "SushiSwap",
          "pool": "0x397FF1542f962076d0BFE58eA045FfA2d347ACa0"
        }
      ],
      "profitUsd": 42.56,
      "profitPercentage": 1.2,
      "requiredCapital": 3500,
      "flashLoanAvailable": true,
      "timestamp": "2025-04-22T15:30:45.123Z"
    }
  ],
  "count": 1,
  "timestamp": "2025-04-22T15:31:00.000Z"
}
```

### Execute Arbitrage Opportunity

```
POST /api/arbitrage/execute
```

**Request Body:**
```json
{
  "opportunityId": "opp123456",
  "executionMethod": "flashloan", // or "wallet"
  "gasPrice": "auto", // or specific value in gwei
  "slippageTolerance": 0.5
}
```

**Response:**
```json
{
  "transactionHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "status": "pending",
  "estimatedProfit": 42.56,
  "estimatedGasCost": 0.015,
  "timestamp": "2025-04-22T15:32:10.000Z"
}
```

### Get Execution Status

```
GET /api/arbitrage/status/{transactionHash}
```

**Response:**
```json
{
  "transactionHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "status": "completed", // pending, completed, failed
  "blockNumber": 12345678,
  "actualProfit": 41.23,
  "gasCost": 0.018,
  "timestamp": "2025-04-22T15:33:45.000Z"
}
```

## Portfolio Endpoints

### Get Portfolio Summary

```
GET /api/portfolio/summary
```

**Response:**
```json
{
  "totalValueUsd": 25420.56,
  "assets": [
    {
      "token": "ETH",
      "balance": 5.2,
      "valueUsd": 15600.00,
      "percentage": 61.4
    },
    {
      "token": "USDC",
      "balance": 9820.56,
      "valueUsd": 9820.56,
      "percentage": 38.6
    }
  ],
  "performance": {
    "daily": 1.2,
    "weekly": 5.6,
    "monthly": 12.3,
    "allTime": 27.8
  },
  "timestamp": "2025-04-22T15:34:00.000Z"
}
```

### Get Transaction History

```
GET /api/portfolio/transactions
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `type` (optional): Transaction type (arbitrage, deposit, withdrawal)

**Response:**
```json
{
  "transactions": [
    {
      "id": "tx123456",
      "type": "arbitrage",
      "status": "completed",
      "profitUsd": 41.23,
      "tokens": ["ETH", "USDC"],
      "exchanges": ["Uniswap V3", "SushiSwap"],
      "transactionHash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "timestamp": "2025-04-22T15:33:45.000Z"
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

## Flash Loan Endpoints

### Get Flash Loan Providers

```
GET /api/flashloans/providers
```

**Response:**
```json
{
  "providers": [
    {
      "id": "aave",
      "name": "Aave",
      "address": "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
      "supportedTokens": [
        {
          "symbol": "ETH",
          "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          "maxLoanAmount": "5000"
        },
        {
          "symbol": "USDC",
          "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "maxLoanAmount": "10000000"
        }
      ],
      "fee": 0.09
    }
  ]
}
```

## Settings Endpoints

### Get Bot Configuration

```
GET /api/settings/bot
```

**Response:**
```json
{
  "scanInterval": 5000,
  "minProfitMargin": 0.5,
  "autoExecutionEnabled": false,
  "maxConcurrentExecutions": 1,
  "preferredNetworks": [1],
  "excludedPlatforms": [],
  "defaultExecutionStrategy": "wallet"
}
```

### Update Bot Configuration

```
PUT /api/settings/bot
```

**Request Body:**
```json
{
  "scanInterval": 3000,
  "minProfitMargin": 0.8,
  "autoExecutionEnabled": true,
  "maxConcurrentExecutions": 2,
  "preferredNetworks": [1],
  "excludedPlatforms": ["dodo"],
  "defaultExecutionStrategy": "flashloan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bot configuration updated successfully",
  "updatedAt": "2025-04-22T15:40:00.000Z"
}
```

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Error responses follow this format:

```json
{
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Invalid request parameters",
    "details": {
      "minProfit": "Must be a positive number"
    }
  }
}
```

## Rate Limiting

API requests are rate-limited to 100 requests per minute per IP address. Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1650642000
```

When rate limit is exceeded, the API returns a `429 Too Many Requests` status code.
