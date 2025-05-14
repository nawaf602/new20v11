# AWS Deployment Guide for Flash Loans Arbitrage Bot

This guide provides step-by-step instructions for deploying the Flash Loans Arbitrage Bot backend and frontend to Amazon Web Services (AWS).

**Disclaimer:** Deploying and running applications on AWS incurs costs. Ensure you understand AWS pricing and set up billing alerts. This guide assumes you have basic familiarity with AWS concepts.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [External Service Setup](#external-service-setup)
    *   [MongoDB Atlas (Database)](#mongodb-atlas-database)
    *   [Redis (Cache/Queue)](#redis-cachequeue)
3.  [Backend Deployment (AWS Elastic Beanstalk)](#backend-deployment-aws-elastic-beanstalk)
    *   [Prepare Backend Code](#prepare-backend-code)
    *   [Create Elastic Beanstalk Application](#create-elastic-beanstalk-application)
    *   [Create Elastic Beanstalk Environment](#create-elastic-beanstalk-environment)
    *   [Configure Environment Variables](#configure-environment-variables)
    *   [Deploy Backend Code](#deploy-backend-code)
4.  [Frontend Deployment (AWS Amplify)](#frontend-deployment-aws-amplify)
    *   [Prepare Frontend Code](#prepare-frontend-code)
    *   [Create Amplify App](#create-amplify-app)
    *   [Configure Build Settings](#configure-build-settings)
    *   [Configure Environment Variables (Amplify)](#configure-environment-variables-amplify)
    *   [Deploy Frontend Code](#deploy-frontend-code)
5.  [Initial User Setup](#initial-user-setup)
6.  [Troubleshooting](#troubleshooting)

## 1. Prerequisites

*   **AWS Account:** You need an active AWS account with appropriate permissions to create resources (IAM, Elastic Beanstalk, Amplify, potentially VPC, EC2, ElastiCache).
*   **AWS CLI (Optional but Recommended):** Install and configure the AWS Command Line Interface for easier management. [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
*   **Git:** For version control and potentially deploying via repository connection.
*   **Project Code:** The final `flash_loans_arbitrage_bot_vscode_final.zip` archive containing the deployment-ready code.

## 2. External Service Setup

The bot requires MongoDB and Redis. AWS offers managed services, but using external providers like MongoDB Atlas and Upstash (for Redis) can be simpler and potentially more cost-effective, especially for initial setup.

### MongoDB Atlas (Database)

1.  **Create Account:** Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  **Create Cluster:** Create a new cluster (the free M0 tier is suitable for initial deployment).
    *   Choose a cloud provider and region (preferably the same region you plan to use for AWS deployment).
    *   Configure cluster settings (name, tier, etc.).
3.  **Configure Network Access:**
    *   Go to `Network Access` under the `Security` section.
    *   Add IP Address: Add `0.0.0.0/0` to allow connections from anywhere (for simplicity during setup, **restrict this later for security**). Alternatively, find the potential outbound IP range for your Elastic Beanstalk environment and add that.
4.  **Create Database User:**
    *   Go to `Database Access` under the `Security` section.
    *   Create a new database user with `Read and write to any database` privileges.
    *   Note down the username and password securely.
5.  **Get Connection String:**
    *   Go back to your cluster `Overview` and click `Connect`.
    *   Choose `Connect your application`.
    *   Select `Node.js` driver and the appropriate version.
    *   Copy the connection string (URI). Replace `<password>` with the database user password you created.
    *   **This URI is your `MONGODB_URI` environment variable.**

### Redis (Cache/Queue)

You can use AWS ElastiCache or an external provider like [Upstash](https://upstash.com/). Upstash offers a free tier.

1.  **Create Account:** Sign up for a free account at [Upstash](https://upstash.com/).
2.  **Create Redis Database:** Create a new Redis database.
    *   Choose a name and region (preferably the same region as your AWS deployment).
3.  **Get Connection Details:**
    *   Once created, view the database details.
    *   Note down the `Endpoint` (host), `Port`, and `Password`.
    *   **These are your `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD` environment variables.**

## 3. Backend Deployment (AWS Elastic Beanstalk)

Elastic Beanstalk simplifies deploying and scaling web applications. We will use the Node.js platform.

### Prepare Backend Code

1.  **Unzip Project:** Extract the contents of `flash_loans_arbitrage_bot_vscode_final.zip`.
2.  **Navigate to Backend:** Open a terminal in the `verified_project/complete_project` directory.
3.  **Create Deployment Archive:** Create a `.zip` file containing only the necessary backend files for deployment. **Crucially, this archive must NOT contain `node_modules`**. It should include `package.json`, `package-lock.json`, `Procfile`, `dist/` (the built code), and potentially `.npmrc` if needed.
    ```bash
    # Ensure you have built the project first: npm run build
    # Create the zip file (example for Linux/macOS)
    zip -r ../backend-deployment.zip . -x "node_modules/*" "src/*" "tests/*" "coverage/*" ".git/*" "*.md" ".env*" "*.zip" "verified_project/*" "src/ui/*"
    # Adjust the exclusion patterns as needed to get only runtime files + package files + Procfile + dist/
    ```
    *Alternatively*, you can configure Elastic Beanstalk to build the project on the server, in which case you would zip the source code (`src/`, `package.json`, `package-lock.json`, `tsconfig.json`, `webpack.config.js`, `Procfile`, etc., excluding `node_modules` and `src/ui`).

### Create Elastic Beanstalk Application

1.  Go to the [AWS Elastic Beanstalk console](https://console.aws.amazon.com/elasticbeanstalk/).
2.  Click `Create Application`.
3.  Enter an `Application name` (e.g., `flash-loans-bot`).
4.  Add tags if desired.
5.  Click `Create`.

### Create Elastic Beanstalk Environment

1.  From your application page, click `Create environment`.
2.  Choose `Web server environment` and click `Select`.
3.  **Environment Name:** Enter a name (e.g., `flash-loans-bot-prod`). The `Domain` will be generated based on this.
4.  **Platform:**
    *   Select `Managed platform`.
    *   Choose `Node.js`.
    *   Select the recommended Node.js version (e.g., Node.js 20).
5.  **Application Code:**
    *   Choose `Upload your code`.
    *   Click `Upload`.
    *   Select the `backend-deployment.zip` file you created earlier.
    *   Enter a `Version label` (e.g., `v1.0.0`).
6.  **Presets:** Choose `Single instance` for initial deployment (can be changed later for scaling).
7.  **Configure More Options (Important):** Click `Configure more options` before creating the environment.
    *   **Software:**
        *   Click `Edit`.
        *   **Node command:** Ensure this is `npm start` (Elastic Beanstalk should pick this up from the `Procfile`, but verify).
    *   **Instances:** Configure instance type if needed (t3.micro or t4g.micro might be sufficient initially).
    *   **Capacity:** Configure Auto Scaling group if needed later.
    *   **Load Balancer:** An Application Load Balancer is usually created by default.
    *   **Environment properties (Crucial):**
        *   Click `Edit`.
        *   Add all the environment variables required by the backend (from your `.env` file):
            *   `NODE_ENV`: `production`
            *   `PORT`: `8081` (Elastic Beanstalk typically proxies port 80 to this)
            *   `MONGODB_URI`: (Paste the URI from MongoDB Atlas)
            *   `REDIS_HOST`: (Paste the host from Upstash/ElastiCache)
            *   `REDIS_PORT`: (Paste the port from Upstash/ElastiCache)
            *   `REDIS_PASSWORD`: (Paste the password from Upstash/ElastiCache)
            *   `JWT_SECRET`: (Generate a strong, random secret)
            *   `JWT_EXPIRATION`: `1h`
            *   `REFRESH_TOKEN_EXPIRATION`: `7d`
            *   `WEB3_PROVIDER_URL`: (Your Infura/Alchemy URL)
            *   `PRIVATE_KEY_ENCRYPTION_KEY`: (Generate a strong, random key)
        *   Click `Save`.
8.  **Create Environment:** Click `Create environment`. Deployment will take several minutes.
9.  **Note the URL:** Once the environment health is `Ok`, note the environment URL provided by Elastic Beanstalk (e.g., `flash-loans-bot-prod.eba-xxxxxxxx.us-east-1.elasticbeanstalk.com`). This is your backend API endpoint.

### Deploy Backend Code (Updates)

To update the backend, create a new `backend-deployment.zip` and use the `Upload and Deploy` button within your Elastic Beanstalk environment.

## 4. Frontend Deployment (AWS Amplify)

AWS Amplify is well-suited for deploying Next.js applications.

### Prepare Frontend Code

The frontend code is within the `src/ui` directory of the project.

### Create Amplify App

1.  Go to the [AWS Amplify console](https://console.aws.amazon.com/amplify/).
2.  Click `New app` -> `Host web app`.
3.  **Connect Repository (Recommended):** Connect your Git provider (GitHub, GitLab, Bitbucket) and select the repository containing the bot code. Follow the prompts to authorize Amplify.
    *   **Manual Deployment:** Alternatively, choose `Deploy without Git provider` and upload the frontend code manually (requires building locally first).
4.  **Select Repository & Branch:** Choose the repository and the branch you want to deploy (e.g., `main`).

### Configure Build Settings

Amplify should automatically detect the Next.js app and configure build settings. Verify them:

1.  Click `Next`.
2.  Review the build settings (`amplify.yml`). It should look something like this:
    ```yaml
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - cd src/ui # Navigate to the UI directory
            - npm install # Install UI dependencies
        build:
          commands:
            - npm run build # Build the Next.js app
      artifacts:
        baseDirectory: src/ui/.next # Output directory
        files:
          - '**/*'
      cache:
        paths:
          - src/ui/node_modules/**/*
    ```
3.  Ensure the `baseDirectory` points correctly to the Next.js build output within your project structure (`src/ui/.next`).
4.  Ensure the `preBuild` phase correctly navigates (`cd src/ui`) and installs dependencies (`npm install`).

### Configure Environment Variables (Amplify)

1.  In the Amplify console for your app, go to `App settings` -> `Environment variables`.
2.  Click `Manage variables`.
3.  Add the following environment variable required by the frontend:
    *   `NEXT_PUBLIC_API_URL`: Enter the full URL of your deployed Elastic Beanstalk backend (e.g., `http://flash-loans-bot-prod.eba-xxxxxxxx.us-east-1.elasticbeanstalk.com`). **Use `http` or `https` as appropriate.**
4.  Click `Save`.

### Deploy Frontend Code

1.  Click `Next`.
2.  Review the deployment details.
3.  Click `Save and deploy`.

Amplify will provision resources, build the frontend, and deploy it. This may take several minutes. Once complete, Amplify will provide a public URL for your frontend (e.g., `https://main.xxxxxxxxxxxxxx.amplifyapp.com`).

## 5. Initial User Setup

The project currently doesn't have an automated way to create the initial `Admin` user. You will need to add this user directly to the MongoDB database.

1.  **Connect to MongoDB:** Use MongoDB Compass or the `mongosh` shell to connect to your MongoDB Atlas cluster using the database user credentials you created.
2.  **Select Database:** Select the database used by the application (likely named based on your connection string, or a default like `test`).
3.  **Insert User:** Insert a new document into the `users` collection. You need to hash the password using `bcrypt` first. You can do this locally using a simple Node.js script:
    ```javascript
    // createAdmin.js
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const password = 'Admin602@Fn9520';

    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.error("Error hashing password:", err);
            return;
        }
        console.log("Username: Admin");
        console.log("Hashed Password:", hash);
        // Now use this hash in the MongoDB insert command
    });
    ```
    Run this script (`node createAdmin.js`) and copy the generated hash.
4.  **MongoDB Insert Command (in `mongosh`):**
    ```javascript
    db.users.insertOne({
      username: "Admin",
      password: "<PASTE_THE_GENERATED_HASH_HERE>", // Paste the hash from the script
      email: "admin@example.com", // Use a placeholder or real email
      role: "admin", // Assuming an admin role exists or is handled
      createdAt: new Date(),
      updatedAt: new Date()
    });
    ```
5.  You should now be able to log in to the frontend using `Admin` and `Admin602@Fn9520`.

## 6. Troubleshooting

*   **Elastic Beanstalk Errors:** Check the environment logs in the Elastic Beanstalk console (`Logs` section) for detailed error messages.
*   **Amplify Build Failures:** Review the build logs in the Amplify console. Ensure dependencies are correct and build commands are accurate in `amplify.yml`.
*   **Connection Issues (Backend):** Double-check environment variables in Elastic Beanstalk (database URI, Redis details). Ensure MongoDB Atlas network access allows connections from Elastic Beanstalk.
*   **Connection Issues (Frontend):** Verify the `NEXT_PUBLIC_API_URL` in Amplify points to the correct Elastic Beanstalk URL (HTTP/HTTPS). Check browser developer console for network errors.
*   **CORS Errors:** Ensure the backend (`cors` middleware in `src/index.ts`) is configured correctly if the frontend and backend are on different domains (which they will be).
*   **502 Bad Gateway (Elastic Beanstalk):** Often indicates the backend application failed to start correctly. Check Elastic Beanstalk logs.

This guide provides a comprehensive overview. Specific configurations might need adjustments based on your exact AWS setup and security requirements.
