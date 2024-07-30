import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cloudinary from "cloudinary"
import { ProviderWrapper } from "@/components/utilsComp/Provider";
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


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});



export default function RootLayout({ children }) {
  return (
    <ProviderWrapper>
      <html lang="en">
        <body className={`${jetbrainsMono.variable}`}>
          <div className="sm:p-10">
            <div className="mb-10">
              <Header />
            </div>
            {children}
            <Footer />
          </div>
        </body>
      </html >
    </ProviderWrapper >
  );
}