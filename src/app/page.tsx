import Courses from "@/components/Courses/InitialCourses";
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <ImageBackground />
      <Courses 
      javascriptCourses={javascriptCourses}
      pythonCourses={pythonCourses}
      />
    </div>
  );
}
