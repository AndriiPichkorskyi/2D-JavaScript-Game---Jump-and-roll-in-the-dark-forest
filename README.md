# 2D JavaScript Game - Jump and roll in the dark forest

## Project Description

This is a 2D JavaScript game developed as a pet project following the tutorial by [Frank's Laboratory](https://www.youtube.com/watch?v=GFO_txvwK_c). The game is built entirely in vanilla JavaScript without external libraries, utilizing HTML5 Canvas for rendering. It features a simple yet engaging gameplay loop with player movement, enemy interactions, and collision detection, showcasing core game development concepts.

## Source

The project is based on the tutorial ["Create a 2D Game with JavaScript"](https://www.youtube.com/watch?v=GFO_txvwK_c) by Frank's Laboratory. All code is written from scratch, following the tutorial's guidance, with potential custom modifications to enhance functionality or personalize the game.

## Controls

-   **Arrow Keys (Left or A/Right or B)**: Move the player character horizontally.
-   **Arrow Up or W**: Jump.
-   **Arrow Down or S**: Sit or perform a diving action when in mid-jump.
-   **Enter**: Perform a rolling action.

## Features

-   **HTML5 Canvas Rendering**: Smooth 2D graphics rendered directly in the browser.
-   **Player Movement**: Responsive controls for navigating the player character.
-   **Enemy System**: Dynamic enemies with basic AI or scripted movement patterns.
-   **Collision Detection**: Accurate hit detection for player-enemy or projectile interactions.
-   **Score Tracking**: Displays player score based on enemies defeated or objectives completed.
-   **Game Loop**: Optimized animation loop using `requestAnimationFrame` for consistent performance.

## Project Structure

-   `index.html`: Main HTML file with the game canvas.
-   `src/main.js`: Core JavaScript logic for game mechanics, rendering, and controls.
-   `src/background.js`: Rendering paralax background.
-   `src/collisionAnimation.js`: Rendering collisium.
-   `src/enemies.js`: Core enemy logic for game mechanics and rendering.
-   `src/floatingMessages.js`: Rendering score messages.
-   `src/input.js`: Hanle user's keyboard input.
-   `src/particle.js`: Mechanism of rendering small particle.
-   `src/player.js`: Main player file for rendering.
-   `src/playerStates.js`: Handle player states.
-   `src/sound.js`: Play different sounds.
-   `src/ui.js`: Render user interface, score, time and messages.
-   `src/styles.css`: Basic styling for the game canvas and UI elements.
-   `assets/`: Folder containing image and sound resources (if included; see **Assets** section).

## Assets

-   **Image Assets**: Sourced from [Bevouliin](https://bevouliin.com/). These assets are not created by the repository author and are subject to Bevouliin’s licensing terms. Please visit [Bevouliin](https://bevouliin.com/) to obtain the assets and review their license for usage and redistribution.
-   **Sound Assets**: Sourced from [OpenGameArt](https://opengameart.org/). These assets are not created by the repository author and are licensed under their respective Creative Commons licenses (e.g., CC0, CC BY, CC BY-SA). Check each asset’s page on [OpenGameArt](https://opengameart.org/) for specific licensing requirements, such as attribution.

## Licensing

-   **Code**: The source code in this repository (e.g., `index.html` `main.js` `background.js` `collisionAnimation.js` `enemies.js` `floatingMessages.js` `input.js` `particle.js` `player.js` `playerStates.js` `sound.js` `ui.js` `styles.css`) is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.
-   **Third-Party Assets**:
    -   **Images**: The image assets from [Bevouliin](https://bevouliin.com/) are not covered by the MIT License. They are subject to Bevouliin’s own licensing terms, which may include restrictions on redistribution. Users must acquire these assets directly from Bevouliin and comply with their license.
    -   **Sounds**: The sound assets from [OpenGameArt](https://opengameart.org/) are not covered by the MIT License. Each sound asset is licensed under its own terms (e.g., Creative Commons licenses), as specified on the asset’s page. Users must comply with these licenses, which may require attribution or restrict commercial use.
-   The repository author is not the creator of the image or sound assets and claims no ownership over them. Users are responsible for ensuring compliance with the assets’ respective licenses.
