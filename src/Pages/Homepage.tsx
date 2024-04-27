import { motion } from 'framer-motion'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import {
  SiAndroidstudio,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFlask,
  SiGithub,
  SiLinkedin,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSvelte,
} from 'react-icons/si'
import { Block } from '../components/Block'

export const Homepage = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      transition={{
        staggerChildren: 0.05,
      }}
      className='mx-auto max-w-4xl grid-flow-dense grid grid-cols-12 gap-4'
    >
      <HeaderBlock />
      <SocialsBlock />
      <LocationBlock />

      <AboutBlock />
      <TechnologiesBlock />
    </motion.div>
  )
}

const HeaderBlock = () => {
  return (
    <Block className='col-span-12 row-span-3 md:col-span-6'>
      <img
        src='https://api.dicebear.com/8.x/lorelei-neutral/svg?seed="VASJAN"'
        alt='avatar'
        className='mb-4 size-14 rounded-full'
      />
      <h1 className='mb-12 text-2xl md:text-4xl font-medium leading-tight'>
        Hi I'm Vasjan,{' '}
        <span className='text-zinc-400'>
          I build cool things like this one.
        </span>
      </h1>
      <a
        href="mailto:vasjancupri04@gmail.com?subject=Let's work together&body=Hello Vasjan, ..."
        className='flex items-center gap-1 text-red-300 hover:underline'
      >
        Contact me <FiArrowRight />
      </a>
    </Block>
  )
}

const SocialsBlock = () => {
  return (
    <>
      <Block
        whileHover={{
          rotate: '-3deg',
          scale: 1.1,
        }}
        className='col-span-6 md:col-span-3 row-span-8 md:row-span-2 bg-stone-100'
      >
        <a
          href='https://github.com/v4sj4n'
          className='grid h-full place-content-center text-3xl text-zinc-800'
        >
          <SiGithub />
        </a>
      </Block>
      <Block
        whileHover={{
          rotate: '3deg',
          scale: 1.1,
        }}
        className='col-span-6 md:col-span-3 row-span-8 md:row-span-2 bg-blue-400'
      >
        <a
          href='https://www.linkedin.com/in/v4sj4n/'
          className='grid h-full place-content-center text-3xl text-white'
        >
          <SiLinkedin />
        </a>
      </Block>
    </>
  )
}


const LocationBlock = () => {
  return (
    <Block className='col-span-12 flex flex-col justify-center items-center gap-4 md:col-span-6'>
      <FiMapPin className='text-4xl md:text-3xl' />
      <p className='text-center text-xl'>Tirana</p>
    </Block>
  )
}

const AboutBlock = () => {
  return (
    <Block className='col-span-12 text-xl md:text-3xl leading-snug'>
      <p>
        My passion lies in crafting memorable user experiences. I'm committed to
        stability and professionalism in my development approach, using a mix of
        tools to bring concepts to fruition.
      </p>
      <div>
        <a
          href='/projects'
          className='my-3 cursor-pointer hover:underline  text-lg flex items-center text-red-300 gap-2'
        >
          Check my projects
          <FiArrowRight />
        </a>
      </div>
    </Block>
  )
}


const TechnologiesBlock = () => {
  const hoverEffects = {
    scale: 1.25,
    rotate: Math.floor(Math.random() * 10 + 1) % 2 === 0 ? '3deg' : '-3deg',
  }
  return (
    <Block className='col-span-12'>
      <h1 className='text-3xl mb-4'>Technologies I have worked with </h1>
      <motion.div
        initial='initial'
        animate='animate'
        transition={{
          staggerChildren: 0.1,
        }}
        className='grid grid-cols-12 gap-4'
      >
        <Block
          className='flex items-center justify-center  col-span-8 row-span-2 md:row-span-1 md:col-span-3 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://react.dev'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiReact className='text-7xl md:text-3xl text-blue-400' />
            <h3 className='text-3xl md:text-lg'>React</h3>
          </a>
        </Block>
        <Block
          className='col-span-4 md:col-span-3 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://expressjs.com'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiExpress className='text-3xl' />
            <h3 className='text-lg'>Express</h3>
          </a>
        </Block>

        <Block
          className='col-span-4 md:col-span-3 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://svelte.dev'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiSvelte className='text-3xl text-red-400' />
            <h3 className='text-lg'>Svelte</h3>
          </a>
        </Block>

        <Block
          className='col-span-6 md:col-span-3 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://www.postgresql.org'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiPostgresql className='text-3xl text-blue-300' />
            <h3 className='text-lg'>Postgres</h3>
          </a>
        </Block>
        <Block
          className='col-span-6 md:col-span-6 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://www.docker.com'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiDocker className='text-3xl text-blue-500' />
            <h3 className='text-lg'>Docker</h3>
          </a>
        </Block>
        <Block
          className='col-span-12 md:col-span-6 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://www.docker.com'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiAndroidstudio className='text-3xl text-green-500' />
            <h3 className='text-lg'>Android Studio</h3>
          </a>
        </Block>
        <Block className='col-span-4  bg-zinc-700' whileHover={hoverEffects}>
          <a
            href='https://www.djangoproject.com'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiDjango className='text-3xl text-green-400' />
            <h3 className='text-lg'>Django</h3>
          </a>
        </Block>
        <Block
          className='flex items-center justify-center col-span-8 row-span-2 md:row-span-1 md:col-span-4 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://nextjs.org'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiNextdotjs className='text-7xl md:text-3xl' />
            <h3 className='text-3xl md:text-lg'>Next.js</h3>
          </a>
        </Block>
        <Block
          className='col-span-4 md:col-span-4 bg-zinc-700'
          whileHover={hoverEffects}
        >
          <a
            href='https://palletsprojects.com/p/flask'
            className='flex flex-col gap-2 items-center justify-center '
          >
            <SiFlask className='text-3xl' />
            <h3 className='text-lg'>Flask</h3>
          </a>
        </Block>
      </motion.div>
    </Block>
  )
}

