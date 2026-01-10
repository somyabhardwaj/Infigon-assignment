import Image from "next/image";

export default function Home() {
  return (
      <div className=''>
            {/* Image container */}
            <div>
                <Image 
                src="/public/assets/test.jpg"
                alt="assets"
                fill
                className='object-contain p-4 group-hover:scale-105 transition-transform duration-300'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            {/* Category */}
            <div>
                <span>
                    Category
                </span>
            </div>
        </div>
  );
}
