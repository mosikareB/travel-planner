import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Travel Planner",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
