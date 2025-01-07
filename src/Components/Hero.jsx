
import bg4 from '../assets/Images/bg4.jpg';
const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-r h-[80vh] pt-[5%]">

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <aside className="flex flex-col md:flex-row items-center justify-between py-12 gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl  md:text-6xl font-[500] ">
              Meta on <br /> $METH

            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              A Fart Suckerturd quest for world domination

            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Get a Bag
            </button>
          </div>

          {/* Right Content - Video Container */}
          <div className="flex-1 w-full pt-[4%]">
            <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video">
              <div className="flex items-center justify-center h-full bg-gray-700">
                <span className="text-2xl font-bold text-gray-400">VIDEO TBC</span>
              </div>
            </div>
          </div>
        </aside>
      </article>

      <img
        src={bg4}
        alt="Background"
        className="absolute top-[40%] left-0 w-[100px] object-contain z-0 transition-transform duration-500 ease-in-out"

      />
    </section>
  );
};

export default Hero;