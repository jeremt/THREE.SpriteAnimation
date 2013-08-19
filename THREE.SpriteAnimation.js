/**
 * THREE.SpriteAnimation
 * @author jeremt / jeremt.github.io
 */

~function () {

THREE = THREE || {};

/**
 * Default parameters.
 */
var _defaultParams = {
  delay: 75
};

/**
 * Create a new sprite animation.
 */
THREE.SpriteAnimation = function (params) {

  // create subAnims list.

  this.subAnims = {};

  // set default params

  for (var key in _defaultParams)
    this[key] = _defaultParams[key];

  // set params

  for (var key in params)
    this[key] = params[key];


  // set texture repeat and wrap mode

  this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping; 
  this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

  // initialize default positions
  this.currentAnim = "";
  this.currentTime = 0;
  this.currentTile = 0;
  if (!this.firstTile) this.firstTile = 0;
  if (!this.lastTile)  this.lastTile = this.numberOfTiles;

}

/**
 * Cut the animation to create a subanimation. The 0 value
 * correspond to the bottom left.
 * @param name The subanimation name.
 * @param params
 * @option from The first tile.
 * @option to The last tile.
 */
THREE.SpriteAnimation.prototype.add = function (name, params) {
  this.subAnims[name] = {
    from: params.from || 0,
    to: params.to + 1 || this.numberOfTiles + 1
  };
}

/**
 * Set the animation to play.
 */
THREE.SpriteAnimation.prototype.play = function (name) {
  if (!this.subAnims[name])
    name = "";
  if (this.currentAnim == name)
    return ;
  this.currentAnim = name;
  this.currentTile = name === "" ? 0 : this.subAnims[name].from;
  this.currentTime = 0;
}

/**
 * Update animation at each frame.
 * @param delta The delta time between each frame.
 */
THREE.SpriteAnimation.prototype.update = function (delta) {
  if (this.currentAnim === "") {
    var first = this.firstTile;
    var last = this.lastTile;
  } else {
    var first = this.subAnims[this.currentAnim].from;
    var last = this.subAnims[this.currentAnim].to;
  }
  this.currentTime += delta;
  if (this.currentTime > this.delay) {
    this.currentTime -= this.delay;
    this.currentTile++;
    if (this.currentTile == last)
      this.currentTile = first;
    var col = this.currentTile % this.tilesHorizontal;
    var row = ~~(this.currentTile / this.tilesHorizontal);
    this.texture.offset.x = col / this.tilesHorizontal;
    this.texture.offset.y = row / this.tilesVertical;
  }
}

}();