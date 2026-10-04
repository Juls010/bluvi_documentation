import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const baseUrl = process.env.DOCUSAURUS_BASE_URL ?? '/';

const config: Config = {
  title: 'Documentación de Bluvi',
  tagline: 'Documentación técnica y operativa de la plataforma Bluvi',
  favicon: 'img/b_azul.png',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  future: {
    v4: true,
  },

  url: 'https://juls010.github.io',
  baseUrl,

  organizationName: 'Juls010',
  projectName: 'bluvi_documentation',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Bluvi Logo',
        src: 'img/logo_b_a.svg',
        srcDark: 'img/logo_b_b.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'generalSidebar',
          position: 'left',
          label: 'Documentación General',
        },
        {
          type: 'docSidebar',
          sidebarId: 'backSidebar',
          position: 'left',
          label: 'Backend',
        },
        {
          type: 'docSidebar',
          sidebarId: 'frontSidebar',
          position: 'left',
          label: 'Frontend',
        },
        {
          type: 'docSidebar',
          sidebarId: 'mobileSidebar',
          position: 'left',
          label: 'Mobile',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {
              label: 'General',
              to: '/',
            },
            {
              label: 'Backend',
              to: '/back/intro',
            },
            {
              label: 'Frontend',
              to: '/front/intro',
            },
            {
              label: 'Mobile',
              to: '/mobile/intro',
            },
          ],
        },
      ],
    copyright: `Copyright © ${new Date().getFullYear()} Bluvi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
