# Graasp Analytics

## Screenshot

<img width="1381" alt="Screenshot 2023-04-27 at 4 58 43 PM" src="https://user-images.githubusercontent.com/13879502/234903339-a95ee2b8-a89e-4edb-a22a-20e9397346a6.png">

## Installation

1. Run `yarn` to install the dependencies.
2. Run [the API](https://github.com/graasp/graasp) at `localhost:3000`
3. Set the following environnement variables in `.env.local` (place this file at your project root)

```
REACT_APP_API_HOST=http://localhost:3000
PORT=3113
REACT_APP_SHOW_NOTIFICATIONS=true
REACT_APP_AUTHENTICATION_HOST=http://localhost:3001
REACT_APP_GRAASP_PERFORM_HOST=http://localhost:3112
REACT_APP_HIDDEN_ITEM_TAG_ID=b5373e38-e89b-4dc7-b4b9-fd3601504467
# This should match the hidden tag id variable in the backend env file
REACT_APP_GRAASP_ANALYZER_HOST=http://localhost:3113
REACT_APP_DOMAIN=localhost
REACT_APP_ENABLE_MOCK_API=false
```

4. Run `yarn start`. The client should be accessible at `localhost:3113`
