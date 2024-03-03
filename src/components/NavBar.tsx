import { useState } from "react"
import { motion } from "framer-motion"
import logoImg from "../assets/logo.png"

export default function NavBar({ currentElement }: { currentElement: string }) {
  const menuArr = [
    { title: "Main", link: "/" },
    { title: "Projects", link: "/projects" },
    { title: "Contact", link: "/contact" },
  ]

  const [toggled, setToggled] = useState(false)

  const handleMenuToggle = () => setToggled((prevToggled) => !prevToggled)

  return (
    <nav className="flex justify-between text-center  py-12 lg:px-32 md:px-16 px-8">
      <img className="w-8" src={logoImg.src} alt="My logo." />
      <h3 className="text-2xl font-light hover:text-white/85 tracking-wider">
        <a href="/">VASJAN</a>
      </h3>

      <menu className="lg:flex hidden gap-2 ">
        {menuArr.map((el) => (
          <ul key={el.title}>
            <a
              className={`${
                currentElement === el.title ? "text-zinc-600" : ""
              } hover:underline`}
              href={el.link}
            >
              {el.title}
            </a>
          </ul>
        ))}
      </menu>

      <div
        className="lg:hidden flex flex-col justify-center space-y-1.5 cursor-pointer z-50"
        onClick={handleMenuToggle}
      >
        <motion.span
          animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
          className="block h-0.5 w-8 bg-white"
        ></motion.span>
        <motion.span
          animate={{ width: toggled ? 0 : 24 }}
          className="block h-0.5 w-6 bg-white"
        ></motion.span>
        <motion.span
          animate={{
            rotateZ: toggled ? -45 : 0,
            y: toggled ? -8 : 0,
            width: toggled ? 32 : 16,
          }}
          className="block h-0.5 w-4 bg-white"
        ></motion.span>
      </div>

      {toggled && (
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed flex  bg-zinc-800 bottom-0 left-0 w-full h-screen items-center justify-center"
        >
          <menu className="flex flex-col  gap-2">
            {menuArr.map((el) => (
              <ul key={el.title}>
                <a
                  className={`${
                    currentElement === el.title ? "text-white/75" : ""
                  } hover:underline text-2xl`}
                  href={el.link}
                >
                  {el.title}
                </a>
              </ul>
            ))}
          </menu>
        </motion.div>
      )}
    </nav>
  )
}
