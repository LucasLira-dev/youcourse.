

// 'use client';

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa6";
// import playlists from "@/db.json";

// export default function AllCourses() {
//     const [favoriteCourses, setFavoriteCourses] = useState<number[]>([]);
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         const saved = localStorage.getItem('favoriteCourses');
//         if (saved) {
//             setFavoriteCourses(JSON.parse(saved));
//         }
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('favoriteCourses', JSON.stringify(favoriteCourses));
//     }, [favoriteCourses]);

//     // 1. Agrupar cursos por linguagem automaticamente
//     const cursosPorLinguagem = playlists.reduce((acc, curso) => {
//         const linguagem = curso.curso.toLowerCase();
//         if (!acc[linguagem]) {
//             acc[linguagem] = [];
//         }
//         acc[linguagem].push(curso);
//         return acc;
//     }, {} as Record<string, typeof playlists>);

//     // 2. Pegar nomes das linguagens e ordenar
//     const linguagens = Object.keys(cursosPorLinguagem).sort();
//     const totalPages = linguagens.length;

//     const toggleFavorite = (courseId: number) => {
//         setFavoriteCourses(prev =>
//             prev.includes(courseId)
//                 ? prev.filter(id => id !== courseId)
//                 : [...prev, courseId]
//         );
//     };

//     const isFavorite = (courseId: number) => favoriteCourses.includes(courseId);

//     // Capitalizar primeira letra
//     const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

//     // Lógica da paginação
//     const currentLanguage = linguagens[currentPage - 1];

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const goToPrevious = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const goToNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     // Gerar números das páginas para mostrar na paginação
//     const getVisiblePages = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             // Mostrar todas as páginas se forem poucas
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i);
//             }
//         } else {
//             // Lógica para mostrar páginas com ellipsis
//             if (currentPage <= 3) {
//                 pages.push(1, 2, 3, 4, '...', totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
//             } else {
//                 pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
//             }
//         }
        
//         return pages;
//     };

//     return (
//         <section 
//             className="flex flex-col bg-[var(--background)] text-[var(--foreground)]"
//             id="all-courses"
//         >
//             <div className="flex justify-between items-center px-4 py-6 text-[var(--card-foreground)] border-b border-border">
//                 <div>
//                     <h2 className="text-2xl font-bold">
//                         Cursos de {capitalize(currentLanguage || '')}
//                     </h2>
//                     <p className="text-sm text-[var(--muted-foreground)] mt-1">
//                         {cursosPorLinguagem[currentLanguage]?.length || 0} cursos disponíveis
//                     </p>
//                 </div>
                
//                 <div className="text-right">
//                     <p className="text-sm text-[var(--muted-foreground)]">
//                         Página {currentPage} de {totalPages}
//                     </p>
//                     <p className="text-xs text-[var(--muted-foreground)]">
//                         {linguagens.length} linguagens disponíveis
//                     </p>
//                 </div>
//             </div>

//             {/* Paginação superior */}
//             <div className="flex justify-center py-4">
//                 <Pagination>
//                     <PaginationContent>
//                         <PaginationItem>
//                             <PaginationPrevious 
//                                 href="#"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     goToPrevious();
//                                 }}
//                                 className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
//                             />
//                         </PaginationItem>
                        
//                         {getVisiblePages().map((page, index) => (
//                             <PaginationItem key={index}>
//                                 {page === '...' ? (
//                                     <PaginationEllipsis />
//                                 ) : (
//                                     <PaginationLink
//                                         href="#"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             handlePageChange(page as number);
//                                         }}
//                                         isActive={currentPage === page}
//                                         className="min-w-[40px]"
//                                     >
//                                         {page}
//                                     </PaginationLink>
//                                 )}
//                             </PaginationItem>
//                         ))}
                        
//                         <PaginationItem>
//                             <PaginationNext 
//                                 href="#"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     goToNext();
//                                 }}
//                                 className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
//                             />
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             </div>

//             {/* Conteúdo dos cursos da linguagem atual */}
//             <div className="flex flex-wrap gap-4 p-4">
//                 {currentLanguage && cursosPorLinguagem[currentLanguage]?.map((curso) => (
//                     <div 
//                         key={curso.id} 
//                         className="border-b border-border bg-[var(--card)] h-full w-full sm:max-w-[260px] p-4 flex flex-col items-center rounded-md"
//                     >
//                         <Image 
//                             src={curso.imgPlaylist} 
//                             alt={curso.canal} 
//                             width={240} 
//                             height={330}
//                             className="w-full h-auto object-cover rounded-md"  
//                         />
//                         <h2 className="text-md font-semibold mt-3">{curso.canal}</h2>
//                         <p className="text-xs text-[var(--muted-foreground)] mt-1">
//                             {curso.aulas} aulas
//                         </p>

//                         <div className="flex justify-between items-center gap-3 mt-4 w-full">
//                             <Link 
//                                 href={curso.LinkPlaylist}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition-colors w-full text-center"
//                             >
//                                 Acessar
//                             </Link>
//                             {isFavorite(curso.id) ? (
//                                 <FaHeart 
//                                     className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
//                                     onClick={() => toggleFavorite(curso.id)} 
//                                 />
//                             ) : (
//                                 <CiHeart 
//                                     className="text-red-500 text-[30px] cursor-pointer hover:text-red-600 transition-colors" 
//                                     onClick={() => toggleFavorite(curso.id)} 
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Navegação rápida por linguagens */}
//             <div className="border-t border-border p-4">
//                 <h3 className="text-sm font-semibold mb-3 text-[var(--muted-foreground)]">
//                     Navegação rápida:
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                     {linguagens.map((linguagem, index) => (
//                         <button
//                             key={linguagem}
//                             onClick={() => handlePageChange(index + 1)}
//                             className={`px-3 py-1 rounded-full text-sm transition-colors ${
//                                 currentPage === index + 1
//                                     ? 'bg-red-500 text-white'
//                                     : 'bg-[var(--card)] text-[var(--card-foreground)] hover:bg-red-100 hover:text-red-600'
//                             }`}
//                         >
//                             {capitalize(linguagem)} ({cursosPorLinguagem[linguagem].length})
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Paginação inferior */}
//             <div className="flex justify-center py-4 border-t border-border">
//                 <Pagination>
//                     <PaginationContent>
//                         <PaginationItem>
//                             <PaginationPrevious 
//                                 href="#"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     goToPrevious();
//                                 }}
//                                 className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
//                             />
//                         </PaginationItem>
                        
//                         {getVisiblePages().map((page, index) => (
//                             <PaginationItem key={index}>
//                                 {page === '...' ? (
//                                     <PaginationEllipsis />
//                                 ) : (
//                                     <PaginationLink
//                                         href="#"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             handlePageChange(page as number);
//                                         }}
//                                         isActive={currentPage === page}
//                                     >
//                                         {page}
//                                     </PaginationLink>
//                                 )}
//                             </PaginationItem>
//                         ))}
                        
//                         <PaginationItem>
//                             <PaginationNext 
//                                 href="#"
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     goToNext();
//                                 }}
//                                 className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
//                             />
//                         </PaginationItem>
//                     </PaginationContent>
//                 </Pagination>
//             </div>
//         </section>
//     );
// }  


'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import playlists from "@/db.json";

export default function AllCourses() {
    const [favoriteCourses, setFavoriteCourses] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Carregar/salvar favoritos
    useEffect(() => {
        const saved = localStorage.getItem('favoriteCourses');
        if (saved) setFavoriteCourses(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('favoriteCourses', JSON.stringify(favoriteCourses));
    }, [favoriteCourses]);

    // 1. Separar cursos por linguagem
    const cursosPorLinguagem: Record<string, typeof playlists[number][]> = {};
    playlists.forEach(curso => {
        const linguagem = curso.curso.toLowerCase();
        if (!cursosPorLinguagem[linguagem]) {
            cursosPorLinguagem[linguagem] = [];
        }
        cursosPorLinguagem[linguagem].push(curso);
    });

    // 2. Lista de linguagens
    const linguagens = Object.keys(cursosPorLinguagem).sort();
    
    // 3. Linguagem atual baseada na página
    const linguagemAtual = linguagens[currentPage - 1];
    const cursosParaMostrar = cursosPorLinguagem[linguagemAtual] || [];

    const toggleFavorite = (courseId: number) => {
        setFavoriteCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const isFavorite = (courseId: number) => favoriteCourses.includes(courseId);
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <section 
            className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
            id="all-courses"
        >
            <div className="border-b border-border bg-[var(--card)]/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Cursos de {capitalize(linguagemAtual || '')}
                            </h1>
                            <p className="text-[var(--muted-foreground)] text-lg">
                                {cursosParaMostrar.length} cursos disponíveis
                            </p>
                        </div>
                        
                        <div className="text-right">
                            <div className="bg-[var(--card)] rounded-lg p-4 border">
                                <p className="text-sm text-[var(--muted-foreground)] mb-1">
                                    Página {currentPage} de {linguagens.length}
                                </p>
                                <p className="text-xs text-[var(--muted-foreground)]">
                                    {linguagens.length} linguagens disponíveis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <div className="bg-[var(--card)] rounded-lg p-4 border shadow-sm">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                                        }}
                                        className={currentPage === 1 ? "opacity-50 pointer-events-none" : "hover:bg-red-500 hover:text-white"}
                                    />
                                </PaginationItem>
                                
                                {linguagens.map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(index + 1);
                                            }}
                                            isActive={currentPage === index + 1}
                                            className={`min-w-[44px] h-[44px] ${
                                                currentPage === index + 1 
                                                    ? "bg-red-500 text-white hover:bg-red-600" 
                                                    : "hover:bg-red-100 hover:text-red-600"
                                            }`}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < linguagens.length) setCurrentPage(currentPage + 1);
                                        }}
                                        className={currentPage === linguagens.length ? "opacity-50 pointer-events-none" : "hover:bg-red-500 hover:text-white"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
                    {cursosParaMostrar.map((curso) => (
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
                                        {isFavorite(curso.id) ? (
                                            <FaHeart className="text-red-500 text-lg group-hover/heart:scale-110 transition-transform" />
                                        ) : (
                                            <CiHeart className="text-red-500 text-lg group-hover/heart:scale-110 transition-transform" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-[var(--card)] rounded-xl border p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <h3 className="text-lg font-semibold text-[var(--card-foreground)]">
                            Navegação Rápida
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Acesso direto às linguagens
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {linguagens.map((linguagem, index) => (
                            <button
                                key={linguagem}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                    currentPage === index + 1
                                        ? 'bg-red-500 text-white shadow-lg scale-105'
                                        : 'bg-[var(--background)] text-[var(--foreground)] border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                                }`}
                            >
                                <span>{capitalize(linguagem)}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                    currentPage === index + 1 
                                        ? 'bg-white/20' 
                                        : 'bg-[var(--muted-foreground)]/20'
                                }`}>
                                    {cursosPorLinguagem[linguagem].length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}