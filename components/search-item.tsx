const SearchItem = () => {
  return (
    <div className='col-span-full md:col-span-6 lg:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200'>
      <figure className='flex flex-row justify-between items-center space-x-2 md:flex-col'>
        <img
          className='w-24 h-24 rounded-full mx-auto md:h-auto md:rounded-none
       '
          src='/images/products/gas1.jpg'></img>
        <div className='pt-3 md:p-4 text-center md:text-left space-y-4'>
          <blockquote>
            <p className='font-semibold'>
              Wavian USA JCOO20 Red Authentic..
              {/* 2 lines add modal if clicked*/}
            </p>
          </blockquote>
        </div>
        <figcaption className='font-medium'>
          <div className='text-sm text-sky-500 dark:text-sky-400'>Saraa</div>
          <div className='font-semifold text-slate-700 dark:text-slate-500 '>
            stock: 22
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

export default SearchItem
