/**
 * @author arodic / http://akirodic.com/
 */

(function() {

  REE.BoxHelper = function(config) {

    REE.call(this, config, THREE.Object3D);

    Object.defineProperties(this, {
      '_bboxHelper': {value: new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)))}
    });

    this._bboxHelper.material.depthTest = false;
    this.add(this._bboxHelper);

  };

  REE.create(REE.BoxHelper, THREE.Object3D);

}());
