import OkCanCelModal from '../components/ok-cancel-modal'
import { useState } from 'react'
import Button from '../components/button'

const ForTest = () => {
  const [isOpen, setIsopen] = useState(false)

  return (
    <div className='bg-yellow-200 h-full w-full '>
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
