!function(){var PLATFORM_VERSION_BUILD_LABEL="4.0.0",require,define;!function(){function e(e){var n=e.factory,o=function(n){var o=n;return"."===n.charAt(0)&&(o=e.id.slice(0,e.id.lastIndexOf(t))+t+n.slice(2)),require(o)};return e.exports={},delete e.factory,n(o,e.exports,e),e.exports}var n={},o=[],r={},t=".";require=function(t){if(!n[t])throw"module "+t+" not found";if(t in r){var i=o.slice(r[t]).join("->")+"->"+t;throw"Cycle in require graph: "+i}if(n[t].factory)try{return r[t]=o.length,o.push(t),e(n[t])}finally{delete r[t],o.pop()}return n[t].exports},define=function(e,o){if(n[e])throw"module "+e+" already defined";n[e]={id:e,factory:o}},define.remove=function(e){delete n[e]},define.moduleMap=n}(),"object"==typeof module&&"function"==typeof require&&(module.exports.require=require,module.exports.define=define),define("cordova",function(e,n,o){function r(e,n){var o=document.createEvent("Events");if(o.initEvent(e,!1,!1),n)for(var r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);return o}if("cordova"in window)throw new Error("cordova already defined");var t=e("cordova/channel"),i=e("cordova/platform"),a=document.addEventListener,c=document.removeEventListener,d=window.addEventListener,s=window.removeEventListener,u={},l={};document.addEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].subscribe(n):a.call(document,e,n,o)},window.addEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].subscribe(n):d.call(window,e,n,o)},document.removeEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].unsubscribe(n):c.call(document,e,n,o)},window.removeEventListener=function(e,n,o){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].unsubscribe(n):s.call(window,e,n,o)};var f={define:define,require:e,version:PLATFORM_VERSION_BUILD_LABEL,platformVersion:PLATFORM_VERSION_BUILD_LABEL,platformId:i.id,addWindowEventHandler:function(e){return l[e]=t.create(e)},addStickyDocumentEventHandler:function(e){return u[e]=t.createSticky(e)},addDocumentEventHandler:function(e){return u[e]=t.create(e)},removeWindowEventHandler:function(e){delete l[e]},removeDocumentEventHandler:function(e){delete u[e]},getOriginalHandlers:function(){return{document:{addEventListener:a,removeEventListener:c},window:{addEventListener:d,removeEventListener:s}}},fireDocumentEvent:function(e,n,o){var t=r(e,n);"undefined"!=typeof u[e]?o?u[e].fire(t):setTimeout(function(){"deviceready"==e&&document.dispatchEvent(t),u[e].fire(t)},0):document.dispatchEvent(t)},fireWindowEvent:function(e,n){var o=r(e,n);"undefined"!=typeof l[e]?setTimeout(function(){l[e].fire(o)},0):window.dispatchEvent(o)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(e,n){f.callbackFromNative(e,!0,n.status,[n.message],n.keepCallback)},callbackError:function(e,n){f.callbackFromNative(e,!1,n.status,[n.message],n.keepCallback)},callbackFromNative:function(e,n,o,r,t){try{var i=f.callbacks[e];i&&(n&&o==f.callbackStatus.OK?i.success&&i.success.apply(null,r):n||i.fail&&i.fail.apply(null,r),t||delete f.callbacks[e])}catch(a){var c="Error in "+(n?"Success":"Error")+" callbackId: "+e+" : "+a;throw console&&console.log&&console.log(c),f.fireWindowEvent("cordovacallbackerror",{message:c}),a}},addConstructor:function(e){t.onCordovaReady.subscribe(function(){try{e()}catch(n){console.log("Failed to run constructor: "+n)}})}};o.exports=f}),define("cordova/android/nativeapiprovider",function(e,n,o){var r=this._cordovaNative||e("cordova/android/promptbasednativeapi"),t=r;o.exports={get:function(){return t},setPreferPrompt:function(n){t=n?e("cordova/android/promptbasednativeapi"):r},set:function(e){t=e}}}),define("cordova/android/promptbasednativeapi",function(e,n,o){o.exports={exec:function(e,n,o,r,t){return prompt(t,"gap:"+JSON.stringify([e,n,o,r]))},setNativeToJsBridgeMode:function(e,n){prompt(n,"gap_bridge_mode:"+e)},retrieveJsMessages:function(e,n){return prompt(+n,"gap_poll:"+e)}}}),define("cordova/argscheck",function(e,n,o){function r(e,n){return/.*?\((.*?)\)/.exec(e)[1].split(", ")[n]}function t(e,n,o,t){if(c.enableChecks){for(var i,s=null,u=0;u<e.length;++u){var l=e.charAt(u),f=l.toUpperCase(),v=o[u];if("*"!=l&&(i=a.typeName(v),(null!==v&&void 0!==v||l!=f)&&i!=d[f])){s="Expected "+d[f];break}}if(s)throw s+=", but got "+i+".",s='Wrong type for parameter "'+r(t||o.callee,u)+'" of '+n+": "+s,"undefined"==typeof jasmine&&console.error(s),TypeError(s)}}function i(e,n){return void 0===e?n:e}var a=(e("cordova/exec"),e("cordova/utils")),c=o.exports,d={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};c.checkArgs=t,c.getValue=i,c.enableChecks=!0}),define("cordova/base64",function(e,n){function o(e){for(var n,o=e.byteLength,r="",t=a(),c=0;o-2>c;c+=3)n=(e[c]<<16)+(e[c+1]<<8)+e[c+2],r+=t[n>>12],r+=t[4095&n];return o-c==2?(n=(e[c]<<16)+(e[c+1]<<8),r+=t[n>>12],r+=i[(4095&n)>>6],r+="="):o-c==1&&(n=e[c]<<16,r+=t[n>>12],r+="=="),r}var r=n;r.fromArrayBuffer=function(e){var n=new Uint8Array(e);return o(n)},r.toArrayBuffer=function(e){for(var n="undefined"!=typeof atob?atob(e):new Buffer(e,"base64").toString("binary"),o=new ArrayBuffer(n.length),r=new Uint8Array(o),t=0,i=n.length;i>t;t++)r[t]=n.charCodeAt(t);return o};var t,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(){t=[];for(var e=0;64>e;e++)for(var n=0;64>n;n++)t[64*e+n]=i[e]+i[n];return a=function(){return t},t}}),define("cordova/builder",function(e,n){function o(e,n,o){for(var r in e)e.hasOwnProperty(r)&&n.apply(o,[e[r],r])}function r(e,o,r){n.replaceHookForTesting(e,o);var t=!1;try{e[o]=r}catch(i){t=!0}(t||e[o]!==r)&&c.defineGetter(e,o,function(){return r})}function t(e,n,o,t){t?c.defineGetter(e,n,function(){return console.log(t),delete e[n],r(e,n,o),o}):r(e,n,o)}function i(n,r,d,s){o(r,function(o,r){try{var u=o.path?e(o.path):{};d?("undefined"==typeof n[r]?t(n,r,u,o.deprecated):"undefined"!=typeof o.path&&(s?a(n[r],u):t(n,r,u,o.deprecated)),u=n[r]):"undefined"==typeof n[r]?t(n,r,u,o.deprecated):u=n[r],o.children&&i(u,o.children,d,s)}catch(l){c.alert("Exception building Cordova JS globals: "+l+' for key "'+r+'"')}})}function a(e,n){for(var o in n)n.hasOwnProperty(o)&&(e.prototype&&e.prototype.constructor===e?r(e.prototype,o,n[o]):"object"==typeof n[o]&&"object"==typeof e[o]?a(e[o],n[o]):r(e,o,n[o]))}var c=e("cordova/utils");n.buildIntoButDoNotClobber=function(e,n){i(n,e,!1,!1)},n.buildIntoAndClobber=function(e,n){i(n,e,!0,!1)},n.buildIntoAndMerge=function(e,n){i(n,e,!0,!0)},n.recursiveMerge=a,n.assignOrWrapInDeprecateGetter=t,n.replaceHookForTesting=function(){}}),define("cordova/channel",function(e,n,o){function r(e){if("function"!=typeof e)throw"Function required as first argument!"}var t=e("cordova/utils"),i=1,a=function(e,n){this.type=e,this.handlers={},this.state=n?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},c={join:function(e,n){for(var o=n.length,r=o,t=function(){--r||e()},i=0;o>i;i++){if(0===n[i].state)throw Error("Can only use join with sticky channels.");n[i].subscribe(t)}o||e()},create:function(e){return c[e]=new a(e,!1)},createSticky:function(e){return c[e]=new a(e,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(e){if(e){var n=c[e]||this.createSticky(e);this.deviceReadyChannelsMap[e]=n,this.deviceReadyChannelsArray.push(n)}},initializationComplete:function(e){var n=this.deviceReadyChannelsMap[e];n&&n.fire()}};a.prototype.subscribe=function(e,n){if(r(e),2==this.state)return void e.apply(n||this,this.fireArgs);var o=e,a=e.observer_guid;"object"==typeof n&&(o=t.close(n,e)),a||(a=""+i++),o.observer_guid=a,e.observer_guid=a,this.handlers[a]||(this.handlers[a]=o,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.unsubscribe=function(e){r(e);var n=e.observer_guid,o=this.handlers[n];o&&(delete this.handlers[n],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.fire=function(){var e=Array.prototype.slice.call(arguments);if(1==this.state&&(this.state=2,this.fireArgs=e),this.numHandlers){var n=[];for(var o in this.handlers)n.push(this.handlers[o]);for(var r=0;r<n.length;++r)n[r].apply(this,e);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},c.createSticky("onDOMContentLoaded"),c.createSticky("onNativeReady"),c.createSticky("onCordovaReady"),c.createSticky("onPluginsReady"),c.createSticky("onDeviceReady"),c.create("onResume"),c.create("onPause"),c.waitForInitialization("onCordovaReady"),c.waitForInitialization("onDOMContentLoaded"),o.exports=c}),define("cordova/exec",function(require,exports,module){function androidExec(e,n,o,r,t){if(0>bridgeSecret)throw new Error("exec() called without bridgeSecret");void 0===jsToNativeBridgeMode&&androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);for(var i=0;i<t.length;i++)"ArrayBuffer"==utils.typeName(t[i])&&(t[i]=base64.fromArrayBuffer(t[i]));var a=o+cordova.callbackId++,c=JSON.stringify(t);(e||n)&&(cordova.callbacks[a]={success:e,fail:n});var d=nativeApiProvider.get().exec(bridgeSecret,o,r,a,c);jsToNativeBridgeMode==jsToNativeModes.JS_OBJECT&&"@Null arguments."===d?(androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT),androidExec(e,n,o,r,t),androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT)):d&&(messagesFromNative.push(d),nextTick(processMessages))}function pollOnceFromOnlineEvent(){pollOnce(!0)}function pollOnce(e){if(!(0>bridgeSecret)){var n=nativeApiProvider.get().retrieveJsMessages(bridgeSecret,!!e);n&&(messagesFromNative.push(n),processMessages())}}function pollingTimerFunc(){pollEnabled&&(pollOnce(),setTimeout(pollingTimerFunc,50))}function hookOnlineApis(){function e(e){cordova.fireWindowEvent(e.type)}window.addEventListener("online",pollOnceFromOnlineEvent,!1),window.addEventListener("offline",pollOnceFromOnlineEvent,!1),cordova.addWindowEventHandler("online"),cordova.addWindowEventHandler("offline"),document.addEventListener("online",e,!1),document.addEventListener("offline",e,!1)}function buildPayload(e,n){var o=n.charAt(0);if("s"==o)e.push(n.slice(1));else if("t"==o)e.push(!0);else if("f"==o)e.push(!1);else if("N"==o)e.push(null);else if("n"==o)e.push(+n.slice(1));else if("A"==o){var r=n.slice(1);e.push(base64.toArrayBuffer(r))}else if("S"==o)e.push(window.atob(n.slice(1)));else if("M"==o)for(var t=n.slice(1);""!==t;){var i=t.indexOf(" "),a=+t.slice(0,i),c=t.substr(i+1,a);t=t.slice(i+a+1),buildPayload(e,c)}else e.push(JSON.parse(n))}function processMessage(message){var firstChar=message.charAt(0);if("J"==firstChar)eval(message.slice(1));else if("S"==firstChar||"F"==firstChar){var success="S"==firstChar,keepCallback="1"==message.charAt(1),spaceIdx=message.indexOf(" ",2),status=+message.slice(2,spaceIdx),nextSpaceIdx=message.indexOf(" ",spaceIdx+1),callbackId=message.slice(spaceIdx+1,nextSpaceIdx),payloadMessage=message.slice(nextSpaceIdx+1),payload=[];buildPayload(payload,payloadMessage),cordova.callbackFromNative(callbackId,success,status,payload,keepCallback)}else console.log("processMessage failed: invalid message: "+JSON.stringify(message))}function processMessages(){if(!isProcessing&&0!==messagesFromNative.length){isProcessing=!0;try{var e=popMessageFromQueue();if("*"==e&&0===messagesFromNative.length)return void nextTick(pollOnce);processMessage(e)}finally{isProcessing=!1,messagesFromNative.length>0&&nextTick(processMessages)}}}function popMessageFromQueue(){var e=messagesFromNative.shift();if("*"==e)return"*";var n=e.indexOf(" "),o=+e.slice(0,n),r=e.substr(n+1,o);return e=e.slice(n+o+1),e&&messagesFromNative.unshift(e),r}var cordova=require("cordova"),nativeApiProvider=require("cordova/android/nativeapiprovider"),utils=require("cordova/utils"),base64=require("cordova/base64"),channel=require("cordova/channel"),jsToNativeModes={PROMPT:0,JS_OBJECT:1},nativeToJsModes={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,PRIVATE_API:3},jsToNativeBridgeMode,nativeToJsBridgeMode=nativeToJsModes.ONLINE_EVENT,pollEnabled=!1,bridgeSecret=-1,messagesFromNative=[],isProcessing=!1,resolvedPromise="undefined"==typeof Promise?null:Promise.resolve(),nextTick=resolvedPromise?function(e){resolvedPromise.then(e)}:function(e){setTimeout(e)};androidExec.init=function(){bridgeSecret=+prompt("","gap_init:"+nativeToJsBridgeMode),channel.onNativeReady.fire()},hookOnlineApis(),androidExec.jsToNativeModes=jsToNativeModes,androidExec.nativeToJsModes=nativeToJsModes,androidExec.setJsToNativeBridgeMode=function(e){e!=jsToNativeModes.JS_OBJECT||window._cordovaNative||(e=jsToNativeModes.PROMPT),nativeApiProvider.setPreferPrompt(e==jsToNativeModes.PROMPT),jsToNativeBridgeMode=e},androidExec.setNativeToJsBridgeMode=function(e){e!=nativeToJsBridgeMode&&(nativeToJsBridgeMode==nativeToJsModes.POLLING&&(pollEnabled=!1),nativeToJsBridgeMode=e,bridgeSecret>=0&&nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret,e),e==nativeToJsModes.POLLING&&(pollEnabled=!0,setTimeout(pollingTimerFunc,1)))},module.exports=androidExec}),define("cordova/exec/proxy",function(e,n,o){var r={};o.exports={add:function(e,n){return console.log("adding proxy for "+e),r[e]=n,n},remove:function(e){var n=r[e];return delete r[e],r[e]=null,n},get:function(e,n){return r[e]?r[e][n]:null}}}),define("cordova/init",function(e){function n(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function o(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var r in e)"function"==typeof e[r]?o[r]=e[r].bind(e):!function(n){d.defineGetterSetter(o,r,function(){return e[n]})}(r);return o}var r=e("cordova/channel"),t=e("cordova"),i=e("cordova/modulemapper"),a=e("cordova/platform"),c=e("cordova/pluginloader"),d=e("cordova/utils"),s=[r.onNativeReady,r.onPluginsReady];window.setTimeout(function(){2!=r.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),n(s),n(r.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=o(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),r.onPause=t.addDocumentEventHandler("pause"),r.onResume=t.addDocumentEventHandler("resume"),r.onDeviceReady=t.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?r.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){r.onDOMContentLoaded.fire()},!1),window._nativeReady&&r.onNativeReady.fire(),i.clobbers("cordova","cordova"),i.clobbers("cordova/exec","cordova.exec"),i.clobbers("cordova/exec","Cordova.exec"),a.bootstrap&&a.bootstrap(),setTimeout(function(){c.load(function(){r.onPluginsReady.fire()})},0),r.join(function(){i.mapModules(window),a.initialize&&a.initialize(),r.onCordovaReady.fire(),r.join(function(){e("cordova").fireDocumentEvent("deviceready")},r.deviceReadyChannelsArray)},s)}),define("cordova/init_b",function(e){function n(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function o(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var r in e)"function"==typeof e[r]?o[r]=e[r].bind(e):!function(n){a.defineGetterSetter(o,r,function(){return e[n]})}(r);return o}var r=e("cordova/channel"),t=e("cordova"),i=e("cordova/platform"),a=e("cordova/utils"),c=[r.onDOMContentLoaded,r.onNativeReady];t.exec=e("cordova/exec"),window.setTimeout(function(){2!=r.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),n(c),n(r.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=o(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),r.onPause=t.addDocumentEventHandler("pause"),r.onResume=t.addDocumentEventHandler("resume"),r.onDeviceReady=t.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?r.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){r.onDOMContentLoaded.fire()},!1),window._nativeReady&&r.onNativeReady.fire(),i.bootstrap&&i.bootstrap(),r.join(function(){i.initialize&&i.initialize(),r.onCordovaReady.fire(),r.join(function(){e("cordova").fireDocumentEvent("deviceready")},r.deviceReadyChannelsArray)},c)}),define("cordova/modulemapper",function(e,n){function o(e,n,o,r){if(!(n in c))throw new Error("Module "+n+" does not exist.");t.push(e,n,o),r&&(i[o]=r)}function r(e,n){if(!e)return n;for(var o,r=e.split("."),t=n,i=0;o=r[i];++i)t=t[o]=t[o]||{};return t}var t,i,a=e("cordova/builder"),c=define.moduleMap;n.reset=function(){t=[],i={}},n.clobbers=function(e,n,r){o("c",e,n,r)},n.merges=function(e,n,r){o("m",e,n,r)},n.defaults=function(e,n,r){o("d",e,n,r)},n.runs=function(e){o("r",e,null)},n.mapModules=function(n){var o={};n.CDV_origSymbols=o;for(var c=0,d=t.length;d>c;c+=3){var s=t[c],u=t[c+1],l=e(u);if("r"!=s){var f=t[c+2],v=f.lastIndexOf("."),p=f.substr(0,v),m=f.substr(v+1),g=f in i?"Access made to deprecated symbol: "+f+". "+g:null,h=r(p,n),b=h[m];"m"==s&&b?a.recursiveMerge(b,l):("d"==s&&!b||"d"!=s)&&(f in o||(o[f]=b),a.assignOrWrapInDeprecateGetter(h,m,l,g))}}},n.getOriginalSymbol=function(e,n){var o=e.CDV_origSymbols;if(o&&n in o)return o[n];for(var r=n.split("."),t=e,i=0;i<r.length;++i)t=t&&t[r[i]];return t},n.reset()}),define("cordova/platform",function(e,n,o){function r(n){var o=e("cordova"),r=n.action;switch(r){case"backbutton":case"menubutton":case"searchbutton":case"pause":case"resume":case"volumedownbutton":case"volumeupbutton":o.fireDocumentEvent(r);break;default:throw new Error("Unknown event action "+r)}}o.exports={id:"android",bootstrap:function(){function n(e){var n=t.addDocumentEventHandler(e+"button");n.onHasSubscribersChange=function(){i(null,null,c,"overrideButton",[e,1==this.numHandlers])}}var o=e("cordova/channel"),t=e("cordova"),i=e("cordova/exec"),a=e("cordova/modulemapper");i.init(),a.clobbers("cordova/plugin/android/app","navigator.app");var c=Number(t.platformVersion.split(".")[0])>=4?"CoreAndroid":"App",d=t.addDocumentEventHandler("backbutton");d.onHasSubscribersChange=function(){i(null,null,c,"overrideBackbutton",[1==this.numHandlers])},t.addDocumentEventHandler("menubutton"),t.addDocumentEventHandler("searchbutton"),n("volumeup"),n("volumedown"),o.onCordovaReady.subscribe(function(){i(r,null,c,"messageChannel",[]),i(null,null,c,"show",[])})}}}),define("cordova/plugin/android/app",function(e,n,o){var r=e("cordova/exec"),t=Number(e("cordova").platformVersion.split(".")[0])>=4?"CoreAndroid":"App";o.exports={clearCache:function(){r(null,null,t,"clearCache",[])},loadUrl:function(e,n){r(null,null,t,"loadUrl",[e,n])},cancelLoadUrl:function(){r(null,null,t,"cancelLoadUrl",[])},clearHistory:function(){r(null,null,t,"clearHistory",[])},backHistory:function(){r(null,null,t,"backHistory",[])},overrideBackbutton:function(e){r(null,null,t,"overrideBackbutton",[e])},overrideButton:function(e,n){r(null,null,t,"overrideButton",[e,n])},exitApp:function(){return r(null,null,t,"exitApp",[])}}}),define("cordova/pluginloader",function(e,n){function o(e,o,r,t){t=t||r,e in define.moduleMap?r():n.injectScript(o,function(){e in define.moduleMap?r():t()},t)}function r(e,n){for(var o,r=0;o=e[r];r++){if(o.clobbers&&o.clobbers.length)for(var t=0;t<o.clobbers.length;t++)a.clobbers(o.id,o.clobbers[t]);if(o.merges&&o.merges.length)for(var i=0;i<o.merges.length;i++)a.merges(o.id,o.merges[i]);o.runs&&a.runs(o.id)}n()}function t(e,n,t){function i(){--a||r(n,t)}var a=n.length;if(!a)return void t();for(var c=0;c<n.length;c++)o(n[c].id,e+n[c].file,i)}function i(){for(var e=null,n=document.getElementsByTagName("script"),o="/cordova.js",r=n.length-1;r>-1;r--){var t=n[r].src.replace(/\?.*$/,"");if(t.indexOf(o)==t.length-o.length){e=t.substring(0,t.length-o.length)+"/";break}}return e}{var a=e("cordova/modulemapper");e("cordova/urlutil")}n.injectScript=function(e,n,o){var r=document.createElement("script");r.onload=n,r.onerror=o,r.src=e,document.head.appendChild(r)},n.load=function(n){var r=i();null===r&&(console.log("Could not find cordova.js script tag. Plugin loading may fail."),r=""),o("cordova/plugin_list",r+"cordova_plugins.js",function(){var o=e("cordova/plugin_list");t(r,o,n)},n)}}),define("cordova/urlutil",function(e,n){n.makeAbsolute=function(e){var n=document.createElement("a");return n.href=e,n.href}}),define("cordova/utils",function(e,n){function o(e){for(var n="",o=0;e>o;o++){var r=parseInt(256*Math.random(),10).toString(16);1==r.length&&(r="0"+r),n+=r}return n}var r=n;r.defineGetterSetter=function(e,n,o,r){if(Object.defineProperty){var t={get:o,configurable:!0};r&&(t.set=r),Object.defineProperty(e,n,t)}else e.__defineGetter__(n,o),r&&e.__defineSetter__(n,r)},r.defineGetter=r.defineGetterSetter,r.arrayIndexOf=function(e,n){if(e.indexOf)return e.indexOf(n);for(var o=e.length,r=0;o>r;++r)if(e[r]==n)return r;return-1},r.arrayRemove=function(e,n){var o=r.arrayIndexOf(e,n);return-1!=o&&e.splice(o,1),-1!=o},r.typeName=function(e){return Object.prototype.toString.call(e).slice(8,-1)},r.isArray=function(e){return"Array"==r.typeName(e)},r.isDate=function(e){return"Date"==r.typeName(e)},r.clone=function(e){if(!e||"function"==typeof e||r.isDate(e)||"object"!=typeof e)return e;var n,o;if(r.isArray(e)){for(n=[],o=0;o<e.length;++o)n.push(r.clone(e[o]));return n}n={};for(o in e)o in n&&n[o]==e[o]||(n[o]=r.clone(e[o]));return n},r.close=function(e,n,o){return"undefined"==typeof o?function(){return n.apply(e,arguments)}:function(){return n.apply(e,o)}},r.createUUID=function(){return o(4)+"-"+o(2)+"-"+o(2)+"-"+o(2)+"-"+o(6)},r.extend=function(){var e=function(){};return function(n,o){e.prototype=o.prototype,n.prototype=new e,n.__super__=o.prototype,n.prototype.constructor=n}}(),r.alert=function(e){window.alert?window.alert(e):console&&console.log&&console.log(e)}}),window.cordova=require("cordova"),require("cordova/init")}();