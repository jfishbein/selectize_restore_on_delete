/**
 * Plugin: "restore_on_delete" (selectize.js)
 * Copyright (c) 2016 Jonathan Fishbein
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Jonathan Fishbein <jfishbein@gmail.com>
 */

Selectize.define('restore_on_delete', function(options) {
    var self = this;

    options.text = options.text || function(option) {
        return option[this.settings.labelField].trim();
    };

    this.onKeyDown = (function() {
        var original = self.onKeyDown;
        return function(e) {
            var index, option;
            if (e.keyCode === KEY_DELETE && this.$control_input.val() === '' && !this.$activeItems.length) {
                index = this.caretPos;
                if (index >= 0 && index < this.items.length) {
                    option = this.options[this.items[index]];
                    if (this.deleteSelection(e)) {
                        this.setTextboxValue(options.text.apply(this, [option]));
                        this.refreshOptions(true);
                        this.$control_input[0].selectionStart = 0;
                        this.$control_input[0].selectionEnd = 0;
                    }
                    e.preventDefault();
                    return;
                }
            }
            return original.apply(this, arguments);
        };
    })();
});
