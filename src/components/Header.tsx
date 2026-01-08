import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import HamburgerMenu from "./HamburgerMenu";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Trip Planner", href: "/trip-planner" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate overlay
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }

      // Animate menu panel
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.4, ease: "power3.out" }
        );

        // Stagger nav links
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll(".nav-item"),
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const handleCloseMenu = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    }
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setIsMobileMenuOpen(false),
      });
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-display font-bold tracking-tight"
            >
              <span
                className={
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                }
              >
                WANDERLUST
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-link text-xs font-bold ${
                    isActive(item.href) ? "text-accent" : ""
                  } ${
                    isScrolled
                      ? "text-foreground/80 hover:text-accent"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/dashboard"
                className={`btn-hero text-[10px] py-2.5 px-6 font-bold shadow-none ${
                  isScrolled
                    ? ""
                    : "bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
                }`}
              >
                MY TRIPS
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <HamburgerMenu
              isOpen={isMobileMenuOpen}
              onClick={() =>
                isMobileMenuOpen ? handleCloseMenu() : setIsMobileMenuOpen(true)
              }
              isScrolled={isScrolled}
            />
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleCloseMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-background z-50 lg:hidden shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-xl font-display font-semibold">Menu</span>
              <HamburgerMenu
                isOpen={true}
                onClick={handleCloseMenu}
                isScrolled={true}
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-item block px-6 py-4 text-lg font-medium transition-colors border-b border-border/50 ${
                    isActive(item.href)
                      ? "text-accent bg-accent/5"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="p-6 border-t border-border">
              <Link
                to="/dashboard"
                className="nav-item btn-hero w-full justify-center text-sm"
              >
                My Trips
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
