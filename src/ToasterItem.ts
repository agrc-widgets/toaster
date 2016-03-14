import * as _TemplatedMixin from 'dijit/_TemplatedMixin'
import * as _WidgetBase from 'dijit/_WidgetBase';

import * as template from 'dojo/text!toaster/templates/ToasterItem.html';

import * as dojoDeclare from 'dojo/_base/declare';
import * as baseFx from 'dojo/_base/fx';
import * as lang from 'dojo/_base/lang';

export type ToasterItemType = dijit._WidgetBase & dijit._TemplatedMixin & {
    duration: number;
    show(): void;
};

export default dojoDeclare([_WidgetBase, _TemplatedMixin], {
    // description:
    //      a line item in the toaster
    templateString: template,
    baseClass: 'toaster-item',

    // cssPrefix: String
    // the css prefix
    cssPrefix: 'alert-',

    // hideAnim: dojo/Animation
    //      the fade out animation
    hideAnim: null,

    // showAnim: dojo/Animation
    //      the fade in animation
    showAnim: null,


    // Properties to be sent into constructor

    // duration: Integer
    //        Number of milliseconds to show message
    duration: 5000,

    // message: String
    //      The text of the message to be displayed
    message: null,

    // cssClass: String
    //      Controlls the color of the alert
    cssClass: null,

    // sticky: Boolean
    //      Determins if the alert auto-hides
    sticky: false,


    constructor: function (params) {
        // summary:
        //      overrides same method in _WidgetBase
        // params: Object
        console.log('app.ToasterItem::constructor', arguments);

        if (params.cssClass === 'danger' && params.sticky === undefined) {
            params.sticky = true;
        }
    },
    postCreate: function () {
        // summary:
        //      Overrides method of same name in dijit._Widget.
        console.log('app.ToasterItem::postCreate', arguments);

        this.own(
            this.hideAnim = baseFx.fadeOut({
                node: this.domNode,
                duration: 1000
            }),
            this.showAnim = baseFx.fadeIn({node: this.domNode})
        );
        this.hideAnim.on('end', lang.partial(lang.hitch(this, this.destroyRecursive), false));

        this.inherited(arguments);
    },
    show() {
        // summary:
        //      shows the item
        console.log('app.ToasterItem:show', arguments);

        this.showAnim.play();

        if (!this.sticky) {
            this._setHideTimer(this.duration);
        }

        return 1;
    },
    hide: function () {
        // summary:
        //      hides the alert
        console.log('app.ToasterItem:hide', arguments);

        this.hideAnim.play();
    },
    _setHideTimer: function (duration) {
        this._cancelHideTimer();
        if (duration > 0) {
            this._cancelHideTimer();

            var that = this;
            this._hideTimer = setTimeout(function () {
                that._hideTimer = null;
                that.hideAnim.play();
            }, duration);
        }
    },
    _cancelHideTimer: function () {
        if (this._hideTimer) {
            clearTimeout(this._hideTimer);
            this._hideTimer = null;
        }
    },
    destroyRecursive: function () {
        // summary:
        //      remove timer
        console.log('app.ToasterItem:destroyRecursive', arguments);

        delete this.showAnim;
        delete this.hideAnim;

        this._cancelHideTimer();

        this.inherited(arguments);
    }
});
