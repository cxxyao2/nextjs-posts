import { tabsArray } from '../data/constants'

type Props = React.PropsWithChildren<{
  tabsContainerTabIndex: number
  currentTab: number
  setCurrentTab: (tab: number) => void
}>

const SearchTabs = ({
  tabsContainerTabIndex,
  currentTab,
  setCurrentTab
}: Props) => {
  if (!tabsArray) return null

  return (
    <div className='bg-indigo-500 px-6 py-3'>
      <ul className='flex flex-row text-white font-semifold justify-center items-center space-x-8 mx-auto'>
        {tabsArray.map((tab) => (
          <ol key={tab.index}>
            <button
              onFocus={() => setCurrentTab(tab.index)}
              onClick={() => setCurrentTab(tab.index)}
              tabIndex={tabsContainerTabIndex + tab.index}
              className={`outline-none pb-1 focus:border-b-2  focus:border-gray-200 ${
                currentTab === tab.index ? 'border-b-2  border-gray-200' : ''
              }  transition-colors duration-300 cursor-pointer`}>
              {tab.description}
            </button>
          </ol>
        ))}
      </ul>
    </div>
  )
}

export default SearchTabs
