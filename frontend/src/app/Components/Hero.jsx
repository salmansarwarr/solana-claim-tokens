import Image from 'next/image';
import bg4 from '../assets/Images/bg4.jpg';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-r lg:h-[80vh] h-auto pt-[5%]">

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <aside className="flex flex-col md:flex-row items-center justify-between lg:py-12 py-20 gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-[500] ">
              Meta on <br /> $METH
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              A Fart Suckerturd quest for world domination
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-[500] py-3 px-6 sm:px-8 rounded-[30px] transition-colors">
              Get a Bag
            </button>
          </div>

          {/* Right Content - Video Container */}
          <div className="flex-1 w-full">
            <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video">
              <div className="flex items-center justify-center h-full bg-gray-700">
                <span className="text-lg sm:text-xl font-bold text-gray-400">
                  VIDEO TBC
                </span>
              </div>
            </div>
          </div>
        </aside>
      </article>

      <Image
        src={bg4}
        alt="Background"
        className="z-[-1] absolute top-[40%] left-0 w-[50px] sm:w-[70px] md:w-[100px] object-contain transition-transform duration-500 ease-in-out"
      />
    </section>
  );
};

export default Hero;
