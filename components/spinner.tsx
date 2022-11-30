const Spinner = () => {
  return (
    <>
      <div className='fixed w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='inline-block h-20 w-20 items-center p-2'>
          <div
            className='block w-16 h-16  rounded-full border-4 border-indigo-600 animate-spin z-5000 m-2'
            style={{
              borderColor:
                'rgb(129 140 248) transparent rgb(129 140 248) transparent'
            }}></div>
        </div>
      </div>
    </>
  )
}

export default Spinner
