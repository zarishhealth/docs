// @ts-check
// @type {import('@docusaurus/types').Config}
const config = {
  title: 'ZarishHealth documentation',
  tagline: 'Organization guidance, architecture, and reusable resources',
  favicon: 'img/favicon/zarishhealth-favicon-web.svg',
  url: 'https://zarishhealth.github.io',
  baseUrl: '/docs/',
  organizationName: 'zarishhealth',
  projectName: 'docs',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/zarishhealth/docs/edit/main/content/',
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/brand/zarishhealth-logo-horizontal-light.svg',
    navbar: {
      title: 'ZarishHealth',
      logo: {
        alt: 'ZarishHealth logo',
        src: 'img/brand/zarishhealth-logo-horizontal-light.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/zarishhealth/docs',
          label: 'Repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Read',
          items: [
            { label: 'Getting started', to: '/get-started' },
            { label: 'Architecture', to: '/architecture' },
            { label: 'Glossary', to: '/glossary' },
          ],
        },
        {
          title: 'Contribute',
          items: [
            { label: 'Contribution guide', to: '/guides/contributing' },
            {
              label: 'GitHub repository',
              href: 'https://github.com/zarishhealth/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ZarishHealth contributors.`,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
