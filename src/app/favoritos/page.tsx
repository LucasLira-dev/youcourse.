'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { BookOpen } from "lucide-react";
import playlists from "@/db.json";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

export default function Favoritos() {
    const [favoriteCourses, setFavoriteCourses] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('favoriteCourses');
        if (saved) {
            try {
                setFavoriteCourses(JSON.parse(saved));
            } catch (error) {
                console.error("Error parsing favorite courses:", error);
                setFavoriteCourses([]);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('favoriteCourses', JSON.stringify(favoriteCourses));
        }
    }, [favoriteCourses, isLoading]);

    // Pegar cursos favoritos
    const favoriteCoursesData = playlists.filter(course => 
        favoriteCourses.includes(course.id)
    );

    const toggleFavorite = (courseId: number) => {
        setFavoriteCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p className="text-[var(--muted-foreground)]">Carregando favoritos...</p>
                </div>
            </div>
        );
    }

    return (
        <>
        <Header />
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20">
            <div className="border-b border-border bg-[var(--card)]/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                                <FaHeart className="text-red-500" />
                                Meus Favoritos
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-lg">
                                {favoriteCoursesData.length} curso(s) salvos
                            </p>
                        </div>
                        
                        {favoriteCoursesData.length > 0 && (
                            <div className="bg-[var(--card)] rounded-lg p-4 border">
                                <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Seus cursos favoritos</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {favoriteCoursesData.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                <CiHeart className="w-12 h-12 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
                                Nenhum curso favoritado ainda
                            </h2>
                            <p className="text-[var(--muted-foreground)] mb-8">
                                Explore nossa biblioteca de cursos e adicione seus favoritos clicando no ícone de coração.
                            </p>
                            <Link 
                                href="/cursos"
                                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Explorar Cursos
                                <MdNavigateNext className="text-lg" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Grid de cursos favoritos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {favoriteCoursesData.map((curso) => (
                                <div 
                                    key={curso.id} 
                                    className="bg-[var(--card)] border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                                >
                                
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image 
                                            src={curso.imgPlaylist} 
                                            alt={curso.canal} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"  
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                {curso.curso}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-2 text-[var(--card-foreground)] line-clamp-2 group-hover:text-red-600 transition-colors">
                                            {curso.canal}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full font-medium">
                                                🎥 {curso.aulas} aulas
                                            </span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                                Gratuito
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link 
                                                href={curso.LinkPlaylist}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2.5 px-4 transition-colors flex items-center justify-center gap-2 group/btn"
                                            >
                                                Assistir
                                                <MdNavigateNext className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                            
                                            <button 
                                                onClick={() => toggleFavorite(curso.id)}
                                                className="p-2.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors group/heart"
                                            >
                                                <FaHeart className="text-red-500 text-lg group-hover/heart:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-[var(--card)] rounded-xl border p-6 text-center">
                            <h3 className="text-lg font-semibold mb-4">Explore mais cursos</h3>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link 
                                    href="/cursos"
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Ver todos os cursos
                                </Link>
                                <button
                                    onClick={() => {
                                        setFavoriteCourses([]);
                                    }}
                                    className="border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Limpar favoritos
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
        <Footer />
        </>
    );
}