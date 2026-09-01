# 28 - Shader patterns (wip)

In sleep debt but i keep going

so this lesson aims on drawing patterns with shaders, texture do that but with less control
that's why we're using shaders for that
there's quite some math involved and i suck at math but anyways i'm gonna try to follow up

since we'll draw patterns most of the code is gonna be in fragment shaders
we can send the uvs using a varying, the uvs are already declared cause we use ShaderMaterial

## First pattern

We assign the uv coordinates to the FragColor

gl_FragColor = vec4(vUv, 1.0, 1.0);

## p2

Same but with blue a 0

## p3

we can use the uv .x for all the values of the color
it makes a black and white gradient that goes from
left to right, black to white

gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

since it goes from 0 to 1 kinda makes sense

## p4

same with .y

## p5

we invert the value of the uv
1.0 - vUv.y

## p6

we squeeze the gradient by multiplying the value
since the value is bigger the gradient gets shorter

if we do * 2 the gradient is 50%
* 10 idk how much it is though
it seems exponential idk


## p7

i knew it was some modulo stuff but didn't know % doesn't work in glsl lol we have to use mod(left, right) a bit lame but it's okay

float strength = mod(vUv.y * 10., 1.);

in out case 10 is the number lines

## p8

same as before but with a step
step takes a edge param and a number
if number is below step we get 0.
otherwise we get 1.0

strength = step(0.5, strength);

## p9

i figured it woohooo
it's the same as before but with a higher step

## p10

figured it too wasn't too hard
we use x instead of y on the uv to get horizontal stripes

## p11

we combine the two steps, the shapes then collide

float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));

## p12

we multiply instead of adding

  float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

## p13

we want the dots to be larger on the x axis
for that we lower the step

float strength = step(0.2, mod(vUv.x * 10.0, 1.0));

figured it out on my own whooo

## p14

we combine the previous patterns
tbh i don't exactly get it

float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
float strength = barX + barY;

## p15

same as before but with an offset on the x and y axis

    float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));

## p16

for that one the logic is to
make the uv value go from 0.5 to 0 then to 0.5 again

we can make the value - 0.5 and then use abs so it's always positive

float strength = abs(vUv.x - 0.5);

## p17

i tried but coul'nt figure it out
it's a combination from the other pattern with y
but instead of just adding we use a min()

## p18

same as before but with max

## p19

figured it out !
it's a step before the max
step returns either 0 or 1
there's no gradient

## p20

thought i figured it out with just putting a bigger step
but that's not it it's a reverse

we create one square
then create a smaller one inverted

# p21

we multiply the uv x by 10, floor it and then divide it by 10

## p22

i haven't exactly figured it out but got close
i managed to subtract to the strength the same formula using the y
uv, then i make it not too bright by multiplying

it's a simmilar but not exact replica, my gradient is kinda reversed

    float strength = floor(vUv.x * 10.) / 10.;
    strength -= (floor(vUv.y * 10.) / 10.) * .3;

lol solution was just to multiply them i was close
multiply = combine

    float strength = floor(vUv.x * 10.) / 10.;
    strength *= floor(vUv.y * 10.) / 10.;

## p23

we need to make a noise texture but tbh i have no idea so i'll look at the solution lol
i knew it was about some kind of random stuff and checked all the functions but there doesn't seem to be a random

there's a pseudo random function
The Book of Shaders: https://thebookofshaders.com/10/

pretty straightforward after, just give the uv coordinates and we get a float

## p24

so it's a noise but with blocks, i was trying before i'm sure i can figure it out

okay figured it out, we make pixels bigger by multiplying the vector coordinates by 10
i think my code is bad but it works

    vec2 uv = vec2(floor(vUv.x * 10.) / 10., floor(vUv.y * 10.) / 10.);
    float strength = random(uv);

nah after checking the solution the code is neat, figured it out !!!

## p25

tbh i didn't try a lot, so to get the tilt effect we simply add the x uv to the y value and then change the intensity with a multiplier

    vec2 uv = vec2(floor(vUv.x * 10.) / 10., floor((vUv.y + vUv.x * .5) * 10.) / 10.);


## p26

i think i managed to get it but not in the right corner
i did 
    float strength = 1. - (vUv.x * vUv.y); 

the solution is much simpler it's just to use length

the uvs start on the bottom left corner with a
value equal to 0.0, 0.0
the more we move from that corner the greater the length
hence the gradient like visual

## p27

we can either offset the vUv and use length
    float strength = length(vUv - .5);
or we can use the distance between vUv and the center
    float strength = distance(vUv, vec2(.5));

## p28

invert of previous one

## p29

i got a simmilar look by doing some sorcery, basically inverting and then multiplying but that's not it

    float strength = 1. - length(vUv - .5) * 10.;

it's pretty much a lens effect

    float strength = 0.015 / (distance(vUv, vec2(0.5)));

## p30

same one but we squeeze the y

## p31

same formula but we have to multiply to add the same pattern
using the x value this time
it's not very intuitive but makes sense, i still struggle a bit

## p32

it's the same one but rotated, i have to remember how to rotate stuff though

it was too complicated i give up lol

the process is basically creating a rotate function
it rotates a uv from a defined center

we need PI for the rotation which doesn't exist so we have to write an approximation, we can use #define like in C to define a constant that's cheaper than an actual var

## p33

i figured this one on my own
it's pretty much patten 19 but with the distance instead of using a negative offset on the uvs

    float x = abs(distance(vUv, vec2(0.5)));

we then use a step

    float strength = step(0.3, max(x, y));

the actual solution is simpler

    float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);

it was harder to change the radius using my solution though

## p34

close to the previous one but we use abs with a negative offset

    float strength = abs(distance(vUv, vec2(0.5)) - .25);

## p35

combination of the two previous ones, tbh i amost had it but yeah gave up

## p36

inverse of previous one #got it #simple

## p37

i'm pretty sure there's a sin stuff going on but i can't make it work

vec2 wavedUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1
);

turn the uvs into a wave and use the same formula as the two previous ones

## p38

also apply distortion on x, somehow it creates floating dots

## p39

same pattern with the uv multiplier bumped, trippy

## p40

it's just atan

## p41

negative offset on each axis inside the atan

## p42

same one but we "add the rest of it"

## p43

same one but we do a modulo on the angle, we multiply it to get the number of divisions

## p44

almost same one but using sin

    float strength = sin(angle * 100.);
