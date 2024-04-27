import { Route, Routes } from 'react-router-dom'
import { Homepage } from './Pages/Homepage'
import logo from './assets/logo.png'
import { Projects } from './Pages/Projects'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className='min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50'>
      <motion.img
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
        src={logo}
        className='mx-auto mb-8'
        width={75}
      />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>

      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className='mt-12'>
      <p className='text-center text-zinc-400'>
        Made with ❤️ by{' '}
        <a href='#' className='text-red-300 hover:underline'>
          @v4sj4n
        </a>
      </p>
    </footer>
  )
}

export default App
