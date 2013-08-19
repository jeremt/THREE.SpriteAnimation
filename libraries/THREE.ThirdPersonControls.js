/**
 * THREE.ThirdPersonControls
 * @author jeremt / jeremt.github.io
 */

~function () {

THREE = THREE || {};

/**
 * Default parameters values.
 */
var _defaultParams = {
  camera: null,
  target: null,
  lerp: 1.0,
  moveSpeed: 200,
  rotateSpeed: Math.PI / 2,
  offset: new THREE.Vector3(0, 50, 200),
  keyMapping: 'qwerty'
};

/**
 * Keys mappings.
 */
var _keys = {
  qwerty: {
    translate: {
      forward: "W",
      backward: "S",
      left: "Q",
      right: "E"
    },
    rotate: {
      up: "R",
      down: "F",
      left: "A",
      right: "D"
    }
  },
  azerty: {
    translate: {
      forward: "Z",
      backward: "S",
      left: "A",
      right: "E"
    },
    rotate: {
      up: "R",
      down: "F",
      left: "Q",
      right: "D"
    }
  }
};

/**
 * Create controls.
 * @param Some options settings.
 */
THREE.ThirdPersonControls = function (params) {
  params || (params = {});

  // check errors
  if (!params.target instanceof THREE.Object3D)
    return console.error("Invalid target.");
  if (!params.camera instanceof THREE.PerspectiveCamera)
    return console.error("Invalid camera.");

  // add parameters
  for (var key in _defaultParams)
    this[key] = _defaultParams[key];
  for (var key in params)
    this[key] = params[key];
}

/**
 * Update controls at each frames.
 */
THREE.ThirdPersonControls.prototype.update = function (delta) {
  var moveDistance = this.moveSpeed * delta;
  var rotateAngle = this.rotateSpeed * delta;
  
  // update translations from input.
  var t = _keys[this.keyMapping].translate;
  if (THREE.Input.isKeyPressed(t.forward))
    this.target.translateZ(-moveDistance);
  if (THREE.Input.isKeyPressed(t.backward))
    this.target.translateZ(moveDistance);
  if (THREE.Input.isKeyPressed(t.left))
    this.target.translateX(-moveDistance);
  if (THREE.Input.isKeyPressed(t.right))
    this.target.translateX(moveDistance); 

  // update rotations from input.
  var r = _keys[this.keyMapping].rotate;
  var rotation_matrix = new THREE.Matrix4().identity();
  if (THREE.Input.isKeyPressed(r.left))
    this.target.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
  if (THREE.Input.isKeyPressed(r.right))
    this.target.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
  if (THREE.Input.isKeyPressed(r.up))
    this.target.rotateOnAxis(new THREE.Vector3(1,0,0), rotateAngle);
  if (THREE.Input.isKeyPressed(r.down))
    this.target.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle);

  // place camera.
  
  var relativeCameraOffset = new THREE.Vector3(0,50,200);
  var cameraOffset = relativeCameraOffset.applyMatrix4(this.target.matrixWorld);

  this.camera.position.lerp(cameraOffset.clone(), this.lerp * 100 * delta);
  this.camera.lookAt(this.target.position);

}

}();