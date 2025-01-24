import Image from 'next/image';
import MethaLogo1 from '../assets/Images/MethaLogo1.png';
import bg3 from '../assets/Images/bg3.jpg';

const Civilisation = () => {
    return (
        <section className="relative w-full lg:h-[30vh] h-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-32 overflow-hidden">
            {/* Text and Logo */}
            <Image
                src={MethaLogo1}
                alt="MethaLogo1"
                className="w-[100px] sm:w-[150px] md:w-[200px] z-10"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium text-center md:text-left z-10">
                Civilization goes down. <br />
                $METH goes up.
            </p>

            {/* Background Image */}
            <Image
                src={bg3}
                alt="Background"
                className="absolute top-[14%] right-0 w-[50px] sm:w-[80px] md:w-[100px] object-contain z-0 transition-transform duration-500 ease-in-out"
            />
        </section>
    );
};

export default Civilisation;
