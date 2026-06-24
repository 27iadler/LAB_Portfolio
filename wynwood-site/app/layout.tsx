import "./globals.css";

export const metadata = {
  title: "Wynwood Tech District — Portfolio",
  description: "Companies building out of Wynwood, Miami.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
