import type { SiteConfig, SocialLink } from '../types/index';

export const siteConfig: SiteConfig = {
    title: 'Tonatiuj Sánchez | FullStack, Next.js, Node.js, Typescript, MongoDB, PostgreSQL',
    description: 'Desarrollador Full Stack con experiencia en proyectos escalables, he utilizado distintos frameworks y lenguajes de programación, logrando implementar con éxito diferentes tipos de proyectos en web, escritorio y móvil. Me destaco por cumplir con los altos estándares de experiencia de usuario, usabilidad y rendimiento.',
    author: 'Tonatiuj Sánchez',
    role: 'Desarrollador FullStack',
    email: 'tonatiujsanchez@gmail.com',
    cvPath: '/docs/Tonatiuj_Sánchez_Jiménez_CV.pdf',
    contactApi: '', // TODO: Add contact API endpoint
};

export const socialLinks: SocialLink[] = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/tonatiujsanchez/',
        icon: 'bxl-linkedin-square',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/tonatiujsanchez',
        icon: 'bxl-github',
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com/tonatiujsanchez',
        icon: 'bxl-twitter',
    },
];
