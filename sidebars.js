/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'index',
    {
      type: 'category',
      label: 'Get started',
      link: { type: 'doc', id: 'get-started/index' },
      items: [
        'get-started/index',
        'guides/contributing',
        'guides/maintain-documentation-site',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      link: { type: 'doc', id: 'architecture/index' },
      items: [
        'architecture/index',
        'architecture/repository-map',
        'architecture/data-and-integration-flow',
        'architecture/organization-blueprint',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/content-model',
        'reference/naming',
        'reference/technology-baseline',
        {
          type: 'category',
          label: 'Glossary',
          link: { type: 'doc', id: 'glossary/index' },
          items: [
            'glossary/index',
            'glossary/core-platform-terms',
            'glossary/healthcare-standards',
            'glossary/governance-operations',
            'glossary/development-deployment',
            'glossary/data-integration',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
