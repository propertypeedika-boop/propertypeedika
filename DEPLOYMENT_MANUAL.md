# 🚀 MERN Stack Deployment Guide

This guide explains how to deploy your application using the industry-standard split hosting method:
- **Backend (API)** -> Hosted on **Render**
- **Frontend (React)** -> Hosted on **Vercel**

---

## 🟢 Part 1: Deploy Backend to Render

Render is excellent for Node.js backends because it provides a persistent server environment.

### 1. Create New Web Service
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** button and select **Web Service**
3. Select **Build and deploy from a Git repository**
4. Connect your GitHub repository: `propertypeedika`

### 2. Configure Service Settings
Fill in the details exactly as below:

| Setting | Value |
|---------|-------|
| **Name** | `propertypeedika-api` (or similar) |
| **Region** | Singapore (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `server` (⚠️ IMPORTANT) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

### 3. Add Environment Variables
Scroll down to **Environment Variables** and add these keys (copy values from your local `.env`):

- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NODE_ENV` = `production`
- `ALLOWED_ORIGINS` = `https://your-vercel-frontend-url.vercel.app` (You will update this later after Vercel deploy)

### 4. Deploy
Click **Create Web Service**. Render will start building.
*Note: The free tier spins down after inactivity, so the first request might take 50 seconds.*

**✅ Copy your Render Backend URL** (e.g., `https://propertypeedika-api.onrender.com`)

---

## ▲ Part 2: Deploy Frontend to Vercel

Vercel is the best platform for React frontends.

### 1. Import Project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `propertypeedika` repository

### 2. Configure Project
| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `./` (Leave default) |

### 3. Environment Variables
Add the following variable so your frontend knows where the backend is:

- `VITE_API_URL` = `YOUR_RENDER_BACKEND_URL/api`
  - Example: `https://propertypeedika-api.onrender.com/api`
  - **Note:** Make sure to include `/api` at the end if your routes are prefixed with it.

### 4. Deploy
Click **Deploy**. Vercel will build your React app.

---

## 🔗 Part 3: Connect Them

Now that both are deployed, you need to tell the Backend to accept requests from the Frontend.

1. Copy your **Vercel Frontend URL** (e.g., `https://propertypeedika.vercel.app`)
2. Go back to **Render Dashboard** -> **Environment Variables**
3. Edit `ALLOWED_ORIGINS` and paste your Vercel URL.
   - If you have multiple, separate with commas: `https://propertypeedika.vercel.app,http://localhost:5173`
4. **Save Changes** in Render (it might auto-redeploy).

---

## 🎉 Done!

- Your **Frontend** is served fast via Vercel's CDN.
- Your **Backend** runs securely on Render.
- They talk to each other via the API URL.

### Troubleshooting
- **CORS Error?** Check `ALLOWED_ORIGINS` in Render matches your Vercel URL exactly (no trailing slash).
- **Images not loading?** Check Cloudinary credentials in Render.
- **Login failing?** Check `MONGODB_URI` in Render.
