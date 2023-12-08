const Error = ({ error }: { error: string }) => {
  return (
    <>
      {error && (
        <p className="fixed  z-50  bg-red-600  flex items-center justify-center text-center shadow-md left-2 top-[80%] transform  text-brand-white max-w-[550px] h-[100px] rounded-[9px] flex items-center justify-center text-[1.2rem] animate-slide-in">
          {error}
        </p>
      )}
    </>
  )
}

export default Error
