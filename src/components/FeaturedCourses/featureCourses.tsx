import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

const specialsCourses = [
    {
        id: 1,
        title: "React para Iniciantes",
        descrição: "Aprenda os fundamentos do React e construa interfaces de usuário interativas",
        link: "/cursos/desenvolvimento-web",
    },
    {
        id: 2,
        title: "Python Completo",
        descrição: "Do básico ao avançado, aprenda Python para automação, web e ciência de dados",
        link: "/cursos/canal-2"
    },
    {
        id: 3,
        title: "Javascript Avançado",
        descrição: "Do básico ao avançado, aprenda Javascript para desenvolvimento de aplicações web modernas.",
        link: "/cursos/canal-3"
    }
]

export default function FeaturedCourses() {
    return(
        <section className="bg-[var(--background)] text-[var(--foreground)] mt-15">
            <div
            className="flex justify-between items-center p-4">
                <h2
                className="text-2xl font-bold ">
                    Cursos em Destaque
                </h2>
                <Link href="/cursos" className=" text-md text-[var(--primary)] font-semibold hover:underline">
                    Ver cursos
                    <MdNavigateNext className="inline-block ml-1" />
                </Link>
            </div>
            <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"> 
                {specialsCourses.map(course => (
                    <div 
                    key={course.id}
                    className="flex flex-col items-start gap-2 bg-[var(--card)] p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
                        <h3
                        className="text-lg font-bold mb-2">
                            {course.title}
                        </h3>
                        <p
                        className="text-sm text-[var(--muted-foreground)] mb-4">
                            {course.descrição}
                        </p>
                        <Link                        
                        href={course.link}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg p-2 transition-colors w-full text-center">
                            Acessar Curso
                        </Link>
                    </div>
                ))}
            </article>
        </section>
    )
}