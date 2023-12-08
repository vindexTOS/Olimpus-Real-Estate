import React from 'react'
import homeIlustration from '../../../../../assets/images/homeilustration.png'
import { UseLanguageContext } from '../../../../../contexts/LanguageContext'
function Info() {
  const { lang } = UseLanguageContext()
  const style = {
    mainDiv: `bg-[#ffc000] max_xl:hidden h-[930px] w-[90%] rounded-l-[100px] rounded-b-[5px]  rounded-r-[0px] flex  flex-col justify-center  gap-10 items-center p-5`,
    header: `text-brand-white font-bold text-center text-[2.5rem] font-geo`,
    wrapperDiv: `flex items-center justify-center`,
    sectionWrapper: `flex items-center `,
    hOne: `text-[1.5rem] text-brand-white font-geo`,
  }

  return (
    <div className={style.mainDiv}>
      <h1 className={style.header}>
        {lang ? 'დაამატეთ თქვენი უძრავი ქონება' : 'Add your property'}
      </h1>
      <div className={style.wrapperDiv}>
        <div className={style.sectionWrapper}>
          <img src={homeIlustration} />
        </div>
        {/*  2  */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className={style.hOne}>
              1. {lang ? 'შეავსე ფორმა' : 'Fill out form'}
            </h1>
          </div>
          <div>
            <h1 className={style.hOne}>
              2. {lang ? 'გამოაგზავნე ინფორმაცია' : 'Send us information'}
            </h1>
          </div>
          <div>
            <h1 className={style.hOne}>
              {' '}
              3.{' '}
              {lang
                ? 'დაელოდე განცხადების დამტიკცებას'
                : 'Wait for your application to be accepted.'}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
