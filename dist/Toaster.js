define(["require", "exports", 'dijit/_TemplatedMixin', 'dijit/_WidgetBase', './ToasterItem', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/aspect', 'dojo/topic', 'dojo/text!./templates/Toaster.html'], function (require, exports, _TemplatedMixin, _WidgetBase, ToasterItem_1, dojoDeclare, lang, aspect, topic, template) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = dojoDeclare([_WidgetBase, _TemplatedMixin], {
        // description:
        //      a toaster notification widget
        templateString: template,
        baseClass: 'toaster',
        // separator: Number
        //		The number if items currently being shown
        count: 0,
        // separator: Number
        //		The amx number if items to show
        maxItems: 5,
        // topic: String
        //		Name of topic; anything published to this topic will be displayed as a message.
        //		Message format is either String or an object like
        //		{message: 'hello word', type: 'error'}
        topic: 'app/Toaster',
        // allowableClasses: array
        //		The css classes that will work properly with bootstrap
        allowableClasses: [
            'info',
            'success',
            'warning',
            'danger'
        ],
        // defaultClass: String
        //		The default class to use when none is passed in
        defaultClass: 'info',
        // Properties to be sent into constructor
        postCreate: function () {
            // summary:
            //      Overrides method of same name in dijit._Widget.
            console.log('app.Toaster::postCreate', arguments);
            this.toasterItems = [];
            this.setupConnections();
            this.inherited(arguments);
        },
        setupConnections: function () {
            // summary:
            //      wire events, and such
            console.log('app.Toaster::setupConnections', arguments);
            this.own(topic.subscribe(this.topic, lang.hitch(this, this.handleMessage)));
        },
        handleMessage: function (message) {
            // summary:
            //      handles the message and sets default arguments
            // {message: type: sticky:}
            console.log('app.Toaster:handleMessage', arguments);
            if (lang.isString(message)) {
                this.setContent(message, this.defaultClass);
            }
            else {
                var cssClass = message.type;
                if (!cssClass || this.allowableClasses.indexOf(cssClass) < 0) {
                    cssClass = this.defaultClass;
                }
                this.setContent(message.message, cssClass, message.sticky);
            }
        },
        setContent: function (message, cssClass, sticky) {
            // summary:
            //      description
            // the message and it's css class
            console.log('app.Toaster:setContent', arguments);
            if (message) {
                if (this.isDuplicate(this.toasterItems, message, cssClass)) {
                    return;
                }
                var item = new ToasterItem_1.default({
                    message: message,
                    cssClass: cssClass,
                    sticky: sticky
                }).placeAt(this.domNode, 'first');
                if (this.toasterItems.length >= this.maxItems) {
                    var entry = this.toasterItems[0];
                    entry.destroyRecursive(false);
                }
                this.toasterItems.push(item);
                item.show();
                var connection;
                connection = aspect.before(item, 'destroyRecursive', lang.hitch(this, function () {
                    this.toasterItems = this.toasterItems.slice(1);
                    connection.remove();
                }));
            }
        },
        isDuplicate: function (items, message, cssClass) {
            // summary:
            //      returns true or false if there is a duplicate
            // the message text and css class
            console.log('app.Toaster:isDuplicate', arguments);
            return items.some(function (item) {
                return item.message + item.cssClass === message + cssClass;
            });
        }
    });
});
//# sourceMappingURL=Toaster.js.map