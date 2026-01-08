import React, { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "@/hooks/useLenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
