import type { Metadata } from "next";
import { Geist, Noto_Sans_KR, Nanum_Myeongjo } from "next/font/google";
import { cookies } from "next/headers";

import { StylesProvider } from "./providers";
import { ContentWrapper } from "./ui/styles";
import { RootFooter } from "@widgets/footer";
import { RootHeader } from "@widgets/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  weight: ["400", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "서울대 야구부",
  description: "서울대학교 야구부 공식 홈페이지",
};

export async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const initialDark = theme === "dark";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${notoSansKr.variable} ${nanumMyeongjo.variable}`}
      >
        <StylesProvider initialDark={initialDark}>
          <RootHeader />
          <ContentWrapper>{children}</ContentWrapper>
          <RootFooter />
        </StylesProvider>
      </body>
    </html>
  );
}
