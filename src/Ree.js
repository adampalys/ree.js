/**
 * @author arodic / http://akirodic.com/
 */

var REE = {};

REE.Revision = '0.0.1';

(function() {

  'use strict';

  REE.call = function (subclass, config, superclass) {

    if (typeof superclass === 'function') {
      superclass.call(subclass, config);
      REE.Element.call(subclass, config);
    } else {
      REE.Element.call(subclass, config);
    }

  };

}());

REE.create = function(sublass, superclass) {

  if (typeof superclass === 'function') {

    sublass.prototype = Object.create(superclass.prototype);
    sublass.prototype.constructor = sublass;

  } else {

    sublass.prototype = Object.create(REE.Element.prototype);
    sublass.prototype.constructor = sublass;

  }

  sublass.prototype.registerProperty = REE.Element.prototype.registerProperty;
  sublass.prototype.registerProperties = REE.Element.prototype.registerProperties;
  sublass.prototype.bindProperty = REE.Element.prototype.bindProperty;
  sublass.prototype.addEventListener = REE.Element.prototype.addEventListener;
  sublass.prototype.removeEventListener = REE.Element.prototype.removeEventListener;
  sublass.prototype.dispatchEvent = REE.Element.prototype.dispatchEvent;
  sublass.prototype.debounce = REE.Element.prototype.debounce;
  sublass.prototype._uuidChanged = REE.Element.prototype._uuidChanged;
  sublass.prototype.dispose = REE.Element.prototype.dispose;

};
