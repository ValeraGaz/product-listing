import "../style/global.css";
import Header from './Header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>My Website</title>
      </head>
      <body>
        <Header /> 
        {children}
      </body>
    </html>
  );
}
