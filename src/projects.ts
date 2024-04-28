type Project = {
  name: string
  description: string
  live: string
  code: string
}
export const projects: Project[] = [
  {
    name: 'Moments',
    description: `This platform is all about bringing people together, offering a cozy corner for group chats and a place to save your unforgettable group moments. With tools like Next.js, Supabase, and Clerk, I created a site for friends to stay connected and reminisce about the good times.`,
    live: 'https://moments-vas.vercel.app',
    code: 'https://github.com/v4sj4n/Moments',
  },
  {
    name: 'Vas Weather',
    description: `VasWeather is my little project to keep you in the know about what's happening outside. Built using webpack and weatherapi, it's my attempt to give you a smooth, dark-mode-friendly experience, no matter what device you're on.`,
    live: 'https://weather-vas.netlify.app',
    code: 'https://github.com/v4sj4n/weather-vas',
  },
  {
    name: 'Memory Card',
    description: `Ready for a challenge? Memory Card is here to test your memory prowess! I've delved into React, Svelte, Solid.js, and Vue to challenge myself on writing it in different frameworks, throwing in some custom hooks for good measure. It's a fun journey of experimentation and learning, with plenty of surprises along the way.`,
    live: 'https://memory-game-card-vas.netlify.app',
    code: 'https://github.com/v4sj4n/card-memory-game',
  },
  {
    name: 'Shopping Cart',
    description: `Okay, so maybe the checkout button doesn't do much yet, but hey, we all start somewhere, right? SHOPPING CART is my way of dipping my toes into React Router Dom while playing around with the fakestoreapi. It's a work in progress, but I had a great time learning it. DESKTOP FOCUSED UI`,
    live: 'https://shopping-cart-vas.netlify.app',
    code: 'https://github.com/v4sj4n/shopping-cart',
  },
  {
    name: 'Robofriends',
    description: `Introducing ROBOFRIENDS, my humble beginnings in the world of web development. It's been quite the ride, starting from scratch and piecing together React components. This project holds a special place in my heart, reminding me of how far I've come and how much more there is to learn.`,
    live: 'https://robofriends-vas.netlify.app/',
    code: 'https://github.com/v4sj4n/robofriends',
  },
  {
    name: 'Tic Tac Toe',
    description: `Who doesn't love a good old game of TicTacToe, right? I thought I'd give it a shot in vanilla JavaScript, just for kicks. It's nothing fancy, but sometimes the simplest things are the most fun.`,
    live: 'https://tictactoe-odin-vas.netlify.app',
    code: 'https://github.com/v4sj4n/tictactoe-odin',
  },
]
