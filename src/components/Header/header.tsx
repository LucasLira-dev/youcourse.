'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {

    const pathname = usePathname();


    const isActive = (path: string) => {
        if(path === '/'){
            return pathname === '/'
        }
        return pathname.startsWith(path);
    }

    const activeLinkClass = "text-red-500 relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-red-500 after:rounded-full";
    const inactiveLinkClass = "text-[var(--foreground)] hover:text-[var(--primary)] transition-colors relative hover:after:absolute hover:after:bottom-[-8px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[var(--primary)] hover:after:rounded-full hover:after:transition-all";

    return(
        <header className="flex items-center justify-between p-4 bg-[var(--background)] text-[var(--card-foreground)] border-b border-border fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center gap-3">
                <Image 
                src="/youCourse-logo.png" 
                alt="YouCourse" 
                width={40} 
                height={40} />
                <span className="text-2xl font-bold text-[var(--primary)] hidden sm:flex">
                    YouCourse
                </span>
            </div>
            <div className="flex items-center gap-6">
                <nav className="flex gap-6">
                    <Link 
                    href="/" 
                     className={`pb-2 transition-all duration-300 ${
                    isActive('/') ? activeLinkClass : inactiveLinkClass
                    }`}>
                      Home 
                    </Link>
                    <Link href="/cursos" 
                    className={`pb-2 transition-all duration-300 ${
                    isActive('/cursos') ? activeLinkClass : inactiveLinkClass
                    }`}>
                        Cursos
                    </Link>
                    <Link 
                    href="/favoritos" 
                    className={`pb-2 transition-all duration-300 ${
                    isActive('/favoritos') ? activeLinkClass : inactiveLinkClass
                    }`}>
                        Favoritos
                    </Link>
                </nav>
            </div>
        </header>
    )
}