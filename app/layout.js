import Layout from "@/components/Layout/Layout";

import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ReactQuery from "@/components/Providers/ReactQuery";
import Provider from "@/Redux/Provider/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const westcoast = localFont({
  src: "../public/fonts/westcoast/Westcoast.ttf",
  variable: "--font-westcoast",
});

const westcoastline = localFont({
  src: "../public/fonts/westcoast/WestcoastLine.ttf",
  variable: "--font-westcoastline",
});

const krakens = localFont({
  src: "../public/fonts/TheKrakens/krakens.ttf",
  variable: "--font-krakens",
});

export const metadata = {
  title: "Candy Kush - Admin Panel",
};

export default function RootLayout({ children, params }) {

  return (
    <ReactQuery>
      <html lang={params.lang}>
        <body
          suppressHydrationWarning={true}
          className={`${poppins.className} ${westcoast.variable}  ${westcoastline.variable} bg-gray-100  ${krakens.variable} flex`}
        >
          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </body>
      </html>
    </ReactQuery>
  );
}
