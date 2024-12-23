import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "GForm Quick Submit",
  tagline: "Google Form Quick Submit",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://gform-quick-submit.toakiryu.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "toakiryu", // Usually your GitHub org/user name.
  projectName: "gform-quick-submit", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    localeConfigs: {
      ja: {
        htmlLang: "ja-JP",
      },
      en: {
        htmlLang: "en-US",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/toakiryu/gform-quick-submit/tree/main/docs/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/toakiryu/gform-quick-submit/tree/main/docs/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    liveCodeBlock: {
      playgroundPosition: "bottom",
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // announcementBar: {
    //   id: "announcementBar-v20241223.1445.1",
    //   content: `🎉️ <b><a target="_blank" href="https://***">Hello</a></b> 🥳️`,
    // },
    prism: {
      additionalLanguages: [
        "java",
        "latex",
        "haskell",
        "matlab",
        "php",
        "powershell",
        "bash",
        "diff",
        "json",
        "scss",
        "tsx",
        "jsx",
      ],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "This will error",
        },
      ],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "GForm Quick Submit",
      logo: {
        alt: "GForm Quick Submit Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "documentSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/changelog", label: "Changelog", position: "left" },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              type: "html",
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              href: "https://github.com/toakiryu/gform-quick-submit/tree/main/docs/i18n/",
              label: "Help Us Translate",
            },
          ],
        },
        {
          href: "https://github.com/toakiryu/qform-quick-submit",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/category/tutorial",
            },
          ],
        },
        {
          title: "Creator",
          items: [
            {
              label: "Discord",
              href: "https://l.toakiryu.com/discord",
            },
            {
              label: "X",
              href: "https://l.toakiryu.com/x",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/toakiryu/gform-quick-submit",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} QForm Quick Submit. Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,

  themes: ["@docusaurus/theme-live-codeblock"],
};

export default config;
