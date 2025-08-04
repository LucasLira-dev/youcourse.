import Image from 'next/image';
import Link from 'next/link';

import { MdNavigateNext } from "react-icons/md";

export default function ImageBackground() {
    return(
        <section className="relative h-[520px] overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-950/60 z-10"></div>
        <Image
          src="/foto1.jpg"
          alt="Programming and Software Development"
          width={1920}
          height={520}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            <span className="text-slate-300 block text-xl md:text-2xl font-normal mb-2">PROGRAMMING AND SOFTWARE</span>
            DEVELOPMENT
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Melhore suas habilidades de programação com cursos gratuitos que estão disponiveis no Youtube.
          </p>

          <div
            className='flex items-center mt-3'>
                <Link
                href=""
                className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-semibold py-2 px-4 rounded-lg mt-6 transition-colors">
                    Começar Agora
                    <MdNavigateNext className="inline-block ml-1 text-[16px]" />
                </Link>
                <Link
                href='/cursos'
                className='bg-[var(--background)] hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg mt-6 ml-4 transition-colors'>
                    Ver Cursos
                </Link>
            </div>
        </div>

      </section>
    )
}