const Footer = (props: any) => {
  return (
    <footer className='py-6 text-center text-gray-500 text-sm'>
      <span className='text-gray-900 font-fold text-lg dark:text-white'>
        Jennifer
      </span>
      &copy; {new Date().getFullYear()} All right reserved.
    </footer>
  )
}

export default Footer
