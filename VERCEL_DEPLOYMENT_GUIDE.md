# Complete Step-by-Step Guide to Deploy on Vercel

## 📋 Prerequisites Checklist
- [ ] GitHub account (with your repo pushed)
- [ ] Vercel account (free tier) - https://vercel.com/signup
- [ ] MongoDB Atlas account (free tier) - https://www.mongodb.com/cloud/atlas
- [ ] All code committed and pushed to GitHub

---

## Part 1: Setup MongoDB Atlas (Database)

### Step 1: Create MongoDB Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Build a Database"
3. Choose **"Shared"** (free tier)
4. Select a region close to you
5. Click "Create Cluster" (takes ~3 minutes)

### Step 2: Create Database User
1. In MongoDB Atlas, go to **"Database Access"** (left sidebar)
2. Click **"+ ADD NEW DATABASE USER"**
3. Enter:
   - Username: `uplift_user` (or your choice)
   - Password: Create a strong password (save it!)
   - Method: **"Password (SCRAM)"**
4. Click "Add User"

### Step 3: Get Connection String
1. Go to **"Databases"** tab
2. Find your cluster, click **"Connect"**
3. Choose **"Connect your application"**
4. Copy the connection string that looks like:
   ```
   mongodb+srv://uplift_user:PASSWORD@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority
   ```
5. **Replace `PASSWORD` with your actual password**
6. **Replace `dbname` with `uplift`** (or any name)
7. Save this string - you'll need it!

### Step 4: Allow Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"+ ADD IP ADDRESS"**
3. Select **"Allow access from anywhere"** (for Vercel)
4. Click "Confirm"

---

## Part 2: Deploy Backend to Vercel

### Step 1: Create vercel.json in Backend
In `/backend` folder, create a file named `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Step 2: Update Backend package.json
Make sure your `backend/package.json` has these dependencies:
```json
"dependencies": {
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.1.0",
  "mongoose": "^9.3.0"
}
```

### Step 3: Commit Changes
```bash
cd backend
git add vercel.json package.json
git commit -m "Add Vercel configuration"
git push origin main
```

### Step 4: Deploy Backend to Vercel
1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your `BTS530-UpLift` repository
5. Click "Import"

### Step 5: Configure Environment Variables
1. In Vercel project settings, find **"Environment Variables"**
2. Add these variables:

| Name | Value |
|------|-------|
| `MONGO_URI` | `mongodb+srv://uplift_user:PASSWORD@cluster0.xxxxx.mongodb.net/uplift?retryWrites=true&w=majority` |
| `JWT_SECRET` | Generate one: `openssl rand -hex 32` (run in terminal) |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | (Leave blank for now, update after frontend deploys) |

3. Click "Save"

### Step 6: Select Root Directory
1. In Vercel, go to **"Settings"** → **"Root Directory"**
2. Click "Edit" and select **"backend"**
3. Click "Save"

### Step 7: Deploy
1. Click **"Deploy"**
2. Wait ~2-5 minutes
3. You should see a green checkmark and a URL like: `https://uplift-backend.vercel.app`
4. **Save this URL!**

### Step 8: Test Backend
Open this in your browser (replace with your URL):
```
https://your-backend-url.vercel.app/api/flights
```

You should see flights data! ✅

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Update Frontend .env
In `/frontend`, create `.env.local`:

```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

Example:
```
REACT_APP_API_URL=https://uplift-backend.vercel.app
```

### Step 2: Build & Test Locally (Optional)
```bash
cd frontend
npm run build
```

### Step 3: Commit Changes
```bash
cd frontend
git add .env.local
git commit -m "Add frontend environment configuration"
git push origin main
```

### Step 4: Deploy Frontend to Vercel
1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your `BTS530-UpLift` repository
5. Click "Import"

### Step 5: Configure Settings
1. **Framework Preset**: Select **"Create React App"**
2. **Root Directory**: Select **"frontend"**
3. Click "Environment Variables"
4. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.vercel.app`
5. Click "Save"

### Step 6: Deploy
1. Click **"Deploy"**
2. Wait ~3-5 minutes
3. You should see your frontend URL: `https://uplift-frontend.vercel.app`

---

## Part 4: Connect Frontend & Backend (Final Step!)

### Update Backend Environment Variable
1. Go to **Backend Project** on Vercel
2. Go to **Settings** → **Environment Variables**
3. Find `FRONTEND_URL` and update it with your **Frontend URL**:
   ```
   https://uplift-frontend.vercel.app
   ```
4. Click "Save"
5. Go to **Deployments** and click **"Redeploy"** on the latest deployment

---

## Part 5: Test Everything!

### Test 1: Signup
1. Go to your frontend: `https://uplift-frontend.vercel.app`
2. Click "Create Account"
3. Fill in:
   - Name: John Doe
   - Email: john@example.com
   - Password: Test123
   - Type: Individual
4. Click "Sign Up"
5. You should see the home page with your name! ✅

### Test 2: View Flights
1. Click "View Available Flights"
2. You should see flight cards ✅

### Test 3: Logout
1. Click "Logout"
2. You should be redirected to login page ✅

### Test 4: Login Again
1. Use same email and password from signup
2. You should see your info on home page ✅

---

## 🎉 Deployment Complete!

Your URLs:
- **Frontend**: `https://uplift-frontend.vercel.app`
- **Backend**: `https://uplift-backend.vercel.app`

---

## 🐛 Troubleshooting

### Backend Not Connecting
**Error**: "Failed to load flights"

**Solution**:
1. Check `MONGO_URI` in backend environment variables
2. Check MongoDB Atlas allows network access from anywhere
3. Check `FRONTEND_URL` is set in backend

### User Info Not Showing
**Error**: "User data not available"

**Solution**:
1. Check JWT_SECRET is set in backend
2. Logout and login again
3. Check browser console for errors (F12)

### CORS Errors
**Error**: "Access to XMLHttpRequest blocked by CORS"

**Solution**:
1. Check `FRONTEND_URL` is correctly set in backend
2. Redeploy backend after changing environment variables
3. Make sure `REACT_APP_API_URL` in frontend matches backend URL exactly

### Login Not Working
**Error**: "Invalid credentials"

**Solution**:
1. Make sure you created an account first
2. Check email and password are correct
3. Check MongoDB connection is working
4. Check backend logs in Vercel

---

## 📚 Useful Vercel Commands

```bash
# Login to Vercel CLI
vercel login

# Deploy from terminal
vercel --prod

# View deployment logs
vercel logs

# Pull environment variables
vercel env pull .env.local
```

---

## 🔐 Security Notes

- ✅ JWT_SECRET should be strong and unique
- ✅ Never commit `.env` files to GitHub
- ✅ Generate new JWT_SECRET for production
- ✅ Use different credentials for dev vs production
- ✅ Enable 2FA on Vercel account

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Express.js: https://expressjs.com
- React: https://react.dev

Your project is now **live on the internet!** 🚀
