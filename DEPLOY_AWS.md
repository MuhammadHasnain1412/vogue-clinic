# Deploying Vogue Clinic to AWS (GitHub Source Method)

Since you do not have Docker installed locally, we will deploy directly from your GitHub repository. AWS App Runner will handle the building and running of your application.

## Prerequisites

1.  **AWS Console Access**: You will perform most steps in the AWS Browser Console.
2.  **GitHub Repository**: Your code is already linked to `https://github.com/MuhammadHasnain1412/vogue-clinic`.

---

## Step 1: Push Recent Changes to GitHub

We made some configuration changes (e.g., `next.config.ts`). You need to save and push these to GitHub so AWS can see them.

Run these commands in your terminal:

```powershell
git add .
git commit -m "Prepare for AWS deployment"
git push origin main
```

_(Note: Use `master` or the correct branch name if it's not `main`)_

---

## Step 2: Create the Database (RDS)

1.  Log in to the **AWS Console** and search for **RDS**.
2.  Click **Create database**.
3.  Choose **Standard create** -> **MySQL**.
4.  **Templates**: Choose **Free tier** (if eligible) or **Dev/Test**.
5.  **Settings**:
    - **DB Instance Identifier**: `vogue-clinic-db`
    - **Master username**: `admin`
    - **Master password**: _Choose a secure password and WRITE IT DOWN._
6.  **Instance configuration**: `db.t3.micro` (or similar small size).
7.  **Connectivity**:
    - **Public access**: **Yes** (Simplifies connecting from your local machine to run migrations. For higher security later, you can disable this).
    - **VPC Security Group**: Choose "Create new" -> Name it `rds-public-access`.
8.  Click **Create database**.
9.  **Wait** (5-10 mins) until status is "Available".
10. **Copy the Endpoint** (e.g., `vogue-clinic-db.xxxx.ap-south-1.rds.amazonaws.com`).

---

## Step 3: Run Database Migrations Locally

Once the database is running, you need to set up the tables from your computer.

```powershell
# Replace with your actual password and endpoint
$env:DATABASE_URL="mysql://admin:YOUR_PASSWORD@YOUR_ENDPOINT:3306/vogue_clinic"

# Push the schema to the new DB
npx prisma migrate deploy
```

---

## Step 4: Deploy with AWS App Runner

1.  Go to **AWS Console** -> **App Runner**.
2.  Click **Create service**.
3.  **Source**: Select **Source code repository**.
4.  **Connect to GitHub**: Click "Add new" to link your GitHub account if not already linked.
5.  **Repository**: Select `MuhammadHasnain1412/vogue-clinic`.
6.  **Branch**: `main` (or your active branch).
7.  **Deployment trigger**: "Automatic" (deploys every time you push to GitHub).
8.  **Build settings**:
    - **Runtime**: **Node.js 20** (or latest available).
    - **Build command**: `npm install && npx prisma generate && npm run build`
    - **Start command**: `npm start`
    - **Port**: `3000`
9.  **Service configuration**:
    - **Service name**: `vogue-clinic-web`
    - **Environment variables** (Add these):
      - `DATABASE_URL`: `mysql://admin:YOUR_PASSWORD@YOUR_ENDPOINT:3306/vogue_clinic`
      - `NEXTAUTH_SECRET`: _Random string_
      - `NEXTAUTH_URL`: _Leave blank initially_
10. Click **Create & deploy**.

App Runner will now pull your code, build it, and start the server. This may take 5-10 minutes. Once done, it will provide a default URL.
