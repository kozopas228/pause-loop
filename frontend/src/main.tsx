import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFoundPage from '@/pages/not-found/NotFoundPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { ThemeProvider } from '@/shadcn/components/theme-provider.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import BreathingPage from '@/pages/breathing/BreathingPage.tsx';
import NoisePage from '@/pages/noise/NoisePage.tsx';
import PomodoroPage from '@/pages/pomodoro/PomodoroPage.tsx';
import VisionPage from '@/pages/vision/VisionPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/breathing',
                element: <BreathingPage />,
            },
            {
                path: '/noise',
                element: <NoisePage />,
            },
            {
                path: '/pomodoro',
                element: <PomodoroPage />,
            },
            {
                path: '/vision',
                element: <VisionPage />,
            },
        ],
        errorElement: <NotFoundPage />,
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
