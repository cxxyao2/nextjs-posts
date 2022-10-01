import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useTranslation } from 'next-i18next'

const Footer = (props: any) => {
  const { t } = useTranslation('common')
  return (
    <footer className='py-6 text-center text-gray-500 text-sm'>
      <span className='text-gray-900 font-fold text-lg dark:text-white'>
        Jennifer
      </span>
      &copy; {new Date().getFullYear()} All right reserved.
      {t('greeting')}
    </footer>
  )
}

export default Footer

export const getStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer']))
    }
  }
}
