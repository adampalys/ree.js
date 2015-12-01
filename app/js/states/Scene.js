/**
 * @author arodic / http://akirodic.com/
 */

(function() {

  REE.SceneState = function(config) {

    Carbon.call(this, config, THREE.Scene);

    this.registerProperties({
      _helpers: {
        value: new THREE.Scene(),
        type: THREE.Scene,
        writable: false
      }
    });

  };

  Carbon.create(REE.SceneState, THREE.Scene);

}());
