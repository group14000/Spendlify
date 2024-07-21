import React, { useState } from 'react';
import { Menu, X, Search, User, Settings, AreaChart, ArrowLeftRightIcon, LayoutDashboardIcon } from 'lucide-react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { text: 'Dashboard', to: '/', icon: <LayoutDashboardIcon className="w-5 h-5" /> },
        { text: 'Transactions', to: '/add-transactions', icon: <ArrowLeftRightIcon className="w-5 h-5" /> },
        { text: 'Reports/Analytics', to: '/report', icon: <AreaChart className="w-5 h-5" /> },
        { text: 'Settings', to: '/settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <nav className={`border-b border-gray-200 ${styles.navbar}`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 text-2xl font-bold">
                            <img src='/logo.svg' alt='logo' className='w-36 h-10' />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.text}
                                        href={item.to}
                                        className="text-white hover:bg-text-fuchsia-500 hover:text-fuchsia-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                    >
                                        {item.icon}
                                        <span className="ml-2 text-white">{item.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 hidden sm:flex items-center justify-center">
                        <div className="relative text-fuchsia-500">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            {/* <span className="sr-only">View notifications</span> */}
                            <Link to={"/login"}>
                                <User className="h-6 w-6" />
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {menuItems.map((item) => (
                        <a
                            key={item.text}
                            href={item.to}
                            className="text-white hover:bg-gray-300 hover:text-gray-90 px-3 py-2 rounded-md text-base font-medium flex items-center"
                        >
                            {item.icon}
                            <span className="ml-2 text-white">{item.text}</span>
                        </a>
                    ))}
                    <div className="relative text-gray-600 mt-3">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <Search className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;