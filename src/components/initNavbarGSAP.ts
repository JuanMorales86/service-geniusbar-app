import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NavbarElements {
    mobileMenu: HTMLElement | null;
    menuButton: HTMLElement | null;
    closeButton: HTMLElement | null;
}

export function initNavbarGSAP(): void {
    const navbar = document.getElementById("navbar");

    if (navbar) {
        ScrollTrigger.create({
            start: 'top -100',
            end: 99999,
            onUpdate: (self) => {
                const direction = self.direction;

                gsap.to(navbar, {
                    yPercent: direction === 1 ? -100 : 0,
                    duration: 0.3,
                    ease: 'power3.inOut'
                });
            }
        });
    }
    const elements: NavbarElements = {
        mobileMenu: document.getElementById('mobile-menu'),
        menuButton: document.getElementById('mobile-menu-button'),
        closeButton: document.getElementById('close-menu'),
    };

    const handleMenuOpen = (): void => {
        gsap.to(elements.mobileMenu, {
            x: '0%',
            duration: 0.3,
            ease: 'power2.in',
        });
    };

    const handleMenuClose = (): void => {
        gsap.to(elements.mobileMenu, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in',
        });
    };

    elements.menuButton?.addEventListener('click', handleMenuOpen);
    elements.closeButton?.addEventListener('click', handleMenuClose);
}