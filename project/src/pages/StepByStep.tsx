// Update video URLs to use real SEO tutorial videos
const guides = [
  {
    id: 'seo-basics',
    steps: [
      {
        video: 'https://www.youtube.com/embed/DvwS7cV9GmQ', // How to Do Keyword Research
        articles: [
          { title: 'Keyword Research Guide', url: 'https://backlinko.com/keyword-research' },
          { title: 'Finding Long-tail Keywords', url: 'https://ahrefs.com/blog/long-tail-keywords/' }
        ]
      },
      {
        video: 'https://www.youtube.com/embed/8Pj-nC3I_50', // On-Page SEO Tutorial
        articles: [
          { title: 'On-Page SEO Guide', url: 'https://moz.com/learn/seo/on-page-factors' },
          { title: 'Technical SEO Checklist', url: 'https://www.semrush.com/blog/technical-seo-checklist/' }
        ]
      }
    ]
  },
  {
    id: 'content-optimization',
    steps: [
      {
        video: 'https://www.youtube.com/embed/yKODJwpL_Dk', // Content Strategy Guide
        articles: [
          { title: 'Content Strategy Guide', url: 'https://www.contentmarketinginstitute.com/developing-a-strategy/' },
          { title: 'SEO Writing Guide', url: 'https://yoast.com/complete-guide-seo-copywriting/' }
        ]
      }
    ]
  },
  {
    id: 'link-building',
    steps: [
      {
        video: 'https://www.youtube.com/embed/u7HF6JyV2Wo', // Link Building Tutorial
        articles: [
          { title: 'Link Building Guide', url: 'https://ahrefs.com/blog/link-building/' },
          { title: 'Outreach Strategies', url: 'https://backlinko.com/link-building-strategies' }
        ]
      }
    ]
  }
];

export default guides