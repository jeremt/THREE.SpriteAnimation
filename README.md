THREE.SpriteAnimation
=====================

Simple class to manage 2D animations for THREE.js.

USAGE
-----

1. Create an animation

```js

var anim = new THREE.SpriteAnimation({
  texture: myTexture, /** The texture to use */
  tilesHorizontal: 6, /** The number of tiles horizontaly */
  tilesVertical: 1,   /** The number of tiles verticaly */
  numberOfTiles: 6,   /** The total number of tiles */
  delay: 42           /** The delay to change tile (optional) */
});

```

2. Create your sub animations

```js

anim.add("idle", {from: 0, to: 0});
anim.add("run", {from: 0, to: 5});

```

3. Use it

```js

anim.play(); /** play the full animation */

/**
 * play animations by names
 */
anim.play("idle");
anim.play("run");

anim.update(clock.getDelta()); /** update animation */

```