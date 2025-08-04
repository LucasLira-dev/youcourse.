import Image from "next/image";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
    return(
        <header className="flex items-center justify-between p-4 bg-[var(--background)] text-[var(--card-foreground)] border-b border-border">
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
                    <a href="#" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                      Home 
                    </a>
                    <a href="#" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                        Cursos
                    </a>
                    <a href="#" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                        Favoritos
                    </a>
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}