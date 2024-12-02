# Pause Loop

// here will be project description


## 🚀 Features
* **Frontend**:
  * Built with [**React**](https://react.dev/) and [**Vite**](https://vite.dev/).
  * Styled with [**TailwindCSS**](https://tailwindcss.com/) and [**ShadCN**](https://ui.shadcn.com/).
  * [**Redux Toolkit**](https://redux-toolkit.js.org/) for global storage.



## 🛠 Installation

```bash
cd ../frontend
npm install
```

## 💻 Development

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
    │   ├── services/       # Requests to API
    │   ├── shadcn/         # Only shadcn components
    │   ├── store/          # Configured Redux
    │   ├── types/          
    │   └── utils/
    ├── .env.development    # Local environment variables
    ├── .env.production     # Production environment variables
    ├── cloudformation.yml 
    └── deploy.sh           # Deployment script for frontend (S3 and CloudFront)

