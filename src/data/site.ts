import type { SiteConfig, SocialLink } from '../types/index';

export const siteConfig: SiteConfig = {
    title: 'Tonatiuj Sánchez | FullStack, Next.js, Node.js, Typescript, MongoDB, PostgreSQL',
    description: 'Soy Desarrollador web completo con un fuerte compromiso con la colaboración y solución de problemas de software.',
    author: 'Tonatiuj Sánchez',
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
