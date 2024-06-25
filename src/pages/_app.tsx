import { useEffect } from "react"
import { appWithTranslation } from "next-i18next"
import { init } from "@socialgouv/matomo-next"

import { AppPropsWithLayout } from "@/lib/types"

import "../styles/global.css"

import { RootLayout } from "@/layouts/RootLayout"
import { mono } from "@/lib/fonts"

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {
    if (!process.env.IS_PREVIEW_DEPLOY) {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL!,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
      })
    }
  }, [])

  // Per-Page Layouts: https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  // const direction = useLocaleDirection()

  // const theme = merge(customTheme, { direction })

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: Inter, sans-serif;
            --font-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
      {/* <ChakraProvider theme={theme}> */}
      <RootLayout
        contentIsOutdated={!!pageProps.frontmatter?.isOutdated}
        contentNotTranslated={pageProps.contentNotTranslated}
        lastDeployLocaleTimestamp={pageProps.lastDeployLocaleTimestamp}
      >
        {getLayout(<Component {...pageProps} />)}
      </RootLayout>
      {/* </ChakraProvider> */}
    </>
  )
}

export default appWithTranslation(App)
