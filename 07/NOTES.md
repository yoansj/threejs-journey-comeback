# 07 - Fullscreen and resizing

All of the lessons before had a fixed sized canvas, this can be changed ofc and put to fullscreen

For the canvas to take the whole screen we use `innerWidth` and `innerHeight`

We also need to remove the padding and margins to remove the scrollbars, for that just use css

# Handling resize

Use native js to know when window is being resized
-> update the new sizes
-> update camera aspect
when changing camera properties calling `updateProjectionMatrix` is necessary

## Pixel ratio

Some screens have a pixel ratio greater than one, to account for this we can just get it via the window