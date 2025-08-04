'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import Link from "next/link";

import { MdNavigateNext } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { useState, useEffect } from "react";

type Course = { id: number; canal: string; imgPlaylist: string; link: string; };

interface CoursesProps {
    javascriptCourses: Course[];
    pythonCourses: Course[];
}

export default function InitialCourses({ javascriptCourses, pythonCourses }: CoursesProps){

    const [favoriteeCourses, setFavoriteCourses] = useState<number[]>([]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteCourses');
        if (savedFavorites) {
            try{
                const parsedFavorites = JSON.parse(savedFavorites);
                setFavoriteCourses(parsedFavorites);    
            }
            catch (error) {
                console.error("Error parsing favorite courses from localStorage:", error);
            }
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('favoriteCourses', JSON.stringify(favoriteeCourses));
    }, [favoriteeCourses])

    const toggleFavorite = (courseId: number) => {
        setFavoriteCourses(prev => 
            prev.includes(courseId) 
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const isFavorite = (courseId: number) => favoriteeCourses.includes(courseId);

    return(
        <section className="flex flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Tabs defaultValue="javascript">
                <div
                className="flex justify-between items-center p-4 text-[var(--card-foreground)]">
                    <TabsList 
                    className="max-w-[200px] px-2 py-6 bg-[var(--card)]">
                        <TabsTrigger 
                        value="javascript" 
                        className="w-full data-[state=active]:bg-red-500 data-[state=active]:text-white px-3 py-4"> 
                           JavaScript 
                        </TabsTrigger>
                        <TabsTrigger 
                        value="python" 
                        className="w-full data-[state=active]:bg-red-500 data-[state=active]:text-white px-3 py-4">
                            Python
                        </TabsTrigger>
                    </TabsList>
                    <Link href="/cursos" className=" text-md text-[var(--primary)] font-semibold hover:underline">
                        Ver cursos
                        <MdNavigateNext className="inline-block ml-1" />
                    </Link>
                </div>

                <TabsContent 
                value="javascript"
                className="flex flex-wrap gap-4 p-4">
                   {javascriptCourses.map((course: { id: number; canal: string; imgPlaylist: string; link: string; }) => (
                        <div 
                        key={course.id} 
                        className=" border-b border-border bg-[var(--card)] h-full w-full sm:max-w-[260px] p-4 flex flex-col items-center rounded-md">
                            <Image 
                            src={course.imgPlaylist} 
                            alt={course.canal} 
                            width={240} 
                            height={330}
                            className="w-full h-auto object-cover rounded-md"  
                            />
                            <h2 className="text-md font-semibold mt-3">{course.canal}</h2>
                            <div className="flex justify-between items-center gap-3 mt-4 w-full">
                                <Link href={course.link} className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition-colors w-full text-center">
                                    Acessar
                                </Link>
                                { isFavorite(course.id) ? (
                                    <FaHeart 
                                    className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                    onClick={() => toggleFavorite(course.id)} />
                                ) : (
                                    <CiHeart 
                                    className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                    onClick={() => toggleFavorite(course.id)} />
                                )}
                            </div>
                        </div>
                   ))}
                </TabsContent>
               
                <TabsContent 
                    value="python"
                    className="flex flex-wrap gap-4 p-4">
                {
                    pythonCourses.map((course) => (
                        <div 
                        key={course.id} 
                        className="border-b border-border bg-[var(--card)] h-full w-full md:max-w-[260px] p-4 flex flex-col items-center rounded-md">
                            <Image 
                            src={course.imgPlaylist} 
                            alt={course.canal} 
                            width={240} 
                            height={330}
                            className="w-full h-auto object-cover rounded-md"  
                            />
                            <h2 className="text-md font-semibold mt-3">{course.canal}</h2>
                            <div className="flex justify-between items-center gap-3 mt-4 w-full">
                                <Link href={course.link} className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition-colors w-full text-center">
                                    Acessar
                                </Link>
                                {
                                    isFavorite(course.id) ? (
                                        <FaHeart 
                                        className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                        onClick={() => toggleFavorite(course.id)} />
                                    ) : (
                                        <CiHeart 
                                        className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
                                        onClick={() => toggleFavorite(course.id)} />
                                    )
                                }
                            </div>
                        </div>
                ))
                }
                </TabsContent>

            </Tabs>
        </section>
    )
}