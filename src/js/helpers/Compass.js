/**
 * @author arodic / http://akirodic.com/
 */

(function() {

  var tempMatrix = new THREE.Matrix4();
  var vector = new THREE.Vector3();

  REE.CompassHelper = function(config) {

    Carbon.call(this, config, THREE.Object3D);

    this.registerProperties({
      axis: {
        value: new THREE.AxisHelper(1),
        type: THREE.AxisHelper,
        writable: false
      },
      visible: {
        value: true,
        type: Boolean
      },
      size: {
        value: 0.25,
        type: Number
      }
    });

    this.axis.matrixAutoUpdate = false;
    this.axis.material.linewidth = 2;
    this.axis.material.depthTest = false;
    this.axis.frustumCulled = false;

    this.matrixAutoUpdate = false;
    this.add(this.axis);

  };

  Carbon.create(REE.CompassHelper, THREE.Object3D);

  REE.CompassHelper.prototype.update = function(camera) {

    if (camera) {

      this.matrix.identity();

      tempMatrix.identity();
      this.matrix.multiply(camera.matrixWorld);

      tempMatrix.identity();
      this.axis.matrix.identity();
      this.axis.matrix.multiply(tempMatrix.getInverse(tempMatrix.extractRotation(camera.matrixWorld)));

      tempMatrix.identity();
      tempMatrix.makeTranslation(0, 0, 0);
      this.axis.matrix.multiply(tempMatrix);

      tempMatrix.identity();
      this.matrix.multiply(tempMatrix.getInverse(camera.projectionMatrix));

      vector.set(1, 1, 1).applyProjection(camera.projectionMatrix);
      var sx = this.size * vector.x / vector.y;
      var sy = this.size;

      tempMatrix.identity();
      tempMatrix.makeTranslation(1 - sx, 1 - sy, 0.0);
      this.matrix.multiply(tempMatrix);

      tempMatrix.identity();
      tempMatrix.makeScale(sx, sy, 1);
      this.matrix.multiply(tempMatrix);

    }

  };

}());
