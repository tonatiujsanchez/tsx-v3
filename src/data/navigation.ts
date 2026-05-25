import type { NavItem } from '../types/index';

export const navItems: NavItem[] = [
    {
        label: 'Inicio',
        href: '#hola',
        icon: 'bxs-home',
        ariaLabel: 'Inicio',
        mobileOnly: true,
    },
    {
        label: 'Experiencia',
        href: '#experiencia',
        icon: 'bx-laptop',
        ariaLabel: 'Experiencia',
    },
    {
        label: 'Proyectos',
        href: '#proyectos',
        icon: 'bxs-briefcase-alt-2',
        ariaLabel: 'Proyectos',
    },
    {
        label: 'Habilidades',
        href: '#habilidades',
        icon: 'bx-code-alt',
        ariaLabel: 'Habilidades',
    },
    {
        label: 'Contacto',
        href: '#contacto',
        icon: 'bxs-envelope',
        ariaLabel: 'Contacto',
    },
];
