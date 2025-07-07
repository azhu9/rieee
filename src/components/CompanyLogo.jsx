import nvidia from "../assets/sponsors/nvidia.png"
import capitalone from "../assets/sponsors/capitalone.png"
import ieee from "../assets/sponsors/ieee.png"
import l3harris from "../assets/sponsors/l3harris.jpg"
import soe from "../assets/sponsors/soe.png"
import nnl from "../assets/sponsors/nnl.png"
import verizon from "../assets/sponsors/verizon.svg"
import tata from "../assets/sponsors/tata.jpg"
import pishop from "../assets/sponsors/pishop.png"

const logos = [nvidia, capitalone, ieee, l3harris, soe, nnl, verizon, tata, pishop];

const CompanyLogo = () => {
  return (
    <div className="w-full container mx-auto py-20 overflow-hidden flex  flex-col sm:flex-row sm:items-center items-start ">
      <div className="w-[300px] shrink-0 px-8 text-gray-600 border-l-4 border-blue-500 bg-white py-2 z-10 sm:text-base text-xl font-semibold sm:text-left  mb-8 sm:mb-0">
        Companies we <br /> have worked with
      </div>
      <div className="flex animate-marquee whitespace-nowrap">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company Logo ${index + 1}`}
            className="mx-12 h-8 w-36 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        ))}
        {/* Duplicate logos for seamless loop */}
        {logos.map((logo, index) => (
          <img
            key={`duplicate-${index}`}
            src={logo}
            alt={`Company Logo ${index + 1}`}
            className="mx-12 h-8 w-36 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogo; 