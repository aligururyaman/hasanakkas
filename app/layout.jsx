import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProviderWrapper } from "@/components/Provider";
import { configDotenv } from "dotenv";




configDotenv();

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});



export const metadata = {
  title: "Hasan Akkaş",
  description: "1900den beri",
};


export default function RootLayout({ children }) {
  return (
    <ProviderWrapper>
      <html lang="en">
        <body className={`${jetbrainsMono.variable}`}>
          <Header />
          <div className="p-10">{children}</div>
          <Footer />
        </body>
      </html>
    </ProviderWrapper >
  );
}