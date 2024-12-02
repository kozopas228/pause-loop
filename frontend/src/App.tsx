import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/header/Header.tsx';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
