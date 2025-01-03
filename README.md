# Pause Loop

Pause Loop is a website designed to support health and productivity while working at a computer. I originally created it for personal use but am sharing it in case others find it helpful.

## 🌟 Description
Pause Loop offers a set of tools to maintain eye health, enhance focus, and improve overall well-being:

* **20/20/20 Timer**: encourages regular eye breaks.
* **Pomodoro Timer**: helps structure work and rest sessions.
* **Brown Noise**: creates a calming background for better concentration.
* **Breathing**: promotes stress relief and boosts overall vitality.

This program makes working at a computer more comfortable and healthier.


## 🛠 Installation & Development

```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
cd frontend
npm run dev 
```
This will launch the **React** application. You can access it at http://localhost:3000.



## 📂 Project Structure
    frontend/
    ├── public/             # Static assets (e.g., images, fonts)
    ├── src/
    │   ├── assets/         # Statis assets folder #2
    │   ├── components/     # Reusable UI components, other than shadcn
    │   ├── hooks/
    │   ├── pages/
    │   ├── shadcn/         # Only shadcn components 
    │   └── utils/
    ├── .env.development    # Local environment variables
    ├── .env.production     # Production environment variables
    ├── cloudformation.yml 
    └── deploy.sh           # Deployment script for frontend (S3 and CloudFront)

