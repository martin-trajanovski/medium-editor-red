(function () {
    'use strict';

    var DisableContextMenuExtension = MediumEditor.Extension.extend({
            name: 'disable-context-menu',

            init: function () {
                this.getEditorElements().forEach(function (element) {
                    this.on(element, 'contextmenu', this.handleContextmenu.bind(this));
                }, this);
                this.subscribe('editableKeydown', this.handleKeydown.bind(this));
            },

            handleContextmenu: function (event) {
                if (!event.currentTarget.getAttribute('data-allow-context-menu')) {
                    event.preventDefault();
                }
            },

            handleKeydown: function (event, editable) {
                // If the user hits escape, toggle the data-allow-context-menu attribute
                if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ESCAPE)) {
                    if (editable.hasAttribute('data-allow-context-menu')) {
                        editable.removeAttribute('data-allow-context-menu');
                    } else {
                        editable.setAttribute('data-allow-context-menu', true);
                    }
                }
            }
        });
    MediumEditor.extensions.contextmenu = DisableContextMenuExtension;
})();