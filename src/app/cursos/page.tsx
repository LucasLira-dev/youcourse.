import AllCourses from "@/components/Courses/AllCourses";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";

export default function Cursos() {
    return(
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
              <Header />
              <section
              className="p-4 sm:px-14 sm:py-12 mt-16">
                <div
                className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div
                    className="flex flex-col">
                        <h2
                        className="text-3xl font-bold text-[var(--foreground)] mb-1">
                            Todos os Cursos
                        </h2>
                        <p
                        className="text-md text-[var(--muted-foreground)] mb-4">
                            Explore nossa biblioteca completa de cursos de programação
                        </p>
                    </div>
                    <Link
                    href="/"
                    className="flex justify-start items-center border border-border gap-2 p-2 rounded-md mb-8 text-[14px] font-bold hover:bg-[var(--card)] transition-colors cursor-pointer max-w-[160px]">
                        <IoIosArrowBack
                        className="text-[var(--foreground)] text-[14px] cursor-pointer hover:text-[var(--primary-hover)] transition-colors "/>
                        Voltar para Home
                    </Link>
                </div>
                <AllCourses />
              </section>
              <Footer />
            </main>
    )
}