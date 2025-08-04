
export default function Footer(){
    return(
        <footer className="flex items-center justify-center p-4 bg-[var(--card)] text-[var(--foreground)] border-t border-border">
            <p className="text-sm mb-2">
                &copy; {new Date().getFullYear()} YouCourse. Todos os direitos reservados.
            </p>
        </footer>
    )
}