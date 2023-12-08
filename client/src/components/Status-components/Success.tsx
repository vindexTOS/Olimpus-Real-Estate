import React from 'react'

const Succsess = ({ success }: { success: string }) => {
  return (
    <>
      {success && (
        <p className="fixed  z-50 flex items-center justify-center p-5 bg-green-300 shadow-md left-2 top-[80%] transform  text-center text-brand-white font-bold w-[250px] h-[100px] rounded-[9px] flex items-center justify-center text-[1rem] animate-slide-in">
          {success}
        </p>
      )}
    </>
  )
}

export default Succsess
