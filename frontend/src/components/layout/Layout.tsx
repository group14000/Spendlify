import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import styles from "./Layout.module.css";


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className={`flex-grow p-4 ${styles.layout}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;