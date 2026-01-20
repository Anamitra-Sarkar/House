# House Price Prediction with Machine Learning

A full-stack web application that predicts Boston housing prices using a CatBoost machine learning model. Features a modern Next.js frontend and a Flask backend API.

![House Price Prediction](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200)

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend (Render)**: [https://your-backend.onrender.com](https://your-backend.onrender.com)

## ✨ Features

### Frontend (Next.js 16 + React 19)
- 🎨 **Modern UI**: Dark/light theme with TailwindCSS 4
- 📱 **Responsive Design**: Mobile-first approach with Framer Motion animations
- 🔐 **Authentication**: Local storage-based auth system
- 📊 **Interactive Forms**: Real-time prediction with loading states
- 🎯 **Type Safety**: Full TypeScript implementation

### Backend (Flask + CatBoost)
- 🤖 **ML Model**: CatBoostRegressor with ~88% R² accuracy
- 📈 **Data Processing**: StandardScaler for feature normalization
- 🔌 **RESTful API**: Clean `/predict_api` and `/health` endpoints
- 🛡️ **CORS Enabled**: Ready for cross-origin frontend requests
- 📊 **Model Compatibility**: Sklearn compatibility patches for modern versions

## 🏗️ Architecture

```
┌─────────────────────┐    ┌──────────────────────┐
│   Next.js Frontend  │────│   Flask Backend API │
│   (Vercel Deploy)   │    │   (Render Deploy)    │
├─────────────────────┤    ├──────────────────────┤
│ • Landing Page      │    │ • /health            │
│ • Prediction Form   │    │ • /predict_api      │
│ • Auth System       │    │ • CatBoost Model    │
│ • Theme Toggle      │    │ • StandardScaler    │
└─────────────────────┘    └──────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Turbopack

### Backend
- **Framework**: Flask 3.1
- **ML**: CatBoost 1.2.8
- **Data**: pandas, numpy, scikit-learn
- **Server**: Gunicorn
- **CORS**: Flask-CORS

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Model**: Pre-trained CatBoost (pickled)

## 📊 Model Details

### Dataset: Boston Housing
- **Records**: 506 houses
- **Features**: 13 numerical features
- **Target**: Median home value (MEDV)
- **Algorithm**: CatBoostRegressor
- **Preprocessing**: StandardScaler normalization
- **Performance**: ~88% R² score

### Features Used
1. **CRIM**: Per capita crime rate by town
2. **ZN**: Proportion of residential land zoned for lots over 25,000 sq.ft.
3. **INDUS**: Proportion of non-retail business acres per town
4. **CHAS**: Charles River dummy variable (1 if tract bounds river; 0 otherwise)
5. **NOX**: Nitric oxide concentration (parts per 10 million)
6. **RM**: Average number of rooms per dwelling
7. **AGE**: Proportion of owner-occupied units built prior to 1940
8. **DIS**: Weighted distances to five Boston employment centers
9. **RAD**: Index of accessibility to radial highways
10. **TAX**: Full-value property-tax rate per $10,000
11. **PTRATIO**: Pupil-teacher ratio by town
12. **B**: 1000(Bk - 0.63)^2 where Bk is proportion of blacks by town
13. **LSTAT**: Percentage of lower status of the population

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd House-Price-Prediction
   ```

2. **Setup Backend**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run backend
   python3 app.py
   ```
   Backend runs on http://localhost:5000

3. **Setup Frontend**
   ```bash
   cd web
   
   # Install dependencies
   npm install
   
   # Create environment file
   echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
   
   # Run frontend
   npm run dev
   ```
   Frontend runs on http://localhost:3000

4. **Test the Application**
   - Visit http://localhost:3000
   - Navigate to "Buy" page
   - Fill out prediction form with sample data
   - Submit to see ML prediction

## 📱 Usage

### Prediction Form
The prediction form accepts all 13 Boston Housing features. Here's an example:

```json
{
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
```

### API Endpoints

#### Health Check
```http
GET /health
```
Response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

#### Price Prediction
```http
POST /predict_api
Content-Type: application/json

{
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
}
```
Response:
```json
{
  "prediction": 23.88
}
```

*Note: Prediction is in thousands of dollars (23.88 = $23,880)*

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (Production)
```bash
MODEL_PATH=housepred.pkl
SCALER_PATH=scaler.pkl
FLASK_ENV=production
```

## 📦 Project Structure

```
House-Price-Prediction/
├── web/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── buy/            # Prediction form
│   │   │   ├── login/          # Authentication
│   │   │   ├── signup/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── lib/
│   │   │   └── api.ts          # API client
│   │   └── app/globals.css     # Global styles
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.js
├── house_price/                 # Backend package
│   ├── __init__.py            # App factory
│   └── routes.py              # API routes
├── templates/                  # HTML templates
├── app.py                     # Flask application
├── run.py                     # Gunicorn factory
├── requirements.txt           # Python dependencies
├── Procfile                  # Render configuration
├── render.yaml               # Render deployment config
├── housepred.pkl            # Trained CatBoost model
├── scaler.pkl               # StandardScaler
└── DEPLOYMENT.md           # Detailed deployment guide
```

## 🚀 Deployment

Detailed deployment instructions are available in [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy
1. **Backend**: Deploy to Render using the provided `Procfile`
2. **Frontend**: Deploy to Vercel with Next.js preset
3. **Configure**: Set environment variables for API URLs

## 🧪 Testing

### Backend Testing
```bash
# Health check
curl http://localhost:5000/health

# Prediction test
curl -X POST http://localhost:5000/predict_api \
  -H "Content-Type: application/json" \
  -d '{"data": {"CRIM": 0.00632, "ZN": 18.0, "INDUS": 2.31, "CHAS": 0, "NOX": 0.538, "RM": 6.575, "Age": 65.2, "DIS": 4.09, "RAD": 1, "TAX": 296, "PTRATIO": 15.3, "B": 396.9, "LSTAT": 4.98}}'
```

### Frontend Testing
```bash
cd web
npm run build        # Test production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

## 🐛 Troubleshooting

### Common Issues

1. **Model Loading Errors**
   - Ensure `housepred.pkl` and `scaler.pkl` are present
   - Check sklearn version compatibility

2. **CORS Issues**
   - Verify CORS configuration in Flask app
   - Check frontend API URL environment variable

3. **Build Errors**
   - Clear `.next` cache and reinstall dependencies
   - Ensure Node.js 18+ is used

4. **Prediction Errors**
   - Verify all 13 features are provided
   - Check feature value ranges and data types

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Boston Housing dataset from sklearn.datasets
- CatBoost for gradient boosting
- Next.js and React communities
- Vercel and Render for hosting platforms

## 📈 Performance

- **Model Accuracy**: ~88% R² score
- **Prediction Speed**: <100ms response time
- **Frontend Load**: <2s initial page load
- **Backend Startup**: ~5s cold start (Render)

## 🔮 Future Enhancements

- [ ] Model retraining pipeline
- [ ] Database integration for user data
- [ ] Real estate API integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app with React Native
- [ ] Multiple model comparison

---

**Built with ❤️ using Next.js, Flask, and CatBoost**