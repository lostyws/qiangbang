define("juicer",[],function(e,t,n){!function(){var e=function(){var t=[].slice.call(arguments);return t.push(e.options),t[0].match(/^\s*#([\w:\-\.]+)\s*$/gim)&&t[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim,function(e,n){var i=document,r=i&&i.getElementById(n);t[0]=r?r.value||r.innerHTML:e}),1==arguments.length?e.compile.apply(e,t):arguments.length>=2?e.to_html.apply(e,t):void 0},t={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return t.escapehash[e]},escaping:function(e){return"string"!=typeof e?e:e.replace(/[&<>"]/gim,this.escapereplace)},detection:function(e){return"undefined"==typeof e?"":e}},i=function(e){if("undefined"!=typeof console){if(console.warn)return void console.warn(e);if(console.log)return void console.log(e)}throw e},r=function(e,t){if(e=e!==Object(e)?{}:e,e.__proto__)return e.__proto__=t,e;var n=function(){},i=Object.create?Object.create(t):new(n.prototype=t,n);for(var r in e)e.hasOwnProperty(r)&&(i[r]=e[r]);return i};e.__cache={},e.version="0.6.5-stable",e.settings={},e.tags={operationOpen:"{@",operationClose:"}",interpolateOpen:"\\${",interpolateClose:"}",noneencodeOpen:"\\$\\${",noneencodeClose:"}",commentOpen:"\\{#",commentClose:"\\}"},e.options={cache:!0,strip:!0,errorhandling:!0,detection:!0,_method:r({__escapehtml:t,__throw:i,__juicer:e},{})},e.tagInit=function(){var t=e.tags.operationOpen+"each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?"+e.tags.operationClose,n=e.tags.operationOpen+"\\/each"+e.tags.operationClose,i=e.tags.operationOpen+"if\\s*([^}]*?)"+e.tags.operationClose,r=e.tags.operationOpen+"\\/if"+e.tags.operationClose,o=e.tags.operationOpen+"else"+e.tags.operationClose,s=e.tags.operationOpen+"else if\\s*([^}]*?)"+e.tags.operationClose,a=e.tags.interpolateOpen+"([\\s\\S]+?)"+e.tags.interpolateClose,c=e.tags.noneencodeOpen+"([\\s\\S]+?)"+e.tags.noneencodeClose,p=e.tags.commentOpen+"[^}]*?"+e.tags.commentClose,l=e.tags.operationOpen+"each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)"+e.tags.operationClose,u=e.tags.operationOpen+"include\\s*([^}]*?)\\s*,\\s*([^}]*?)"+e.tags.operationClose;e.settings.forstart=new RegExp(t,"igm"),e.settings.forend=new RegExp(n,"igm"),e.settings.ifstart=new RegExp(i,"igm"),e.settings.ifend=new RegExp(r,"igm"),e.settings.elsestart=new RegExp(o,"igm"),e.settings.elseifstart=new RegExp(s,"igm"),e.settings.interpolate=new RegExp(a,"igm"),e.settings.noneencode=new RegExp(c,"igm"),e.settings.inlinecomment=new RegExp(p,"igm"),e.settings.rangestart=new RegExp(l,"igm"),e.settings.include=new RegExp(u,"igm")},e.tagInit(),e.set=function(e,t){var n=this,i=function(e){return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim,function(e){return"\\"+e})},r=function(e,t){var r=e.match(/^tag::(.*)$/i);return r?(n.tags[r[1]]=i(t),void n.tagInit()):void(n.options[e]=t)};if(2===arguments.length)return void r(e,t);if(e===Object(e))for(var o in e)e.hasOwnProperty(o)&&r(o,e[o])},e.register=function(e,t){var n=this.options._method;return n.hasOwnProperty(e)?!1:n[e]=t},e.unregister=function(e){var t=this.options._method;return t.hasOwnProperty(e)?delete t[e]:void 0},e.template=function(t){var n=this;this.options=t,this.__interpolate=function(e,t,n){var i,r=e.split("|"),o=r[0]||"";return r.length>1&&(e=r.shift(),i=r.shift().split(","),o="_method."+i.shift()+".call({}, "+[e].concat(i)+")"),"<%= "+(t?"_method.__escapehtml.escaping":"")+"("+(n&&n.detection===!1?"":"_method.__escapehtml.detection")+"("+o+")) %>"},this.__removeShell=function(t,i){var r=0;return t=t.replace(e.settings.forstart,function(e,t,n,i){var n=n||"value",i=i&&i.substr(1),o="i"+r++;return"<% ~function() {for(var "+o+" in "+t+") {if("+t+".hasOwnProperty("+o+")) {var "+n+"="+t+"["+o+"];"+(i?"var "+i+"="+o+";":"")+" %>"}).replace(e.settings.forend,"<% }}}(); %>").replace(e.settings.ifstart,function(e,t){return"<% if("+t+") { %>"}).replace(e.settings.ifend,"<% } %>").replace(e.settings.elsestart,function(){return"<% } else { %>"}).replace(e.settings.elseifstart,function(e,t){return"<% } else if("+t+") { %>"}).replace(e.settings.noneencode,function(e,t){return n.__interpolate(t,!1,i)}).replace(e.settings.interpolate,function(e,t){return n.__interpolate(t,!0,i)}).replace(e.settings.inlinecomment,"").replace(e.settings.rangestart,function(e,t,n,i){var o="j"+r++;return"<% ~function() {for(var "+o+"="+n+";"+o+"<"+i+";"+o+"++) {{var "+t+"="+o+"; %>"}).replace(e.settings.include,function(e,t,n){return t.match(/^file\:\/\//gim)?e:"<%= _method.__juicer("+t+", "+n+"); %>"}),i&&i.errorhandling===!1||(t="<% try { %>"+t,t+='<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'),t},this.__toNative=function(e,t){return this.__convert(e,!t||t.strip)},this.__lexicalAnalyze=function(t){var n=[],i=[],r="",o=["if","each","_","_method","console","break","case","catch","continue","debugger","default","delete","do","finally","for","function","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","null","typeof","class","enum","export","extends","import","super","implements","interface","let","package","private","protected","public","static","yield","const","arguments","true","false","undefined","NaN"],s=function(e,t){if(Array.prototype.indexOf&&e.indexOf===Array.prototype.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},a=function(t,r){if(r=r.match(/\w+/gim)[0],-1===s(n,r)&&-1===s(o,r)&&-1===s(i,r)){if("undefined"!=typeof window&&"function"==typeof window[r]&&window[r].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;if("undefined"!=typeof global&&"function"==typeof global[r]&&global[r].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;if("function"==typeof e.options._method[r]||e.options._method.hasOwnProperty(r))return i.push(r),t;n.push(r)}return t};t.replace(e.settings.forstart,a).replace(e.settings.interpolate,a).replace(e.settings.ifstart,a).replace(e.settings.elseifstart,a).replace(e.settings.include,a).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_]+)/gim,a);for(var c=0;c<n.length;c++)r+="var "+n[c]+"=_."+n[c]+";";for(var c=0;c<i.length;c++)r+="var "+i[c]+"=_method."+i[c]+";";return"<% "+r+" %>"},this.__convert=function(e,t){var n=[].join("");return n+="'use strict';",n+="var _=_||{};",n+="var _out='';_out+='",n+=t!==!1?e.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;":e.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');"},this.parse=function(e,t){var i=this;return t&&t.loose===!1||(e=this.__lexicalAnalyze(e)+e),e=this.__removeShell(e,t),e=this.__toNative(e,t),this._render=new Function("_, _method",e),this.render=function(e,t){return t&&t===n.options._method||(t=r(t,n.options._method)),i._render.call(this,e,t)},this}},e.compile=function(e,t){t&&t===this.options||(t=r(t,this.options));try{var n=this.__cache[e]?this.__cache[e]:new this.template(this.options).parse(e,t);return t&&t.cache===!1||(this.__cache[e]=n),n}catch(o){return i("Juicer Compile Exception: "+o.message),{render:function(){}}}},e.to_html=function(e,t,n){return n&&n===this.options||(n=r(n,this.options)),this.compile(e,n).render(t,n._method)},n.exports=e}()});