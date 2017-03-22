# Toaster

Easily toast messages to your app using a dynamically placed bootstrap alert.

### Install

```shell
bower install agrc-toaster --save
```

### Usage
```javascript
var toaster = new Toaster({
    topic: 'toast-topic'
});
toaster.startup();

topic.publish('toast-topic', 'hello world');
```

![screenshot](screenshot.png)
