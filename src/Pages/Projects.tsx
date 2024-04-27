import { motion } from 'framer-motion'
import { Block } from '../components/Block'
import { FiArrowLeft } from 'react-icons/fi'
import { projects } from '../projects'

export const Projects = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      transition={{
        staggerChildren: 0.05,
      }}
      className='mx-auto max-w-4xl grid-flow-dense grid grid-cols-12 gap-4'
    >
      <motion.a
        initial={{
          scale: 0.5,
          y: 50,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
        }}
        href='/'
        className='text-2xl flex gap-2 col-span-12 items-center'
      >
        <FiArrowLeft />
        Go back
      </motion.a>

      {projects.map(({ code, description, live, name }) => {
        return (
          <Block className='col-span-12 grid grid-cols-12 gap-4 place-items-center bg-zinc-700/50'>
            <div className='col-span-12 md:col-span-3 w-full flex flex-col items-center justify-center'>
              <h1 className='text-4xl md:text-3xl mb-4 text-center'>{name}</h1>

              <div className='flex justify-between  items-center w-full  space-x-2'>
                <a
                  className='text-center border border-zinc-100 hover:bg-zinc-100 transition-color duration-200 w-1/2 hover:text-zinc-800 px-3 py-1.5 rounded-md'
                  href={live}
                >
                  See Live
                </a>
                <a
                  className=' text-center border border-zinc-100 transition-color duration-200 hover:bg-zinc-100 hover:text-zinc-800 px-3 py-1.5 rounded-md w-1/2'
                  href={code}
                >
                  See Code
                </a>
              </div>
            </div>
            <div className='col-span-12 md:col-span-9 text-pretty'>
              <p> {description} </p>
            </div>
          </Block>
        )
      })}
    </motion.div>
  )
}
