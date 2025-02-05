'use client';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const navs = [
  { name: 'БИДНИЙ ТУХАЙ', link: '#aboutupper2' },
  { name: 'MЕНЮ', link: '/menu' },
  { name: 'ГАЛЛЕРЕЙ', link: '/gallery' },
  { name: 'САГС', link: '/order' },
];
export default function Header() {
  return (
    <div className="z-10  ">
      <div className=" hidden md:flex md:gap-7 z-10 gap-4 justify-center p-6 max-w-[900px] m-auto ">
        {navs.map((nav) => (
          <Link className="text-white" key={nav.name} href={nav.link}>
            {nav.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="mt-6 mr-4">
              <Menu size={40} color="white" className="md:hidden" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="text-2xl text-black mb-5">Цэс</div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className=" flex flex-col gap-4">
              {navs.map((nav) => (
                <Link href={nav.link} className="text-black" key={nav.name}>
                  {nav.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
