/**
 * @author arodic / http://akirodic.com/
 */

(function() {

  REE.PlaneHelper = function(config) {

    REE.call(this, config, THREE.Object3D);

    Object.defineProperties(this, {
      '_planeHelper': {value: new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1000000, 1000000, 2, 2),
        new THREE.MeshBasicMaterial({visible: false, wireframe: true, side: THREE.DoubleSide, depthTest: false})
      )}
    });

    this._planeHelper.rotation.set(Math.PI / 2, 0, 0);
    this._planeHelper.updateMatrixWorld();
    this.add(this._planeHelper);

  };

  REE.create(REE.PlaneHelper, THREE.Object3D);

  REE.PlaneHelper.prototype.lookAt = function(vector) {
    this._planeHelper.lookAt(vector);
  };

}());
