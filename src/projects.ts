type Project = {
  name: string
  description: string
  live: string
  code: string

}
export const projects : Project[] = [
  {
    name: 'Moments',
    description: `This website connects you with friends, you can open a group and
    chat while also you can save your group moments in there to remind
    you and your friends of the good times you have had together. The
    site uses: Nextjs, Supabase, Clerk`,
    live: 'https://moments-vas.vercel.app',
    code: 'https://github.com/v4sj4n/Moments'

  },
  {
    name: 'Vas Weather',
    description: `This is a weather website I have created using webpack and the API
    from weatherapi, the code is written in modules which are then
    bundled through webpack, I have also used the async await function
    to fetch the data from the API. The website is responsive and it is
    by default on dark mode.`,
    live: 'https://weather-vas.netlify.app',
    code: 'https://github.com/v4sj4n/weather-vas'

  },
  {
    name: 'Memory Card',
    description: `This is a game where you have to pick a grid and click the cards, if you clicked a previously clicked card you lose. I have created this project in 3 frameworks: React, Svelte, Solidjs and Vue. If you want to see the code of all the frameworks click the source code button and switch branches. I have used a custom hook (React and Solidjs) utilizing useEffect/createEffect/onMounted and useState/createSignal/ref to fetch data from an API to use for the cards in the game.`,
    live: 'https://memory-game-card-vas.netlify.app',
    code: 'https://github.com/v4sj4n/card-memory-game'
  },
  {
    name: 'Shopping Cart',
    description: `This website is a simple shopping cart powered by the fakestoreapi, you can add items to your cart and then checkout, whilst the checkout doesn't work it is just a simple website that I have created to learn the basics of React Router Dom while using this project I have learned to use the useOutletContext hook and other hooks from the react-router-dom library.`,
    live: 'https://shopping-cart-vas.netlify.app',
    code: 'https://github.com/v4sj4n/shopping-cart'
  },
  {
    name: 'Robofriends',
    description: `Robofriends is a project I created while learning Web Development in this project I've learned the basics of React like how to create the first project, how to create different components, how to download packages and include them in your project, what's a package.json file and many others.`,
    live: 'https://robofriends-vas.netlify.app/',
    code: 'https://github.com/v4sj4n/robofriends'

  },
  {
    name: 'Tic Tac Toe',
    description: `This is the famous TicTacToe game made all in vanilla javascript, I have created 2 objects for the players and functions for different purposes like checking if there is a winner, checking if the game is drawn, etc.`,
    live: 'https://tictactoe-odin-vas.netlify.app',
    code: 'https://github.com/v4sj4n/tictactoe-odin'
  },
]