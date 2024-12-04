'use client';
import Footer from '@/components/footer';
import { Swipercomments } from '@/components/swipercomments';
import { Swipersnew } from '@/components/swiperimage';
import { Food } from '@/lib/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Aboutupper from '../../components/aboutupper';
import { Googlemap } from '../../components/googlemap';
import Hero from '../../components/hero';
export default function Home() {
  const [specialFood, setSpecialFood] = useState<Food[]>([]);
  const [showAd, setShowAd] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const desiredId = searchParams.get('desiredId');

  useEffect(() => {
    fetch('api/special')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSpecialFood(data);
      })
      .catch((err) => console.error('Error fetching special food:', err));

    const adTimeout = setTimeout(() => {
      setShowAd(false);
    }, 1000);

    return () => clearTimeout(adTimeout);
  }, []);

  const randomSpecialFood = specialFood[Math.floor(Math.random() * specialFood.length)];

  const choose = (id: string) => {
    router.push(`/lunch?id=${id}`);
  };

  const closeAd = () => {
    setShowAd(false);
  };

  return (
    <div>
      {showAd && randomSpecialFood && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 bg-opacity-100 flex justify-center items-center z-50">
          <div className=" p-6 rounded-md max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
            <div className="mt-4 mx-auto">
              <div className="text-3xl ml-28 text-white/80 ">Шилдэг борлуулалттай хоол</div>
              <div className="mt-4 w-full h-auto">
                <Image
                  src={randomSpecialFood.photos || '/path/to/default-image.jpg'}
                  width={600}
                  height={600}
                  alt={randomSpecialFood.name}
                  className="max-h-[600px] aspect-video object-cover rounded-md ml-3"
                  onClick={() => choose(randomSpecialFood.id)}
                />
                <div className="flex flex-col absolute left-16 bottom-16">
                  <div className="text-white md:text-2xl font-bold self-center">{randomSpecialFood.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Hero />
      <Swipersnew />
      <Aboutupper />
      <Swipercomments />
      <Googlemap />
      <Footer />
    </div>
  );
}
