import "@/styles/globals.css";
import { MyProvider } from "@/context/appContext";

export const metadata = {
  title: "User Profile Management System",
  description: "To demonstrate Next Js skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MyProvider>
        <body>{children}</body>
      </MyProvider>
    </html>
  );
}
