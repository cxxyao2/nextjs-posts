import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <footer className='py-6 text-center text-gray-500 text-sm'>
      <span className='text-gray-900 font-fold text-lg dark:text-gary-100'>
        Jennifer
      </span>
      &copy; {new Date().getFullYear()} All right reserved.
      {t('greeting')}
    </footer>
  )
}

export default Footer
