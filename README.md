App-Arena.com Client JS SDK
=============================

App-Arena JS-Client SDK which dynamically loads and display widgets of the customer on all pages where it is included.
Always included via App-Arena [Analytics.js](https://github.com/apparena/analytics.js#analyticsjs) and loaded via shim/index.js

### Scripts
Run `yarn build` to build the Client-Sdk.  
Run `yarn build:shim` to build the the shim.

### Folder / File structure

Explanation of the folders in `/lib`

  Folder/File  | Description
--- | ---
 shim   | This File will be loaded by the [analytics.js-integration-apparena](https://github.com/apparena/analytics.js-integration-apparena#readme) and creates an iframe and loads the js-client-sdk (frame.js) 
 index.jsx   | Startpoint of the client-sdk, creates and renders the react-app.
 widgetContainer   | Render an Iframe for all Widgets and load async the js-file of the widget to show the widget.
 
### Deployment
 
At the moment there is no automatic deployment defined. `yarn build` will create the `frame.js` file, which needs to be uploaded to S3 Bucket `aa-manager-20/cdn/client-sdk/1.0/frame.js`.
The same for `yarn build:shim`. which will create the `shim.js` file. This file needs to be uploaded to S3 `aa-manager-20/cdn/client-sdk/1.0/shim.js`.
After a successful upload, the Cloudfront am-cdn.app-arena.com distribution needs to be invalidated.
