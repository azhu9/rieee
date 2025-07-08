// import React from 'react';
import { bentoItems } from '../utils/bentoLayout';

const BentoGrid = () => {
  return (
    <div className="">
        <h1 className="text-5xl text-bold font-geist font-bold text-center">2024-25 Image Gallery</h1>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 lg:auto-rows-[160px] md:auto-rows-[150] auto-rows-[200px] gap-4 p-4 max-w-7xl mx-auto">
        {bentoItems.map(({ id, src, alt, colSpan, rowSpan }) => (
            <div
            key={id}
            className={`relative col-span-${colSpan} row-span-${rowSpan} overflow-hidden rounded-2xl shadow-md`}
            >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-2 left-3">{id}</div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default BentoGrid;