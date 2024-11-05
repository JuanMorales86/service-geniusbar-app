let userMenu;
let userDropdown;

export function initUserDropdown() {
    userMenu = document.getElementById('user-menu');
    userDropdown = document.getElementById('user-dropdown');

    userMenu.addEventListener('click', toggleDropdown);
}

export function destroyUserDropdown() {
    if (userMenu) {
        userMenu.removeEventListener('click', toggleDropdown);
    }
}

function toggleDropdown() {
    userDropdown.classList.toggle('hidden');
}

function closeDropdown() {
    userDropdown.classList.add('hidden');
}

window.addEventListener('page:before-leave', () => {
    closeDropdown();
});