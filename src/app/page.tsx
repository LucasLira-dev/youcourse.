import InitialCourses from "@/components/Courses/InitialCourses";
import FeaturedCourses from "@/components/FeaturedCourses/featureCourses";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ImageBackground from "@/components/ImageBackground/ImageBackground";
import playlists from "@/db.json";

export default function Home() {

   const javascriptCourses = playlists
    .filter(playlist => playlist.curso.toLowerCase() === 'javascript')
    .map(playlist => ({
      ...playlist,
      canal: playlist.canal ?? playlist.canal,
      imgPlaylist: playlist.imgPlaylist ?? '',
      link: playlist.LinkPlaylist
    }));

  const pythonCourses = playlists
    .filter(playlist => playlist.curso.toLowerCase() === 'python')
    .map(playlist => ({
      ...playlist,
      canal: playlist.canal ?? playlist.canal,
      imgPlaylist: playlist.imgPlaylist ?? '',
      link: playlist.LinkPlaylist
    }));


  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <ImageBackground />
      <section
      className="sm:px-14 sm:py-12">
        <InitialCourses
          javascriptCourses={javascriptCourses}
          pythonCourses={pythonCourses}
        />
        <FeaturedCourses />
      </section>
      <Footer />
    </main>
  );
}
