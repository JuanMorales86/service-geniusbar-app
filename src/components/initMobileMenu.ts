interface NavbarElements {
    mobileMenu: HTMLElement | null;
    menuButton: HTMLElement | null;
    closeButton: HTMLElement | null;
}

// Manage mobile menu (hamburguer icon)
export function initNavbarMobileMenu(): void {
    let lastScrollPosition: number = window.scrollY;

    const elements: NavbarElements = {
        mobileMenu: document.getElementById("mobile-menu"),
        menuButton: document.getElementById("mobile-menu-button"),
        closeButton: document.getElementById("close-menu"),
    };

    const handleScroll = (): void => {
        const currentScrollPosition: number = window.scrollY;
        if (currentScrollPosition > lastScrollPosition) {
            document.body.classList.add('scroll-down');
        } else {
            document.body.classList.remove('scroll-down');
        }
        lastScrollPosition = currentScrollPosition;
    };
    
    const handleMenuOpen = (): void => {
        elements.mobileMenu?.classList.remove('translate-x-full');
    };

    const handleMenuClose = (): void => {
        elements.mobileMenu?.classList.add('translate-x-full');
    };

    window.addEventListener('scroll', handleScroll);
    elements.menuButton?.addEventListener('click', handleMenuOpen);
    elements.closeButton?.addEventListener('click', handleMenuClose);
};
