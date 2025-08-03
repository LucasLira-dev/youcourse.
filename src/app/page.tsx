import Header from "@/components/Header/header";
import ImageBackground from "@/components/ImageBackground/ImageBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <ImageBackground />
    </div>
  );
}
