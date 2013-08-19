
~function () {

var context = new THREE.Context();

// debug
window.context = context;

context.addEventListener("start", function () {

  // FLOOR
  var floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 20, 20),
    new THREE.MeshBasicMaterial({
      color: 0x555555,
      wireframe: true
    })
  );
  floor.rotation.x = -Math.PI / 2;
  this.scene.add(floor);

  var playerTexture = new THREE.ImageUtils.loadTexture("images/mario.png");

  this.playerAnim = new THREE.SpriteAnimation({
    texture: playerTexture,
    tilesHorizontal: 6,
    tilesVertical: 4,
    numberOfTiles: 24,
    delay: 42
  });

  this.playerAnim.add("idle",     {from: 22, to: 22});
  this.playerAnim.add("left",     {from:  0, to:  5});
  this.playerAnim.add("backward", {from:  6, to: 11});
  this.playerAnim.add("right",    {from: 12, to: 17});
  this.playerAnim.add("forward",  {from: 18, to: 23});

  this.playerAnim.play("idle");

  var playerMaterial = new THREE.MeshBasicMaterial({map: playerTexture});
  playerMaterial.transparent = true;
  this.player = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    playerMaterial
  );

  this.player.position.x += 25;
  this.player.position.y += 25;
  this.player.position.z += 25;
  this.scene.add(this.player);

  this.controls = new THREE.ThirdPersonControls({
    camera: this.camera,
    target: this.player,
    lerp: 0.05
  });

});

context.addEventListener("frame", function (event) {
  if (THREE.Input.isKeyPressed("W"))
    this.playerAnim.play("forward");
  else if (THREE.Input.isKeyPressed("S"))
    this.playerAnim.play("backward");
  else if (THREE.Input.isKeyPressed("Q"))
    this.playerAnim.play("left");
  else if (THREE.Input.isKeyPressed("E"))
    this.playerAnim.play("right");
  else if (!THREE.Input.isKeyPressed())
    this.playerAnim.play("idle");
  this.playerAnim.update(event.deltaTime * 1000);
});

context.start();

}();