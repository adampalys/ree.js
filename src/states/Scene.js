/**
 * @author arodic / http://akirodic.com/
 */

(function() {

  REE.SceneState = function(config) {

    REE.call(this, config, THREE.Scene);
    // REE.Element.prototype.extend(this, config, THREE.Scene);

    this.registerProperties({
      _helpers: {
        value: new THREE.Scene(),
        type: THREE.Scene,
        writable: false
      }
    });

  };

  REE.create(REE.SceneState, THREE.Scene);

}());
