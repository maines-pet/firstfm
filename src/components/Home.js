import { BsHeadphones, BsPlayFill } from 'react-icons/bs'

export function Home(props) {


  return (
    <div className='mt-4'>
      <p  className='text-center text-lg mb-6'>Welcome to first.fm</p>

      <h1 className='text-center'>Artist of the Day</h1>
      <div className='w-1/2 mx-auto grid grid-cols-2 border shadow-md shadow-purple-800 m-3 p-2'>
        <div>
          <div className='text-2xl'>Adele</div>
        </div>
        <div className='flex flex-col items-end gap-x-4'>
          <div className='flex items-center text-indigo-300 gap-x-2'>
            <BsHeadphones />
            <span>4,299,000 listeners</span>
          </div>
          <div className='flex items-center text-gray-400 gap-x-2'>
            <BsPlayFill />
            <span>4,299,031 play count</span>
          </div>
        </div>
      </div>
      <h1 className='text-center'>Song of the Day</h1>
      <div className='w-1/2 mx-auto grid grid-cols-2 border shadow-md shadow-purple-800 m-3 p-2'>
        <div>
          <div className='text-2xl'>Happier Than Ever</div>
          <div>by <span className='hover:underline'>Billie Eilish</span></div>
        </div>
        <div className='flex flex-col items-end gap-x-4'>
          <div className='flex items-center text-indigo-300 gap-x-2'>
            <BsHeadphones />
            <span>4,299,000 listeners</span>
          </div>
          <div className='flex items-center text-gray-400 gap-x-2'>
            <BsPlayFill />
            <span>4,299,031 play count</span>
          </div>
        </div>
      </div>
      <h1 className='text-center'>Album of the Day</h1>
      <div className='w-1/2 mx-auto grid grid-cols-2 border shadow-md shadow-purple-800 m-3 p-2'>
        <div>
          <div className='text-2xl'>How Does Your Garden Grow?</div>
          <div>by <span className='hover:underline'>Better Than Ezra</span></div>
        </div>
        <div className='grid grid-rows-2 content-center justify-items-end'>
          <div className='flex items-center text-indigo-300 gap-x-2'>
            <BsHeadphones />
            <span>4,299,000 listeners</span>
          </div>
          <div className='flex items-center text-gray-400 gap-x-2'>
            <BsPlayFill />
            <span>4,299,031 play count</span>
          </div>
        </div>
      </div>
    </div>
  );
}
