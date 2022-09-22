import { FlagIcon } from '@heroicons/react/24/solid'

const DashBoardDataTable = () => {
  return (
    <div className='col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200'>
      <header className='px-5 py-4 border-b border-slate-100'>
        <h2 className='font-semibold text-slate-800'>Top Channels</h2>
      </header>
      <div className='p-3'>
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            <thead className='text-xs uppercase text-slate-400 bg-slate-50 rounded-sm'>
              <tr>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Source</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>VISITORS</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>REVENUES</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>SALES</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>CONVENSION</div>
                </th>
                <th className='p-2'>COMMENTS</th>
              </tr>
            </thead>
            <tbody className='text-sm font-medium divide-y'>
              <tr>
                <td className='p-2'>
                  <div className='flex items-center'>
                    <FlagIcon className='w-6 h-6 text-blue-400 mr-1' />
                    <div className='text-slate-600'>Flag</div>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>4%</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>⭐⭐⭐⭐⭐</div>
                </td>
              </tr>
              <tr>
                <td className='p-2'>
                  <div className='flex items-center'>
                    <FlagIcon className='w-6 h-6 text-yellow-400 mr-1' />
                    <div className='text-slate-600'>Flag</div>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>4%</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>⭐⭐⭐⭐⭐</div>
                </td>
              </tr>
              <tr>
                <td className='p-2'>
                  <div className='flex items-center'>
                    <FlagIcon className='w-6 h-6 text-purple-400 mr-1' />
                    <div className='text-slate-600'>Flag</div>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>4%</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>⭐⭐⭐⭐⭐</div>
                </td>
              </tr>
              <tr>
                <td className='p-2'>
                  <div className='flex items-center'>
                    <FlagIcon className='w-6 h-6 text-red-400 mr-1' />
                    <div className='text-slate-600'>Flag</div>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>500</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>4%</div>
                </td>
                <td className='p-2'>
                  <div className='text-center'>⭐⭐⭐⭐⭐</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashBoardDataTable
