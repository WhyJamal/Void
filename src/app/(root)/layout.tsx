import FooterWrapper from "@/components/layout/footer-wrapper";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

      <Header />

      <main className="flex-1">
        {children}
      </main>

      <FooterWrapper />

    </div>
  );
}
