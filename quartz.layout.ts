import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import CreatedModifiedMeta from "./quartz/components/CreatedModifiedMeta"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Obsidian vault（ソース）": "https://github.com/allusionistwiki/AllusionistLLMWiki2",
      "Quartz プロジェクト": "https://github.com/allusionistwiki/AllusionistLLMWiki2",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    CreatedModifiedMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    // グローバルグラフ（展開時）は現ページから 2 跳先に限定（リポジトリ全体にならないよう）
    Component.Graph({ globalGraph: { depth: 2 } }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), CreatedModifiedMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  // 一覧ページ（関係性マップ・登場人物一覧など）にもグラフを表示する
  // グローバルグラフ（展開時）は現ページから 2 跳先に限定
  right: [Component.Graph({ globalGraph: { depth: 2 } })],
}
