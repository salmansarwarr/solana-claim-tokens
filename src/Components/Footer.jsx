import MethaLogo from '../assets/Images/MethaLogo.png';

const Footer = () => {
  return (
    <footer className="mt-10 px-6 md:px-10 py-6 h-auto md:h-[20vh] flex flex-col md:flex-row items-center gap-6 md:gap-10 border-t bg-gray-50">
      <img src={MethaLogo} className="w-14" alt="Metha Logo" />
      <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center md:text-left">
        ALL CHARACTERS AND EVENTS IN METHA–EVEN THOSE BASED ON REAL PEOPLE–
        ARE ENTIRELY FICTIONAL. ALL CELEBRITY VOICES ARE IMPERSONATED… POORLY BY AI. METHA CONTAINS COARSE LANGUAGE AND DUE TO ITS CONTENT SHOULD NOT BE VIEWED BY ANYONE ◼
      </p>
    </footer>
  );
};

export default Footer;
