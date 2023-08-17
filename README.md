# Graasp Analytics

## Screenshot

<img width="1381" alt="Screenshot 2023-04-27 at 4 58 43 PM" src="https://user-images.githubusercontent.com/13879502/234903339-a95ee2b8-a89e-4edb-a22a-20e9397346a6.png">

## Installation

1. Run `yarn` to install the dependencies.
2. Run [the API](https://github.com/graasp/graasp) at `localhost:3000`
3. Set the following environnement variables in `.env.local` (place this file at your project root)

```sh
VITE_PORT=3113
VITE_GRAASP_API_HOST=http://localhost:3000
VITE_ENABLE_MOCK_API=false
VITE_GRAASP_API_HOST=http://localhost:3000
VITE_GRAASP_AUTH_HOST=http://localhost:3001
VITE_GRAASP_PLAYER_HOST=http://localhost:3112
VITE_GRAASP_LIBRARY_HOST=http://localhost:3005
VITE_GRAASP_BUILDER_HOST=http://localhost:3111
```

4. Run `yarn start`. The client should be accessible at `localhost:3113`
