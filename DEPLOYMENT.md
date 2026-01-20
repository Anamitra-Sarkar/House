# Deployment Guide - House Price Prediction

This guide provides step-by-step instructions for deploying the House Price Prediction application, with the Next.js frontend on Vercel and the Flask backend on Render.

## Architecture Overview

- **Frontend**: Next.js 16 application with React 19, TypeScript, and TailwindCSS
- **Backend**: Flask API with CatBoost ML model for house price predictions
- **Database**: Not required (uses pre-trained model files)
- **Deployment**: Vercel (frontend) + Render (backend)

## Prerequisites

Before starting, ensure you have:
- Git repository with your code
- Vercel account (free tier works)
- Render account (free tier works)
- Node.js 18+ installed locally
- Python 3.8+ installed locally

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Ensure your repository contains all necessary files:
   ```
   ├── app.py                 # Flask application
   ├── run.py                 # App factory for gunicorn
   ├── requirements.txt       # Python dependencies
   ├── Procfile              # Render deployment config
   ├── housepred.pkl         # Trained CatBoost model
   ├── scaler.pkl            # StandardScaler for preprocessing
   ├── house_price/          # Package with routes and utilities
   └── templates/            # HTML templates (fallback)
   ```

2. Verify your `Procfile` is correct:
   ```
   web: gunicorn app:app
   ```

3. Check your `requirements.txt` includes all necessary packages:
   ```
   Flask==3.1.2
   Flask-CORS==6.0.2
   pandas==2.3.3
   numpy==2.4.1
   scikit-learn==1.8.0
   catboost==1.2.8
   matplotlib==3.10.8
   gunicorn==23.0.0
   ```

### Step 2: Deploy to Render

1. **Create New Web Service**:
   - Log in to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Environment**:
   - **Name**: `house-price-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: Leave empty (repo root)
   - **Runtime**: Python 3

3. **Build & Deploy Settings**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `web: gunicorn app:app`

4. **Environment Variables** (add these in Render dashboard):
   ```
   MODEL_PATH=housepred.pkl
   SCALER_PATH=scaler.pkl
   FLASK_ENV=production
   ```

5. **Click "Create Web Service"**

6. **Monitor Deployment**:
   - Check the logs during build and deployment
   - Look for "Model loaded successfully" messages
   - Ensure no import errors for sklearn/catboost compatibility

### Step 3: Test Your Backend

1. **Get Your Backend URL**: Render will provide a URL like `https://house-price-backend.onrender.com`

2. **Test Health Endpoint**:
   ```bash
   curl https://your-render-url.onrender.com/health
   ```
   
   Expected response:
   ```json
   {
     "status": "healthy",
     "model_loaded": true,
     "scaler_loaded": true
   }
   ```

3. **Test Prediction Endpoint**:
   ```bash
   curl -X POST https://your-render-url.onrender.com/predict_api \
     -H "Content-Type: application/json" \
     -d '{
       "data": {
         "CRIM": 0.00632,
         "ZN": 18.0,
         "INDUS": 2.31,
         "CHAS": 0,
         "NOX": 0.538,
         "RM": 6.575,
         "Age": 65.2,
         "DIS": 4.09,
         "RAD": 1,
         "TAX": 296,
         "PTRATIO": 15.3,
         "B": 396.9,
         "LSTAT": 4.98
       }
     }'
   ```
   
   Expected response:
   ```json
   {
     "prediction": 23.88
   }
   ```

## Part 2: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend Configuration

1. **Verify Frontend Structure**:
   ```
   web/
   ├── src/
   │   ├── app/
   │   │   ├── page.tsx           # Landing page
   │   │   ├── buy/
   │   │   │   └── page.tsx       # Prediction form
   │   │   ├── layout.tsx         # Root layout
   │   │   └── globals.css        # Global styles
   │   └── lib/
   │       └── api.ts             # API client
   ├── package.json
   ├── next.config.ts
   └── tsconfig.json
   ```

2. **Update API Configuration**:
   
   The frontend uses environment variables for the API URL. Create or update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com
   ```

3. **Ensure Next.js Configuration**:
   
   Update `web/next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     reactCompiler: false,
     output: 'standalone',
     experimental: {
       optimizePackageImports: ['framer-motion', 'lucide-react']
     },
   };

   export default nextConfig;
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional, can also use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from web directory**:
   ```bash
   cd web
   vercel --prod
   ```

   **OR use Vercel Web Interface**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Framework Preset** to "Next.js"
   - Set **Root Directory** to `web`
   - Add environment variable: `NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com`
   - Click "Deploy"

### Step 3: Configure Environment Variables in Vercel

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     ```
     Name: NEXT_PUBLIC_API_URL
     Value: https://your-render-url.onrender.com
     Environment: Production, Preview, Development
     ```

2. **Redeploy** after adding environment variables if needed

### Step 4: Test Your Frontend

1. **Visit Your Deployed Frontend**: Vercel will provide a URL like `https://your-project.vercel.app`

2. **Test Key Pages**:
   - Home page loads correctly
   - Buy page displays prediction form
   - Navigation works between pages
   - Dark/light theme toggle functions

3. **Test Prediction Functionality**:
   - Fill out the prediction form with sample data
   - Submit the form
   - Verify prediction result appears
   - Check browser console for any API errors

## Environment Variables Summary

### Backend (Render)
```
MODEL_PATH=housepred.pkl
SCALER_PATH=scaler.pkl
FLASK_ENV=production
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-render-url.onrender.com
```

## Troubleshooting

### Backend Issues

1. **Model Loading Errors**:
   - Ensure `housepred.pkl` and `scaler.pkl` are in the repository
   - Check file paths in environment variables
   - Verify compatibility between sklearn versions used for training and deployment

2. **Import Errors**:
   - Ensure all dependencies are in `requirements.txt`
   - Check that CatBoost and sklearn compatibility patches are working
   - Review deployment logs for specific import failures

3. **CORS Issues**:
   - Verify CORS is properly configured in Flask app
   - Ensure frontend URL is allowed in CORS settings

### Frontend Issues

1. **API Connection Errors**:
   - Verify `NEXT_PUBLIC_API_URL` is correctly set
   - Check that backend is accessible and responding
   - Inspect browser network tab for failed requests

2. **Build Errors**:
   - Ensure Node.js version compatibility (use Node 18+)
   - Clear `.next` cache and reinstall dependencies
   - Check TypeScript errors in build logs

3. **Styling Issues**:
   - Verify TailwindCSS is properly configured
   - Check that all CSS imports are correct
   - Ensure no conflicting global styles

## Performance Optimization

### Backend (Render)
- Use Render's paid plans for better performance
- Consider using Render's persistent disks for model files
- Monitor memory usage for large model files

### Frontend (Vercel)
- Vercel automatically optimizes Next.js applications
- Enable image optimization if using images
- Consider using Vercel's analytics for monitoring

## Security Considerations

1. **API Security**:
   - Consider adding rate limiting to your Flask API
   - Implement API key authentication if needed
   - Use HTTPS for all communications

2. **Environment Variables**:
   - Never commit sensitive data to version control
   - Use different API URLs for development/production
   - Regularly rotate any secrets used

## Monitoring and Maintenance

1. **Health Checks**:
   - Monitor `/health` endpoint regularly
   - Set up alerts for service downtime
   - Track prediction accuracy over time

2. **Updates**:
   - Keep dependencies updated for security patches
   - Monitor for new versions of sklearn/catboost
   - Consider retraining models with new data

## Support

If you encounter issues during deployment:

1. Check the deployment logs for specific error messages
2. Verify all environment variables are set correctly
3. Test components individually (backend API, frontend build)
4. Consult the official documentation for Vercel and Render
5. Check the project's GitHub issues for known problems

## Quick Reference

### Useful Commands

**Local Development**:
```bash
# Backend
cd /path/to/project
python3 app.py

# Frontend (in new terminal)
cd web
npm run dev
```

**Testing API**:
```bash
# Health check
curl https://your-backend-url/health

# Prediction test
curl -X POST https://your-backend-url/predict_api \
  -H "Content-Type: application/json" \
  -d '{"data": {"CRIM": 0.00632, "ZN": 18.0, "INDUS": 2.31, "CHAS": 0, "NOX": 0.538, "RM": 6.575, "Age": 65.2, "DIS": 4.09, "RAD": 1, "TAX": 296, "PTRATIO": 15.3, "B": 396.9, "LSTAT": 4.98}}'
```

### URLs to Remember
- **Frontend (Vercel)**: `https://your-project.vercel.app`
- **Backend (Render)**: `https://your-backend.onrender.com`
- **Backend API**: `https://your-backend.onrender.com/predict_api`
- **Backend Health**: `https://your-backend.onrender.com/health`