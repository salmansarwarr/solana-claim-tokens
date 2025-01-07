import MethaLogo from '../assets/Images/MethaLogo.png'

const Footer = () => {
  return (
      <footer className='mt-[10%] px-[5%]  h-[20vh] flex flex-row items-center gap-10 border-t'>
          
          <img src={MethaLogo} className='w-14' alt="MethaLogo" />

          <p>
              ALL CHARACTERS AND EVENTS IN METHA–EVEN THOSE BASED ON REAL PEOPLE–
              ARE ENTIRELY FICTIONAL. ALL CELEBRITY VOICES ARE IMPERSONATED…POORLY BY AI. METHA CONTAINS COARSE LANGUAGE AND DUE TO ITS CONTENT SHOULD NOT BE VIEWED BY ANYONE◼

          </p>

    </footer>
  )
}

export default Footer