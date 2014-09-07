(function(){/* jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license.*/
var g=/\\[object (Boolean|Number|String|Function|Array|Date|RegExp)\\]/;function h(a){return null==a?String(a):(a=g.exec(Object.prototype.toString.call(Object(a))))?a[1].toLowerCase():"object"}function k(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)}function m(a){if(!a||"object"!=h(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!k(a,"constructor")&&!k(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}for(var c in a);return void 0===c||k(a,c)};/*'+
 Copyright 2012 Google Inc. All rights reserved. */
function n(a,b,c){this.b=a;this.f=b||function(){};this.d=!1;this.a={};this.c=[];this.e=p(this);r(this,a,!c);var d=a.push,e=this;a.push=function(){var b=[].slice.call(arguments,0),c=d.apply(a,b);r(e,b);return c}}window.DataLayerHelper=n;n.prototype.get=function(a){var b=this.a;a=a.split(".");for(var c=0;c<a.length;c++){if(void 0===b[a[c]])return;b=b[a[c]]}return b};n.prototype.flatten=function(){this.b.splice(0,this.b.length);this.b[0]={};s(this.a,this.b[0])};
function r(a,b,c){for(a.c.push.apply(a.c,b);!1===a.d&&0<a.c.length;){b=a.c.shift();if("array"==h(b))a:{var d=b,e=a.a;if("string"==h(d[0])){for(var f=d[0].split("."),u=f.pop(),d=d.slice(1),l=0;l<f.length;l++){if(void 0===e[f[l]])break a;e=e[f[l]]}try{e[u].apply(e,d)}catch(v){}}}else if("function"==typeof b)try{b.call(a.e)}catch(w){}else if(m(b))for(var q in b)s(t(q,b[q]),a.a);else continue;c||(a.d=!0,a.f(a.a,b),a.d=!1)}}
function p(a){return{set:function(b,c){s(t(b,c),a.a)},get:function(b){return a.get(b)}}}function t(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c}function s(a,b){for(var c in a)if(k(a,c)){var d=a[c];"array"==h(d)?("array"==h(b[c])||(b[c]=[]),s(d,b[c])):m(d)?(m(b[c])||(b[c]={}),s(d,b[c])):b[c]=d}};})();

var dataslayer = {
    dLN: "dataLayer",
    gtmID: "",
    udoname: "utag_data",
    utagID: ""
};
dataslayer.helperListener = function(message, model) {
    var localDL = window[dataslayer.dLN];
    for (var ddl in localDL) {
        for (var ddel in localDL[ddl]) {
            if (localDL[ddl][ddel] instanceof Element) localDL[ddl][ddel] = "<i>element</i>";
        }
    }
    var poster = {
        type: "dataslayer_gtm",
        gtmID: dataslayer.gtmID,
        dLN: dataslayer.dLN,
        data: JSON.stringify(localDL)
    };
    window.postMessage(poster, "*");
};
dataslayer.timerID = window.setInterval(function() {
    if (window.hasOwnProperty("google_tag_manager"))
        for (var p in google_tag_manager) {
            if (google_tag_manager.hasOwnProperty(p) && typeof google_tag_manager[p] == "object") {
                if (p.substring(0, 4) !== "GTM-") dataslayer.dLN = p;
                else dataslayer.gtmID = p;
            }
        }
    if (typeof window[dataslayer.dLN] !== "undefined") {
        window.postMessage({
            type: "dataslayer_gtm",
            data: "found",
            gtmID: dataslayer.gtmID,
            dLN: dataslayer.dLN,
        }, "*");
        dataslayer.helper = new DataLayerHelper(window[dataslayer.dLN], dataslayer.helperListener, true);
        window.clearInterval(dataslayer.timerID);
    } else if ((document.readyState == "complete") && (typeof window[dataslayer.dLN] == "undefined") && (document.querySelector("script[src*=googletagmanager\\\\.com]") === null)) {
        window.postMessage({
            type: "dataslayer_gtm",
            data: "notfound"
        }, "*");
        window.clearInterval(dataslayer.timerID);
    }
}, 200);
dataslayer.tlmHelperListener = function(change) {
    var localDL = window[dataslayer.udoname];
    for (var ddl in localDL) {
        for (var ddel in localDL[ddl]) {
            if (localDL[ddl][ddel] instanceof Element) localDL[ddl][ddel] = "<i>element</i>";
        }
    }
    var poster = {
        type: "dataslayer_tlm",
        gtmID: dataslayer.utagID,
        dLN: dataslayer.udoname,
        data: JSON.stringify(localDL)
    };
    window.postMessage(poster, "*");
};
dataslayer.tlmTimerID = window.setInterval(function() {
    if (window.hasOwnProperty("utag")) {
        dataslayer.udoname = utag.udoname;
        dataslayer.utagID = utag.id;
    }
    if (typeof window[dataslayer.udoname] !== "undefined") {
        window.postMessage({
            type: "dataslayer_tlm",
            data: "found",
            gtmID: dataslayer.utagID,
            dLN: dataslayer.udoname
        }, "*");
        Object.observe(window[dataslayer.udoname], dataslayer.tlmHelperListener);
        window.clearInterval(dataslayer.tlmTimerID);
        dataslayer.tlmHelperListener();
    } else if ((document.readyState == "complete") && (typeof window[dataslayer.udoname] == "undefined")) {
        window.postMessage({
            type: "dataslayer_tlm",
            data: "notfound"
        }, "*");
        window.clearInterval(dataslayer.tlmTimerID);
    }
}, 200);