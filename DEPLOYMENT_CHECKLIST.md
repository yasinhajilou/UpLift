# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Ready
- [ ] All code committed to GitHub (`git push origin main`)
- [ ] `vercel.json` exists in backend folder
- [ ] No console errors in local build
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend has no syntax errors (`node -c server.js`)

### Database Ready
- [ ] MongoDB Atlas cluster created
- [ ] Database user created (username & password saved)
- [ ] Network access allowed from anywhere
- [ ] Connection string obtained and tested

### Credentials Prepared
- [ ] MongoDB connection string (MONGO_URI)
- [ ] JWT_SECRET generated (`openssl rand -hex 32`)
- [ ] Vercel account created (free tier)
- [ ] GitHub connected to Vercel

---

## 📋 Deployment Order

**DO THIS IN THIS ORDER:**

1. **Setup MongoDB** → Get MONGO_URI
2. **Deploy Backend** → Get backend URL
3. **Deploy Frontend** → Get frontend URL
4. **Update Backend** → Set FRONTEND_URL
5. **Test Everything** → Verify signup, login, logout

---

## 🔑 Environment Variables

### Backend (on Vercel)
```
MONGO_URI = mongodb+srv://USER:PASS@cluster.mongodb.net/uplift?retryWrites=true&w=majority
JWT_SECRET = (generate with: openssl rand -hex 32)
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app
```

### Frontend (in .env.local)
```
REACT_APP_API_URL = https://your-backend.vercel.app
```

---

## 🧪 Post-Deployment Tests

### Test 1: Signup
- [ ] Go to frontend URL
- [ ] Create new account
- [ ] See home page with your name
- [ ] Check browser console for no errors

### Test 2: View Flights
- [ ] Click "View Available Flights"
- [ ] See flight cards displayed
- [ ] Check flights data loaded correctly

### Test 3: Logout
- [ ] Click "Logout" button
- [ ] Redirected to login page
- [ ] Token cleared from localStorage

### Test 4: Login
- [ ] Use same email/password
- [ ] See home page with your info
- [ ] No errors in console

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "User data not available" | Check JWT_SECRET in backend env vars |
| "Failed to load flights" | Check MONGO_URI connection string |
| CORS errors | Update FRONTEND_URL in backend |
| Blank page loading | Check REACT_APP_API_URL in frontend |
| "No token provided" | Logout, clear localStorage, login again |

---

## 📱 After Going Live

1. **Share your URL**: Friends can now use your app!
2. **Monitor logs**: Check Vercel dashboard for errors
3. **Update API calls**: Any new features should use JWT auth
4. **Scale database**: Upgrade MongoDB when needed
5. **Custom domain**: Add your own domain in Vercel settings

---

## 🎓 Learning Resources

- [Vercel Docs](https://vercel.com/docs)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Atlas](https://docs.atlas.mongodb.com)
- [JWT Auth](https://jwt.io)
- [React Deployment](https://create-react-app.dev/deployment/vercel/)

---

## 💡 Pro Tips

✨ **Tip 1**: Keep MongoDB Atlas URL in .env file locally, never hardcode it

✨ **Tip 2**: Use different JWT secrets for dev and production

✨ **Tip 3**: Enable auto-scaling in MongoDB Atlas for production

✨ **Tip 4**: Check Vercel analytics to see your app's stats

✨ **Tip 5**: Setup GitHub auto-deploys (Vercel does this by default)

---

**Your app is now production-ready!** 🚀
