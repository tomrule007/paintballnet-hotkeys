!function(e){var n={};function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(n){return e[n]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);var o,i;window.pbnHotkeysCapture=!1,function(){const e=document.createElement("a"),n=document.createTextNode("PBN-Hotkeys");e.appendChild(n),e.title="red = not connected\nblack = connected\nhotkeys by tomrule007",e.id="pbnHotkeysLink",e.onclick=()=>{return e=!0,pbnHotkeysMenu.style.display=e?"block":"none",void(window.pbnHotkeysCapture=!0);var e},e.style.cssText="position: fixed; \n                     z-index: 1000;\n                     top: 0;\n                     right: 0;\n                     color: red;\n                     text-decoration: underline;\n                     cursor: pointer;\n                     ",document.body.appendChild(e);const t=document.createElement("template");t.innerHTML='\n<div class="TW3Panel TW3ContainerBorder TW3ContainerBackground"\nstyle="z-index: 8; display: inline-block; overflow: hidden;\nright: 2px; top: 40px; position: fixed; width: 350px; height: 53px;">\n    <div class="TW3Label"\n    style="z-index: 1; display: inline-block; overflow: hidden;\n    left: 2px; top: 2px; position: absolute; width: 257px; height: 18px;">\n        <div class="lbxcontent lbxcontent_h_left lbxdisableBreak lbxcontent_v_top">Paintballnet-Hotkeys</div>\n    </div>\n    <div class="TPBTListBox"\n    style="z-index: 2; display: inline-block; overflow: hidden;\n    left: 2px; top: 25px; position: absolute; width: 344px; height: 24px;">\n        <div id="Component157" class="TW3ScrollContainer"\n        style="z-index: 1; display: inline-block; overflow: hidden;\n        left: 0px; top: 0px; position: absolute; width: 342px; height: 22px;">\n            <div class="TPBTListBoxVisibleItems"\n            style="z-index: 1; display: inline-block; overflow: hidden;\n            left: 0px; top: 0px; position: absolute; will-change: transform; transform: translate(0px, 0px);\n            width: 342px; height: 22px;">\n                <div class="TPBTListBoxMonoSpaceItem TPBTListBoxItem"\n                style="z-index: 22; display: inline-block; overflow: hidden;\n                left: 0px; top: 0px; position: absolute; width: 342px;">\n                    <span>tomrule007               |standby   | 1904|5| |Marauders</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <button class="TW3Button TW3ButtonBackground TW3ButtonBorder" \n    style="z-index: 3; display: inline-block; overflow: hidden; \n    left: 333px; top: 2px; position: absolute; font-size: 8pt; width: 13px; height: 18px;">X</button>\n</div>',document.body.appendChild(t.content)}(),o=new Proxy(window.WebSocket,{construct:function(e,n){const t=new e(...n),o=e=>{t.removeEventListener("open",setLinkEnabled),t.removeEventListener("close",o)};t.addEventListener("open",setLinkEnabled),t.addEventListener("close",o);const i=new Proxy(t.send,{apply:function(e,n,t){e.apply(n,t)}});return t.send=i,window.sendPortal=t.send.bind(t),t}}),window.WebSocket=o,i={E1000:"get token jacket & sell token & get flag jacket & sell flag",e0000:"get token & get flag & put token jacket & put flag jacket",R1000:"game ready auto",r0000:"reload",q0000:"swap & get gun back & put %lhand back",Q1000:"game ready standby"},document.addEventListener("keydown",(function({key:e,shiftKey:n,altKey:t,ctrlKey:o,metaKey:l}){const d=e+ +n+ +t+ +o+ +l;window.Component592!==document.activeElement&&i[d]&&sendPortal(`{"id":"05","text":"${i[d]}"}`)}))}]);