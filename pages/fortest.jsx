import OkCanCelModal from '../components/ok-cancel-modal'
import { useState } from 'react'
import Button from '../components/button'

const ForTest = () => {
  const [isOpen, setIsopen] = useState(false)

  return (
    <div className='bg-yellow-200 h-full w-full '>
      <div className='text-gray active:text-red group'>
        <a href={`/`}>{'home'}</a>
        <div className='h-0.5 bg-red scale-x-0 group-hover:scale-100 transition-transform origin-left rounded-full duration-300 ease-out'>
          It works!
        </div>
      </div>

      <Button
        className=''
        onClick={() => setIsopen((pre) => !pre)}>
        Toggle Modal
      </Button>
      {isOpen && (
        <OkCanCelModal
          isOpen={isOpen}
          message='Are you sure to delete this'
          title='Delete a item'
          onAfterOpen={() => {}}
          onClose={(e) => {
            if (e === false) {
              alert('keep if')
            }
            if (e === true) {
              alert('ok, delete')
            }
            if (e === null || e === undefined) alert('nothing happens')
            setIsopen(false)
          }}></OkCanCelModal>
      )}
    </div>
  )
}

export default ForTest
