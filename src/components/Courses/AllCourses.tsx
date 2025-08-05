'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import playlists from "@/db.json";

export default function AllCourses() {
    const [favoriteCourses, setFavoriteCourses] = useState<number[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('favoriteCourses');
        if (saved) {
            setFavoriteCourses(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favoriteCourses', JSON.stringify(favoriteCourses));
    }, [favoriteCourses]);

    // 1. Agrupar cursos por linguagem automaticamente
    const cursosPorLinguagem = playlists.reduce((acc, curso) => {
        const linguagem = curso.curso.toLowerCase();
        if (!acc[linguagem]) {
            acc[linguagem] = [];
        }
        acc[linguagem].push(curso);
        return acc;
    }, {} as Record<string, typeof playlists>);

    // 2. Pegar nomes das linguagens e ordenar
    const linguagens = Object.keys(cursosPorLinguagem).sort();

    const toggleFavorite = (courseId: number) => {
        setFavoriteCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const isFavorite = (courseId: number) => favoriteCourses.includes(courseId);

    // Capitalizar primeira letra
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <section 
            className="flex flex-col bg-[var(--background)] text-[var(--foreground)]"
            id="all-courses"
        >
            <Tabs defaultValue={linguagens[0]}>
                <div className="flex justify-between items-center px-4 text-[var(--card-foreground)]">
                    <TabsList className="max-w-[400px] px-2 py-6 bg-[var(--card)]">
                        {linguagens.map((linguagem) => (
                            <TabsTrigger
                                key={linguagem}
                                value={linguagem}
                                className="w-full data-[state=active]:bg-red-500 data-[state=active]:text-white px-3 py-4"
                            >
                                {capitalize(linguagem)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* Conteúdo das tabs */}
                {linguagens.map((linguagem) => (
                    <TabsContent 
                        key={linguagem}
                        value={linguagem}
                        className="flex flex-wrap gap-4 p-4"
                    >
                        {cursosPorLinguagem[linguagem].map((curso) => (
                            <div 
                                key={curso.id} 
                                className="border-b border-border bg-[var(--card)] h-full w-full sm:max-w-[260px] p-4 flex flex-col items-center rounded-md"
                            >
                                <Image 
                                    src={curso.imgPlaylist} 
                                    alt={curso.canal} 
                                    width={240} 
                                    height={330}
                                    className="w-full h-auto object-cover rounded-md"  
                                />
                                <h2 className="text-md font-semibold mt-3">{curso.canal}</h2>
                                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                                    {curso.aulas} aulas
                                </p>

                                <div className="flex justify-between items-center gap-3 mt-4 w-full">
                                    <Link 
                                        href={curso.LinkPlaylist}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition-colors w-full text-center"
                                    >
                                        Acessar
                                    </Link>
                                    {isFavorite(curso.id) ? (
                                        <FaHeart 
                                            className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                            onClick={() => toggleFavorite(curso.id)} 
                                        />
                                    ) : (
                                        <CiHeart 
                                            className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                            onClick={() => toggleFavorite(curso.id)} 
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}