import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import NotificationContainer from './NotificationContainer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <NotificationContainer />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;