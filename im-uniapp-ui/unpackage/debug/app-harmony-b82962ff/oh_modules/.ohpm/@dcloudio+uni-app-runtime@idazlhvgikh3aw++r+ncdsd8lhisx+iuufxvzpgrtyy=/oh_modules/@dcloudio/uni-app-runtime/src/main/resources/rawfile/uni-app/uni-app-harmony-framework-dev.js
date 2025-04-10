//{"version":""}
"use strict";
(() => {
    var __defProp = Object.defineProperty;
    var __export = (target, all) => {
        for (var name in all)
            __defProp(target, name, { get: all[name], enumerable: true });
    };

    // ../uni-app-next/node_modules/.pnpm/@vue+shared@3.4.21/node_modules/@vue/shared/dist/shared.esm-bundler.js
    var shared_esm_bundler_exports = {};
    __export(shared_esm_bundler_exports, {
        EMPTY_ARR: () => EMPTY_ARR,
        EMPTY_OBJ: () => EMPTY_OBJ,
        NO: () => NO,
        NOOP: () => NOOP,
        PatchFlagNames: () => PatchFlagNames,
        PatchFlags: () => PatchFlags,
        ShapeFlags: () => ShapeFlags,
        SlotFlags: () => SlotFlags,
        camelize: () => camelize,
        capitalize: () => capitalize,
        def: () => def,
        escapeHtml: () => escapeHtml,
        escapeHtmlComment: () => escapeHtmlComment,
        extend: () => extend,
        genPropsAccessExp: () => genPropsAccessExp,
        generateCodeFrame: () => generateCodeFrame,
        getGlobalThis: () => getGlobalThis,
        hasChanged: () => hasChanged,
        hasOwn: () => hasOwn,
        hyphenate: () => hyphenate,
        includeBooleanAttr: () => includeBooleanAttr,
        invokeArrayFns: () => invokeArrayFns,
        isArray: () => isArray,
        isBooleanAttr: () => isBooleanAttr,
        isBuiltInDirective: () => isBuiltInDirective,
        isDate: () => isDate,
        isFunction: () => isFunction,
        isGloballyAllowed: () => isGloballyAllowed,
        isGloballyWhitelisted: () => isGloballyWhitelisted,
        isHTMLTag: () => isHTMLTag,
        isIntegerKey: () => isIntegerKey,
        isKnownHtmlAttr: () => isKnownHtmlAttr,
        isKnownSvgAttr: () => isKnownSvgAttr,
        isMap: () => isMap,
        isMathMLTag: () => isMathMLTag,
        isModelListener: () => isModelListener,
        isObject: () => isObject,
        isOn: () => isOn,
        isPlainObject: () => isPlainObject,
        isPromise: () => isPromise,
        isRegExp: () => isRegExp,
        isRenderableAttrValue: () => isRenderableAttrValue,
        isReservedProp: () => isReservedProp,
        isSSRSafeAttrName: () => isSSRSafeAttrName,
        isSVGTag: () => isSVGTag,
        isSet: () => isSet,
        isSpecialBooleanAttr: () => isSpecialBooleanAttr,
        isString: () => isString,
        isSymbol: () => isSymbol,
        isVoidTag: () => isVoidTag,
        looseEqual: () => looseEqual,
        looseIndexOf: () => looseIndexOf,
        looseToNumber: () => looseToNumber,
        makeMap: () => makeMap,
        normalizeClass: () => normalizeClass,
        normalizeProps: () => normalizeProps,
        normalizeStyle: () => normalizeStyle,
        objectToString: () => objectToString,
        parseStringStyle: () => parseStringStyle,
        propsToAttrMap: () => propsToAttrMap,
        remove: () => remove,
        slotFlagsText: () => slotFlagsText,
        stringifyStyle: () => stringifyStyle,
        toDisplayString: () => toDisplayString,
        toHandlerKey: () => toHandlerKey,
        toNumber: () => toNumber,
        toRawType: () => toRawType,
        toTypeString: () => toTypeString
    });
    function makeMap(str, expectsLowerCase) {
        const set3 = new Set(str.split(","));
        return expectsLowerCase ? (val) => set3.has(val.toLowerCase()) : (val) => set3.has(val);
    }
    var EMPTY_OBJ = true ? Object.freeze({}) : {};
    var EMPTY_ARR = true ? Object.freeze([]) : [];
    var NOOP = () => {
    };
    var NO = () => false;
    var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
        (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
    var isModelListener = (key) => key.startsWith("onUpdate:");
    var extend = Object.assign;
    var remove = (arr, el) => {
        const i = arr.indexOf(el);
        if (i > -1) {
            arr.splice(i, 1);
        }
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = (val, key) => hasOwnProperty.call(val, key);
    var isArray = Array.isArray;
    var isMap = (val) => toTypeString(val) === "[object Map]";
    var isSet = (val) => toTypeString(val) === "[object Set]";
    var isDate = (val) => toTypeString(val) === "[object Date]";
    var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
    var isFunction = (val) => typeof val === "function";
    var isString = (val) => typeof val === "string";
    var isSymbol = (val) => typeof val === "symbol";
    var isObject = (val) => val !== null && typeof val === "object";
    var isPromise = (val) => {
        return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
    };
    var objectToString = Object.prototype.toString;
    var toTypeString = (value) => objectToString.call(value);
    var toRawType = (value) => {
        return toTypeString(value).slice(8, -1);
    };
    var isPlainObject = (val) => toTypeString(val) === "[object Object]";
    var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    var isReservedProp = /* @__PURE__ */ makeMap(
        // the leading comma is intentional so empty string "" is also included
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    var isBuiltInDirective = /* @__PURE__ */ makeMap(
        "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
    );
    var cacheStringFunction = (fn) => {
        const cache2 = /* @__PURE__ */ Object.create(null);
        return (str) => {
            const hit = cache2[str];
            return hit || (cache2[str] = fn(str));
        };
    };
    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction((str) => {
        return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction(
        (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
    );
    var capitalize = cacheStringFunction((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });
    var toHandlerKey = cacheStringFunction((str) => {
        const s = str ? `on${capitalize(str)}` : ``;
        return s;
    });
    var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    var invokeArrayFns = (fns, arg) => {
        for (let i = 0; i < fns.length; i++) {
            fns[i](arg);
        }
    };
    var def = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: false,
            value
        });
    };
    var looseToNumber = (val) => {
        const n = parseFloat(val);
        return isNaN(n) ? val : n;
    };
    var toNumber = (val) => {
        const n = isString(val) ? Number(val) : NaN;
        return isNaN(n) ? val : n;
    };
    var _globalThis;
    var getGlobalThis = () => {
        return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    var identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
    function genPropsAccessExp(name) {
        return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
    }
    var PatchFlags = {
        "TEXT": 1,
        "1": "TEXT",
        "CLASS": 2,
        "2": "CLASS",
        "STYLE": 4,
        "4": "STYLE",
        "PROPS": 8,
        "8": "PROPS",
        "FULL_PROPS": 16,
        "16": "FULL_PROPS",
        "NEED_HYDRATION": 32,
        "32": "NEED_HYDRATION",
        "STABLE_FRAGMENT": 64,
        "64": "STABLE_FRAGMENT",
        "KEYED_FRAGMENT": 128,
        "128": "KEYED_FRAGMENT",
        "UNKEYED_FRAGMENT": 256,
        "256": "UNKEYED_FRAGMENT",
        "NEED_PATCH": 512,
        "512": "NEED_PATCH",
        "DYNAMIC_SLOTS": 1024,
        "1024": "DYNAMIC_SLOTS",
        "DEV_ROOT_FRAGMENT": 2048,
        "2048": "DEV_ROOT_FRAGMENT",
        "HOISTED": -1,
        "-1": "HOISTED",
        "BAIL": -2,
        "-2": "BAIL"
    };
    var PatchFlagNames = {
        [1]: `TEXT`,
        [2]: `CLASS`,
        [4]: `STYLE`,
        [8]: `PROPS`,
        [16]: `FULL_PROPS`,
        [32]: `NEED_HYDRATION`,
        [64]: `STABLE_FRAGMENT`,
        [128]: `KEYED_FRAGMENT`,
        [256]: `UNKEYED_FRAGMENT`,
        [512]: `NEED_PATCH`,
        [1024]: `DYNAMIC_SLOTS`,
        [2048]: `DEV_ROOT_FRAGMENT`,
        [-1]: `HOISTED`,
        [-2]: `BAIL`
    };
    var ShapeFlags = {
        "ELEMENT": 1,
        "1": "ELEMENT",
        "FUNCTIONAL_COMPONENT": 2,
        "2": "FUNCTIONAL_COMPONENT",
        "STATEFUL_COMPONENT": 4,
        "4": "STATEFUL_COMPONENT",
        "TEXT_CHILDREN": 8,
        "8": "TEXT_CHILDREN",
        "ARRAY_CHILDREN": 16,
        "16": "ARRAY_CHILDREN",
        "SLOTS_CHILDREN": 32,
        "32": "SLOTS_CHILDREN",
        "TELEPORT": 64,
        "64": "TELEPORT",
        "SUSPENSE": 128,
        "128": "SUSPENSE",
        "COMPONENT_SHOULD_KEEP_ALIVE": 256,
        "256": "COMPONENT_SHOULD_KEEP_ALIVE",
        "COMPONENT_KEPT_ALIVE": 512,
        "512": "COMPONENT_KEPT_ALIVE",
        "COMPONENT": 6,
        "6": "COMPONENT"
    };
    var SlotFlags = {
        "STABLE": 1,
        "1": "STABLE",
        "DYNAMIC": 2,
        "2": "DYNAMIC",
        "FORWARDED": 3,
        "3": "FORWARDED"
    };
    var slotFlagsText = {
        [1]: "STABLE",
        [2]: "DYNAMIC",
        [3]: "FORWARDED"
    };
    var GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error";
    var isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
    var isGloballyWhitelisted = isGloballyAllowed;
    var range = 2;
    function generateCodeFrame(source, start = 0, end = source.length) {
        let lines = source.split(/(\r?\n)/);
        const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
        lines = lines.filter((_, idx) => idx % 2 === 0);
        let count = 0;
        const res = [];
        for (let i = 0; i < lines.length; i++) {
            count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
            if (count >= start) {
                for (let j = i - range; j <= i + range || end > count; j++) {
                    if (j < 0 || j >= lines.length)
                        continue;
                    const line = j + 1;
                    res.push(
                        `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
                    );
                    const lineLength = lines[j].length;
                    const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
                    if (j === i) {
                        const pad = start - (count - (lineLength + newLineSeqLength));
                        const length = Math.max(
                            1,
                            end > count ? lineLength - pad : end - start
                        );
                        res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
                    } else if (j > i) {
                        if (end > count) {
                            const length = Math.max(Math.min(end - count, lineLength), 1);
                            res.push(`   |  ` + "^".repeat(length));
                        }
                        count += lineLength + newLineSeqLength;
                    }
                }
                break;
            }
        }
        return res.join("\n");
    }
    function normalizeStyle(value) {
        if (isArray(value)) {
            const res = {};
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
                if (normalized) {
                    for (const key in normalized) {
                        res[key] = normalized[key];
                    }
                }
            }
            return res;
        } else if (isString(value) || isObject(value)) {
            return value;
        }
    }
    var listDelimiterRE = /;(?![^(]*\))/g;
    var propertyDelimiterRE = /:([^]+)/;
    var styleCommentRE = /\/\*[^]*?\*\//g;
    function parseStringStyle(cssText) {
        const ret = {};
        cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }
    function stringifyStyle(styles) {
        let ret = "";
        if (!styles || isString(styles)) {
            return ret;
        }
        for (const key in styles) {
            const value = styles[key];
            const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
            if (isString(value) || typeof value === "number") {
                ret += `${normalizedKey}:${value};`;
            }
        }
        return ret;
    }
    function normalizeClass(value) {
        let res = "";
        if (isString(value)) {
            res = value;
        } else if (isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const normalized = normalizeClass(value[i]);
                if (normalized) {
                    res += normalized + " ";
                }
            }
        } else if (isObject(value)) {
            for (const name in value) {
                if (value[name]) {
                    res += name + " ";
                }
            }
        }
        return res.trim();
    }
    function normalizeProps(props) {
        if (!props)
            return null;
        let { class: klass, style } = props;
        if (klass && !isString(klass)) {
            props.class = normalizeClass(klass);
        }
        if (style) {
            props.style = normalizeStyle(style);
        }
        return props;
    }
    var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
    var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
    var VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
    var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    var isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
    var isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    var isBooleanAttr = /* @__PURE__ */ makeMap(
        specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
    );
    function includeBooleanAttr(value) {
        return !!value || value === "";
    }
    var unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    var attrValidationCache = {};
    function isSSRSafeAttrName(name) {
        if (attrValidationCache.hasOwnProperty(name)) {
            return attrValidationCache[name];
        }
        const isUnsafe = unsafeAttrCharRE.test(name);
        if (isUnsafe) {
            console.error(`unsafe attribute name: ${name}`);
        }
        return attrValidationCache[name] = !isUnsafe;
    }
    var propsToAttrMap = {
        acceptCharset: "accept-charset",
        className: "class",
        htmlFor: "for",
        httpEquiv: "http-equiv"
    };
    var isKnownHtmlAttr = /* @__PURE__ */ makeMap(
        `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
    );
    var isKnownSvgAttr = /* @__PURE__ */ makeMap(
        `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
    );
    function isRenderableAttrValue(value) {
        if (value == null) {
            return false;
        }
        const type = typeof value;
        return type === "string" || type === "number" || type === "boolean";
    }
    var escapeRE = /["'&<>]/;
    function escapeHtml(string) {
        const str = "" + string;
        const match = escapeRE.exec(str);
        if (!match) {
            return str;
        }
        let html = "";
        let escaped;
        let index2;
        let lastIndex = 0;
        for (index2 = match.index; index2 < str.length; index2++) {
            switch (str.charCodeAt(index2)) {
                case 34:
                    escaped = "&quot;";
                    break;
                case 38:
                    escaped = "&amp;";
                    break;
                case 39:
                    escaped = "&#39;";
                    break;
                case 60:
                    escaped = "&lt;";
                    break;
                case 62:
                    escaped = "&gt;";
                    break;
                default:
                    continue;
            }
            if (lastIndex !== index2) {
                html += str.slice(lastIndex, index2);
            }
            lastIndex = index2 + 1;
            html += escaped;
        }
        return lastIndex !== index2 ? html + str.slice(lastIndex, index2) : html;
    }
    var commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    function escapeHtmlComment(src) {
        return src.replace(commentStripRE, "");
    }
    function looseCompareArrays(a, b) {
        if (a.length !== b.length)
            return false;
        let equal = true;
        for (let i = 0; equal && i < a.length; i++) {
            equal = looseEqual(a[i], b[i]);
        }
        return equal;
    }
    function looseEqual(a, b) {
        if (a === b)
            return true;
        let aValidType = isDate(a);
        let bValidType = isDate(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? a.getTime() === b.getTime() : false;
        }
        aValidType = isSymbol(a);
        bValidType = isSymbol(b);
        if (aValidType || bValidType) {
            return a === b;
        }
        aValidType = isArray(a);
        bValidType = isArray(b);
        if (aValidType || bValidType) {
            return aValidType && bValidType ? looseCompareArrays(a, b) : false;
        }
        aValidType = isObject(a);
        bValidType = isObject(b);
        if (aValidType || bValidType) {
            if (!aValidType || !bValidType) {
                return false;
            }
            const aKeysCount = Object.keys(a).length;
            const bKeysCount = Object.keys(b).length;
            if (aKeysCount !== bKeysCount) {
                return false;
            }
            for (const key in a) {
                const aHasKey = a.hasOwnProperty(key);
                const bHasKey = b.hasOwnProperty(key);
                if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        return String(a) === String(b);
    }
    function looseIndexOf(arr, val) {
        return arr.findIndex((item) => looseEqual(item, val));
    }
    var toDisplayString = (val) => {
        return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    var replacer = (_key, val) => {
        if (val && val.__v_isRef) {
            return replacer(_key, val.value);
        } else if (isMap(val)) {
            return {
                [`Map(${val.size})`]: [...val.entries()].reduce(
                    (entries, [key, val2], i) => {
                        entries[stringifySymbol(key, i) + " =>"] = val2;
                        return entries;
                    },
                    {}
                )
            };
        } else if (isSet(val)) {
            return {
                [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
            };
        } else if (isSymbol(val)) {
            return stringifySymbol(val);
        } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
            return String(val);
        }
        return val;
    };
    var stringifySymbol = (v, i = "") => {
        var _a;
        return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
    };

    // ../uni-app-next/packages/uni-shared/src/constants.ts
    var LINEFEED = "\n";
    var TABBAR_HEIGHT = 50;
    var ON_REACH_BOTTOM_DISTANCE = 50;
    var I18N_JSON_DELIMITERS = ["%", "%"];
    var SCHEME_RE = /^([a-z-]+:)?\/\//i;
    var DATA_RE = /^data:.*,.*/;
    var WEB_INVOKE_APPSERVICE = "WEB_INVOKE_APPSERVICE";
    var WXS_PROTOCOL = "wxs://";
    var JSON_PROTOCOL = "json://";
    var WXS_MODULES = "wxsModules";
    var RENDERJS_MODULES = "renderjsModules";
    var ON_SHOW = "onShow";
    var ON_HIDE = "onHide";
    var ON_LAUNCH = "onLaunch";
    var ON_ERROR = "onError";
    var ON_THEME_CHANGE = "onThemeChange";
    var ON_KEYBOARD_HEIGHT_CHANGE = "onKeyboardHeightChange";
    var ON_PAGE_NOT_FOUND = "onPageNotFound";
    var ON_UNHANDLE_REJECTION = "onUnhandledRejection";
    var ON_EXIT = "onExit";
    var ON_LOAD = "onLoad";
    var ON_READY = "onReady";
    var ON_UNLOAD = "onUnload";
    var ON_INIT = "onInit";
    var ON_SAVE_EXIT_STATE = "onSaveExitState";
    var ON_RESIZE = "onResize";
    var ON_BACK_PRESS = "onBackPress";
    var ON_PAGE_SCROLL = "onPageScroll";
    var ON_TAB_ITEM_TAP = "onTabItemTap";
    var ON_REACH_BOTTOM = "onReachBottom";
    var ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
    var ON_SHARE_TIMELINE = "onShareTimeline";
    var ON_SHARE_CHAT = "onShareChat";
    var ON_ADD_TO_FAVORITES = "onAddToFavorites";
    var ON_SHARE_APP_MESSAGE = "onShareAppMessage";
    var ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
    var ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
    var ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
    var ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
    var ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
    var ON_APP_ENTER_FOREGROUND = "onAppEnterForeground";
    var ON_APP_ENTER_BACKGROUND = "onAppEnterBackground";
    var ON_WXS_INVOKE_CALL_METHOD = "onWxsInvokeCallMethod";

    // ../uni-app-next/packages/uni-shared/src/utils.ts
    function cache(fn) {
        const cache2 = /* @__PURE__ */ Object.create(null);
        return (str) => {
            const hit = cache2[str];
            return hit || (cache2[str] = fn(str));
        };
    }
    function cacheStringFunction2(fn) {
        return cache(fn);
    }
    function getLen(str = "") {
        return ("" + str).replace(/[^\x00-\xff]/g, "**").length;
    }
    function hasLeadingSlash(str) {
        return str.indexOf("/") === 0;
    }
    function addLeadingSlash(str) {
        return hasLeadingSlash(str) ? str : "/" + str;
    }
    function removeLeadingSlash(str) {
        return hasLeadingSlash(str) ? str.slice(1) : str;
    }
    var invokeArrayFns2 = (fns, arg) => {
        let ret;
        for (let i = 0; i < fns.length; i++) {
            ret = fns[i](arg);
        }
        return ret;
    };
    function once(fn, ctx = null) {
        let res;
        return (...args) => {
            if (fn) {
                res = fn.apply(ctx, args);
                fn = null;
            }
            return res;
        };
    }
    function callOptions(options, data) {
        options = options || {};
        if (isString(data)) {
            data = {
                errMsg: data
            };
        }
        if (/:ok$/.test(data.errMsg)) {
            if (isFunction(options.success)) {
                options.success(data);
            }
        } else {
            if (isFunction(options.fail)) {
                options.fail(data);
            }
        }
        if (isFunction(options.complete)) {
            options.complete(data);
        }
    }

    // ../uni-app-next/packages/uni-shared/src/vue.ts
    function isComponentInternalInstance(vm) {
        return !!vm.appContext;
    }
    function resolveComponentInstance(instance) {
        return instance && (isComponentInternalInstance(instance) ? instance.proxy : instance);
    }
    function isElement(el) {
        return el.nodeType === 1;
    }
    function resolveOwnerEl(instance, multi = false) {
        const { vnode } = instance;
        if (isElement(vnode.el)) {
            return multi ? vnode.el ? [vnode.el] : [] : vnode.el;
        }
        const { subTree } = instance;
        if (subTree.shapeFlag & 16) {
            const elemVNodes = subTree.children.filter(
                (vnode2) => vnode2.el && isElement(vnode2.el)
            );
            if (elemVNodes.length > 0) {
                if (multi) {
                    return elemVNodes.map((node) => node.el);
                }
                return elemVNodes[0].el;
            }
        }
        return multi ? vnode.el ? [vnode.el] : [] : vnode.el;
    }

    // ../uni-app-next/packages/uni-shared/src/log.ts
    var lastLogTime = 0;
    function formatLog(module, ...args) {
        const now = Date.now();
        const diff = lastLogTime ? now - lastLogTime : 0;
        lastLogTime = now;
        return `[${now}][${diff}ms][${module}]\uFF1A${args.map((arg) => JSON.stringify(arg)).join(" ")}`;
    }

    // ../uni-app-next/packages/uni-shared/src/query.ts
    var encode = encodeURIComponent;
    function stringifyQuery(obj, encodeStr = encode) {
        const res = obj ? Object.keys(obj).map((key) => {
            let val = obj[key];
            if (typeof val === void 0 || val === null) {
                val = "";
            } else if (isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            return encodeStr(key) + "=" + encodeStr(val);
        }).filter((x) => x.length > 0).join("&") : null;
        return res ? `?${res}` : "";
    }
    function decode(text) {
        try {
            return decodeURIComponent("" + text);
        } catch (err2) {
        }
        return "" + text;
    }
    var PLUS_RE = /\+/g;
    function parseQuery(search) {
        const query = {};
        if (search === "" || search === "?")
            return query;
        const hasLeadingIM = search[0] === "?";
        const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
        for (let i = 0; i < searchParams.length; ++i) {
            const searchParam = searchParams[i].replace(PLUS_RE, " ");
            let eqPos = searchParam.indexOf("=");
            let key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
            let value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
            if (key in query) {
                let currentValue = query[key];
                if (!isArray(currentValue)) {
                    currentValue = query[key] = [currentValue];
                }
                currentValue.push(value);
            } else {
                query[key] = value;
            }
        }
        return query;
    }

    // ../uni-app-next/packages/uni-shared/src/url.ts
    function parseUrl(url) {
        const [path, querystring] = url.split("?", 2);
        return {
            path,
            query: parseQuery(querystring || "")
        };
    }

    // ../uni-app-next/packages/uni-shared/src/nvue.ts
    function parseNVueDataset(attr) {
        const dataset = {};
        if (attr) {
            Object.keys(attr).forEach((key) => {
                if (key.indexOf("data-") === 0) {
                    dataset[key.replace("data-", "")] = attr[key];
                }
            });
        }
        return dataset;
    }

    // ../uni-app-next/packages/uni-shared/src/vdom/DOMException.ts
    var DOMException = class extends Error {
        constructor(message) {
            super(message);
            this.name = "DOMException";
        }
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/Event.ts
    function normalizeEventType(type, options) {
        if (options) {
            if (options.capture) {
                type += "Capture";
            }
            if (options.once) {
                type += "Once";
            }
            if (options.passive) {
                type += "Passive";
            }
        }
        return `on${capitalize(camelize(type))}`;
    }
    var UniEvent = class {
        constructor(type, opts) {
            this.defaultPrevented = false;
            this.timeStamp = Date.now();
            this._stop = false;
            this._end = false;
            this.type = type;
            this.bubbles = !!opts.bubbles;
            this.cancelable = !!opts.cancelable;
        }
        preventDefault() {
            this.defaultPrevented = true;
        }
        stopImmediatePropagation() {
            this._end = this._stop = true;
        }
        stopPropagation() {
            this._stop = true;
        }
    };
    function createUniEvent(evt) {
        if (evt instanceof UniEvent) {
            return evt;
        }
        const [type] = parseEventName(evt.type);
        const uniEvent = new UniEvent(type, {
            bubbles: false,
            cancelable: false
        });
        extend(uniEvent, evt);
        return uniEvent;
    }
    var UniEventTarget = class {
        constructor() {
            this.listeners = /* @__PURE__ */ Object.create(null);
        }
        dispatchEvent(evt) {
            const listeners = this.listeners[evt.type];
            if (!listeners) {
                if (true) {
                    console.error(
                        formatLog("dispatchEvent", this.nodeId),
                        evt.type,
                        "not found"
                    );
                }
                return false;
            }
            const event = createUniEvent(evt);
            const len = listeners.length;
            for (let i = 0; i < len; i++) {
                listeners[i].call(this, event);
                if (event._end) {
                    break;
                }
            }
            return event.cancelable && event.defaultPrevented;
        }
        addEventListener(type, listener, options) {
            type = normalizeEventType(type, options);
            (this.listeners[type] || (this.listeners[type] = [])).push(listener);
        }
        removeEventListener(type, callback, options) {
            type = normalizeEventType(type, options);
            const listeners = this.listeners[type];
            if (!listeners) {
                return;
            }
            const index2 = listeners.indexOf(callback);
            if (index2 > -1) {
                listeners.splice(index2, 1);
            }
        }
    };
    var optionsModifierRE = /(?:Once|Passive|Capture)$/;
    function parseEventName(name) {
        let options;
        if (optionsModifierRE.test(name)) {
            options = {};
            let m;
            while (m = name.match(optionsModifierRE)) {
                name = name.slice(0, name.length - m[0].length);
                options[m[0].toLowerCase()] = true;
                options;
            }
        }
        return [hyphenate(name.slice(2)), options];
    }

    // ../uni-app-next/packages/uni-shared/src/vdom/encode.ts
    var EventModifierFlags = /* @__PURE__ */ (() => {
        return {
            stop: 1,
            prevent: 1 << 1,
            self: 1 << 2
        };
    })();
    function encodeModifier(modifiers) {
        let flag = 0;
        if (modifiers.includes("stop")) {
            flag |= EventModifierFlags.stop;
        }
        if (modifiers.includes("prevent")) {
            flag |= EventModifierFlags.prevent;
        }
        if (modifiers.includes("self")) {
            flag |= EventModifierFlags.self;
        }
        return flag;
    }

    // ../uni-app-next/packages/uni-shared/src/vdom/Node.ts
    var NODE_TYPE_PAGE = 0;
    var NODE_TYPE_ELEMENT = 1;
    var NODE_TYPE_TEXT = 3;
    var NODE_TYPE_COMMENT = 8;
    function sibling(node, type) {
        const { parentNode } = node;
        if (!parentNode) {
            return null;
        }
        const { childNodes } = parentNode;
        return childNodes[childNodes.indexOf(node) + (type === "n" ? 1 : -1)] || null;
    }
    function removeNode(node) {
        const { parentNode } = node;
        if (parentNode) {
            const { childNodes } = parentNode;
            const index2 = childNodes.indexOf(node);
            if (index2 > -1) {
                node.parentNode = null;
                childNodes.splice(index2, 1);
            }
        }
    }
    function checkNodeId(node) {
        if (!node.nodeId && node.pageNode) {
            node.nodeId = node.pageNode.genId();
        }
    }
    var UniNode = class extends UniEventTarget {
        constructor(nodeType, nodeName, container) {
            super();
            this.pageNode = null;
            this.parentNode = null;
            this._text = null;
            if (container) {
                const { pageNode } = container;
                if (pageNode) {
                    this.pageNode = pageNode;
                    this.nodeId = pageNode.genId();
                    !pageNode.isUnmounted && pageNode.onCreate(this, nodeName);
                }
            }
            this.nodeType = nodeType;
            this.nodeName = nodeName;
            this.childNodes = [];
        }
        get firstChild() {
            return this.childNodes[0] || null;
        }
        get lastChild() {
            const { childNodes } = this;
            const length = childNodes.length;
            return length ? childNodes[length - 1] : null;
        }
        get nextSibling() {
            return sibling(this, "n");
        }
        get nodeValue() {
            return null;
        }
        set nodeValue(_val) {
        }
        get textContent() {
            return this._text || "";
        }
        set textContent(text) {
            this._text = text;
            if (this.pageNode && !this.pageNode.isUnmounted) {
                this.pageNode.onTextContent(this, text);
            }
        }
        get parentElement() {
            const { parentNode } = this;
            if (parentNode && parentNode.nodeType === NODE_TYPE_ELEMENT) {
                return parentNode;
            }
            return null;
        }
        get previousSibling() {
            return sibling(this, "p");
        }
        appendChild(newChild) {
            return this.insertBefore(newChild, null);
        }
        cloneNode(deep) {
            const cloned = extend(
                Object.create(Object.getPrototypeOf(this)),
                this
            );
            const { attributes } = cloned;
            if (attributes) {
                ;
                cloned.attributes = extend({}, attributes);
            }
            if (deep) {
                cloned.childNodes = cloned.childNodes.map(
                    (childNode) => childNode.cloneNode(true)
                );
            }
            return cloned;
        }
        insertBefore(newChild, refChild) {
            removeNode(newChild);
            newChild.pageNode = this.pageNode;
            newChild.parentNode = this;
            checkNodeId(newChild);
            const { childNodes } = this;
            if (refChild) {
                const index2 = childNodes.indexOf(refChild);
                if (index2 === -1) {
                    throw new DOMException(
                        `Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`
                    );
                }
                childNodes.splice(index2, 0, newChild);
            } else {
                childNodes.push(newChild);
            }
            return this.pageNode && !this.pageNode.isUnmounted ? this.pageNode.onInsertBefore(this, newChild, refChild) : newChild;
        }
        removeChild(oldChild) {
            const { childNodes } = this;
            const index2 = childNodes.indexOf(oldChild);
            if (index2 === -1) {
                throw new DOMException(
                    `Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.`
                );
            }
            oldChild.parentNode = null;
            childNodes.splice(index2, 1);
            return this.pageNode && !this.pageNode.isUnmounted ? this.pageNode.onRemoveChild(oldChild) : oldChild;
        }
    };
    var ATTR_CLASS = "class";
    var ATTR_STYLE = "style";
    var ATTR_V_OWNER_ID = ".vOwnerId";
    var ATTR_V_RENDERJS = ".vRenderjs";
    var UniBaseNode = class extends UniNode {
        constructor(nodeType, nodeName, container) {
            super(nodeType, nodeName, container);
            this.attributes = /* @__PURE__ */ Object.create(null);
            this.style = null;
            this.vShow = null;
            this._html = null;
        }
        get className() {
            return this.attributes[ATTR_CLASS] || "";
        }
        set className(val) {
            this.setAttribute(ATTR_CLASS, val);
        }
        get innerHTML() {
            return "";
        }
        set innerHTML(html) {
            this._html = html;
        }
        addEventListener(type, listener, options) {
            super.addEventListener(type, listener, options);
            if (this.pageNode && !this.pageNode.isUnmounted) {
                if (listener.wxsEvent) {
                    this.pageNode.onAddWxsEvent(
                        this,
                        normalizeEventType(type, options),
                        listener.wxsEvent,
                        encodeModifier(listener.modifiers || [])
                    );
                } else {
                    this.pageNode.onAddEvent(
                        this,
                        normalizeEventType(type, options),
                        encodeModifier(listener.modifiers || [])
                    );
                }
            }
        }
        removeEventListener(type, callback, options) {
            super.removeEventListener(type, callback, options);
            if (this.pageNode && !this.pageNode.isUnmounted) {
                this.pageNode.onRemoveEvent(this, normalizeEventType(type, options));
            }
        }
        getAttribute(qualifiedName) {
            if (qualifiedName === ATTR_STYLE) {
                return this.style;
            }
            return this.attributes[qualifiedName];
        }
        removeAttribute(qualifiedName) {
            if (qualifiedName == ATTR_STYLE) {
                this.style = null;
            } else {
                delete this.attributes[qualifiedName];
            }
            if (this.pageNode && !this.pageNode.isUnmounted) {
                this.pageNode.onRemoveAttribute(this, qualifiedName);
            }
        }
        setAttribute(qualifiedName, value) {
            if (qualifiedName === ATTR_STYLE) {
                this.style = value;
            } else {
                this.attributes[qualifiedName] = value;
            }
            if (this.pageNode && !this.pageNode.isUnmounted) {
                this.pageNode.onSetAttribute(this, qualifiedName, value);
            }
        }
        toJSON({
            attr,
            normalize
        } = {}) {
            const { attributes, style, listeners, _text } = this;
            const res = {};
            if (Object.keys(attributes).length) {
                res.a = normalize ? normalize(attributes) : attributes;
            }
            const events = Object.keys(listeners);
            if (events.length) {
                let w = void 0;
                const e = {};
                events.forEach((name) => {
                    const handlers = listeners[name];
                    if (handlers.length) {
                        const { wxsEvent, modifiers } = handlers[0];
                        const modifier = encodeModifier(modifiers || []);
                        if (!wxsEvent) {
                            e[name] = modifier;
                        } else {
                            if (!w) {
                                w = {};
                            }
                            w[name] = [normalize ? normalize(wxsEvent) : wxsEvent, modifier];
                        }
                    }
                });
                res.e = normalize ? normalize(e, false) : e;
                if (w) {
                    res.w = normalize ? normalize(w, false) : w;
                }
            }
            if (style !== null) {
                res.s = normalize ? normalize(style) : style;
            }
            if (!attr) {
                res.i = this.nodeId;
                res.n = this.nodeName;
            }
            if (_text !== null) {
                res.t = normalize ? normalize(_text) : _text;
            }
            return res;
        }
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/Comment.ts
    var UniCommentNode = class extends UniNode {
        constructor(text, container) {
            super(NODE_TYPE_COMMENT, "#comment", container);
            this._text = true ? text : "";
        }
        toJSON(opts = {}) {
            return opts.attr ? {} : {
                i: this.nodeId
            };
        }
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/Element.ts
    var UniElement = class extends UniBaseNode {
        constructor(nodeName, container) {
            super(NODE_TYPE_ELEMENT, nodeName.toUpperCase(), container);
            this.tagName = this.nodeName;
        }
    };
    var UniInputElement = class extends UniElement {
        get value() {
            return this.getAttribute("value");
        }
        set value(val) {
            this.setAttribute("value", val);
        }
    };
    var UniTextAreaElement = class extends UniInputElement {
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/Text.ts
    var UniTextNode = class extends UniBaseNode {
        constructor(text, container) {
            super(NODE_TYPE_TEXT, "#text", container);
            this._text = text;
        }
        get nodeValue() {
            return this._text || "";
        }
        set nodeValue(text) {
            this._text = text;
            if (this.pageNode && !this.pageNode.isUnmounted) {
                this.pageNode.onNodeValue(this, text);
            }
        }
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/constants.ts
    var forcePatchProps = {
        AD: ["data"],
        "AD-DRAW": ["data"],
        "LIVE-PLAYER": ["picture-in-picture-mode"],
        MAP: [
            "markers",
            "polyline",
            "circles",
            "controls",
            "include-points",
            "polygons"
        ],
        PICKER: ["range", "value"],
        "PICKER-VIEW": ["value"],
        "RICH-TEXT": ["nodes"],
        VIDEO: ["danmu-list", "header"],
        "WEB-VIEW": ["webview-styles"]
    };
    var forcePatchPropKeys = ["animation"];

    // ../uni-app-next/packages/uni-shared/src/vdom/utils.ts
    var forcePatchProp = (el, key) => {
        if (forcePatchPropKeys.indexOf(key) > -1) {
            return true;
        }
        const keys = forcePatchProps[el.nodeName];
        if (keys && keys.indexOf(key) > -1) {
            return true;
        }
        return false;
    };

    // ../uni-app-next/packages/uni-shared/src/vdom/Action.ts
    var ACTION_TYPE_PAGE_CREATE = 1;
    var ACTION_TYPE_PAGE_CREATED = 2;
    var ACTION_TYPE_CREATE = 3;
    var ACTION_TYPE_INSERT = 4;
    var ACTION_TYPE_REMOVE = 5;
    var ACTION_TYPE_SET_ATTRIBUTE = 6;
    var ACTION_TYPE_REMOVE_ATTRIBUTE = 7;
    var ACTION_TYPE_ADD_EVENT = 8;
    var ACTION_TYPE_REMOVE_EVENT = 9;
    var ACTION_TYPE_SET_TEXT = 10;
    var ACTION_TYPE_ADD_WXS_EVENT = 12;
    var ACTION_TYPE_PAGE_SCROLL = 15;
    var ACTION_TYPE_EVENT = 20;

    // ../uni-app-next/packages/uni-shared/src/debounce.ts
    function debounce(fn, delay, { clearTimeout: clearTimeout2, setTimeout: setTimeout2 }) {
        let timeout;
        const newFn = function() {
            clearTimeout2(timeout);
            const timerFn = () => fn.apply(this, arguments);
            timeout = setTimeout2(timerFn, delay);
        };
        newFn.cancel = function() {
            clearTimeout2(timeout);
        };
        return newFn;
    }

    // ../uni-app-next/packages/uni-shared/src/EventChannel.ts
    var EventChannel = class {
        constructor(id2, events) {
            this.id = id2;
            this.listener = {};
            this.emitCache = [];
            if (events) {
                Object.keys(events).forEach((name) => {
                    this.on(name, events[name]);
                });
            }
        }
        emit(eventName, ...args) {
            const fns = this.listener[eventName];
            if (!fns) {
                return this.emitCache.push({
                    eventName,
                    args
                });
            }
            fns.forEach((opt) => {
                opt.fn.apply(opt.fn, args);
            });
            this.listener[eventName] = fns.filter((opt) => opt.type !== "once");
        }
        on(eventName, fn) {
            this._addListener(eventName, "on", fn);
            this._clearCache(eventName);
        }
        once(eventName, fn) {
            this._addListener(eventName, "once", fn);
            this._clearCache(eventName);
        }
        off(eventName, fn) {
            const fns = this.listener[eventName];
            if (!fns) {
                return;
            }
            if (fn) {
                for (let i = 0; i < fns.length; ) {
                    if (fns[i].fn === fn) {
                        fns.splice(i, 1);
                        i--;
                    }
                    i++;
                }
            } else {
                delete this.listener[eventName];
            }
        }
        _clearCache(eventName) {
            for (let index2 = 0; index2 < this.emitCache.length; index2++) {
                const cache2 = this.emitCache[index2];
                const _name = eventName ? cache2.eventName === eventName ? eventName : null : cache2.eventName;
                if (!_name)
                    continue;
                const location2 = this.emit.apply(this, [_name, ...cache2.args]);
                if (typeof location2 === "number") {
                    this.emitCache.pop();
                    continue;
                }
                this.emitCache.splice(index2, 1);
                index2--;
            }
        }
        _addListener(eventName, type, fn) {
            ;
            (this.listener[eventName] || (this.listener[eventName] = [])).push({
                fn,
                type
            });
        }
    };

    // ../uni-app-next/packages/uni-shared/src/lifecycle.ts
    var PAGE_HOOKS = [
        ON_INIT,
        ON_LOAD,
        ON_SHOW,
        ON_HIDE,
        ON_UNLOAD,
        ON_BACK_PRESS,
        ON_PAGE_SCROLL,
        ON_TAB_ITEM_TAP,
        ON_REACH_BOTTOM,
        ON_PULL_DOWN_REFRESH,
        ON_SHARE_TIMELINE,
        ON_SHARE_APP_MESSAGE,
        ON_SHARE_CHAT,
        ON_ADD_TO_FAVORITES,
        ON_SAVE_EXIT_STATE,
        ON_NAVIGATION_BAR_BUTTON_TAP,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
    ];
    function isRootImmediateHook(name) {
        const PAGE_SYNC_HOOKS = [ON_LOAD, ON_SHOW];
        return PAGE_SYNC_HOOKS.indexOf(name) > -1;
    }
    function isRootHook(name) {
        return PAGE_HOOKS.indexOf(name) > -1;
    }
    var UniLifecycleHooks = [
        ON_SHOW,
        ON_HIDE,
        ON_LAUNCH,
        ON_ERROR,
        ON_THEME_CHANGE,
        ON_PAGE_NOT_FOUND,
        ON_UNHANDLE_REJECTION,
        ON_EXIT,
        ON_INIT,
        ON_LOAD,
        ON_READY,
        ON_UNLOAD,
        ON_RESIZE,
        ON_BACK_PRESS,
        ON_PAGE_SCROLL,
        ON_TAB_ITEM_TAP,
        ON_REACH_BOTTOM,
        ON_PULL_DOWN_REFRESH,
        ON_SHARE_TIMELINE,
        ON_ADD_TO_FAVORITES,
        ON_SHARE_APP_MESSAGE,
        ON_SHARE_CHAT,
        ON_SAVE_EXIT_STATE,
        ON_NAVIGATION_BAR_BUTTON_TAP,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
        ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
    ];
    function isUniLifecycleHook(name, value, checkType = true) {
        if (checkType && !isFunction(value)) {
            return false;
        }
        if (UniLifecycleHooks.indexOf(name) > -1) {
            return true;
        } else if (name.indexOf("on") === 0) {
            return true;
        }
        return false;
    }

    // ../uni-app-next/packages/uni-shared/src/onCreateVueApp.ts
    var vueApp;
    var createVueAppHooks = [];
    function onCreateVueApp(hook) {
        if (vueApp) {
            return hook(vueApp);
        }
        createVueAppHooks.push(hook);
    }
    function invokeCreateVueAppHook(app) {
        vueApp = app;
        createVueAppHooks.forEach((hook) => hook(app));
    }
    var invokeCreateErrorHandler = once(
        (app, createErrorHandler2) => {
            return createErrorHandler2(app);
        }
    );

    // ../uni-app-next/packages/uni-shared/src/TinyEmitter.ts
    var E = function() {
    };
    E.prototype = {
        _id: 1,
        on: function(name, callback, ctx) {
            var e = this.e || (this.e = {});
            (e[name] || (e[name] = [])).push({
                fn: callback,
                ctx,
                _id: this._id
            });
            return this._id++;
        },
        once: function(name, callback, ctx) {
            var self2 = this;
            function listener() {
                self2.off(name, listener);
                callback.apply(ctx, arguments);
            }
            listener._ = callback;
            return this.on(name, listener, ctx);
        },
        emit: function(name) {
            var data = [].slice.call(arguments, 1);
            var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
            var i = 0;
            var len = evtArr.length;
            for (i; i < len; i++) {
                evtArr[i].fn.apply(evtArr[i].ctx, data);
            }
            return this;
        },
        off: function(name, event) {
            var e = this.e || (this.e = {});
            var evts = e[name];
            var liveEvents = [];
            if (evts && event) {
                for (var i = evts.length - 1; i >= 0; i--) {
                    if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
                        evts.splice(i, 1);
                        break;
                    }
                }
                liveEvents = evts;
            }
            liveEvents.length ? e[name] = liveEvents : delete e[name];
            return this;
        }
    };
    var TinyEmitter_default = E;

    // ../uni-app-next/packages/uni-shared/src/theme.ts
    var borderStyles = {
        black: "rgba(0,0,0,0.4)",
        white: "rgba(255,255,255,0.4)"
    };
    function normalizeTabBarStyles(borderStyle) {
        if (borderStyle && borderStyle in borderStyles) {
            return borderStyles[borderStyle];
        }
        return borderStyle;
    }
    function normalizeTitleColor(titleColor) {
        return titleColor === "black" ? "#000000" : "#ffffff";
    }
    function resolveStringStyleItem(modeStyle, styleItem, key) {
        if (isString(styleItem) && styleItem.startsWith("@")) {
            const _key = styleItem.replace("@", "");
            let _styleItem = modeStyle[_key] || styleItem;
            switch (key) {
                case "titleColor":
                    _styleItem = normalizeTitleColor(_styleItem);
                    break;
                case "borderStyle":
                    _styleItem = normalizeTabBarStyles(_styleItem);
                    break;
                default:
                    break;
            }
            return _styleItem;
        }
        return styleItem;
    }
    function normalizeStyles(pageStyle, themeConfig = {}, mode = "light") {
        const modeStyle = themeConfig[mode];
        const styles = {};
        if (typeof modeStyle === "undefined" || !pageStyle)
            return pageStyle;
        Object.keys(pageStyle).forEach((key) => {
            const styleItem = pageStyle[key];
            const parseStyleItem = () => {
                if (isPlainObject(styleItem))
                    return normalizeStyles(styleItem, themeConfig, mode);
                if (isArray(styleItem))
                    return styleItem.map((item) => {
                        if (typeof item === "object")
                            return normalizeStyles(item, themeConfig, mode);
                        return resolveStringStyleItem(modeStyle, item);
                    });
                return resolveStringStyleItem(
                    modeStyle,
                    styleItem,
                    key
                );
            };
            styles[key] = parseStyleItem();
        });
        return styles;
    }

    // ../uni-app-next/packages/uni-app-vue/dist/vue.runtime.esm.dev.js
    var vue_runtime_esm_dev_exports = {};
    __export(vue_runtime_esm_dev_exports, {
        BaseTransition: () => BaseTransition,
        BaseTransitionPropsValidators: () => BaseTransitionPropsValidators,
        Comment: () => Comment,
        DeprecationTypes: () => DeprecationTypes,
        EffectScope: () => EffectScope,
        ErrorCodes: () => ErrorCodes,
        ErrorTypeStrings: () => ErrorTypeStrings,
        Fragment: () => Fragment,
        KeepAlive: () => KeepAlive,
        ReactiveEffect: () => ReactiveEffect,
        Static: () => Static,
        Suspense: () => Suspense,
        Teleport: () => Teleport,
        Text: () => Text,
        TrackOpTypes: () => TrackOpTypes,
        Transition: () => Transition,
        TransitionGroup: () => TransitionGroup,
        TriggerOpTypes: () => TriggerOpTypes,
        assertNumber: () => assertNumber,
        callWithAsyncErrorHandling: () => callWithAsyncErrorHandling,
        callWithErrorHandling: () => callWithErrorHandling,
        camelize: () => camelize,
        capitalize: () => capitalize,
        cloneVNode: () => cloneVNode,
        compatUtils: () => compatUtils,
        computed: () => computed2,
        createApp: () => createApp,
        createBlock: () => createBlock,
        createComment: () => createComment,
        createCommentVNode: () => createCommentVNode,
        createElement: () => createElement,
        createElementBlock: () => createElementBlock,
        createElementVNode: () => createBaseVNode,
        createHydrationRenderer: () => createHydrationRenderer,
        createPropsRestProxy: () => createPropsRestProxy,
        createRenderer: () => createRenderer,
        createSSRApp: () => createSSRApp,
        createSlots: () => createSlots,
        createStaticVNode: () => createStaticVNode,
        createTextNode: () => createTextNode,
        createTextVNode: () => createTextVNode,
        createVNode: () => createVNode,
        createVueApp: () => createApp,
        customRef: () => customRef,
        defineAsyncComponent: () => defineAsyncComponent,
        defineComponent: () => defineComponent,
        defineEmits: () => defineEmits,
        defineExpose: () => defineExpose,
        defineModel: () => defineModel,
        defineOptions: () => defineOptions,
        defineProps: () => defineProps,
        defineSlots: () => defineSlots,
        devtools: () => devtools,
        devtoolsInitApp: () => devtoolsInitApp,
        effect: () => effect,
        effectScope: () => effectScope,
        getCurrentInstance: () => getCurrentInstance,
        getCurrentScope: () => getCurrentScope,
        getTransitionRawChildren: () => getTransitionRawChildren,
        guardReactiveProps: () => guardReactiveProps,
        h: () => h,
        handleError: () => handleError,
        hasInjectionContext: () => hasInjectionContext,
        initCustomFormatter: () => initCustomFormatter,
        inject: () => inject,
        injectHook: () => injectHook,
        isInSSRComponentSetup: () => isInSSRComponentSetup,
        isMemoSame: () => isMemoSame,
        isProxy: () => isProxy,
        isReactive: () => isReactive,
        isReadonly: () => isReadonly,
        isRef: () => isRef,
        isRuntimeOnly: () => isRuntimeOnly,
        isShallow: () => isShallow,
        isVNode: () => isVNode,
        logError: () => logError,
        markRaw: () => markRaw,
        mergeDefaults: () => mergeDefaults,
        mergeModels: () => mergeModels,
        mergeProps: () => mergeProps,
        nextTick: () => nextTick,
        normalizeClass: () => normalizeClass,
        normalizeProps: () => normalizeProps,
        normalizeStyle: () => normalizeStyle,
        onActivated: () => onActivated,
        onBeforeActivate: () => onBeforeActivate,
        onBeforeDeactivate: () => onBeforeDeactivate,
        onBeforeMount: () => onBeforeMount,
        onBeforeUnmount: () => onBeforeUnmount,
        onBeforeUpdate: () => onBeforeUpdate,
        onDeactivated: () => onDeactivated,
        onErrorCaptured: () => onErrorCaptured,
        onMounted: () => onMounted,
        onRenderTracked: () => onRenderTracked,
        onRenderTriggered: () => onRenderTriggered,
        onScopeDispose: () => onScopeDispose,
        onServerPrefetch: () => onServerPrefetch,
        onUnmounted: () => onUnmounted,
        onUpdated: () => onUpdated,
        openBlock: () => openBlock,
        popScopeId: () => popScopeId,
        provide: () => provide,
        proxyRefs: () => proxyRefs,
        pushScopeId: () => pushScopeId,
        queuePostFlushCb: () => queuePostFlushCb,
        reactive: () => reactive,
        readonly: () => readonly,
        ref: () => ref,
        registerRuntimeCompiler: () => registerRuntimeCompiler,
        render: () => render,
        renderList: () => renderList,
        renderSlot: () => renderSlot,
        resolveComponent: () => resolveComponent,
        resolveDirective: () => resolveDirective,
        resolveDynamicComponent: () => resolveDynamicComponent,
        resolveFilter: () => resolveFilter,
        resolveTransitionHooks: () => resolveTransitionHooks,
        setBlockTracking: () => setBlockTracking,
        setDevtoolsHook: () => setDevtoolsHook,
        setTransitionHooks: () => setTransitionHooks,
        shallowReactive: () => shallowReactive,
        shallowReadonly: () => shallowReadonly,
        shallowRef: () => shallowRef,
        ssrContextKey: () => ssrContextKey,
        ssrUtils: () => ssrUtils,
        stop: () => stop,
        toDisplayString: () => toDisplayString,
        toHandlerKey: () => toHandlerKey,
        toHandlers: () => toHandlers,
        toRaw: () => toRaw,
        toRef: () => toRef,
        toRefs: () => toRefs,
        toValue: () => toValue,
        transformVNodeArgs: () => transformVNodeArgs,
        triggerRef: () => triggerRef,
        unref: () => unref,
        useAttrs: () => useAttrs,
        useCssModule: () => useCssModule,
        useCssVars: () => useCssVars,
        useModel: () => useModel,
        useSSRContext: () => useSSRContext,
        useSlots: () => useSlots,
        useTransitionState: () => useTransitionState,
        vModelDynamic: () => vModelDynamic,
        vModelText: () => vModelText,
        vShow: () => vShow,
        version: () => version,
        warn: () => warn2,
        watch: () => watch,
        watchEffect: () => watchEffect,
        watchPostEffect: () => watchPostEffect,
        watchSyncEffect: () => watchSyncEffect,
        withAsyncContext: () => withAsyncContext,
        withCtx: () => withCtx,
        withDefaults: () => withDefaults,
        withDirectives: () => withDirectives,
        withKeys: () => withKeys,
        withMemo: () => withMemo,
        withModifiers: () => withModifiers,
        withScopeId: () => withScopeId,
        wp: () => wp
    });

    // ../uni-app-next/node_modules/.pnpm/@vue+reactivity@3.4.21/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
    function warn(msg2, ...args) {
        console.warn(`[Vue warn] ${msg2}`, ...args);
    }
    var activeEffectScope;
    var EffectScope = class {
        constructor(detached = false) {
            this.detached = detached;
            this._active = true;
            this.effects = [];
            this.cleanups = [];
            this.parent = activeEffectScope;
            if (!detached && activeEffectScope) {
                this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
                    this
                ) - 1;
            }
        }
        get active() {
            return this._active;
        }
        run(fn) {
            if (this._active) {
                const currentEffectScope = activeEffectScope;
                try {
                    activeEffectScope = this;
                    return fn();
                } finally {
                    activeEffectScope = currentEffectScope;
                }
            } else if (true) {
                warn(`cannot run an inactive effect scope.`);
            }
        }
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        on() {
            activeEffectScope = this;
        }
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        off() {
            activeEffectScope = this.parent;
        }
        stop(fromParent) {
            if (this._active) {
                let i, l;
                for (i = 0, l = this.effects.length; i < l; i++) {
                    this.effects[i].stop();
                }
                for (i = 0, l = this.cleanups.length; i < l; i++) {
                    this.cleanups[i]();
                }
                if (this.scopes) {
                    for (i = 0, l = this.scopes.length; i < l; i++) {
                        this.scopes[i].stop(true);
                    }
                }
                if (!this.detached && this.parent && !fromParent) {
                    const last = this.parent.scopes.pop();
                    if (last && last !== this) {
                        this.parent.scopes[this.index] = last;
                        last.index = this.index;
                    }
                }
                this.parent = void 0;
                this._active = false;
            }
        }
    };
    function effectScope(detached) {
        return new EffectScope(detached);
    }
    function recordEffectScope(effect2, scope = activeEffectScope) {
        if (scope && scope.active) {
            scope.effects.push(effect2);
        }
    }
    function getCurrentScope() {
        return activeEffectScope;
    }
    function onScopeDispose(fn) {
        if (activeEffectScope) {
            activeEffectScope.cleanups.push(fn);
        } else if (true) {
            warn(
                `onScopeDispose() is called when there is no active effect scope to be associated with.`
            );
        }
    }
    var activeEffect;
    var ReactiveEffect = class {
        constructor(fn, trigger2, scheduler, scope) {
            this.fn = fn;
            this.trigger = trigger2;
            this.scheduler = scheduler;
            this.active = true;
            this.deps = [];
            this._dirtyLevel = 4;
            this._trackId = 0;
            this._runnings = 0;
            this._shouldSchedule = false;
            this._depsLength = 0;
            recordEffectScope(this, scope);
        }
        get dirty() {
            if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
                this._dirtyLevel = 1;
                pauseTracking();
                for (let i = 0; i < this._depsLength; i++) {
                    const dep = this.deps[i];
                    if (dep.computed) {
                        triggerComputed(dep.computed);
                        if (this._dirtyLevel >= 4) {
                            break;
                        }
                    }
                }
                if (this._dirtyLevel === 1) {
                    this._dirtyLevel = 0;
                }
                resetTracking();
            }
            return this._dirtyLevel >= 4;
        }
        set dirty(v) {
            this._dirtyLevel = v ? 4 : 0;
        }
        run() {
            this._dirtyLevel = 0;
            if (!this.active) {
                return this.fn();
            }
            let lastShouldTrack = shouldTrack;
            let lastEffect = activeEffect;
            try {
                shouldTrack = true;
                activeEffect = this;
                this._runnings++;
                preCleanupEffect(this);
                return this.fn();
            } finally {
                postCleanupEffect(this);
                this._runnings--;
                activeEffect = lastEffect;
                shouldTrack = lastShouldTrack;
            }
        }
        stop() {
            var _a;
            if (this.active) {
                preCleanupEffect(this);
                postCleanupEffect(this);
                (_a = this.onStop) == null ? void 0 : _a.call(this);
                this.active = false;
            }
        }
    };
    function triggerComputed(computed3) {
        return computed3.value;
    }
    function preCleanupEffect(effect2) {
        effect2._trackId++;
        effect2._depsLength = 0;
    }
    function postCleanupEffect(effect2) {
        if (effect2.deps.length > effect2._depsLength) {
            for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
                cleanupDepEffect(effect2.deps[i], effect2);
            }
            effect2.deps.length = effect2._depsLength;
        }
    }
    function cleanupDepEffect(dep, effect2) {
        const trackId = dep.get(effect2);
        if (trackId !== void 0 && effect2._trackId !== trackId) {
            dep.delete(effect2);
            if (dep.size === 0) {
                dep.cleanup();
            }
        }
    }
    function effect(fn, options) {
        if (fn.effect instanceof ReactiveEffect) {
            fn = fn.effect.fn;
        }
        const _effect = new ReactiveEffect(fn, NOOP, () => {
            if (_effect.dirty) {
                _effect.run();
            }
        });
        if (options) {
            extend(_effect, options);
            if (options.scope)
                recordEffectScope(_effect, options.scope);
        }
        if (!options || !options.lazy) {
            _effect.run();
        }
        const runner = _effect.run.bind(_effect);
        runner.effect = _effect;
        return runner;
    }
    function stop(runner) {
        runner.effect.stop();
    }
    var shouldTrack = true;
    var pauseScheduleStack = 0;
    var trackStack = [];
    function pauseTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = false;
    }
    function resetTracking() {
        const last = trackStack.pop();
        shouldTrack = last === void 0 ? true : last;
    }
    function pauseScheduling() {
        pauseScheduleStack++;
    }
    function resetScheduling() {
        pauseScheduleStack--;
        while (!pauseScheduleStack && queueEffectSchedulers.length) {
            queueEffectSchedulers.shift()();
        }
    }
    function trackEffect(effect2, dep, debuggerEventExtraInfo) {
        var _a;
        if (dep.get(effect2) !== effect2._trackId) {
            dep.set(effect2, effect2._trackId);
            const oldDep = effect2.deps[effect2._depsLength];
            if (oldDep !== dep) {
                if (oldDep) {
                    cleanupDepEffect(oldDep, effect2);
                }
                effect2.deps[effect2._depsLength++] = dep;
            } else {
                effect2._depsLength++;
            }
            if (true) {
                (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
            }
        }
    }
    var queueEffectSchedulers = [];
    function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
        var _a;
        pauseScheduling();
        for (const effect2 of dep.keys()) {
            let tracking;
            if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
                effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
                effect2._dirtyLevel = dirtyLevel;
            }
            if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
                if (true) {
                    (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
                }
                effect2.trigger();
                if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
                    effect2._shouldSchedule = false;
                    if (effect2.scheduler) {
                        queueEffectSchedulers.push(effect2.scheduler);
                    }
                }
            }
        }
        resetScheduling();
    }
    var createDep = (cleanup, computed3) => {
        const dep = /* @__PURE__ */ new Map();
        dep.cleanup = cleanup;
        dep.computed = computed3;
        return dep;
    };
    var targetMap = /* @__PURE__ */ new WeakMap();
    var ITERATE_KEY = Symbol(true ? "iterate" : "");
    var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
    function track(target, type, key) {
        if (shouldTrack && activeEffect) {
            let depsMap = targetMap.get(target);
            if (!depsMap) {
                targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
            }
            let dep = depsMap.get(key);
            if (!dep) {
                depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
            }
            trackEffect(
                activeEffect,
                dep,
                true ? {
                    target,
                    type,
                    key
                } : void 0
            );
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            return;
        }
        let deps = [];
        if (type === "clear") {
            deps = [...depsMap.values()];
        } else if (key === "length" && isArray(target)) {
            const newLength = Number(newValue);
            depsMap.forEach((dep, key2) => {
                if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
                    deps.push(dep);
                }
            });
        } else {
            if (key !== void 0) {
                deps.push(depsMap.get(key));
            }
            switch (type) {
                case "add":
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    } else if (isIntegerKey(key)) {
                        deps.push(depsMap.get("length"));
                    }
                    break;
                case "delete":
                    if (!isArray(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set":
                    if (isMap(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        pauseScheduling();
        for (const dep of deps) {
            if (dep) {
                triggerEffects(
                    dep,
                    4,
                    true ? {
                        target,
                        type,
                        key,
                        newValue,
                        oldValue,
                        oldTarget
                    } : void 0
                );
            }
        }
        resetScheduling();
    }
    function getDepFromReactive(object, key) {
        var _a;
        return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
    }
    var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    var builtInSymbols = new Set(
        /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
    );
    var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
        const instrumentations = {};
        ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
            instrumentations[key] = function(...args) {
                const arr = toRaw(this);
                for (let i = 0, l = this.length; i < l; i++) {
                    track(arr, "get", i + "");
                }
                const res = arr[key](...args);
                if (res === -1 || res === false) {
                    return arr[key](...args.map(toRaw));
                } else {
                    return res;
                }
            };
        });
        ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
            instrumentations[key] = function(...args) {
                pauseTracking();
                pauseScheduling();
                const res = toRaw(this)[key].apply(this, args);
                resetScheduling();
                resetTracking();
                return res;
            };
        });
        return instrumentations;
    }
    function hasOwnProperty2(key) {
        const obj = toRaw(this);
        track(obj, "has", key);
        return obj.hasOwnProperty(key);
    }
    var BaseReactiveHandler = class {
        constructor(_isReadonly = false, _isShallow = false) {
            this._isReadonly = _isReadonly;
            this._isShallow = _isShallow;
        }
        get(target, key, receiver) {
            const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
            if (key === "__v_isReactive") {
                return !isReadonly2;
            } else if (key === "__v_isReadonly") {
                return isReadonly2;
            } else if (key === "__v_isShallow") {
                return isShallow2;
            } else if (key === "__v_raw") {
                if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
                    // this means the reciever is a user proxy of the reactive proxy
                    Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
                    return target;
                }
                return;
            }
            const targetIsArray = isArray(target);
            if (!isReadonly2) {
                if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
                    return Reflect.get(arrayInstrumentations, key, receiver);
                }
                if (key === "hasOwnProperty") {
                    return hasOwnProperty2;
                }
            }
            const res = Reflect.get(target, key, receiver);
            if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
                return res;
            }
            if (!isReadonly2) {
                track(target, "get", key);
            }
            if (isShallow2) {
                return res;
            }
            if (isRef(res)) {
                return targetIsArray && isIntegerKey(key) ? res : res.value;
            }
            if (isObject(res)) {
                return isReadonly2 ? readonly(res) : reactive(res);
            }
            return res;
        }
    };
    var MutableReactiveHandler = class extends BaseReactiveHandler {
        constructor(isShallow2 = false) {
            super(false, isShallow2);
        }
        set(target, key, value, receiver) {
            let oldValue = target[key];
            if (!this._isShallow) {
                const isOldValueReadonly = isReadonly(oldValue);
                if (!isShallow(value) && !isReadonly(value)) {
                    oldValue = toRaw(oldValue);
                    value = toRaw(value);
                }
                if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
                    if (isOldValueReadonly) {
                        return false;
                    } else {
                        oldValue.value = value;
                        return true;
                    }
                }
            }
            const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
            const result = Reflect.set(target, key, value, receiver);
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add", key, value);
                } else if (hasChanged(value, oldValue)) {
                    trigger(target, "set", key, value, oldValue);
                }
            }
            return result;
        }
        deleteProperty(target, key) {
            const hadKey = hasOwn(target, key);
            const oldValue = target[key];
            const result = Reflect.deleteProperty(target, key);
            if (result && hadKey) {
                trigger(target, "delete", key, void 0, oldValue);
            }
            return result;
        }
        has(target, key) {
            const result = Reflect.has(target, key);
            if (!isSymbol(key) || !builtInSymbols.has(key)) {
                track(target, "has", key);
            }
            return result;
        }
        ownKeys(target) {
            track(
                target,
                "iterate",
                isArray(target) ? "length" : ITERATE_KEY
            );
            return Reflect.ownKeys(target);
        }
    };
    var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
        constructor(isShallow2 = false) {
            super(true, isShallow2);
        }
        set(target, key) {
            if (true) {
                warn(
                    `Set operation on key "${String(key)}" failed: target is readonly.`,
                    target
                );
            }
            return true;
        }
        deleteProperty(target, key) {
            if (true) {
                warn(
                    `Delete operation on key "${String(key)}" failed: target is readonly.`,
                    target
                );
            }
            return true;
        }
    };
    var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
    var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
    var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
        true
    );
    var shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
    var toShallow = (value) => value;
    var getProto = (v) => Reflect.getPrototypeOf(v);
    function get(target, key, isReadonly2 = false, isShallow2 = false) {
        target = target["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!isReadonly2) {
            if (hasChanged(key, rawKey)) {
                track(rawTarget, "get", key);
            }
            track(rawTarget, "get", rawKey);
        }
        const { has: has2 } = getProto(rawTarget);
        const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        if (has2.call(rawTarget, key)) {
            return wrap2(target.get(key));
        } else if (has2.call(rawTarget, rawKey)) {
            return wrap2(target.get(rawKey));
        } else if (target !== rawTarget) {
            target.get(key);
        }
    }
    function has(key, isReadonly2 = false) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!isReadonly2) {
            if (hasChanged(key, rawKey)) {
                track(rawTarget, "has", key);
            }
            track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
        target = target["__v_raw"];
        !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
        return Reflect.get(target, "size", target);
    }
    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
        }
        return this;
    }
    function set(key, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const { has: has2, get: get2 } = getProto(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has2.call(target, key);
        } else if (true) {
            checkIdentityKeys(target, has2, key);
        }
        const oldValue = get2.call(target, key);
        target.set(key, value);
        if (!hadKey) {
            trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value, oldValue);
        }
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw(this);
        const { has: has2, get: get2 } = getProto(target);
        let hadKey = has2.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has2.call(target, key);
        } else if (true) {
            checkIdentityKeys(target, has2, key);
        }
        const oldValue = get2 ? get2.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
            trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
    }
    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear", void 0, void 0, oldTarget);
        }
        return result;
    }
    function createForEach(isReadonly2, isShallow2) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw"];
            const rawTarget = toRaw(target);
            const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
            return target.forEach((value, key) => {
                return callback.call(thisArg, wrap2(value), wrap2(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
        return function(...args) {
            const target = this["__v_raw"];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
            const isKeyOnly = method === "keys" && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap2 = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
            !isReadonly2 && track(
                rawTarget,
                "iterate",
                isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
            );
            return {
                // iterator protocol
                next() {
                    const { value, done } = innerIterator.next();
                    return done ? { value, done } : {
                        value: isPair ? [wrap2(value[0]), wrap2(value[1])] : wrap2(value),
                        done
                    };
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this;
                }
            };
        };
    }
    function createReadonlyMethod(type) {
        return function(...args) {
            if (true) {
                const key = args[0] ? `on key "${args[0]}" ` : ``;
                warn(
                    `${capitalize(type)} operation ${key}failed: target is readonly.`,
                    toRaw(this)
                );
            }
            return type === "delete" ? false : type === "clear" ? void 0 : this;
        };
    }
    function createInstrumentations() {
        const mutableInstrumentations2 = {
            get(key) {
                return get(this, key);
            },
            get size() {
                return size(this);
            },
            has,
            add,
            set,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, false)
        };
        const shallowInstrumentations2 = {
            get(key) {
                return get(this, key, false, true);
            },
            get size() {
                return size(this);
            },
            has,
            add,
            set,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, true)
        };
        const readonlyInstrumentations2 = {
            get(key) {
                return get(this, key, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has.call(this, key, true);
            },
            add: createReadonlyMethod("add"),
            set: createReadonlyMethod("set"),
            delete: createReadonlyMethod("delete"),
            clear: createReadonlyMethod("clear"),
            forEach: createForEach(true, false)
        };
        const shallowReadonlyInstrumentations2 = {
            get(key) {
                return get(this, key, true, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has.call(this, key, true);
            },
            add: createReadonlyMethod("add"),
            set: createReadonlyMethod("set"),
            delete: createReadonlyMethod("delete"),
            clear: createReadonlyMethod("clear"),
            forEach: createForEach(true, true)
        };
        const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
        iteratorMethods.forEach((method) => {
            mutableInstrumentations2[method] = createIterableMethod(
                method,
                false,
                false
            );
            readonlyInstrumentations2[method] = createIterableMethod(
                method,
                true,
                false
            );
            shallowInstrumentations2[method] = createIterableMethod(
                method,
                false,
                true
            );
            shallowReadonlyInstrumentations2[method] = createIterableMethod(
                method,
                true,
                true
            );
        });
        return [
            mutableInstrumentations2,
            readonlyInstrumentations2,
            shallowInstrumentations2,
            shallowReadonlyInstrumentations2
        ];
    }
    var [
        mutableInstrumentations,
        readonlyInstrumentations,
        shallowInstrumentations,
        shallowReadonlyInstrumentations
    ] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
        const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
        return (target, key, receiver) => {
            if (key === "__v_isReactive") {
                return !isReadonly2;
            } else if (key === "__v_isReadonly") {
                return isReadonly2;
            } else if (key === "__v_raw") {
                return target;
            }
            return Reflect.get(
                hasOwn(instrumentations, key) && key in target ? instrumentations : target,
                key,
                receiver
            );
        };
    }
    var mutableCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    var shallowCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    var readonlyCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    var shallowReadonlyCollectionHandlers = {
        get: /* @__PURE__ */ createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has2, key) {
        const rawKey = toRaw(key);
        if (rawKey !== key && has2.call(target, rawKey)) {
            const type = toRawType(target);
            warn(
                `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
            );
        }
    }
    var reactiveMap = /* @__PURE__ */ new WeakMap();
    var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    var readonlyMap = /* @__PURE__ */ new WeakMap();
    var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
    function targetTypeMap(rawType) {
        switch (rawType) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0;
        }
    }
    function getTargetType(value) {
        return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
        if (isReadonly(target)) {
            return target;
        }
        return createReactiveObject(
            target,
            false,
            mutableHandlers,
            mutableCollectionHandlers,
            reactiveMap
        );
    }
    function shallowReactive(target) {
        return createReactiveObject(
            target,
            false,
            shallowReactiveHandlers,
            shallowCollectionHandlers,
            shallowReactiveMap
        );
    }
    function readonly(target) {
        return createReactiveObject(
            target,
            true,
            readonlyHandlers,
            readonlyCollectionHandlers,
            readonlyMap
        );
    }
    function shallowReadonly(target) {
        return createReactiveObject(
            target,
            true,
            shallowReadonlyHandlers,
            shallowReadonlyCollectionHandlers,
            shallowReadonlyMap
        );
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject(target)) {
            if (true) {
                warn(`value cannot be made reactive: ${String(target)}`);
            }
            return target;
        }
        if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
            return target;
        }
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        const targetType = getTargetType(target);
        if (targetType === 0) {
            return target;
        }
        const proxy = new Proxy(
            target,
            targetType === 2 ? collectionHandlers : baseHandlers
        );
        proxyMap.set(target, proxy);
        return proxy;
    }
    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value["__v_raw"]);
        }
        return !!(value && value["__v_isReactive"]);
    }
    function isReadonly(value) {
        return !!(value && value["__v_isReadonly"]);
    }
    function isShallow(value) {
        return !!(value && value["__v_isShallow"]);
    }
    function isProxy(value) {
        return isReactive(value) || isReadonly(value);
    }
    function toRaw(observed) {
        const raw = observed && observed["__v_raw"];
        return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
        if (Object.isExtensible(value)) {
            def(value, "__v_skip", true);
        }
        return value;
    }
    var toReactive = (value) => isObject(value) ? reactive(value) : value;
    var toReadonly = (value) => isObject(value) ? readonly(value) : value;
    var COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
    var ComputedRefImpl = class {
        constructor(getter, _setter, isReadonly2, isSSR) {
            this.getter = getter;
            this._setter = _setter;
            this.dep = void 0;
            this.__v_isRef = true;
            this["__v_isReadonly"] = false;
            this.effect = new ReactiveEffect(
                () => getter(this._value),
                () => triggerRefValue(
                    this,
                    this.effect._dirtyLevel === 2 ? 2 : 3
                )
            );
            this.effect.computed = this;
            this.effect.active = this._cacheable = !isSSR;
            this["__v_isReadonly"] = isReadonly2;
        }
        get value() {
            const self2 = toRaw(this);
            if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
                triggerRefValue(self2, 4);
            }
            trackRefValue(self2);
            if (self2.effect._dirtyLevel >= 2) {
                if (this._warnRecursive) {
                    warn(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
                }
                triggerRefValue(self2, 2);
            }
            return self2._value;
        }
        set value(newValue) {
            this._setter(newValue);
        }
        // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
        get _dirty() {
            return this.effect.dirty;
        }
        set _dirty(v) {
            this.effect.dirty = v;
        }
        // #endregion
    };
    function computed(getterOrOptions, debugOptions, isSSR = false) {
        let getter;
        let setter;
        const onlyGetter = isFunction(getterOrOptions);
        if (onlyGetter) {
            getter = getterOrOptions;
            setter = true ? () => {
                warn("Write operation failed: computed value is readonly");
            } : NOOP;
        } else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
        if (debugOptions && !isSSR) {
            cRef.effect.onTrack = debugOptions.onTrack;
            cRef.effect.onTrigger = debugOptions.onTrigger;
        }
        return cRef;
    }
    function trackRefValue(ref2) {
        var _a;
        if (shouldTrack && activeEffect) {
            ref2 = toRaw(ref2);
            trackEffect(
                activeEffect,
                (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
                    () => ref2.dep = void 0,
                    ref2 instanceof ComputedRefImpl ? ref2 : void 0
                ),
                true ? {
                    target: ref2,
                    type: "get",
                    key: "value"
                } : void 0
            );
        }
    }
    function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
        ref2 = toRaw(ref2);
        const dep = ref2.dep;
        if (dep) {
            triggerEffects(
                dep,
                dirtyLevel,
                true ? {
                    target: ref2,
                    type: "set",
                    key: "value",
                    newValue: newVal
                } : void 0
            );
        }
    }
    function isRef(r) {
        return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
        return createRef(value, false);
    }
    function shallowRef(value) {
        return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
        if (isRef(rawValue)) {
            return rawValue;
        }
        return new RefImpl(rawValue, shallow);
    }
    var RefImpl = class {
        constructor(value, __v_isShallow) {
            this.__v_isShallow = __v_isShallow;
            this.dep = void 0;
            this.__v_isRef = true;
            this._rawValue = __v_isShallow ? value : toRaw(value);
            this._value = __v_isShallow ? value : toReactive(value);
        }
        get value() {
            trackRefValue(this);
            return this._value;
        }
        set value(newVal) {
            const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
            newVal = useDirectValue ? newVal : toRaw(newVal);
            if (hasChanged(newVal, this._rawValue)) {
                this._rawValue = newVal;
                this._value = useDirectValue ? newVal : toReactive(newVal);
                triggerRefValue(this, 4, newVal);
            }
        }
    };
    function triggerRef(ref2) {
        triggerRefValue(ref2, 4, true ? ref2.value : void 0);
    }
    function unref(ref2) {
        return isRef(ref2) ? ref2.value : ref2;
    }
    function toValue(source) {
        return isFunction(source) ? source() : unref(source);
    }
    var shallowUnwrapHandlers = {
        get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
        set: (target, key, value, receiver) => {
            const oldValue = target[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            } else {
                return Reflect.set(target, key, value, receiver);
            }
        }
    };
    function proxyRefs(objectWithRefs) {
        return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var CustomRefImpl = class {
        constructor(factory) {
            this.dep = void 0;
            this.__v_isRef = true;
            const { get: get2, set: set3 } = factory(
                () => trackRefValue(this),
                () => triggerRefValue(this)
            );
            this._get = get2;
            this._set = set3;
        }
        get value() {
            return this._get();
        }
        set value(newVal) {
            this._set(newVal);
        }
    };
    function customRef(factory) {
        return new CustomRefImpl(factory);
    }
    function toRefs(object) {
        if (!isProxy(object)) {
            warn(`toRefs() expects a reactive object but received a plain one.`);
        }
        const ret = isArray(object) ? new Array(object.length) : {};
        for (const key in object) {
            ret[key] = propertyToRef(object, key);
        }
        return ret;
    }
    var ObjectRefImpl = class {
        constructor(_object, _key, _defaultValue) {
            this._object = _object;
            this._key = _key;
            this._defaultValue = _defaultValue;
            this.__v_isRef = true;
        }
        get value() {
            const val = this._object[this._key];
            return val === void 0 ? this._defaultValue : val;
        }
        set value(newVal) {
            this._object[this._key] = newVal;
        }
        get dep() {
            return getDepFromReactive(toRaw(this._object), this._key);
        }
    };
    var GetterRefImpl = class {
        constructor(_getter) {
            this._getter = _getter;
            this.__v_isRef = true;
            this.__v_isReadonly = true;
        }
        get value() {
            return this._getter();
        }
    };
    function toRef(source, key, defaultValue) {
        if (isRef(source)) {
            return source;
        } else if (isFunction(source)) {
            return new GetterRefImpl(source);
        } else if (isObject(source) && arguments.length > 1) {
            return propertyToRef(source, key, defaultValue);
        } else {
            return ref(source);
        }
    }
    function propertyToRef(source, key, defaultValue) {
        const val = source[key];
        return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
    }
    var TrackOpTypes = {
        "GET": "get",
        "HAS": "has",
        "ITERATE": "iterate"
    };
    var TriggerOpTypes = {
        "SET": "set",
        "ADD": "add",
        "DELETE": "delete",
        "CLEAR": "clear"
    };

    // ../uni-app-next/packages/uni-app-vue/dist/vue.runtime.esm.dev.js
    var stack = [];
    function pushWarningContext(vnode) {
        stack.push(vnode);
    }
    function popWarningContext() {
        stack.pop();
    }
    function warn$1(msg2) {
        pauseTracking();
        var instance = stack.length ? stack[stack.length - 1].component : null;
        var appWarnHandler = instance && instance.appContext.config.warnHandler;
        var trace = getComponentTrace();
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        if (appWarnHandler) {
            callWithErrorHandling(appWarnHandler, instance, 11, [msg2 + args.map((a) => {
                var _a, _b;
                return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
            }).join(""), instance && instance.proxy, trace.map((_ref) => {
                var {
                    vnode
                } = _ref;
                return "at <".concat(formatComponentName(instance, vnode.type), ">");
            }).join("\n"), trace]);
        } else {
            var warnArgs = ["[Vue warn]: ".concat(msg2), ...args];
            if (trace.length && // avoid spamming console during tests
                true) {
                warnArgs.push("\n", ...formatTrace(trace));
            }
            console.warn(...warnArgs);
        }
        resetTracking();
    }
    function getComponentTrace() {
        var currentVNode = stack[stack.length - 1];
        if (!currentVNode) {
            return [];
        }
        var normalizedStack = [];
        while (currentVNode) {
            var last = normalizedStack[0];
            if (last && last.vnode === currentVNode) {
                last.recurseCount++;
            } else {
                normalizedStack.push({
                    vnode: currentVNode,
                    recurseCount: 0
                });
            }
            var parentInstance = currentVNode.component && currentVNode.component.parent;
            currentVNode = parentInstance && parentInstance.vnode;
        }
        return normalizedStack;
    }
    function formatTrace(trace) {
        var logs = [];
        trace.forEach((entry, i) => {
            logs.push(...i === 0 ? [] : ["\n"], ...formatTraceEntry(entry));
        });
        return logs;
    }
    function formatTraceEntry(_ref2) {
        var {
            vnode,
            recurseCount
        } = _ref2;
        var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
        var isRoot = vnode.component ? vnode.component.parent == null : false;
        var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
        var close = ">" + postfix;
        return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
    }
    function formatProps(props) {
        var res = [];
        var keys = Object.keys(props);
        keys.slice(0, 3).forEach((key) => {
            res.push(...formatProp(key, props[key]));
        });
        if (keys.length > 3) {
            res.push(" ...");
        }
        return res;
    }
    function formatProp(key, value, raw) {
        if (isString(value)) {
            value = JSON.stringify(value);
            return raw ? value : ["".concat(key, "=").concat(value)];
        } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
            return raw ? value : ["".concat(key, "=").concat(value)];
        } else if (isRef(value)) {
            value = formatProp(key, toRaw(value.value), true);
            return raw ? value : ["".concat(key, "=Ref<"), value, ">"];
        } else if (isFunction(value)) {
            return ["".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
        } else {
            value = toRaw(value);
            return raw ? value : ["".concat(key, "="), value];
        }
    }
    function assertNumber(val, type) {
        if (val === void 0) {
            return;
        } else if (typeof val !== "number") {
            warn$1("".concat(type, " is not a valid number - got ").concat(JSON.stringify(val), "."));
        } else if (isNaN(val)) {
            warn$1("".concat(type, " is NaN - the duration expression might be incorrect."));
        }
    }
    var ErrorCodes = {
        "SETUP_FUNCTION": 0,
        "0": "SETUP_FUNCTION",
        "RENDER_FUNCTION": 1,
        "1": "RENDER_FUNCTION",
        "WATCH_GETTER": 2,
        "2": "WATCH_GETTER",
        "WATCH_CALLBACK": 3,
        "3": "WATCH_CALLBACK",
        "WATCH_CLEANUP": 4,
        "4": "WATCH_CLEANUP",
        "NATIVE_EVENT_HANDLER": 5,
        "5": "NATIVE_EVENT_HANDLER",
        "COMPONENT_EVENT_HANDLER": 6,
        "6": "COMPONENT_EVENT_HANDLER",
        "VNODE_HOOK": 7,
        "7": "VNODE_HOOK",
        "DIRECTIVE_HOOK": 8,
        "8": "DIRECTIVE_HOOK",
        "TRANSITION_HOOK": 9,
        "9": "TRANSITION_HOOK",
        "APP_ERROR_HANDLER": 10,
        "10": "APP_ERROR_HANDLER",
        "APP_WARN_HANDLER": 11,
        "11": "APP_WARN_HANDLER",
        "FUNCTION_REF": 12,
        "12": "FUNCTION_REF",
        "ASYNC_COMPONENT_LOADER": 13,
        "13": "ASYNC_COMPONENT_LOADER",
        "SCHEDULER": 14,
        "14": "SCHEDULER"
    };
    var ErrorTypeStrings$1 = {
        ["sp"]: "serverPrefetch hook",
        ["bc"]: "beforeCreate hook",
        ["c"]: "created hook",
        ["bm"]: "beforeMount hook",
        ["m"]: "mounted hook",
        ["bu"]: "beforeUpdate hook",
        ["u"]: "updated",
        ["bum"]: "beforeUnmount hook",
        ["um"]: "unmounted hook",
        ["a"]: "activated hook",
        ["da"]: "deactivated hook",
        ["ec"]: "errorCaptured hook",
        ["rtc"]: "renderTracked hook",
        ["rtg"]: "renderTriggered hook",
        [0]: "setup function",
        [1]: "render function",
        [2]: "watcher getter",
        [3]: "watcher callback",
        [4]: "watcher cleanup function",
        [5]: "native event handler",
        [6]: "component event handler",
        [7]: "vnode hook",
        [8]: "directive hook",
        [9]: "transition hook",
        [10]: "app errorHandler",
        [11]: "app warnHandler",
        [12]: "ref function",
        [13]: "async component loader",
        [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
    };
    function callWithErrorHandling(fn, instance, type, args) {
        try {
            return args ? fn(...args) : fn();
        } catch (err2) {
            handleError(err2, instance, type);
        }
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
        if (isFunction(fn)) {
            var res = callWithErrorHandling(fn, instance, type, args);
            if (res && isPromise(res)) {
                res.catch((err2) => {
                    handleError(err2, instance, type);
                });
            }
            return res;
        }
        var values = [];
        for (var i = 0; i < fn.length; i++) {
            values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
        }
        return values;
    }
    function handleError(err2, instance, type) {
        var throwInDev = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        var contextVNode = instance ? instance.vnode : null;
        if (instance) {
            var cur = instance.parent;
            var exposedInstance = instance.proxy;
            var errorInfo = ErrorTypeStrings$1[type] || type;
            while (cur) {
                var errorCapturedHooks = cur.ec;
                if (errorCapturedHooks) {
                    for (var i = 0; i < errorCapturedHooks.length; i++) {
                        if (errorCapturedHooks[i](err2, exposedInstance, errorInfo) === false) {
                            return;
                        }
                    }
                }
                cur = cur.parent;
            }
            var appErrorHandler = instance.appContext.config.errorHandler;
            if (appErrorHandler) {
                callWithErrorHandling(appErrorHandler, null, 10, [err2, exposedInstance, errorInfo]);
                return;
            }
        }
        logError(err2, type, contextVNode, throwInDev);
    }
    function logError(err2, type, contextVNode) {
        var throwInDev = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        {
            var info = ErrorTypeStrings$1[type] || type;
            if (contextVNode) {
                pushWarningContext(contextVNode);
            }
            warn$1("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
            if (contextVNode) {
                popWarningContext();
            }
            if (throwInDev) {
                console.error(err2);
            } else {
                console.error(err2);
            }
        }
    }
    var isFlushing = false;
    var isFlushPending = false;
    var queue = [];
    var flushIndex = 0;
    var pendingPostFlushCbs = [];
    var activePostFlushCbs = null;
    var postFlushIndex = 0;
    var iOSPromise = {
        then(callback) {
            setTimeout(() => callback(), 0);
        }
    };
    var isIOS = false;
    var resolvedPromise = isIOS ? iOSPromise : Promise.resolve();
    var currentFlushPromise = null;
    var RECURSION_LIMIT = 100;
    function nextTick(fn) {
        var p = currentFlushPromise || resolvedPromise;
        return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    function findInsertionIndex(id2) {
        var start = flushIndex + 1;
        var end = queue.length;
        while (start < end) {
            var middle = start + end >>> 1;
            var middleJob = queue[middle];
            var middleJobId = getId(middleJob);
            if (middleJobId < id2 || middleJobId === id2 && middleJob.pre) {
                start = middle + 1;
            } else {
                end = middle;
            }
        }
        return start;
    }
    function queueJob(job) {
        if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
            if (job.id == null) {
                queue.push(job);
            } else {
                queue.splice(findInsertionIndex(job.id), 0, job);
            }
            queueFlush();
        }
    }
    function queueFlush() {
        if (!isFlushing && !isFlushPending) {
            isFlushPending = true;
            currentFlushPromise = resolvedPromise.then(flushJobs);
        }
    }
    function invalidateJob(job) {
        var i = queue.indexOf(job);
        if (i > flushIndex) {
            queue.splice(i, 1);
        }
    }
    function queuePostFlushCb(cb) {
        if (!isArray(cb)) {
            if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
                pendingPostFlushCbs.push(cb);
            }
        } else {
            pendingPostFlushCbs.push(...cb);
        }
        queueFlush();
    }
    function flushPreFlushCbs(instance, seen) {
        var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : isFlushing ? flushIndex + 1 : 0;
        {
            seen = seen || /* @__PURE__ */ new Map();
        }
        for (; i < queue.length; i++) {
            var cb = queue[i];
            if (cb && cb.pre) {
                if (instance && cb.id !== instance.uid) {
                    continue;
                }
                if (checkRecursiveUpdates(seen, cb)) {
                    continue;
                }
                queue.splice(i, 1);
                i--;
                cb();
            }
        }
    }
    function flushPostFlushCbs(seen) {
        if (pendingPostFlushCbs.length) {
            var deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
            pendingPostFlushCbs.length = 0;
            if (activePostFlushCbs) {
                activePostFlushCbs.push(...deduped);
                return;
            }
            activePostFlushCbs = deduped;
            {
                seen = seen || /* @__PURE__ */ new Map();
            }
            for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
                if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                    continue;
                }
                activePostFlushCbs[postFlushIndex]();
            }
            activePostFlushCbs = null;
            postFlushIndex = 0;
        }
    }
    var getId = (job) => job.id == null ? Infinity : job.id;
    var comparator = (a, b) => {
        var diff = getId(a) - getId(b);
        if (diff === 0) {
            if (a.pre && !b.pre)
                return -1;
            if (b.pre && !a.pre)
                return 1;
        }
        return diff;
    };
    function flushJobs(seen) {
        isFlushPending = false;
        isFlushing = true;
        {
            seen = seen || /* @__PURE__ */ new Map();
        }
        queue.sort(comparator);
        var check = (job2) => checkRecursiveUpdates(seen, job2);
        try {
            for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
                var job = queue[flushIndex];
                if (job && job.active !== false) {
                    if (check(job)) {
                        continue;
                    }
                    callWithErrorHandling(job, null, 14);
                }
            }
        } finally {
            flushIndex = 0;
            queue.length = 0;
            flushPostFlushCbs(seen);
            isFlushing = false;
            currentFlushPromise = null;
            if (queue.length || pendingPostFlushCbs.length) {
                flushJobs(seen);
            }
        }
    }
    function checkRecursiveUpdates(seen, fn) {
        if (!seen.has(fn)) {
            seen.set(fn, 1);
        } else {
            var count = seen.get(fn);
            if (count > RECURSION_LIMIT) {
                var instance = fn.ownerInstance;
                var componentName = instance && getComponentName(instance.type);
                handleError("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."), null, 10);
                return true;
            } else {
                seen.set(fn, count + 1);
            }
        }
    }
    var isHmrUpdating = false;
    var hmrDirtyComponents = /* @__PURE__ */ new Set();
    {
        getGlobalThis().__VUE_HMR_RUNTIME__ = {
            createRecord: tryWrap(createRecord),
            rerender: tryWrap(rerender),
            reload: tryWrap(reload)
        };
    }
    var map = /* @__PURE__ */ new Map();
    function registerHMR(instance) {
        var id2 = instance.type.__hmrId;
        var record = map.get(id2);
        if (!record) {
            createRecord(id2, instance.type);
            record = map.get(id2);
        }
        record.instances.add(instance);
    }
    function unregisterHMR(instance) {
        map.get(instance.type.__hmrId).instances.delete(instance);
    }
    function createRecord(id2, initialDef) {
        if (map.has(id2)) {
            return false;
        }
        map.set(id2, {
            initialDef: normalizeClassComponent(initialDef),
            instances: /* @__PURE__ */ new Set()
        });
        return true;
    }
    function normalizeClassComponent(component) {
        return isClassComponent(component) ? component.__vccOpts : component;
    }
    function rerender(id2, newRender) {
        var record = map.get(id2);
        if (!record) {
            return;
        }
        record.initialDef.render = newRender;
        [...record.instances].forEach((instance) => {
            if (newRender) {
                instance.render = newRender;
                normalizeClassComponent(instance.type).render = newRender;
            }
            instance.renderCache = [];
            isHmrUpdating = true;
            instance.effect.dirty = true;
            instance.update();
            isHmrUpdating = false;
        });
    }
    function reload(id2, newComp) {
        var record = map.get(id2);
        if (!record)
            return;
        newComp = normalizeClassComponent(newComp);
        updateComponentDef(record.initialDef, newComp);
        var instances = [...record.instances];
        for (var instance of instances) {
            var oldComp = normalizeClassComponent(instance.type);
            if (!hmrDirtyComponents.has(oldComp)) {
                if (oldComp !== record.initialDef) {
                    updateComponentDef(oldComp, newComp);
                }
                hmrDirtyComponents.add(oldComp);
            }
            instance.appContext.propsCache.delete(instance.type);
            instance.appContext.emitsCache.delete(instance.type);
            instance.appContext.optionsCache.delete(instance.type);
            if (instance.ceReload) {
                hmrDirtyComponents.add(oldComp);
                instance.ceReload(newComp.styles);
                hmrDirtyComponents.delete(oldComp);
            } else if (instance.parent) {
                instance.parent.effect.dirty = true;
                queueJob(instance.parent.update);
            } else if (instance.appContext.reload) {
                instance.appContext.reload();
            } else if (typeof window !== "undefined") {
                window.location.reload();
            } else {
                console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
            }
        }
        queuePostFlushCb(() => {
            for (var _instance of instances) {
                hmrDirtyComponents.delete(normalizeClassComponent(_instance.type));
            }
        });
    }
    function updateComponentDef(oldComp, newComp) {
        extend(oldComp, newComp);
        for (var key in oldComp) {
            if (key !== "__file" && !(key in newComp)) {
                delete oldComp[key];
            }
        }
    }
    function tryWrap(fn) {
        return (id2, arg) => {
            try {
                return fn(id2, arg);
            } catch (e) {
                console.error(e);
                console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
            }
        };
    }
    var devtools$1;
    var buffer = [];
    var devtoolsNotInstalled = false;
    function emit$1(event) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }
        if (devtools$1) {
            devtools$1.emit(event, ...args);
        } else if (!devtoolsNotInstalled) {
            buffer.push({
                event,
                args
            });
        }
    }
    function setDevtoolsHook$1(hook, target) {
        var _a, _b;
        devtools$1 = hook;
        if (devtools$1) {
            devtools$1.enabled = true;
            buffer.forEach((_ref3) => {
                var {
                    event,
                    args
                } = _ref3;
                return devtools$1.emit(event, ...args);
            });
            buffer = [];
        } else if (
        // handle late devtools injection - only do this if we are in an actual
        // browser environment to avoid the timer handle stalling test runner exit
        // (#4815)
            typeof window !== "undefined" && // some envs mock window but not fully
                // eslint-disable-next-line no-restricted-globals
            window.HTMLElement && // also exclude jsdom
                // eslint-disable-next-line no-restricted-globals
                !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
        ) {
            var replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
            replay.push((newHook) => {
                setDevtoolsHook$1(newHook, target);
            });
            setTimeout(() => {
                if (!devtools$1) {
                    target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
                    devtoolsNotInstalled = true;
                    buffer = [];
                }
            }, 3e3);
        } else {
            devtoolsNotInstalled = true;
            buffer = [];
        }
    }
    function devtoolsInitApp(app, version2) {
        emit$1("app:init", app, version2, {
            Fragment,
            Text,
            Comment,
            Static
        });
    }
    function devtoolsUnmountApp(app) {
        emit$1("app:unmount", app);
    }
    var devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
        "component:added"
        /* COMPONENT_ADDED */
    );
    var devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
        "component:updated"
        /* COMPONENT_UPDATED */
    );
    var _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
        "component:removed"
        /* COMPONENT_REMOVED */
    );
    var devtoolsComponentRemoved = (component) => {
        if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
            !devtools$1.cleanupBuffer(component)) {
            _devtoolsComponentRemoved(component);
        }
    };
    // @__NO_SIDE_EFFECTS__
    function createDevtoolsComponentHook(hook) {
        return (component) => {
            emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
        };
    }
    var devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
        "perf:start"
        /* PERFORMANCE_START */
    );
    var devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
        "perf:end"
        /* PERFORMANCE_END */
    );
    function createDevtoolsPerformanceHook(hook) {
        return (component, type, time) => {
            emit$1(hook, component.appContext.app, component.uid, component, type, time);
        };
    }
    function devtoolsComponentEmit(component, event, params) {
        emit$1("component:emit", component.appContext.app, component, event, params);
    }
    function emit(instance, event) {
        if (instance.isUnmounted)
            return;
        var props = instance.vnode.props || EMPTY_OBJ;
        for (var _len3 = arguments.length, rawArgs = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rawArgs[_key3 - 2] = arguments[_key3];
        }
        {
            var {
                emitsOptions,
                propsOptions: [propsOptions]
            } = instance;
            if (emitsOptions) {
                if (!(event in emitsOptions) && true) {
                    if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
                        warn$1('Component emitted event "'.concat(event, '" but it is neither declared in the emits option nor as an "').concat(toHandlerKey(event), '" prop.'));
                    }
                } else {
                    var validator2 = emitsOptions[event];
                    if (isFunction(validator2)) {
                        var isValid = validator2(...rawArgs);
                        if (!isValid) {
                            warn$1('Invalid event arguments: event validation failed for event "'.concat(event, '".'));
                        }
                    }
                }
            }
        }
        var args = rawArgs;
        var isModelListener2 = event.startsWith("update:");
        var modelArg = isModelListener2 && event.slice(7);
        if (modelArg && modelArg in props) {
            var modifiersKey = "".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers");
            var {
                number,
                trim
            } = props[modifiersKey] || EMPTY_OBJ;
            if (trim) {
                args = rawArgs.map((a) => isString(a) ? a.trim() : a);
            }
            if (number) {
                args = rawArgs.map(looseToNumber);
            }
        }
        {
            devtoolsComponentEmit(instance, event, args);
        }
        {
            var lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
                warn$1('Event "'.concat(lowerCaseEvent, '" is emitted in component ').concat(formatComponentName(instance, instance.type), ' but the handler is registered for "').concat(event, '". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "').concat(hyphenate(event), '" instead of "').concat(event, '".'));
            }
        }
        var handlerName;
        var handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
        props[handlerName = toHandlerKey(camelize(event))];
        if (!handler && isModelListener2) {
            handler = props[handlerName = toHandlerKey(hyphenate(event))];
        }
        if (handler) {
            callWithAsyncErrorHandling(handler, instance, 6, args);
        }
        var onceHandler = props[handlerName + "Once"];
        if (onceHandler) {
            if (!instance.emitted) {
                instance.emitted = {};
            } else if (instance.emitted[handlerName]) {
                return;
            }
            instance.emitted[handlerName] = true;
            callWithAsyncErrorHandling(onceHandler, instance, 6, args);
        }
    }
    function normalizeEmitsOptions(comp, appContext) {
        var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var cache2 = appContext.emitsCache;
        var cached = cache2.get(comp);
        if (cached !== void 0) {
            return cached;
        }
        var raw = comp.emits;
        var normalized = {};
        var hasExtends = false;
        if (!isFunction(comp)) {
            var extendEmits = (raw2) => {
                var normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
                if (normalizedFromExtend) {
                    hasExtends = true;
                    extend(normalized, normalizedFromExtend);
                }
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendEmits);
            }
            if (comp.extends) {
                extendEmits(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendEmits);
            }
        }
        if (!raw && !hasExtends) {
            if (isObject(comp)) {
                cache2.set(comp, null);
            }
            return null;
        }
        if (isArray(raw)) {
            raw.forEach((key) => normalized[key] = null);
        } else {
            extend(normalized, raw);
        }
        if (isObject(comp)) {
            cache2.set(comp, normalized);
        }
        return normalized;
    }
    function isEmitListener(options, key) {
        if (!options || !isOn(key)) {
            return false;
        }
        key = key.slice(2).replace(/Once$/, "");
        return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
    }
    var currentRenderingInstance = null;
    var currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
        var prev = currentRenderingInstance;
        currentRenderingInstance = instance;
        currentScopeId = instance && instance.type.__scopeId || null;
        return prev;
    }
    function pushScopeId(id2) {
        currentScopeId = id2;
    }
    function popScopeId() {
        currentScopeId = null;
    }
    var withScopeId = (_id) => withCtx;
    function withCtx(fn) {
        var ctx = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentRenderingInstance;
        var isNonScopedSlot = arguments.length > 2 ? arguments[2] : void 0;
        if (!ctx)
            return fn;
        if (fn._n) {
            return fn;
        }
        var renderFnWithContext = function() {
            if (renderFnWithContext._d) {
                setBlockTracking(-1);
            }
            var prevInstance = setCurrentRenderingInstance(ctx);
            var res;
            try {
                res = fn(...arguments);
            } finally {
                setCurrentRenderingInstance(prevInstance);
                if (renderFnWithContext._d) {
                    setBlockTracking(1);
                }
            }
            {
                devtoolsComponentUpdated(ctx);
            }
            return res;
        };
        renderFnWithContext._n = true;
        renderFnWithContext._c = true;
        renderFnWithContext._d = true;
        return renderFnWithContext;
    }
    var accessedAttrs = false;
    function markAttrsAccessed() {
        accessedAttrs = true;
    }
    function renderComponentRoot(instance) {
        var {
            type: Component,
            vnode,
            proxy,
            withProxy,
            props,
            propsOptions: [propsOptions],
            slots,
            attrs,
            emit: emit2,
            render: render2,
            renderCache,
            data,
            setupState,
            ctx,
            inheritAttrs
        } = instance;
        var result;
        var fallthroughAttrs;
        var prev = setCurrentRenderingInstance(instance);
        {
            accessedAttrs = false;
        }
        try {
            if (vnode.shapeFlag & 4) {
                var proxyToUse = withProxy || proxy;
                var thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
                    get(target, key2, receiver) {
                        warn$1("Property '".concat(String(key2), "' was accessed via 'this'. Avoid using 'this' in templates."));
                        return Reflect.get(target, key2, receiver);
                    }
                }) : proxyToUse;
                result = normalizeVNode(render2.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
                fallthroughAttrs = attrs;
            } else {
                var render22 = Component;
                if (attrs === props) {
                    markAttrsAccessed();
                }
                result = normalizeVNode(render22.length > 1 ? render22(props, true ? {
                    get attrs() {
                        markAttrsAccessed();
                        return attrs;
                    },
                    slots,
                    emit: emit2
                } : {
                    attrs,
                    slots,
                    emit: emit2
                }) : render22(
                    props,
                    null
                    /* we know it doesn't need it */
                ));
                fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
            }
        } catch (err2) {
            blockStack.length = 0;
            handleError(err2, instance, 1);
            result = createVNode(Comment);
        }
        var root = result;
        var setRoot = void 0;
        if (result.patchFlag > 0 && result.patchFlag & 2048) {
            [root, setRoot] = getChildRoot(result);
        }
        if (fallthroughAttrs && inheritAttrs !== false) {
            var keys = Object.keys(fallthroughAttrs);
            var {
                shapeFlag
            } = root;
            if (keys.length) {
                if (shapeFlag & (1 | 6)) {
                    if (propsOptions && keys.some(isModelListener)) {
                        fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    }
                    root = cloneVNode(root, fallthroughAttrs);
                } else if (!accessedAttrs && root.type !== Comment) {
                    var allAttrs = Object.keys(attrs);
                    var eventAttrs = [];
                    var extraAttrs = [];
                    for (var i = 0, l = allAttrs.length; i < l; i++) {
                        var key = allAttrs[i];
                        if (isOn(key)) {
                            if (!isModelListener(key)) {
                                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                            }
                        } else {
                            extraAttrs.push(key);
                        }
                    }
                    if (extraAttrs.length) {
                        warn$1("Extraneous non-props attributes (".concat(extraAttrs.join(", "), ") were passed to component but could not be automatically inherited because component renders fragment or text root nodes."));
                    }
                    if (eventAttrs.length) {
                        warn$1("Extraneous non-emits event listeners (".concat(eventAttrs.join(", "), ') were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.'));
                    }
                }
            }
        }
        if (vnode.dirs) {
            if (!isElementRoot(root)) {
                warn$1("Runtime directive used on component with non-element root node. The directives will not function as intended.");
            }
            root = cloneVNode(root);
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        if (vnode.transition) {
            if (!isElementRoot(root)) {
                warn$1("Component inside <Transition> renders non-element root node that cannot be animated.");
            }
            root.transition = vnode.transition;
        }
        if (setRoot) {
            setRoot(root);
        } else {
            result = root;
        }
        setCurrentRenderingInstance(prev);
        return result;
    }
    var getChildRoot = (vnode) => {
        var rawChildren = vnode.children;
        var dynamicChildren = vnode.dynamicChildren;
        var childRoot = filterSingleRoot(rawChildren, false);
        if (!childRoot) {
            return [vnode, void 0];
        } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
            return getChildRoot(childRoot);
        }
        var index2 = rawChildren.indexOf(childRoot);
        var dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
        var setRoot = (updatedRoot) => {
            rawChildren[index2] = updatedRoot;
            if (dynamicChildren) {
                if (dynamicIndex > -1) {
                    dynamicChildren[dynamicIndex] = updatedRoot;
                } else if (updatedRoot.patchFlag > 0) {
                    vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
                }
            }
        };
        return [normalizeVNode(childRoot), setRoot];
    };
    function filterSingleRoot(children) {
        var recurse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        var singleRoot;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (isVNode(child)) {
                if (child.type !== Comment || child.children === "v-if") {
                    if (singleRoot) {
                        return;
                    } else {
                        singleRoot = child;
                        if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
                            return filterSingleRoot(singleRoot.children);
                        }
                    }
                }
            } else {
                return;
            }
        }
        return singleRoot;
    }
    var getFunctionalFallthrough = (attrs) => {
        var res;
        for (var key in attrs) {
            if (key === "class" || key === "style" || isOn(key)) {
                (res || (res = {}))[key] = attrs[key];
            }
        }
        return res;
    };
    var filterModelListeners = (attrs, props) => {
        var res = {};
        for (var key in attrs) {
            if (!isModelListener(key) || !(key.slice(9) in props)) {
                res[key] = attrs[key];
            }
        }
        return res;
    };
    var isElementRoot = (vnode) => {
        return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
        var {
            props: prevProps,
            children: prevChildren,
            component
        } = prevVNode;
        var {
            props: nextProps,
            children: nextChildren,
            patchFlag
        } = nextVNode;
        var emits = component.emitsOptions;
        if ((prevChildren || nextChildren) && isHmrUpdating) {
            return true;
        }
        if (nextVNode.dirs || nextVNode.transition) {
            return true;
        }
        if (optimized && patchFlag >= 0) {
            if (patchFlag & 1024) {
                return true;
            }
            if (patchFlag & 16) {
                if (!prevProps) {
                    return !!nextProps;
                }
                return hasPropsChanged(prevProps, nextProps, emits);
            } else if (patchFlag & 8) {
                var dynamicProps = nextVNode.dynamicProps;
                for (var i = 0; i < dynamicProps.length; i++) {
                    var key = dynamicProps[i];
                    if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
                        return true;
                    }
                }
            }
        } else {
            if (prevChildren || nextChildren) {
                if (!nextChildren || !nextChildren.$stable) {
                    return true;
                }
            }
            if (prevProps === nextProps) {
                return false;
            }
            if (!prevProps) {
                return !!nextProps;
            }
            if (!nextProps) {
                return true;
            }
            return hasPropsChanged(prevProps, nextProps, emits);
        }
        return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
        var nextKeys = Object.keys(nextProps);
        if (nextKeys.length !== Object.keys(prevProps).length) {
            return true;
        }
        for (var i = 0; i < nextKeys.length; i++) {
            var key = nextKeys[i];
            if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
                return true;
            }
        }
        return false;
    }
    function updateHOCHostEl(_ref4, el) {
        var {
            vnode,
            parent
        } = _ref4;
        while (parent) {
            var root = parent.subTree;
            if (root.suspense && root.suspense.activeBranch === vnode) {
                root.el = vnode.el;
            }
            if (root === vnode) {
                (vnode = parent.vnode).el = el;
                parent = parent.parent;
            } else {
                break;
            }
        }
    }
    var COMPONENTS = "components";
    var DIRECTIVES = "directives";
    function resolveComponent(name, maybeSelfReference) {
        return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
    }
    var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
    function resolveDynamicComponent(component) {
        if (isString(component)) {
            return resolveAsset(COMPONENTS, component, false) || component;
        } else {
            return component || NULL_DYNAMIC_COMPONENT;
        }
    }
    function resolveDirective(name) {
        return resolveAsset(DIRECTIVES, name);
    }
    function resolveAsset(type, name) {
        var warnMissing = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        var maybeSelfReference = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        var instance = currentRenderingInstance || currentInstance;
        if (instance) {
            var Component = instance.type;
            if (type === COMPONENTS) {
                var selfName = getComponentName(Component, false);
                if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
                    return Component;
                }
            }
            var res = (
                // local registration
                // check instance[type] first which is resolved for options API
                resolve(instance[type] || Component[type], name) || // global registration
                resolve(instance.appContext[type], name)
            );
            if (!res && maybeSelfReference) {
                return Component;
            }
            if (warnMissing && !res) {
                var extra = type === COMPONENTS ? "\nIf this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement." : "";
                warn$1("Failed to resolve ".concat(type.slice(0, -1), ": ").concat(name).concat(extra));
            }
            return res;
        } else {
            warn$1("resolve".concat(capitalize(type.slice(0, -1)), " can only be used in render() or setup()."));
        }
    }
    function resolve(registry, name) {
        return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
    }
    var isSuspense = (type) => type.__isSuspense;
    var suspenseId = 0;
    var SuspenseImpl = {
        name: "Suspense",
        // In order to make Suspense tree-shakable, we need to avoid importing it
        // directly in the renderer. The renderer checks for the __isSuspense flag
        // on a vnode's type and calls the `process` method, passing in renderer
        // internals.
        __isSuspense: true,
        process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
            if (n1 == null) {
                mountSuspense(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals);
            } else {
                if (parentSuspense && parentSuspense.deps > 0 && !n1.suspense.isInFallback) {
                    n2.suspense = n1.suspense;
                    n2.suspense.vnode = n2;
                    n2.el = n1.el;
                    return;
                }
                patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, rendererInternals);
            }
        },
        hydrate: hydrateSuspense,
        create: createSuspenseBoundary,
        normalize: normalizeSuspenseChildren
    };
    var Suspense = SuspenseImpl;
    function triggerEvent(vnode, name) {
        var eventListener = vnode.props && vnode.props[name];
        if (isFunction(eventListener)) {
            eventListener();
        }
    }
    function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals) {
        var {
            p: patch,
            o: {
                createElement: createElement2
            }
        } = rendererInternals;
        var hiddenContainer = createElement2("div", container);
        var suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals);
        patch(null, suspense.pendingBranch = vnode.ssContent, hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds);
        if (suspense.deps > 0) {
            triggerEvent(vnode, "onPending");
            triggerEvent(vnode, "onFallback");
            patch(
                null,
                vnode.ssFallback,
                container,
                anchor,
                parentComponent,
                null,
                // fallback tree will not have suspense context
                namespace,
                slotScopeIds
            );
            setActiveBranch(suspense, vnode.ssFallback);
        } else {
            suspense.resolve(false, true);
        }
    }
    function patchSuspense(n1, n2, container, anchor, parentComponent, namespace, slotScopeIds, optimized, _ref5) {
        var {
            p: patch,
            um: unmount,
            o: {
                createElement: createElement2
            }
        } = _ref5;
        var suspense = n2.suspense = n1.suspense;
        suspense.vnode = n2;
        n2.el = n1.el;
        var newBranch = n2.ssContent;
        var newFallback = n2.ssFallback;
        var {
            activeBranch,
            pendingBranch,
            isInFallback,
            isHydrating
        } = suspense;
        if (pendingBranch) {
            suspense.pendingBranch = newBranch;
            if (isSameVNodeType(newBranch, pendingBranch)) {
                patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                } else if (isInFallback) {
                    if (!isHydrating) {
                        patch(
                            activeBranch,
                            newFallback,
                            container,
                            anchor,
                            parentComponent,
                            null,
                            // fallback tree will not have suspense context
                            namespace,
                            slotScopeIds,
                            optimized
                        );
                        setActiveBranch(suspense, newFallback);
                    }
                }
            } else {
                suspense.pendingId = suspenseId++;
                if (isHydrating) {
                    suspense.isHydrating = false;
                    suspense.activeBranch = pendingBranch;
                } else {
                    unmount(pendingBranch, parentComponent, suspense);
                }
                suspense.deps = 0;
                suspense.effects.length = 0;
                suspense.hiddenContainer = createElement2("div", container);
                if (isInFallback) {
                    patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                    if (suspense.deps <= 0) {
                        suspense.resolve();
                    } else {
                        patch(
                            activeBranch,
                            newFallback,
                            container,
                            anchor,
                            parentComponent,
                            null,
                            // fallback tree will not have suspense context
                            namespace,
                            slotScopeIds,
                            optimized
                        );
                        setActiveBranch(suspense, newFallback);
                    }
                } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                    patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
                    suspense.resolve(true);
                } else {
                    patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                    if (suspense.deps <= 0) {
                        suspense.resolve();
                    }
                }
            }
        } else {
            if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, namespace, slotScopeIds, optimized);
                setActiveBranch(suspense, newBranch);
            } else {
                triggerEvent(n2, "onPending");
                suspense.pendingBranch = newBranch;
                if (newBranch.shapeFlag & 512) {
                    suspense.pendingId = newBranch.component.suspenseId;
                } else {
                    suspense.pendingId = suspenseId++;
                }
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, namespace, slotScopeIds, optimized);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                } else {
                    var {
                        timeout,
                        pendingId
                    } = suspense;
                    if (timeout > 0) {
                        setTimeout(() => {
                            if (suspense.pendingId === pendingId) {
                                suspense.fallback(newFallback);
                            }
                        }, timeout);
                    } else if (timeout === 0) {
                        suspense.fallback(newFallback);
                    }
                }
            }
        }
    }
    var hasWarned = false;
    function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, namespace, slotScopeIds, optimized, rendererInternals) {
        var isHydrating = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : false;
        if (!hasWarned) {
            hasWarned = true;
            console[console.info ? "info" : "log"]("<Suspense> is an experimental feature and its API will likely change.");
        }
        var {
            p: patch,
            m: move,
            um: unmount,
            n: next,
            o: {
                parentNode,
                remove: remove2
            }
        } = rendererInternals;
        var parentSuspenseId;
        var isSuspensible = isVNodeSuspensible(vnode);
        if (isSuspensible) {
            if (parentSuspense == null ? void 0 : parentSuspense.pendingBranch) {
                parentSuspenseId = parentSuspense.pendingId;
                parentSuspense.deps++;
            }
        }
        var timeout = vnode.props ? toNumber(vnode.props.timeout) : void 0;
        {
            assertNumber(timeout, "Suspense timeout");
        }
        var initialAnchor = anchor;
        var suspense = {
            vnode,
            parent: parentSuspense,
            parentComponent,
            namespace,
            container,
            hiddenContainer,
            deps: 0,
            pendingId: suspenseId++,
            timeout: typeof timeout === "number" ? timeout : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !isHydrating,
            isHydrating,
            isUnmounted: false,
            effects: [],
            resolve() {
                var resume = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                {
                    if (!resume && !suspense.pendingBranch) {
                        throw new Error("suspense.resolve() is called without a pending branch.");
                    }
                    if (suspense.isUnmounted) {
                        throw new Error("suspense.resolve() is called on an already unmounted suspense boundary.");
                    }
                }
                var {
                    vnode: vnode2,
                    activeBranch,
                    pendingBranch,
                    pendingId,
                    effects,
                    parentComponent: parentComponent2,
                    container: container2
                } = suspense;
                var delayEnter = false;
                if (suspense.isHydrating) {
                    suspense.isHydrating = false;
                } else if (!resume) {
                    delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
                    if (delayEnter) {
                        activeBranch.transition.afterLeave = () => {
                            if (pendingId === suspense.pendingId) {
                                move(pendingBranch, container2, anchor === initialAnchor ? next(activeBranch) : anchor, 0);
                                queuePostFlushCb(effects);
                            }
                        };
                    }
                    if (activeBranch) {
                        if (parentNode(activeBranch.el) !== suspense.hiddenContainer) {
                            anchor = next(activeBranch);
                        }
                        unmount(activeBranch, parentComponent2, suspense, true);
                    }
                    if (!delayEnter) {
                        move(pendingBranch, container2, anchor, 0);
                    }
                }
                setActiveBranch(suspense, pendingBranch);
                suspense.pendingBranch = null;
                suspense.isInFallback = false;
                var parent = suspense.parent;
                var hasUnresolvedAncestor = false;
                while (parent) {
                    if (parent.pendingBranch) {
                        parent.effects.push(...effects);
                        hasUnresolvedAncestor = true;
                        break;
                    }
                    parent = parent.parent;
                }
                if (!hasUnresolvedAncestor && !delayEnter) {
                    queuePostFlushCb(effects);
                }
                suspense.effects = [];
                if (isSuspensible) {
                    if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
                        parentSuspense.deps--;
                        if (parentSuspense.deps === 0 && !sync) {
                            parentSuspense.resolve();
                        }
                    }
                }
                triggerEvent(vnode2, "onResolve");
            },
            fallback(fallbackVNode) {
                if (!suspense.pendingBranch) {
                    return;
                }
                var {
                    vnode: vnode2,
                    activeBranch,
                    parentComponent: parentComponent2,
                    container: container2,
                    namespace: namespace2
                } = suspense;
                triggerEvent(vnode2, "onFallback");
                var anchor2 = next(activeBranch);
                var mountFallback = () => {
                    if (!suspense.isInFallback) {
                        return;
                    }
                    patch(
                        null,
                        fallbackVNode,
                        container2,
                        anchor2,
                        parentComponent2,
                        null,
                        // fallback tree will not have suspense context
                        namespace2,
                        slotScopeIds,
                        optimized
                    );
                    setActiveBranch(suspense, fallbackVNode);
                };
                var delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
                if (delayEnter) {
                    activeBranch.transition.afterLeave = mountFallback;
                }
                suspense.isInFallback = true;
                unmount(
                    activeBranch,
                    parentComponent2,
                    null,
                    // no suspense so unmount hooks fire now
                    true
                    // shouldRemove
                );
                if (!delayEnter) {
                    mountFallback();
                }
            },
            move(container2, anchor2, type) {
                suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
                suspense.container = container2;
            },
            next() {
                return suspense.activeBranch && next(suspense.activeBranch);
            },
            registerDep(instance, setupRenderEffect) {
                var isInPendingSuspense = !!suspense.pendingBranch;
                if (isInPendingSuspense) {
                    suspense.deps++;
                }
                var hydratedEl = instance.vnode.el;
                instance.asyncDep.catch((err2) => {
                    handleError(err2, instance, 0);
                }).then((asyncSetupResult) => {
                    if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
                        return;
                    }
                    instance.asyncResolved = true;
                    var {
                        vnode: vnode2
                    } = instance;
                    {
                        pushWarningContext(vnode2);
                    }
                    handleSetupResult(instance, asyncSetupResult, false);
                    if (hydratedEl) {
                        vnode2.el = hydratedEl;
                    }
                    var placeholder = !hydratedEl && instance.subTree.el;
                    setupRenderEffect(
                        instance,
                        vnode2,
                        // component may have been moved before resolve.
                        // if this is not a hydration, instance.subTree will be the comment
                        // placeholder.
                        parentNode(hydratedEl || instance.subTree.el),
                        // anchor will not be used if this is hydration, so only need to
                        // consider the comment placeholder case.
                        hydratedEl ? null : next(instance.subTree),
                        suspense,
                        namespace,
                        optimized
                    );
                    if (placeholder) {
                        remove2(placeholder);
                    }
                    updateHOCHostEl(instance, vnode2.el);
                    {
                        popWarningContext();
                    }
                    if (isInPendingSuspense && --suspense.deps === 0) {
                        suspense.resolve();
                    }
                });
            },
            unmount(parentSuspense2, doRemove) {
                suspense.isUnmounted = true;
                if (suspense.activeBranch) {
                    unmount(suspense.activeBranch, parentComponent, parentSuspense2, doRemove);
                }
                if (suspense.pendingBranch) {
                    unmount(suspense.pendingBranch, parentComponent, parentSuspense2, doRemove);
                }
            }
        };
        return suspense;
    }
    function hydrateSuspense(node, vnode, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, rendererInternals, hydrateNode) {
        var suspense = vnode.suspense = createSuspenseBoundary(
            vnode,
            parentSuspense,
            parentComponent,
            node.parentNode,
            // eslint-disable-next-line no-restricted-globals
            document.createElement("div"),
            null,
            namespace,
            slotScopeIds,
            optimized,
            rendererInternals,
            true
        );
        var result = hydrateNode(node, suspense.pendingBranch = vnode.ssContent, parentComponent, suspense, slotScopeIds, optimized);
        if (suspense.deps === 0) {
            suspense.resolve(false, true);
        }
        return result;
    }
    function normalizeSuspenseChildren(vnode) {
        var {
            shapeFlag,
            children
        } = vnode;
        var isSlotChildren = shapeFlag & 32;
        vnode.ssContent = normalizeSuspenseSlot(isSlotChildren ? children.default : children);
        vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
    }
    function normalizeSuspenseSlot(s) {
        var block;
        if (isFunction(s)) {
            var trackBlock = isBlockTreeEnabled && s._c;
            if (trackBlock) {
                s._d = false;
                openBlock();
            }
            s = s();
            if (trackBlock) {
                s._d = true;
                block = currentBlock;
                closeBlock();
            }
        }
        if (isArray(s)) {
            var singleChild = filterSingleRoot(s);
            if (!singleChild && s.filter((child) => child !== NULL_DYNAMIC_COMPONENT).length > 0) {
                warn$1("<Suspense> slots expect a single root node.");
            }
            s = singleChild;
        }
        s = normalizeVNode(s);
        if (block && !s.dynamicChildren) {
            s.dynamicChildren = block.filter((c2) => c2 !== s);
        }
        return s;
    }
    function queueEffectWithSuspense(fn, suspense) {
        if (suspense && suspense.pendingBranch) {
            if (isArray(fn)) {
                suspense.effects.push(...fn);
            } else {
                suspense.effects.push(fn);
            }
        } else {
            queuePostFlushCb(fn);
        }
    }
    function setActiveBranch(suspense, branch) {
        suspense.activeBranch = branch;
        var {
            vnode,
            parentComponent
        } = suspense;
        var el = branch.el;
        while (!el && branch.component) {
            branch = branch.component.subTree;
            el = branch.el;
        }
        vnode.el = el;
        if (parentComponent && parentComponent.subTree === vnode) {
            parentComponent.vnode.el = el;
            updateHOCHostEl(parentComponent, el);
        }
    }
    function isVNodeSuspensible(vnode) {
        var _a;
        return ((_a = vnode.props) == null ? void 0 : _a.suspensible) != null && vnode.props.suspensible !== false;
    }
    var ssrContextKey = Symbol.for("v-scx");
    var useSSRContext = () => {
        {
            var ctx = inject(ssrContextKey);
            if (!ctx) {
                warn$1("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.");
            }
            return ctx;
        }
    };
    function watchEffect(effect2, options) {
        return doWatch(effect2, null, options);
    }
    function watchPostEffect(effect2, options) {
        return doWatch(effect2, null, extend({}, options, {
            flush: "post"
        }));
    }
    function watchSyncEffect(effect2, options) {
        return doWatch(effect2, null, extend({}, options, {
            flush: "sync"
        }));
    }
    var INITIAL_WATCHER_VALUE = {};
    function watch(source, cb, options) {
        if (!isFunction(cb)) {
            warn$1("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
        }
        return doWatch(source, cb, options);
    }
    function doWatch(source, cb) {
        var {
            immediate,
            deep,
            flush,
            once: once2,
            onTrack,
            onTrigger
        } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJ;
        if (cb && once2) {
            var _cb = cb;
            cb = function() {
                _cb(...arguments);
                unwatch();
            };
        }
        if (deep !== void 0 && typeof deep === "number") {
            warn$1('watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.');
        }
        if (!cb) {
            if (immediate !== void 0) {
                warn$1('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.');
            }
            if (deep !== void 0) {
                warn$1('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.');
            }
            if (once2 !== void 0) {
                warn$1('watch() "once" option is only respected when using the watch(source, callback, options?) signature.');
            }
        }
        var warnInvalidSource = (s) => {
            warn$1("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
        };
        var instance = currentInstance;
        var reactiveGetter = (source2) => deep === true ? source2 : (
            // for deep: false, only traverse root-level properties
        traverse(source2, deep === false ? 1 : void 0)
        );
        var getter;
        var forceTrigger = false;
        var isMultiSource = false;
        if (isRef(source)) {
            getter = () => source.value;
            forceTrigger = isShallow(source);
        } else if (isReactive(source)) {
            getter = () => reactiveGetter(source);
            forceTrigger = true;
        } else if (isArray(source)) {
            isMultiSource = true;
            forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
            getter = () => source.map((s) => {
                if (isRef(s)) {
                    return s.value;
                } else if (isReactive(s)) {
                    return reactiveGetter(s);
                } else if (isFunction(s)) {
                    return callWithErrorHandling(s, instance, 2);
                } else {
                    warnInvalidSource(s);
                }
            });
        } else if (isFunction(source)) {
            if (cb) {
                getter = () => callWithErrorHandling(source, instance, 2);
            } else {
                getter = () => {
                    if (cleanup) {
                        cleanup();
                    }
                    return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
                };
            }
        } else {
            getter = NOOP;
            warnInvalidSource(source);
        }
        if (cb && deep) {
            var baseGetter = getter;
            getter = () => traverse(baseGetter());
        }
        var cleanup;
        var onCleanup = (fn) => {
            cleanup = effect2.onStop = () => {
                callWithErrorHandling(fn, instance, 4);
                cleanup = effect2.onStop = void 0;
            };
        };
        var ssrCleanup;
        if (isInSSRComponentSetup) {
            onCleanup = NOOP;
            if (!cb) {
                getter();
            } else if (immediate) {
                callWithAsyncErrorHandling(cb, instance, 3, [getter(), isMultiSource ? [] : void 0, onCleanup]);
            }
            if (flush === "sync") {
                var ctx = useSSRContext();
                ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
            } else {
                return NOOP;
            }
        }
        var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
        var job = () => {
            if (!effect2.active || !effect2.dirty) {
                return;
            }
            if (cb) {
                var newValue = effect2.run();
                if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
                    if (cleanup) {
                        cleanup();
                    }
                    callWithAsyncErrorHandling(cb, instance, 3, [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
                        onCleanup
                    ]);
                    oldValue = newValue;
                }
            } else {
                effect2.run();
            }
        };
        job.allowRecurse = !!cb;
        var scheduler;
        if (flush === "sync") {
            scheduler = job;
        } else if (flush === "post") {
            scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
        } else {
            job.pre = true;
            if (instance)
                job.id = instance.uid;
            scheduler = () => queueJob(job);
        }
        var effect2 = new ReactiveEffect(getter, NOOP, scheduler);
        var scope = getCurrentScope();
        var unwatch = () => {
            effect2.stop();
            if (scope) {
                remove(scope.effects, effect2);
            }
        };
        {
            effect2.onTrack = onTrack;
            effect2.onTrigger = onTrigger;
        }
        if (cb) {
            if (immediate) {
                job();
            } else {
                oldValue = effect2.run();
            }
        } else if (flush === "post") {
            queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
        } else {
            effect2.run();
        }
        if (ssrCleanup)
            ssrCleanup.push(unwatch);
        return unwatch;
    }
    function instanceWatch(source, value, options) {
        var publicThis = this.proxy;
        var getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
        var cb;
        if (isFunction(value)) {
            cb = value;
        } else {
            cb = value.handler;
            options = value;
        }
        var reset = setCurrentInstance(this);
        var res = doWatch(getter, cb.bind(publicThis), options);
        reset();
        return res;
    }
    function createPathGetter(ctx, path) {
        var segments = path.split(".");
        return () => {
            var cur = ctx;
            for (var i = 0; i < segments.length && cur; i++) {
                cur = cur[segments[i]];
            }
            return cur;
        };
    }
    function traverse(value, depth) {
        var currentDepth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
        var seen = arguments.length > 3 ? arguments[3] : void 0;
        if (!isObject(value) || value["__v_skip"]) {
            return value;
        }
        if (depth && depth > 0) {
            if (currentDepth >= depth) {
                return value;
            }
            currentDepth++;
        }
        seen = seen || /* @__PURE__ */ new Set();
        if (seen.has(value)) {
            return value;
        }
        seen.add(value);
        if (isRef(value)) {
            traverse(value.value, depth, currentDepth, seen);
        } else if (isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                traverse(value[i], depth, currentDepth, seen);
            }
        } else if (isSet(value) || isMap(value)) {
            value.forEach((v) => {
                traverse(v, depth, currentDepth, seen);
            });
        } else if (isPlainObject(value)) {
            for (var key in value) {
                traverse(value[key], depth, currentDepth, seen);
            }
        }
        return value;
    }
    function validateDirectiveName(name) {
        if (isBuiltInDirective(name)) {
            warn$1("Do not use built-in directive ids as custom directive id: " + name);
        }
    }
    function withDirectives(vnode, directives) {
        if (currentRenderingInstance === null) {
            warn$1("withDirectives can only be used inside render functions.");
            return vnode;
        }
        var instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
        var bindings = vnode.dirs || (vnode.dirs = []);
        for (var i = 0; i < directives.length; i++) {
            var [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
            if (dir) {
                if (isFunction(dir)) {
                    dir = {
                        mounted: dir,
                        updated: dir
                    };
                }
                if (dir.deep) {
                    traverse(value);
                }
                bindings.push({
                    dir,
                    instance,
                    value,
                    oldValue: void 0,
                    arg,
                    modifiers
                });
            }
        }
        return vnode;
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
        var bindings = vnode.dirs;
        var oldBindings = prevVNode && prevVNode.dirs;
        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            if (oldBindings) {
                binding.oldValue = oldBindings[i].value;
            }
            var hook = binding.dir[name];
            if (hook) {
                pauseTracking();
                callWithAsyncErrorHandling(hook, instance, 8, [vnode.el, binding, vnode, prevVNode]);
                resetTracking();
            }
        }
    }
    var leaveCbKey = Symbol("_leaveCb");
    var enterCbKey = Symbol("_enterCb");
    function useTransitionState() {
        var state = {
            isMounted: false,
            isLeaving: false,
            isUnmounting: false,
            leavingVNodes: /* @__PURE__ */ new Map()
        };
        onMounted(() => {
            state.isMounted = true;
        });
        onBeforeUnmount(() => {
            state.isUnmounting = true;
        });
        return state;
    }
    var TransitionHookValidator = [Function, Array];
    var BaseTransitionPropsValidators = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        // enter
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        // leave
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        // appear
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
    };
    var BaseTransitionImpl = {
        name: "BaseTransition",
        props: BaseTransitionPropsValidators,
        setup(props, _ref6) {
            var {
                slots
            } = _ref6;
            var instance = getCurrentInstance();
            var state = useTransitionState();
            return () => {
                var children = slots.default && getTransitionRawChildren(slots.default(), true);
                if (!children || !children.length) {
                    return;
                }
                var child = children[0];
                if (children.length > 1) {
                    var hasFound = false;
                    for (var c2 of children) {
                        if (c2.type !== Comment) {
                            if (hasFound) {
                                warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
                                break;
                            }
                            child = c2;
                            hasFound = true;
                        }
                    }
                }
                var rawProps = toRaw(props);
                var {
                    mode
                } = rawProps;
                if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
                    warn$1("invalid <transition> mode: ".concat(mode));
                }
                if (state.isLeaving) {
                    return emptyPlaceholder(child);
                }
                var innerChild = getKeepAliveChild(child);
                if (!innerChild) {
                    return emptyPlaceholder(child);
                }
                var enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
                setTransitionHooks(innerChild, enterHooks);
                var oldChild = instance.subTree;
                var oldInnerChild = oldChild && getKeepAliveChild(oldChild);
                if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(innerChild, oldInnerChild)) {
                    var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                    setTransitionHooks(oldInnerChild, leavingHooks);
                    if (mode === "out-in") {
                        state.isLeaving = true;
                        leavingHooks.afterLeave = () => {
                            state.isLeaving = false;
                            if (instance.update.active !== false) {
                                instance.effect.dirty = true;
                                instance.update();
                            }
                        };
                        return emptyPlaceholder(child);
                    } else if (mode === "in-out" && innerChild.type !== Comment) {
                        leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                            var leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                            el[leaveCbKey] = () => {
                                earlyRemove();
                                el[leaveCbKey] = void 0;
                                delete enterHooks.delayedLeave;
                            };
                            enterHooks.delayedLeave = delayedLeave;
                        };
                    }
                }
                return child;
            };
        }
    };
    var BaseTransition = BaseTransitionImpl;
    function getLeavingNodesForType(state, vnode) {
        var {
            leavingVNodes
        } = state;
        var leavingVNodesCache = leavingVNodes.get(vnode.type);
        if (!leavingVNodesCache) {
            leavingVNodesCache = /* @__PURE__ */ Object.create(null);
            leavingVNodes.set(vnode.type, leavingVNodesCache);
        }
        return leavingVNodesCache;
    }
    function resolveTransitionHooks(vnode, props, state, instance) {
        var {
            appear,
            mode,
            persisted = false,
            onBeforeEnter,
            onEnter,
            onAfterEnter,
            onEnterCancelled,
            onBeforeLeave,
            onLeave,
            onAfterLeave,
            onLeaveCancelled,
            onBeforeAppear,
            onAppear,
            onAfterAppear,
            onAppearCancelled
        } = props;
        var key = String(vnode.key);
        var leavingVNodesCache = getLeavingNodesForType(state, vnode);
        var callHook2 = (hook, args) => {
            hook && callWithAsyncErrorHandling(hook, instance, 9, args);
        };
        var callAsyncHook = (hook, args) => {
            var done = args[1];
            callHook2(hook, args);
            if (isArray(hook)) {
                if (hook.every((hook2) => hook2.length <= 1))
                    done();
            } else if (hook.length <= 1) {
                done();
            }
        };
        var hooks = {
            mode,
            persisted,
            beforeEnter(el) {
                var hook = onBeforeEnter;
                if (!state.isMounted) {
                    if (appear) {
                        hook = onBeforeAppear || onBeforeEnter;
                    } else {
                        return;
                    }
                }
                if (el[leaveCbKey]) {
                    el[leaveCbKey](
                        true
                        /* cancelled */
                    );
                }
                var leavingVNode = leavingVNodesCache[key];
                if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
                    leavingVNode.el[leaveCbKey]();
                }
                callHook2(hook, [el]);
            },
            enter(el) {
                var hook = onEnter;
                var afterHook = onAfterEnter;
                var cancelHook = onEnterCancelled;
                if (!state.isMounted) {
                    if (appear) {
                        hook = onAppear || onEnter;
                        afterHook = onAfterAppear || onAfterEnter;
                        cancelHook = onAppearCancelled || onEnterCancelled;
                    } else {
                        return;
                    }
                }
                var called = false;
                var done = el[enterCbKey] = (cancelled) => {
                    if (called)
                        return;
                    called = true;
                    if (cancelled) {
                        callHook2(cancelHook, [el]);
                    } else {
                        callHook2(afterHook, [el]);
                    }
                    if (hooks.delayedLeave) {
                        hooks.delayedLeave();
                    }
                    el[enterCbKey] = void 0;
                };
                if (hook) {
                    callAsyncHook(hook, [el, done]);
                } else {
                    done();
                }
            },
            leave(el, remove2) {
                var key2 = String(vnode.key);
                if (el[enterCbKey]) {
                    el[enterCbKey](
                        true
                        /* cancelled */
                    );
                }
                if (state.isUnmounting) {
                    return remove2();
                }
                callHook2(onBeforeLeave, [el]);
                var called = false;
                var done = el[leaveCbKey] = (cancelled) => {
                    if (called)
                        return;
                    called = true;
                    remove2();
                    if (cancelled) {
                        callHook2(onLeaveCancelled, [el]);
                    } else {
                        callHook2(onAfterLeave, [el]);
                    }
                    el[leaveCbKey] = void 0;
                    if (leavingVNodesCache[key2] === vnode) {
                        delete leavingVNodesCache[key2];
                    }
                };
                leavingVNodesCache[key2] = vnode;
                if (onLeave) {
                    callAsyncHook(onLeave, [el, done]);
                } else {
                    done();
                }
            },
            clone(vnode2) {
                return resolveTransitionHooks(vnode2, props, state, instance);
            }
        };
        return hooks;
    }
    function emptyPlaceholder(vnode) {
        if (isKeepAlive(vnode)) {
            vnode = cloneVNode(vnode);
            vnode.children = null;
            return vnode;
        }
    }
    function getKeepAliveChild(vnode) {
        return isKeepAlive(vnode) ? (
            // #7121 ensure get the child component subtree in case
            // it's been replaced during HMR
            vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : void 0
        ) : vnode;
    }
    function setTransitionHooks(vnode, hooks) {
        if (vnode.shapeFlag & 6 && vnode.component) {
            setTransitionHooks(vnode.component.subTree, hooks);
        } else if (vnode.shapeFlag & 128) {
            vnode.ssContent.transition = hooks.clone(vnode.ssContent);
            vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
        } else {
            vnode.transition = hooks;
        }
    }
    function getTransitionRawChildren(children) {
        var keepComment = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var parentKey = arguments.length > 2 ? arguments[2] : void 0;
        var ret = [];
        var keyedFragmentCount = 0;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
            if (child.type === Fragment) {
                if (child.patchFlag & 128)
                    keyedFragmentCount++;
                ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
            } else if (keepComment || child.type !== Comment) {
                ret.push(key != null ? cloneVNode(child, {
                    key
                }) : child);
            }
        }
        if (keyedFragmentCount > 1) {
            for (var _i = 0; _i < ret.length; _i++) {
                ret[_i].patchFlag = -2;
            }
        }
        return ret;
    }
    // @__NO_SIDE_EFFECTS__
    function defineComponent(options, extraOptions) {
        return isFunction(options) ? (
            // #8326: extend call and options.name access are considered side-effects
            // by Rollup, so we have to wrap it in a pure-annotated IIFE.
            /* @__PURE__ */ (() => extend({
            name: options.name
        }, extraOptions, {
            setup: options
        }))()
        ) : options;
    }
    var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    // @__NO_SIDE_EFFECTS__
    function defineAsyncComponent(source) {
        if (isFunction(source)) {
            source = {
                loader: source
            };
        }
        var {
            loader,
            loadingComponent,
            errorComponent,
            delay = 200,
            timeout,
        // undefined = never times out
            suspensible = true,
            onError: userOnError
        } = source;
        var pendingRequest = null;
        var resolvedComp;
        var retries = 0;
        var retry = () => {
            retries++;
            pendingRequest = null;
            return load();
        };
        var load = () => {
            var thisRequest;
            return pendingRequest || (thisRequest = pendingRequest = loader().catch((err2) => {
                err2 = err2 instanceof Error ? err2 : new Error(String(err2));
                if (userOnError) {
                    return new Promise((resolve2, reject) => {
                        var userRetry = () => resolve2(retry());
                        var userFail = () => reject(err2);
                        userOnError(err2, userRetry, userFail, retries + 1);
                    });
                } else {
                    throw err2;
                }
            }).then((comp) => {
                if (thisRequest !== pendingRequest && pendingRequest) {
                    return pendingRequest;
                }
                if (!comp) {
                    warn$1("Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.");
                }
                if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
                    comp = comp.default;
                }
                if (comp && !isObject(comp) && !isFunction(comp)) {
                    throw new Error("Invalid async component load result: ".concat(comp));
                }
                resolvedComp = comp;
                return comp;
            }));
        };
        return /* @__PURE__ */ defineComponent({
            name: "AsyncComponentWrapper",
            __asyncLoader: load,
            get __asyncResolved() {
                return resolvedComp;
            },
            setup() {
                var instance = currentInstance;
                if (resolvedComp) {
                    return () => createInnerComp(resolvedComp, instance);
                }
                var onError2 = (err2) => {
                    pendingRequest = null;
                    handleError(err2, instance, 13, !errorComponent);
                };
                if (suspensible && instance.suspense || isInSSRComponentSetup) {
                    return load().then((comp) => {
                        return () => createInnerComp(comp, instance);
                    }).catch((err2) => {
                        onError2(err2);
                        return () => errorComponent ? createVNode(errorComponent, {
                            error: err2
                        }) : null;
                    });
                }
                var loaded = ref(false);
                var error = ref();
                var delayed = ref(!!delay);
                if (delay) {
                    setTimeout(() => {
                        delayed.value = false;
                    }, delay);
                }
                if (timeout != null) {
                    setTimeout(() => {
                        if (!loaded.value && !error.value) {
                            var err2 = new Error("Async component timed out after ".concat(timeout, "ms."));
                            onError2(err2);
                            error.value = err2;
                        }
                    }, timeout);
                }
                load().then(() => {
                    loaded.value = true;
                    if (instance.parent && isKeepAlive(instance.parent.vnode)) {
                        instance.parent.effect.dirty = true;
                        queueJob(instance.parent.update);
                    }
                }).catch((err2) => {
                    onError2(err2);
                    error.value = err2;
                });
                return () => {
                    if (loaded.value && resolvedComp) {
                        return createInnerComp(resolvedComp, instance);
                    } else if (error.value && errorComponent) {
                        return createVNode(errorComponent, {
                            error: error.value
                        });
                    } else if (loadingComponent && !delayed.value) {
                        return createVNode(loadingComponent);
                    }
                };
            }
        });
    }
    function createInnerComp(comp, parent) {
        var {
            ref: ref2,
            props,
            children,
            ce
        } = parent.vnode;
        var vnode = createVNode(comp, props, children);
        vnode.ref = ref2;
        vnode.ce = ce;
        delete parent.vnode.ce;
        return vnode;
    }
    var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    var KeepAliveImpl = {
        name: "KeepAlive",
        // Marker for special handling inside the renderer. We are not using a ===
        // check directly on KeepAlive in the renderer, because importing it directly
        // would prevent it from being tree-shaken.
        __isKeepAlive: true,
        props: {
            include: [String, RegExp, Array],
            exclude: [String, RegExp, Array],
            max: [String, Number]
        },
        setup(props, _ref7) {
            var {
                slots
            } = _ref7;
            var instance = getCurrentInstance();
            var sharedContext = instance.ctx;
            if (!sharedContext.renderer) {
                return () => {
                    var children = slots.default && slots.default();
                    return children && children.length === 1 ? children[0] : children;
                };
            }
            var cache2 = /* @__PURE__ */ new Map();
            var keys = /* @__PURE__ */ new Set();
            var current = null;
            {
                instance.__v_cache = cache2;
            }
            var parentSuspense = instance.suspense;
            var {
                renderer: {
                    p: patch,
                    m: move,
                    um: _unmount,
                    o: {
                        createElement: createElement2
                    }
                }
            } = sharedContext;
            var storageContainer = createElement2("div", null);
            sharedContext.activate = (vnode, container, anchor, namespace, optimized) => {
                var instance2 = vnode.component;
                move(vnode, container, anchor, 0, parentSuspense);
                patch(instance2.vnode, vnode, container, anchor, instance2, parentSuspense, namespace, vnode.slotScopeIds, optimized);
                queuePostRenderEffect(() => {
                    instance2.isDeactivated = false;
                    if (instance2.a) {
                        invokeArrayFns(instance2.a);
                    }
                    var vnodeHook = vnode.props && vnode.props.onVnodeMounted;
                    if (vnodeHook) {
                        invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                    }
                }, parentSuspense);
                {
                    devtoolsComponentAdded(instance2);
                }
            };
            sharedContext.deactivate = (vnode) => {
                var instance2 = vnode.component;
                move(vnode, storageContainer, null, 1, parentSuspense);
                queuePostRenderEffect(() => {
                    if (instance2.da) {
                        invokeArrayFns(instance2.da);
                    }
                    var vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
                    if (vnodeHook) {
                        invokeVNodeHook(vnodeHook, instance2.parent, vnode);
                    }
                    instance2.isDeactivated = true;
                }, parentSuspense);
                {
                    devtoolsComponentAdded(instance2);
                }
            };
            function unmount(vnode) {
                resetShapeFlag(vnode);
                _unmount(vnode, instance, parentSuspense, true);
            }
            function pruneCache(filter) {
                cache2.forEach((vnode, key) => {
                    var name = getComponentName(vnode.type);
                    if (name && (!filter || !filter(name))) {
                        pruneCacheEntry(key);
                    }
                });
            }
            function pruneCacheEntry(key) {
                var cached = cache2.get(key);
                if (!current || !isSameVNodeType(cached, current)) {
                    unmount(cached);
                } else if (current) {
                    resetShapeFlag(current);
                }
                cache2.delete(key);
                keys.delete(key);
            }
            watch(
                () => [props.include, props.exclude],
                (_ref8) => {
                    var [include2, exclude] = _ref8;
                    include2 && pruneCache((name) => matches(include2, name));
                    exclude && pruneCache((name) => !matches(exclude, name));
                },
                // prune post-render after `current` has been updated
                {
                    flush: "post",
                    deep: true
                }
            );
            var pendingCacheKey = null;
            var cacheSubtree = () => {
                if (pendingCacheKey != null) {
                    cache2.set(pendingCacheKey, getInnerChild(instance.subTree));
                }
            };
            onMounted(cacheSubtree);
            onUpdated(cacheSubtree);
            onBeforeUnmount(() => {
                cache2.forEach((cached) => {
                    var {
                        subTree,
                        suspense
                    } = instance;
                    var vnode = getInnerChild(subTree);
                    if (cached.type === vnode.type && cached.key === vnode.key) {
                        resetShapeFlag(vnode);
                        var da = vnode.component.da;
                        da && queuePostRenderEffect(da, suspense);
                        return;
                    }
                    unmount(cached);
                });
            });
            return () => {
                pendingCacheKey = null;
                if (!slots.default) {
                    return null;
                }
                var children = slots.default();
                var rawVNode = children[0];
                if (children.length > 1) {
                    {
                        warn$1("KeepAlive should contain exactly one component child.");
                    }
                    current = null;
                    return children;
                } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
                    current = null;
                    return rawVNode;
                }
                var vnode = getInnerChild(rawVNode);
                var comp = vnode.type;
                var name = getComponentName(isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp);
                var {
                    include: include2,
                    exclude,
                    max
                } = props;
                if (include2 && (!name || !matches(include2, name)) || exclude && name && matches(exclude, name)) {
                    current = vnode;
                    return rawVNode;
                }
                var key = vnode.key == null ? comp : vnode.key;
                var cachedVNode = cache2.get(key);
                if (vnode.el) {
                    vnode = cloneVNode(vnode);
                    if (rawVNode.shapeFlag & 128) {
                        rawVNode.ssContent = vnode;
                    }
                }
                pendingCacheKey = key;
                if (cachedVNode) {
                    vnode.el = cachedVNode.el;
                    vnode.component = cachedVNode.component;
                    if (vnode.transition) {
                        setTransitionHooks(vnode, vnode.transition);
                    }
                    vnode.shapeFlag |= 512;
                    keys.delete(key);
                    keys.add(key);
                } else {
                    keys.add(key);
                    if (max && keys.size > parseInt(max, 10)) {
                        pruneCacheEntry(keys.values().next().value);
                    }
                }
                vnode.shapeFlag |= 256;
                current = vnode;
                return isSuspense(rawVNode.type) ? rawVNode : vnode;
            };
        }
    };
    var KeepAlive = KeepAliveImpl;
    function matches(pattern, name) {
        if (isArray(pattern)) {
            return pattern.some((p) => matches(p, name));
        } else if (isString(pattern)) {
            return pattern.split(",").includes(name);
        } else if (isRegExp(pattern)) {
            return pattern.test(name);
        }
        return false;
    }
    function onActivated(hook, target) {
        registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
        registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type) {
        var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : currentInstance;
        var wrappedHook = hook.__wdc || (hook.__wdc = () => {
            var current2 = target;
            while (current2) {
                if (current2.isDeactivated) {
                    return;
                }
                current2 = current2.parent;
            }
            return hook();
        });
        injectHook(type, wrappedHook, target);
        if (target) {
            var current = target.parent;
            while (current && current.parent) {
                if (isKeepAlive(current.parent.vnode)) {
                    injectToKeepAliveRoot(wrappedHook, type, target, current);
                }
                current = current.parent;
            }
        }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
        var injected = injectHook(
            type,
            hook,
            keepAliveRoot,
            true
            /* prepend */
        );
        onUnmounted(() => {
            remove(keepAliveRoot[type], injected);
        }, target);
    }
    function resetShapeFlag(vnode) {
        vnode.shapeFlag &= ~256;
        vnode.shapeFlag &= ~512;
    }
    function getInnerChild(vnode) {
        return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
    }
    function injectHook(type, hook) {
        var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : currentInstance;
        var prepend = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        if (target) {
            if (isRootHook(type) && target !== target.root) {
                target = target.root;
                if (isRootImmediateHook(type)) {
                    var proxy = target.proxy;
                    callWithAsyncErrorHandling(hook.bind(proxy), target, type, ON_LOAD === type ? [proxy.$page.options] : []);
                }
            }
            var {
                __page_container__
            } = target.root.vnode;
            if (__page_container__) {
                __page_container__.onInjectHook(type);
            }
            var hooks = target[type] || (target[type] = []);
            var wrappedHook = hook.__weh || (hook.__weh = function() {
                if (target.isUnmounted) {
                    return;
                }
                pauseTracking();
                var reset = setCurrentInstance(target);
                for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    args[_key4] = arguments[_key4];
                }
                var res = callWithAsyncErrorHandling(hook, target, type, args);
                reset();
                resetTracking();
                return res;
            });
            if (prepend) {
                hooks.unshift(wrappedHook);
            } else {
                hooks.push(wrappedHook);
            }
            return wrappedHook;
        } else {
            var apiName = toHandlerKey((ErrorTypeStrings$1[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
            warn$1("".concat(apiName, " is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().") + " If you are using async setup(), make sure to register lifecycle hooks before the first await statement.");
        }
    }
    var createHook = (lifecycle) => function(hook) {
        var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance;
        return (
            // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
            (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, function() {
                return hook(...arguments);
            }, target)
        );
    };
    var onBeforeMount = createHook("bm");
    var onMounted = createHook("m");
    var onBeforeUpdate = createHook("bu");
    var onUpdated = createHook("u");
    var onBeforeUnmount = createHook("bum");
    var onUnmounted = createHook("um");
    var onServerPrefetch = createHook("sp");
    var onRenderTriggered = createHook("rtg");
    var onRenderTracked = createHook("rtc");
    function onErrorCaptured(hook) {
        var target = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : currentInstance;
        injectHook("ec", hook, target);
    }
    function renderList(source, renderItem, cache2, index2) {
        var ret;
        var cached = cache2 && cache2[index2];
        if (isArray(source) || isString(source)) {
            ret = new Array(source.length);
            for (var i = 0, l = source.length; i < l; i++) {
                ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
            }
        } else if (typeof source === "number") {
            if (!Number.isInteger(source)) {
                warn$1("The v-for range expect an integer value but got ".concat(source, "."));
            }
            ret = new Array(source);
            for (var _i2 = 0; _i2 < source; _i2++) {
                ret[_i2] = renderItem(_i2 + 1, _i2, void 0, cached && cached[_i2]);
            }
        } else if (isObject(source)) {
            if (source[Symbol.iterator]) {
                ret = Array.from(source, (item, i2) => renderItem(item, i2, void 0, cached && cached[i2]));
            } else {
                var keys = Object.keys(source);
                ret = new Array(keys.length);
                for (var _i3 = 0, _l = keys.length; _i3 < _l; _i3++) {
                    var key = keys[_i3];
                    ret[_i3] = renderItem(source[key], key, _i3, cached && cached[_i3]);
                }
            }
        } else {
            ret = [];
        }
        if (cache2) {
            cache2[index2] = ret;
        }
        return ret;
    }
    function createSlots(slots, dynamicSlots) {
        var _loop = function(i2) {
            var slot = dynamicSlots[i2];
            if (isArray(slot)) {
                for (var j = 0; j < slot.length; j++) {
                    slots[slot[j].name] = slot[j].fn;
                }
            } else if (slot) {
                slots[slot.name] = slot.key ? function() {
                    var res = slot.fn(...arguments);
                    if (res)
                        res.key = slot.key;
                    return res;
                } : slot.fn;
            }
        };
        for (var i = 0; i < dynamicSlots.length; i++) {
            _loop(i);
        }
        return slots;
    }
    function renderSlot(slots, name) {
        var props = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var fallback = arguments.length > 3 ? arguments[3] : void 0;
        var noSlotted = arguments.length > 4 ? arguments[4] : void 0;
        if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
            if (name !== "default")
                props.name = name;
            return createVNode("slot", props, fallback && fallback());
        }
        var slot = slots[name];
        if (slot && slot.length > 1) {
            warn$1("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.");
            slot = () => [];
        }
        if (slot && slot._c) {
            slot._d = false;
        }
        openBlock();
        var validSlotContent = slot && ensureValidVNode(slot(props));
        var rendered = createBlock(Fragment, {
            key: props.key || // slot content array of a dynamic conditional slot may have a branch
                // key attached in the `createSlots` helper, respect that
                validSlotContent && validSlotContent.key || "_".concat(name)
        }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
        if (!noSlotted && rendered.scopeId) {
            rendered.slotScopeIds = [rendered.scopeId + "-s"];
        }
        if (slot && slot._c) {
            slot._d = true;
        }
        return rendered;
    }
    function ensureValidVNode(vnodes) {
        return vnodes.some((child) => {
            if (!isVNode(child))
                return true;
            if (child.type === Comment)
                return false;
            if (child.type === Fragment && !ensureValidVNode(child.children))
                return false;
            return true;
        }) ? vnodes : null;
    }
    function toHandlers(obj, preserveCaseIfNecessary) {
        var ret = {};
        if (!isObject(obj)) {
            warn$1("v-on with no argument expects an object value.");
            return ret;
        }
        for (var key in obj) {
            ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? "on:".concat(key) : toHandlerKey(key)] = obj[key];
        }
        return ret;
    }
    var getPublicInstance = (i) => {
        if (!i)
            return null;
        if (isStatefulComponent(i))
            return getExposeProxy(i) || i.proxy;
        return getPublicInstance(i.parent);
    };
    var publicPropertiesMap = (
        // Move PURE marker to new line to workaround compiler discarding it
        // due to type annotation
        /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
        $: (i) => i,
        $el: (i) => i.vnode.el,
        $data: (i) => i.data,
        $props: (i) => shallowReadonly(i.props),
        $attrs: (i) => shallowReadonly(i.attrs),
        $slots: (i) => shallowReadonly(i.slots),
        $refs: (i) => shallowReadonly(i.refs),
        $parent: (i) => getPublicInstance(i.parent),
        $root: (i) => getPublicInstance(i.root),
        $emit: (i) => i.emit,
        $options: (i) => resolveMergedOptions(i),
        $forceUpdate: (i) => i.f || (i.f = () => {
            i.effect.dirty = true;
            queueJob(i.update);
        }),
        $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: (i) => instanceWatch.bind(i)
    })
    );
    var isReservedPrefix = (key) => key === "_" || key === "$";
    var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
    var PublicInstanceProxyHandlers = {
        get(_ref9, key) {
            var {
                _: instance
            } = _ref9;
            var {
                ctx,
                setupState,
                data,
                props,
                accessCache,
                type,
                appContext
            } = instance;
            if (key === "__isVue") {
                return true;
            }
            var normalizedProps;
            if (key[0] !== "$") {
                var n = accessCache[key];
                if (n !== void 0) {
                    switch (n) {
                        case 1:
                            return setupState[key];
                        case 2:
                            return data[key];
                        case 4:
                            return ctx[key];
                        case 3:
                            return props[key];
                    }
                } else if (hasSetupBinding(setupState, key)) {
                    accessCache[key] = 1;
                    return setupState[key];
                } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                    accessCache[key] = 2;
                    return data[key];
                } else if (
                // only cache other properties when instance has declared (thus stable)
                // props
                    (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
                ) {
                    accessCache[key] = 3;
                    return props[key];
                } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                    accessCache[key] = 4;
                    return ctx[key];
                } else if (shouldCacheAccess) {
                    accessCache[key] = 0;
                }
            }
            var publicGetter = publicPropertiesMap[key];
            var cssModule, globalProperties;
            if (publicGetter) {
                if (key === "$attrs") {
                    track(instance, "get", key);
                    markAttrsAccessed();
                } else if (key === "$slots") {
                    track(instance, "get", key);
                }
                return publicGetter(instance);
            } else if (
            // css module (injected by vue-loader)
                (cssModule = type.__cssModules) && (cssModule = cssModule[key])
            ) {
                return cssModule;
            } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
                accessCache[key] = 4;
                return ctx[key];
            } else if (
            // global properties
                globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
            ) {
                {
                    return globalProperties[key];
                }
            } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
                // to infinite warning loop
                key.indexOf("__v") !== 0)) {
                if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
                    warn$1("Property ".concat(JSON.stringify(key), ' must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.'));
                } else if (instance === currentRenderingInstance) {
                    warn$1("Property ".concat(JSON.stringify(key), " was accessed during render but is not defined on instance."));
                }
            }
        },
        set(_ref10, key, value) {
            var {
                _: instance
            } = _ref10;
            var {
                data,
                setupState,
                ctx
            } = instance;
            if (hasSetupBinding(setupState, key)) {
                setupState[key] = value;
                return true;
            } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
                warn$1('Cannot mutate <script setup> binding "'.concat(key, '" from Options API.'));
                return false;
            } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
                data[key] = value;
                return true;
            } else if (hasOwn(instance.props, key)) {
                warn$1('Attempting to mutate prop "'.concat(key, '". Props are readonly.'));
                return false;
            }
            if (key[0] === "$" && key.slice(1) in instance) {
                warn$1('Attempting to mutate public property "'.concat(key, '". Properties starting with $ are reserved and readonly.'));
                return false;
            } else {
                if (key in instance.appContext.config.globalProperties) {
                    Object.defineProperty(ctx, key, {
                        enumerable: true,
                        configurable: true,
                        value
                    });
                } else {
                    ctx[key] = value;
                }
            }
            return true;
        },
        has(_ref11, key) {
            var {
                _: {
                    data,
                    setupState,
                    accessCache,
                    ctx,
                    appContext,
                    propsOptions
                }
            } = _ref11;
            var normalizedProps;
            return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
        },
        defineProperty(target, key, descriptor) {
            if (descriptor.get != null) {
                target._.accessCache[key] = 0;
            } else if (hasOwn(descriptor, "value")) {
                this.set(target, key, descriptor.value, null);
            }
            return Reflect.defineProperty(target, key, descriptor);
        }
    };
    {
        PublicInstanceProxyHandlers.ownKeys = (target) => {
            warn$1("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.");
            return Reflect.ownKeys(target);
        };
    }
    var RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ extend({}, PublicInstanceProxyHandlers, {
        get(target, key) {
            if (key === Symbol.unscopables) {
                return;
            }
            return PublicInstanceProxyHandlers.get(target, key, target);
        },
        has(_, key) {
            var has2 = key[0] !== "_" && !isGloballyAllowed(key);
            if (!has2 && PublicInstanceProxyHandlers.has(_, key)) {
                warn$1("Property ".concat(JSON.stringify(key), " should not start with _ which is a reserved prefix for Vue internals."));
            }
            return has2;
        }
    });
    function createDevRenderContext(instance) {
        var target = {};
        Object.defineProperty(target, "_", {
            configurable: true,
            enumerable: false,
            get: () => instance
        });
        Object.keys(publicPropertiesMap).forEach((key) => {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: false,
                get: () => publicPropertiesMap[key](instance),
                // intercepted by the proxy so no need for implementation,
                // but needed to prevent set errors
                set: NOOP
            });
        });
        return target;
    }
    function exposePropsOnRenderContext(instance) {
        var {
            ctx,
            propsOptions: [propsOptions]
        } = instance;
        if (propsOptions) {
            Object.keys(propsOptions).forEach((key) => {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => instance.props[key],
                    set: NOOP
                });
            });
        }
    }
    function exposeSetupStateOnRenderContext(instance) {
        var {
            ctx,
            setupState
        } = instance;
        Object.keys(toRaw(setupState)).forEach((key) => {
            if (!setupState.__isScriptSetup) {
                if (isReservedPrefix(key[0])) {
                    warn$1("setup() return property ".concat(JSON.stringify(key), ' should not start with "$" or "_" which are reserved prefixes for Vue internals.'));
                    return;
                }
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => setupState[key],
                    set: NOOP
                });
            }
        });
    }
    var warnRuntimeUsage = (method) => warn$1("".concat(method, "() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect."));
    function defineProps() {
        {
            warnRuntimeUsage("defineProps");
        }
        return null;
    }
    function defineEmits() {
        {
            warnRuntimeUsage("defineEmits");
        }
        return null;
    }
    function defineExpose(exposed) {
        {
            warnRuntimeUsage("defineExpose");
        }
    }
    function defineOptions(options) {
        {
            warnRuntimeUsage("defineOptions");
        }
    }
    function defineSlots() {
        {
            warnRuntimeUsage("defineSlots");
        }
        return null;
    }
    function defineModel() {
        {
            warnRuntimeUsage("defineModel");
        }
    }
    function withDefaults(props, defaults) {
        {
            warnRuntimeUsage("withDefaults");
        }
        return null;
    }
    function useSlots() {
        return getContext().slots;
    }
    function useAttrs() {
        return getContext().attrs;
    }
    function getContext() {
        var i = getCurrentInstance();
        if (!i) {
            warn$1("useContext() called without active instance.");
        }
        return i.setupContext || (i.setupContext = createSetupContext(i));
    }
    function normalizePropsOrEmits(props) {
        return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
    }
    function mergeDefaults(raw, defaults) {
        var props = normalizePropsOrEmits(raw);
        for (var key in defaults) {
            if (key.startsWith("__skip"))
                continue;
            var opt = props[key];
            if (opt) {
                if (isArray(opt) || isFunction(opt)) {
                    opt = props[key] = {
                        type: opt,
                        default: defaults[key]
                    };
                } else {
                    opt.default = defaults[key];
                }
            } else if (opt === null) {
                opt = props[key] = {
                    default: defaults[key]
                };
            } else {
                warn$1('props default key "'.concat(key, '" has no corresponding declaration.'));
            }
            if (opt && defaults["__skip_".concat(key)]) {
                opt.skipFactory = true;
            }
        }
        return props;
    }
    function mergeModels(a, b) {
        if (!a || !b)
            return a || b;
        if (isArray(a) && isArray(b))
            return a.concat(b);
        return extend({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
    }
    function createPropsRestProxy(props, excludedKeys) {
        var ret = {};
        var _loop2 = function(key2) {
            if (!excludedKeys.includes(key2)) {
                Object.defineProperty(ret, key2, {
                    enumerable: true,
                    get: () => props[key2]
                });
            }
        };
        for (var key in props) {
            _loop2(key);
        }
        return ret;
    }
    function withAsyncContext(getAwaitable) {
        var ctx = getCurrentInstance();
        if (!ctx) {
            warn$1("withAsyncContext called without active current instance. This is likely a bug.");
        }
        var awaitable = getAwaitable();
        unsetCurrentInstance();
        if (isPromise(awaitable)) {
            awaitable = awaitable.catch((e) => {
                setCurrentInstance(ctx);
                throw e;
            });
        }
        return [awaitable, () => setCurrentInstance(ctx)];
    }
    function createDuplicateChecker() {
        var cache2 = /* @__PURE__ */ Object.create(null);
        return (type, key) => {
            if (cache2[key]) {
                warn$1("".concat(type, ' property "').concat(key, '" is already defined in ').concat(cache2[key], "."));
            } else {
                cache2[key] = type;
            }
        };
    }
    var shouldCacheAccess = true;
    function applyOptions(instance) {
        var options = resolveMergedOptions(instance);
        var publicThis = instance.proxy;
        var ctx = instance.ctx;
        shouldCacheAccess = false;
        if (options.beforeCreate) {
            callHook$1(options.beforeCreate, instance, "bc");
        }
        var {
        // state
            data: dataOptions,
            computed: computedOptions,
            methods,
            watch: watchOptions,
            provide: provideOptions,
            inject: injectOptions,
        // lifecycle
            created,
            beforeMount,
            mounted,
            beforeUpdate,
            updated,
            activated,
            deactivated,
            beforeDestroy,
            beforeUnmount,
            destroyed,
            unmounted,
            render: render2,
            renderTracked,
            renderTriggered,
            errorCaptured,
            serverPrefetch,
        // public API
            expose,
            inheritAttrs,
        // assets
            components,
            directives,
            filters
        } = options;
        var checkDuplicateProperties = createDuplicateChecker();
        {
            var [propsOptions] = instance.propsOptions;
            if (propsOptions) {
                for (var key in propsOptions) {
                    checkDuplicateProperties("Props", key);
                }
            }
        }
        if (injectOptions) {
            resolveInjections(injectOptions, ctx, checkDuplicateProperties);
        }
        if (methods) {
            for (var _key5 in methods) {
                var methodHandler = methods[_key5];
                if (isFunction(methodHandler)) {
                    {
                        Object.defineProperty(ctx, _key5, {
                            value: methodHandler.bind(publicThis),
                            configurable: true,
                            enumerable: true,
                            writable: true
                        });
                    }
                    {
                        checkDuplicateProperties("Methods", _key5);
                    }
                } else {
                    warn$1('Method "'.concat(_key5, '" has type "').concat(typeof methodHandler, '" in the component definition. Did you reference the function correctly?'));
                }
            }
        }
        if (dataOptions) {
            (function() {
                if (!isFunction(dataOptions)) {
                    warn$1("The data option must be a function. Plain object usage is no longer supported.");
                }
                var data = dataOptions.call(publicThis, publicThis);
                if (isPromise(data)) {
                    warn$1("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.");
                }
                if (!isObject(data)) {
                    warn$1("data() should return an object.");
                } else {
                    instance.data = reactive(data);
                    {
                        var _loop3 = function(_key62) {
                            checkDuplicateProperties("Data", _key62);
                            if (!isReservedPrefix(_key62[0])) {
                                Object.defineProperty(ctx, _key62, {
                                    configurable: true,
                                    enumerable: true,
                                    get: () => data[_key62],
                                    set: NOOP
                                });
                            }
                        };
                        for (var _key6 in data) {
                            _loop3(_key6);
                        }
                    }
                }
            })();
        }
        shouldCacheAccess = true;
        if (computedOptions) {
            var _loop4 = function(_key72) {
                var opt = computedOptions[_key72];
                var get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
                if (get2 === NOOP) {
                    warn$1('Computed property "'.concat(_key72, '" has no getter.'));
                }
                var set3 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
                    warn$1('Write operation failed: computed property "'.concat(_key72, '" is readonly.'));
                };
                var c2 = computed2({
                    get: get2,
                    set: set3
                });
                Object.defineProperty(ctx, _key72, {
                    enumerable: true,
                    configurable: true,
                    get: () => c2.value,
                    set: (v) => c2.value = v
                });
                {
                    checkDuplicateProperties("Computed", _key72);
                }
            };
            for (var _key7 in computedOptions) {
                _loop4(_key7);
            }
        }
        if (watchOptions) {
            for (var _key8 in watchOptions) {
                createWatcher(watchOptions[_key8], ctx, publicThis, _key8);
            }
        }
        if (provideOptions) {
            var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
            Reflect.ownKeys(provides).forEach((key2) => {
                provide(key2, provides[key2]);
            });
        }
        if (created) {
            callHook$1(created, instance, "c");
        }
        function registerLifecycleHook(register, hook) {
            if (isArray(hook)) {
                hook.forEach((_hook) => register(_hook.bind(publicThis)));
            } else if (hook) {
                register(hook.bind(publicThis));
            }
        }
        registerLifecycleHook(onBeforeMount, beforeMount);
        registerLifecycleHook(onMounted, mounted);
        registerLifecycleHook(onBeforeUpdate, beforeUpdate);
        registerLifecycleHook(onUpdated, updated);
        registerLifecycleHook(onActivated, activated);
        registerLifecycleHook(onDeactivated, deactivated);
        registerLifecycleHook(onErrorCaptured, errorCaptured);
        registerLifecycleHook(onRenderTracked, renderTracked);
        registerLifecycleHook(onRenderTriggered, renderTriggered);
        registerLifecycleHook(onBeforeUnmount, beforeUnmount);
        registerLifecycleHook(onUnmounted, unmounted);
        registerLifecycleHook(onServerPrefetch, serverPrefetch);
        if (isArray(expose)) {
            if (expose.length) {
                var exposed = instance.exposed || (instance.exposed = {});
                expose.forEach((key2) => {
                    Object.defineProperty(exposed, key2, {
                        get: () => publicThis[key2],
                        set: (val) => publicThis[key2] = val
                    });
                });
            } else if (!instance.exposed) {
                instance.exposed = {};
            }
        }
        if (render2 && instance.render === NOOP) {
            instance.render = render2;
        }
        if (inheritAttrs != null) {
            instance.inheritAttrs = inheritAttrs;
        }
        if (components)
            instance.components = components;
        if (directives)
            instance.directives = directives;
        var customApplyOptions = instance.appContext.config.globalProperties.$applyOptions;
        if (customApplyOptions) {
            customApplyOptions(options, instance, publicThis);
        }
    }
    function resolveInjections(injectOptions, ctx) {
        var checkDuplicateProperties = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NOOP;
        if (isArray(injectOptions)) {
            injectOptions = normalizeInject(injectOptions);
        }
        var _loop5 = function(key2) {
            var opt = injectOptions[key2];
            var injected = void 0;
            if (isObject(opt)) {
                if ("default" in opt) {
                    injected = inject(opt.from || key2, opt.default, true);
                } else {
                    injected = inject(opt.from || key2);
                }
            } else {
                injected = inject(opt);
            }
            if (isRef(injected)) {
                Object.defineProperty(ctx, key2, {
                    enumerable: true,
                    configurable: true,
                    get: () => injected.value,
                    set: (v) => injected.value = v
                });
            } else {
                ctx[key2] = injected;
            }
            {
                checkDuplicateProperties("Inject", key2);
            }
        };
        for (var key in injectOptions) {
            _loop5(key);
        }
    }
    function callHook$1(hook, instance, type) {
        callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
    }
    function createWatcher(raw, ctx, publicThis, key) {
        var getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
        if (isString(raw)) {
            var handler = ctx[raw];
            if (isFunction(handler)) {
                watch(getter, handler);
            } else {
                warn$1('Invalid watch handler specified by key "'.concat(raw, '"'), handler);
            }
        } else if (isFunction(raw)) {
            watch(getter, raw.bind(publicThis));
        } else if (isObject(raw)) {
            if (isArray(raw)) {
                raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
            } else {
                var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
                if (isFunction(_handler)) {
                    watch(getter, _handler, raw);
                } else {
                    warn$1('Invalid watch handler specified by key "'.concat(raw.handler, '"'), _handler);
                }
            }
        } else {
            warn$1('Invalid watch option: "'.concat(key, '"'), raw);
        }
    }
    function resolveMergedOptions(instance) {
        var base = instance.type;
        var {
            mixins,
            extends: extendsOptions
        } = base;
        var {
            mixins: globalMixins,
            optionsCache: cache2,
            config: {
                optionMergeStrategies
            }
        } = instance.appContext;
        var cached = cache2.get(base);
        var resolved;
        if (cached) {
            resolved = cached;
        } else if (!globalMixins.length && !mixins && !extendsOptions) {
            {
                resolved = base;
            }
        } else {
            resolved = {};
            if (globalMixins.length) {
                globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
            }
            mergeOptions(resolved, base, optionMergeStrategies);
        }
        if (isObject(base)) {
            cache2.set(base, resolved);
        }
        return resolved;
    }
    function mergeOptions(to, from, strats) {
        var asMixin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        var {
            mixins,
            extends: extendsOptions
        } = from;
        if (extendsOptions) {
            mergeOptions(to, extendsOptions, strats, true);
        }
        if (mixins) {
            mixins.forEach((m) => mergeOptions(to, m, strats, true));
        }
        for (var key in from) {
            if (asMixin && key === "expose") {
                warn$1('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
            } else {
                var strat = internalOptionMergeStrats[key] || strats && strats[key];
                to[key] = strat ? strat(to[key], from[key]) : from[key];
            }
        }
        return to;
    }
    var internalOptionMergeStrats = {
        data: mergeDataFn,
        props: mergeEmitsOrPropsOptions,
        emits: mergeEmitsOrPropsOptions,
        // objects
        methods: mergeObjectOptions,
        computed: mergeObjectOptions,
        // lifecycle
        beforeCreate: mergeAsArray,
        created: mergeAsArray,
        beforeMount: mergeAsArray,
        mounted: mergeAsArray,
        beforeUpdate: mergeAsArray,
        updated: mergeAsArray,
        beforeDestroy: mergeAsArray,
        beforeUnmount: mergeAsArray,
        destroyed: mergeAsArray,
        unmounted: mergeAsArray,
        activated: mergeAsArray,
        deactivated: mergeAsArray,
        errorCaptured: mergeAsArray,
        serverPrefetch: mergeAsArray,
        // assets
        components: mergeObjectOptions,
        directives: mergeObjectOptions,
        // watch
        watch: mergeWatchOptions,
        // provide / inject
        provide: mergeDataFn,
        inject: mergeInject
    };
    function mergeDataFn(to, from) {
        if (!from) {
            return to;
        }
        if (!to) {
            return from;
        }
        return function mergedDataFn() {
            return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
        };
    }
    function mergeInject(to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
        if (isArray(raw)) {
            var res = {};
            for (var i = 0; i < raw.length; i++) {
                res[raw[i]] = raw[i];
            }
            return res;
        }
        return raw;
    }
    function mergeAsArray(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
        return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
    }
    function mergeEmitsOrPropsOptions(to, from) {
        if (to) {
            if (isArray(to) && isArray(from)) {
                return [.../* @__PURE__ */ new Set([...to, ...from])];
            }
            return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
        } else {
            return from;
        }
    }
    function mergeWatchOptions(to, from) {
        if (!to)
            return from;
        if (!from)
            return to;
        var merged = extend(/* @__PURE__ */ Object.create(null), to);
        for (var key in from) {
            merged[key] = mergeAsArray(to[key], from[key]);
        }
        return merged;
    }
    function createAppContext() {
        return {
            app: null,
            config: {
                isNativeTag: NO,
                performance: false,
                globalProperties: {},
                optionMergeStrategies: {},
                errorHandler: void 0,
                warnHandler: void 0,
                compilerOptions: {}
            },
            mixins: [],
            components: {},
            directives: {},
            provides: /* @__PURE__ */ Object.create(null),
            optionsCache: /* @__PURE__ */ new WeakMap(),
            propsCache: /* @__PURE__ */ new WeakMap(),
            emitsCache: /* @__PURE__ */ new WeakMap()
        };
    }
    var uid$1 = 0;
    function createAppAPI(render2, hydrate) {
        return function createApp3(rootComponent) {
            var rootProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            if (!isFunction(rootComponent)) {
                rootComponent = extend({}, rootComponent);
            }
            if (rootProps != null && !isObject(rootProps)) {
                warn$1("root props passed to app.mount() must be an object.");
                rootProps = null;
            }
            var context = createAppContext();
            var installedPlugins = /* @__PURE__ */ new WeakSet();
            var isMounted = false;
            var app = context.app = {
                _uid: uid$1++,
                _component: rootComponent,
                _props: rootProps,
                _container: null,
                _context: context,
                _instance: null,
                version,
                get config() {
                    return context.config;
                },
                set config(v) {
                    {
                        warn$1("app.config cannot be replaced. Modify individual options instead.");
                    }
                },
                use(plugin2) {
                    for (var _len5 = arguments.length, options = new Array(_len5 > 1 ? _len5 - 1 : 0), _key9 = 1; _key9 < _len5; _key9++) {
                        options[_key9 - 1] = arguments[_key9];
                    }
                    if (installedPlugins.has(plugin2)) {
                        warn$1("Plugin has already been applied to target app.");
                    } else if (plugin2 && isFunction(plugin2.install)) {
                        installedPlugins.add(plugin2);
                        plugin2.install(app, ...options);
                    } else if (isFunction(plugin2)) {
                        installedPlugins.add(plugin2);
                        plugin2(app, ...options);
                    } else {
                        warn$1('A plugin must either be a function or an object with an "install" function.');
                    }
                    return app;
                },
                mixin(mixin) {
                    {
                        if (!context.mixins.includes(mixin)) {
                            context.mixins.push(mixin);
                        } else {
                            warn$1("Mixin has already been applied to target app" + (mixin.name ? ": ".concat(mixin.name) : ""));
                        }
                    }
                    return app;
                },
                component(name, component) {
                    {
                        validateComponentName(name, context.config);
                    }
                    if (!component) {
                        return context.components[name];
                    }
                    if (context.components[name]) {
                        warn$1('Component "'.concat(name, '" has already been registered in target app.'));
                    }
                    context.components[name] = component;
                    return app;
                },
                directive(name, directive) {
                    {
                        validateDirectiveName(name);
                    }
                    if (!directive) {
                        return context.directives[name];
                    }
                    if (context.directives[name]) {
                        warn$1('Directive "'.concat(name, '" has already been registered in target app.'));
                    }
                    context.directives[name] = directive;
                    return app;
                },
                mount(rootContainer, isHydrate, namespace) {
                    if (!isMounted) {
                        if (rootContainer.__vue_app__) {
                            warn$1("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
                        }
                        var vnode = createVNode(rootComponent, rootProps);
                        vnode.appContext = context;
                        if (namespace === true) {
                            namespace = "svg";
                        } else if (namespace === false) {
                            namespace = void 0;
                        }
                        {
                            context.reload = () => {
                                render2(cloneVNode(vnode), rootContainer, namespace);
                            };
                        }
                        if (isHydrate && hydrate) {
                            hydrate(vnode, rootContainer);
                        } else {
                            render2(vnode, rootContainer, namespace);
                        }
                        isMounted = true;
                        app._container = rootContainer;
                        rootContainer.__vue_app__ = app;
                        app._instance = vnode.component;
                        {
                            devtoolsInitApp(app, version);
                        }
                        return getExposeProxy(vnode.component) || vnode.component.proxy;
                    } else {
                        warn$1("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
                    }
                },
                unmount() {
                    if (isMounted) {
                        render2(null, app._container);
                        {
                            app._instance = null;
                            devtoolsUnmountApp(app);
                        }
                        delete app._container.__vue_app__;
                    } else {
                        warn$1("Cannot unmount an app that is not mounted.");
                    }
                },
                provide(key, value) {
                    if (key in context.provides) {
                        warn$1('App already provides property with key "'.concat(String(key), '". It will be overwritten with the new value.'));
                    }
                    context.provides[key] = value;
                    return app;
                },
                runWithContext(fn) {
                    var lastApp = currentApp;
                    currentApp = app;
                    try {
                        return fn();
                    } finally {
                        currentApp = lastApp;
                    }
                }
            };
            return app;
        };
    }
    var currentApp = null;
    function provide(key, value) {
        if (!currentInstance) {
            {
                warn$1("provide() can only be used inside setup().");
            }
        } else {
            var provides = currentInstance.provides;
            var parentProvides = currentInstance.parent && currentInstance.parent.provides;
            if (parentProvides === provides) {
                provides = currentInstance.provides = Object.create(parentProvides);
            }
            provides[key] = value;
            if (currentInstance.type.mpType === "app") {
                currentInstance.appContext.app.provide(key, value);
            }
        }
    }
    function inject(key, defaultValue) {
        var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var instance = currentInstance || currentRenderingInstance;
        if (instance || currentApp) {
            var provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
            if (provides && key in provides) {
                return provides[key];
            } else if (arguments.length > 1) {
                return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
            } else {
                warn$1('injection "'.concat(String(key), '" not found.'));
            }
        } else {
            warn$1("inject() can only be used inside setup() or functional components.");
        }
    }
    function hasInjectionContext() {
        return !!(currentInstance || currentRenderingInstance || currentApp);
    }
    function initProps(instance, rawProps, isStateful) {
        var isSSR = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        var props = {};
        var attrs = {};
        def(attrs, InternalObjectKey, 1);
        instance.propsDefaults = /* @__PURE__ */ Object.create(null);
        setFullProps(instance, rawProps, props, attrs);
        for (var key in instance.propsOptions[0]) {
            if (!(key in props)) {
                props[key] = void 0;
            }
        }
        {
            validateProps(rawProps || {}, props, instance);
        }
        if (isStateful) {
            instance.props = isSSR ? props : shallowReactive(props);
        } else {
            if (!instance.type.props) {
                instance.props = attrs;
            } else {
                instance.props = props;
            }
        }
        instance.attrs = attrs;
    }
    function isInHmrContext(instance) {
        while (instance) {
            if (instance.type.__hmrId)
                return true;
            instance = instance.parent;
        }
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
        var {
            props,
            attrs,
            vnode: {
                patchFlag
            }
        } = instance;
        var rawCurrentProps = toRaw(props);
        var [options] = instance.propsOptions;
        var hasAttrsChanged = false;
        if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
            !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
        ) {
            if (patchFlag & 8) {
                var propsToUpdate = instance.vnode.dynamicProps;
                for (var i = 0; i < propsToUpdate.length; i++) {
                    var key = propsToUpdate[i];
                    if (isEmitListener(instance.emitsOptions, key)) {
                        continue;
                    }
                    var value = rawProps[key];
                    if (options) {
                        if (hasOwn(attrs, key)) {
                            if (value !== attrs[key]) {
                                attrs[key] = value;
                                hasAttrsChanged = true;
                            }
                        } else {
                            var camelizedKey = camelize(key);
                            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
                        }
                    } else {
                        if (value !== attrs[key]) {
                            attrs[key] = value;
                            hasAttrsChanged = true;
                        }
                    }
                }
            }
        } else {
            if (setFullProps(instance, rawProps, props, attrs)) {
                hasAttrsChanged = true;
            }
            var kebabKey;
            for (var _key10 in rawCurrentProps) {
                if (!rawProps || // for camelCase
                    !hasOwn(rawProps, _key10) && // it's possible the original props was passed in as kebab-case
                        // and converted to camelCase (#955)
                        ((kebabKey = hyphenate(_key10)) === _key10 || !hasOwn(rawProps, kebabKey))) {
                    if (options) {
                        if (rawPrevProps && // for camelCase
                            (rawPrevProps[_key10] !== void 0 || // for kebab-case
                                rawPrevProps[kebabKey] !== void 0)) {
                            props[_key10] = resolvePropValue(options, rawCurrentProps, _key10, void 0, instance, true);
                        }
                    } else {
                        delete props[_key10];
                    }
                }
            }
            if (attrs !== rawCurrentProps) {
                for (var _key11 in attrs) {
                    if (!rawProps || !hasOwn(rawProps, _key11) && true) {
                        delete attrs[_key11];
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        if (hasAttrsChanged) {
            trigger(instance, "set", "$attrs");
        }
        {
            validateProps(rawProps || {}, props, instance);
        }
    }
    function setFullProps(instance, rawProps, props, attrs) {
        var [options, needCastKeys] = instance.propsOptions;
        var hasAttrsChanged = false;
        var rawCastValues;
        if (rawProps) {
            for (var key in rawProps) {
                if (isReservedProp(key)) {
                    continue;
                }
                var value = rawProps[key];
                var camelKey = void 0;
                if (options && hasOwn(options, camelKey = camelize(key))) {
                    if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                        props[camelKey] = value;
                    } else {
                        (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                    }
                } else if (!isEmitListener(instance.emitsOptions, key)) {
                    if (!(key in attrs) || value !== attrs[key]) {
                        attrs[key] = value;
                        hasAttrsChanged = true;
                    }
                }
            }
        }
        if (needCastKeys) {
            var rawCurrentProps = toRaw(props);
            var castValues = rawCastValues || EMPTY_OBJ;
            for (var i = 0; i < needCastKeys.length; i++) {
                var _key12 = needCastKeys[i];
                props[_key12] = resolvePropValue(options, rawCurrentProps, _key12, castValues[_key12], instance, !hasOwn(castValues, _key12));
            }
        }
        return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
        var opt = options[key];
        if (opt != null) {
            var hasDefault = hasOwn(opt, "default");
            if (hasDefault && value === void 0) {
                var defaultValue = opt.default;
                if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
                    var {
                        propsDefaults
                    } = instance;
                    if (key in propsDefaults) {
                        value = propsDefaults[key];
                    } else {
                        var reset = setCurrentInstance(instance);
                        value = propsDefaults[key] = defaultValue.call(null, props);
                        reset();
                    }
                } else {
                    value = defaultValue;
                }
            }
            if (opt[
            0
                /* shouldCast */
            ]) {
                if (isAbsent && !hasDefault) {
                    value = false;
                } else if (opt[
                1
                    /* shouldCastTrue */
                ] && (value === "" || value === hyphenate(key))) {
                    value = true;
                }
            }
        }
        return value;
    }
    function normalizePropsOptions(comp, appContext) {
        var asMixin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var cache2 = appContext.propsCache;
        var cached = cache2.get(comp);
        if (cached) {
            return cached;
        }
        var raw = comp.props;
        var normalized = {};
        var needCastKeys = [];
        var hasExtends = false;
        if (!isFunction(comp)) {
            var extendProps = (raw2) => {
                hasExtends = true;
                var [props, keys] = normalizePropsOptions(raw2, appContext, true);
                extend(normalized, props);
                if (keys)
                    needCastKeys.push(...keys);
            };
            if (!asMixin && appContext.mixins.length) {
                appContext.mixins.forEach(extendProps);
            }
            if (comp.extends) {
                extendProps(comp.extends);
            }
            if (comp.mixins) {
                comp.mixins.forEach(extendProps);
            }
        }
        if (!raw && !hasExtends) {
            if (isObject(comp)) {
                cache2.set(comp, EMPTY_ARR);
            }
            return EMPTY_ARR;
        }
        if (isArray(raw)) {
            for (var i = 0; i < raw.length; i++) {
                if (!isString(raw[i])) {
                    warn$1("props must be strings when using array syntax.", raw[i]);
                }
                var normalizedKey = camelize(raw[i]);
                if (validatePropName(normalizedKey)) {
                    normalized[normalizedKey] = EMPTY_OBJ;
                }
            }
        } else if (raw) {
            if (!isObject(raw)) {
                warn$1("invalid props options", raw);
            }
            for (var key in raw) {
                var _normalizedKey = camelize(key);
                if (validatePropName(_normalizedKey)) {
                    var opt = raw[key];
                    var prop = normalized[_normalizedKey] = isArray(opt) || isFunction(opt) ? {
                        type: opt
                    } : extend({}, opt);
                    if (prop) {
                        var booleanIndex = getTypeIndex(Boolean, prop.type);
                        var stringIndex = getTypeIndex(String, prop.type);
                        prop[
                        0
                            /* shouldCast */
                        ] = booleanIndex > -1;
                        prop[
                        1
                            /* shouldCastTrue */
                        ] = stringIndex < 0 || booleanIndex < stringIndex;
                        if (booleanIndex > -1 || hasOwn(prop, "default")) {
                            needCastKeys.push(_normalizedKey);
                        }
                    }
                }
            }
        }
        var res = [normalized, needCastKeys];
        if (isObject(comp)) {
            cache2.set(comp, res);
        }
        return res;
    }
    function validatePropName(key) {
        if (key[0] !== "$" && !isReservedProp(key)) {
            return true;
        } else {
            warn$1('Invalid prop name: "'.concat(key, '" is a reserved property.'));
        }
        return false;
    }
    function getType(ctor) {
        if (ctor === null) {
            return "null";
        }
        if (typeof ctor === "function") {
            return ctor.name || "";
        } else if (typeof ctor === "object") {
            var name = ctor.constructor && ctor.constructor.name;
            return name || "";
        }
        return "";
    }
    function isSameType(a, b) {
        return getType(a) === getType(b);
    }
    function getTypeIndex(type, expectedTypes) {
        if (isArray(expectedTypes)) {
            return expectedTypes.findIndex((t) => isSameType(t, type));
        } else if (isFunction(expectedTypes)) {
            return isSameType(expectedTypes, type) ? 0 : -1;
        }
        return -1;
    }
    function validateProps(rawProps, props, instance) {
        var resolvedValues = toRaw(props);
        var options = instance.propsOptions[0];
        for (var key in options) {
            var opt = options[key];
            if (opt == null)
                continue;
            validateProp(key, resolvedValues[key], opt, shallowReadonly(resolvedValues), !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
        }
    }
    function validateProp(name, value, prop, props, isAbsent) {
        var {
            type,
            required,
            validator: validator2,
            skipCheck
        } = prop;
        if (required && isAbsent) {
            warn$1('Missing required prop: "' + name + '"');
            return;
        }
        if (value == null && !required) {
            return;
        }
        if (type != null && type !== true && !skipCheck) {
            var isValid = false;
            var types = isArray(type) ? type : [type];
            var expectedTypes = [];
            for (var i = 0; i < types.length && !isValid; i++) {
                var {
                    valid,
                    expectedType
                } = assertType(value, types[i]);
                expectedTypes.push(expectedType || "");
                isValid = valid;
            }
            if (!isValid) {
                warn$1(getInvalidTypeMessage(name, value, expectedTypes));
                return;
            }
        }
        if (validator2 && !validator2(value, props)) {
            warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
        }
    }
    var isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
    function assertType(value, type) {
        var valid;
        var expectedType = getType(type);
        if (isSimpleType(expectedType)) {
            var t = typeof value;
            valid = t === expectedType.toLowerCase();
            if (!valid && t === "object") {
                valid = value instanceof type;
            }
        } else if (expectedType === "Object") {
            valid = isObject(value);
        } else if (expectedType === "Array") {
            valid = isArray(value);
        } else if (expectedType === "null") {
            valid = value === null;
        } else {
            valid = value instanceof type;
        }
        return {
            valid,
            expectedType
        };
    }
    function getInvalidTypeMessage(name, value, expectedTypes) {
        if (expectedTypes.length === 0) {
            return 'Prop type [] for prop "'.concat(name, `" won't match anything. Did you mean to use type Array instead?`);
        }
        var message = 'Invalid prop: type check failed for prop "'.concat(name, '". Expected ').concat(expectedTypes.map(capitalize).join(" | "));
        var expectedType = expectedTypes[0];
        var receivedType = toRawType(value);
        var expectedValue = styleValue(value, expectedType);
        var receivedValue = styleValue(value, receivedType);
        if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
            message += " with value ".concat(expectedValue);
        }
        message += ", got ".concat(receivedType, " ");
        if (isExplicable(receivedType)) {
            message += "with value ".concat(receivedValue, ".");
        }
        return message;
    }
    function styleValue(value, type) {
        if (type === "String") {
            return '"'.concat(value, '"');
        } else if (type === "Number") {
            return "".concat(Number(value));
        } else {
            return "".concat(value);
        }
    }
    function isExplicable(type) {
        var explicitTypes = ["string", "number", "boolean"];
        return explicitTypes.some((elem) => type.toLowerCase() === elem);
    }
    function isBoolean() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key13 = 0; _key13 < _len6; _key13++) {
            args[_key13] = arguments[_key13];
        }
        return args.some((elem) => elem.toLowerCase() === "boolean");
    }
    var isInternalKey = (key) => key[0] === "_" || key === "$stable";
    var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    var normalizeSlot = (key, rawSlot, ctx) => {
        if (rawSlot._n) {
            return rawSlot;
        }
        var normalized = withCtx(function() {
            if (currentInstance && (!ctx || ctx.root === currentInstance.root)) {
                warn$1('Slot "'.concat(key, '" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.'));
            }
            return normalizeSlotValue(rawSlot(...arguments));
        }, ctx);
        normalized._c = false;
        return normalized;
    };
    var normalizeObjectSlots = (rawSlots, slots, instance) => {
        var ctx = rawSlots._ctx;
        for (var key in rawSlots) {
            if (isInternalKey(key))
                continue;
            var value = rawSlots[key];
            if (isFunction(value)) {
                slots[key] = normalizeSlot(key, value, ctx);
            } else if (value != null) {
                (function() {
                    {
                        warn$1('Non-function value encountered for slot "'.concat(key, '". Prefer function slots for better performance.'));
                    }
                    var normalized = normalizeSlotValue(value);
                    slots[key] = () => normalized;
                })();
            }
        }
    };
    var normalizeVNodeSlots = (instance, children) => {
        if (!isKeepAlive(instance.vnode) && true) {
            warn$1("Non-function value encountered for default slot. Prefer function slots for better performance.");
        }
        var normalized = normalizeSlotValue(children);
        instance.slots.default = () => normalized;
    };
    var initSlots = (instance, children) => {
        if (instance.vnode.shapeFlag & 32) {
            var type = children._;
            if (type) {
                instance.slots = toRaw(children);
                def(children, "_", type);
            } else {
                normalizeObjectSlots(children, instance.slots = {});
            }
        } else {
            instance.slots = {};
            if (children) {
                normalizeVNodeSlots(instance, children);
            }
        }
        def(instance.slots, InternalObjectKey, 1);
    };
    var updateSlots = (instance, children, optimized) => {
        var {
            vnode,
            slots
        } = instance;
        var needDeletionCheck = true;
        var deletionComparisonTarget = EMPTY_OBJ;
        if (vnode.shapeFlag & 32) {
            var type = children._;
            if (type) {
                if (isHmrUpdating) {
                    extend(slots, children);
                    trigger(instance, "set", "$slots");
                } else if (optimized && type === 1) {
                    needDeletionCheck = false;
                } else {
                    extend(slots, children);
                    if (!optimized && type === 1) {
                        delete slots._;
                    }
                }
            } else {
                needDeletionCheck = !children.$stable;
                normalizeObjectSlots(children, slots);
            }
            deletionComparisonTarget = children;
        } else if (children) {
            normalizeVNodeSlots(instance, children);
            deletionComparisonTarget = {
                default: 1
            };
        }
        if (needDeletionCheck) {
            for (var key in slots) {
                if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
                    delete slots[key];
                }
            }
        }
    };
    function setRef(rawRef, oldRawRef, parentSuspense, vnode) {
        var isUnmount = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
        if (isArray(rawRef)) {
            rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
            return;
        }
        if (isAsyncWrapper(vnode) && !isUnmount) {
            return;
        }
        var refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
        var value = isUnmount ? null : refValue;
        var {
            i: owner,
            r: ref2
        } = rawRef;
        if (!owner) {
            warn$1("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
            return;
        }
        var oldRef = oldRawRef && oldRawRef.r;
        var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
        var setupState = owner.setupState;
        if (oldRef != null && oldRef !== ref2) {
            if (isString(oldRef)) {
                refs[oldRef] = null;
                if (hasOwn(setupState, oldRef)) {
                    setupState[oldRef] = null;
                }
            } else if (isRef(oldRef)) {
                oldRef.value = null;
            }
        }
        if (isFunction(ref2)) {
            callWithErrorHandling(ref2, owner, 12, [value, refs]);
        } else {
            var _isString = isString(ref2);
            var _isRef = isRef(ref2);
            if (_isString || _isRef) {
                var doSet = () => {
                    if (rawRef.f) {
                        var existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
                        if (isUnmount) {
                            isArray(existing) && remove(existing, refValue);
                        } else {
                            if (!isArray(existing)) {
                                if (_isString) {
                                    refs[ref2] = [refValue];
                                    if (hasOwn(setupState, ref2)) {
                                        setupState[ref2] = refs[ref2];
                                    }
                                } else {
                                    ref2.value = [refValue];
                                    if (rawRef.k)
                                        refs[rawRef.k] = ref2.value;
                                }
                            } else if (!existing.includes(refValue)) {
                                existing.push(refValue);
                            }
                        }
                    } else if (_isString) {
                        refs[ref2] = value;
                        if (hasOwn(setupState, ref2)) {
                            setupState[ref2] = value;
                        }
                    } else if (_isRef) {
                        ref2.value = value;
                        if (rawRef.k)
                            refs[rawRef.k] = value;
                    } else {
                        warn$1("Invalid template ref type:", ref2, "(".concat(typeof ref2, ")"));
                    }
                };
                if (value) {
                    doSet.id = -1;
                    queuePostRenderEffect(doSet, parentSuspense);
                } else {
                    doSet();
                }
            } else {
                warn$1("Invalid template ref type:", ref2, "(".concat(typeof ref2, ")"));
            }
        }
    }
    var hasMismatch = false;
    var isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
    var isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
    var getContainerType = (container) => {
        if (isSVGContainer(container))
            return "svg";
        if (isMathMLContainer(container))
            return "mathml";
        return void 0;
    };
    var isComment = (node) => node.nodeType === 8;
    function createHydrationFunctions(rendererInternals) {
        var {
            mt: mountComponent,
            p: patch,
            o: {
                patchProp: patchProp2,
                createText,
                nextSibling,
                parentNode,
                remove: remove2,
                insert,
                createComment: createComment2
            }
        } = rendererInternals;
        var hydrate = (vnode, container) => {
            if (!container.hasChildNodes()) {
                warn$1("Attempting to hydrate existing markup but container is empty. Performing full mount instead.");
                patch(null, vnode, container);
                flushPostFlushCbs();
                container._vnode = vnode;
                return;
            }
            hasMismatch = false;
            hydrateNode(container.firstChild, vnode, null, null, null);
            flushPostFlushCbs();
            container._vnode = vnode;
            if (hasMismatch && true) {
                console.error("Hydration completed but contains mismatches.");
            }
        };
        var hydrateNode = function(node, vnode, parentComponent, parentSuspense, slotScopeIds) {
            var optimized = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
            var isFragmentStart = isComment(node) && node.data === "[";
            var onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
            var {
                type,
                ref: ref2,
                shapeFlag,
                patchFlag
            } = vnode;
            var domType = node.nodeType;
            vnode.el = node;
            {
                if (!("__vnode" in node)) {
                    Object.defineProperty(node, "__vnode", {
                        value: vnode,
                        enumerable: false
                    });
                }
                if (!("__vueParentComponent" in node)) {
                    Object.defineProperty(node, "__vueParentComponent", {
                        value: parentComponent,
                        enumerable: false
                    });
                }
            }
            if (patchFlag === -2) {
                optimized = false;
                vnode.dynamicChildren = null;
            }
            var nextNode = null;
            switch (type) {
                case Text:
                    if (domType !== 3) {
                        if (vnode.children === "") {
                            insert(
                                // fixed by xxxxxx
                                vnode.el = createText("", node.parentNode),
                                parentNode(node),
                                node
                            );
                            nextNode = node;
                        } else {
                            nextNode = onMismatch();
                        }
                    } else {
                        if (node.data !== vnode.children) {
                            hasMismatch = true;
                            warn$1("Hydration text mismatch in", node.parentNode, "\n  - rendered on server: ".concat(JSON.stringify(node.data), "\n  - expected on client: ").concat(JSON.stringify(vnode.children)));
                            node.data = vnode.children;
                        }
                        nextNode = nextSibling(node);
                    }
                    break;
                case Comment:
                    if (isTemplateNode(node)) {
                        nextNode = nextSibling(node);
                        replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
                    } else if (domType !== 8 || isFragmentStart) {
                        nextNode = onMismatch();
                    } else {
                        nextNode = nextSibling(node);
                    }
                    break;
                case Static:
                    if (isFragmentStart) {
                        node = nextSibling(node);
                        domType = node.nodeType;
                    }
                    if (domType === 1 || domType === 3) {
                        nextNode = node;
                        var needToAdoptContent = !vnode.children.length;
                        for (var i = 0; i < vnode.staticCount; i++) {
                            if (needToAdoptContent)
                                vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
                            if (i === vnode.staticCount - 1) {
                                vnode.anchor = nextNode;
                            }
                            nextNode = nextSibling(nextNode);
                        }
                        return isFragmentStart ? nextSibling(nextNode) : nextNode;
                    } else {
                        onMismatch();
                    }
                    break;
                case Fragment:
                    if (!isFragmentStart) {
                        nextNode = onMismatch();
                    } else {
                        nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                    }
                    break;
                default:
                    if (shapeFlag & 1) {
                        if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
                            nextNode = onMismatch();
                        } else {
                            nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                        }
                    } else if (shapeFlag & 6) {
                        vnode.slotScopeIds = slotScopeIds;
                        var container = parentNode(node);
                        if (isFragmentStart) {
                            nextNode = locateClosingAnchor(node);
                        } else if (isComment(node) && node.data === "teleport start") {
                            nextNode = locateClosingAnchor(node, node.data, "teleport end");
                        } else {
                            nextNode = nextSibling(node);
                        }
                        mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
                        if (isAsyncWrapper(vnode)) {
                            var subTree;
                            if (isFragmentStart) {
                                subTree = createVNode(Fragment);
                                subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
                            } else {
                                subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
                            }
                            subTree.el = node;
                            vnode.component.subTree = subTree;
                        }
                    } else if (shapeFlag & 64) {
                        if (domType !== 8) {
                            nextNode = onMismatch();
                        } else {
                            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
                        }
                    } else if (shapeFlag & 128) {
                        nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
                    } else {
                        warn$1("Invalid HostVNode type:", type, "(".concat(typeof type, ")"));
                    }
            }
            if (ref2 != null) {
                setRef(ref2, null, parentSuspense, vnode);
            }
            return nextNode;
        };
        var hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
            optimized = optimized || !!vnode.dynamicChildren;
            var {
                type,
                props,
                patchFlag,
                shapeFlag,
                dirs,
                transition
            } = vnode;
            var forcePatch = type === "input" || type === "option";
            {
                if (dirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, "created");
                }
                var needCallTransitionHooks = false;
                if (isTemplateNode(el)) {
                    needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
                    var content = el.content.firstChild;
                    if (needCallTransitionHooks) {
                        transition.beforeEnter(content);
                    }
                    replaceNode(content, el, parentComponent);
                    vnode.el = el = content;
                }
                if (shapeFlag & 16 && // skip if element has innerHTML / textContent
                    !(props && (props.innerHTML || props.textContent))) {
                    var next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
                    var _hasWarned = false;
                    while (next) {
                        hasMismatch = true;
                        if (!_hasWarned) {
                            warn$1("Hydration children mismatch on", el, "\nServer rendered element contains more child nodes than client vdom.");
                            _hasWarned = true;
                        }
                        var cur = next;
                        next = next.nextSibling;
                        remove2(cur);
                    }
                } else if (shapeFlag & 8) {
                    if (el.textContent !== vnode.children) {
                        hasMismatch = true;
                        warn$1("Hydration text content mismatch on", el, "\n  - rendered on server: ".concat(el.textContent, "\n  - expected on client: ").concat(vnode.children));
                        el.textContent = vnode.children;
                    }
                }
                if (props) {
                    {
                        for (var key in props) {
                            if (propHasMismatch(el, key, props[key], vnode, parentComponent)) {
                                hasMismatch = true;
                            }
                            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
                                key[0] === ".") {
                                patchProp2(el, key, null, props[key], void 0, void 0, parentComponent);
                            }
                        }
                    }
                }
                var vnodeHooks;
                if (vnodeHooks = props && props.onVnodeBeforeMount) {
                    invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                }
                if (dirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
                }
                if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
                    queueEffectWithSuspense(() => {
                        vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                        needCallTransitionHooks && transition.enter(el);
                        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                    }, parentSuspense);
                }
            }
            return el.nextSibling;
        };
        var hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
            optimized = optimized || !!parentVNode.dynamicChildren;
            var children = parentVNode.children;
            var l = children.length;
            var hasWarned2 = false;
            for (var i = 0; i < l; i++) {
                var vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
                if (node) {
                    node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
                } else if (vnode.type === Text && !vnode.children) {
                    continue;
                } else {
                    hasMismatch = true;
                    if (!hasWarned2) {
                        warn$1("Hydration children mismatch on", container, "\nServer rendered element contains fewer child nodes than client vdom.");
                        hasWarned2 = true;
                    }
                    patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
                }
            }
            return node;
        };
        var hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
            var {
                slotScopeIds: fragmentSlotScopeIds
            } = vnode;
            if (fragmentSlotScopeIds) {
                slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
            }
            var container = parentNode(node);
            var next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
            if (next && isComment(next) && next.data === "]") {
                return nextSibling(vnode.anchor = next);
            } else {
                hasMismatch = true;
                insert(vnode.anchor = createComment2("]", container), container, next);
                return next;
            }
        };
        var handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
            hasMismatch = true;
            warn$1("Hydration node mismatch:\n- rendered on server:", node, node.nodeType === 3 ? "(text)" : isComment(node) && node.data === "[" ? "(start of fragment)" : "", "\n- expected on client:", vnode.type);
            vnode.el = null;
            if (isFragment) {
                var end = locateClosingAnchor(node);
                while (true) {
                    var next2 = nextSibling(node);
                    if (next2 && next2 !== end) {
                        remove2(next2);
                    } else {
                        break;
                    }
                }
            }
            var next = nextSibling(node);
            var container = parentNode(node);
            remove2(node);
            patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
            return next;
        };
        var locateClosingAnchor = function(node) {
            var open = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "[";
            var close = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "]";
            var match = 0;
            while (node) {
                node = nextSibling(node);
                if (node && isComment(node)) {
                    if (node.data === open)
                        match++;
                    if (node.data === close) {
                        if (match === 0) {
                            return nextSibling(node);
                        } else {
                            match--;
                        }
                    }
                }
            }
            return node;
        };
        var replaceNode = (newNode, oldNode, parentComponent) => {
            var parentNode2 = oldNode.parentNode;
            if (parentNode2) {
                parentNode2.replaceChild(newNode, oldNode);
            }
            var parent = parentComponent;
            while (parent) {
                if (parent.vnode.el === oldNode) {
                    parent.vnode.el = parent.subTree.el = newNode;
                }
                parent = parent.parent;
            }
        };
        var isTemplateNode = (node) => {
            return node.nodeType === 1 && node.tagName.toLowerCase() === "template";
        };
        return [hydrate, hydrateNode];
    }
    function propHasMismatch(el, key, clientValue, vnode, instance) {
        var _a;
        var mismatchType;
        var mismatchKey;
        var actual;
        var expected;
        if (key === "class") {
            actual = el.getAttribute("class");
            expected = normalizeClass(clientValue);
            if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
                mismatchType = mismatchKey = "class";
            }
        } else if (key === "style") {
            actual = el.getAttribute("style");
            expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
            var actualMap = toStyleMap(actual);
            var expectedMap = toStyleMap(expected);
            if (vnode.dirs) {
                for (var {
                    dir,
                    value
                } of vnode.dirs) {
                    if (dir.name === "show" && !value) {
                        expectedMap.set("display", "none");
                    }
                }
            }
            var root = instance == null ? void 0 : instance.subTree;
            if (vnode === root || (root == null ? void 0 : root.type) === Fragment && root.children.includes(vnode)) {
                var cssVars = (_a = instance == null ? void 0 : instance.getCssVars) == null ? void 0 : _a.call(instance);
                for (var key2 in cssVars) {
                    expectedMap.set("--".concat(key2), String(cssVars[key2]));
                }
            }
            if (!isMapEqual(actualMap, expectedMap)) {
                mismatchType = mismatchKey = "style";
            }
        } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
            if (isBooleanAttr(key)) {
                actual = el.hasAttribute(key);
                expected = includeBooleanAttr(clientValue);
            } else if (clientValue == null) {
                actual = el.hasAttribute(key);
                expected = false;
            } else {
                if (el.hasAttribute(key)) {
                    actual = el.getAttribute(key);
                } else if (key === "value" && el.tagName === "TEXTAREA") {
                    actual = el.value;
                } else {
                    actual = false;
                }
                expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
            }
            if (actual !== expected) {
                mismatchType = "attribute";
                mismatchKey = key;
            }
        }
        if (mismatchType) {
            var format = (v) => v === false ? "(not rendered)" : "".concat(mismatchKey, '="').concat(v, '"');
            var preSegment = "Hydration ".concat(mismatchType, " mismatch on");
            var postSegment = "\n  - rendered on server: ".concat(format(actual), "\n  - expected on client: ").concat(format(expected), "\n  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.\n  You should fix the source of the mismatch.");
            {
                warn$1(preSegment, el, postSegment);
            }
            return true;
        }
        return false;
    }
    function toClassSet(str) {
        return new Set(str.trim().split(/\s+/));
    }
    function isSetEqual(a, b) {
        if (a.size !== b.size) {
            return false;
        }
        for (var s of a) {
            if (!b.has(s)) {
                return false;
            }
        }
        return true;
    }
    function toStyleMap(str) {
        var styleMap = /* @__PURE__ */ new Map();
        for (var item of str.split(";")) {
            var [key, value] = item.split(":");
            key = key == null ? void 0 : key.trim();
            value = value == null ? void 0 : value.trim();
            if (key && value) {
                styleMap.set(key, value);
            }
        }
        return styleMap;
    }
    function isMapEqual(a, b) {
        if (a.size !== b.size) {
            return false;
        }
        for (var [key, value] of a) {
            if (value !== b.get(key)) {
                return false;
            }
        }
        return true;
    }
    var supported;
    var perf;
    function startMeasure(instance, type) {
        if (instance.appContext.config.performance && isSupported()) {
            perf.mark("vue-".concat(type, "-").concat(instance.uid));
        }
        {
            devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
        }
    }
    function endMeasure(instance, type) {
        if (instance.appContext.config.performance && isSupported()) {
            var startTag = "vue-".concat(type, "-").concat(instance.uid);
            var endTag = startTag + ":end";
            perf.mark(endTag);
            perf.measure("<".concat(formatComponentName(instance, instance.type), "> ").concat(type), startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
        }
        {
            devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
        }
    }
    function isSupported() {
        if (supported !== void 0) {
            return supported;
        }
        if (typeof window !== "undefined" && window.performance) {
            supported = true;
            perf = window.performance;
        } else {
            supported = false;
        }
        return supported;
    }
    function initFeatureFlags() {
        var needWarn = [];
        if (needWarn.length) {
            var multi = needWarn.length > 1;
            console.warn("Feature flag".concat(multi ? "s" : "", " ").concat(needWarn.join(", "), " ").concat(multi ? "are" : "is", " not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.\n\nFor more details, see https://link.vuejs.org/feature-flags."));
        }
    }
    var queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
        return baseCreateRenderer(options);
    }
    function createHydrationRenderer(options) {
        return baseCreateRenderer(options, createHydrationFunctions);
    }
    function baseCreateRenderer(options, createHydrationFns) {
        {
            initFeatureFlags();
        }
        var target = getGlobalThis();
        target.__VUE__ = true;
        {
            setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
        }
        var {
            insert: hostInsert,
            remove: hostRemove,
            patchProp: hostPatchProp,
            forcePatchProp: hostForcePatchProp,
        // fixed by xxxxxx
            createElement: hostCreateElement,
            createText: hostCreateText,
            createComment: hostCreateComment,
            setText: hostSetText,
            setElementText: hostSetElementText,
            parentNode: hostParentNode,
            nextSibling: hostNextSibling,
            setScopeId: hostSetScopeId = NOOP,
            insertStaticContent: hostInsertStaticContent
        } = options;
        var patch = function(n1, n2, container) {
            var anchor = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
            var parentComponent = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
            var parentSuspense = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
            var namespace = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : void 0;
            var slotScopeIds = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
            var optimized = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : isHmrUpdating ? false : !!n2.dynamicChildren;
            if (n1 === n2) {
                return;
            }
            if (n1 && !isSameVNodeType(n1, n2)) {
                anchor = getNextHostNode(n1);
                unmount(n1, parentComponent, parentSuspense, true);
                n1 = null;
            }
            if (n2.patchFlag === -2) {
                optimized = false;
                n2.dynamicChildren = null;
            }
            var {
                type,
                ref: ref2,
                shapeFlag
            } = n2;
            switch (type) {
                case Text:
                    processText(n1, n2, container, anchor);
                    break;
                case Comment:
                    processCommentNode(n1, n2, container, anchor);
                    break;
                case Static:
                    if (n1 == null) {
                        mountStaticNode(n2, container, anchor, namespace);
                    } else {
                        patchStaticNode(n1, n2, container, namespace);
                    }
                    break;
                case Fragment:
                    processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    break;
                default:
                    if (shapeFlag & 1) {
                        processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    } else if (shapeFlag & 6) {
                        processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    } else if (shapeFlag & 64) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                    } else if (shapeFlag & 128) {
                        type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
                    } else {
                        warn$1("Invalid VNode type:", type, "(".concat(typeof type, ")"));
                    }
            }
            if (ref2 != null && parentComponent) {
                setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
            }
        };
        var processText = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert(
                    n2.el = hostCreateText(n2.children, container),
                    // fixed by xxxxxx
                    container,
                    anchor
                );
            } else {
                var el = n2.el = n1.el;
                if (n2.children !== n1.children) {
                    hostSetText(el, n2.children);
                }
            }
        };
        var processCommentNode = (n1, n2, container, anchor) => {
            if (n1 == null) {
                hostInsert(
                    n2.el = hostCreateComment(n2.children || "", container),
                    // fixed by xxxxxx
                    container,
                    anchor
                );
            } else {
                n2.el = n1.el;
            }
        };
        var mountStaticNode = (n2, container, anchor, namespace) => {
            [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
        };
        var patchStaticNode = (n1, n2, container, namespace) => {
            if (n2.children !== n1.children) {
                var anchor = hostNextSibling(n1.anchor);
                removeStaticNode(n1);
                [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
            } else {
                n2.el = n1.el;
                n2.anchor = n1.anchor;
            }
        };
        var moveStaticNode = (_ref12, container, nextSibling) => {
            var {
                el,
                anchor
            } = _ref12;
            var next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostInsert(el, container, nextSibling);
                el = next;
            }
            hostInsert(anchor, container, nextSibling);
        };
        var removeStaticNode = (_ref13) => {
            var {
                el,
                anchor
            } = _ref13;
            var next;
            while (el && el !== anchor) {
                next = hostNextSibling(el);
                hostRemove(el);
                el = next;
            }
            hostRemove(anchor);
        };
        var processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            if (n2.type === "svg") {
                namespace = "svg";
            } else if (n2.type === "math") {
                namespace = "mathml";
            }
            if (n1 == null) {
                mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            } else {
                patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            }
        };
        var mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            var el;
            var vnodeHook;
            var {
                props,
                shapeFlag,
                transition,
                dirs
            } = vnode;
            el = vnode.el = hostCreateElement(
                // fixed by xxxxxx
                vnode.type,
                container
            );
            if (shapeFlag & 8) {
                hostSetElementText(el, vnode.children);
            } else if (shapeFlag & 16) {
                mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "created");
            }
            setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
            if (props) {
                for (var key in props) {
                    if (key !== "value" && !isReservedProp(key)) {
                        hostPatchProp(el, key, null, props[key], namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ("value" in props) {
                    hostPatchProp(el, "value", null, props.value, namespace);
                }
                if (vnodeHook = props.onVnodeBeforeMount) {
                    invokeVNodeHook(vnodeHook, parentComponent, vnode);
                }
            }
            {
                Object.defineProperty(el, "__vnode", {
                    value: vnode,
                    enumerable: false
                });
            }
            Object.defineProperty(el, "__vueParentComponent", {
                value: parentComponent,
                enumerable: false
            });
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
            }
            var needCallTransitionHooks = needTransition(parentSuspense, transition);
            if (needCallTransitionHooks) {
                transition.beforeEnter(el);
            }
            hostInsert(el, container, anchor);
            if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    needCallTransitionHooks && transition.enter(el);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
                }, parentSuspense);
            }
        };
        var setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
            if (scopeId) {
                hostSetScopeId(el, scopeId);
            }
            if (slotScopeIds) {
                for (var i = 0; i < slotScopeIds.length; i++) {
                    hostSetScopeId(el, slotScopeIds[i]);
                }
            }
            if (parentComponent) {
                var subTree = parentComponent.subTree;
                if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
                    subTree = filterSingleRoot(subTree.children) || subTree;
                }
                if (vnode === subTree) {
                    var parentVNode = parentComponent.vnode;
                    setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
                }
            }
        };
        var mountChildren = function(children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) {
            var start = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 0;
            for (var i = start; i < children.length; i++) {
                var child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
                patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            }
        };
        var patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            var el = n2.el = n1.el;
            var {
                patchFlag,
                dynamicChildren,
                dirs
            } = n2;
            patchFlag |= n1.patchFlag & 16;
            var oldProps = n1.props || EMPTY_OBJ;
            var newProps = n2.props || EMPTY_OBJ;
            var vnodeHook;
            parentComponent && toggleRecurse(parentComponent, false);
            if (vnodeHook = newProps.onVnodeBeforeUpdate) {
                invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            }
            if (dirs) {
                invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
            }
            parentComponent && toggleRecurse(parentComponent, true);
            if (isHmrUpdating) {
                patchFlag = 0;
                optimized = false;
                dynamicChildren = null;
            }
            if (dynamicChildren) {
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
                {
                    traverseStaticChildren(n1, n2);
                }
            } else if (!optimized) {
                patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
            }
            if (patchFlag > 0) {
                if (patchFlag & 16) {
                    patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
                } else {
                    if (patchFlag & 2) {
                        if (oldProps.class !== newProps.class) {
                            hostPatchProp(el, "class", null, newProps.class, namespace);
                        }
                    }
                    if (patchFlag & 4) {
                        hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
                    }
                    if (patchFlag & 8) {
                        var propsToUpdate = n2.dynamicProps;
                        for (var i = 0; i < propsToUpdate.length; i++) {
                            var key = propsToUpdate[i];
                            var prev = oldProps[key];
                            var next = newProps[key];
                            if (next !== prev || key === "value" || hostForcePatchProp && hostForcePatchProp(el, key)) {
                                hostPatchProp(el, key, prev, next, namespace, n1.children, parentComponent, parentSuspense, unmountChildren);
                            }
                        }
                    }
                }
                if (patchFlag & 1) {
                    if (n1.children !== n2.children) {
                        hostSetElementText(el, n2.children);
                    }
                }
            } else if (!optimized && dynamicChildren == null) {
                patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
            }
            if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                    dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
                }, parentSuspense);
            }
        };
        var patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
            for (var i = 0; i < newChildren.length; i++) {
                var oldVNode = oldChildren[i];
                var newVNode = newChildren[i];
                var container = (
                    // oldVNode may be an errored async setup() component inside Suspense
                    // which will not have a mounted element
                    oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
                        // of the Fragment itself so it can move its children.
                        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
                            // which also requires the correct parent container
                            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
                            oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
                        // In other cases, the parent container is not actually used so we
                        // just pass the block element here to avoid a DOM parentNode call.
                        fallbackContainer
                    )
                );
                patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
            }
        };
        var patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
            if (oldProps !== newProps) {
                if (oldProps !== EMPTY_OBJ) {
                    for (var key in oldProps) {
                        if (!isReservedProp(key) && !(key in newProps)) {
                            hostPatchProp(el, key, oldProps[key], null, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                }
                for (var _key14 in newProps) {
                    if (isReservedProp(_key14))
                        continue;
                    var next = newProps[_key14];
                    var prev = oldProps[_key14];
                    if (next !== prev && _key14 !== "value" || hostForcePatchProp && hostForcePatchProp(el, _key14)) {
                        hostPatchProp(el, _key14, prev, next, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ("value" in newProps) {
                    hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
                }
            }
        };
        var processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("", container);
            var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("", container);
            var {
                patchFlag,
                dynamicChildren,
                slotScopeIds: fragmentSlotScopeIds
            } = n2;
            if (
            // #5523 dev root fragment may inherit directives
                isHmrUpdating || patchFlag & 2048
            ) {
                patchFlag = 0;
                optimized = false;
                dynamicChildren = null;
            }
            if (fragmentSlotScopeIds) {
                slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
            }
            if (n1 == null) {
                hostInsert(fragmentStartAnchor, container, anchor);
                hostInsert(fragmentEndAnchor, container, anchor);
                mountChildren(
                    // #10007
                    // such fragment like `<></>` will be compiled into
                    // a fragment which doesn't have a children.
                    // In this case fallback to an empty array
                    n2.children || [],
                    container,
                    fragmentEndAnchor,
                    parentComponent,
                    parentSuspense,
                    namespace,
                    slotScopeIds,
                    optimized
                );
            } else {
                if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
                    // of renderSlot() with no valid children
                n1.dynamicChildren) {
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
                    {
                        traverseStaticChildren(n1, n2);
                    }
                } else {
                    patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                }
            }
        };
        var processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            n2.slotScopeIds = slotScopeIds;
            if (n1 == null) {
                if (n2.shapeFlag & 512) {
                    parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
                } else {
                    mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
                }
            } else {
                updateComponent(n1, n2, optimized);
            }
        };
        var mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
            var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
            if (instance.type.__hmrId) {
                registerHMR(instance);
            }
            {
                pushWarningContext(initialVNode);
                startMeasure(instance, "mount");
            }
            if (isKeepAlive(initialVNode)) {
                instance.ctx.renderer = internals;
            }
            {
                {
                    startMeasure(instance, "init");
                }
                setupComponent(instance);
                {
                    endMeasure(instance, "init");
                }
            }
            if (instance.asyncDep) {
                parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
                if (!initialVNode.el) {
                    var placeholder = instance.subTree = createVNode(Comment);
                    processCommentNode(null, placeholder, container, anchor);
                }
            } else {
                setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
            }
            if (instance.$wxsModules) {
                var els = resolveOwnerEl(instance, true);
                if (els.length) {
                    els.forEach((el) => {
                        el.setAttribute(ATTR_V_OWNER_ID, instance.uid);
                        var {
                            $renderjsModules
                        } = instance.type;
                        $renderjsModules && el.setAttribute(ATTR_V_RENDERJS, $renderjsModules);
                    });
                }
            }
            {
                popWarningContext();
                endMeasure(instance, "mount");
            }
        };
        var updateComponent = (n1, n2, optimized) => {
            var instance = n2.component = n1.component;
            if (shouldUpdateComponent(n1, n2, optimized)) {
                if (instance.asyncDep && !instance.asyncResolved) {
                    {
                        pushWarningContext(n2);
                    }
                    updateComponentPreRender(instance, n2, optimized);
                    {
                        popWarningContext();
                    }
                    return;
                } else {
                    instance.next = n2;
                    invalidateJob(instance.update);
                    instance.effect.dirty = true;
                    instance.update();
                }
            } else {
                n2.el = n1.el;
                instance.vnode = n2;
            }
        };
        var setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
            var componentUpdateFn = () => {
                if (!instance.isMounted) {
                    var vnodeHook;
                    var {
                        el,
                        props
                    } = initialVNode;
                    var {
                        bm,
                        m,
                        parent
                    } = instance;
                    var isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
                    toggleRecurse(instance, false);
                    if (bm) {
                        invokeArrayFns(bm);
                    }
                    if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
                        invokeVNodeHook(vnodeHook, parent, initialVNode);
                    }
                    toggleRecurse(instance, true);
                    if (el && hydrateNode) {
                        var hydrateSubTree = () => {
                            {
                                startMeasure(instance, "render");
                            }
                            instance.subTree = renderComponentRoot(instance);
                            {
                                endMeasure(instance, "render");
                            }
                            {
                                startMeasure(instance, "hydrate");
                            }
                            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
                            {
                                endMeasure(instance, "hydrate");
                            }
                        };
                        if (isAsyncWrapperVNode) {
                            initialVNode.type.__asyncLoader().then(
                                // note: we are moving the render call into an async callback,
                                // which means it won't track dependencies - but it's ok because
                                // a server-rendered async wrapper is already in resolved state
                                // and it will never need to change.
                                () => !instance.isUnmounted && hydrateSubTree()
                            );
                        } else {
                            hydrateSubTree();
                        }
                    } else {
                        {
                            startMeasure(instance, "render");
                        }
                        var subTree = instance.subTree = renderComponentRoot(instance);
                        {
                            endMeasure(instance, "render");
                        }
                        {
                            startMeasure(instance, "patch");
                        }
                        patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
                        {
                            endMeasure(instance, "patch");
                        }
                        initialVNode.el = subTree.el;
                    }
                    if (m) {
                        queuePostRenderEffect(m, parentSuspense);
                    }
                    if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
                        var scopedInitialVNode = initialVNode;
                        queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
                    }
                    if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
                        instance.a && queuePostRenderEffect(instance.a, parentSuspense);
                    }
                    instance.isMounted = true;
                    {
                        devtoolsComponentAdded(instance);
                    }
                    initialVNode = container = anchor = null;
                } else {
                    var {
                        next,
                        bu,
                        u,
                        parent: _parent,
                        vnode
                    } = instance;
                    {
                        var nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
                        if (nonHydratedAsyncRoot) {
                            if (next) {
                                next.el = vnode.el;
                                updateComponentPreRender(instance, next, optimized);
                            }
                            nonHydratedAsyncRoot.asyncDep.then(() => {
                                if (!instance.isUnmounted) {
                                    componentUpdateFn();
                                }
                            });
                            return;
                        }
                    }
                    var originNext = next;
                    var _vnodeHook;
                    {
                        pushWarningContext(next || instance.vnode);
                    }
                    toggleRecurse(instance, false);
                    if (next) {
                        next.el = vnode.el;
                        updateComponentPreRender(instance, next, optimized);
                    } else {
                        next = vnode;
                    }
                    if (bu) {
                        invokeArrayFns(bu);
                    }
                    if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
                        invokeVNodeHook(_vnodeHook, _parent, next, vnode);
                    }
                    toggleRecurse(instance, true);
                    {
                        startMeasure(instance, "render");
                    }
                    var nextTree = renderComponentRoot(instance);
                    {
                        endMeasure(instance, "render");
                    }
                    var prevTree = instance.subTree;
                    instance.subTree = nextTree;
                    {
                        startMeasure(instance, "patch");
                    }
                    patch(
                        prevTree,
                        nextTree,
                        // parent may have changed if it's in a teleport
                        hostParentNode(prevTree.el),
                        // anchor may have changed if it's in a fragment
                        getNextHostNode(prevTree),
                        instance,
                        parentSuspense,
                        namespace
                    );
                    {
                        endMeasure(instance, "patch");
                    }
                    next.el = nextTree.el;
                    if (originNext === null) {
                        updateHOCHostEl(instance, nextTree.el);
                    }
                    if (u) {
                        queuePostRenderEffect(u, parentSuspense);
                    }
                    if (_vnodeHook = next.props && next.props.onVnodeUpdated) {
                        queuePostRenderEffect(() => invokeVNodeHook(_vnodeHook, _parent, next, vnode), parentSuspense);
                    }
                    {
                        devtoolsComponentUpdated(instance);
                    }
                    {
                        popWarningContext();
                    }
                }
            };
            var effect2 = instance.effect = new ReactiveEffect(
                componentUpdateFn,
                NOOP,
                () => queueJob(update),
                instance.scope
                // track it in component's effect scope
            );
            var update = instance.update = () => {
                if (effect2.dirty) {
                    effect2.run();
                }
            };
            update.id = instance.uid;
            toggleRecurse(instance, true);
            {
                effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
                effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
                update.ownerInstance = instance;
            }
            update();
        };
        var updateComponentPreRender = (instance, nextVNode, optimized) => {
            nextVNode.component = instance;
            var prevProps = instance.vnode.props;
            instance.vnode = nextVNode;
            instance.next = null;
            updateProps(instance, nextVNode.props, prevProps, optimized);
            updateSlots(instance, nextVNode.children, optimized);
            pauseTracking();
            flushPreFlushCbs(instance);
            resetTracking();
        };
        var patchChildren = function(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds) {
            var optimized = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : false;
            var c1 = n1 && n1.children;
            var prevShapeFlag = n1 ? n1.shapeFlag : 0;
            var c2 = n2.children;
            var {
                patchFlag,
                shapeFlag
            } = n2;
            if (patchFlag > 0) {
                if (patchFlag & 128) {
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    return;
                } else if (patchFlag & 256) {
                    patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    return;
                }
            }
            if (shapeFlag & 8) {
                if (prevShapeFlag & 16) {
                    unmountChildren(c1, parentComponent, parentSuspense);
                }
                if (c2 !== c1) {
                    hostSetElementText(container, c2);
                }
            } else {
                if (prevShapeFlag & 16) {
                    if (shapeFlag & 16) {
                        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    } else {
                        unmountChildren(c1, parentComponent, parentSuspense, true);
                    }
                } else {
                    if (prevShapeFlag & 8) {
                        hostSetElementText(container, "");
                    }
                    if (shapeFlag & 16) {
                        mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    }
                }
            }
        };
        var patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            c1 = c1 || EMPTY_ARR;
            c2 = c2 || EMPTY_ARR;
            var oldLength = c1.length;
            var newLength = c2.length;
            var commonLength = Math.min(oldLength, newLength);
            var i;
            for (i = 0; i < commonLength; i++) {
                var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            }
            if (oldLength > newLength) {
                unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
            } else {
                mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
            }
        };
        var patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
            var i = 0;
            var l2 = c2.length;
            var e1 = c1.length - 1;
            var e2 = l2 - 1;
            while (i <= e1 && i <= e2) {
                var n1 = c1[i];
                var n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                if (isSameVNodeType(n1, n2)) {
                    patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                } else {
                    break;
                }
                i++;
            }
            while (i <= e1 && i <= e2) {
                var _n = c1[e1];
                var _n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
                if (isSameVNodeType(_n, _n2)) {
                    patch(_n, _n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                } else {
                    break;
                }
                e1--;
                e2--;
            }
            if (i > e1) {
                if (i <= e2) {
                    var nextPos = e2 + 1;
                    var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                    while (i <= e2) {
                        patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        i++;
                    }
                }
            } else if (i > e2) {
                while (i <= e1) {
                    unmount(c1[i], parentComponent, parentSuspense, true);
                    i++;
                }
            } else {
                var s1 = i;
                var s2 = i;
                var keyToNewIndexMap = /* @__PURE__ */ new Map();
                for (i = s2; i <= e2; i++) {
                    var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
                    if (nextChild.key != null) {
                        if (keyToNewIndexMap.has(nextChild.key)) {
                            warn$1("Duplicate keys found during update:", JSON.stringify(nextChild.key), "Make sure keys are unique.");
                        }
                        keyToNewIndexMap.set(nextChild.key, i);
                    }
                }
                var j;
                var patched = 0;
                var toBePatched = e2 - s2 + 1;
                var moved = false;
                var maxNewIndexSoFar = 0;
                var newIndexToOldIndexMap = new Array(toBePatched);
                for (i = 0; i < toBePatched; i++) {
                    newIndexToOldIndexMap[i] = 0;
                }
                for (i = s1; i <= e1; i++) {
                    var prevChild = c1[i];
                    if (patched >= toBePatched) {
                        unmount(prevChild, parentComponent, parentSuspense, true);
                        continue;
                    }
                    var newIndex = void 0;
                    if (prevChild.key != null) {
                        newIndex = keyToNewIndexMap.get(prevChild.key);
                    } else {
                        for (j = s2; j <= e2; j++) {
                            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                                newIndex = j;
                                break;
                            }
                        }
                    }
                    if (newIndex === void 0) {
                        unmount(prevChild, parentComponent, parentSuspense, true);
                    } else {
                        newIndexToOldIndexMap[newIndex - s2] = i + 1;
                        if (newIndex >= maxNewIndexSoFar) {
                            maxNewIndexSoFar = newIndex;
                        } else {
                            moved = true;
                        }
                        patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                        patched++;
                    }
                }
                var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
                j = increasingNewIndexSequence.length - 1;
                for (i = toBePatched - 1; i >= 0; i--) {
                    var nextIndex = s2 + i;
                    var _nextChild = c2[nextIndex];
                    var _anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                    if (newIndexToOldIndexMap[i] === 0) {
                        patch(null, _nextChild, container, _anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    } else if (moved) {
                        if (j < 0 || i !== increasingNewIndexSequence[j]) {
                            move(_nextChild, container, _anchor, 2);
                        } else {
                            j--;
                        }
                    }
                }
            }
        };
        var move = function(vnode, container, anchor, moveType) {
            var parentSuspense = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
            var {
                el,
                type,
                transition,
                children,
                shapeFlag
            } = vnode;
            if (shapeFlag & 6) {
                move(vnode.component.subTree, container, anchor, moveType);
                return;
            }
            if (shapeFlag & 128) {
                vnode.suspense.move(container, anchor, moveType);
                return;
            }
            if (shapeFlag & 64) {
                type.move(vnode, container, anchor, internals);
                return;
            }
            if (type === Fragment) {
                hostInsert(el, container, anchor);
                for (var i = 0; i < children.length; i++) {
                    move(children[i], container, anchor, moveType);
                }
                hostInsert(vnode.anchor, container, anchor);
                return;
            }
            if (type === Static) {
                moveStaticNode(vnode, container, anchor);
                return;
            }
            var needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
            if (needTransition2) {
                if (moveType === 0) {
                    transition.beforeEnter(el);
                    hostInsert(el, container, anchor);
                    queuePostRenderEffect(() => transition.enter(el), parentSuspense);
                } else {
                    var {
                        leave,
                        delayLeave,
                        afterLeave
                    } = transition;
                    var remove22 = () => hostInsert(el, container, anchor);
                    var performLeave = () => {
                        leave(el, () => {
                            remove22();
                            afterLeave && afterLeave();
                        });
                    };
                    if (delayLeave) {
                        delayLeave(el, remove22, performLeave);
                    } else {
                        performLeave();
                    }
                }
            } else {
                hostInsert(el, container, anchor);
            }
        };
        var unmount = function(vnode, parentComponent, parentSuspense) {
            var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
            var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
            var {
                type,
                props,
                ref: ref2,
                children,
                dynamicChildren,
                shapeFlag,
                patchFlag,
                dirs
            } = vnode;
            if (ref2 != null) {
                setRef(ref2, null, parentSuspense, vnode, true);
            }
            if (shapeFlag & 256) {
                parentComponent.ctx.deactivate(vnode);
                return;
            }
            var shouldInvokeDirs = shapeFlag & 1 && dirs;
            var shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
            var vnodeHook;
            if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
                invokeVNodeHook(vnodeHook, parentComponent, vnode);
            }
            if (shapeFlag & 6) {
                unmountComponent(vnode.component, parentSuspense, doRemove);
            } else {
                if (shapeFlag & 128) {
                    vnode.suspense.unmount(parentSuspense, doRemove);
                    return;
                }
                if (shouldInvokeDirs) {
                    invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
                }
                if (shapeFlag & 64) {
                    vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
                } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
                    (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
                    unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
                } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
                    unmountChildren(children, parentComponent, parentSuspense);
                }
                if (doRemove) {
                    remove2(vnode);
                }
            }
            if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
                queuePostRenderEffect(() => {
                    vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                    shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
                }, parentSuspense);
            }
        };
        var remove2 = (vnode) => {
            var {
                type,
                el,
                anchor,
                transition
            } = vnode;
            if (type === Fragment) {
                if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
                    vnode.children.forEach((child) => {
                        if (child.type === Comment) {
                            hostRemove(child.el);
                        } else {
                            remove2(child);
                        }
                    });
                } else {
                    removeFragment(el, anchor);
                }
                return;
            }
            if (type === Static) {
                removeStaticNode(vnode);
                return;
            }
            var performRemove = () => {
                hostRemove(el);
                if (transition && !transition.persisted && transition.afterLeave) {
                    transition.afterLeave();
                }
            };
            if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
                var {
                    leave,
                    delayLeave
                } = transition;
                var performLeave = () => leave(el, performRemove);
                if (delayLeave) {
                    delayLeave(vnode.el, performRemove, performLeave);
                } else {
                    performLeave();
                }
            } else {
                performRemove();
            }
        };
        var removeFragment = (cur, end) => {
            var next;
            while (cur !== end) {
                next = hostNextSibling(cur);
                hostRemove(cur);
                cur = next;
            }
            hostRemove(end);
        };
        var unmountComponent = (instance, parentSuspense, doRemove) => {
            if (instance.type.__hmrId) {
                unregisterHMR(instance);
            }
            var {
                bum,
                scope,
                update,
                subTree,
                um
            } = instance;
            if (bum) {
                invokeArrayFns(bum);
            }
            scope.stop();
            if (update) {
                update.active = false;
                unmount(subTree, instance, parentSuspense, doRemove);
            }
            if (um) {
                queuePostRenderEffect(um, parentSuspense);
            }
            queuePostRenderEffect(() => {
                instance.isUnmounted = true;
            }, parentSuspense);
            if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
                parentSuspense.deps--;
                if (parentSuspense.deps === 0) {
                    parentSuspense.resolve();
                }
            }
            {
                devtoolsComponentRemoved(instance);
            }
        };
        var unmountChildren = function(children, parentComponent, parentSuspense) {
            var doRemove = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
            var optimized = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
            var start = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
            for (var i = start; i < children.length; i++) {
                unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
            }
        };
        var getNextHostNode = (vnode) => {
            if (vnode.shapeFlag & 6) {
                return getNextHostNode(vnode.component.subTree);
            }
            if (vnode.shapeFlag & 128) {
                return vnode.suspense.next();
            }
            return hostNextSibling(vnode.anchor || vnode.el);
        };
        var isFlushing2 = false;
        var render2 = (vnode, container, namespace) => {
            if (vnode == null) {
                if (container._vnode) {
                    unmount(container._vnode, null, null, true);
                }
            } else {
                patch(container._vnode || null, vnode, container, null, null, null, namespace);
            }
            if (!isFlushing2) {
                isFlushing2 = true;
                flushPreFlushCbs();
                flushPostFlushCbs();
                isFlushing2 = false;
            }
            container._vnode = vnode;
        };
        var internals = {
            p: patch,
            um: unmount,
            m: move,
            r: remove2,
            mt: mountComponent,
            mc: mountChildren,
            pc: patchChildren,
            pbc: patchBlockChildren,
            n: getNextHostNode,
            o: options
        };
        var hydrate;
        var hydrateNode;
        if (createHydrationFns) {
            [hydrate, hydrateNode] = createHydrationFns(internals);
        }
        return {
            render: render2,
            hydrate,
            createApp: createAppAPI(render2, hydrate)
        };
    }
    function resolveChildrenNamespace(_ref14, currentNamespace) {
        var {
            type,
            props
        } = _ref14;
        return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
    }
    function toggleRecurse(_ref15, allowed) {
        var {
            effect: effect2,
            update
        } = _ref15;
        effect2.allowRecurse = update.allowRecurse = allowed;
    }
    function needTransition(parentSuspense, transition) {
        return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    }
    function traverseStaticChildren(n1, n2) {
        var shallow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var ch1 = n1.children;
        var ch2 = n2.children;
        if (isArray(ch1) && isArray(ch2)) {
            for (var i = 0; i < ch1.length; i++) {
                var c1 = ch1[i];
                var c2 = ch2[i];
                if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
                    if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
                        c2 = ch2[i] = cloneIfMounted(ch2[i]);
                        c2.el = c1.el;
                    }
                    if (!shallow)
                        traverseStaticChildren(c1, c2);
                }
                if (c2.type === Text) {
                    c2.el = c1.el;
                }
                if (c2.type === Comment && !c2.el) {
                    c2.el = c1.el;
                }
            }
        }
    }
    function getSequence(arr) {
        var p = arr.slice();
        var result = [0];
        var i, j, u, v, c2;
        var len = arr.length;
        for (i = 0; i < len; i++) {
            var arrI = arr[i];
            if (arrI !== 0) {
                j = result[result.length - 1];
                if (arr[j] < arrI) {
                    p[i] = j;
                    result.push(i);
                    continue;
                }
                u = 0;
                v = result.length - 1;
                while (u < v) {
                    c2 = u + v >> 1;
                    if (arr[result[c2]] < arrI) {
                        u = c2 + 1;
                    } else {
                        v = c2;
                    }
                }
                if (arrI < arr[result[u]]) {
                    if (u > 0) {
                        p[i] = result[u - 1];
                    }
                    result[u] = i;
                }
            }
        }
        u = result.length;
        v = result[u - 1];
        while (u-- > 0) {
            result[u] = v;
            v = p[v];
        }
        return result;
    }
    function locateNonHydratedAsyncRoot(instance) {
        var subComponent = instance.subTree.component;
        if (subComponent) {
            if (subComponent.asyncDep && !subComponent.asyncResolved) {
                return subComponent;
            } else {
                return locateNonHydratedAsyncRoot(subComponent);
            }
        }
    }
    var isTeleport = (type) => type.__isTeleport;
    var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
    var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
    var isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
    var resolveTarget = (props, select) => {
        var targetSelector = props && props.to;
        if (isString(targetSelector)) {
            if (!select) {
                warn$1("Current renderer does not support string target for Teleports. (missing querySelector renderer option)");
                return null;
            } else {
                var target = select(targetSelector);
                if (!target) {
                    warn$1('Failed to locate Teleport target with selector "'.concat(targetSelector, '". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.'));
                }
                return target;
            }
        } else {
            if (!targetSelector && !isTeleportDisabled(props)) {
                warn$1("Invalid Teleport target: ".concat(targetSelector));
            }
            return targetSelector;
        }
    };
    var TeleportImpl = {
        name: "Teleport",
        __isTeleport: true,
        process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
            var {
                mc: mountChildren,
                pc: patchChildren,
                pbc: patchBlockChildren,
                o: {
                    insert,
                    querySelector,
                    createText,
                    createComment: createComment2
                }
            } = internals;
            var disabled = isTeleportDisabled(n2.props);
            var {
                shapeFlag,
                children,
                dynamicChildren
            } = n2;
            if (isHmrUpdating) {
                optimized = false;
                dynamicChildren = null;
            }
            if (n1 == null) {
                var placeholder = n2.el = createComment2("teleport start", container);
                var mainAnchor = n2.anchor = createComment2("teleport end", container);
                insert(placeholder, container, anchor);
                insert(mainAnchor, container, anchor);
                var target = n2.target = resolveTarget(n2.props, querySelector);
                var targetAnchor = n2.targetAnchor = createText("", container);
                if (target) {
                    insert(targetAnchor, target);
                    if (namespace === "svg" || isTargetSVG(target)) {
                        namespace = "svg";
                    } else if (namespace === "mathml" || isTargetMathML(target)) {
                        namespace = "mathml";
                    }
                } else if (!disabled) {
                    warn$1("Invalid Teleport target on mount:", target, "(".concat(typeof target, ")"));
                }
                var mount = (container2, anchor2) => {
                    if (shapeFlag & 16) {
                        mountChildren(children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
                    }
                };
                if (disabled) {
                    mount(container, mainAnchor);
                } else if (target) {
                    mount(target, targetAnchor);
                }
            } else {
                n2.el = n1.el;
                var _mainAnchor = n2.anchor = n1.anchor;
                var _target = n2.target = n1.target;
                var _targetAnchor = n2.targetAnchor = n1.targetAnchor;
                var wasDisabled = isTeleportDisabled(n1.props);
                var currentContainer = wasDisabled ? container : _target;
                var currentAnchor = wasDisabled ? _mainAnchor : _targetAnchor;
                if (namespace === "svg" || isTargetSVG(_target)) {
                    namespace = "svg";
                } else if (namespace === "mathml" || isTargetMathML(_target)) {
                    namespace = "mathml";
                }
                if (dynamicChildren) {
                    patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
                    traverseStaticChildren(n1, n2, true);
                } else if (!optimized) {
                    patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
                }
                if (disabled) {
                    if (!wasDisabled) {
                        moveTeleport(n2, container, _mainAnchor, internals, 1);
                    } else {
                        if (n2.props && n1.props && n2.props.to !== n1.props.to) {
                            n2.props.to = n1.props.to;
                        }
                    }
                } else {
                    if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                        var nextTarget = n2.target = resolveTarget(n2.props, querySelector);
                        if (nextTarget) {
                            moveTeleport(n2, nextTarget, null, internals, 0);
                        } else {
                            warn$1("Invalid Teleport target on update:", _target, "(".concat(typeof _target, ")"));
                        }
                    } else if (wasDisabled) {
                        moveTeleport(n2, _target, _targetAnchor, internals, 1);
                    }
                }
            }
            updateCssVars(n2);
        },
        remove(vnode, parentComponent, parentSuspense, optimized, _ref16, doRemove) {
            var {
                um: unmount,
                o: {
                    remove: hostRemove
                }
            } = _ref16;
            var {
                shapeFlag,
                children,
                anchor,
                targetAnchor,
                target,
                props
            } = vnode;
            if (target) {
                hostRemove(targetAnchor);
            }
            doRemove && hostRemove(anchor);
            if (shapeFlag & 16) {
                var shouldRemove = doRemove || !isTeleportDisabled(props);
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
                }
            }
        },
        move: moveTeleport,
        hydrate: hydrateTeleport
    };
    function moveTeleport(vnode, container, parentAnchor, _ref17) {
        var {
            o: {
                insert
            },
            m: move
        } = _ref17;
        var moveType = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 2;
        if (moveType === 0) {
            insert(vnode.targetAnchor, container, parentAnchor);
        }
        var {
            el,
            anchor,
            shapeFlag,
            children,
            props
        } = vnode;
        var isReorder = moveType === 2;
        if (isReorder) {
            insert(el, container, parentAnchor);
        }
        if (!isReorder || isTeleportDisabled(props)) {
            if (shapeFlag & 16) {
                for (var i = 0; i < children.length; i++) {
                    move(children[i], container, parentAnchor, 2);
                }
            }
        }
        if (isReorder) {
            insert(anchor, container, parentAnchor);
        }
    }
    function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, _ref18, hydrateChildren) {
        var {
            o: {
                nextSibling,
                parentNode,
                querySelector
            }
        } = _ref18;
        var target = vnode.target = resolveTarget(vnode.props, querySelector);
        if (target) {
            var targetNode = target._lpa || target.firstChild;
            if (vnode.shapeFlag & 16) {
                if (isTeleportDisabled(vnode.props)) {
                    vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
                    vnode.targetAnchor = targetNode;
                } else {
                    vnode.anchor = nextSibling(node);
                    var targetAnchor = targetNode;
                    while (targetAnchor) {
                        targetAnchor = nextSibling(targetAnchor);
                        if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
                            vnode.targetAnchor = targetAnchor;
                            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
                            break;
                        }
                    }
                    hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
                }
            }
            updateCssVars(vnode);
        }
        return vnode.anchor && nextSibling(vnode.anchor);
    }
    var Teleport = TeleportImpl;
    function updateCssVars(vnode) {
        var ctx = vnode.ctx;
        if (ctx && ctx.ut) {
            var node = vnode.children[0].el;
            while (node && node !== vnode.targetAnchor) {
                if (node.nodeType === 1)
                    node.setAttribute("data-v-owner", ctx.uid);
                node = node.nextSibling;
            }
            ctx.ut();
        }
    }
    var Fragment = Symbol.for("v-fgt");
    var Text = Symbol.for("v-txt");
    var Comment = Symbol.for("v-cmt");
    var Static = Symbol.for("v-stc");
    var blockStack = [];
    var currentBlock = null;
    function openBlock() {
        var disableTracking = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
        blockStack.pop();
        currentBlock = blockStack[blockStack.length - 1] || null;
    }
    var isBlockTreeEnabled = 1;
    function setBlockTracking(value) {
        isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
        vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
        closeBlock();
        if (isBlockTreeEnabled > 0 && currentBlock) {
            currentBlock.push(vnode);
        }
        return vnode;
    }
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
        return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
    }
    function createBlock(type, props, children, patchFlag, dynamicProps) {
        return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
    }
    function isVNode(value) {
        return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
        if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
            n1.shapeFlag &= ~256;
            n2.shapeFlag &= ~512;
            return false;
        }
        return n1.type === n2.type && n1.key === n2.key;
    }
    var vnodeArgsTransformer;
    function transformVNodeArgs(transformer) {
        vnodeArgsTransformer = transformer;
    }
    var createVNodeWithArgsTransform = function() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key15 = 0; _key15 < _len7; _key15++) {
            args[_key15] = arguments[_key15];
        }
        return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
    };
    var InternalObjectKey = "__vInternal";
    var normalizeKey = (_ref19) => {
        var {
            key
        } = _ref19;
        return key != null ? key : null;
    };
    var normalizeRef = (_ref20) => {
        var {
            ref: ref2,
            ref_key,
            ref_for
        } = _ref20;
        if (typeof ref2 === "number") {
            ref2 = "" + ref2;
        }
        return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? {
            i: currentRenderingInstance,
            r: ref2,
            k: ref_key,
            f: !!ref_for
        } : ref2 : null;
    };
    function createBaseVNode(type) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var children = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var patchFlag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        var dynamicProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
        var shapeFlag = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : type === Fragment ? 0 : 1;
        var isBlockNode = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false;
        var needFullChildrenNormalization = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : false;
        var vnode = {
            __v_isVNode: true,
            __v_skip: true,
            type,
            props,
            key: props && normalizeKey(props),
            ref: props && normalizeRef(props),
            scopeId: currentScopeId,
            slotScopeIds: null,
            children,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag,
            patchFlag,
            dynamicProps,
            dynamicChildren: null,
            appContext: null,
            ctx: currentRenderingInstance
        };
        if (needFullChildrenNormalization) {
            normalizeChildren(vnode, children);
            if (shapeFlag & 128) {
                type.normalize(vnode);
            }
        } else if (children) {
            vnode.shapeFlag |= isString(children) ? 8 : 16;
        }
        if (vnode.key !== vnode.key) {
            warn$1("VNode created with invalid key (NaN). VNode type:", vnode.type);
        }
        if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
            !isBlockNode && // has current parent block
            currentBlock && // presence of a patch flag indicates this node needs patching on updates.
            // component nodes also should always be patched, because even if the
            // component doesn't need to update, it needs to persist the instance on to
            // the next vnode so that it can be properly unmounted later.
            (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
            // vnode should not be considered dynamic due to handler caching.
            vnode.patchFlag !== 32) {
            currentBlock.push(vnode);
        }
        return vnode;
    }
    var createVNode = createVNodeWithArgsTransform;
    function _createVNode(type) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var children = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        var patchFlag = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        var dynamicProps = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
        var isBlockNode = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : false;
        if (!type || type === NULL_DYNAMIC_COMPONENT) {
            if (!type) {
                warn$1("Invalid vnode type when creating vnode: ".concat(type, "."));
            }
            type = Comment;
        }
        if (isVNode(type)) {
            var cloned = cloneVNode(
                type,
                props,
                true
                /* mergeRef: true */
            );
            if (children) {
                normalizeChildren(cloned, children);
            }
            if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
                if (cloned.shapeFlag & 6) {
                    currentBlock[currentBlock.indexOf(type)] = cloned;
                } else {
                    currentBlock.push(cloned);
                }
            }
            cloned.patchFlag |= -2;
            return cloned;
        }
        if (isClassComponent(type)) {
            type = type.__vccOpts;
        }
        if (props) {
            props = guardReactiveProps(props);
            var {
                class: klass,
                style
            } = props;
            if (klass && !isString(klass)) {
                props.class = normalizeClass(klass);
            }
            if (isObject(style)) {
                if (isProxy(style) && !isArray(style)) {
                    style = extend({}, style);
                }
                props.style = normalizeStyle(style);
            }
        }
        var shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
        if (shapeFlag & 4 && isProxy(type)) {
            type = toRaw(type);
            warn$1("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", "\nComponent that was made reactive: ", type);
        }
        return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
        if (!props)
            return null;
        return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps) {
        var mergeRef = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var {
            props,
            ref: ref2,
            patchFlag,
            children
        } = vnode;
        var mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
        var cloned = {
            __v_isVNode: true,
            __v_skip: true,
            type: vnode.type,
            props: mergedProps,
            key: mergedProps && normalizeKey(mergedProps),
            ref: extraProps && extraProps.ref ? (
                // #2078 in the case of <component :is="vnode" ref="extra"/>
                // if the vnode itself already has a ref, cloneVNode will need to merge
                // the refs so the single vnode can be set on multiple refs
                mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
            ) : ref2,
            scopeId: vnode.scopeId,
            slotScopeIds: vnode.slotScopeIds,
            children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
            target: vnode.target,
            targetAnchor: vnode.targetAnchor,
            staticCount: vnode.staticCount,
            shapeFlag: vnode.shapeFlag,
            // if the vnode is cloned with extra props, we can no longer assume its
            // existing patch flag to be reliable and need to add the FULL_PROPS flag.
            // note: preserve flag for fragments since they use the flag for children
            // fast paths only.
            patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
            dynamicProps: vnode.dynamicProps,
            dynamicChildren: vnode.dynamicChildren,
            appContext: vnode.appContext,
            dirs: vnode.dirs,
            transition: vnode.transition,
            // These should technically only be non-null on mounted VNodes. However,
            // they *should* be copied for kept-alive vnodes. So we just always copy
            // them since them being non-null during a mount doesn't affect the logic as
            // they will simply be overwritten.
            component: vnode.component,
            suspense: vnode.suspense,
            ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
            ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
            el: vnode.el,
            anchor: vnode.anchor,
            ctx: vnode.ctx,
            ce: vnode.ce
        };
        return cloned;
    }
    function deepCloneVNode(vnode) {
        var cloned = cloneVNode(vnode);
        if (isArray(vnode.children)) {
            cloned.children = vnode.children.map(deepCloneVNode);
        }
        return cloned;
    }
    function createTextVNode() {
        var text = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : " ";
        var flag = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        return createVNode(Text, null, text, flag);
    }
    function createStaticVNode(content, numberOfNodes) {
        var vnode = createVNode(Static, null, content);
        vnode.staticCount = numberOfNodes;
        return vnode;
    }
    function createCommentVNode() {
        var text = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var asBlock = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
        if (child == null || typeof child === "boolean") {
            return createVNode(Comment);
        } else if (isArray(child)) {
            return createVNode(
                Fragment,
                null,
                // #3666, avoid reference pollution when reusing vnode
                child.slice()
            );
        } else if (typeof child === "object") {
            return cloneIfMounted(child);
        } else {
            return createVNode(Text, null, String(child));
        }
    }
    function cloneIfMounted(child) {
        return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
        var type = 0;
        var {
            shapeFlag
        } = vnode;
        if (children == null) {
            children = null;
        } else if (isArray(children)) {
            type = 16;
        } else if (typeof children === "object") {
            if (shapeFlag & (1 | 64)) {
                var slot = children.default;
                if (slot) {
                    slot._c && (slot._d = false);
                    normalizeChildren(vnode, slot());
                    slot._c && (slot._d = true);
                }
                return;
            } else {
                type = 32;
                var slotFlag = children._;
                if (!slotFlag && !(InternalObjectKey in children)) {
                    children._ctx = currentRenderingInstance;
                } else if (slotFlag === 3 && currentRenderingInstance) {
                    if (currentRenderingInstance.slots._ === 1) {
                        children._ = 1;
                    } else {
                        children._ = 2;
                        vnode.patchFlag |= 1024;
                    }
                }
            }
        } else if (isFunction(children)) {
            children = {
                default: children,
                _ctx: currentRenderingInstance
            };
            type = 32;
        } else {
            children = String(children);
            if (shapeFlag & 64) {
                type = 16;
                children = [createTextVNode(children)];
            } else {
                type = 8;
            }
        }
        vnode.children = children;
        vnode.shapeFlag |= type;
    }
    function mergeProps() {
        var ret = {};
        for (var i = 0; i < arguments.length; i++) {
            var toMerge = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            for (var key in toMerge) {
                if (key === "class") {
                    if (ret.class !== toMerge.class) {
                        ret.class = normalizeClass([ret.class, toMerge.class]);
                    }
                } else if (key === "style") {
                    ret.style = normalizeStyle([ret.style, toMerge.style]);
                } else if (isOn(key)) {
                    var existing = ret[key];
                    var incoming = toMerge[key];
                    if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
                        ret[key] = existing ? [].concat(existing, incoming) : incoming;
                    }
                } else if (key !== "") {
                    ret[key] = toMerge[key];
                }
            }
        }
        return ret;
    }
    function invokeVNodeHook(hook, instance, vnode) {
        var prevVNode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
        callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
    }
    var emptyAppContext = createAppContext();
    var uid = 0;
    function createComponentInstance(vnode, parent, suspense) {
        var type = vnode.type;
        var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
        var instance = {
            uid: uid++,
            vnode,
            type,
            parent,
            appContext,
            root: null,
            // to be immediately set
            next: null,
            subTree: null,
            // will be set synchronously right after creation
            effect: null,
            update: null,
            // will be set synchronously right after creation
            scope: new EffectScope(
                true
                /* detached */
            ),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: parent ? parent.provides : Object.create(appContext.provides),
            accessCache: null,
            renderCache: [],
            // local resolved assets
            components: null,
            directives: null,
            // resolved props and emits options
            propsOptions: normalizePropsOptions(type, appContext),
            emitsOptions: normalizeEmitsOptions(type, appContext),
            // emit
            emit: null,
            // to be set immediately
            emitted: null,
            // props default value
            propsDefaults: EMPTY_OBJ,
            // inheritAttrs
            inheritAttrs: type.inheritAttrs,
            // state
            ctx: EMPTY_OBJ,
            data: EMPTY_OBJ,
            props: EMPTY_OBJ,
            attrs: EMPTY_OBJ,
            slots: EMPTY_OBJ,
            refs: EMPTY_OBJ,
            setupState: EMPTY_OBJ,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            // suspense related
            suspense,
            suspenseId: suspense ? suspense.pendingId : 0,
            asyncDep: null,
            asyncResolved: false,
            // lifecycle hooks
            // not using enums here because it results in computed properties
            isMounted: false,
            isUnmounted: false,
            isDeactivated: false,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
        {
            instance.ctx = createDevRenderContext(instance);
        }
        instance.root = parent ? parent.root : instance;
        instance.emit = emit.bind(null, instance);
        if (vnode.ce) {
            vnode.ce(instance);
        }
        return instance;
    }
    var currentInstance = null;
    var getCurrentInstance = () => currentInstance || currentRenderingInstance;
    var internalSetCurrentInstance;
    var setInSSRSetupState;
    {
        g = getGlobalThis();
        registerGlobalSetter = (key, setter) => {
            var setters;
            if (!(setters = g[key]))
                setters = g[key] = [];
            setters.push(setter);
            return (v) => {
                if (setters.length > 1)
                    setters.forEach((set3) => set3(v));
                else
                    setters[0](v);
            };
        };
        internalSetCurrentInstance = registerGlobalSetter("__VUE_INSTANCE_SETTERS__", (v) => currentInstance = v);
        setInSSRSetupState = registerGlobalSetter("__VUE_SSR_SETTERS__", (v) => isInSSRComponentSetup = v);
    }
    var g;
    var registerGlobalSetter;
    var setCurrentInstance = (instance) => {
        var prev = currentInstance;
        internalSetCurrentInstance(instance);
        instance.scope.on();
        return () => {
            instance.scope.off();
            internalSetCurrentInstance(prev);
        };
    };
    var unsetCurrentInstance = () => {
        currentInstance && currentInstance.scope.off();
        internalSetCurrentInstance(null);
    };
    var isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
    function validateComponentName(name, _ref21) {
        var {
            isNativeTag
        } = _ref21;
        if (isBuiltInTag(name) || isNativeTag(name)) {
            warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
        }
    }
    function isStatefulComponent(instance) {
        return instance.vnode.shapeFlag & 4;
    }
    var isInSSRComponentSetup = false;
    function setupComponent(instance) {
        var isSSR = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        isSSR && setInSSRSetupState(isSSR);
        var {
            props,
            children
        } = instance.vnode;
        var isStateful = isStatefulComponent(instance);
        initProps(instance, props, isStateful, isSSR);
        initSlots(instance, children);
        var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
        isSSR && setInSSRSetupState(false);
        return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
        var _a;
        var Component = instance.type;
        {
            if (Component.name) {
                validateComponentName(Component.name, instance.appContext.config);
            }
            if (Component.components) {
                var names = Object.keys(Component.components);
                for (var i = 0; i < names.length; i++) {
                    validateComponentName(names[i], instance.appContext.config);
                }
            }
            if (Component.directives) {
                var _names = Object.keys(Component.directives);
                for (var _i4 = 0; _i4 < _names.length; _i4++) {
                    validateDirectiveName(_names[_i4]);
                }
            }
            if (Component.compilerOptions && isRuntimeOnly()) {
                warn$1('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
            }
        }
        instance.accessCache = /* @__PURE__ */ Object.create(null);
        instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
        {
            exposePropsOnRenderContext(instance);
        }
        var {
            setup: setup2
        } = Component;
        if (setup2) {
            var setupContext = instance.setupContext = setup2.length > 1 ? createSetupContext(instance) : null;
            var reset = setCurrentInstance(instance);
            pauseTracking();
            var setupResult = callWithErrorHandling(setup2, instance, 0, [shallowReadonly(instance.props), setupContext]);
            resetTracking();
            reset();
            if (isPromise(setupResult)) {
                setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
                if (isSSR) {
                    return setupResult.then((resolvedResult) => {
                        handleSetupResult(instance, resolvedResult, isSSR);
                    }).catch((e) => {
                        handleError(e, instance, 0);
                    });
                } else {
                    instance.asyncDep = setupResult;
                    if (!instance.suspense) {
                        var name = (_a = Component.name) != null ? _a : "Anonymous";
                        warn$1("Component <".concat(name, ">: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered."));
                    }
                }
            } else {
                handleSetupResult(instance, setupResult, isSSR);
            }
        } else {
            finishComponentSetup(instance, isSSR);
        }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
        if (isFunction(setupResult)) {
            if (instance.type.__ssrInlineRender) {
                instance.ssrRender = setupResult;
            } else {
                instance.render = setupResult;
            }
        } else if (isObject(setupResult)) {
            if (isVNode(setupResult)) {
                warn$1("setup() should not return VNodes directly - return a render function instead.");
            }
            {
                instance.devtoolsRawSetupState = setupResult;
            }
            instance.setupState = proxyRefs(setupResult);
            {
                exposeSetupStateOnRenderContext(instance);
            }
        } else if (setupResult !== void 0) {
            warn$1("setup() should return an object. Received: ".concat(setupResult === null ? "null" : typeof setupResult));
        }
        finishComponentSetup(instance, isSSR);
    }
    var compile;
    var installWithProxy;
    function registerRuntimeCompiler(_compile) {
        compile = _compile;
        installWithProxy = (i) => {
            if (i.render._rc) {
                i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
            }
        };
    }
    var isRuntimeOnly = () => !compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
        var Component = instance.type;
        if (!instance.render) {
            if (!isSSR && compile && !Component.render) {
                var template = Component.template || resolveMergedOptions(instance).template;
                if (template) {
                    {
                        startMeasure(instance, "compile");
                    }
                    var {
                        isCustomElement,
                        compilerOptions
                    } = instance.appContext.config;
                    var {
                        delimiters,
                        compilerOptions: componentCompilerOptions
                    } = Component;
                    var finalCompilerOptions = extend(extend({
                        isCustomElement,
                        delimiters
                    }, compilerOptions), componentCompilerOptions);
                    Component.render = compile(template, finalCompilerOptions);
                    {
                        endMeasure(instance, "compile");
                    }
                }
            }
            instance.render = Component.render || NOOP;
            if (installWithProxy) {
                installWithProxy(instance);
            }
        }
        {
            var reset = setCurrentInstance(instance);
            pauseTracking();
            try {
                applyOptions(instance);
            } finally {
                resetTracking();
                reset();
            }
        }
        if (!Component.render && instance.render === NOOP && !isSSR) {
            if (!compile && Component.template) {
                warn$1('Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".');
            } else {
                warn$1("Component is missing template or render function.");
            }
        }
    }
    function getAttrsProxy(instance) {
        return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, {
            get(target, key) {
                markAttrsAccessed();
                track(instance, "get", "$attrs");
                return target[key];
            },
            set() {
                warn$1("setupContext.attrs is readonly.");
                return false;
            },
            deleteProperty() {
                warn$1("setupContext.attrs is readonly.");
                return false;
            }
        }));
    }
    function getSlotsProxy(instance) {
        return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
            get(target, key) {
                track(instance, "get", "$slots");
                return target[key];
            }
        }));
    }
    function createSetupContext(instance) {
        var expose = (exposed) => {
            {
                if (instance.exposed) {
                    warn$1("expose() should be called only once per setup().");
                }
                if (exposed != null) {
                    var exposedType = typeof exposed;
                    if (exposedType === "object") {
                        if (isArray(exposed)) {
                            exposedType = "array";
                        } else if (isRef(exposed)) {
                            exposedType = "ref";
                        }
                    }
                    if (exposedType !== "object") {
                        warn$1("expose() should be passed a plain object, received ".concat(exposedType, "."));
                    }
                }
            }
            instance.exposed = exposed || {};
        };
        {
            return Object.freeze({
                get attrs() {
                    return getAttrsProxy(instance);
                },
                get slots() {
                    return getSlotsProxy(instance);
                },
                get emit() {
                    return function(event) {
                        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key16 = 1; _key16 < _len8; _key16++) {
                            args[_key16 - 1] = arguments[_key16];
                        }
                        return instance.emit(event, ...args);
                    };
                },
                expose
            });
        }
    }
    function getExposeProxy(instance) {
        if (instance.exposed) {
            return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                get(target, key) {
                    if (key in target) {
                        return target[key];
                    } else if (key in publicPropertiesMap) {
                        return publicPropertiesMap[key](instance);
                    } else if (key === "$scope") {
                        return instance.ctx.$scope;
                    }
                },
                has(target, key) {
                    return key in target || key in publicPropertiesMap || key === "$scope";
                }
            }));
        }
    }
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
    function getComponentName(Component) {
        var includeInferred = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
    }
    function formatComponentName(instance, Component) {
        var isRoot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        var name = getComponentName(Component);
        if (!name && Component.__file) {
            var match = Component.__file.match(/([^/\\]+)\.\w+$/);
            if (match) {
                name = match[1];
            }
        }
        if (!name && instance && instance.parent) {
            var inferFromRegistry = (registry) => {
                for (var key in registry) {
                    if (registry[key] === Component) {
                        return key;
                    }
                }
            };
            name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
        }
        return name ? classify(name) : isRoot ? "App" : "Anonymous";
    }
    function isClassComponent(value) {
        return isFunction(value) && "__vccOpts" in value;
    }
    var computed2 = (getterOrOptions, debugOptions) => {
        var c2 = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
        {
            var i = getCurrentInstance();
            if (i && i.appContext.config.warnRecursiveComputed) {
                c2._warnRecursive = true;
            }
        }
        return c2;
    };
    function useModel(props, name) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EMPTY_OBJ;
        var i = getCurrentInstance();
        if (!i) {
            warn$1("useModel() called without active instance.");
            return ref();
        }
        if (!i.propsOptions[0][name]) {
            warn$1('useModel() called with prop "'.concat(name, '" which is not declared.'));
            return ref();
        }
        var camelizedName = camelize(name);
        var hyphenatedName = hyphenate(name);
        var res = customRef((track2, trigger2) => {
            var localValue;
            watchSyncEffect(() => {
                var propValue = props[name];
                if (hasChanged(localValue, propValue)) {
                    localValue = propValue;
                    trigger2();
                }
            });
            return {
                get() {
                    track2();
                    return options.get ? options.get(localValue) : localValue;
                },
                set(value) {
                    var rawProps = i.vnode.props;
                    if (!(rawProps && // check if parent has passed v-model
                        (name in rawProps || camelizedName in rawProps || hyphenatedName in rawProps) && ("onUpdate:".concat(name) in rawProps || "onUpdate:".concat(camelizedName) in rawProps || "onUpdate:".concat(hyphenatedName) in rawProps)) && hasChanged(value, localValue)) {
                        localValue = value;
                        trigger2();
                    }
                    i.emit("update:".concat(name), options.set ? options.set(value) : value);
                }
            };
        });
        var modifierKey = name === "modelValue" ? "modelModifiers" : "".concat(name, "Modifiers");
        res[Symbol.iterator] = () => {
            var i2 = 0;
            return {
                next() {
                    if (i2 < 2) {
                        return {
                            value: i2++ ? props[modifierKey] || {} : res,
                            done: false
                        };
                    } else {
                        return {
                            done: true
                        };
                    }
                }
            };
        };
        return res;
    }
    function h(type, propsOrChildren, children) {
        var l = arguments.length;
        if (l === 2) {
            if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
                if (isVNode(propsOrChildren)) {
                    return createVNode(type, null, [propsOrChildren]);
                }
                return createVNode(type, propsOrChildren);
            } else {
                return createVNode(type, null, propsOrChildren);
            }
        } else {
            if (l > 3) {
                children = Array.prototype.slice.call(arguments, 2);
            } else if (l === 3 && isVNode(children)) {
                children = [children];
            }
            return createVNode(type, propsOrChildren, children);
        }
    }
    function initCustomFormatter() {
        if (typeof window === "undefined") {
            return;
        }
        var vueStyle = {
            style: "color:#3ba776"
        };
        var numberStyle = {
            style: "color:#1677ff"
        };
        var stringStyle = {
            style: "color:#f5222d"
        };
        var keywordStyle = {
            style: "color:#eb2f96"
        };
        var formatter = {
            header(obj) {
                if (!isObject(obj)) {
                    return null;
                }
                if (obj.__isVue) {
                    return ["div", vueStyle, "VueInstance"];
                } else if (isRef(obj)) {
                    return ["div", {}, ["span", vueStyle, genRefFlag(obj)], "<", formatValue(obj.value), ">"];
                } else if (isReactive(obj)) {
                    return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"], "<", formatValue(obj), ">".concat(isReadonly(obj) ? " (readonly)" : "")];
                } else if (isReadonly(obj)) {
                    return ["div", {}, ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"], "<", formatValue(obj), ">"];
                }
                return null;
            },
            hasBody(obj) {
                return obj && obj.__isVue;
            },
            body(obj) {
                if (obj && obj.__isVue) {
                    return ["div", {}, ...formatInstance(obj.$)];
                }
            }
        };
        function formatInstance(instance) {
            var blocks = [];
            if (instance.type.props && instance.props) {
                blocks.push(createInstanceBlock("props", toRaw(instance.props)));
            }
            if (instance.setupState !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock("setup", instance.setupState));
            }
            if (instance.data !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock("data", toRaw(instance.data)));
            }
            var computed3 = extractKeys(instance, "computed");
            if (computed3) {
                blocks.push(createInstanceBlock("computed", computed3));
            }
            var injected = extractKeys(instance, "inject");
            if (injected) {
                blocks.push(createInstanceBlock("injected", injected));
            }
            blocks.push(["div", {}, ["span", {
                style: keywordStyle.style + ";opacity:0.66"
            }, "$ (internal): "], ["object", {
                object: instance
            }]]);
            return blocks;
        }
        function createInstanceBlock(type, target) {
            target = extend({}, target);
            if (!Object.keys(target).length) {
                return ["span", {}];
            }
            return ["div", {
                style: "line-height:1.25em;margin-bottom:0.6em"
            }, ["div", {
                style: "color:#476582"
            }, type], ["div", {
                style: "padding-left:1.25em"
            }, ...Object.keys(target).map((key) => {
                return ["div", {}, ["span", keywordStyle, key + ": "], formatValue(target[key], false)];
            })]];
        }
        function formatValue(v) {
            var asRaw = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            if (typeof v === "number") {
                return ["span", numberStyle, v];
            } else if (typeof v === "string") {
                return ["span", stringStyle, JSON.stringify(v)];
            } else if (typeof v === "boolean") {
                return ["span", keywordStyle, v];
            } else if (isObject(v)) {
                return ["object", {
                    object: asRaw ? toRaw(v) : v
                }];
            } else {
                return ["span", stringStyle, String(v)];
            }
        }
        function extractKeys(instance, type) {
            var Comp = instance.type;
            if (isFunction(Comp)) {
                return;
            }
            var extracted = {};
            for (var key in instance.ctx) {
                if (isKeyOfType(Comp, key, type)) {
                    extracted[key] = instance.ctx[key];
                }
            }
            return extracted;
        }
        function isKeyOfType(Comp, key, type) {
            var opts = Comp[type];
            if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
                return true;
            }
            if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
                return true;
            }
            if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
                return true;
            }
        }
        function genRefFlag(v) {
            if (isShallow(v)) {
                return "ShallowRef";
            }
            if (v.effect) {
                return "ComputedRef";
            }
            return "Ref";
        }
        if (window.devtoolsFormatters) {
            window.devtoolsFormatters.push(formatter);
        } else {
            window.devtoolsFormatters = [formatter];
        }
    }
    function withMemo(memo, render2, cache2, index2) {
        var cached = cache2[index2];
        if (cached && isMemoSame(cached, memo)) {
            return cached;
        }
        var ret = render2();
        ret.memo = memo.slice();
        return cache2[index2] = ret;
    }
    function isMemoSame(cached, memo) {
        var prev = cached.memo;
        if (prev.length != memo.length) {
            return false;
        }
        for (var i = 0; i < prev.length; i++) {
            if (hasChanged(prev[i], memo[i])) {
                return false;
            }
        }
        if (isBlockTreeEnabled > 0 && currentBlock) {
            currentBlock.push(cached);
        }
        return true;
    }
    var version = "3.4.21";
    var warn2 = warn$1;
    var ErrorTypeStrings = ErrorTypeStrings$1;
    var devtools = devtools$1;
    var setDevtoolsHook = setDevtoolsHook$1;
    var _ssrUtils = {
        createComponentInstance,
        setupComponent,
        renderComponentRoot,
        setCurrentRenderingInstance,
        isVNode,
        normalizeVNode
    };
    var ssrUtils = _ssrUtils;
    var resolveFilter = null;
    var compatUtils = null;
    var DeprecationTypes = null;
    function createElement(tagName, container) {
        if (tagName === "input") {
            return new UniInputElement(tagName, container);
        } else if (tagName === "textarea") {
            return new UniTextAreaElement(tagName, container);
        }
        return new UniElement(tagName, container);
    }
    function createTextNode(text, container) {
        return new UniTextNode(text, container);
    }
    function createComment(text, container) {
        return new UniCommentNode(text, container);
    }
    var tempContainer;
    var nodeOps = {
        insert: (child, parent, anchor) => {
            parent.insertBefore(child, anchor || null);
        },
        remove: (child) => {
            var parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        createElement: (tag, container) => {
            return createElement(tag, container);
        },
        createText: (text, container) => createTextNode(text, container),
        createComment: (text, container) => createComment(text, container),
        setText: (node, text) => {
            node.nodeValue = text;
        },
        setElementText: (el, text) => {
            el.textContent = text;
        },
        parentNode: (node) => node.parentNode,
        nextSibling: (node) => node.nextSibling,
        // querySelector: selector => doc.querySelector(selector),
        setScopeId(el, id2) {
            el.setAttribute(id2, "");
        },
        cloneNode(el) {
            var cloned = el.cloneNode(true);
            if ("_value" in el) {
                cloned._value = el._value;
            }
            return cloned;
        },
        // __UNSAFE__
        // Reason: innerHTML.
        // Static content here can only come from compiled templates.
        // As long as the user only uses trusted templates, this is safe.
        insertStaticContent(content, parent, anchor) {
            var temp = tempContainer || (tempContainer = createElement("div"));
            temp.innerHTML = content;
            var first = temp.firstChild;
            var node = first;
            var last = node;
            while (node) {
                last = node;
                nodeOps.insert(node, parent, anchor);
                node = temp.firstChild;
            }
            return [first, last];
        }
    };
    function patchClass(el, value) {
        if (value == null) {
            value = "";
        }
        el.setAttribute("class", value);
    }
    function patchStyle(el, prev, next) {
        if (!next) {
            el.removeAttribute("style");
        } else if (isString(next)) {
            if (prev !== next) {
                el.setAttribute("style", next);
            }
        } else {
            var batchedStyles = {};
            var isPrevObj = prev && !isString(prev);
            if (isPrevObj) {
                for (var key in prev) {
                    if (next[key] == null) {
                        batchedStyles[key] = "";
                    }
                }
                for (var _key17 in next) {
                    var value = next[_key17];
                    if (value !== prev[_key17]) {
                        batchedStyles[_key17] = value;
                    }
                }
            } else {
                for (var _key18 in next) {
                    batchedStyles[_key18] = next[_key18];
                }
            }
            if (Object.keys(batchedStyles).length) {
                el.setAttribute("style", batchedStyles);
            }
        }
    }
    function patchAttr(el, key, value) {
        if (value == null) {
            el.removeAttribute(key);
        } else {
            el.setAttribute(key, value);
        }
    }
    function addEventListener(el, event, handler, options) {
        el.addEventListener(event, handler, options);
    }
    function removeEventListener(el, event, handler, options) {
        el.removeEventListener(event, handler, options);
    }
    function patchEvent(el, rawName, prevValue, nextValue) {
        var instance = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
        var invokers = el._vei || (el._vei = {});
        var existingInvoker = invokers[rawName];
        if (nextValue && existingInvoker) {
            existingInvoker.value = nextValue;
        } else {
            var [name, options] = parseName(rawName);
            if (nextValue) {
                var invoker = invokers[rawName] = createInvoker(nextValue, instance);
                addEventListener(el, name, invoker, options);
            } else if (existingInvoker) {
                removeEventListener(el, name, existingInvoker, options);
                invokers[rawName] = void 0;
            }
        }
    }
    var optionsModifierRE2 = /(?:Once|Passive|Capture)$/;
    function parseName(name) {
        var options;
        if (optionsModifierRE2.test(name)) {
            options = {};
            var m;
            while (m = name.match(optionsModifierRE2)) {
                name = name.slice(0, name.length - m[0].length);
                options[m[0].toLowerCase()] = true;
            }
        }
        return [hyphenate(name.slice(2)), options];
    }
    function createInvoker(initialValue, instance) {
        var invoker = (e) => {
            callWithAsyncErrorHandling(invoker.value, instance, 5, [e]);
        };
        invoker.value = initialValue;
        var modifiers = /* @__PURE__ */ new Set();
        if (isArray(invoker.value)) {
            invoker.value.forEach((v) => {
                if (v.modifiers) {
                    v.modifiers.forEach((m) => {
                        modifiers.add(m);
                    });
                }
            });
        } else {
            if (invoker.value.modifiers) {
                invoker.value.modifiers.forEach((m) => {
                    modifiers.add(m);
                });
            }
            initWxsEvent(invoker, instance);
        }
        invoker.modifiers = [...modifiers];
        return invoker;
    }
    function initWxsEvent(invoker, instance) {
        if (!instance) {
            return;
        }
        var {
            $wxsModules
        } = instance;
        if (!$wxsModules) {
            return;
        }
        var invokerSourceCode = invoker.value.toString();
        if (!$wxsModules.find((module) => invokerSourceCode.indexOf("." + module + ".") > -1)) {
            return;
        }
        invoker.wxsEvent = invoker.value();
    }
    var patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
        switch (key) {
            case "class":
                patchClass(el, nextValue);
                break;
            case "style":
                patchStyle(el, prevValue, nextValue);
                break;
            default:
                if (isOn(key)) {
                    if (!isModelListener(key)) {
                        patchEvent(el, key, prevValue, nextValue, parentComponent);
                    }
                } else {
                    if (isObject(nextValue)) {
                        var equal = prevValue === nextValue;
                        nextValue = JSON_PROTOCOL + JSON.stringify(nextValue);
                        if (equal && el.getAttribute(key) === nextValue) {
                            return;
                        }
                    } else if (prevValue === nextValue) {
                        return;
                    }
                    patchAttr(el, key, nextValue);
                }
                break;
        }
    };
    function useCssModule() {
        var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "$style";
        {
            var instance = getCurrentInstance();
            if (!instance) {
                warn2("useCssModule must be called inside setup()");
                return EMPTY_OBJ;
            }
            var modules = instance.type.__cssModules;
            if (!modules) {
                warn2("Current instance does not have CSS modules injected.");
                return EMPTY_OBJ;
            }
            var mod = modules[name];
            if (!mod) {
                warn2('Current instance does not have CSS module named "'.concat(name, '".'));
                return EMPTY_OBJ;
            }
            return mod;
        }
    }
    function useCssVars(getter) {
        var instance = getCurrentInstance();
        if (!instance) {
            warn2("useCssVars is called without current active component instance.");
            return;
        }
        var setVars = () => setVarsOnVNode(instance.subTree, getter(instance.proxy));
        onMounted(() => watchEffect(setVars, {
            flush: "post"
        }));
        onUpdated(setVars);
    }
    function setVarsOnVNode(vnode, vars) {
        if (vnode.shapeFlag & 128) {
            var suspense = vnode.suspense;
            vnode = suspense.activeBranch;
            if (suspense.pendingBranch && !suspense.isHydrating) {
                suspense.effects.push(() => {
                    setVarsOnVNode(suspense.activeBranch, vars);
                });
            }
        }
        while (vnode.component) {
            vnode = vnode.component.subTree;
        }
        if (vnode.shapeFlag & 1 && vnode.el) {
            setVarsOnNode(vnode.el, vars);
        } else if (vnode.type === Fragment) {
            vnode.children.forEach((c2) => setVarsOnVNode(c2, vars));
        } else if (vnode.type === Static) {
            var {
                el,
                anchor
            } = vnode;
            while (el) {
                setVarsOnNode(el, vars);
                if (el === anchor)
                    break;
                el = el.nextSibling;
            }
        }
    }
    function setVarsOnNode(el, vars) {
        if (el.nodeType === 1) {
            for (var key in vars) {
                el.setAttribute("--".concat(key), vars[key]);
            }
        }
    }
    var TRANSITION = "transition";
    var ANIMATION = "animation";
    var Transition = (props, _ref22) => {
        var {
            slots
        } = _ref22;
        return h(BaseTransition, resolveTransitionProps(props), slots);
    };
    Transition.displayName = "Transition";
    var DOMTransitionPropsValidators = {
        name: String,
        type: String,
        css: {
            type: Boolean,
            default: true
        },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    };
    var TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
    var callHook = function(hook) {
        var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
        if (isArray(hook)) {
            hook.forEach((h2) => h2(...args));
        } else if (hook) {
            hook(...args);
        }
    };
    var hasExplicitCallback = (hook) => {
        return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
    };
    function resolveTransitionProps(rawProps) {
        var baseProps = {};
        for (var key in rawProps) {
            if (!(key in DOMTransitionPropsValidators)) {
                baseProps[key] = rawProps[key];
            }
        }
        if (rawProps.css === false) {
            return baseProps;
        }
        var {
            name = "v",
            type,
            duration,
            enterFromClass = "".concat(name, "-enter-from"),
            enterActiveClass = "".concat(name, "-enter-active"),
            enterToClass = "".concat(name, "-enter-to"),
            appearFromClass = enterFromClass,
            appearActiveClass = enterActiveClass,
            appearToClass = enterToClass,
            leaveFromClass = "".concat(name, "-leave-from"),
            leaveActiveClass = "".concat(name, "-leave-active"),
            leaveToClass = "".concat(name, "-leave-to")
        } = rawProps;
        var durations = normalizeDuration(duration);
        var enterDuration = durations && durations[0];
        var leaveDuration = durations && durations[1];
        var {
            onBeforeEnter,
            onEnter,
            onEnterCancelled,
            onLeave,
            onLeaveCancelled,
            onBeforeAppear = onBeforeEnter,
            onAppear = onEnter,
            onAppearCancelled = onEnterCancelled
        } = baseProps;
        var finishEnter = (el, isAppear, done) => {
            removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
            removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
            done && done();
        };
        var finishLeave = (el, done) => {
            removeTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveActiveClass);
            done && done();
        };
        var makeEnterHook = (isAppear) => {
            return (el, done) => {
                var hook = isAppear ? onAppear : onEnter;
                var resolve2 = () => finishEnter(el, isAppear, done);
                callHook(hook, [el, resolve2]);
                nextFrame(() => {
                    removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                    addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                    if (!hasExplicitCallback(hook)) {
                        whenTransitionEnds(el, type, enterDuration, resolve2);
                    }
                });
            };
        };
        return extend(baseProps, {
            onBeforeEnter(el) {
                callHook(onBeforeEnter, [el]);
                addTransitionClass(el, enterFromClass);
                addTransitionClass(el, enterActiveClass);
            },
            onBeforeAppear(el) {
                callHook(onBeforeAppear, [el]);
                addTransitionClass(el, appearFromClass);
                addTransitionClass(el, appearActiveClass);
            },
            onEnter: makeEnterHook(false),
            onAppear: makeEnterHook(true),
            onLeave(el, done) {
                var resolve2 = () => finishLeave(el, done);
                addTransitionClass(el, leaveFromClass);
                forceReflow();
                addTransitionClass(el, leaveActiveClass);
                nextFrame(() => {
                    removeTransitionClass(el, leaveFromClass);
                    addTransitionClass(el, leaveToClass);
                    if (!hasExplicitCallback(onLeave)) {
                        whenTransitionEnds(el, type, leaveDuration, resolve2);
                    }
                });
                callHook(onLeave, [el, resolve2]);
            },
            onEnterCancelled(el) {
                finishEnter(el, false);
                callHook(onEnterCancelled, [el]);
            },
            onAppearCancelled(el) {
                finishEnter(el, true);
                callHook(onAppearCancelled, [el]);
            },
            onLeaveCancelled(el) {
                finishLeave(el);
                callHook(onLeaveCancelled, [el]);
            }
        });
    }
    function normalizeDuration(duration) {
        if (duration == null) {
            return null;
        } else if (isObject(duration)) {
            return [NumberOf(duration.enter), NumberOf(duration.leave)];
        } else {
            var n = NumberOf(duration);
            return [n, n];
        }
    }
    function NumberOf(val) {
        var res = toNumber(val);
        validateDuration(res);
        return res;
    }
    function validateDuration(val) {
        if (typeof val !== "number") {
            warn2("<transition> explicit duration is not a valid number - got ".concat(JSON.stringify(val), "."));
        } else if (isNaN(val)) {
            warn2("<transition> explicit duration is NaN - the duration expression might be incorrect.");
        }
    }
    function addTransitionClass(el, cls) {
        cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
        (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
    }
    function removeTransitionClass(el, cls) {
        cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
        var {
            _vtc
        } = el;
        if (_vtc) {
            _vtc.delete(cls);
            if (!_vtc.size) {
                el._vtc = void 0;
            }
        }
    }
    function nextFrame(cb) {
        requestAnimationFrame(() => {
            requestAnimationFrame(cb);
        });
    }
    var endId = 0;
    function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
        var id2 = el._endId = ++endId;
        var resolveIfNotStale = () => {
            if (id2 === el._endId) {
                resolve2();
            }
        };
        if (explicitTimeout) {
            return setTimeout(resolveIfNotStale, explicitTimeout);
        }
        var {
            type,
            timeout,
            propCount
        } = getTransitionInfo(el, expectedType);
        if (!type) {
            return resolve2();
        }
        var endEvent = type + "end";
        var ended = 0;
        var end = () => {
            el.removeEventListener(endEvent, onEnd);
            resolveIfNotStale();
        };
        var onEnd = (e) => {
            if (e.target === el && ++ended >= propCount) {
                end();
            }
        };
        setTimeout(() => {
            if (ended < propCount) {
                end();
            }
        }, timeout + 1);
        el.addEventListener(endEvent, onEnd);
    }
    function getTransitionInfo(el, expectedType) {
        var styles = window.getComputedStyle(el);
        var getStyleProperties = (key) => (styles[key] || "").split(", ");
        var transitionDelays = getStyleProperties(TRANSITION + "Delay");
        var transitionDurations = getStyleProperties(TRANSITION + "Duration");
        var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
        var animationDelays = getStyleProperties(ANIMATION + "Delay");
        var animationDurations = getStyleProperties(ANIMATION + "Duration");
        var animationTimeout = getTimeout(animationDelays, animationDurations);
        var type = null;
        var timeout = 0;
        var propCount = 0;
        if (expectedType === TRANSITION) {
            if (transitionTimeout > 0) {
                type = TRANSITION;
                timeout = transitionTimeout;
                propCount = transitionDurations.length;
            }
        } else if (expectedType === ANIMATION) {
            if (animationTimeout > 0) {
                type = ANIMATION;
                timeout = animationTimeout;
                propCount = animationDurations.length;
            }
        } else {
            timeout = Math.max(transitionTimeout, animationTimeout);
            type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
            propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
        }
        var hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
        return {
            type,
            timeout,
            propCount,
            hasTransform
        };
    }
    function getTimeout(delays, durations) {
        while (delays.length < durations.length) {
            delays = delays.concat(delays);
        }
        return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
    }
    function toMs(s) {
        return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
    }
    function forceReflow() {
        return document.body.offsetHeight;
    }
    var positionMap = /* @__PURE__ */ new WeakMap();
    var newPositionMap = /* @__PURE__ */ new WeakMap();
    var TransitionGroupImpl = {
        name: "TransitionGroup",
        props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
            tag: String,
            moveClass: String
        }),
        setup(props, _ref23) {
            var {
                slots
            } = _ref23;
            var instance = getCurrentInstance();
            var state = useTransitionState();
            var prevChildren;
            var children;
            onUpdated(() => {
                if (!prevChildren.length) {
                    return;
                }
                var moveClass = props.moveClass || "".concat(props.name || "v", "-move");
                if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
                    return;
                }
                prevChildren.forEach(callPendingCbs);
                prevChildren.forEach(recordPosition);
                var movedChildren = prevChildren.filter(applyTranslation);
                forceReflow();
                movedChildren.forEach((c2) => {
                    var el = c2.el;
                    var style = el.style;
                    addTransitionClass(el, moveClass);
                    style.transform = style.webkitTransform = style.transitionDuration = "";
                    var cb = el._moveCb = (e) => {
                        if (e && e.target !== el) {
                            return;
                        }
                        if (!e || /transform$/.test(e.propertyName)) {
                            el.removeEventListener("transitionend", cb);
                            el._moveCb = null;
                            removeTransitionClass(el, moveClass);
                        }
                    };
                    el.addEventListener("transitionend", cb);
                });
            });
            return () => {
                var rawProps = toRaw(props);
                var cssTransitionProps = resolveTransitionProps(rawProps);
                var tag = rawProps.tag || Fragment;
                prevChildren = children;
                children = slots.default ? getTransitionRawChildren(slots.default()) : [];
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (child.key != null) {
                        setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
                    } else {
                        warn2("<TransitionGroup> children must be keyed.");
                    }
                }
                if (prevChildren) {
                    for (var _i5 = 0; _i5 < prevChildren.length; _i5++) {
                        var _child = prevChildren[_i5];
                        setTransitionHooks(_child, resolveTransitionHooks(_child, cssTransitionProps, state, instance));
                        positionMap.set(_child, _child.el.getBoundingClientRect());
                    }
                }
                return createVNode(tag, null, children);
            };
        }
    };
    var removeMode = (props) => delete props.mode;
    /* @__PURE__ */ removeMode(TransitionGroupImpl.props);
    var TransitionGroup = TransitionGroupImpl;
    function callPendingCbs(c2) {
        var el = c2.el;
        if (el._moveCb) {
            el._moveCb();
        }
        if (el._enterCb) {
            el._enterCb();
        }
    }
    function recordPosition(c2) {
        newPositionMap.set(c2, c2.el.getBoundingClientRect());
    }
    function applyTranslation(c2) {
        var oldPos = positionMap.get(c2);
        var newPos = newPositionMap.get(c2);
        var dx = oldPos.left - newPos.left;
        var dy = oldPos.top - newPos.top;
        if (dx || dy) {
            var s = c2.el.style;
            s.transform = s.webkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
            s.transitionDuration = "0s";
            return c2;
        }
    }
    function hasCSSTransform(el, root, moveClass) {
        var clone = el.cloneNode();
        if (el._vtc) {
            el._vtc.forEach((cls) => {
                cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
            });
        }
        moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
        clone.style.display = "none";
        var container = root.nodeType === 1 ? root : root.parentNode;
        container.appendChild(clone);
        var {
            hasTransform
        } = getTransitionInfo(clone);
        container.removeChild(clone);
        return hasTransform;
    }
    var getModelAssigner = (vnode) => {
        var fn = vnode.props["onUpdate:modelValue"];
        return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
    };
    var vModelText = {
        created(el, _ref24, vnode) {
            var {
                value,
                modifiers: {
                    trim,
                    number
                }
            } = _ref24;
            el.value = value == null ? "" : value;
            el._assign = getModelAssigner(vnode);
            addEventListener(el, "input", (e) => {
                var domValue = e.detail.value;
                var pageNode = el.pageNode;
                el.pageNode = null;
                el.value = domValue;
                el.pageNode = pageNode;
                if (trim) {
                    domValue = domValue.trim();
                } else if (number) {
                    domValue = toNumber(domValue);
                }
                el._assign(domValue);
            });
        },
        beforeUpdate(el, _ref25, vnode) {
            var {
                value
            } = _ref25;
            el._assign = getModelAssigner(vnode);
            var newValue = value == null ? "" : value;
            if (el.value !== newValue) {
                el.value = newValue;
            }
        }
    };
    var vModelDynamic = vModelText;
    var systemModifiers = ["ctrl", "shift", "alt", "meta"];
    var modifierGuards = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => "button" in e && e.button !== 0,
        middle: (e) => "button" in e && e.button !== 1,
        right: (e) => "button" in e && e.button !== 2,
        exact: (e, modifiers) => systemModifiers.some((m) => e["".concat(m, "Key")] && !modifiers.includes(m))
    };
    var withModifiers = (fn, modifiers) => {
        var wrapper = function(event) {
            for (var i = 0; i < modifiers.length; i++) {
                var guard = modifierGuards[modifiers[i]];
                if (guard && guard(event, modifiers))
                    return;
            }
            for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key19 = 1; _key19 < _len9; _key19++) {
                args[_key19 - 1] = arguments[_key19];
            }
            return fn(event, ...args);
        };
        wrapper.modifiers = modifiers;
        return wrapper;
    };
    var keyNames = {
        esc: "escape",
        space: " ",
        up: "arrow-up",
        left: "arrow-left",
        right: "arrow-right",
        down: "arrow-down",
        delete: "backspace"
    };
    var withKeys = (fn, modifiers) => {
        return (event) => {
            if (!("key" in event)) {
                return;
            }
            var eventKey = hyphenate(event.key);
            if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
                return fn(event);
            }
        };
    };
    var vShow = {
        beforeMount(el, _ref26) {
            var {
                value
            } = _ref26;
            setDisplay(el, value);
        },
        updated(el, _ref27) {
            var {
                value,
                oldValue
            } = _ref27;
            if (!value === !oldValue)
                return;
            setDisplay(el, value);
        },
        beforeUnmount(el, _ref28) {
            var {
                value
            } = _ref28;
            setDisplay(el, value);
        }
    };
    function setDisplay(el, value) {
        el.setAttribute(".vShow", !!value);
    }
    var rendererOptions = extend({
        patchProp,
        forcePatchProp
    }, nodeOps);
    var renderer;
    function ensureRenderer() {
        return renderer || (renderer = createRenderer(rendererOptions));
    }
    var render = function() {
        ensureRenderer().render(...arguments);
    };
    var createApp = function() {
        var app = ensureRenderer().createApp(...arguments);
        {
            injectNativeTagCheck(app);
        }
        var {
            mount
        } = app;
        app.mount = (container) => {
            if (isString(container)) {
                {
                    if (container === "#app") {
                        devtoolsInitApp(app, version);
                    }
                }
                container = createComment(container);
            }
            return container && mount(container, false, false);
        };
        return app;
    };
    var createSSRApp = createApp;
    function injectNativeTagCheck(app) {
        Object.defineProperty(app.config, "isNativeTag", {
            value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
            writable: false
        });
    }
    function onBeforeActivate() {
    }
    function onBeforeDeactivate() {
    }
    function wxsProp(prop) {
        if (isObject(prop)) {
            return JSON_PROTOCOL + JSON.stringify(prop);
        }
        return prop;
    }
    var wp = (prop) => wxsProp(prop);

    // ../uni-app-next/packages/uni-app-harmony/dist/uni.runtime.esm.js
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = /* @__PURE__ */ function() {
        const lookup2 = new Uint8Array(256);
        for (var i = 0; i < chars.length; i++) {
            lookup2[chars.charCodeAt(i)] = i;
        }
        return lookup2;
    }();
    function encode$1(arraybuffer) {
        var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
        for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64 += chars[bytes[i + 2] & 63];
        }
        if (len % 3 === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
    }
    function decode2(base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }
        var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
        for (i = 0; i < len; i += 4) {
            encoded1 = lookup[base64.charCodeAt(i)];
            encoded2 = lookup[base64.charCodeAt(i + 1)];
            encoded3 = lookup[base64.charCodeAt(i + 2)];
            encoded4 = lookup[base64.charCodeAt(i + 3)];
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return arraybuffer;
    }
    function tryCatch(fn) {
        return function() {
            try {
                return fn.apply(fn, arguments);
            } catch (e) {
                console.error(e);
            }
        };
    }
    var invokeCallbackId = 1;
    var invokeCallbacks = {};
    function addInvokeCallback(id2, name, callback, keepAlive = false) {
        invokeCallbacks[id2] = {
            name,
            keepAlive,
            callback
        };
        return id2;
    }
    function invokeCallback(id2, res, extras) {
        if (typeof id2 === "number") {
            const opts = invokeCallbacks[id2];
            if (opts) {
                if (!opts.keepAlive) {
                    delete invokeCallbacks[id2];
                }
                return opts.callback(res, extras);
            }
        }
        return res;
    }
    function findInvokeCallbackByName(name) {
        for (const key in invokeCallbacks) {
            if (invokeCallbacks[key].name === name) {
                return true;
            }
        }
        return false;
    }
    function removeKeepAliveApiCallback(name, callback) {
        for (const key in invokeCallbacks) {
            const item = invokeCallbacks[key];
            if (item.callback === callback && item.name === name) {
                delete invokeCallbacks[key];
            }
        }
    }
    function offKeepAliveApiCallback(name) {
        UniServiceJSBridge.off("api." + name);
    }
    function onKeepAliveApiCallback(name) {
        UniServiceJSBridge.on("api." + name, (res) => {
            for (const key in invokeCallbacks) {
                const opts = invokeCallbacks[key];
                if (opts.name === name) {
                    opts.callback(res);
                }
            }
        });
    }
    function createKeepAliveApiCallback(name, callback) {
        return addInvokeCallback(invokeCallbackId++, name, callback, true);
    }
    var API_SUCCESS = "success";
    var API_FAIL = "fail";
    var API_COMPLETE = "complete";
    function getApiCallbacks(args) {
        const apiCallbacks = {};
        for (const name in args) {
            const fn = args[name];
            if (isFunction(fn)) {
                apiCallbacks[name] = tryCatch(fn);
                delete args[name];
            }
        }
        return apiCallbacks;
    }
    function normalizeErrMsg(errMsg, name) {
        if (!errMsg || errMsg.indexOf(":fail") === -1) {
            return name + ":ok";
        }
        return name + errMsg.substring(errMsg.indexOf(":fail"));
    }
    function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
        if (!isPlainObject(args)) {
            args = {};
        }
        const { success, fail, complete } = getApiCallbacks(args);
        const hasSuccess = isFunction(success);
        const hasFail = isFunction(fail);
        const hasComplete = isFunction(complete);
        const callbackId = invokeCallbackId++;
        addInvokeCallback(callbackId, name, (res) => {
            res = res || {};
            res.errMsg = normalizeErrMsg(res.errMsg, name);
            isFunction(beforeAll) && beforeAll(res);
            if (res.errMsg === name + ":ok") {
                isFunction(beforeSuccess) && beforeSuccess(res, args);
                hasSuccess && success(res);
            } else {
                hasFail && fail(res);
            }
            hasComplete && complete(res);
        });
        return callbackId;
    }
    var HOOK_SUCCESS = "success";
    var HOOK_FAIL = "fail";
    var HOOK_COMPLETE = "complete";
    var globalInterceptors = {};
    var scopedInterceptors = {};
    function wrapperHook(hook, params) {
        return function(data) {
            return hook(data, params) || data;
        };
    }
    function queue2(hooks, data, params) {
        let promise = false;
        for (let i = 0; i < hooks.length; i++) {
            const hook = hooks[i];
            if (promise) {
                promise = Promise.resolve(wrapperHook(hook, params));
            } else {
                const res = hook(data, params);
                if (isPromise(res)) {
                    promise = Promise.resolve(res);
                }
                if (res === false) {
                    return {
                        then() {
                        },
                        catch() {
                        }
                    };
                }
            }
        }
        return promise || {
            then(callback) {
                return callback(data);
            },
            catch() {
            }
        };
    }
    function wrapperOptions(interceptors2, options = {}) {
        [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
            const hooks = interceptors2[name];
            if (!isArray(hooks)) {
                return;
            }
            const oldCallback = options[name];
            options[name] = function callbackInterceptor(res) {
                queue2(hooks, res, options).then((res2) => {
                    return isFunction(oldCallback) && oldCallback(res2) || res2;
                });
            };
        });
        return options;
    }
    function wrapperReturnValue(method, returnValue) {
        const returnValueHooks = [];
        if (isArray(globalInterceptors.returnValue)) {
            returnValueHooks.push(...globalInterceptors.returnValue);
        }
        const interceptor = scopedInterceptors[method];
        if (interceptor && isArray(interceptor.returnValue)) {
            returnValueHooks.push(...interceptor.returnValue);
        }
        returnValueHooks.forEach((hook) => {
            returnValue = hook(returnValue) || returnValue;
        });
        return returnValue;
    }
    function getApiInterceptorHooks(method) {
        const interceptor = /* @__PURE__ */ Object.create(null);
        Object.keys(globalInterceptors).forEach((hook) => {
            if (hook !== "returnValue") {
                interceptor[hook] = globalInterceptors[hook].slice();
            }
        });
        const scopedInterceptor = scopedInterceptors[method];
        if (scopedInterceptor) {
            Object.keys(scopedInterceptor).forEach((hook) => {
                if (hook !== "returnValue") {
                    interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
                }
            });
        }
        return interceptor;
    }
    function invokeApi(method, api, options, params) {
        const interceptor = getApiInterceptorHooks(method);
        if (interceptor && Object.keys(interceptor).length) {
            if (isArray(interceptor.invoke)) {
                const res = queue2(interceptor.invoke, options);
                return res.then((options2) => {
                    return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
                });
            } else {
                return api(wrapperOptions(interceptor, options), ...params);
            }
        }
        return api(options, ...params);
    }
    function hasCallback(args) {
        if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
            return true;
        }
        return false;
    }
    function handlePromise(promise) {
        return promise;
    }
    function promisify(name, fn) {
        return (args = {}, ...rest) => {
            if (hasCallback(args)) {
                return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
            }
            return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
                invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
            })));
        };
    }
    function formatApiArgs(args, options) {
        const params = args[0];
        if (!options || !options.formatArgs || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
            return;
        }
        const formatArgs = options.formatArgs;
        const keys = Object.keys(formatArgs);
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            const formatterOrDefaultValue = formatArgs[name];
            if (isFunction(formatterOrDefaultValue)) {
                const errMsg = formatterOrDefaultValue(args[0][name], params);
                if (isString(errMsg)) {
                    return errMsg;
                }
            } else {
                if (!hasOwn(params, name)) {
                    params[name] = formatterOrDefaultValue;
                }
            }
        }
    }
    function invokeSuccess(id2, name, res) {
        const result = {
            errMsg: name + ":ok"
        };
        return invokeCallback(id2, extend(res || {}, result));
    }
    function invokeFail(id2, name, errMsg, errRes = {}) {
        const errMsgPrefix = name + ":fail";
        let apiErrMsg = "";
        if (!errMsg) {
            apiErrMsg = errMsgPrefix;
        } else if (errMsg.indexOf(errMsgPrefix) === 0) {
            apiErrMsg = errMsg;
        } else {
            apiErrMsg = errMsgPrefix + " " + errMsg;
        }
        {
            delete errRes.errCode;
        }
        let res = extend({ errMsg: apiErrMsg }, errRes);
        return invokeCallback(id2, res);
    }
    function beforeInvokeApi(name, args, protocol, options) {
        if (false) {
            validateProtocols(name, args, protocol);
        }
        if (options && options.beforeInvoke) {
            const errMsg2 = options.beforeInvoke(args);
            if (isString(errMsg2)) {
                return errMsg2;
            }
        }
        const errMsg = formatApiArgs(args, options);
        if (errMsg) {
            return errMsg;
        }
    }
    function checkCallback(callback) {
        if (!isFunction(callback)) {
            throw new Error('Invalid args: type check failed for args "callback". Expected Function');
        }
    }
    function wrapperOnApi(name, fn, options) {
        return (callback) => {
            checkCallback(callback);
            const errMsg = beforeInvokeApi(name, [callback], void 0, options);
            if (errMsg) {
                throw new Error(errMsg);
            }
            const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
            createKeepAliveApiCallback(name, callback);
            if (isFirstInvokeOnApi) {
                onKeepAliveApiCallback(name);
                fn();
            }
        };
    }
    function wrapperOffApi(name, fn, options) {
        return (callback) => {
            checkCallback(callback);
            const errMsg = beforeInvokeApi(name, [callback], void 0, options);
            if (errMsg) {
                throw new Error(errMsg);
            }
            name = name.replace("off", "on");
            removeKeepAliveApiCallback(name, callback);
            const hasInvokeOnApi = findInvokeCallbackByName(name);
            if (!hasInvokeOnApi) {
                offKeepAliveApiCallback(name);
                fn();
            }
        };
    }
    function parseErrMsg(errMsg) {
        if (!errMsg || isString(errMsg)) {
            return errMsg;
        }
        if (errMsg.stack) {
            if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
                console.error(errMsg.message + "\n" + errMsg.stack);
            }
            return errMsg.message;
        }
        return errMsg;
    }
    function wrapperTaskApi(name, fn, protocol, options) {
        return (args) => {
            const id2 = createAsyncApiCallback(name, args, options);
            const errMsg = beforeInvokeApi(name, [args], protocol, options);
            if (errMsg) {
                return invokeFail(id2, name, errMsg);
            }
            return fn(args, {
                resolve: (res) => invokeSuccess(id2, name, res),
                reject: (errMsg2, errRes) => invokeFail(id2, name, parseErrMsg(errMsg2), errRes)
            });
        };
    }
    function wrapperSyncApi(name, fn, protocol, options) {
        return (...args) => {
            const errMsg = beforeInvokeApi(name, args, protocol, options);
            if (errMsg) {
                throw new Error(errMsg);
            }
            return fn.apply(null, args);
        };
    }
    function wrapperAsyncApi(name, fn, protocol, options) {
        return wrapperTaskApi(name, fn, protocol, options);
    }
    function defineOnApi(name, fn, options) {
        return wrapperOnApi(name, fn, options);
    }
    function defineOffApi(name, fn, options) {
        return wrapperOffApi(name, fn, options);
    }
    function defineTaskApi(name, fn, protocol, options) {
        return promisify(name, wrapperTaskApi(name, fn, false ? protocol : void 0, options));
    }
    function defineSyncApi(name, fn, protocol, options) {
        return wrapperSyncApi(name, fn, false ? protocol : void 0, options);
    }
    function defineAsyncApi(name, fn, protocol, options) {
        return promisify(name, wrapperAsyncApi(name, fn, false ? protocol : void 0, options));
    }
    var API_BASE64_TO_ARRAY_BUFFER = "base64ToArrayBuffer";
    var Base64ToArrayBufferProtocol = [
        {
            name: "base64",
            type: String,
            required: true
        }
    ];
    var API_ARRAY_BUFFER_TO_BASE64 = "arrayBufferToBase64";
    var ArrayBufferToBase64Protocol = [
        {
            name: "arrayBuffer",
            type: [ArrayBuffer, Uint8Array],
            required: true
        }
    ];
    var base64ToArrayBuffer = defineSyncApi(API_BASE64_TO_ARRAY_BUFFER, (base64) => {
        return decode2(base64);
    }, Base64ToArrayBufferProtocol);
    var arrayBufferToBase64 = defineSyncApi(API_ARRAY_BUFFER_TO_BASE64, (arrayBuffer) => {
        return encode$1(arrayBuffer);
    }, ArrayBufferToBase64Protocol);
    function getBaseSystemInfo() {
        if (typeof __SYSTEM_INFO__ !== "undefined") {
            return window.__SYSTEM_INFO__;
        }
        return {
            platform: "harmonyos",
            pixelRatio: vp2px(1),
            windowWidth: lpx2px(720)
            // TODO designWidth可配置
        };
    }
    var common = {};
    (function(exports2) {
        var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
        function _has(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        }
        exports2.assign = function(obj) {
            var sources = Array.prototype.slice.call(arguments, 1);
            while (sources.length) {
                var source = sources.shift();
                if (!source) {
                    continue;
                }
                if (typeof source !== "object") {
                    throw new TypeError(source + "must be non-object");
                }
                for (var p in source) {
                    if (_has(source, p)) {
                        obj[p] = source[p];
                    }
                }
            }
            return obj;
        };
        exports2.shrinkBuf = function(buf, size2) {
            if (buf.length === size2) {
                return buf;
            }
            if (buf.subarray) {
                return buf.subarray(0, size2);
            }
            buf.length = size2;
            return buf;
        };
        var fnTyped = {
            arraySet: function(dest, src, src_offs, len, dest_offs) {
                if (src.subarray && dest.subarray) {
                    dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
                    return;
                }
                for (var i = 0; i < len; i++) {
                    dest[dest_offs + i] = src[src_offs + i];
                }
            },
            // Join array of chunks to single array.
            flattenChunks: function(chunks) {
                var i, l, len, pos, chunk, result;
                len = 0;
                for (i = 0, l = chunks.length; i < l; i++) {
                    len += chunks[i].length;
                }
                result = new Uint8Array(len);
                pos = 0;
                for (i = 0, l = chunks.length; i < l; i++) {
                    chunk = chunks[i];
                    result.set(chunk, pos);
                    pos += chunk.length;
                }
                return result;
            }
        };
        var fnUntyped = {
            arraySet: function(dest, src, src_offs, len, dest_offs) {
                for (var i = 0; i < len; i++) {
                    dest[dest_offs + i] = src[src_offs + i];
                }
            },
            // Join array of chunks to single array.
            flattenChunks: function(chunks) {
                return [].concat.apply([], chunks);
            }
        };
        exports2.setTyped = function(on) {
            if (on) {
                exports2.Buf8 = Uint8Array;
                exports2.Buf16 = Uint16Array;
                exports2.Buf32 = Int32Array;
                exports2.assign(exports2, fnTyped);
            } else {
                exports2.Buf8 = Array;
                exports2.Buf16 = Array;
                exports2.Buf32 = Array;
                exports2.assign(exports2, fnUntyped);
            }
        };
        exports2.setTyped(TYPED_OK);
    })(common);
    var deflate$4 = {};
    var deflate$3 = {};
    var trees$1 = {};
    var utils$6 = common;
    var Z_FIXED$1 = 4;
    var Z_BINARY = 0;
    var Z_TEXT = 1;
    var Z_UNKNOWN$1 = 2;
    function zero$1(buf) {
        var len = buf.length;
        while (--len >= 0) {
            buf[len] = 0;
        }
    }
    var STORED_BLOCK = 0;
    var STATIC_TREES = 1;
    var DYN_TREES = 2;
    var MIN_MATCH$1 = 3;
    var MAX_MATCH$1 = 258;
    var LENGTH_CODES$1 = 29;
    var LITERALS$1 = 256;
    var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
    var D_CODES$1 = 30;
    var BL_CODES$1 = 19;
    var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
    var MAX_BITS$1 = 15;
    var Buf_size = 16;
    var MAX_BL_BITS = 7;
    var END_BLOCK = 256;
    var REP_3_6 = 16;
    var REPZ_3_10 = 17;
    var REPZ_11_138 = 18;
    var extra_lbits = (
        /* extra bits for each length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
    );
    var extra_dbits = (
        /* extra bits for each distance code */
        [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
    );
    var extra_blbits = (
        /* extra bits for each bit length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
    );
    var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var DIST_CODE_LEN = 512;
    var static_ltree = new Array((L_CODES$1 + 2) * 2);
    zero$1(static_ltree);
    var static_dtree = new Array(D_CODES$1 * 2);
    zero$1(static_dtree);
    var _dist_code = new Array(DIST_CODE_LEN);
    zero$1(_dist_code);
    var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
    zero$1(_length_code);
    var base_length = new Array(LENGTH_CODES$1);
    zero$1(base_length);
    var base_dist = new Array(D_CODES$1);
    zero$1(base_dist);
    function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
        this.static_tree = static_tree;
        this.extra_bits = extra_bits;
        this.extra_base = extra_base;
        this.elems = elems;
        this.max_length = max_length;
        this.has_stree = static_tree && static_tree.length;
    }
    var static_l_desc;
    var static_d_desc;
    var static_bl_desc;
    function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;
        this.max_code = 0;
        this.stat_desc = stat_desc;
    }
    function d_code(dist) {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    }
    function put_short(s, w) {
        s.pending_buf[s.pending++] = w & 255;
        s.pending_buf[s.pending++] = w >>> 8 & 255;
    }
    function send_bits(s, value, length) {
        if (s.bi_valid > Buf_size - length) {
            s.bi_buf |= value << s.bi_valid & 65535;
            put_short(s, s.bi_buf);
            s.bi_buf = value >> Buf_size - s.bi_valid;
            s.bi_valid += length - Buf_size;
        } else {
            s.bi_buf |= value << s.bi_valid & 65535;
            s.bi_valid += length;
        }
    }
    function send_code(s, c2, tree) {
        send_bits(
            s,
            tree[c2 * 2],
            tree[c2 * 2 + 1]
            /*.Len*/
        );
    }
    function bi_reverse(code, len) {
        var res = 0;
        do {
            res |= code & 1;
            code >>>= 1;
            res <<= 1;
        } while (--len > 0);
        return res >>> 1;
    }
    function bi_flush(s) {
        if (s.bi_valid === 16) {
            put_short(s, s.bi_buf);
            s.bi_buf = 0;
            s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
            s.pending_buf[s.pending++] = s.bi_buf & 255;
            s.bi_buf >>= 8;
            s.bi_valid -= 8;
        }
    }
    function gen_bitlen(s, desc) {
        var tree = desc.dyn_tree;
        var max_code = desc.max_code;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var extra = desc.stat_desc.extra_bits;
        var base = desc.stat_desc.extra_base;
        var max_length = desc.stat_desc.max_length;
        var h2;
        var n, m;
        var bits;
        var xbits;
        var f;
        var overflow = 0;
        for (bits = 0; bits <= MAX_BITS$1; bits++) {
            s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h2 = s.heap_max + 1; h2 < HEAP_SIZE$1; h2++) {
            n = s.heap[h2];
            bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
            if (bits > max_length) {
                bits = max_length;
                overflow++;
            }
            tree[n * 2 + 1] = bits;
            if (n > max_code) {
                continue;
            }
            s.bl_count[bits]++;
            xbits = 0;
            if (n >= base) {
                xbits = extra[n - base];
            }
            f = tree[n * 2];
            s.opt_len += f * (bits + xbits);
            if (has_stree) {
                s.static_len += f * (stree[n * 2 + 1] + xbits);
            }
        }
        if (overflow === 0) {
            return;
        }
        do {
            bits = max_length - 1;
            while (s.bl_count[bits] === 0) {
                bits--;
            }
            s.bl_count[bits]--;
            s.bl_count[bits + 1] += 2;
            s.bl_count[max_length]--;
            overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
            n = s.bl_count[bits];
            while (n !== 0) {
                m = s.heap[--h2];
                if (m > max_code) {
                    continue;
                }
                if (tree[m * 2 + 1] !== bits) {
                    s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
                    tree[m * 2 + 1] = bits;
                }
                n--;
            }
        }
    }
    function gen_codes(tree, max_code, bl_count) {
        var next_code = new Array(MAX_BITS$1 + 1);
        var code = 0;
        var bits;
        var n;
        for (bits = 1; bits <= MAX_BITS$1; bits++) {
            next_code[bits] = code = code + bl_count[bits - 1] << 1;
        }
        for (n = 0; n <= max_code; n++) {
            var len = tree[n * 2 + 1];
            if (len === 0) {
                continue;
            }
            tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
    }
    function tr_static_init() {
        var n;
        var bits;
        var length;
        var code;
        var dist;
        var bl_count = new Array(MAX_BITS$1 + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
            base_length[code] = length;
            for (n = 0; n < 1 << extra_lbits[code]; n++) {
                _length_code[length++] = code;
            }
        }
        _length_code[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
            base_dist[code] = dist;
            for (n = 0; n < 1 << extra_dbits[code]; n++) {
                _dist_code[dist++] = code;
            }
        }
        dist >>= 7;
        for (; code < D_CODES$1; code++) {
            base_dist[code] = dist << 7;
            for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
                _dist_code[256 + dist++] = code;
            }
        }
        for (bits = 0; bits <= MAX_BITS$1; bits++) {
            bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
            static_ltree[n * 2 + 1] = 8;
            n++;
            bl_count[8]++;
        }
        while (n <= 255) {
            static_ltree[n * 2 + 1] = 9;
            n++;
            bl_count[9]++;
        }
        while (n <= 279) {
            static_ltree[n * 2 + 1] = 7;
            n++;
            bl_count[7]++;
        }
        while (n <= 287) {
            static_ltree[n * 2 + 1] = 8;
            n++;
            bl_count[8]++;
        }
        gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
        for (n = 0; n < D_CODES$1; n++) {
            static_dtree[n * 2 + 1] = 5;
            static_dtree[n * 2] = bi_reverse(n, 5);
        }
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
    }
    function init_block(s) {
        var n;
        for (n = 0; n < L_CODES$1; n++) {
            s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES$1; n++) {
            s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES$1; n++) {
            s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.last_lit = s.matches = 0;
    }
    function bi_windup(s) {
        if (s.bi_valid > 8) {
            put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
            s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
    }
    function copy_block(s, buf, len, header) {
        bi_windup(s);
        {
            put_short(s, len);
            put_short(s, ~len);
        }
        utils$6.arraySet(s.pending_buf, s.window, buf, len, s.pending);
        s.pending += len;
    }
    function smaller(tree, n, m, depth) {
        var _n2 = n * 2;
        var _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
    }
    function pqdownheap(s, tree, k) {
        var v = s.heap[k];
        var j = k << 1;
        while (j <= s.heap_len) {
            if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
                j++;
            }
            if (smaller(tree, v, s.heap[j], s.depth)) {
                break;
            }
            s.heap[k] = s.heap[j];
            k = j;
            j <<= 1;
        }
        s.heap[k] = v;
    }
    function compress_block(s, ltree, dtree) {
        var dist;
        var lc;
        var lx = 0;
        var code;
        var extra;
        if (s.last_lit !== 0) {
            do {
                dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
                lc = s.pending_buf[s.l_buf + lx];
                lx++;
                if (dist === 0) {
                    send_code(s, lc, ltree);
                } else {
                    code = _length_code[lc];
                    send_code(s, code + LITERALS$1 + 1, ltree);
                    extra = extra_lbits[code];
                    if (extra !== 0) {
                        lc -= base_length[code];
                        send_bits(s, lc, extra);
                    }
                    dist--;
                    code = d_code(dist);
                    send_code(s, code, dtree);
                    extra = extra_dbits[code];
                    if (extra !== 0) {
                        dist -= base_dist[code];
                        send_bits(s, dist, extra);
                    }
                }
            } while (lx < s.last_lit);
        }
        send_code(s, END_BLOCK, ltree);
    }
    function build_tree(s, desc) {
        var tree = desc.dyn_tree;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var elems = desc.stat_desc.elems;
        var n, m;
        var max_code = -1;
        var node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE$1;
        for (n = 0; n < elems; n++) {
            if (tree[n * 2] !== 0) {
                s.heap[++s.heap_len] = max_code = n;
                s.depth[n] = 0;
            } else {
                tree[n * 2 + 1] = 0;
            }
        }
        while (s.heap_len < 2) {
            node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
            tree[node * 2] = 1;
            s.depth[node] = 0;
            s.opt_len--;
            if (has_stree) {
                s.static_len -= stree[node * 2 + 1];
            }
        }
        desc.max_code = max_code;
        for (n = s.heap_len >> 1; n >= 1; n--) {
            pqdownheap(s, tree, n);
        }
        node = elems;
        do {
            n = s.heap[
            1
                /*SMALLEST*/
            ];
            s.heap[
            1
                /*SMALLEST*/
            ] = s.heap[s.heap_len--];
            pqdownheap(
                s,
                tree,
                1
                /*SMALLEST*/
            );
            m = s.heap[
            1
                /*SMALLEST*/
            ];
            s.heap[--s.heap_max] = n;
            s.heap[--s.heap_max] = m;
            tree[node * 2] = tree[n * 2] + tree[m * 2];
            s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
            tree[n * 2 + 1] = tree[m * 2 + 1] = node;
            s.heap[
            1
                /*SMALLEST*/
            ] = node++;
            pqdownheap(
                s,
                tree,
                1
                /*SMALLEST*/
            );
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
        1
            /*SMALLEST*/
        ];
        gen_bitlen(s, desc);
        gen_codes(tree, max_code, s.bl_count);
    }
    function scan_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 65535;
        for (n = 0; n <= max_code; n++) {
            curlen = nextlen;
            nextlen = tree[(n + 1) * 2 + 1];
            if (++count < max_count && curlen === nextlen) {
                continue;
            } else if (count < min_count) {
                s.bl_tree[curlen * 2] += count;
            } else if (curlen !== 0) {
                if (curlen !== prevlen) {
                    s.bl_tree[curlen * 2]++;
                }
                s.bl_tree[REP_3_6 * 2]++;
            } else if (count <= 10) {
                s.bl_tree[REPZ_3_10 * 2]++;
            } else {
                s.bl_tree[REPZ_11_138 * 2]++;
            }
            count = 0;
            prevlen = curlen;
            if (nextlen === 0) {
                max_count = 138;
                min_count = 3;
            } else if (curlen === nextlen) {
                max_count = 6;
                min_count = 3;
            } else {
                max_count = 7;
                min_count = 4;
            }
        }
    }
    function send_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
            curlen = nextlen;
            nextlen = tree[(n + 1) * 2 + 1];
            if (++count < max_count && curlen === nextlen) {
                continue;
            } else if (count < min_count) {
                do {
                    send_code(s, curlen, s.bl_tree);
                } while (--count !== 0);
            } else if (curlen !== 0) {
                if (curlen !== prevlen) {
                    send_code(s, curlen, s.bl_tree);
                    count--;
                }
                send_code(s, REP_3_6, s.bl_tree);
                send_bits(s, count - 3, 2);
            } else if (count <= 10) {
                send_code(s, REPZ_3_10, s.bl_tree);
                send_bits(s, count - 3, 3);
            } else {
                send_code(s, REPZ_11_138, s.bl_tree);
                send_bits(s, count - 11, 7);
            }
            count = 0;
            prevlen = curlen;
            if (nextlen === 0) {
                max_count = 138;
                min_count = 3;
            } else if (curlen === nextlen) {
                max_count = 6;
                min_count = 3;
            } else {
                max_count = 7;
                min_count = 4;
            }
        }
    }
    function build_bl_tree(s) {
        var max_blindex;
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree(s, s.bl_desc);
        for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
            if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
                break;
            }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
    }
    function send_all_trees(s, lcodes, dcodes, blcodes) {
        var rank2;
        send_bits(s, lcodes - 257, 5);
        send_bits(s, dcodes - 1, 5);
        send_bits(s, blcodes - 4, 4);
        for (rank2 = 0; rank2 < blcodes; rank2++) {
            send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
        }
        send_tree(s, s.dyn_ltree, lcodes - 1);
        send_tree(s, s.dyn_dtree, dcodes - 1);
    }
    function detect_data_type(s) {
        var black_mask = 4093624447;
        var n;
        for (n = 0; n <= 31; n++, black_mask >>>= 1) {
            if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
                return Z_BINARY;
            }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
            return Z_TEXT;
        }
        for (n = 32; n < LITERALS$1; n++) {
            if (s.dyn_ltree[n * 2] !== 0) {
                return Z_TEXT;
            }
        }
        return Z_BINARY;
    }
    var static_init_done = false;
    function _tr_init(s) {
        if (!static_init_done) {
            tr_static_init();
            static_init_done = true;
        }
        s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block(s);
    }
    function _tr_stored_block(s, buf, stored_len, last) {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
        copy_block(s, buf, stored_len);
    }
    function _tr_align(s) {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
    }
    function _tr_flush_block(s, buf, stored_len, last) {
        var opt_lenb, static_lenb;
        var max_blindex = 0;
        if (s.level > 0) {
            if (s.strm.data_type === Z_UNKNOWN$1) {
                s.strm.data_type = detect_data_type(s);
            }
            build_tree(s, s.l_desc);
            build_tree(s, s.d_desc);
            max_blindex = build_bl_tree(s);
            opt_lenb = s.opt_len + 3 + 7 >>> 3;
            static_lenb = s.static_len + 3 + 7 >>> 3;
            if (static_lenb <= opt_lenb) {
                opt_lenb = static_lenb;
            }
        } else {
            opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf !== -1) {
            _tr_stored_block(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
            send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
            compress_block(s, static_ltree, static_dtree);
        } else {
            send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
            send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
            compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block(s);
        if (last) {
            bi_windup(s);
        }
    }
    function _tr_tally(s, dist, lc) {
        s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
        s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
        s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
        s.last_lit++;
        if (dist === 0) {
            s.dyn_ltree[lc * 2]++;
        } else {
            s.matches++;
            dist--;
            s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
            s.dyn_dtree[d_code(dist) * 2]++;
        }
        return s.last_lit === s.lit_bufsize - 1;
    }
    trees$1._tr_init = _tr_init;
    trees$1._tr_stored_block = _tr_stored_block;
    trees$1._tr_flush_block = _tr_flush_block;
    trees$1._tr_tally = _tr_tally;
    trees$1._tr_align = _tr_align;
    function adler32$2(adler, buf, len, pos) {
        var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
        while (len !== 0) {
            n = len > 2e3 ? 2e3 : len;
            len -= n;
            do {
                s1 = s1 + buf[pos++] | 0;
                s2 = s2 + s1 | 0;
            } while (--n);
            s1 %= 65521;
            s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
    }
    var adler32_1 = adler32$2;
    function makeTable() {
        var c2, table = [];
        for (var n = 0; n < 256; n++) {
            c2 = n;
            for (var k = 0; k < 8; k++) {
                c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
            }
            table[n] = c2;
        }
        return table;
    }
    var crcTable = makeTable();
    function crc32$2(crc, buf, len, pos) {
        var t = crcTable, end = pos + len;
        crc ^= -1;
        for (var i = pos; i < end; i++) {
            crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        }
        return crc ^ -1;
    }
    var crc32_1 = crc32$2;
    var messages = {
        2: "need dictionary",
        /* Z_NEED_DICT       2  */
        1: "stream end",
        /* Z_STREAM_END      1  */
        0: "",
        /* Z_OK              0  */
        "-1": "file error",
        /* Z_ERRNO         (-1) */
        "-2": "stream error",
        /* Z_STREAM_ERROR  (-2) */
        "-3": "data error",
        /* Z_DATA_ERROR    (-3) */
        "-4": "insufficient memory",
        /* Z_MEM_ERROR     (-4) */
        "-5": "buffer error",
        /* Z_BUF_ERROR     (-5) */
        "-6": "incompatible version"
        /* Z_VERSION_ERROR (-6) */
    };
    var utils$5 = common;
    var trees = trees$1;
    var adler32$1 = adler32_1;
    var crc32$1 = crc32_1;
    var msg$2 = messages;
    var Z_NO_FLUSH$1 = 0;
    var Z_PARTIAL_FLUSH = 1;
    var Z_FULL_FLUSH = 3;
    var Z_FINISH$2 = 4;
    var Z_BLOCK$1 = 5;
    var Z_OK$2 = 0;
    var Z_STREAM_END$2 = 1;
    var Z_STREAM_ERROR$1 = -2;
    var Z_DATA_ERROR$1 = -3;
    var Z_BUF_ERROR$1 = -5;
    var Z_DEFAULT_COMPRESSION$1 = -1;
    var Z_FILTERED = 1;
    var Z_HUFFMAN_ONLY = 2;
    var Z_RLE = 3;
    var Z_FIXED = 4;
    var Z_DEFAULT_STRATEGY$1 = 0;
    var Z_UNKNOWN = 2;
    var Z_DEFLATED$2 = 8;
    var MAX_MEM_LEVEL = 9;
    var MAX_WBITS$1 = 15;
    var DEF_MEM_LEVEL = 8;
    var LENGTH_CODES = 29;
    var LITERALS = 256;
    var L_CODES = LITERALS + 1 + LENGTH_CODES;
    var D_CODES = 30;
    var BL_CODES = 19;
    var HEAP_SIZE = 2 * L_CODES + 1;
    var MAX_BITS = 15;
    var MIN_MATCH = 3;
    var MAX_MATCH = 258;
    var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
    var PRESET_DICT = 32;
    var INIT_STATE = 42;
    var EXTRA_STATE = 69;
    var NAME_STATE = 73;
    var COMMENT_STATE = 91;
    var HCRC_STATE = 103;
    var BUSY_STATE = 113;
    var FINISH_STATE = 666;
    var BS_NEED_MORE = 1;
    var BS_BLOCK_DONE = 2;
    var BS_FINISH_STARTED = 3;
    var BS_FINISH_DONE = 4;
    var OS_CODE = 3;
    function err(strm, errorCode) {
        strm.msg = msg$2[errorCode];
        return errorCode;
    }
    function rank(f) {
        return (f << 1) - (f > 4 ? 9 : 0);
    }
    function zero(buf) {
        var len = buf.length;
        while (--len >= 0) {
            buf[len] = 0;
        }
    }
    function flush_pending(strm) {
        var s = strm.state;
        var len = s.pending;
        if (len > strm.avail_out) {
            len = strm.avail_out;
        }
        if (len === 0) {
            return;
        }
        utils$5.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
            s.pending_out = 0;
        }
    }
    function flush_block_only(s, last) {
        trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
    }
    function put_byte(s, b) {
        s.pending_buf[s.pending++] = b;
    }
    function putShortMSB(s, b) {
        s.pending_buf[s.pending++] = b >>> 8 & 255;
        s.pending_buf[s.pending++] = b & 255;
    }
    function read_buf(strm, buf, start, size2) {
        var len = strm.avail_in;
        if (len > size2) {
            len = size2;
        }
        if (len === 0) {
            return 0;
        }
        strm.avail_in -= len;
        utils$5.arraySet(buf, strm.input, strm.next_in, len, start);
        if (strm.state.wrap === 1) {
            strm.adler = adler32$1(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
            strm.adler = crc32$1(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
    }
    function longest_match(s, cur_match) {
        var chain_length = s.max_chain_length;
        var scan = s.strstart;
        var match;
        var len;
        var best_len = s.prev_length;
        var nice_match = s.nice_match;
        var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
        var _win = s.window;
        var wmask = s.w_mask;
        var prev = s.prev;
        var strend = s.strstart + MAX_MATCH;
        var scan_end1 = _win[scan + best_len - 1];
        var scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
            chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
            nice_match = s.lookahead;
        }
        do {
            match = cur_match;
            if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
                continue;
            }
            scan += 2;
            match++;
            do {
            } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
            len = MAX_MATCH - (strend - scan);
            scan = strend - MAX_MATCH;
            if (len > best_len) {
                s.match_start = cur_match;
                best_len = len;
                if (len >= nice_match) {
                    break;
                }
                scan_end1 = _win[scan + best_len - 1];
                scan_end = _win[scan + best_len];
            }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
            return best_len;
        }
        return s.lookahead;
    }
    function fill_window(s) {
        var _w_size = s.w_size;
        var p, n, m, more, str;
        do {
            more = s.window_size - s.lookahead - s.strstart;
            if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
                utils$5.arraySet(s.window, s.window, _w_size, _w_size, 0);
                s.match_start -= _w_size;
                s.strstart -= _w_size;
                s.block_start -= _w_size;
                n = s.hash_size;
                p = n;
                do {
                    m = s.head[--p];
                    s.head[p] = m >= _w_size ? m - _w_size : 0;
                } while (--n);
                n = _w_size;
                p = n;
                do {
                    m = s.prev[--p];
                    s.prev[p] = m >= _w_size ? m - _w_size : 0;
                } while (--n);
                more += _w_size;
            }
            if (s.strm.avail_in === 0) {
                break;
            }
            n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
            s.lookahead += n;
            if (s.lookahead + s.insert >= MIN_MATCH) {
                str = s.strstart - s.insert;
                s.ins_h = s.window[str];
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
                while (s.insert) {
                    s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
                    s.prev[str & s.w_mask] = s.head[s.ins_h];
                    s.head[s.ins_h] = str;
                    str++;
                    s.insert--;
                    if (s.lookahead + s.insert < MIN_MATCH) {
                        break;
                    }
                }
            }
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    }
    function deflate_stored(s, flush) {
        var max_block_size = 65535;
        if (max_block_size > s.pending_buf_size - 5) {
            max_block_size = s.pending_buf_size - 5;
        }
        for (; ; ) {
            if (s.lookahead <= 1) {
                fill_window(s);
                if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
                    return BS_NEED_MORE;
                }
                if (s.lookahead === 0) {
                    break;
                }
            }
            s.strstart += s.lookahead;
            s.lookahead = 0;
            var max_start = s.block_start + max_block_size;
            if (s.strstart === 0 || s.strstart >= max_start) {
                s.lookahead = s.strstart - max_start;
                s.strstart = max_start;
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            }
            if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            }
        }
        s.insert = 0;
        if (flush === Z_FINISH$2) {
            flush_block_only(s, true);
            if (s.strm.avail_out === 0) {
                return BS_FINISH_STARTED;
            }
            return BS_FINISH_DONE;
        }
        if (s.strstart > s.block_start) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
            }
        }
        return BS_NEED_MORE;
    }
    function deflate_fast(s, flush) {
        var hash_head;
        var bflush;
        for (; ; ) {
            if (s.lookahead < MIN_LOOKAHEAD) {
                fill_window(s);
                if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
                    return BS_NEED_MORE;
                }
                if (s.lookahead === 0) {
                    break;
                }
            }
            hash_head = 0;
            if (s.lookahead >= MIN_MATCH) {
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
            }
            if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
                s.match_length = longest_match(s, hash_head);
            }
            if (s.match_length >= MIN_MATCH) {
                bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
                s.lookahead -= s.match_length;
                if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
                    s.match_length--;
                    do {
                        s.strstart++;
                        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                    } while (--s.match_length !== 0);
                    s.strstart++;
                } else {
                    s.strstart += s.match_length;
                    s.match_length = 0;
                    s.ins_h = s.window[s.strstart];
                    s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
                }
            } else {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                s.lookahead--;
                s.strstart++;
            }
            if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            }
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH$2) {
            flush_block_only(s, true);
            if (s.strm.avail_out === 0) {
                return BS_FINISH_STARTED;
            }
            return BS_FINISH_DONE;
        }
        if (s.last_lit) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
            }
        }
        return BS_BLOCK_DONE;
    }
    function deflate_slow(s, flush) {
        var hash_head;
        var bflush;
        var max_insert;
        for (; ; ) {
            if (s.lookahead < MIN_LOOKAHEAD) {
                fill_window(s);
                if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
                    return BS_NEED_MORE;
                }
                if (s.lookahead === 0) {
                    break;
                }
            }
            hash_head = 0;
            if (s.lookahead >= MIN_MATCH) {
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
            }
            s.prev_length = s.match_length;
            s.prev_match = s.match_start;
            s.match_length = MIN_MATCH - 1;
            if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
                s.match_length = longest_match(s, hash_head);
                if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
                    s.match_length = MIN_MATCH - 1;
                }
            }
            if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
                max_insert = s.strstart + s.lookahead - MIN_MATCH;
                bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
                s.lookahead -= s.prev_length - 1;
                s.prev_length -= 2;
                do {
                    if (++s.strstart <= max_insert) {
                        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                        s.head[s.ins_h] = s.strstart;
                    }
                } while (--s.prev_length !== 0);
                s.match_available = 0;
                s.match_length = MIN_MATCH - 1;
                s.strstart++;
                if (bflush) {
                    flush_block_only(s, false);
                    if (s.strm.avail_out === 0) {
                        return BS_NEED_MORE;
                    }
                }
            } else if (s.match_available) {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
                if (bflush) {
                    flush_block_only(s, false);
                }
                s.strstart++;
                s.lookahead--;
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            } else {
                s.match_available = 1;
                s.strstart++;
                s.lookahead--;
            }
        }
        if (s.match_available) {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
            s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH$2) {
            flush_block_only(s, true);
            if (s.strm.avail_out === 0) {
                return BS_FINISH_STARTED;
            }
            return BS_FINISH_DONE;
        }
        if (s.last_lit) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
            }
        }
        return BS_BLOCK_DONE;
    }
    function deflate_rle(s, flush) {
        var bflush;
        var prev;
        var scan, strend;
        var _win = s.window;
        for (; ; ) {
            if (s.lookahead <= MAX_MATCH) {
                fill_window(s);
                if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
                    return BS_NEED_MORE;
                }
                if (s.lookahead === 0) {
                    break;
                }
            }
            s.match_length = 0;
            if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
                scan = s.strstart - 1;
                prev = _win[scan];
                if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
                    strend = s.strstart + MAX_MATCH;
                    do {
                    } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
                    s.match_length = MAX_MATCH - (strend - scan);
                    if (s.match_length > s.lookahead) {
                        s.match_length = s.lookahead;
                    }
                }
            }
            if (s.match_length >= MIN_MATCH) {
                bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
                s.lookahead -= s.match_length;
                s.strstart += s.match_length;
                s.match_length = 0;
            } else {
                bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
                s.lookahead--;
                s.strstart++;
            }
            if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            }
        }
        s.insert = 0;
        if (flush === Z_FINISH$2) {
            flush_block_only(s, true);
            if (s.strm.avail_out === 0) {
                return BS_FINISH_STARTED;
            }
            return BS_FINISH_DONE;
        }
        if (s.last_lit) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
            }
        }
        return BS_BLOCK_DONE;
    }
    function deflate_huff(s, flush) {
        var bflush;
        for (; ; ) {
            if (s.lookahead === 0) {
                fill_window(s);
                if (s.lookahead === 0) {
                    if (flush === Z_NO_FLUSH$1) {
                        return BS_NEED_MORE;
                    }
                    break;
                }
            }
            s.match_length = 0;
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
            if (bflush) {
                flush_block_only(s, false);
                if (s.strm.avail_out === 0) {
                    return BS_NEED_MORE;
                }
            }
        }
        s.insert = 0;
        if (flush === Z_FINISH$2) {
            flush_block_only(s, true);
            if (s.strm.avail_out === 0) {
                return BS_FINISH_STARTED;
            }
            return BS_FINISH_DONE;
        }
        if (s.last_lit) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
            }
        }
        return BS_BLOCK_DONE;
    }
    function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
    }
    var configuration_table;
    configuration_table = [
    /*      good lazy nice chain */
        new Config(0, 0, 0, 0, deflate_stored),
        /* 0 store only */
        new Config(4, 4, 8, 4, deflate_fast),
        /* 1 max speed, no lazy matches */
        new Config(4, 5, 16, 8, deflate_fast),
        /* 2 */
        new Config(4, 6, 32, 32, deflate_fast),
        /* 3 */
        new Config(4, 4, 16, 16, deflate_slow),
        /* 4 lazy matches */
        new Config(8, 16, 32, 32, deflate_slow),
        /* 5 */
        new Config(8, 16, 128, 128, deflate_slow),
        /* 6 */
        new Config(8, 32, 128, 256, deflate_slow),
        /* 7 */
        new Config(32, 128, 258, 1024, deflate_slow),
        /* 8 */
        new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
    ];
    function lm_init(s) {
        s.window_size = 2 * s.w_size;
        zero(s.head);
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
    }
    function DeflateState() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = Z_DEFLATED$2;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new utils$5.Buf16(HEAP_SIZE * 2);
        this.dyn_dtree = new utils$5.Buf16((2 * D_CODES + 1) * 2);
        this.bl_tree = new utils$5.Buf16((2 * BL_CODES + 1) * 2);
        zero(this.dyn_ltree);
        zero(this.dyn_dtree);
        zero(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new utils$5.Buf16(MAX_BITS + 1);
        this.heap = new utils$5.Buf16(2 * L_CODES + 1);
        zero(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new utils$5.Buf16(2 * L_CODES + 1);
        zero(this.depth);
        this.l_buf = 0;
        this.lit_bufsize = 0;
        this.last_lit = 0;
        this.d_buf = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0;
    }
    function deflateResetKeep(strm) {
        var s;
        if (!strm || !strm.state) {
            return err(strm, Z_STREAM_ERROR$1);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
        s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
            s.wrap = -s.wrap;
        }
        s.status = s.wrap ? INIT_STATE : BUSY_STATE;
        strm.adler = s.wrap === 2 ? 0 : 1;
        s.last_flush = Z_NO_FLUSH$1;
        trees._tr_init(s);
        return Z_OK$2;
    }
    function deflateReset(strm) {
        var ret = deflateResetKeep(strm);
        if (ret === Z_OK$2) {
            lm_init(strm.state);
        }
        return ret;
    }
    function deflateSetHeader(strm, head) {
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR$1;
        }
        if (strm.state.wrap !== 2) {
            return Z_STREAM_ERROR$1;
        }
        strm.state.gzhead = head;
        return Z_OK$2;
    }
    function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
        if (!strm) {
            return Z_STREAM_ERROR$1;
        }
        var wrap2 = 1;
        if (level === Z_DEFAULT_COMPRESSION$1) {
            level = 6;
        }
        if (windowBits < 0) {
            wrap2 = 0;
            windowBits = -windowBits;
        } else if (windowBits > 15) {
            wrap2 = 2;
            windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
            return err(strm, Z_STREAM_ERROR$1);
        }
        if (windowBits === 8) {
            windowBits = 9;
        }
        var s = new DeflateState();
        strm.state = s;
        s.strm = strm;
        s.wrap = wrap2;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        s.window = new utils$5.Buf8(s.w_size * 2);
        s.head = new utils$5.Buf16(s.hash_size);
        s.prev = new utils$5.Buf16(s.w_size);
        s.lit_bufsize = 1 << memLevel + 6;
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new utils$5.Buf8(s.pending_buf_size);
        s.d_buf = 1 * s.lit_bufsize;
        s.l_buf = (1 + 2) * s.lit_bufsize;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset(strm);
    }
    function deflateInit(strm, level) {
        return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
    }
    function deflate$2(strm, flush) {
        var old_flush, s;
        var beg, val;
        if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
            return strm ? err(strm, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
        }
        s = strm.state;
        if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$2) {
            return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
        }
        s.strm = strm;
        old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.status === INIT_STATE) {
            if (s.wrap === 2) {
                strm.adler = 0;
                put_byte(s, 31);
                put_byte(s, 139);
                put_byte(s, 8);
                if (!s.gzhead) {
                    put_byte(s, 0);
                    put_byte(s, 0);
                    put_byte(s, 0);
                    put_byte(s, 0);
                    put_byte(s, 0);
                    put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                    put_byte(s, OS_CODE);
                    s.status = BUSY_STATE;
                } else {
                    put_byte(
                        s,
                        (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
                    );
                    put_byte(s, s.gzhead.time & 255);
                    put_byte(s, s.gzhead.time >> 8 & 255);
                    put_byte(s, s.gzhead.time >> 16 & 255);
                    put_byte(s, s.gzhead.time >> 24 & 255);
                    put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
                    put_byte(s, s.gzhead.os & 255);
                    if (s.gzhead.extra && s.gzhead.extra.length) {
                        put_byte(s, s.gzhead.extra.length & 255);
                        put_byte(s, s.gzhead.extra.length >> 8 & 255);
                    }
                    if (s.gzhead.hcrc) {
                        strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending, 0);
                    }
                    s.gzindex = 0;
                    s.status = EXTRA_STATE;
                }
            } else {
                var header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
                var level_flags = -1;
                if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
                    level_flags = 0;
                } else if (s.level < 6) {
                    level_flags = 1;
                } else if (s.level === 6) {
                    level_flags = 2;
                } else {
                    level_flags = 3;
                }
                header |= level_flags << 6;
                if (s.strstart !== 0) {
                    header |= PRESET_DICT;
                }
                header += 31 - header % 31;
                s.status = BUSY_STATE;
                putShortMSB(s, header);
                if (s.strstart !== 0) {
                    putShortMSB(s, strm.adler >>> 16);
                    putShortMSB(s, strm.adler & 65535);
                }
                strm.adler = 1;
            }
        }
        if (s.status === EXTRA_STATE) {
            if (s.gzhead.extra) {
                beg = s.pending;
                while (s.gzindex < (s.gzhead.extra.length & 65535)) {
                    if (s.pending === s.pending_buf_size) {
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        flush_pending(strm);
                        beg = s.pending;
                        if (s.pending === s.pending_buf_size) {
                            break;
                        }
                    }
                    put_byte(s, s.gzhead.extra[s.gzindex] & 255);
                    s.gzindex++;
                }
                if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                if (s.gzindex === s.gzhead.extra.length) {
                    s.gzindex = 0;
                    s.status = NAME_STATE;
                }
            } else {
                s.status = NAME_STATE;
            }
        }
        if (s.status === NAME_STATE) {
            if (s.gzhead.name) {
                beg = s.pending;
                do {
                    if (s.pending === s.pending_buf_size) {
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        flush_pending(strm);
                        beg = s.pending;
                        if (s.pending === s.pending_buf_size) {
                            val = 1;
                            break;
                        }
                    }
                    if (s.gzindex < s.gzhead.name.length) {
                        val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
                    } else {
                        val = 0;
                    }
                    put_byte(s, val);
                } while (val !== 0);
                if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                if (val === 0) {
                    s.gzindex = 0;
                    s.status = COMMENT_STATE;
                }
            } else {
                s.status = COMMENT_STATE;
            }
        }
        if (s.status === COMMENT_STATE) {
            if (s.gzhead.comment) {
                beg = s.pending;
                do {
                    if (s.pending === s.pending_buf_size) {
                        if (s.gzhead.hcrc && s.pending > beg) {
                            strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                        }
                        flush_pending(strm);
                        beg = s.pending;
                        if (s.pending === s.pending_buf_size) {
                            val = 1;
                            break;
                        }
                    }
                    if (s.gzindex < s.gzhead.comment.length) {
                        val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
                    } else {
                        val = 0;
                    }
                    put_byte(s, val);
                } while (val !== 0);
                if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32$1(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                if (val === 0) {
                    s.status = HCRC_STATE;
                }
            } else {
                s.status = HCRC_STATE;
            }
        }
        if (s.status === HCRC_STATE) {
            if (s.gzhead.hcrc) {
                if (s.pending + 2 > s.pending_buf_size) {
                    flush_pending(strm);
                }
                if (s.pending + 2 <= s.pending_buf_size) {
                    put_byte(s, strm.adler & 255);
                    put_byte(s, strm.adler >> 8 & 255);
                    strm.adler = 0;
                    s.status = BUSY_STATE;
                }
            } else {
                s.status = BUSY_STATE;
            }
        }
        if (s.pending !== 0) {
            flush_pending(strm);
            if (strm.avail_out === 0) {
                s.last_flush = -1;
                return Z_OK$2;
            }
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$2) {
            return err(strm, Z_BUF_ERROR$1);
        }
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
            return err(strm, Z_BUF_ERROR$1);
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE) {
            var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
            if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
                s.status = FINISH_STATE;
            }
            if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
                if (strm.avail_out === 0) {
                    s.last_flush = -1;
                }
                return Z_OK$2;
            }
            if (bstate === BS_BLOCK_DONE) {
                if (flush === Z_PARTIAL_FLUSH) {
                    trees._tr_align(s);
                } else if (flush !== Z_BLOCK$1) {
                    trees._tr_stored_block(s, 0, 0, false);
                    if (flush === Z_FULL_FLUSH) {
                        zero(s.head);
                        if (s.lookahead === 0) {
                            s.strstart = 0;
                            s.block_start = 0;
                            s.insert = 0;
                        }
                    }
                }
                flush_pending(strm);
                if (strm.avail_out === 0) {
                    s.last_flush = -1;
                    return Z_OK$2;
                }
            }
        }
        if (flush !== Z_FINISH$2) {
            return Z_OK$2;
        }
        if (s.wrap <= 0) {
            return Z_STREAM_END$2;
        }
        if (s.wrap === 2) {
            put_byte(s, strm.adler & 255);
            put_byte(s, strm.adler >> 8 & 255);
            put_byte(s, strm.adler >> 16 & 255);
            put_byte(s, strm.adler >> 24 & 255);
            put_byte(s, strm.total_in & 255);
            put_byte(s, strm.total_in >> 8 & 255);
            put_byte(s, strm.total_in >> 16 & 255);
            put_byte(s, strm.total_in >> 24 & 255);
        } else {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 65535);
        }
        flush_pending(strm);
        if (s.wrap > 0) {
            s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
    }
    function deflateEnd(strm) {
        var status;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR$1;
        }
        status = strm.state.status;
        if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
            return err(strm, Z_STREAM_ERROR$1);
        }
        strm.state = null;
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$1) : Z_OK$2;
    }
    function deflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var s;
        var str, n;
        var wrap2;
        var avail;
        var next;
        var input;
        var tmpDict;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR$1;
        }
        s = strm.state;
        wrap2 = s.wrap;
        if (wrap2 === 2 || wrap2 === 1 && s.status !== INIT_STATE || s.lookahead) {
            return Z_STREAM_ERROR$1;
        }
        if (wrap2 === 1) {
            strm.adler = adler32$1(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
            if (wrap2 === 0) {
                zero(s.head);
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
            }
            tmpDict = new utils$5.Buf8(s.w_size);
            utils$5.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
            dictionary = tmpDict;
            dictLength = s.w_size;
        }
        avail = strm.avail_in;
        next = strm.next_in;
        input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
            str = s.strstart;
            n = s.lookahead - (MIN_MATCH - 1);
            do {
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
                s.prev[str & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = str;
                str++;
            } while (--n);
            s.strstart = str;
            s.lookahead = MIN_MATCH - 1;
            fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap2;
        return Z_OK$2;
    }
    deflate$3.deflateInit = deflateInit;
    deflate$3.deflateInit2 = deflateInit2;
    deflate$3.deflateReset = deflateReset;
    deflate$3.deflateResetKeep = deflateResetKeep;
    deflate$3.deflateSetHeader = deflateSetHeader;
    deflate$3.deflate = deflate$2;
    deflate$3.deflateEnd = deflateEnd;
    deflate$3.deflateSetDictionary = deflateSetDictionary;
    deflate$3.deflateInfo = "pako deflate (from Nodeca project)";
    var strings$2 = {};
    var utils$4 = common;
    var STR_APPLY_OK = true;
    var STR_APPLY_UIA_OK = true;
    try {
        String.fromCharCode.apply(null, [0]);
    } catch (__) {
        STR_APPLY_OK = false;
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (__) {
        STR_APPLY_UIA_OK = false;
    }
    var _utf8len = new utils$4.Buf8(256);
    for (q = 0; q < 256; q++) {
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
    }
    var q;
    _utf8len[254] = _utf8len[254] = 1;
    strings$2.string2buf = function(str) {
        var buf, c2, c22, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
            c2 = str.charCodeAt(m_pos);
            if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
                c22 = str.charCodeAt(m_pos + 1);
                if ((c22 & 64512) === 56320) {
                    c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
                    m_pos++;
                }
            }
            buf_len += c2 < 128 ? 1 : c2 < 2048 ? 2 : c2 < 65536 ? 3 : 4;
        }
        buf = new utils$4.Buf8(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
            c2 = str.charCodeAt(m_pos);
            if ((c2 & 64512) === 55296 && m_pos + 1 < str_len) {
                c22 = str.charCodeAt(m_pos + 1);
                if ((c22 & 64512) === 56320) {
                    c2 = 65536 + (c2 - 55296 << 10) + (c22 - 56320);
                    m_pos++;
                }
            }
            if (c2 < 128) {
                buf[i++] = c2;
            } else if (c2 < 2048) {
                buf[i++] = 192 | c2 >>> 6;
                buf[i++] = 128 | c2 & 63;
            } else if (c2 < 65536) {
                buf[i++] = 224 | c2 >>> 12;
                buf[i++] = 128 | c2 >>> 6 & 63;
                buf[i++] = 128 | c2 & 63;
            } else {
                buf[i++] = 240 | c2 >>> 18;
                buf[i++] = 128 | c2 >>> 12 & 63;
                buf[i++] = 128 | c2 >>> 6 & 63;
                buf[i++] = 128 | c2 & 63;
            }
        }
        return buf;
    };
    function buf2binstring(buf, len) {
        if (len < 65534) {
            if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
                return String.fromCharCode.apply(null, utils$4.shrinkBuf(buf, len));
            }
        }
        var result = "";
        for (var i = 0; i < len; i++) {
            result += String.fromCharCode(buf[i]);
        }
        return result;
    }
    strings$2.buf2binstring = function(buf) {
        return buf2binstring(buf, buf.length);
    };
    strings$2.binstring2buf = function(str) {
        var buf = new utils$4.Buf8(str.length);
        for (var i = 0, len = buf.length; i < len; i++) {
            buf[i] = str.charCodeAt(i);
        }
        return buf;
    };
    strings$2.buf2string = function(buf, max) {
        var i, out, c2, c_len;
        var len = max || buf.length;
        var utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
            c2 = buf[i++];
            if (c2 < 128) {
                utf16buf[out++] = c2;
                continue;
            }
            c_len = _utf8len[c2];
            if (c_len > 4) {
                utf16buf[out++] = 65533;
                i += c_len - 1;
                continue;
            }
            c2 &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
            while (c_len > 1 && i < len) {
                c2 = c2 << 6 | buf[i++] & 63;
                c_len--;
            }
            if (c_len > 1) {
                utf16buf[out++] = 65533;
                continue;
            }
            if (c2 < 65536) {
                utf16buf[out++] = c2;
            } else {
                c2 -= 65536;
                utf16buf[out++] = 55296 | c2 >> 10 & 1023;
                utf16buf[out++] = 56320 | c2 & 1023;
            }
        }
        return buf2binstring(utf16buf, out);
    };
    strings$2.utf8border = function(buf, max) {
        var pos;
        max = max || buf.length;
        if (max > buf.length) {
            max = buf.length;
        }
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 192) === 128) {
            pos--;
        }
        if (pos < 0) {
            return max;
        }
        if (pos === 0) {
            return max;
        }
        return pos + _utf8len[buf[pos]] > max ? pos : max;
    };
    function ZStream$2() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = "";
        this.state = null;
        this.data_type = 2;
        this.adler = 0;
    }
    var zstream = ZStream$2;
    var zlib_deflate = deflate$3;
    var utils$3 = common;
    var strings$1 = strings$2;
    var msg$1 = messages;
    var ZStream$1 = zstream;
    var toString$1 = Object.prototype.toString;
    var Z_NO_FLUSH = 0;
    var Z_FINISH$1 = 4;
    var Z_OK$1 = 0;
    var Z_STREAM_END$1 = 1;
    var Z_SYNC_FLUSH = 2;
    var Z_DEFAULT_COMPRESSION = -1;
    var Z_DEFAULT_STRATEGY = 0;
    var Z_DEFLATED$1 = 8;
    function Deflate(options) {
        if (!(this instanceof Deflate))
            return new Deflate(options);
        this.options = utils$3.assign({
            level: Z_DEFAULT_COMPRESSION,
            method: Z_DEFLATED$1,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: Z_DEFAULT_STRATEGY,
            to: ""
        }, options || {});
        var opt = this.options;
        if (opt.raw && opt.windowBits > 0) {
            opt.windowBits = -opt.windowBits;
        } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
            opt.windowBits += 16;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream$1();
        this.strm.avail_out = 0;
        var status = zlib_deflate.deflateInit2(
            this.strm,
            opt.level,
            opt.method,
            opt.windowBits,
            opt.memLevel,
            opt.strategy
        );
        if (status !== Z_OK$1) {
            throw new Error(msg$1[status]);
        }
        if (opt.header) {
            zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
        if (opt.dictionary) {
            var dict;
            if (typeof opt.dictionary === "string") {
                dict = strings$1.string2buf(opt.dictionary);
            } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
                dict = new Uint8Array(opt.dictionary);
            } else {
                dict = opt.dictionary;
            }
            status = zlib_deflate.deflateSetDictionary(this.strm, dict);
            if (status !== Z_OK$1) {
                throw new Error(msg$1[status]);
            }
            this._dict_set = true;
        }
    }
    Deflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var status, _mode;
        if (this.ended) {
            return false;
        }
        _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH$1 : Z_NO_FLUSH;
        if (typeof data === "string") {
            strm.input = strings$1.string2buf(data);
        } else if (toString$1.call(data) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(data);
        } else {
            strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
            if (strm.avail_out === 0) {
                strm.output = new utils$3.Buf8(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
            }
            status = zlib_deflate.deflate(strm, _mode);
            if (status !== Z_STREAM_END$1 && status !== Z_OK$1) {
                this.onEnd(status);
                this.ended = true;
                return false;
            }
            if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH$1 || _mode === Z_SYNC_FLUSH)) {
                if (this.options.to === "string") {
                    this.onData(strings$1.buf2binstring(utils$3.shrinkBuf(strm.output, strm.next_out)));
                } else {
                    this.onData(utils$3.shrinkBuf(strm.output, strm.next_out));
                }
            }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END$1);
        if (_mode === Z_FINISH$1) {
            status = zlib_deflate.deflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return status === Z_OK$1;
        }
        if (_mode === Z_SYNC_FLUSH) {
            this.onEnd(Z_OK$1);
            strm.avail_out = 0;
            return true;
        }
        return true;
    };
    Deflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
    };
    Deflate.prototype.onEnd = function(status) {
        if (status === Z_OK$1) {
            if (this.options.to === "string") {
                this.result = this.chunks.join("");
            } else {
                this.result = utils$3.flattenChunks(this.chunks);
            }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
    };
    function deflate$1(input, options) {
        var deflator = new Deflate(options);
        deflator.push(input, true);
        if (deflator.err) {
            throw deflator.msg || msg$1[deflator.err];
        }
        return deflator.result;
    }
    function deflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return deflate$1(input, options);
    }
    function gzip(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate$1(input, options);
    }
    deflate$4.Deflate = Deflate;
    deflate$4.deflate = deflate$1;
    deflate$4.deflateRaw = deflateRaw;
    deflate$4.gzip = gzip;
    var inflate$4 = {};
    var inflate$3 = {};
    var BAD$1 = 30;
    var TYPE$1 = 12;
    var inffast = function inflate_fast(strm, start) {
        var state;
        var _in;
        var last;
        var _out;
        var beg;
        var end;
        var dmax;
        var wsize;
        var whave;
        var wnext;
        var s_window;
        var hold;
        var bits;
        var lcode;
        var dcode;
        var lmask;
        var dmask;
        var here;
        var op;
        var len;
        var dist;
        var from;
        var from_source;
        var input, output;
        state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top:
            do {
                if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                }
                here = lcode[hold & lmask];
                dolen:
                    for (; ; ) {
                        op = here >>> 24;
                        hold >>>= op;
                        bits -= op;
                        op = here >>> 16 & 255;
                        if (op === 0) {
                            output[_out++] = here & 65535;
                        } else if (op & 16) {
                            len = here & 65535;
                            op &= 15;
                            if (op) {
                                if (bits < op) {
                                    hold += input[_in++] << bits;
                                    bits += 8;
                                }
                                len += hold & (1 << op) - 1;
                                hold >>>= op;
                                bits -= op;
                            }
                            if (bits < 15) {
                                hold += input[_in++] << bits;
                                bits += 8;
                                hold += input[_in++] << bits;
                                bits += 8;
                            }
                            here = dcode[hold & dmask];
                            dodist:
                                for (; ; ) {
                                    op = here >>> 24;
                                    hold >>>= op;
                                    bits -= op;
                                    op = here >>> 16 & 255;
                                    if (op & 16) {
                                        dist = here & 65535;
                                        op &= 15;
                                        if (bits < op) {
                                            hold += input[_in++] << bits;
                                            bits += 8;
                                            if (bits < op) {
                                                hold += input[_in++] << bits;
                                                bits += 8;
                                            }
                                        }
                                        dist += hold & (1 << op) - 1;
                                        if (dist > dmax) {
                                            strm.msg = "invalid distance too far back";
                                            state.mode = BAD$1;
                                            break top;
                                        }
                                        hold >>>= op;
                                        bits -= op;
                                        op = _out - beg;
                                        if (dist > op) {
                                            op = dist - op;
                                            if (op > whave) {
                                                if (state.sane) {
                                                    strm.msg = "invalid distance too far back";
                                                    state.mode = BAD$1;
                                                    break top;
                                                }
                                            }
                                            from = 0;
                                            from_source = s_window;
                                            if (wnext === 0) {
                                                from += wsize - op;
                                                if (op < len) {
                                                    len -= op;
                                                    do {
                                                        output[_out++] = s_window[from++];
                                                    } while (--op);
                                                    from = _out - dist;
                                                    from_source = output;
                                                }
                                            } else if (wnext < op) {
                                                from += wsize + wnext - op;
                                                op -= wnext;
                                                if (op < len) {
                                                    len -= op;
                                                    do {
                                                        output[_out++] = s_window[from++];
                                                    } while (--op);
                                                    from = 0;
                                                    if (wnext < len) {
                                                        op = wnext;
                                                        len -= op;
                                                        do {
                                                            output[_out++] = s_window[from++];
                                                        } while (--op);
                                                        from = _out - dist;
                                                        from_source = output;
                                                    }
                                                }
                                            } else {
                                                from += wnext - op;
                                                if (op < len) {
                                                    len -= op;
                                                    do {
                                                        output[_out++] = s_window[from++];
                                                    } while (--op);
                                                    from = _out - dist;
                                                    from_source = output;
                                                }
                                            }
                                            while (len > 2) {
                                                output[_out++] = from_source[from++];
                                                output[_out++] = from_source[from++];
                                                output[_out++] = from_source[from++];
                                                len -= 3;
                                            }
                                            if (len) {
                                                output[_out++] = from_source[from++];
                                                if (len > 1) {
                                                    output[_out++] = from_source[from++];
                                                }
                                            }
                                        } else {
                                            from = _out - dist;
                                            do {
                                                output[_out++] = output[from++];
                                                output[_out++] = output[from++];
                                                output[_out++] = output[from++];
                                                len -= 3;
                                            } while (len > 2);
                                            if (len) {
                                                output[_out++] = output[from++];
                                                if (len > 1) {
                                                    output[_out++] = output[from++];
                                                }
                                            }
                                        }
                                    } else if ((op & 64) === 0) {
                                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                                        continue dodist;
                                    } else {
                                        strm.msg = "invalid distance code";
                                        state.mode = BAD$1;
                                        break top;
                                    }
                                    break;
                                }
                        } else if ((op & 64) === 0) {
                            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                            continue dolen;
                        } else if (op & 32) {
                            state.mode = TYPE$1;
                            break top;
                        } else {
                            strm.msg = "invalid literal/length code";
                            state.mode = BAD$1;
                            break top;
                        }
                        break;
                    }
            } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
    };
    var utils$2 = common;
    var MAXBITS = 15;
    var ENOUGH_LENS$1 = 852;
    var ENOUGH_DISTS$1 = 592;
    var CODES$1 = 0;
    var LENS$1 = 1;
    var DISTS$1 = 2;
    var lbase = [
    /* Length codes 257..285 base */
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
    ];
    var lext = [
    /* Length codes 257..285 extra */
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
    ];
    var dbase = [
    /* Distance codes 0..29 base */
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
    ];
    var dext = [
    /* Distance codes 0..29 extra */
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
    ];
    var inftrees = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
        var bits = opts.bits;
        var len = 0;
        var sym = 0;
        var min = 0, max = 0;
        var root = 0;
        var curr = 0;
        var drop = 0;
        var left = 0;
        var used = 0;
        var huff = 0;
        var incr;
        var fill;
        var low;
        var mask;
        var next;
        var base = null;
        var base_index = 0;
        var end;
        var count = new utils$2.Buf16(MAXBITS + 1);
        var offs = new utils$2.Buf16(MAXBITS + 1);
        var extra = null;
        var extra_index = 0;
        var here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS; len++) {
            count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
            count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
            if (count[max] !== 0) {
                break;
            }
        }
        if (root > max) {
            root = max;
        }
        if (max === 0) {
            table[table_index++] = 1 << 24 | 64 << 16 | 0;
            table[table_index++] = 1 << 24 | 64 << 16 | 0;
            opts.bits = 1;
            return 0;
        }
        for (min = 1; min < max; min++) {
            if (count[min] !== 0) {
                break;
            }
        }
        if (root < min) {
            root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
            left <<= 1;
            left -= count[len];
            if (left < 0) {
                return -1;
            }
        }
        if (left > 0 && (type === CODES$1 || max !== 1)) {
            return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
            offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
            if (lens[lens_index + sym] !== 0) {
                work[offs[lens[lens_index + sym]]++] = sym;
            }
        }
        if (type === CODES$1) {
            base = extra = work;
            end = 19;
        } else if (type === LENS$1) {
            base = lbase;
            base_index -= 257;
            extra = lext;
            extra_index -= 257;
            end = 256;
        } else {
            base = dbase;
            extra = dext;
            end = -1;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
            return 1;
        }
        for (; ; ) {
            here_bits = len - drop;
            if (work[sym] < end) {
                here_op = 0;
                here_val = work[sym];
            } else if (work[sym] > end) {
                here_op = extra[extra_index + work[sym]];
                here_val = base[base_index + work[sym]];
            } else {
                here_op = 32 + 64;
                here_val = 0;
            }
            incr = 1 << len - drop;
            fill = 1 << curr;
            min = fill;
            do {
                fill -= incr;
                table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
            } while (fill !== 0);
            incr = 1 << len - 1;
            while (huff & incr) {
                incr >>= 1;
            }
            if (incr !== 0) {
                huff &= incr - 1;
                huff += incr;
            } else {
                huff = 0;
            }
            sym++;
            if (--count[len] === 0) {
                if (len === max) {
                    break;
                }
                len = lens[lens_index + work[sym]];
            }
            if (len > root && (huff & mask) !== low) {
                if (drop === 0) {
                    drop = root;
                }
                next += min;
                curr = len - drop;
                left = 1 << curr;
                while (curr + drop < max) {
                    left -= count[curr + drop];
                    if (left <= 0) {
                        break;
                    }
                    curr++;
                    left <<= 1;
                }
                used += 1 << curr;
                if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
                    return 1;
                }
                low = huff & mask;
                table[low] = root << 24 | curr << 16 | next - table_index | 0;
            }
        }
        if (huff !== 0) {
            table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }
        opts.bits = root;
        return 0;
    };
    var utils$1 = common;
    var adler32 = adler32_1;
    var crc32 = crc32_1;
    var inflate_fast2 = inffast;
    var inflate_table2 = inftrees;
    var CODES = 0;
    var LENS = 1;
    var DISTS = 2;
    var Z_FINISH = 4;
    var Z_BLOCK = 5;
    var Z_TREES = 6;
    var Z_OK = 0;
    var Z_STREAM_END = 1;
    var Z_NEED_DICT = 2;
    var Z_STREAM_ERROR = -2;
    var Z_DATA_ERROR = -3;
    var Z_MEM_ERROR = -4;
    var Z_BUF_ERROR = -5;
    var Z_DEFLATED = 8;
    var HEAD = 1;
    var FLAGS = 2;
    var TIME = 3;
    var OS = 4;
    var EXLEN = 5;
    var EXTRA = 6;
    var NAME = 7;
    var COMMENT = 8;
    var HCRC = 9;
    var DICTID = 10;
    var DICT = 11;
    var TYPE = 12;
    var TYPEDO = 13;
    var STORED = 14;
    var COPY_ = 15;
    var COPY = 16;
    var TABLE = 17;
    var LENLENS = 18;
    var CODELENS = 19;
    var LEN_ = 20;
    var LEN = 21;
    var LENEXT = 22;
    var DIST = 23;
    var DISTEXT = 24;
    var MATCH = 25;
    var LIT = 26;
    var CHECK = 27;
    var LENGTH = 28;
    var DONE = 29;
    var BAD = 30;
    var MEM = 31;
    var SYNC = 32;
    var ENOUGH_LENS = 852;
    var ENOUGH_DISTS = 592;
    var MAX_WBITS = 15;
    var DEF_WBITS = MAX_WBITS;
    function zswap32(q) {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
    }
    function InflateState() {
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new utils$1.Buf16(320);
        this.work = new utils$1.Buf16(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0;
    }
    function inflateResetKeep(strm) {
        var state;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = "";
        if (state.wrap) {
            strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new utils$1.Buf32(ENOUGH_LENS);
        state.distcode = state.distdyn = new utils$1.Buf32(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        return Z_OK;
    }
    function inflateReset(strm) {
        var state;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
    }
    function inflateReset2(strm, windowBits) {
        var wrap2;
        var state;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (windowBits < 0) {
            wrap2 = 0;
            windowBits = -windowBits;
        } else {
            wrap2 = (windowBits >> 4) + 1;
            if (windowBits < 48) {
                windowBits &= 15;
            }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
            return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
            state.window = null;
        }
        state.wrap = wrap2;
        state.wbits = windowBits;
        return inflateReset(strm);
    }
    function inflateInit2(strm, windowBits) {
        var ret;
        var state;
        if (!strm) {
            return Z_STREAM_ERROR;
        }
        state = new InflateState();
        strm.state = state;
        state.window = null;
        ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
            strm.state = null;
        }
        return ret;
    }
    function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
    }
    var virgin = true;
    var lenfix;
    var distfix;
    function fixedtables(state) {
        if (virgin) {
            var sym;
            lenfix = new utils$1.Buf32(512);
            distfix = new utils$1.Buf32(32);
            sym = 0;
            while (sym < 144) {
                state.lens[sym++] = 8;
            }
            while (sym < 256) {
                state.lens[sym++] = 9;
            }
            while (sym < 280) {
                state.lens[sym++] = 7;
            }
            while (sym < 288) {
                state.lens[sym++] = 8;
            }
            inflate_table2(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
            sym = 0;
            while (sym < 32) {
                state.lens[sym++] = 5;
            }
            inflate_table2(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
            virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
    }
    function updatewindow(strm, src, end, copy) {
        var dist;
        var state = strm.state;
        if (state.window === null) {
            state.wsize = 1 << state.wbits;
            state.wnext = 0;
            state.whave = 0;
            state.window = new utils$1.Buf8(state.wsize);
        }
        if (copy >= state.wsize) {
            utils$1.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
            state.wnext = 0;
            state.whave = state.wsize;
        } else {
            dist = state.wsize - state.wnext;
            if (dist > copy) {
                dist = copy;
            }
            utils$1.arraySet(state.window, src, end - copy, dist, state.wnext);
            copy -= dist;
            if (copy) {
                utils$1.arraySet(state.window, src, end - copy, copy, 0);
                state.wnext = copy;
                state.whave = state.wsize;
            } else {
                state.wnext += dist;
                if (state.wnext === state.wsize) {
                    state.wnext = 0;
                }
                if (state.whave < state.wsize) {
                    state.whave += dist;
                }
            }
        }
        return 0;
    }
    function inflate$2(strm, flush) {
        var state;
        var input, output;
        var next;
        var put;
        var have, left;
        var hold;
        var bits;
        var _in, _out;
        var copy;
        var from;
        var from_source;
        var here = 0;
        var here_bits, here_op, here_val;
        var last_bits, last_op, last_val;
        var len;
        var ret;
        var hbuf = new utils$1.Buf8(4);
        var opts;
        var n;
        var order = (
            /* permutation of code lengths */
            [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        );
        if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.mode === TYPE) {
            state.mode = TYPEDO;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK;
        inf_leave:
            for (; ; ) {
                switch (state.mode) {
                    case HEAD:
                        if (state.wrap === 0) {
                            state.mode = TYPEDO;
                            break;
                        }
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if (state.wrap & 2 && hold === 35615) {
                            state.check = 0;
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0);
                            hold = 0;
                            bits = 0;
                            state.mode = FLAGS;
                            break;
                        }
                        state.flags = 0;
                        if (state.head) {
                            state.head.done = false;
                        }
                        if (!(state.wrap & 1) || /* check if zlib header allowed */
                            (((hold & 255) << 8) + (hold >> 8)) % 31) {
                            strm.msg = "incorrect header check";
                            state.mode = BAD;
                            break;
                        }
                        if ((hold & 15) !== Z_DEFLATED) {
                            strm.msg = "unknown compression method";
                            state.mode = BAD;
                            break;
                        }
                        hold >>>= 4;
                        bits -= 4;
                        len = (hold & 15) + 8;
                        if (state.wbits === 0) {
                            state.wbits = len;
                        } else if (len > state.wbits) {
                            strm.msg = "invalid window size";
                            state.mode = BAD;
                            break;
                        }
                        state.dmax = 1 << len;
                        strm.adler = state.check = 1;
                        state.mode = hold & 512 ? DICTID : TYPE;
                        hold = 0;
                        bits = 0;
                        break;
                    case FLAGS:
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        state.flags = hold;
                        if ((state.flags & 255) !== Z_DEFLATED) {
                            strm.msg = "unknown compression method";
                            state.mode = BAD;
                            break;
                        }
                        if (state.flags & 57344) {
                            strm.msg = "unknown header flags set";
                            state.mode = BAD;
                            break;
                        }
                        if (state.head) {
                            state.head.text = hold >> 8 & 1;
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0);
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = TIME;
                    case TIME:
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if (state.head) {
                            state.head.time = hold;
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            hbuf[2] = hold >>> 16 & 255;
                            hbuf[3] = hold >>> 24 & 255;
                            state.check = crc32(state.check, hbuf, 4, 0);
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = OS;
                    case OS:
                        while (bits < 16) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if (state.head) {
                            state.head.xflags = hold & 255;
                            state.head.os = hold >> 8;
                        }
                        if (state.flags & 512) {
                            hbuf[0] = hold & 255;
                            hbuf[1] = hold >>> 8 & 255;
                            state.check = crc32(state.check, hbuf, 2, 0);
                        }
                        hold = 0;
                        bits = 0;
                        state.mode = EXLEN;
                    case EXLEN:
                        if (state.flags & 1024) {
                            while (bits < 16) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            state.length = hold;
                            if (state.head) {
                                state.head.extra_len = hold;
                            }
                            if (state.flags & 512) {
                                hbuf[0] = hold & 255;
                                hbuf[1] = hold >>> 8 & 255;
                                state.check = crc32(state.check, hbuf, 2, 0);
                            }
                            hold = 0;
                            bits = 0;
                        } else if (state.head) {
                            state.head.extra = null;
                        }
                        state.mode = EXTRA;
                    case EXTRA:
                        if (state.flags & 1024) {
                            copy = state.length;
                            if (copy > have) {
                                copy = have;
                            }
                            if (copy) {
                                if (state.head) {
                                    len = state.head.extra_len - state.length;
                                    if (!state.head.extra) {
                                        state.head.extra = new Array(state.head.extra_len);
                                    }
                                    utils$1.arraySet(
                                        state.head.extra,
                                        input,
                                        next,
                                        // extra field is limited to 65536 bytes
                                        // - no need for additional size check
                                        copy,
                                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                                        len
                                    );
                                }
                                if (state.flags & 512) {
                                    state.check = crc32(state.check, input, copy, next);
                                }
                                have -= copy;
                                next += copy;
                                state.length -= copy;
                            }
                            if (state.length) {
                                break inf_leave;
                            }
                        }
                        state.length = 0;
                        state.mode = NAME;
                    case NAME:
                        if (state.flags & 2048) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            copy = 0;
                            do {
                                len = input[next + copy++];
                                if (state.head && len && state.length < 65536) {
                                    state.head.name += String.fromCharCode(len);
                                }
                            } while (len && copy < have);
                            if (state.flags & 512) {
                                state.check = crc32(state.check, input, copy, next);
                            }
                            have -= copy;
                            next += copy;
                            if (len) {
                                break inf_leave;
                            }
                        } else if (state.head) {
                            state.head.name = null;
                        }
                        state.length = 0;
                        state.mode = COMMENT;
                    case COMMENT:
                        if (state.flags & 4096) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            copy = 0;
                            do {
                                len = input[next + copy++];
                                if (state.head && len && state.length < 65536) {
                                    state.head.comment += String.fromCharCode(len);
                                }
                            } while (len && copy < have);
                            if (state.flags & 512) {
                                state.check = crc32(state.check, input, copy, next);
                            }
                            have -= copy;
                            next += copy;
                            if (len) {
                                break inf_leave;
                            }
                        } else if (state.head) {
                            state.head.comment = null;
                        }
                        state.mode = HCRC;
                    case HCRC:
                        if (state.flags & 512) {
                            while (bits < 16) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            if (hold !== (state.check & 65535)) {
                                strm.msg = "header crc mismatch";
                                state.mode = BAD;
                                break;
                            }
                            hold = 0;
                            bits = 0;
                        }
                        if (state.head) {
                            state.head.hcrc = state.flags >> 9 & 1;
                            state.head.done = true;
                        }
                        strm.adler = state.check = 0;
                        state.mode = TYPE;
                        break;
                    case DICTID:
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        strm.adler = state.check = zswap32(hold);
                        hold = 0;
                        bits = 0;
                        state.mode = DICT;
                    case DICT:
                        if (state.havedict === 0) {
                            strm.next_out = put;
                            strm.avail_out = left;
                            strm.next_in = next;
                            strm.avail_in = have;
                            state.hold = hold;
                            state.bits = bits;
                            return Z_NEED_DICT;
                        }
                        strm.adler = state.check = 1;
                        state.mode = TYPE;
                    case TYPE:
                        if (flush === Z_BLOCK || flush === Z_TREES) {
                            break inf_leave;
                        }
                    case TYPEDO:
                        if (state.last) {
                            hold >>>= bits & 7;
                            bits -= bits & 7;
                            state.mode = CHECK;
                            break;
                        }
                        while (bits < 3) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        state.last = hold & 1;
                        hold >>>= 1;
                        bits -= 1;
                        switch (hold & 3) {
                            case 0:
                                state.mode = STORED;
                                break;
                            case 1:
                                fixedtables(state);
                                state.mode = LEN_;
                                if (flush === Z_TREES) {
                                    hold >>>= 2;
                                    bits -= 2;
                                    break inf_leave;
                                }
                                break;
                            case 2:
                                state.mode = TABLE;
                                break;
                            case 3:
                                strm.msg = "invalid block type";
                                state.mode = BAD;
                        }
                        hold >>>= 2;
                        bits -= 2;
                        break;
                    case STORED:
                        hold >>>= bits & 7;
                        bits -= bits & 7;
                        while (bits < 32) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                            strm.msg = "invalid stored block lengths";
                            state.mode = BAD;
                            break;
                        }
                        state.length = hold & 65535;
                        hold = 0;
                        bits = 0;
                        state.mode = COPY_;
                        if (flush === Z_TREES) {
                            break inf_leave;
                        }
                    case COPY_:
                        state.mode = COPY;
                    case COPY:
                        copy = state.length;
                        if (copy) {
                            if (copy > have) {
                                copy = have;
                            }
                            if (copy > left) {
                                copy = left;
                            }
                            if (copy === 0) {
                                break inf_leave;
                            }
                            utils$1.arraySet(output, input, next, copy, put);
                            have -= copy;
                            next += copy;
                            left -= copy;
                            put += copy;
                            state.length -= copy;
                            break;
                        }
                        state.mode = TYPE;
                        break;
                    case TABLE:
                        while (bits < 14) {
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        state.nlen = (hold & 31) + 257;
                        hold >>>= 5;
                        bits -= 5;
                        state.ndist = (hold & 31) + 1;
                        hold >>>= 5;
                        bits -= 5;
                        state.ncode = (hold & 15) + 4;
                        hold >>>= 4;
                        bits -= 4;
                        if (state.nlen > 286 || state.ndist > 30) {
                            strm.msg = "too many length or distance symbols";
                            state.mode = BAD;
                            break;
                        }
                        state.have = 0;
                        state.mode = LENLENS;
                    case LENLENS:
                        while (state.have < state.ncode) {
                            while (bits < 3) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            state.lens[order[state.have++]] = hold & 7;
                            hold >>>= 3;
                            bits -= 3;
                        }
                        while (state.have < 19) {
                            state.lens[order[state.have++]] = 0;
                        }
                        state.lencode = state.lendyn;
                        state.lenbits = 7;
                        opts = { bits: state.lenbits };
                        ret = inflate_table2(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                        state.lenbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid code lengths set";
                            state.mode = BAD;
                            break;
                        }
                        state.have = 0;
                        state.mode = CODELENS;
                    case CODELENS:
                        while (state.have < state.nlen + state.ndist) {
                            for (; ; ) {
                                here = state.lencode[hold & (1 << state.lenbits) - 1];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (here_bits <= bits) {
                                    break;
                                }
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            if (here_val < 16) {
                                hold >>>= here_bits;
                                bits -= here_bits;
                                state.lens[state.have++] = here_val;
                            } else {
                                if (here_val === 16) {
                                    n = here_bits + 2;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave;
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    if (state.have === 0) {
                                        strm.msg = "invalid bit length repeat";
                                        state.mode = BAD;
                                        break;
                                    }
                                    len = state.lens[state.have - 1];
                                    copy = 3 + (hold & 3);
                                    hold >>>= 2;
                                    bits -= 2;
                                } else if (here_val === 17) {
                                    n = here_bits + 3;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave;
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    len = 0;
                                    copy = 3 + (hold & 7);
                                    hold >>>= 3;
                                    bits -= 3;
                                } else {
                                    n = here_bits + 7;
                                    while (bits < n) {
                                        if (have === 0) {
                                            break inf_leave;
                                        }
                                        have--;
                                        hold += input[next++] << bits;
                                        bits += 8;
                                    }
                                    hold >>>= here_bits;
                                    bits -= here_bits;
                                    len = 0;
                                    copy = 11 + (hold & 127);
                                    hold >>>= 7;
                                    bits -= 7;
                                }
                                if (state.have + copy > state.nlen + state.ndist) {
                                    strm.msg = "invalid bit length repeat";
                                    state.mode = BAD;
                                    break;
                                }
                                while (copy--) {
                                    state.lens[state.have++] = len;
                                }
                            }
                        }
                        if (state.mode === BAD) {
                            break;
                        }
                        if (state.lens[256] === 0) {
                            strm.msg = "invalid code -- missing end-of-block";
                            state.mode = BAD;
                            break;
                        }
                        state.lenbits = 9;
                        opts = { bits: state.lenbits };
                        ret = inflate_table2(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                        state.lenbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid literal/lengths set";
                            state.mode = BAD;
                            break;
                        }
                        state.distbits = 6;
                        state.distcode = state.distdyn;
                        opts = { bits: state.distbits };
                        ret = inflate_table2(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                        state.distbits = opts.bits;
                        if (ret) {
                            strm.msg = "invalid distances set";
                            state.mode = BAD;
                            break;
                        }
                        state.mode = LEN_;
                        if (flush === Z_TREES) {
                            break inf_leave;
                        }
                    case LEN_:
                        state.mode = LEN;
                    case LEN:
                        if (have >= 6 && left >= 258) {
                            strm.next_out = put;
                            strm.avail_out = left;
                            strm.next_in = next;
                            strm.avail_in = have;
                            state.hold = hold;
                            state.bits = bits;
                            inflate_fast2(strm, _out);
                            put = strm.next_out;
                            output = strm.output;
                            left = strm.avail_out;
                            next = strm.next_in;
                            input = strm.input;
                            have = strm.avail_in;
                            hold = state.hold;
                            bits = state.bits;
                            if (state.mode === TYPE) {
                                state.back = -1;
                            }
                            break;
                        }
                        state.back = 0;
                        for (; ; ) {
                            here = state.lencode[hold & (1 << state.lenbits) - 1];
                            here_bits = here >>> 24;
                            here_op = here >>> 16 & 255;
                            here_val = here & 65535;
                            if (here_bits <= bits) {
                                break;
                            }
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if (here_op && (here_op & 240) === 0) {
                            last_bits = here_bits;
                            last_op = here_op;
                            last_val = here_val;
                            for (; ; ) {
                                here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (last_bits + here_bits <= bits) {
                                    break;
                                }
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            hold >>>= last_bits;
                            bits -= last_bits;
                            state.back += last_bits;
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        state.back += here_bits;
                        state.length = here_val;
                        if (here_op === 0) {
                            state.mode = LIT;
                            break;
                        }
                        if (here_op & 32) {
                            state.back = -1;
                            state.mode = TYPE;
                            break;
                        }
                        if (here_op & 64) {
                            strm.msg = "invalid literal/length code";
                            state.mode = BAD;
                            break;
                        }
                        state.extra = here_op & 15;
                        state.mode = LENEXT;
                    case LENEXT:
                        if (state.extra) {
                            n = state.extra;
                            while (bits < n) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            state.length += hold & (1 << state.extra) - 1;
                            hold >>>= state.extra;
                            bits -= state.extra;
                            state.back += state.extra;
                        }
                        state.was = state.length;
                        state.mode = DIST;
                    case DIST:
                        for (; ; ) {
                            here = state.distcode[hold & (1 << state.distbits) - 1];
                            here_bits = here >>> 24;
                            here_op = here >>> 16 & 255;
                            here_val = here & 65535;
                            if (here_bits <= bits) {
                                break;
                            }
                            if (have === 0) {
                                break inf_leave;
                            }
                            have--;
                            hold += input[next++] << bits;
                            bits += 8;
                        }
                        if ((here_op & 240) === 0) {
                            last_bits = here_bits;
                            last_op = here_op;
                            last_val = here_val;
                            for (; ; ) {
                                here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                                here_bits = here >>> 24;
                                here_op = here >>> 16 & 255;
                                here_val = here & 65535;
                                if (last_bits + here_bits <= bits) {
                                    break;
                                }
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            hold >>>= last_bits;
                            bits -= last_bits;
                            state.back += last_bits;
                        }
                        hold >>>= here_bits;
                        bits -= here_bits;
                        state.back += here_bits;
                        if (here_op & 64) {
                            strm.msg = "invalid distance code";
                            state.mode = BAD;
                            break;
                        }
                        state.offset = here_val;
                        state.extra = here_op & 15;
                        state.mode = DISTEXT;
                    case DISTEXT:
                        if (state.extra) {
                            n = state.extra;
                            while (bits < n) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            state.offset += hold & (1 << state.extra) - 1;
                            hold >>>= state.extra;
                            bits -= state.extra;
                            state.back += state.extra;
                        }
                        if (state.offset > state.dmax) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD;
                            break;
                        }
                        state.mode = MATCH;
                    case MATCH:
                        if (left === 0) {
                            break inf_leave;
                        }
                        copy = _out - left;
                        if (state.offset > copy) {
                            copy = state.offset - copy;
                            if (copy > state.whave) {
                                if (state.sane) {
                                    strm.msg = "invalid distance too far back";
                                    state.mode = BAD;
                                    break;
                                }
                            }
                            if (copy > state.wnext) {
                                copy -= state.wnext;
                                from = state.wsize - copy;
                            } else {
                                from = state.wnext - copy;
                            }
                            if (copy > state.length) {
                                copy = state.length;
                            }
                            from_source = state.window;
                        } else {
                            from_source = output;
                            from = put - state.offset;
                            copy = state.length;
                        }
                        if (copy > left) {
                            copy = left;
                        }
                        left -= copy;
                        state.length -= copy;
                        do {
                            output[put++] = from_source[from++];
                        } while (--copy);
                        if (state.length === 0) {
                            state.mode = LEN;
                        }
                        break;
                    case LIT:
                        if (left === 0) {
                            break inf_leave;
                        }
                        output[put++] = state.length;
                        left--;
                        state.mode = LEN;
                        break;
                    case CHECK:
                        if (state.wrap) {
                            while (bits < 32) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold |= input[next++] << bits;
                                bits += 8;
                            }
                            _out -= left;
                            strm.total_out += _out;
                            state.total += _out;
                            if (_out) {
                                strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                                    state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
                            }
                            _out = left;
                            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                                strm.msg = "incorrect data check";
                                state.mode = BAD;
                                break;
                            }
                            hold = 0;
                            bits = 0;
                        }
                        state.mode = LENGTH;
                    case LENGTH:
                        if (state.wrap && state.flags) {
                            while (bits < 32) {
                                if (have === 0) {
                                    break inf_leave;
                                }
                                have--;
                                hold += input[next++] << bits;
                                bits += 8;
                            }
                            if (hold !== (state.total & 4294967295)) {
                                strm.msg = "incorrect length check";
                                state.mode = BAD;
                                break;
                            }
                            hold = 0;
                            bits = 0;
                        }
                        state.mode = DONE;
                    case DONE:
                        ret = Z_STREAM_END;
                        break inf_leave;
                    case BAD:
                        ret = Z_DATA_ERROR;
                        break inf_leave;
                    case MEM:
                        return Z_MEM_ERROR;
                    case SYNC:
                    default:
                        return Z_STREAM_ERROR;
                }
            }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
            if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
                ;
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap && _out) {
            strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
                state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
            ret = Z_BUF_ERROR;
        }
        return ret;
    }
    function inflateEnd(strm) {
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        var state = strm.state;
        if (state.window) {
            state.window = null;
        }
        strm.state = null;
        return Z_OK;
    }
    function inflateGetHeader(strm, head) {
        var state;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        if ((state.wrap & 2) === 0) {
            return Z_STREAM_ERROR;
        }
        state.head = head;
        head.done = false;
        return Z_OK;
    }
    function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var state;
        var dictid;
        var ret;
        if (!strm || !strm.state) {
            return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
            return Z_STREAM_ERROR;
        }
        if (state.mode === DICT) {
            dictid = 1;
            dictid = adler32(dictid, dictionary, dictLength, 0);
            if (dictid !== state.check) {
                return Z_DATA_ERROR;
            }
        }
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
            state.mode = MEM;
            return Z_MEM_ERROR;
        }
        state.havedict = 1;
        return Z_OK;
    }
    inflate$3.inflateReset = inflateReset;
    inflate$3.inflateReset2 = inflateReset2;
    inflate$3.inflateResetKeep = inflateResetKeep;
    inflate$3.inflateInit = inflateInit;
    inflate$3.inflateInit2 = inflateInit2;
    inflate$3.inflate = inflate$2;
    inflate$3.inflateEnd = inflateEnd;
    inflate$3.inflateGetHeader = inflateGetHeader;
    inflate$3.inflateSetDictionary = inflateSetDictionary;
    inflate$3.inflateInfo = "pako inflate (from Nodeca project)";
    var constants$1 = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        //Z_MEM_ERROR:     -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,
        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };
    function GZheader$1() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = "";
        this.comment = "";
        this.hcrc = 0;
        this.done = false;
    }
    var gzheader = GZheader$1;
    var zlib_inflate = inflate$3;
    var utils = common;
    var strings = strings$2;
    var c = constants$1;
    var msg = messages;
    var ZStream = zstream;
    var GZheader = gzheader;
    var toString = Object.prototype.toString;
    function Inflate(options) {
        if (!(this instanceof Inflate))
            return new Inflate(options);
        this.options = utils.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
        }, options || {});
        var opt = this.options;
        if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
            opt.windowBits = -opt.windowBits;
            if (opt.windowBits === 0) {
                opt.windowBits = -15;
            }
        }
        if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
            opt.windowBits += 32;
        }
        if (opt.windowBits > 15 && opt.windowBits < 48) {
            if ((opt.windowBits & 15) === 0) {
                opt.windowBits |= 15;
            }
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_inflate.inflateInit2(
            this.strm,
            opt.windowBits
        );
        if (status !== c.Z_OK) {
            throw new Error(msg[status]);
        }
        this.header = new GZheader();
        zlib_inflate.inflateGetHeader(this.strm, this.header);
        if (opt.dictionary) {
            if (typeof opt.dictionary === "string") {
                opt.dictionary = strings.string2buf(opt.dictionary);
            } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
                opt.dictionary = new Uint8Array(opt.dictionary);
            }
            if (opt.raw) {
                status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
                if (status !== c.Z_OK) {
                    throw new Error(msg[status]);
                }
            }
        }
    }
    Inflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var dictionary = this.options.dictionary;
        var status, _mode;
        var next_out_utf8, tail, utf8str;
        var allowBufError = false;
        if (this.ended) {
            return false;
        }
        _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
        if (typeof data === "string") {
            strm.input = strings.binstring2buf(data);
        } else if (toString.call(data) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(data);
        } else {
            strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
            if (strm.avail_out === 0) {
                strm.output = new utils.Buf8(chunkSize);
                strm.next_out = 0;
                strm.avail_out = chunkSize;
            }
            status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
            if (status === c.Z_NEED_DICT && dictionary) {
                status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
            }
            if (status === c.Z_BUF_ERROR && allowBufError === true) {
                status = c.Z_OK;
                allowBufError = false;
            }
            if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
                this.onEnd(status);
                this.ended = true;
                return false;
            }
            if (strm.next_out) {
                if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
                    if (this.options.to === "string") {
                        next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                        tail = strm.next_out - next_out_utf8;
                        utf8str = strings.buf2string(strm.output, next_out_utf8);
                        strm.next_out = tail;
                        strm.avail_out = chunkSize - tail;
                        if (tail) {
                            utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
                        }
                        this.onData(utf8str);
                    } else {
                        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
                    }
                }
            }
            if (strm.avail_in === 0 && strm.avail_out === 0) {
                allowBufError = true;
            }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
        if (status === c.Z_STREAM_END) {
            _mode = c.Z_FINISH;
        }
        if (_mode === c.Z_FINISH) {
            status = zlib_inflate.inflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return status === c.Z_OK;
        }
        if (_mode === c.Z_SYNC_FLUSH) {
            this.onEnd(c.Z_OK);
            strm.avail_out = 0;
            return true;
        }
        return true;
    };
    Inflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
    };
    Inflate.prototype.onEnd = function(status) {
        if (status === c.Z_OK) {
            if (this.options.to === "string") {
                this.result = this.chunks.join("");
            } else {
                this.result = utils.flattenChunks(this.chunks);
            }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
    };
    function inflate$1(input, options) {
        var inflator = new Inflate(options);
        inflator.push(input, true);
        if (inflator.err) {
            throw inflator.msg || msg[inflator.err];
        }
        return inflator.result;
    }
    function inflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return inflate$1(input, options);
    }
    inflate$4.Inflate = Inflate;
    inflate$4.inflate = inflate$1;
    inflate$4.inflateRaw = inflateRaw;
    inflate$4.ungzip = inflate$1;
    var assign = common.assign;
    var deflate = deflate$4;
    var inflate = inflate$4;
    var constants = constants$1;
    var pako = {};
    assign(pako, deflate, inflate, constants);
    var pako_1 = pako;
    var env = {
        // RESOURCE_PATH: 'resource://',
        // 以下路径均不以`/`结尾
        USER_DATA_PATH: "",
        TEMP_PATH: "",
        // 示例值 /data/storage/el2/base/haps/entry/temp
        CACHE_PATH: ""
    };
    function initEnv() {
        const plusIoEnv = plus.io.getEnv();
        env.USER_DATA_PATH = plusIoEnv.USER_DATA_PATH;
        env.TEMP_PATH = plusIoEnv.TEMP_PATH;
        env.CACHE_PATH = plusIoEnv.CACHE_PATH;
        return env;
    }
    var initEnvOnce = once(initEnv);
    function getEnv() {
        return initEnvOnce();
    }
    var isObject2 = (val) => val !== null && typeof val === "object";
    var defaultDelimiters = ["{", "}"];
    var BaseFormatter = class {
        constructor() {
            this._caches = /* @__PURE__ */ Object.create(null);
        }
        interpolate(message, values, delimiters = defaultDelimiters) {
            if (!values) {
                return [message];
            }
            let tokens = this._caches[message];
            if (!tokens) {
                tokens = parse(message, delimiters);
                this._caches[message] = tokens;
            }
            return compile2(tokens, values);
        }
    };
    var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
    var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
    function parse(format, [startDelimiter, endDelimiter]) {
        const tokens = [];
        let position = 0;
        let text = "";
        while (position < format.length) {
            let char = format[position++];
            if (char === startDelimiter) {
                if (text) {
                    tokens.push({ type: "text", value: text });
                }
                text = "";
                let sub = "";
                char = format[position++];
                while (char !== void 0 && char !== endDelimiter) {
                    sub += char;
                    char = format[position++];
                }
                const isClosed = char === endDelimiter;
                const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
                tokens.push({ value: sub, type });
            } else {
                text += char;
            }
        }
        text && tokens.push({ type: "text", value: text });
        return tokens;
    }
    function compile2(tokens, values) {
        const compiled = [];
        let index2 = 0;
        const mode = Array.isArray(values) ? "list" : isObject2(values) ? "named" : "unknown";
        if (mode === "unknown") {
            return compiled;
        }
        while (index2 < tokens.length) {
            const token = tokens[index2];
            switch (token.type) {
                case "text":
                    compiled.push(token.value);
                    break;
                case "list":
                    compiled.push(values[parseInt(token.value, 10)]);
                    break;
                case "named":
                    if (mode === "named") {
                        compiled.push(values[token.value]);
                    }
                    break;
            }
            index2++;
        }
        return compiled;
    }
    var LOCALE_ZH_HANS = "zh-Hans";
    var LOCALE_ZH_HANT = "zh-Hant";
    var LOCALE_EN = "en";
    var LOCALE_FR = "fr";
    var LOCALE_ES = "es";
    var hasOwnProperty3 = Object.prototype.hasOwnProperty;
    var hasOwn2 = (val, key) => hasOwnProperty3.call(val, key);
    var defaultFormatter = new BaseFormatter();
    function include(str, parts) {
        return !!parts.find((part) => str.indexOf(part) !== -1);
    }
    function startsWith(str, parts) {
        return parts.find((part) => str.indexOf(part) === 0);
    }
    function normalizeLocale(locale, messages2) {
        if (!locale) {
            return;
        }
        locale = locale.trim().replace(/_/g, "-");
        if (messages2 && messages2[locale]) {
            return locale;
        }
        locale = locale.toLowerCase();
        if (locale === "chinese") {
            return LOCALE_ZH_HANS;
        }
        if (locale.indexOf("zh") === 0) {
            if (locale.indexOf("-hans") > -1) {
                return LOCALE_ZH_HANS;
            }
            if (locale.indexOf("-hant") > -1) {
                return LOCALE_ZH_HANT;
            }
            if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
                return LOCALE_ZH_HANT;
            }
            return LOCALE_ZH_HANS;
        }
        let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
        if (messages2 && Object.keys(messages2).length > 0) {
            locales = Object.keys(messages2);
        }
        const lang = startsWith(locale, locales);
        if (lang) {
            return lang;
        }
    }
    var I18n = class {
        constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
            this.locale = LOCALE_EN;
            this.fallbackLocale = LOCALE_EN;
            this.message = {};
            this.messages = {};
            this.watchers = [];
            if (fallbackLocale) {
                this.fallbackLocale = fallbackLocale;
            }
            this.formater = formater || defaultFormatter;
            this.messages = messages2 || {};
            this.setLocale(locale || LOCALE_EN);
            if (watcher) {
                this.watchLocale(watcher);
            }
        }
        setLocale(locale) {
            const oldLocale = this.locale;
            this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
            if (!this.messages[this.locale]) {
                this.messages[this.locale] = {};
            }
            this.message = this.messages[this.locale];
            if (oldLocale !== this.locale) {
                this.watchers.forEach((watcher) => {
                    watcher(this.locale, oldLocale);
                });
            }
        }
        getLocale() {
            return this.locale;
        }
        watchLocale(fn) {
            const index2 = this.watchers.push(fn) - 1;
            return () => {
                this.watchers.splice(index2, 1);
            };
        }
        add(locale, message, override = true) {
            const curMessages = this.messages[locale];
            if (curMessages) {
                if (override) {
                    Object.assign(curMessages, message);
                } else {
                    Object.keys(message).forEach((key) => {
                        if (!hasOwn2(curMessages, key)) {
                            curMessages[key] = message[key];
                        }
                    });
                }
            } else {
                this.messages[locale] = message;
            }
        }
        f(message, values, delimiters) {
            return this.formater.interpolate(message, values, delimiters).join("");
        }
        t(key, locale, values) {
            let message = this.message;
            if (typeof locale === "string") {
                locale = normalizeLocale(locale, this.messages);
                locale && (message = this.messages[locale]);
            } else {
                values = locale;
            }
            if (!hasOwn2(message, key)) {
                console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
                return key;
            }
            return this.formater.interpolate(message[key], values).join("");
        }
    };
    function watchAppLocale(appVm, i18n2) {
        if (appVm.$watchLocale) {
            appVm.$watchLocale((newLocale) => {
                i18n2.setLocale(newLocale);
            });
        } else {
            appVm.$watch(() => appVm.$locale, (newLocale) => {
                i18n2.setLocale(newLocale);
            });
        }
    }
    function getDefaultLocale() {
        if (typeof uni !== "undefined" && uni.getLocale) {
            return uni.getLocale();
        }
        if (typeof global !== "undefined" && global.getLocale) {
            return global.getLocale();
        }
        return LOCALE_EN;
    }
    function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
        if (typeof locale !== "string") {
            const options = [
                messages2,
                locale
            ];
            locale = options[0];
            messages2 = options[1];
        }
        if (typeof locale !== "string") {
            locale = getDefaultLocale();
        }
        if (typeof fallbackLocale !== "string") {
            fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
        }
        const i18n2 = new I18n({
            locale,
            fallbackLocale,
            messages: messages2,
            watcher
        });
        let t = (key, values) => {
            if (typeof getApp !== "function") {
                t = function(key2, values2) {
                    return i18n2.t(key2, values2);
                };
            } else {
                let isWatchedAppLocale = false;
                t = function(key2, values2) {
                    const appVm = getApp().$vm;
                    if (appVm) {
                        appVm.$locale;
                        if (!isWatchedAppLocale) {
                            isWatchedAppLocale = true;
                            watchAppLocale(appVm, i18n2);
                        }
                    }
                    return i18n2.t(key2, values2);
                };
            }
            return t(key, values);
        };
        return {
            i18n: i18n2,
            f(message, values, delimiters) {
                return i18n2.f(message, values, delimiters);
            },
            t(key, values) {
                return t(key, values);
            },
            add(locale2, message, override = true) {
                return i18n2.add(locale2, message, override);
            },
            watch(fn) {
                return i18n2.watchLocale(fn);
            },
            getLocale() {
                return i18n2.getLocale();
            },
            setLocale(newLocale) {
                return i18n2.setLocale(newLocale);
            }
        };
    }
    function isI18nStr(value, delimiters) {
        return value.indexOf(delimiters[0]) > -1;
    }
    var isEnableLocale = /* @__PURE__ */ once(() => typeof __uniConfig !== "undefined" && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length);
    var i18n;
    function getLocaleMessage() {
        const locale = uni.getLocale();
        const locales = __uniConfig.locales;
        return locales[locale] || locales[__uniConfig.fallbackLocale] || locales.en || {};
    }
    function formatI18n(message) {
        if (isI18nStr(message, I18N_JSON_DELIMITERS)) {
            return useI18n().f(message, getLocaleMessage(), I18N_JSON_DELIMITERS);
        }
        return message;
    }
    function resolveJsonObj(jsonObj, names) {
        if (names.length === 1) {
            if (jsonObj) {
                const _isI18nStr = (value2) => isString(value2) && isI18nStr(value2, I18N_JSON_DELIMITERS);
                const _name = names[0];
                let filterJsonObj = [];
                if (isArray(jsonObj) && (filterJsonObj = jsonObj.filter((item) => _isI18nStr(item[_name]))).length) {
                    return filterJsonObj;
                }
                const value = jsonObj[names[0]];
                if (_isI18nStr(value)) {
                    return jsonObj;
                }
            }
            return;
        }
        const name = names.shift();
        return resolveJsonObj(jsonObj && jsonObj[name], names);
    }
    function defineI18nProperties(obj, names) {
        return names.map((name) => defineI18nProperty(obj, name));
    }
    function defineI18nProperty(obj, names) {
        const jsonObj = resolveJsonObj(obj, names);
        if (!jsonObj) {
            return false;
        }
        const prop = names[names.length - 1];
        if (isArray(jsonObj)) {
            jsonObj.forEach((item) => defineI18nProperty(item, [prop]));
        } else {
            let value = jsonObj[prop];
            Object.defineProperty(jsonObj, prop, {
                get() {
                    return formatI18n(value);
                },
                set(v) {
                    value = v;
                }
            });
        }
        return true;
    }
    function useI18n() {
        if (!i18n) {
            let locale;
            {
                if (typeof getApp === "function") {
                    locale = weex.requireModule("plus").getLanguage();
                } else {
                    locale = plus.webview.currentWebview().getStyle().locale;
                }
            }
            i18n = initVueI18n(locale);
            if (isEnableLocale()) {
                const localeKeys = Object.keys(__uniConfig.locales || {});
                if (localeKeys.length) {
                    localeKeys.forEach((locale2) => i18n.add(locale2, __uniConfig.locales[locale2]));
                }
                i18n.setLocale(locale);
            }
        }
        return i18n;
    }
    function normalizeMessages(module, keys, values) {
        return keys.reduce((res, name, index2) => {
            res[module + name] = values[index2];
            return res;
        }, {});
    }
    var initI18nAppMsgsOnce = /* @__PURE__ */ once(() => {
        const name = "uni.app.";
        const keys = ["quit"];
        {
            useI18n().add(LOCALE_EN, normalizeMessages(name, keys, ["Press back button again to exit"]), false);
        }
        {
            useI18n().add(LOCALE_ES, normalizeMessages(name, keys, ["Pulse otra vez para salir"]), false);
        }
        {
            useI18n().add(LOCALE_FR, normalizeMessages(name, keys, [
                "Appuyez \xE0 nouveau pour quitter l'application"
            ]), false);
        }
        {
            useI18n().add(LOCALE_ZH_HANS, normalizeMessages(name, keys, ["\u518D\u6309\u4E00\u6B21\u9000\u51FA\u5E94\u7528"]), false);
        }
        {
            useI18n().add(LOCALE_ZH_HANT, normalizeMessages(name, keys, ["\u518D\u6309\u4E00\u6B21\u9000\u51FA\u61C9\u7528"]), false);
        }
    });
    function initNavigationBarI18n(navigationBar) {
        if (isEnableLocale()) {
            return defineI18nProperties(navigationBar, [
                ["titleText"],
                ["searchInput", "placeholder"],
                ["buttons", "text"]
            ]);
        }
    }
    function initPullToRefreshI18n(pullToRefresh) {
        if (isEnableLocale()) {
            const CAPTION = "caption";
            return defineI18nProperties(pullToRefresh, [
                ["contentdown", CAPTION],
                ["contentover", CAPTION],
                ["contentrefresh", CAPTION]
            ]);
        }
    }
    function initBridge(subscribeNamespace) {
        const emitter = new TinyEmitter_default();
        return {
            on(event, callback) {
                return emitter.on(event, callback);
            },
            once(event, callback) {
                return emitter.once(event, callback);
            },
            off(event, callback) {
                return emitter.off(event, callback);
            },
            emit(event, ...args) {
                return emitter.emit(event, ...args);
            },
            subscribe(event, callback, once2 = false) {
                emitter[once2 ? "once" : "on"](`${subscribeNamespace}.${event}`, callback);
            },
            unsubscribe(event, callback) {
                emitter.off(`${subscribeNamespace}.${event}`, callback);
            },
            subscribeHandler(event, args, pageId) {
                emitter.emit(`${subscribeNamespace}.${event}`, args, pageId);
            }
        };
    }
    var INVOKE_VIEW_API = "invokeViewApi";
    var INVOKE_SERVICE_API = "invokeServiceApi";
    function hasRpx(str) {
        str = str + "";
        return str.indexOf("rpx") !== -1 || str.indexOf("upx") !== -1;
    }
    function rpx2px(str, replace = false) {
        if (replace) {
            return rpx2pxWithReplace(str);
        }
        if (isString(str)) {
            const res = parseInt(str) || 0;
            if (hasRpx(str)) {
                return uni.upx2px(res);
            }
            return res;
        }
        return str;
    }
    function rpx2pxWithReplace(str) {
        if (!hasRpx(str)) {
            return str;
        }
        return str.replace(/(\d+(\.\d+)?)[ru]px/g, (_a, b) => {
            return uni.upx2px(parseFloat(b)) + "px";
        });
    }
    function get$pageByPage(page) {
        return page.$page;
    }
    function getPageIdByVm(instance) {
        const vm = resolveComponentInstance(instance);
        if (vm.$page) {
            return getPageProxyId(vm);
        }
        if (!vm.$) {
            return;
        }
        const rootProxy = vm.$.root.proxy;
        if (rootProxy && rootProxy.$page) {
            return getPageProxyId(rootProxy);
        }
    }
    function getCurrentPage() {
        const pages2 = getCurrentPages();
        const len = pages2.length;
        if (len) {
            return pages2[len - 1];
        }
    }
    function getCurrentPageMeta() {
        const $page = getCurrentPage()?.$page;
        if ($page) {
            return $page.meta;
        }
    }
    function getCurrentPageId() {
        const meta = getCurrentPageMeta();
        if (meta) {
            return meta.id;
        }
        return -1;
    }
    function getCurrentPageVm() {
        const page = getCurrentPage();
        if (page) {
            return page.$vm;
        }
    }
    var PAGE_META_KEYS = ["navigationBar", "pullToRefresh"];
    function initGlobalStyle() {
        return JSON.parse(JSON.stringify(__uniConfig.globalStyle || {}));
    }
    function initRouteMeta(pageMeta, id2) {
        const globalStyle = initGlobalStyle();
        const res = extend({ id: id2 }, globalStyle, pageMeta);
        PAGE_META_KEYS.forEach((name) => {
            res[name] = extend({}, globalStyle[name], pageMeta[name]);
        });
        const { navigationBar } = res;
        navigationBar.titleText && navigationBar.titleImage && (navigationBar.titleText = "");
        return res;
    }
    function normalizePullToRefreshRpx(pullToRefresh) {
        if (pullToRefresh.offset) {
            pullToRefresh.offset = rpx2px(pullToRefresh.offset);
        }
        if (pullToRefresh.height) {
            pullToRefresh.height = rpx2px(pullToRefresh.height);
        }
        if (pullToRefresh.range) {
            pullToRefresh.range = rpx2px(pullToRefresh.range);
        }
        return pullToRefresh;
    }
    function initPageInternalInstance(openType, url, pageQuery, meta, eventChannel, themeMode) {
        const { id: id2, route } = meta;
        const titleColor = normalizeStyles(meta.navigationBar, __uniConfig.themeConfig, themeMode).titleColor;
        return {
            id: id2,
            path: addLeadingSlash(route),
            route,
            fullPath: url,
            options: pageQuery,
            meta,
            openType,
            eventChannel,
            statusBarStyle: titleColor === "#ffffff" ? "light" : "dark"
        };
    }
    function getPageProxyId(proxy) {
        return proxy.$page?.id || proxy.$basePage?.id;
    }
    function removeHook(vm, name, hook) {
        const hooks = vm.$[name];
        if (!isArray(hooks)) {
            return;
        }
        if (hook.__weh) {
            remove(hooks, hook.__weh);
        }
    }
    function invokeHook(vm, name, args) {
        if (isString(vm)) {
            args = name;
            name = vm;
            vm = getCurrentPageVm();
        } else if (typeof vm === "number") {
            const page = getCurrentPages().find((page2) => get$pageByPage(page2).id === vm);
            if (page) {
                vm = page.$vm;
            } else {
                vm = getCurrentPageVm();
            }
        }
        if (!vm) {
            return;
        }
        {
            if (vm.__call_hook) {
                return vm.__call_hook(name, args);
            }
        }
        const hooks = vm.$[name];
        return hooks && invokeArrayFns2(hooks, args);
    }
    function normalizeRoute(toRoute) {
        if (toRoute.indexOf("/") === 0 || toRoute.indexOf("uni:") === 0) {
            return toRoute;
        }
        let fromRoute = "";
        const pages2 = getCurrentPages();
        if (pages2.length) {
            fromRoute = get$pageByPage(pages2[pages2.length - 1]).route;
        }
        return getRealRoute(fromRoute, toRoute);
    }
    function getRealRoute(fromRoute, toRoute) {
        if (toRoute.indexOf("/") === 0) {
            return toRoute;
        }
        if (toRoute.indexOf("./") === 0) {
            return getRealRoute(fromRoute, toRoute.slice(2));
        }
        const toRouteArray = toRoute.split("/");
        const toRouteLength = toRouteArray.length;
        let i = 0;
        for (; i < toRouteLength && toRouteArray[i] === ".."; i++) {
        }
        toRouteArray.splice(0, i);
        toRoute = toRouteArray.join("/");
        const fromRouteArray = fromRoute.length > 0 ? fromRoute.split("/") : [];
        fromRouteArray.splice(fromRouteArray.length - i - 1, i + 1);
        return addLeadingSlash(fromRouteArray.concat(toRouteArray).join("/"));
    }
    function getRouteOptions(path, alias = false) {
        if (alias) {
            return __uniRoutes.find((route) => route.path === path || route.alias === path);
        }
        return __uniRoutes.find((route) => route.path === path);
    }
    function getRouteMeta(path) {
        const routeOptions = getRouteOptions(path);
        if (routeOptions) {
            return routeOptions.meta;
        }
    }
    function normalizeTabBarRoute(index2, oldPagePath, newPagePath) {
        const oldTabBarRoute = getRouteOptions(addLeadingSlash(oldPagePath));
        if (oldTabBarRoute) {
            const { meta } = oldTabBarRoute;
            delete meta.tabBarIndex;
            meta.isQuit = meta.isTabBar = false;
        }
        const newTabBarRoute = getRouteOptions(addLeadingSlash(newPagePath));
        if (newTabBarRoute) {
            const { meta } = newTabBarRoute;
            meta.tabBarIndex = index2;
            meta.isQuit = meta.isTabBar = true;
            const tabBar2 = __uniConfig.tabBar;
            if (tabBar2 && tabBar2.list && tabBar2.list[index2]) {
                tabBar2.list[index2].pagePath = removeLeadingSlash(newPagePath);
            }
        }
    }
    var invokeOnCallback = (name, res) => UniServiceJSBridge.emit("api." + name, res);
    var invokeViewMethodId = 1;
    function publishViewMethodName(pageId) {
        return (pageId || getCurrentPageId()) + "." + INVOKE_VIEW_API;
    }
    var invokeViewMethod = (name, args, pageId, callback) => {
        const { subscribe, publishHandler: publishHandler2 } = UniServiceJSBridge;
        const id2 = callback ? invokeViewMethodId++ : 0;
        callback && subscribe(INVOKE_VIEW_API + "." + id2, callback, true);
        publishHandler2(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
    };
    var invokeViewMethodKeepAlive = (name, args, callback, pageId) => {
        const { subscribe, unsubscribe, publishHandler: publishHandler2 } = UniServiceJSBridge;
        const id2 = invokeViewMethodId++;
        const subscribeName = INVOKE_VIEW_API + "." + id2;
        subscribe(subscribeName, callback);
        publishHandler2(publishViewMethodName(pageId), { id: id2, name, args }, pageId);
        return () => {
            unsubscribe(subscribeName);
        };
    };
    var serviceMethods = /* @__PURE__ */ Object.create(null);
    function subscribeServiceMethod() {
        UniServiceJSBridge.subscribe(INVOKE_SERVICE_API, onInvokeServiceMethod);
    }
    function registerServiceMethod(name, fn) {
        if (!serviceMethods[name]) {
            serviceMethods[name] = fn;
        }
    }
    function onInvokeServiceMethod({ id: id2, name, args }, pageId) {
        const publish = (res) => {
            id2 && UniServiceJSBridge.publishHandler(INVOKE_SERVICE_API + "." + id2, res, pageId);
        };
        const handler = serviceMethods[name];
        if (handler) {
            handler(args, publish);
        } else {
            publish({});
        }
    }
    var ServiceJSBridge = /* @__PURE__ */ extend(
        /* @__PURE__ */ initBridge(
        "view"
        /* view 指的是 service 层订阅的是 view 层事件 */
    ),
        {
            invokeOnCallback,
            invokeViewMethod,
            invokeViewMethodKeepAlive
        }
    );
    function initOn() {
        const { on } = UniServiceJSBridge;
        on(ON_RESIZE, onResize);
        on(ON_APP_ENTER_FOREGROUND, onAppEnterForeground);
        on(ON_APP_ENTER_BACKGROUND, onAppEnterBackground);
    }
    function onResize(res) {
        const page = getCurrentPage();
        invokeHook(page, ON_RESIZE, res);
        UniServiceJSBridge.invokeOnCallback("onWindowResize", res);
    }
    function onAppEnterForeground(enterOptions2) {
        const page = getCurrentPage();
        invokeHook(getApp(), ON_SHOW, enterOptions2);
        invokeHook(page, ON_SHOW);
    }
    function onAppEnterBackground() {
        invokeHook(getApp(), ON_HIDE);
        invokeHook(getCurrentPage(), ON_HIDE);
    }
    var SUBSCRIBE_LIFECYCLE_HOOKS = [ON_PAGE_SCROLL, ON_REACH_BOTTOM];
    function initSubscribe() {
        SUBSCRIBE_LIFECYCLE_HOOKS.forEach((name) => UniServiceJSBridge.subscribe(name, createPageEvent(name)));
    }
    function createPageEvent(name) {
        return (args, pageId) => {
            invokeHook(parseInt(pageId), name, args);
        };
    }
    function initService() {
        {
            initOn();
            initSubscribe();
        }
    }
    function initAppVm(appVm) {
        appVm.$vm = appVm;
        appVm.$mpType = "app";
        const locale = ref(useI18n().getLocale());
        Object.defineProperty(appVm, "$locale", {
            get() {
                return locale.value;
            },
            set(v) {
                locale.value = v;
            }
        });
    }
    function initPageVm(pageVm, page) {
        pageVm.route = page.route;
        pageVm.$vm = pageVm;
        pageVm.$page = page;
        pageVm.$mpType = "page";
        pageVm.$fontFamilySet = /* @__PURE__ */ new Set();
        if (page.meta.isTabBar) {
            pageVm.$.__isTabBar = true;
            pageVm.$.__isActive = true;
        }
    }
    function createLaunchOptions() {
        return {
            path: "",
            query: {},
            scene: 1001,
            referrerInfo: {
                appId: "",
                extraData: {}
            }
        };
    }
    function defineGlobalData(app, defaultGlobalData) {
        const options = app.$options || {};
        options.globalData = extend(options.globalData || {}, defaultGlobalData);
        Object.defineProperty(app, "globalData", {
            get() {
                return options.globalData;
            },
            set(newGlobalData) {
                options.globalData = newGlobalData;
            }
        });
    }
    function getRealPath(filepath) {
        if (filepath.indexOf("//") === 0) {
            return "https:" + filepath;
        }
        if (SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) {
            return filepath;
        }
        if (isSystemURL(filepath)) {
            return "file:/" + normalizeLocalPath(filepath);
        }
        const href = location.href;
        const wwwPath = href.substring(0, href.lastIndexOf("/"));
        if (filepath.indexOf("/") === 0) {
            if (filepath.startsWith("/data/storage/")) {
                return "file://" + filepath;
            }
            return wwwPath + filepath;
        }
        if (filepath.indexOf("../") === 0 || filepath.indexOf("./") === 0) {
            if (typeof __id__ === "string") {
                return wwwPath + getRealRoute(addLeadingSlash(__id__), filepath);
            } else {
                const page = getCurrentPage();
                if (page) {
                    return wwwPath + getRealRoute(addLeadingSlash(page.route), filepath);
                }
            }
        }
        return filepath;
    }
    var normalizeLocalPath = cacheStringFunction2((filepath) => {
        return plus.io.convertLocalFileSystemURL(filepath).replace(/\/$/, "");
    });
    function isSystemURL(filepath) {
        if (filepath.indexOf("_www") === 0 || filepath.indexOf("_doc") === 0 || filepath.indexOf("_documents") === 0 || filepath.indexOf("_downloads") === 0) {
            return true;
        }
        return false;
    }
    var vueApp2;
    function getVueApp() {
        return vueApp2;
    }
    function initVueApp(appVm) {
        const internalInstance = appVm.$;
        Object.defineProperty(internalInstance.ctx, "$children", {
            get() {
                return getAllPages().map((page) => page.$vm);
            }
        });
        const appContext = internalInstance.appContext;
        vueApp2 = extend(appContext.app, {
            mountPage(pageComponent, pageProps, pageContainer) {
                const vnode = createVNode(pageComponent, pageProps);
                vnode.appContext = appContext;
                vnode.__page_container__ = pageContainer;
                render(vnode, pageContainer);
                const publicThis = vnode.component.proxy;
                publicThis.__page_container__ = pageContainer;
                return publicThis;
            },
            unmountPage: (pageInstance) => {
                const { __page_container__ } = pageInstance;
                if (__page_container__) {
                    __page_container__.isUnmounted = true;
                    render(null, __page_container__);
                }
            }
        });
    }
    function getPage$BasePage(page) {
        return page.$page;
    }
    var pages = [];
    function addCurrentPage(page) {
        const $page = getPage$BasePage(page);
        if (!$page.meta.isNVue) {
            return pages.push(page);
        }
        const index2 = pages.findIndex((p) => getPage$BasePage(p).id === $page.id);
        if (index2 > -1) {
            pages.splice(index2, 1, page);
        } else {
            pages.push(page);
        }
    }
    function getPageById(id2) {
        return pages.find((page) => getPage$BasePage(page).id === id2);
    }
    function getAllPages() {
        return pages;
    }
    function getCurrentPages$1() {
        const curPages = getCurrentBasePages();
        return curPages;
    }
    function getCurrentBasePages() {
        const curPages = [];
        pages.forEach((page) => {
            if (page.$.__isTabBar) {
                if (page.$.__isActive) {
                    curPages.push(page);
                }
            } else {
                curPages.push(page);
            }
        });
        return curPages;
    }
    function removePage(curPage) {
        const index2 = pages.findIndex((page) => page === curPage);
        if (index2 === -1) {
            return;
        }
        const $basePage = getPage$BasePage(curPage);
        if (!$basePage.meta.isNVue) {
            getVueApp().unmountPage(curPage);
        }
        pages.splice(index2, 1);
        if (false) {
            console.log(formatLog("removePage", $basePage));
        }
    }
    function requestComponentInfo(pageVm, reqs, callback) {
        if (getPage$BasePage(pageVm).meta.isNVue) {
            requestNVueComponentInfo(pageVm, reqs, callback);
        } else {
            requestVueComponentInfo(pageVm, reqs, callback);
        }
    }
    function requestVueComponentInfo(pageVm, reqs, callback) {
        UniServiceJSBridge.invokeViewMethod("requestComponentInfo", {
            reqs: reqs.map((req) => {
                if (req.component) {
                    req.component = req.component.$el.nodeId;
                }
                return req;
            })
        }, getPage$BasePage(pageVm).id, callback);
    }
    function requestNVueComponentInfo(pageVm, reqs, callback) {
        const ids = findNVueElementIds(reqs);
        const nvueElementInfos = new Array(ids.length);
        findNVueElementInfos(ids, pageVm.$el, nvueElementInfos);
        findComponentRectAll(pageVm.$requireNativePlugin("dom"), nvueElementInfos, 0, [], (result) => {
            callback(result);
        });
    }
    function findNVueElementIds(reqs) {
        const ids = [];
        for (let i = 0; i < reqs.length; i++) {
            const selector = reqs[i].selector;
            if (selector.indexOf("#") === 0) {
                ids.push(selector.substring(1));
            }
        }
        return ids;
    }
    function findNVueElementInfos(ids, elm, infos) {
        const nodes = elm.children;
        if (!isArray(nodes)) {
            return false;
        }
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.attr) {
                const index2 = ids.indexOf(node.attr.id);
                if (index2 >= 0) {
                    infos[index2] = {
                        id: ids[index2],
                        ref: node.ref,
                        dataset: parseNVueDataset(node.attr)
                    };
                    if (ids.length === 1) {
                        break;
                    }
                }
            }
            if (node.children) {
                findNVueElementInfos(ids, node, infos);
            }
        }
    }
    function findComponentRectAll(dom, nvueElementInfos, index2, result, callback) {
        const attr = nvueElementInfos[index2];
        dom.getComponentRect(attr.ref, (option) => {
            option.size.id = attr.id;
            option.size.dataset = attr.dataset;
            result.push(option.size);
            index2 += 1;
            if (index2 < nvueElementInfos.length) {
                findComponentRectAll(dom, nvueElementInfos, index2, result, callback);
            } else {
                callback(result);
            }
        });
    }
    function getEventName$1(reqId) {
        const EVENT_NAME = "IntersectionObserver";
        return `${EVENT_NAME}.${reqId}`;
    }
    function addIntersectionObserver({ reqId, component, options, callback }, _pageId) {
        const eventName = getEventName$1(reqId);
        UniServiceJSBridge.invokeViewMethod("addIntersectionObserver", {
            reqId,
            component: component.$el.nodeId,
            options,
            eventName
        }, _pageId);
        UniServiceJSBridge.subscribe(eventName, callback);
    }
    function removeIntersectionObserver({ reqId, component }, _pageId) {
        UniServiceJSBridge.invokeViewMethod("removeIntersectionObserver", {
            reqId,
            component: component.$el.nodeId
        }, _pageId);
        UniServiceJSBridge.unsubscribe(getEventName$1(reqId));
    }
    function getEventName(reqId) {
        const EVENT_NAME = "MediaQueryObserver";
        return `${EVENT_NAME}.${reqId}`;
    }
    function addMediaQueryObserver({ reqId, component, options, callback }, _pageId) {
        const eventName = getEventName(reqId);
        UniServiceJSBridge.invokeViewMethod("addMediaQueryObserver", {
            reqId,
            component: component.$el.nodeId,
            options,
            eventName
        }, _pageId);
        UniServiceJSBridge.subscribe(eventName, callback);
    }
    function removeMediaQueryObserver({ reqId, component }, _pageId) {
        UniServiceJSBridge.invokeViewMethod("removeMediaQueryObserver", {
            reqId,
            component: component.$el.nodeId
        }, _pageId);
        UniServiceJSBridge.unsubscribe(getEventName(reqId));
    }
    var EVENT_BACKBUTTON = "backbutton";
    function backbuttonListener() {
        uni.navigateBack({
            from: "backbutton",
            success() {
            }
            // 传入空方法，避免返回Promise，因为onBackPress可能导致fail
        });
    }
    var enterOptions = /* @__PURE__ */ createLaunchOptions();
    var launchOptions = /* @__PURE__ */ createLaunchOptions();
    function getLaunchOptions() {
        return extend({}, launchOptions);
    }
    function getEnterOptions() {
        return extend({}, enterOptions);
    }
    function initEnterOptions({ path, query, referrerInfo }) {
        extend(enterOptions, {
            path,
            query: query ? parseQuery(query) : {},
            referrerInfo: referrerInfo || {}
        });
    }
    function initLaunchOptions({ path, query, referrerInfo }) {
        extend(launchOptions, {
            path,
            query: query ? parseQuery(query) : {},
            referrerInfo: referrerInfo || {},
            // TODO uni-app x
            channel: plus.runtime.channel,
            launcher: plus.runtime.launcher
        });
        extend(enterOptions, launchOptions);
        return enterOptions;
    }
    function parseRedirectInfo() {
        const weexPlus = weex.requireModule("plus");
        if (weexPlus.getRedirectInfo) {
            const { path, query, extraData, userAction, fromAppid } = weexPlus.getRedirectInfo() || {};
            const referrerInfo = {
                appId: fromAppid,
                extraData: {}
            };
            if (extraData) {
                referrerInfo.extraData = extraData;
            }
            return {
                path: path || "",
                query: query ? "?" + query : "",
                referrerInfo,
                userAction
            };
        }
    }
    var TEMP_PATH = "";
    function setCurrentPageMeta(page, options) {
    }
    function operateVideoPlayer(videoId, pageId, type, data) {
        UniServiceJSBridge.invokeViewMethod("video." + videoId, {
            videoId,
            type,
            data
        }, pageId);
    }
    function operateMap(id2, pageId, type, data, operateMapCallback2) {
        UniServiceJSBridge.invokeViewMethod("map." + id2, {
            type,
            data
        }, pageId, operateMapCallback2);
    }
    var API_UPX2PX = "upx2px";
    var Upx2pxProtocol = [
        {
            name: "upx",
            type: [Number, String],
            required: true
        }
    ];
    var EPS = 1e-4;
    var BASE_DEVICE_WIDTH = 750;
    var isIOS2 = false;
    var deviceWidth = 0;
    var deviceDPR = 0;
    var maxWidth = 960;
    var baseWidth = 375;
    var includeWidth = 750;
    function checkDeviceWidth() {
        const { windowWidth, pixelRatio, platform } = getBaseSystemInfo();
        deviceWidth = windowWidth;
        deviceDPR = pixelRatio;
        isIOS2 = platform === "ios";
    }
    function checkValue(value, defaultValue) {
        const newValue = Number(value);
        return isNaN(newValue) ? defaultValue : newValue;
    }
    function checkMaxWidth() {
        const config2 = __uniConfig.globalStyle || {};
        maxWidth = checkValue(config2.rpxCalcMaxDeviceWidth, 960);
        baseWidth = checkValue(config2.rpxCalcBaseDeviceWidth, 375);
        includeWidth = checkValue(config2.rpxCalcBaseDeviceWidth, 750);
    }
    var upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
        if (deviceWidth === 0) {
            checkDeviceWidth();
            {
                checkMaxWidth();
            }
        }
        number = Number(number);
        if (number === 0) {
            return 0;
        }
        let width = newDeviceWidth || deviceWidth;
        {
            width = number === includeWidth || width <= maxWidth ? width : baseWidth;
        }
        let result = number / BASE_DEVICE_WIDTH * width;
        if (result < 0) {
            result = -result;
        }
        result = Math.floor(result + EPS);
        if (result === 0) {
            if (deviceDPR === 1 || !isIOS2) {
                result = 1;
            } else {
                result = 0.5;
            }
        }
        return number < 0 ? -result : result;
    }, Upx2pxProtocol);
    var API_ADD_INTERCEPTOR = "addInterceptor";
    var API_REMOVE_INTERCEPTOR = "removeInterceptor";
    var AddInterceptorProtocol = [
        {
            name: "method",
            type: [String, Object],
            required: true
        }
    ];
    var RemoveInterceptorProtocol = AddInterceptorProtocol;
    function mergeInterceptorHook(interceptors2, interceptor) {
        Object.keys(interceptor).forEach((hook) => {
            if (isFunction(interceptor[hook])) {
                interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
            }
        });
    }
    function removeInterceptorHook(interceptors2, interceptor) {
        if (!interceptors2 || !interceptor) {
            return;
        }
        Object.keys(interceptor).forEach((name) => {
            const hooks = interceptors2[name];
            const hook = interceptor[name];
            if (isArray(hooks) && isFunction(hook)) {
                remove(hooks, hook);
            }
        });
    }
    function mergeHook(parentVal, childVal) {
        const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
        return res ? dedupeHooks(res) : res;
    }
    function dedupeHooks(hooks) {
        const res = [];
        for (let i = 0; i < hooks.length; i++) {
            if (res.indexOf(hooks[i]) === -1) {
                res.push(hooks[i]);
            }
        }
        return res;
    }
    var addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
        if (isString(method) && isPlainObject(interceptor)) {
            mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
        } else if (isPlainObject(method)) {
            mergeInterceptorHook(globalInterceptors, method);
        }
    }, AddInterceptorProtocol);
    var removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
        if (isString(method)) {
            if (isPlainObject(interceptor)) {
                removeInterceptorHook(scopedInterceptors[method], interceptor);
            } else {
                delete scopedInterceptors[method];
            }
        } else if (isPlainObject(method)) {
            removeInterceptorHook(globalInterceptors, method);
        }
    }, RemoveInterceptorProtocol);
    var interceptors = {};
    var API_ON = "$on";
    var OnProtocol = [
        {
            name: "event",
            type: String,
            required: true
        },
        {
            name: "callback",
            type: Function,
            required: true
        }
    ];
    var API_ONCE = "$once";
    var OnceProtocol = OnProtocol;
    var API_OFF = "$off";
    var OffProtocol = [
        {
            name: "event",
            type: [String, Array]
        },
        {
            name: "callback",
            type: [Function, Number]
        }
    ];
    var API_EMIT = "$emit";
    var EmitProtocol = [
        {
            name: "event",
            type: String,
            required: true
        }
    ];
    var EventBus = class {
        constructor() {
            this.$emitter = new TinyEmitter_default();
        }
        on(name, callback) {
            return this.$emitter.on(name, callback);
        }
        once(name, callback) {
            return this.$emitter.once(name, callback);
        }
        off(name, callback) {
            if (!name) {
                this.$emitter.e = {};
                return;
            }
            this.$emitter.off(name, callback);
        }
        emit(name, ...args) {
            this.$emitter.emit(name, ...args);
        }
    };
    var eventBus = new EventBus();
    var $on = defineSyncApi(API_ON, (name, callback) => {
        eventBus.on(name, callback);
        return () => eventBus.off(name, callback);
    }, OnProtocol);
    var $once = defineSyncApi(API_ONCE, (name, callback) => {
        eventBus.once(name, callback);
        return () => eventBus.off(name, callback);
    }, OnceProtocol);
    var $off = defineSyncApi(API_OFF, (name, callback) => {
        if (!isArray(name))
            name = name ? [name] : [];
        name.forEach((n) => eventBus.off(n, callback));
    }, OffProtocol);
    var $emit = defineSyncApi(API_EMIT, (name, ...args) => {
        eventBus.emit(name, ...args);
    }, EmitProtocol);
    var validator = [
        {
            name: "id",
            type: String,
            required: true
        }
    ];
    var API_CREATE_VIDEO_CONTEXT = "createVideoContext";
    var API_CREATE_MAP_CONTEXT = "createMapContext";
    var CreateMapContextProtocol = validator;
    var API_CREATE_CANVAS_CONTEXT = "createCanvasContext";
    var CreateCanvasContextProtocol = [
        {
            name: "canvasId",
            type: String,
            required: true
        },
        {
            name: "componentInstance",
            type: Object
        }
    ];
    validator.concat({
        name: "componentInstance",
        type: Object
    });
    var RATES = [0.5, 0.8, 1, 1.25, 1.5, 2];
    var VideoContext = class {
        constructor(id2, pageId) {
            this.id = id2;
            this.pageId = pageId;
        }
        play() {
            operateVideoPlayer(this.id, this.pageId, "play");
        }
        pause() {
            operateVideoPlayer(this.id, this.pageId, "pause");
        }
        stop() {
            operateVideoPlayer(this.id, this.pageId, "stop");
        }
        seek(position) {
            operateVideoPlayer(this.id, this.pageId, "seek", {
                position
            });
        }
        sendDanmu(args) {
            operateVideoPlayer(this.id, this.pageId, "sendDanmu", args);
        }
        playbackRate(rate) {
            if (!~RATES.indexOf(rate)) {
                rate = 1;
            }
            operateVideoPlayer(this.id, this.pageId, "playbackRate", {
                rate
            });
        }
        requestFullScreen(args = {}) {
            operateVideoPlayer(this.id, this.pageId, "requestFullScreen", args);
        }
        exitFullScreen() {
            operateVideoPlayer(this.id, this.pageId, "exitFullScreen");
        }
        showStatusBar() {
            operateVideoPlayer(this.id, this.pageId, "showStatusBar");
        }
        hideStatusBar() {
            operateVideoPlayer(this.id, this.pageId, "hideStatusBar");
        }
    };
    var createVideoContext = defineSyncApi(API_CREATE_VIDEO_CONTEXT, (id2, context) => {
        if (context) {
            return new VideoContext(id2, getPageIdByVm(context));
        }
        return new VideoContext(id2, getPageIdByVm(getCurrentPageVm()));
    });
    var operateMapCallback = (options, res) => {
        const errMsg = res.errMsg || "";
        if (new RegExp("\\:\\s*fail").test(errMsg)) {
            options.fail && options.fail(res);
        } else {
            options.success && options.success(res);
        }
        options.complete && options.complete(res);
    };
    var operateMapWrap = (id2, pageId, type, options) => {
        operateMap(id2, pageId, type, options, (res) => {
            options && operateMapCallback(options, res);
        });
    };
    var MapContext = class {
        constructor(id2, pageId) {
            this.id = id2;
            this.pageId = pageId;
        }
        getCenterLocation(options) {
            operateMapWrap(this.id, this.pageId, "getCenterLocation", options);
        }
        moveToLocation(options) {
            operateMapWrap(this.id, this.pageId, "moveToLocation", options);
        }
        getScale(options) {
            operateMapWrap(this.id, this.pageId, "getScale", options);
        }
        getRegion(options) {
            operateMapWrap(this.id, this.pageId, "getRegion", options);
        }
        includePoints(options) {
            operateMapWrap(this.id, this.pageId, "includePoints", options);
        }
        translateMarker(options) {
            operateMapWrap(this.id, this.pageId, "translateMarker", options);
        }
        $getAppMap() {
            {
                return plus.maps.getMapById(this.pageId + "-map-" + this.id);
            }
        }
        addCustomLayer(options) {
            operateMapWrap(this.id, this.pageId, "addCustomLayer", options);
        }
        removeCustomLayer(options) {
            operateMapWrap(this.id, this.pageId, "removeCustomLayer", options);
        }
        addGroundOverlay(options) {
            operateMapWrap(this.id, this.pageId, "addGroundOverlay", options);
        }
        removeGroundOverlay(options) {
            operateMapWrap(this.id, this.pageId, "removeGroundOverlay", options);
        }
        updateGroundOverlay(options) {
            operateMapWrap(this.id, this.pageId, "updateGroundOverlay", options);
        }
        initMarkerCluster(options) {
            operateMapWrap(this.id, this.pageId, "initMarkerCluster", options);
        }
        addMarkers(options) {
            operateMapWrap(this.id, this.pageId, "addMarkers", options);
        }
        removeMarkers(options) {
            operateMapWrap(this.id, this.pageId, "removeMarkers", options);
        }
        moveAlong(options) {
            operateMapWrap(this.id, this.pageId, "moveAlong", options);
        }
        setLocMarkerIcon(options) {
            operateMapWrap(this.id, this.pageId, "setLocMarkerIcon", options);
        }
        openMapApp(options) {
            operateMapWrap(this.id, this.pageId, "openMapApp", options);
        }
        on(name, callback) {
            operateMapWrap(this.id, this.pageId, "on", { name, callback });
        }
    };
    var createMapContext = defineSyncApi(API_CREATE_MAP_CONTEXT, (id2, context) => {
        if (context) {
            return new MapContext(id2, getPageIdByVm(context));
        }
        return new MapContext(id2, getPageIdByVm(getCurrentPageVm()));
    }, CreateMapContextProtocol);
    function getInt(name, defaultValue) {
        return function(value, params) {
            if (value) {
                params[name] = Math.round(value);
            } else if (typeof defaultValue !== "undefined") {
                params[name] = defaultValue;
            }
        };
    }
    var formatWidth = getInt("width");
    var formatHeight = getInt("height");
    var API_CANVAS_GET_IMAGE_DATA = "canvasGetImageData";
    var CanvasGetImageDataOptions = {
        formatArgs: {
            x: getInt("x"),
            y: getInt("y"),
            width: formatWidth,
            height: formatHeight
        }
    };
    var CanvasGetImageDataProtocol = {
        canvasId: {
            type: String,
            required: true
        },
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    };
    var API_CANVAS_PUT_IMAGE_DATA = "canvasPutImageData";
    var CanvasPutImageDataOptions = CanvasGetImageDataOptions;
    var CanvasPutImageDataProtocol = /* @__PURE__ */ extend({
        data: {
            type: Uint8ClampedArray,
            required: true
        }
    }, CanvasGetImageDataProtocol, {
        height: {
            type: Number
        }
    });
    var fileTypes = {
        PNG: "png",
        JPG: "jpg",
        JPEG: "jpg"
    };
    var API_CANVAS_TO_TEMP_FILE_PATH = "canvasToTempFilePath";
    var CanvasToTempFilePathOptions = {
        formatArgs: {
            x: getInt("x", 0),
            y: getInt("y", 0),
            width: formatWidth,
            height: formatHeight,
            destWidth: getInt("destWidth"),
            destHeight: getInt("destHeight"),
            fileType(value, params) {
                value = (value || "").toUpperCase();
                let type = fileTypes[value];
                if (!type) {
                    type = fileTypes.PNG;
                }
                params.fileType = type;
            },
            quality(value, params) {
                params.quality = value && value > 0 && value < 1 ? value : 1;
            }
        }
    };
    var CanvasToTempFilePathProtocol = {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        destWidth: Number,
        destHeight: Number,
        canvasId: {
            type: String,
            required: true
        },
        fileType: String,
        quality: Number
    };
    function operateCanvas(canvasId, pageId, type, data, callback) {
        UniServiceJSBridge.invokeViewMethod(`canvas.${canvasId}`, {
            type,
            data
        }, pageId, (data2) => {
            if (callback)
                callback(data2);
        });
    }
    var methods1 = ["scale", "rotate", "translate", "setTransform", "transform"];
    var methods2 = [
        "drawImage",
        "fillText",
        "fill",
        "stroke",
        "fillRect",
        "strokeRect",
        "clearRect",
        "strokeText"
    ];
    var methods3 = [
        "setFillStyle",
        "setTextAlign",
        "setStrokeStyle",
        "setGlobalAlpha",
        "setShadow",
        "setFontSize",
        "setLineCap",
        "setLineJoin",
        "setLineWidth",
        "setMiterLimit",
        "setTextBaseline",
        "setLineDash"
    ];
    var predefinedColor = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
        transparent: "#00000000"
    };
    function checkColor(e) {
        e = e || "#000000";
        let t = null;
        if ((t = /^#([0-9|A-F|a-f]{6})$/.exec(e)) != null) {
            const n = parseInt(t[1].slice(0, 2), 16);
            const o = parseInt(t[1].slice(2, 4), 16);
            const r = parseInt(t[1].slice(4), 16);
            return [n, o, r, 255];
        }
        if ((t = /^#([0-9|A-F|a-f]{3})$/.exec(e)) != null) {
            let n = t[1].slice(0, 1);
            let o = t[1].slice(1, 2);
            let r = t[1].slice(2, 3);
            n = parseInt(n + n, 16);
            o = parseInt(o + o, 16);
            r = parseInt(r + r, 16);
            return [n, o, r, 255];
        }
        if ((t = /^rgb\((.+)\)$/.exec(e)) != null) {
            return t[1].split(",").map(function(e2) {
                return Math.min(255, parseInt(e2.trim()));
            }).concat(255);
        }
        if ((t = /^rgba\((.+)\)$/.exec(e)) != null) {
            return t[1].split(",").map(function(e2, t2) {
                return t2 === 3 ? Math.floor(255 * parseFloat(e2.trim())) : Math.min(255, parseInt(e2.trim()));
            });
        }
        var i = e.toLowerCase();
        if (hasOwn(predefinedColor, i)) {
            t = /^#([0-9|A-F|a-f]{6,8})$/.exec(predefinedColor[i]);
            const n = parseInt(t[1].slice(0, 2), 16);
            const o = parseInt(t[1].slice(2, 4), 16);
            const r = parseInt(t[1].slice(4, 6), 16);
            let a = parseInt(t[1].slice(6, 8), 16);
            a = a >= 0 ? a : 255;
            return [n, o, r, a];
        }
        console.error("unsupported color:" + e);
        return [0, 0, 0, 255];
    }
    var CanvasGradient = class {
        constructor(type, data) {
            this.type = type;
            this.data = data;
            this.colorStop = [];
        }
        addColorStop(position, color) {
            this.colorStop.push([position, checkColor(color)]);
        }
    };
    var Pattern = class {
        constructor(image, repetition) {
            this.type = "pattern";
            this.data = image;
            this.colorStop = repetition;
        }
    };
    var TextMetrics = class {
        constructor(width) {
            this.width = width;
        }
    };
    var getTempPath = () => {
        let _TEMP_PATH = TEMP_PATH;
        {
            typeof getEnv !== "undefined" && (_TEMP_PATH = getEnv().TEMP_PATH);
        }
        return _TEMP_PATH;
    };
    var CanvasContext = class {
        constructor(id2, pageId) {
            this.id = id2;
            this.pageId = pageId;
            this.actions = [];
            this.path = [];
            this.subpath = [];
            this.drawingState = [];
            this.state = {
                lineDash: [0, 0],
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                shadowColor: [0, 0, 0, 0],
                font: "10px sans-serif",
                fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                fontFamily: "sans-serif"
            };
        }
        setFillStyle(color) {
            console.log("initCanvasContextProperty implemented.");
        }
        setStrokeStyle(color) {
            console.log("initCanvasContextProperty implemented.");
        }
        setShadow(offsetX, offsetY, blur, color) {
            console.log("initCanvasContextProperty implemented.");
        }
        addColorStop(stop2, color) {
            console.log("initCanvasContextProperty implemented.");
        }
        setLineWidth(lineWidth) {
            console.log("initCanvasContextProperty implemented.");
        }
        setLineCap(lineCap) {
            console.log("initCanvasContextProperty implemented.");
        }
        setLineJoin(lineJoin) {
            console.log("initCanvasContextProperty implemented.");
        }
        setLineDash(pattern, offset) {
            console.log("initCanvasContextProperty implemented.");
        }
        setMiterLimit(miterLimit) {
            console.log("initCanvasContextProperty implemented.");
        }
        fillRect(x, y, width, height) {
            console.log("initCanvasContextProperty implemented.");
        }
        strokeRect(x, y, width, height) {
            console.log("initCanvasContextProperty implemented.");
        }
        clearRect(x, y, width, height) {
            console.log("initCanvasContextProperty implemented.");
        }
        fill() {
            console.log("initCanvasContextProperty implemented.");
        }
        stroke() {
            console.log("initCanvasContextProperty implemented.");
        }
        scale(scaleWidth, scaleHeight) {
            console.log("initCanvasContextProperty implemented.");
        }
        rotate(rotate) {
            console.log("initCanvasContextProperty implemented.");
        }
        translate(x, y) {
            console.log("initCanvasContextProperty implemented.");
        }
        setFontSize(fontSize) {
            console.log("initCanvasContextProperty implemented.");
        }
        fillText(text, x, y, maxWidth2) {
            console.log("initCanvasContextProperty implemented.");
        }
        setTextAlign(align) {
            console.log("initCanvasContextProperty implemented.");
        }
        setTextBaseline(textBaseline) {
            console.log("initCanvasContextProperty implemented.");
        }
        drawImage(imageResource, dx, dy, dWidth, dHeigt, sx, sy, sWidth, sHeight) {
            console.log("initCanvasContextProperty implemented.");
        }
        setGlobalAlpha(alpha) {
            console.log("initCanvasContextProperty implemented.");
        }
        strokeText(text, x, y, maxWidth2) {
            console.log("initCanvasContextProperty implemented.");
        }
        setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY) {
            console.log("initCanvasContextProperty implemented.");
        }
        draw(reserve = false, callback) {
            var actions = [...this.actions];
            this.actions = [];
            this.path = [];
            operateCanvas(this.id, this.pageId, "actionsChanged", {
                actions,
                reserve
            }, callback);
        }
        createLinearGradient(x0, y0, x1, y1) {
            return new CanvasGradient("linear", [x0, y0, x1, y1]);
        }
        createCircularGradient(x, y, r) {
            return new CanvasGradient("radial", [x, y, r]);
        }
        createPattern(image, repetition) {
            if (void 0 === repetition) {
                console.error("Failed to execute 'createPattern' on 'CanvasContext': 2 arguments required, but only 1 present.");
            } else if (["repeat", "repeat-x", "repeat-y", "no-repeat"].indexOf(repetition) < 0) {
                console.error("Failed to execute 'createPattern' on 'CanvasContext': The provided type ('" + repetition + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
            } else {
                return new Pattern(image, repetition);
            }
        }
        measureText(text, callback) {
            const font = this.state.font;
            let width = 0;
            {
                {
                    if (typeof callback === "function") {
                        const webview = plus.webview.getLaunchWebview();
                        if (webview && typeof webview.evalJSAsync === "function") {
                            webview.evalJSAsync(`(function measureText(text, font) {
  const canvas = document.createElement('canvas')
  const c2d = canvas.getContext('2d')
  c2d.font = font
  return c2d.measureText(text).width || 0
})(${JSON.stringify(text)},${JSON.stringify(font)})`).then((res) => {
                                callback(new TextMetrics(parseFloat(res)));
                            });
                        }
                    }
                }
            }
            return new TextMetrics(width);
        }
        save() {
            this.actions.push({
                method: "save",
                data: []
            });
            this.drawingState.push(this.state);
        }
        restore() {
            this.actions.push({
                method: "restore",
                data: []
            });
            this.state = this.drawingState.pop() || {
                lineDash: [0, 0],
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,
                shadowColor: [0, 0, 0, 0],
                font: "10px sans-serif",
                fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                fontFamily: "sans-serif"
            };
        }
        beginPath() {
            this.path = [];
            this.subpath = [];
            this.path.push({
                method: "beginPath",
                data: []
            });
        }
        moveTo(x, y) {
            this.path.push({
                method: "moveTo",
                data: [x, y]
            });
            this.subpath = [[x, y]];
        }
        lineTo(x, y) {
            if (this.path.length === 0 && this.subpath.length === 0) {
                this.path.push({
                    method: "moveTo",
                    data: [x, y]
                });
            } else {
                this.path.push({
                    method: "lineTo",
                    data: [x, y]
                });
            }
            this.subpath.push([x, y]);
        }
        quadraticCurveTo(cpx, cpy, x, y) {
            this.path.push({
                method: "quadraticCurveTo",
                data: [cpx, cpy, x, y]
            });
            this.subpath.push([x, y]);
        }
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
            this.path.push({
                method: "bezierCurveTo",
                data: [cp1x, cp1y, cp2x, cp2y, x, y]
            });
            this.subpath.push([x, y]);
        }
        arc(x, y, r, sAngle, eAngle, counterclockwise = false) {
            this.path.push({
                method: "arc",
                data: [x, y, r, sAngle, eAngle, counterclockwise]
            });
            this.subpath.push([x, y]);
        }
        rect(x, y, width, height) {
            this.path.push({
                method: "rect",
                data: [x, y, width, height]
            });
            this.subpath = [[x, y]];
        }
        arcTo(x1, y1, x2, y2, radius) {
            this.path.push({
                method: "arcTo",
                data: [x1, y1, x2, y2, radius]
            });
            this.subpath.push([x2, y2]);
        }
        clip() {
            this.actions.push({
                method: "clip",
                data: [...this.path]
            });
        }
        closePath() {
            this.path.push({
                method: "closePath",
                data: []
            });
            if (this.subpath.length) {
                this.subpath = [this.subpath.shift()];
            }
        }
        clearActions() {
            this.actions = [];
            this.path = [];
            this.subpath = [];
        }
        getActions() {
            var actions = [...this.actions];
            this.clearActions();
            return actions;
        }
        set lineDashOffset(value) {
            this.actions.push({
                method: "setLineDashOffset",
                data: [value]
            });
        }
        set globalCompositeOperation(type) {
            this.actions.push({
                method: "setGlobalCompositeOperation",
                data: [type]
            });
        }
        set shadowBlur(level) {
            this.actions.push({
                method: "setShadowBlur",
                data: [level]
            });
        }
        set shadowColor(color) {
            this.actions.push({
                method: "setShadowColor",
                data: [color]
            });
        }
        set shadowOffsetX(x) {
            this.actions.push({
                method: "setShadowOffsetX",
                data: [x]
            });
        }
        set shadowOffsetY(y) {
            this.actions.push({
                method: "setShadowOffsetY",
                data: [y]
            });
        }
        set font(value) {
            var self2 = this;
            this.state.font = value;
            var fontFormat = value.match(/^(([\w\-]+\s)*)(\d+r?px)(\/(\d+\.?\d*(r?px)?))?\s+(.*)/);
            if (fontFormat) {
                var style = fontFormat[1].trim().split(/\s/);
                var fontSize = parseFloat(fontFormat[3]);
                var fontFamily = fontFormat[7];
                var actions = [];
                style.forEach(function(value2, index2) {
                    if (["italic", "oblique", "normal"].indexOf(value2) > -1) {
                        actions.push({
                            method: "setFontStyle",
                            data: [value2]
                        });
                        self2.state.fontStyle = value2;
                    } else if (["bold", "normal"].indexOf(value2) > -1) {
                        actions.push({
                            method: "setFontWeight",
                            data: [value2]
                        });
                        self2.state.fontWeight = value2;
                    } else if (index2 === 0) {
                        actions.push({
                            method: "setFontStyle",
                            data: ["normal"]
                        });
                        self2.state.fontStyle = "normal";
                    } else if (index2 === 1) {
                        pushAction();
                    }
                });
                if (style.length === 1) {
                    pushAction();
                }
                style = actions.map(function(action) {
                    return action.data[0];
                }).join(" ");
                this.state.fontSize = fontSize;
                this.state.fontFamily = fontFamily;
                this.actions.push({
                    method: "setFont",
                    data: [`${style} ${fontSize}px ${fontFamily}`]
                });
            } else {
                console.warn("Failed to set 'font' on 'CanvasContext': invalid format.");
            }
            function pushAction() {
                actions.push({
                    method: "setFontWeight",
                    data: ["normal"]
                });
                self2.state.fontWeight = "normal";
            }
        }
        get font() {
            return this.state.font;
        }
        set fillStyle(color) {
            this.setFillStyle(color);
        }
        set strokeStyle(color) {
            this.setStrokeStyle(color);
        }
        set globalAlpha(value) {
            value = Math.floor(255 * parseFloat(value));
            this.actions.push({
                method: "setGlobalAlpha",
                data: [value]
            });
        }
        set textAlign(align) {
            this.actions.push({
                method: "setTextAlign",
                data: [align]
            });
        }
        set lineCap(type) {
            this.actions.push({
                method: "setLineCap",
                data: [type]
            });
        }
        set lineJoin(type) {
            this.actions.push({
                method: "setLineJoin",
                data: [type]
            });
        }
        set lineWidth(value) {
            this.actions.push({
                method: "setLineWidth",
                data: [value]
            });
        }
        set miterLimit(value) {
            this.actions.push({
                method: "setMiterLimit",
                data: [value]
            });
        }
        set textBaseline(type) {
            this.actions.push({
                method: "setTextBaseline",
                data: [type]
            });
        }
    };
    var initCanvasContextProperty = /* @__PURE__ */ once(() => {
        [...methods1, ...methods2].forEach(function(method) {
            function get2(method2) {
                switch (method2) {
                    case "fill":
                    case "stroke":
                        return function() {
                            this.actions.push({
                                method: method2 + "Path",
                                // @ts-expect-error
                                data: [...this.path]
                            });
                        };
                    case "fillRect":
                        return function(x, y, width, height) {
                            this.actions.push({
                                method: "fillPath",
                                data: [
                                    {
                                        method: "rect",
                                        data: [x, y, width, height]
                                    }
                                ]
                            });
                        };
                    case "strokeRect":
                        return function(x, y, width, height) {
                            this.actions.push({
                                method: "strokePath",
                                data: [
                                    {
                                        method: "rect",
                                        data: [x, y, width, height]
                                    }
                                ]
                            });
                        };
                    case "fillText":
                    case "strokeText":
                        return function(text, x, y, maxWidth2) {
                            var data = [text.toString(), x, y];
                            if (typeof maxWidth2 === "number") {
                                data.push(maxWidth2);
                            }
                            this.actions.push({
                                method: method2,
                                data
                            });
                        };
                    case "drawImage":
                        return function(imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
                            if (sHeight === void 0) {
                                sx = dx;
                                sy = dy;
                                sWidth = dWidth;
                                sHeight = dHeight;
                                dx = void 0;
                                dy = void 0;
                                dWidth = void 0;
                                dHeight = void 0;
                            }
                            var data;
                            function isNumber(e) {
                                return typeof e === "number";
                            }
                            data = isNumber(dx) && isNumber(dy) && isNumber(dWidth) && isNumber(dHeight) ? [
                                imageResource,
                                sx,
                                sy,
                                sWidth,
                                sHeight,
                                dx,
                                dy,
                                dWidth,
                                dHeight
                            ] : isNumber(sWidth) && isNumber(sHeight) ? [imageResource, sx, sy, sWidth, sHeight] : [imageResource, sx, sy];
                            this.actions.push({
                                method: method2,
                                data
                            });
                        };
                    default:
                        return function(...data) {
                            this.actions.push({
                                method: method2,
                                data
                            });
                        };
                }
            }
            CanvasContext.prototype[method] = get2(method);
        });
        methods3.forEach(function(method) {
            function get2(method2) {
                switch (method2) {
                    case "setFillStyle":
                    case "setStrokeStyle":
                        return function(color) {
                            if (typeof color !== "object") {
                                this.actions.push({
                                    method: method2,
                                    data: ["normal", checkColor(color)]
                                });
                            } else {
                                this.actions.push({
                                    method: method2,
                                    data: [color.type, color.data, color.colorStop]
                                });
                            }
                        };
                    case "setGlobalAlpha":
                        return function(alpha) {
                            alpha = Math.floor(255 * parseFloat(alpha));
                            this.actions.push({
                                method: method2,
                                data: [alpha]
                            });
                        };
                    case "setShadow":
                        return function(offsetX, offsetY, blur, color) {
                            color = checkColor(color);
                            this.actions.push({
                                method: method2,
                                data: [offsetX, offsetY, blur, color]
                            });
                            this.state.shadowBlur = blur;
                            this.state.shadowColor = color;
                            this.state.shadowOffsetX = offsetX;
                            this.state.shadowOffsetY = offsetY;
                        };
                    case "setLineDash":
                        return function(pattern, offset) {
                            pattern = pattern || [0, 0];
                            offset = offset || 0;
                            this.actions.push({
                                method: method2,
                                data: [pattern, offset]
                            });
                            this.state.lineDash = pattern;
                        };
                    case "setFontSize":
                        return function(fontSize) {
                            this.state.font = this.state.font.replace(/\d+\.?\d*px/, fontSize + "px");
                            this.state.fontSize = fontSize;
                            this.actions.push({
                                method: method2,
                                data: [fontSize]
                            });
                        };
                    default:
                        return function(...data) {
                            this.actions.push({
                                method: method2,
                                data
                            });
                        };
                }
            }
            CanvasContext.prototype[method] = get2(method);
        });
    });
    var createCanvasContext = defineSyncApi(API_CREATE_CANVAS_CONTEXT, (canvasId, componentInstance) => {
        initCanvasContextProperty();
        if (componentInstance) {
            return new CanvasContext(canvasId, getPageIdByVm(componentInstance));
        }
        const pageId = getPageIdByVm(getCurrentPageVm());
        if (pageId) {
            return new CanvasContext(canvasId, pageId);
        } else {
            UniServiceJSBridge.emit(ON_ERROR, "createCanvasContext:fail");
        }
    }, CreateCanvasContextProtocol);
    var canvasGetImageData = defineAsyncApi(API_CANVAS_GET_IMAGE_DATA, ({ canvasId, x, y, width, height }, { resolve: resolve2, reject }) => {
        const pageId = getPageIdByVm(getCurrentPageVm());
        if (!pageId) {
            reject();
            return;
        }
        function callback(data) {
            if (data.errMsg && data.errMsg.indexOf("fail") !== -1) {
                reject("", data);
                return;
            }
            let imgData = data.data;
            if (imgData && imgData.length) {
                if (data.compressed) {
                    imgData = pako_1.inflateRaw(imgData);
                }
                data.data = new Uint8ClampedArray(imgData);
            }
            delete data.compressed;
            resolve2(data);
        }
        operateCanvas(canvasId, pageId, "getImageData", {
            x,
            y,
            width,
            height
        }, callback);
    }, CanvasGetImageDataProtocol, CanvasGetImageDataOptions);
    var canvasPutImageData = defineAsyncApi(API_CANVAS_PUT_IMAGE_DATA, ({ canvasId, data, x, y, width, height }, { resolve: resolve2, reject }) => {
        var pageId = getPageIdByVm(getCurrentPageVm());
        if (!pageId) {
            reject();
            return;
        }
        let compressed;
        const operate = () => {
            operateCanvas(canvasId, pageId, "putImageData", {
                data,
                x,
                y,
                width,
                height,
                compressed
            }, (data2) => {
                if (data2.errMsg && data2.errMsg.indexOf("fail") !== -1) {
                    reject();
                    return;
                }
                resolve2(data2);
            });
        };
        {
            data = pako_1.deflateRaw(data, { to: "string" });
            compressed = true;
        }
        operate();
    }, CanvasPutImageDataProtocol, CanvasPutImageDataOptions);
    var canvasToTempFilePath = defineAsyncApi(API_CANVAS_TO_TEMP_FILE_PATH, ({ x = 0, y = 0, width, height, destWidth, destHeight, canvasId, fileType, quality }, { resolve: resolve2, reject }) => {
        var pageId = getPageIdByVm(getCurrentPageVm());
        if (!pageId) {
            reject();
            return;
        }
        let dirname = `${getTempPath()}/canvas`;
        operateCanvas(canvasId, pageId, "toTempFilePath", {
            x,
            y,
            width,
            height,
            destWidth,
            destHeight,
            fileType,
            quality,
            dirname
        }, (res) => {
            if (res.errMsg && res.errMsg.indexOf("fail") !== -1) {
                reject("", res);
                return;
            }
            resolve2(res);
        });
    }, CanvasToTempFilePathProtocol, CanvasToTempFilePathOptions);
    var defaultOptions = {
        thresholds: [0],
        initialRatio: 0,
        observeAll: false
    };
    var MARGINS = ["top", "right", "bottom", "left"];
    var reqComponentObserverId$1 = 1;
    function normalizeRootMargin(margins = {}) {
        return MARGINS.map((name) => `${Number(margins[name]) || 0}px`).join(" ");
    }
    var ServiceIntersectionObserver = class {
        constructor(component, options) {
            this._pageId = getPageIdByVm(component);
            this._component = component;
            this._options = extend({}, defaultOptions, options);
        }
        relativeTo(selector, margins) {
            this._options.relativeToSelector = selector;
            this._options.rootMargin = normalizeRootMargin(margins);
            return this;
        }
        relativeToViewport(margins) {
            this._options.relativeToSelector = void 0;
            this._options.rootMargin = normalizeRootMargin(margins);
            return this;
        }
        observe(selector, callback) {
            if (!isFunction(callback)) {
                return;
            }
            this._options.selector = selector;
            this._reqId = reqComponentObserverId$1++;
            addIntersectionObserver({
                reqId: this._reqId,
                component: this._component,
                options: this._options,
                callback
            }, this._pageId);
        }
        disconnect() {
            this._reqId && removeIntersectionObserver({ reqId: this._reqId, component: this._component }, this._pageId);
        }
    };
    var createIntersectionObserver = defineSyncApi("createIntersectionObserver", (context, options) => {
        context = resolveComponentInstance(context);
        if (context && !getPageIdByVm(context)) {
            options = context;
            context = null;
        }
        if (context) {
            return new ServiceIntersectionObserver(context, options);
        }
        return new ServiceIntersectionObserver(getCurrentPageVm(), options);
    });
    var reqComponentObserverId = 1;
    var ServiceMediaQueryObserver = class {
        constructor(component) {
            this._pageId = component.$page && component.$page.id;
            this._component = component;
        }
        observe(options, callback) {
            if (!isFunction(callback)) {
                return;
            }
            this._reqId = reqComponentObserverId++;
            addMediaQueryObserver({
                reqId: this._reqId,
                component: this._component,
                options,
                callback
            }, this._pageId);
        }
        disconnect() {
            this._reqId && removeMediaQueryObserver({
                reqId: this._reqId,
                component: this._component
            }, this._pageId);
        }
    };
    var createMediaQueryObserver = defineSyncApi("createMediaQueryObserver", (context) => {
        context = resolveComponentInstance(context);
        if (context && !getPageIdByVm(context)) {
            context = null;
        }
        if (context) {
            return new ServiceMediaQueryObserver(context);
        }
        return new ServiceMediaQueryObserver(getCurrentPageVm());
    });
    var index$1 = 0;
    var optionsCache = {};
    function operateEditor(componentId, pageId, type, options) {
        const data = { options };
        const needCallOptions = options && ("success" in options || "fail" in options || "complete" in options);
        if (needCallOptions) {
            const callbackId = String(index$1++);
            data.callbackId = callbackId;
            optionsCache[callbackId] = options;
        }
        UniServiceJSBridge.invokeViewMethod(`editor.${componentId}`, {
            type,
            data
        }, pageId, ({ callbackId, data: data2 }) => {
            if (needCallOptions) {
                callOptions(optionsCache[callbackId], data2);
                delete optionsCache[callbackId];
            }
        });
    }
    var EditorContext = class {
        constructor(id2, pageId) {
            this.id = id2;
            this.pageId = pageId;
        }
        format(name, value) {
            this._exec("format", {
                name,
                value
            });
        }
        insertDivider() {
            this._exec("insertDivider");
        }
        insertImage(options) {
            this._exec("insertImage", options);
        }
        insertText(options) {
            this._exec("insertText", options);
        }
        setContents(options) {
            this._exec("setContents", options);
        }
        getContents(options) {
            this._exec("getContents", options);
        }
        clear(options) {
            this._exec("clear", options);
        }
        removeFormat(options) {
            this._exec("removeFormat", options);
        }
        undo(options) {
            this._exec("undo", options);
        }
        redo(options) {
            this._exec("redo", options);
        }
        blur(options) {
            this._exec("blur", options);
        }
        getSelectionText(options) {
            this._exec("getSelectionText", options);
        }
        scrollIntoView(options) {
            this._exec("scrollIntoView", options);
        }
        _exec(method, options) {
            operateEditor(this.id, this.pageId, method, options);
        }
    };
    var ContextClasss = {
        canvas: CanvasContext,
        map: MapContext,
        video: VideoContext,
        editor: EditorContext
    };
    function convertContext(result) {
        if (result && result.contextInfo) {
            const { id: id2, type, page } = result.contextInfo;
            const ContextClass = ContextClasss[type];
            result.context = new ContextClass(id2, page);
            delete result.contextInfo;
        }
    }
    var NodesRef = class {
        constructor(selectorQuery, component, selector, single) {
            this._selectorQuery = selectorQuery;
            this._component = component;
            this._selector = selector;
            this._single = single;
        }
        boundingClientRect(callback) {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                id: true,
                dataset: true,
                rect: true,
                size: true
            }, callback);
            return this._selectorQuery;
        }
        fields(fields, callback) {
            this._selectorQuery._push(this._selector, this._component, this._single, fields, callback);
            return this._selectorQuery;
        }
        scrollOffset(callback) {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                id: true,
                dataset: true,
                scrollOffset: true
            }, callback);
            return this._selectorQuery;
        }
        context(callback) {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                context: true
            }, callback);
            return this._selectorQuery;
        }
        node(callback) {
            this._selectorQuery._push(this._selector, this._component, this._single, {
                node: true
            }, callback);
            return this._selectorQuery;
        }
    };
    var SelectorQuery = class {
        constructor(page) {
            this._component = void 0;
            this._page = page;
            this._queue = [];
            this._queueCb = [];
        }
        exec(callback) {
            requestComponentInfo(this._page, this._queue, (res) => {
                const queueCbs = this._queueCb;
                res.forEach((result, index2) => {
                    if (isArray(result)) {
                        result.forEach(convertContext);
                    } else {
                        convertContext(result);
                    }
                    const queueCb = queueCbs[index2];
                    if (isFunction(queueCb)) {
                        queueCb.call(this, result);
                    }
                });
                if (isFunction(callback)) {
                    callback.call(this, res);
                }
            });
            return this._nodesRef;
        }
        in(component) {
            this._component = resolveComponentInstance(component);
            return this;
        }
        select(selector) {
            return this._nodesRef = new NodesRef(this, this._component, selector, true);
        }
        selectAll(selector) {
            return this._nodesRef = new NodesRef(this, this._component, selector, false);
        }
        selectViewport() {
            return this._nodesRef = new NodesRef(this, null, "", true);
        }
        _push(selector, component, single, fields, callback) {
            this._queue.push({
                component,
                selector,
                single,
                fields
            });
            this._queueCb.push(callback);
        }
    };
    var createSelectorQuery = defineSyncApi("createSelectorQuery", (context) => {
        context = resolveComponentInstance(context);
        if (context && !getPageIdByVm(context)) {
            context = null;
        }
        return new SelectorQuery(context || getCurrentPageVm());
    });
    var API_CREATE_ANIMATION = "createAnimation";
    var CreateAnimationOptions = {
        // 目前参数校验不支持此api校验
        formatArgs: {
            /* duration: 400,
      timingFunction(timingFunction, params) {
        params.timingFunction = elemInArray(timingFunction, timingFunctions)
      },
      delay: 0,
      transformOrigin: '50% 50% 0', */
        }
    };
    var CreateAnimationProtocol = {
        duration: Number,
        timingFunction: String,
        delay: Number,
        transformOrigin: String
    };
    var defaultOption = {
        duration: 400,
        timingFunction: "linear",
        delay: 0,
        transformOrigin: "50% 50% 0"
    };
    var MPAnimation = class {
        constructor(option) {
            this.actions = [];
            this.currentTransform = {};
            this.currentStepAnimates = [];
            this.option = extend({}, defaultOption, option);
        }
        _getOption(option) {
            const _option = {
                transition: extend({}, this.option, option),
                transformOrigin: ""
            };
            _option.transformOrigin = _option.transition.transformOrigin;
            delete _option.transition.transformOrigin;
            return _option;
        }
        _pushAnimates(type, args) {
            this.currentStepAnimates.push({
                type,
                args
            });
        }
        _converType(type) {
            return type.replace(/[A-Z]/g, (text) => {
                return `-${text.toLowerCase()}`;
            });
        }
        _getValue(value) {
            return typeof value === "number" ? `${value}px` : value;
        }
        export() {
            const actions = this.actions;
            this.actions = [];
            return {
                actions
            };
        }
        step(option) {
            this.currentStepAnimates.forEach((animate) => {
                if (animate.type !== "style") {
                    this.currentTransform[animate.type] = animate;
                } else {
                    this.currentTransform[`${animate.type}.${animate.args[0]}`] = animate;
                }
            });
            this.actions.push({
                animates: Object.values(this.currentTransform),
                option: this._getOption(option)
            });
            this.currentStepAnimates = [];
            return this;
        }
    };
    var initAnimationProperty = /* @__PURE__ */ once(() => {
        const animateTypes1 = [
            "matrix",
            "matrix3d",
            "rotate",
            "rotate3d",
            "rotateX",
            "rotateY",
            "rotateZ",
            "scale",
            "scale3d",
            "scaleX",
            "scaleY",
            "scaleZ",
            "skew",
            "skewX",
            "skewY",
            "translate",
            "translate3d",
            "translateX",
            "translateY",
            "translateZ"
        ];
        const animateTypes2 = ["opacity", "backgroundColor"];
        const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
        animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
            MPAnimation.prototype[type] = function(...args) {
                if (animateTypes2.concat(animateTypes3).includes(type)) {
                    this._pushAnimates("style", [
                        this._converType(type),
                        animateTypes3.includes(type) ? this._getValue(args[0]) : args[0]
                    ]);
                } else {
                    this._pushAnimates(type, args);
                }
                return this;
            };
        });
    });
    var createAnimation = defineSyncApi(API_CREATE_ANIMATION, (option) => {
        initAnimationProperty();
        return new MPAnimation(option);
    }, CreateAnimationProtocol, CreateAnimationOptions);
    var API_ON_TAB_BAR_MID_BUTTON_TAP = "onTabBarMidButtonTap";
    var onTabBarMidButtonTap = defineOnApi(API_ON_TAB_BAR_MID_BUTTON_TAP, () => {
    });
    var API_ON_WINDOW_RESIZE = "onWindowResize";
    var API_OFF_WINDOW_RESIZE = "offWindowResize";
    var onWindowResize = defineOnApi(API_ON_WINDOW_RESIZE, () => {
    });
    var offWindowResize = defineOffApi(API_OFF_WINDOW_RESIZE, () => {
    });
    var API_SET_LOCALE = "setLocale";
    var API_GET_LOCALE = "getLocale";
    var API_ON_LOCALE_CHANGE = "onLocaleChange";
    var getLocale = defineSyncApi(API_GET_LOCALE, () => {
        const app = getApp({ allowDefault: true });
        if (app && app.$vm) {
            return app.$vm.$locale;
        }
        return useI18n().getLocale();
    });
    var onLocaleChange = defineOnApi(API_ON_LOCALE_CHANGE, () => {
    });
    var setLocale = defineSyncApi(API_SET_LOCALE, (locale) => {
        const app = getApp();
        if (!app) {
            return false;
        }
        const oldLocale = app.$vm.$locale;
        if (oldLocale !== locale) {
            app.$vm.$locale = locale;
            {
                const pages2 = getCurrentPages();
                pages2.forEach((page) => {
                    UniServiceJSBridge.publishHandler(API_SET_LOCALE, locale, page.$page.id);
                });
                weex.requireModule("plus").setLanguage(locale);
            }
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCALE_CHANGE, { locale });
            return true;
        }
        return false;
    });
    var API_SET_PAGE_META = "setPageMeta";
    var setPageMeta = defineAsyncApi(API_SET_PAGE_META, (options, { resolve: resolve2 }) => {
        resolve2(setCurrentPageMeta(getCurrentPageVm()));
    });
    var API_SET_BACKGROUND_COLOR = "setBackgroundColor";
    var SetBackgroundColorProtocol = {
        backgroundColor: {
            type: String
        }
    };
    var API_SET_BACKGROUND_TEXT_STYLE = "setBackgroundTextStyle";
    var SetBackgroundTextStyleProtocol = {
        textStyle: {
            type: String,
            required: true
        }
    };
    var API_GET_SELECTED_TEXT_RANGE = "getSelectedTextRange";
    var getSelectedTextRange = defineAsyncApi(API_GET_SELECTED_TEXT_RANGE, (_, { resolve: resolve2, reject }) => {
        UniServiceJSBridge.invokeViewMethod(API_GET_SELECTED_TEXT_RANGE, {}, getCurrentPageId(), (res) => {
            if (typeof res.end === "undefined" && typeof res.start === "undefined") {
                reject("no focused");
            } else {
                resolve2(res);
            }
        });
    });
    var appHooks = {
        [ON_UNHANDLE_REJECTION]: [],
        [ON_PAGE_NOT_FOUND]: [],
        [ON_ERROR]: [],
        [ON_SHOW]: [],
        [ON_HIDE]: []
    };
    function onAppHook(type, hook) {
        const app = getApp({ allowDefault: true });
        if (app && app.$vm) {
            return injectHook(type, hook, app.$vm.$);
        }
        appHooks[type].push(hook);
    }
    function injectAppHooks(appInstance) {
        Object.keys(appHooks).forEach((type) => {
            appHooks[type].forEach((hook) => {
                injectHook(type, hook, appInstance);
            });
        });
    }
    function offAppHook(type, hook) {
        const app = getApp({ allowDefault: true });
        if (app && app.$vm) {
            return removeHook(app.$vm, type, hook);
        }
        remove(appHooks[type], hook);
    }
    function onUnhandledRejection(hook) {
        onAppHook(ON_UNHANDLE_REJECTION, hook);
    }
    function offUnhandledRejection(hook) {
        offAppHook(ON_UNHANDLE_REJECTION, hook);
    }
    function onPageNotFound(hook) {
        onAppHook(ON_PAGE_NOT_FOUND, hook);
    }
    function offPageNotFound(hook) {
        offAppHook(ON_PAGE_NOT_FOUND, hook);
    }
    function onError(hook) {
        onAppHook(ON_ERROR, hook);
    }
    function offError(hook) {
        offAppHook(ON_ERROR, hook);
    }
    function onAppShow(hook) {
        onAppHook(ON_SHOW, hook);
    }
    function offAppShow(hook) {
        offAppHook(ON_SHOW, hook);
    }
    function onAppHide(hook) {
        onAppHook(ON_HIDE, hook);
    }
    function offAppHide(hook) {
        offAppHook(ON_HIDE, hook);
    }
    var API_GET_ENTER_OPTIONS_SYNC = "getEnterOptionsSync";
    var getEnterOptionsSync = defineSyncApi(API_GET_ENTER_OPTIONS_SYNC, () => {
        return getEnterOptions();
    });
    var API_GET_LAUNCH_OPTIONS_SYNC = "getLaunchOptionsSync";
    var getLaunchOptionsSync = defineSyncApi(API_GET_LAUNCH_OPTIONS_SYNC, () => {
        return getLaunchOptions();
    });
    var API_CAN_I_USE = "canIUse";
    var CanIUseProtocol = [
        {
            name: "schema",
            type: String,
            required: true
        }
    ];
    var API_CHOOSE_LOCATION = "chooseLocation";
    var ChooseLocationProtocol = {
        keyword: String,
        latitude: Number,
        longitude: Number
    };
    var API_GET_LOCATION = "getLocation";
    var coordTypes$1 = ["wgs84", "gcj02"];
    var GetLocationOptions = {
        formatArgs: {
            type(value, params) {
                value = (value || "").toLowerCase();
                if (coordTypes$1.indexOf(value) === -1) {
                    params.type = coordTypes$1[0];
                } else {
                    params.type = value;
                }
            },
            altitude(value, params) {
                params.altitude = value ? value : false;
            }
        }
    };
    var GetLocationProtocol = {
        type: String,
        altitude: Boolean
    };
    var API_OPEN_LOCATION = "openLocation";
    var checkProps = (key, value) => {
        if (value === void 0) {
            return `${key} should not be empty.`;
        }
        if (typeof value !== "number") {
            let receivedType = typeof value;
            receivedType = receivedType[0].toUpperCase() + receivedType.substring(1);
            return `Expected Number, got ${receivedType} with value ${JSON.stringify(value)}.`;
        }
    };
    var OpenLocationOptions = {
        formatArgs: {
            latitude(value, params) {
                const checkedInfo = checkProps("latitude", value);
                if (checkedInfo) {
                    return checkedInfo;
                }
                params.latitude = value;
            },
            longitude(value, params) {
                const checkedInfo = checkProps("longitude", value);
                if (checkedInfo) {
                    return checkedInfo;
                }
                params.longitude = value;
            },
            scale(value, params) {
                value = Math.floor(value);
                params.scale = value >= 5 && value <= 18 ? value : 18;
            }
        }
    };
    var OpenLocationProtocol = {
        latitude: Number,
        longitude: Number,
        scale: Number,
        name: String,
        address: String
    };
    var API_START_LOCATION_UPDATE = "startLocationUpdate";
    var API_ON_LOCATION_CHANGE = "onLocationChange";
    var API_STOP_LOCATION_UPDATE = "stopLocationUpdate";
    var API_OFF_LOCATION_CHANGE = "offLocationChange";
    var API_OFF_LOCATION_CHANGE_ERROR = "offLocationChangeError";
    var API_ON_LOCATION_CHANGE_ERROR = "onLocationChangeError";
    var coordTypes = ["wgs84", "gcj02"];
    var StartLocationUpdateProtocol = {
        type: String
    };
    var StartLocationUpdateOptions = {
        formatArgs: {
            type(value, params) {
                value = (value || "").toLowerCase();
                if (coordTypes.indexOf(value) === -1) {
                    params.type = coordTypes[1];
                } else {
                    params.type = value;
                }
            }
        }
    };
    function encodeQueryString(url) {
        if (!isString(url)) {
            return url;
        }
        const index2 = url.indexOf("?");
        if (index2 === -1) {
            return url;
        }
        const query = url.slice(index2 + 1).trim().replace(/^(\?|#|&)/, "");
        if (!query) {
            return url;
        }
        url = url.slice(0, index2);
        const params = [];
        query.split("&").forEach((param) => {
            const parts = param.replace(/\+/g, " ").split("=");
            const key = parts.shift();
            const val = parts.length > 0 ? parts.join("=") : "";
            params.push(key + "=" + encodeURIComponent(val));
        });
        return params.length ? url + "?" + params.join("&") : url;
    }
    var ANIMATION_IN = [
        "slide-in-right",
        "slide-in-left",
        "slide-in-top",
        "slide-in-bottom",
        "fade-in",
        "zoom-out",
        "zoom-fade-out",
        "pop-in",
        "none"
    ];
    var ANIMATION_OUT = [
        "slide-out-right",
        "slide-out-left",
        "slide-out-top",
        "slide-out-bottom",
        "fade-out",
        "zoom-in",
        "zoom-fade-in",
        "pop-out",
        "none"
    ];
    var BaseRouteProtocol = {
        url: {
            type: String,
            required: true
        }
    };
    var API_NAVIGATE_TO = "navigateTo";
    var API_REDIRECT_TO = "redirectTo";
    var API_RE_LAUNCH = "reLaunch";
    var API_SWITCH_TAB = "switchTab";
    var API_NAVIGATE_BACK = "navigateBack";
    var API_PRELOAD_PAGE = "preloadPage";
    var API_UN_PRELOAD_PAGE = "unPreloadPage";
    var NavigateToProtocol = /* @__PURE__ */ extend({}, BaseRouteProtocol, createAnimationProtocol(ANIMATION_IN));
    var NavigateBackProtocol = /* @__PURE__ */ extend({
        delta: {
            type: Number
        }
    }, createAnimationProtocol(ANIMATION_OUT));
    var RedirectToProtocol = BaseRouteProtocol;
    var ReLaunchProtocol = BaseRouteProtocol;
    var SwitchTabProtocol = BaseRouteProtocol;
    var NavigateToOptions = /* @__PURE__ */ createRouteOptions(API_NAVIGATE_TO);
    var RedirectToOptions = /* @__PURE__ */ createRouteOptions(API_REDIRECT_TO);
    var ReLaunchOptions = /* @__PURE__ */ createRouteOptions(API_RE_LAUNCH);
    var SwitchTabOptions = /* @__PURE__ */ createRouteOptions(API_SWITCH_TAB);
    var NavigateBackOptions = {
        formatArgs: {
            delta(value, params) {
                value = parseInt(value + "") || 1;
                params.delta = Math.min(getCurrentPages().length - 1, value);
            }
        }
    };
    function createAnimationProtocol(animationTypes) {
        return {
            animationType: {
                type: String,
                validator(type) {
                    if (type && animationTypes.indexOf(type) === -1) {
                        return "`" + type + "` is not supported for `animationType` (supported values are: `" + animationTypes.join("`|`") + "`)";
                    }
                }
            },
            animationDuration: {
                type: Number
            }
        };
    }
    var navigatorLock;
    function beforeRoute() {
        navigatorLock = "";
    }
    function createRouteOptions(type) {
        return {
            formatArgs: {
                url: createNormalizeUrl(type)
            },
            beforeAll: beforeRoute
        };
    }
    function createNormalizeUrl(type) {
        return function normalizeUrl(url, params) {
            if (!url) {
                return `Missing required args: "url"`;
            }
            url = normalizeRoute(url);
            const pagePath = url.split("?")[0];
            const routeOptions = getRouteOptions(pagePath, true);
            if (!routeOptions) {
                return "page `" + url + "` is not found";
            }
            if (type === API_NAVIGATE_TO || type === API_REDIRECT_TO) {
                if (routeOptions.meta.isTabBar) {
                    return `can not ${type} a tabbar page`;
                }
            } else if (type === API_SWITCH_TAB) {
                if (!routeOptions.meta.isTabBar) {
                    return "can not switch to no-tabBar page";
                }
            }
            if ((type === API_SWITCH_TAB || type === API_PRELOAD_PAGE) && routeOptions.meta.isTabBar && params.openType !== "appLaunch") {
                url = pagePath;
            }
            if (routeOptions.meta.isEntry) {
                url = url.replace(routeOptions.alias, "/");
            }
            params.url = encodeQueryString(url);
            if (type === API_UN_PRELOAD_PAGE) {
                return;
            } else if (type === API_PRELOAD_PAGE) {
                {
                    if (!routeOptions.meta.isNVue) {
                        return "can not preload vue page";
                    }
                }
                if (routeOptions.meta.isTabBar) {
                    const pages2 = getCurrentPages();
                    const tabBarPagePath = routeOptions.path.slice(1);
                    if (pages2.find((page) => page.route === tabBarPagePath)) {
                        return "tabBar page `" + tabBarPagePath + "` already exists";
                    }
                }
                return;
            }
            if (navigatorLock === url && params.openType !== "appLaunch") {
                return `${navigatorLock} locked`;
            }
            if (__uniConfig.ready) {
                navigatorLock = url;
            }
        };
    }
    var API_LOAD_FONT_FACE = "loadFontFace";
    var LoadFontFaceProtocol = {
        family: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        desc: Object
    };
    var FRONT_COLORS = ["#ffffff", "#000000"];
    var API_SET_NAVIGATION_BAR_COLOR = "setNavigationBarColor";
    var SetNavigationBarColorOptions = {
        formatArgs: {
            animation(animation, params) {
                if (!animation) {
                    animation = { duration: 0, timingFunc: "linear" };
                }
                params.animation = {
                    duration: animation.duration || 0,
                    timingFunc: animation.timingFunc || "linear"
                };
            }
        }
    };
    var SetNavigationBarColorProtocol = {
        frontColor: {
            type: String,
            required: true,
            validator(frontColor) {
                if (FRONT_COLORS.indexOf(frontColor) === -1) {
                    return `invalid frontColor "${frontColor}"`;
                }
            }
        },
        backgroundColor: {
            type: String,
            required: true
        },
        animation: Object
    };
    var API_SET_NAVIGATION_BAR_TITLE = "setNavigationBarTitle";
    var SetNavigationBarTitleProtocol = {
        title: {
            type: String,
            required: true
        }
    };
    var API_SHOW_NAVIGATION_BAR_LOADING = "showNavigationBarLoading";
    var API_HIDE_NAVIGATION_BAR_LOADING = "hideNavigationBarLoading";
    var API_PAGE_SCROLL_TO = "pageScrollTo";
    var PageScrollToProtocol = {
        scrollTop: Number,
        selector: String,
        duration: Number
    };
    var PageScrollToOptions = {
        formatArgs: {
            duration: 300
        }
    };
    var IndexProtocol = {
        index: {
            type: Number,
            required: true
        }
    };
    var IndexOptions = {
        beforeInvoke() {
            const pageMeta = getCurrentPageMeta();
            if (pageMeta && !pageMeta.isTabBar) {
                return "not TabBar page";
            }
        },
        formatArgs: {
            index(value) {
                if (!__uniConfig.tabBar.list[value]) {
                    return "tabbar item not found";
                }
            }
        }
    };
    var API_SET_TAB_BAR_ITEM = "setTabBarItem";
    var SetTabBarItemProtocol = /* @__PURE__ */ extend({
        text: String,
        iconPath: String,
        selectedIconPath: String,
        pagePath: String
    }, IndexProtocol);
    var SetTabBarItemOptions = {
        beforeInvoke: IndexOptions.beforeInvoke,
        formatArgs: /* @__PURE__ */ extend({
            pagePath(value, params) {
                if (value) {
                    params.pagePath = removeLeadingSlash(value);
                }
            }
        }, IndexOptions.formatArgs)
    };
    var API_SET_TAB_BAR_STYLE = "setTabBarStyle";
    var SetTabBarStyleProtocol = {
        color: String,
        selectedColor: String,
        backgroundColor: String,
        backgroundImage: String,
        backgroundRepeat: String,
        borderStyle: String
    };
    var GRADIENT_RE = /^(linear|radial)-gradient\(.+?\);?$/;
    var SetTabBarStyleOptions = {
        beforeInvoke: IndexOptions.beforeInvoke,
        formatArgs: {
            backgroundImage(value, params) {
                if (value && !GRADIENT_RE.test(value)) {
                    params.backgroundImage = getRealPath(value);
                }
            },
            borderStyle(value, params) {
                if (value) {
                    params.borderStyle = value === "white" ? "white" : "black";
                }
            }
        }
    };
    var API_HIDE_TAB_BAR = "hideTabBar";
    var HideTabBarProtocol = {
        animation: Boolean
    };
    var API_SHOW_TAB_BAR = "showTabBar";
    var ShowTabBarProtocol = HideTabBarProtocol;
    var API_HIDE_TAB_BAR_RED_DOT = "hideTabBarRedDot";
    var HideTabBarRedDotProtocol = IndexProtocol;
    var HideTabBarRedDotOptions = IndexOptions;
    var API_SHOW_TAB_BAR_RED_DOT = "showTabBarRedDot";
    var ShowTabBarRedDotProtocol = IndexProtocol;
    var ShowTabBarRedDotOptions = IndexOptions;
    var API_REMOVE_TAB_BAR_BADGE = "removeTabBarBadge";
    var RemoveTabBarBadgeProtocol = IndexProtocol;
    var RemoveTabBarBadgeOptions = IndexOptions;
    var API_SET_TAB_BAR_BADGE = "setTabBarBadge";
    var SetTabBarBadgeProtocol = /* @__PURE__ */ extend({
        text: {
            type: String,
            required: true
        }
    }, IndexProtocol);
    var SetTabBarBadgeOptions = {
        beforeInvoke: IndexOptions.beforeInvoke,
        formatArgs: /* @__PURE__ */ extend({
            text(value, params) {
                if (getLen(value) >= 4) {
                    params.text = "...";
                }
            }
        }, IndexOptions.formatArgs)
    };
    var config;
    var visible = true;
    var tabBar;
    function setTabBarBadge$1(type, index2, text) {
        if (!tabBar) {
            return;
        }
        if (type === "none") {
            tabBar.hideTabBarRedDot({
                index: index2
            });
            tabBar.removeTabBarBadge({
                index: index2
            });
        } else if (type === "text") {
            tabBar.setTabBarBadge({
                index: index2,
                text
            });
        } else if (type === "redDot") {
            tabBar.showTabBarRedDot({
                index: index2
            });
        }
    }
    function setTabBarItems(tabBarConfig) {
        tabBar && tabBar.setTabBarItems(tabBarConfig);
    }
    function setTabBarItem$1(index2, text, iconPath, selectedIconPath, visible2, iconfont) {
        const item = {
            index: index2
        };
        if (text !== void 0) {
            item.text = text;
        }
        if (iconPath) {
            item.iconPath = getRealPath(iconPath);
        }
        if (selectedIconPath) {
            item.selectedIconPath = getRealPath(selectedIconPath);
        }
        if (iconfont !== void 0) {
            item.iconfont = iconfont;
        }
        if (visible2 !== void 0) {
            item.visible = config.list[index2].visible = visible2;
            delete item.index;
            const tabbarItems = config.list.map((item2) => ({
                visible: item2.visible
            }));
            tabbarItems[index2] = item;
            setTabBarItems({ list: tabbarItems });
        } else {
            tabBar && tabBar.setTabBarItem(item);
        }
    }
    function setTabBarStyle$1(style) {
        tabBar && tabBar.setTabBarStyle(style);
    }
    function hideTabBar$1(animation) {
        visible = false;
        tabBar && tabBar.hideTabBar({
            animation
        });
    }
    function showTabBar$1(animation) {
        visible = true;
        tabBar && tabBar.showTabBar({
            animation
        });
    }
    var maskClickCallback = [];
    var tabBarInstance = {
        id: "0",
        init(options, clickCallback) {
            if (options && options.list.length) {
                config = options;
            }
            try {
                tabBar = weex.requireModule("uni-tabview");
            } catch (error) {
                console.log(`uni.requireNativePlugin("uni-tabview") error ${error}`);
            }
            tabBar.onMaskClick(() => {
                maskClickCallback.forEach((callback) => {
                    callback();
                });
            });
            tabBar && tabBar.onClick(({ index: index2 }) => {
                clickCallback(config.list[index2], index2);
            });
            tabBar && tabBar.onMidButtonClick(() => {
                return UniServiceJSBridge.invokeOnCallback(API_ON_TAB_BAR_MID_BUTTON_TAP);
            });
        },
        indexOf(page) {
            const config2 = this.config;
            const itemLength = config2 && config2.list && config2.list.length;
            if (itemLength) {
                for (let i = 0; i < itemLength; i++) {
                    if (config2.list[i].pagePath === page || config2.list[i].pagePath === `${page}.html`) {
                        return i;
                    }
                }
            }
            return -1;
        },
        switchTab(page) {
            const index2 = this.indexOf(page);
            if (index2 >= 0) {
                tabBar && tabBar.switchSelect({
                    index: index2
                });
                return true;
            }
            return false;
        },
        setTabBarBadge: setTabBarBadge$1,
        setTabBarItem: setTabBarItem$1,
        setTabBarStyle: setTabBarStyle$1,
        hideTabBar: hideTabBar$1,
        showTabBar: showTabBar$1,
        append(webview) {
            tabBar && tabBar.append({
                id: webview.id
            }, ({ code }) => {
                if (code !== 0) {
                    setTimeout(() => {
                        this.append(webview);
                    }, 20);
                }
            });
        },
        get config() {
            return config || __uniConfig.tabBar;
        },
        get visible() {
            return visible;
        },
        get height() {
            const config2 = this.config;
            return (config2 && config2.height ? parseFloat(config2.height) : TABBAR_HEIGHT) + plus.navigator.getSafeAreaInsets().deviceBottom;
        },
        // tabBar是否遮挡内容区域
        get cover() {
            const config2 = this.config;
            const array = ["extralight", "light", "dark"];
            return config2 && array.indexOf(config2.blurEffect) >= 0;
        },
        setStyle({ mask }) {
            tabBar.setMask({
                color: mask
            });
        },
        addEventListener(_name, callback) {
            maskClickCallback.push(callback);
        },
        removeEventListener(_name, callback) {
            const callbackIndex = maskClickCallback.indexOf(callback);
            maskClickCallback.splice(callbackIndex, 1);
        }
    };
    function isTabBarPage(path = "") {
        if (!(__uniConfig.tabBar && isArray(__uniConfig.tabBar.list))) {
            return false;
        }
        try {
            if (!path) {
                const pages2 = getCurrentPages();
                if (!pages2.length) {
                    return false;
                }
                const page = pages2[pages2.length - 1];
                if (!page) {
                    return false;
                }
                return page.$page.meta.isTabBar;
            }
            if (!/^\//.test(path)) {
                path = addLeadingSlash(path);
            }
            const route = getRouteOptions(path);
            return route && route.meta.isTabBar;
        } catch (e) {
            if (false) {
                console.error(formatLog("isTabBarPage", e));
            }
        }
        return false;
    }
    var setTabBarBadge = defineAsyncApi(API_SET_TAB_BAR_BADGE, ({ index: index2, text }, { resolve: resolve2, reject }) => {
        tabBarInstance.setTabBarBadge("text", index2, text);
        resolve2();
    }, SetTabBarBadgeProtocol, SetTabBarBadgeOptions);
    var setTabBarItem = defineAsyncApi(API_SET_TAB_BAR_ITEM, ({ index: index2, text, iconPath, selectedIconPath, pagePath, visible: visible2, iconfont }, { resolve: resolve2 }) => {
        tabBarInstance.setTabBarItem(index2, text, iconPath, selectedIconPath, visible2, iconfont);
        if (pagePath) {
            const tabBarItem = __uniConfig.tabBar.list[index2];
            if (tabBarItem) {
                const oldPagePath = tabBarItem.pagePath;
                const newPagePath = removeLeadingSlash(pagePath);
                if (newPagePath !== oldPagePath) {
                    normalizeTabBarRoute(index2, oldPagePath, newPagePath);
                }
            }
        }
        resolve2();
    }, SetTabBarItemProtocol, SetTabBarItemOptions);
    var setTabBarStyle = defineAsyncApi(API_SET_TAB_BAR_STYLE, (style = {}, { resolve: resolve2, reject }) => {
        if (!isTabBarPage()) {
            return reject("not TabBar page");
        }
        style.borderStyle = normalizeTabBarStyles(style.borderStyle);
        tabBarInstance.setTabBarStyle(style);
        resolve2();
    }, SetTabBarStyleProtocol, SetTabBarStyleOptions);
    var hideTabBar = defineAsyncApi(API_HIDE_TAB_BAR, (args, { resolve: resolve2, reject }) => {
        const animation = args && args.animation;
        if (!isTabBarPage()) {
            return reject("not TabBar page");
        }
        tabBarInstance.hideTabBar(Boolean(animation));
        resolve2();
    }, HideTabBarProtocol);
    var showTabBar = defineAsyncApi(API_SHOW_TAB_BAR, (args, { resolve: resolve2, reject }) => {
        const animation = args && args.animation;
        if (!isTabBarPage()) {
            return reject("not TabBar page");
        }
        tabBarInstance.showTabBar(Boolean(animation));
        resolve2();
    }, ShowTabBarProtocol);
    var showTabBarRedDot = defineAsyncApi(API_SHOW_TAB_BAR_RED_DOT, ({ index: index2 }, { resolve: resolve2, reject }) => {
        tabBarInstance.setTabBarBadge("redDot", index2);
        resolve2();
    }, ShowTabBarRedDotProtocol, ShowTabBarRedDotOptions);
    var setTabBarBadgeNone = (index2) => tabBarInstance.setTabBarBadge("none", index2);
    var removeTabBarBadge = defineAsyncApi(API_REMOVE_TAB_BAR_BADGE, ({ index: index2 }, { resolve: resolve2, reject }) => {
        setTabBarBadgeNone(index2);
        resolve2();
    }, RemoveTabBarBadgeProtocol, RemoveTabBarBadgeOptions);
    var hideTabBarRedDot = defineAsyncApi(API_HIDE_TAB_BAR_RED_DOT, ({ index: index2 }, { resolve: resolve2, reject }) => {
        setTabBarBadgeNone(index2);
        resolve2();
    }, HideTabBarRedDotProtocol, HideTabBarRedDotOptions);
    var loadFontFace = defineAsyncApi(API_LOAD_FONT_FACE, (options, { resolve: resolve2, reject }) => {
        const pageId = getPageIdByVm(getCurrentPageVm());
        UniServiceJSBridge.invokeViewMethod(API_LOAD_FONT_FACE, options, pageId, (err2) => {
            if (typeof err2 === "string") {
                reject(err2);
            } else {
                resolve2();
            }
        });
    }, LoadFontFaceProtocol);
    function getCurrentWebview() {
        const page = getCurrentPage();
        if (page) {
            return page.$getAppWebview();
        }
        return null;
    }
    function getWebview(page) {
        if (page) {
            return page.$getAppWebview();
        }
        return getCurrentWebview();
    }
    var setNavigationBarTitle = defineAsyncApi(API_SET_NAVIGATION_BAR_TITLE, ({ __page__, title }, { resolve: resolve2, reject }) => {
        const webview = getWebview(__page__);
        if (webview) {
            const style = webview.getStyle();
            if (style && style.titleNView) {
                webview.setStyle({
                    titleNView: {
                        titleText: title
                    }
                });
            }
            resolve2();
        } else {
            reject();
        }
    }, SetNavigationBarTitleProtocol);
    var showNavigationBarLoading = defineAsyncApi(API_SHOW_NAVIGATION_BAR_LOADING, (args, { resolve: resolve2, reject }) => {
        let webview = null;
        if (args)
            webview = getWebview(args.__page__);
        if (webview) {
            const style = webview.getStyle();
            if (style && style.titleNView) {
                webview.setStyle({
                    titleNView: {
                        // @ts-expect-error
                        loading: true
                    }
                });
            }
            resolve2();
        } else {
            reject();
        }
    });
    var hideNavigationBarLoading = defineAsyncApi(API_HIDE_NAVIGATION_BAR_LOADING, (args, { resolve: resolve2, reject }) => {
        let webview = null;
        if (args)
            webview = getWebview(args.__page__);
        if (webview) {
            const style = webview.getStyle();
            if (style && style.titleNView) {
                webview.setStyle({
                    titleNView: {
                        // @ts-expect-error
                        loading: false
                    }
                });
            }
            resolve2();
        } else {
            reject();
        }
    });
    function setPageStatusBarStyle(statusBarStyle) {
        const pages2 = getCurrentPages();
        if (!pages2.length) {
            return;
        }
        pages2[pages2.length - 1].$page.statusBarStyle = statusBarStyle;
    }
    var setNavigationBarColor = defineAsyncApi(API_SET_NAVIGATION_BAR_COLOR, ({ __page__, frontColor, backgroundColor }, { resolve: resolve2, reject }) => {
        const webview = getWebview(__page__);
        if (webview) {
            const styles = {};
            if (frontColor) {
                styles.titleColor = frontColor;
            }
            if (backgroundColor) {
                styles.backgroundColor = backgroundColor;
            }
            const statusBarStyle = frontColor === "#000000" ? "dark" : "light";
            plus.navigator.setStatusBarStyle(statusBarStyle);
            setPageStatusBarStyle(statusBarStyle);
            const style = webview.getStyle();
            if (style && style.titleNView) {
                if (style.titleNView.autoBackButton) {
                    styles.backButton = styles.backButton || {};
                    styles.backButton.color = frontColor;
                }
                webview.setStyle({
                    titleNView: styles
                });
            }
            resolve2();
        } else {
            reject();
        }
    }, SetNavigationBarColorProtocol, SetNavigationBarColorOptions);
    var setBackgroundColor = defineAsyncApi(API_SET_BACKGROUND_COLOR, ({ __page__, backgroundColor }, { resolve: resolve2, reject }) => {
        if (isString(backgroundColor)) {
            const webview = getWebview(__page__);
            if (webview) {
                webview.setStyle({
                    background: backgroundColor
                });
                resolve2();
            } else {
                reject();
            }
        } else {
            reject("options backgroundColor must be a string");
        }
    }, SetBackgroundColorProtocol);
    var setBackgroundTextStyle = defineAsyncApi(API_SET_BACKGROUND_TEXT_STYLE, ({ __page__, textStyle }, { resolve: resolve2, reject }) => {
        if (isString(textStyle)) {
            const webview = getWebview(__page__);
            if (webview) {
                webview.setStyle({
                    backgroundTextStyle: textStyle
                });
                resolve2();
            } else {
                reject();
            }
        } else {
            reject("options textStyle must be a string");
        }
    }, SetBackgroundTextStyleProtocol);
    function onKeyboardHeightChangeCallback(res) {
        UniServiceJSBridge.invokeOnCallback(ON_KEYBOARD_HEIGHT_CHANGE, res);
    }
    var onKeyboardHeightChange = defineOnApi(ON_KEYBOARD_HEIGHT_CHANGE, () => {
        UniServiceJSBridge.on(ON_KEYBOARD_HEIGHT_CHANGE, onKeyboardHeightChangeCallback);
    });
    var offKeyboardHeightChange = defineOffApi(ON_KEYBOARD_HEIGHT_CHANGE, () => {
        UniServiceJSBridge.off(ON_KEYBOARD_HEIGHT_CHANGE, onKeyboardHeightChangeCallback);
    });
    var canIUse = defineSyncApi(API_CAN_I_USE, (schema) => {
        if (hasOwn(uni, schema)) {
            return true;
        }
        return false;
    }, CanIUseProtocol);
    var VD_SYNC = "vdSync";
    var ON_WEBVIEW_READY = "onWebviewReady";
    var ACTION_TYPE_DICT = 0;
    var WEBVIEW_INSERTED = "webviewInserted";
    var WEBVIEW_REMOVED = "webviewRemoved";
    function initNVue(webviewStyle, routeMeta, path) {
        if (path && routeMeta.isNVue) {
            webviewStyle.uniNView = {
                path,
                defaultFontSize: __uniConfig.defaultFontSize,
                viewport: __uniConfig.viewport
            };
        }
    }
    var colorRE = /^#[a-z0-9]{6}$/i;
    function isColor(color) {
        return color && (colorRE.test(color) || color === "transparent");
    }
    function initBackgroundColor(webviewStyle, routeMeta) {
        let { backgroundColor } = routeMeta;
        if (!backgroundColor) {
            return;
        }
        if (!isColor(backgroundColor)) {
            return;
        }
        if (!webviewStyle.background) {
            webviewStyle.background = backgroundColor;
        } else {
            backgroundColor = webviewStyle.background;
        }
        if (!webviewStyle.backgroundColorTop) {
            webviewStyle.backgroundColorTop = backgroundColor;
        }
        if (!webviewStyle.backgroundColorBottom) {
            webviewStyle.backgroundColorBottom = backgroundColor;
        }
        if (!webviewStyle.animationAlphaBGColor) {
            webviewStyle.animationAlphaBGColor = backgroundColor;
        }
        if (typeof webviewStyle.webviewBGTransparent === "undefined") {
            webviewStyle.webviewBGTransparent = true;
        }
    }
    function initPopGesture(webviewStyle, routeMeta) {
        if (webviewStyle.popGesture === "hide") {
            delete webviewStyle.popGesture;
        }
        if (routeMeta.isQuit) {
            webviewStyle.popGesture = "none";
        }
    }
    function initPullToRefresh(webviewStyle, routeMeta) {
        if (!routeMeta.enablePullDownRefresh) {
            return;
        }
        const pullToRefresh = normalizePullToRefreshRpx(extend({}, defaultPullToRefresh, routeMeta.pullToRefresh));
        webviewStyle.pullToRefresh = initWebviewPullToRefreshI18n(pullToRefresh, routeMeta);
    }
    function initWebviewPullToRefreshI18n(pullToRefresh, routeMeta) {
        const i18nResult = initPullToRefreshI18n(pullToRefresh);
        if (!i18nResult) {
            return pullToRefresh;
        }
        const [contentdownI18n, contentoverI18n, contentrefreshI18n] = i18nResult;
        if (contentdownI18n || contentoverI18n || contentrefreshI18n) {
            uni.onLocaleChange(() => {
                const webview = plus.webview.getWebviewById(routeMeta.id + "");
                if (!webview) {
                    return;
                }
                const newPullToRefresh = {
                    support: true
                };
                if (contentdownI18n) {
                    newPullToRefresh.contentdown = {
                        caption: pullToRefresh.contentdown.caption
                    };
                }
                if (contentoverI18n) {
                    newPullToRefresh.contentover = {
                        caption: pullToRefresh.contentover.caption
                    };
                }
                if (contentrefreshI18n) {
                    newPullToRefresh.contentrefresh = {
                        caption: pullToRefresh.contentrefresh.caption
                    };
                }
                if (false) {
                    console.log(formatLog("updateWebview", webview.id, newPullToRefresh));
                }
                webview.setStyle({
                    pullToRefresh: newPullToRefresh
                });
            });
        }
        return pullToRefresh;
    }
    var defaultPullToRefresh = {
        support: true,
        style: "default",
        height: "50px",
        range: "200px",
        contentdown: {
            caption: ""
        },
        contentover: {
            caption: ""
        },
        contentrefresh: {
            caption: ""
        }
    };
    function initTitleNView(webviewStyle, routeMeta) {
        const { navigationBar } = routeMeta;
        if (navigationBar.style === "custom") {
            return false;
        }
        let autoBackButton = true;
        if (routeMeta.isQuit) {
            autoBackButton = false;
        }
        const titleNView = {
            autoBackButton
        };
        Object.keys(navigationBar).forEach((name) => {
            const value = navigationBar[name];
            if (name === "titleImage" && value) {
                titleNView.tags = createTitleImageTags(value);
            } else if (name === "buttons" && isArray(value)) {
                titleNView.buttons = value.map((button, index2) => {
                    button.onclick = createTitleNViewBtnClick(index2);
                    return button;
                });
            } else {
                titleNView[name] = value;
            }
        });
        webviewStyle.titleNView = initTitleNViewI18n(titleNView, routeMeta);
    }
    function initTitleNViewI18n(titleNView, routeMeta) {
        const i18nResult = initNavigationBarI18n(titleNView);
        if (!i18nResult) {
            return titleNView;
        }
        const [titleTextI18n, searchInputPlaceholderI18n] = i18nResult;
        if (titleTextI18n || searchInputPlaceholderI18n) {
            uni.onLocaleChange(() => {
                const webview = plus.webview.getWebviewById(routeMeta.id + "");
                if (!webview) {
                    return;
                }
                const newTitleNView = {};
                if (titleTextI18n) {
                    newTitleNView.titleText = titleNView.titleText;
                }
                if (searchInputPlaceholderI18n) {
                    newTitleNView.searchInput = {
                        placeholder: titleNView.searchInput.placeholder
                    };
                }
                if (false) {
                    console.log(formatLog("updateWebview", webview.id, newTitleNView));
                }
                webview.setStyle({
                    titleNView: newTitleNView
                });
            });
        }
        return titleNView;
    }
    function createTitleImageTags(titleImage) {
        return [
            {
                tag: "img",
                src: titleImage,
                position: {
                    left: "auto",
                    top: "auto",
                    width: "auto",
                    height: "26px"
                }
            }
        ];
    }
    function createTitleNViewBtnClick(index2) {
        return function onClick(btn) {
            btn.index = index2;
            invokeHook(ON_NAVIGATION_BAR_BUTTON_TAP, btn);
        };
    }
    function parseWebviewStyle(path, routeMeta, webview) {
        const webviewStyle = {
            bounce: "vertical"
        };
        Object.keys(routeMeta).forEach((name) => {
            if (WEBVIEW_STYLE_BLACKLIST.indexOf(name) === -1) {
                webviewStyle[name] = routeMeta[name];
            }
        });
        if (webview.id !== "1") {
            initNVue(webviewStyle, routeMeta, path);
        }
        initPopGesture(webviewStyle, routeMeta);
        initBackgroundColor(webviewStyle, routeMeta);
        initTitleNView(webviewStyle, routeMeta);
        initPullToRefresh(webviewStyle, routeMeta);
        return webviewStyle;
    }
    var WEBVIEW_STYLE_BLACKLIST = [
        "id",
        "route",
        "isNVue",
        "isQuit",
        "isEntry",
        "isTabBar",
        "tabBarIndex",
        "windowTop",
        "topWindow",
        "leftWindow",
        "rightWindow",
        "maxWidth",
        "usingComponents",
        "disableScroll",
        "enablePullDownRefresh",
        "navigationBar",
        "pullToRefresh",
        "onReachBottomDistance",
        "pageOrientation",
        "backgroundColor"
    ];
    var id = 2;
    function getWebviewId() {
        return id;
    }
    function genWebviewId() {
        return id++;
    }
    function encode2(val) {
        return val;
    }
    function initUniPageUrl(path, query) {
        const queryString = query ? stringifyQuery(query, encode2) : "";
        return {
            path: path.slice(1),
            query: queryString ? queryString.slice(1) : queryString
        };
    }
    function initDebugRefresh(isTab, path, query) {
        const queryString = query ? stringifyQuery(query, encode2) : "";
        return {
            isTab,
            arguments: JSON.stringify({
                path: path.slice(1),
                query: queryString ? queryString.slice(1) : queryString
            })
        };
    }
    var downgrade = false;
    var ANI_SHOW = "pop-in";
    var ANI_DURATION = 300;
    var ANI_CLOSE = downgrade ? "slide-out-right" : "pop-out";
    var VIEW_WEBVIEW_PATH = "_www/__uniappview.html";
    var preloadWebview;
    function setPreloadWebview(webview) {
        return preloadWebview = webview;
    }
    function getPreloadWebview() {
        return preloadWebview;
    }
    function createPreloadWebview() {
        if (!preloadWebview || preloadWebview.__uniapp_route) {
            preloadWebview = plus.webview.create(
                VIEW_WEBVIEW_PATH,
                String(genWebviewId()),
                // @ts-expect-error
                { contentAdjust: false }
            );
            if (false) {
                console.log(formatLog("createPreloadWebview", preloadWebview.id));
            }
        }
        return preloadWebview;
    }
    function isDirectPage(page) {
        return __uniConfig.realEntryPagePath && getPage$BasePage(page).route === __uniConfig.entryPagePath;
    }
    function reLaunchEntryPage() {
        __uniConfig.entryPagePath = __uniConfig.realEntryPagePath;
        delete __uniConfig.realEntryPagePath;
        uni.reLaunch({
            url: addLeadingSlash(__uniConfig.entryPagePath)
        });
    }
    function onWebviewResize(webview) {
        const { emit: emit2 } = UniServiceJSBridge;
        const onResize2 = function({ width, height }) {
            const landscape = Math.abs(plus.navigator.getOrientation()) === 90;
            const res = {
                deviceOrientation: landscape ? "landscape" : "portrait",
                size: {
                    windowWidth: Math.ceil(width),
                    windowHeight: Math.ceil(height)
                }
            };
            emit2(ON_RESIZE, res, parseInt(webview.id));
        };
        webview.addEventListener("resize", debounce(onResize2, 50, { setTimeout, clearTimeout }));
    }
    function onWebviewReady(pageId, callback) {
        UniServiceJSBridge.once(ON_WEBVIEW_READY + "." + pageId, callback);
    }
    function closeWebview$1(webview, animationType, animationDuration) {
        webview[webview.__preload__ ? "hide" : "close"](animationType, animationDuration);
    }
    function showWebview(webview, animationType, animationDuration, showCallback, delay) {
        if (typeof delay === "undefined") {
            delay = webview.nvue ? 0 : 100;
        }
        if (false) {
            console.log(formatLog("showWebview", "delay", delay));
        }
        const execShowCallback = function() {
            if (execShowCallback._called) {
                if (false) {
                    console.log(formatLog("execShowCallback", "prevent"));
                }
                return;
            }
            execShowCallback._called = true;
            showCallback && showCallback();
            navigateFinish();
        };
        execShowCallback._called = false;
        setTimeout(() => {
            const timer = setTimeout(() => {
                if (false) {
                    console.log(formatLog("showWebview", "callback", "timer"));
                }
                execShowCallback();
            }, animationDuration + 150);
            webview.show(animationType, animationDuration, () => {
                if (false) {
                    console.log(formatLog("showWebview", "callback"));
                }
                if (!execShowCallback._called) {
                    clearTimeout(timer);
                }
                execShowCallback();
            });
        }, delay);
    }
    var pendingNavigator = false;
    function getPendingNavigator() {
        return pendingNavigator;
    }
    function setPendingNavigator(path, callback, msg2) {
        pendingNavigator = {
            path,
            nvue: getRouteMeta(path).isNVue,
            callback
        };
        if (false) {
            console.log(formatLog("setPendingNavigator", path, msg2));
        }
    }
    function closePage(page, animationType, animationDuration) {
        removePage(page);
        closeWebview$1(page.$getAppWebview(), animationType, animationDuration);
    }
    function pendingNavigate() {
        if (!pendingNavigator) {
            return;
        }
        const { callback } = pendingNavigator;
        if (false) {
            console.log(formatLog("pendingNavigate", pendingNavigator.path));
        }
        pendingNavigator = false;
        return callback();
    }
    function navigateFinish() {
        if (__uniConfig.renderer === "native") {
            if (!pendingNavigator) {
                return;
            }
            if (pendingNavigator.nvue) {
                return pendingNavigate();
            }
            return;
        }
        const preloadWebview2 = createPreloadWebview();
        if (false) {
            console.log(formatLog("navigateFinish", "preloadWebview", preloadWebview2.id));
        }
        if (!pendingNavigator) {
            return;
        }
        if (pendingNavigator.nvue) {
            return pendingNavigate();
        }
        preloadWebview2.loaded ? pendingNavigator.callback() : onWebviewReady(preloadWebview2.id, pendingNavigate);
    }
    function navigate(path, callback, isAppLaunch) {
        const pendingNavigator2 = getPendingNavigator();
        if (!isAppLaunch && pendingNavigator2) {
            return console.error(`Waiting to navigate to: ${pendingNavigator2.path}, do not operate continuously: ${path}.`);
        }
        const preloadWebview2 = getPreloadWebview();
        const waitPreloadWebview = !preloadWebview2 || preloadWebview2 && preloadWebview2.__uniapp_route;
        const waitPreloadWebviewReady = preloadWebview2 && !preloadWebview2.loaded;
        if (waitPreloadWebview || waitPreloadWebviewReady) {
            setPendingNavigator(path, callback, waitPreloadWebview ? "waitForCreate" : "waitForReady");
        } else {
            callback();
        }
        if (waitPreloadWebviewReady) {
            onWebviewReady(preloadWebview2.id, pendingNavigate);
        }
    }
    var UniPageNode = class extends UniNode {
        constructor(pageId, options, setup2 = false) {
            super(NODE_TYPE_PAGE, "#page", null);
            this._id = 1;
            this._created = false;
            this._updating = false;
            this._createActionMap = /* @__PURE__ */ new Map();
            this.updateActions = [];
            this.dicts = [];
            this.nodeId = 0;
            this.pageId = pageId;
            this.pageNode = this;
            this.options = options;
            this.isUnmounted = false;
            this.createAction = [ACTION_TYPE_PAGE_CREATE, options];
            this.createdAction = [ACTION_TYPE_PAGE_CREATED];
            this.normalizeDict = this._normalizeDict.bind(this);
            this._update = this.update.bind(this);
            setup2 && this.setup();
        }
        _normalizeDict(value, normalizeValue = true) {
            if (!isPlainObject(value)) {
                return this.addDict(value);
            }
            const dictArray = [];
            Object.keys(value).forEach((n) => {
                const dict = [this.addDict(n)];
                const v = value[n];
                if (normalizeValue) {
                    dict.push(this.addDict(v));
                } else {
                    dict.push(v);
                }
                dictArray.push(dict);
            });
            return dictArray;
        }
        addDict(value) {
            const { dicts } = this;
            const index2 = dicts.indexOf(value);
            if (index2 > -1) {
                return index2;
            }
            return dicts.push(value) - 1;
        }
        onInjectHook(hook) {
            if ((hook === ON_PAGE_SCROLL || hook === ON_REACH_BOTTOM) && !this.scrollAction) {
                this.scrollAction = [
                    ACTION_TYPE_PAGE_SCROLL,
                    this.options.onReachBottomDistance
                ];
                this.push(this.scrollAction);
            }
        }
        onCreate(thisNode, nodeName) {
            pushCreateAction(this, thisNode.nodeId, nodeName);
            return thisNode;
        }
        onInsertBefore(thisNode, newChild, refChild) {
            pushInsertAction(this, newChild, thisNode.nodeId, refChild && refChild.nodeId || -1);
            return newChild;
        }
        onRemoveChild(oldChild) {
            pushRemoveAction(this, oldChild.nodeId);
            return oldChild;
        }
        onAddEvent(thisNode, name, flag) {
            if (thisNode.parentNode) {
                pushAddEventAction(this, thisNode.nodeId, name, flag);
            }
        }
        onAddWxsEvent(thisNode, name, wxsEvent, flag) {
            if (thisNode.parentNode) {
                pushAddWxsEventAction(this, thisNode.nodeId, name, wxsEvent, flag);
            }
        }
        onRemoveEvent(thisNode, name) {
            if (thisNode.parentNode) {
                pushRemoveEventAction(this, thisNode.nodeId, name);
            }
        }
        onSetAttribute(thisNode, qualifiedName, value) {
            if (thisNode.parentNode) {
                pushSetAttributeAction(this, thisNode.nodeId, qualifiedName, value);
            }
        }
        onRemoveAttribute(thisNode, qualifiedName) {
            if (thisNode.parentNode) {
                pushRemoveAttributeAction(this, thisNode.nodeId, qualifiedName);
            }
        }
        onTextContent(thisNode, text) {
            if (thisNode.parentNode) {
                pushSetTextAction(this, thisNode.nodeId, text);
            }
        }
        onNodeValue(thisNode, val) {
            if (thisNode.parentNode) {
                pushSetTextAction(this, thisNode.nodeId, val);
            }
        }
        genId() {
            return this._id++;
        }
        push(action, extras) {
            if (this.isUnmounted) {
                if (false) {
                    console.log(formatLog("PageNode", "push.prevent", action));
                }
                return;
            }
            switch (action[0]) {
                case ACTION_TYPE_CREATE:
                    this._createActionMap.set(action[1], action);
                    break;
                case ACTION_TYPE_INSERT:
                    const createAction = this._createActionMap.get(action[1]);
                    if (createAction) {
                        createAction[3] = action[2];
                        createAction[4] = action[3];
                        if (extras) {
                            createAction[5] = extras;
                        }
                    } else {
                        if (extras) {
                            action[4] = extras;
                        }
                        this.updateActions.push(action);
                    }
                    break;
            }
            if (action[0] !== ACTION_TYPE_INSERT) {
                this.updateActions.push(action);
            }
            if (!this._updating) {
                this._updating = true;
                queuePostFlushCb(this._update);
            }
        }
        restore() {
            this.clear();
            this.setup();
            if (this.scrollAction) {
                this.push(this.scrollAction);
            }
            const restoreNode = (node) => {
                this.onCreate(node, node.nodeName);
                this.onInsertBefore(node.parentNode, node, null);
                node.childNodes.forEach((childNode) => {
                    restoreNode(childNode);
                });
            };
            this.childNodes.forEach((childNode) => restoreNode(childNode));
            this.push(this.createdAction);
        }
        setup() {
            this.send([this.createAction]);
        }
        update() {
            const { dicts, updateActions, _createActionMap } = this;
            if (false) {
                console.log(formatLog("PageNode", "update", updateActions.length, _createActionMap.size));
            }
            if (!this._created) {
                this._created = true;
                updateActions.push(this.createdAction);
            }
            if (updateActions.length) {
                if (dicts.length) {
                    updateActions.unshift([ACTION_TYPE_DICT, dicts]);
                }
                this.send(updateActions);
            }
            this.clear();
        }
        clear() {
            this.dicts.length = 0;
            this.updateActions.length = 0;
            this._updating = false;
            this._createActionMap.clear();
        }
        send(action) {
            UniServiceJSBridge.publishHandler(VD_SYNC, action, this.pageId);
        }
        fireEvent(id2, evt) {
            const node = findNodeById(id2, this);
            if (node) {
                node.dispatchEvent(evt);
            } else if (false) {
                console.error(formatLog("PageNode", "fireEvent", id2, "not found", evt));
            }
        }
    };
    function getPageNode(pageId) {
        const page = getPageById(pageId);
        if (!page)
            return null;
        return page.__page_container__;
    }
    function findNode(name, value, uniNode) {
        if (typeof uniNode === "number") {
            uniNode = getPageNode(uniNode);
        }
        if (uniNode[name] === value) {
            return uniNode;
        }
        const { childNodes } = uniNode;
        for (let i = 0; i < childNodes.length; i++) {
            const uniNode2 = findNode(name, value, childNodes[i]);
            if (uniNode2) {
                return uniNode2;
            }
        }
        return null;
    }
    function findNodeById(nodeId, uniNode) {
        return findNode("nodeId", nodeId, uniNode);
    }
    function findNodeByTagName(tagName, uniNode) {
        return findNode("nodeName", tagName.toUpperCase(), uniNode);
    }
    function pushCreateAction(pageNode, nodeId, nodeName) {
        pageNode.push([
            ACTION_TYPE_CREATE,
            nodeId,
            pageNode.addDict(nodeName),
            -1,
            -1
        ]);
    }
    function pushInsertAction(pageNode, newChild, parentNodeId, refChildId) {
        const nodeJson = newChild.toJSON({
            attr: true,
            normalize: pageNode.normalizeDict
        });
        pageNode.push([ACTION_TYPE_INSERT, newChild.nodeId, parentNodeId, refChildId], Object.keys(nodeJson).length ? nodeJson : void 0);
    }
    function pushRemoveAction(pageNode, nodeId) {
        pageNode.push([ACTION_TYPE_REMOVE, nodeId]);
    }
    function pushAddEventAction(pageNode, nodeId, name, value) {
        pageNode.push([ACTION_TYPE_ADD_EVENT, nodeId, pageNode.addDict(name), value]);
    }
    function pushAddWxsEventAction(pageNode, nodeId, name, wxsEvent, value) {
        pageNode.push([
            ACTION_TYPE_ADD_WXS_EVENT,
            nodeId,
            pageNode.addDict(name),
            pageNode.addDict(wxsEvent),
            value
        ]);
    }
    function pushRemoveEventAction(pageNode, nodeId, name) {
        pageNode.push([ACTION_TYPE_REMOVE_EVENT, nodeId, pageNode.addDict(name)]);
    }
    function normalizeAttrValue(pageNode, name, value) {
        return name === "style" && isPlainObject(value) ? pageNode.normalizeDict(value) : pageNode.addDict(value);
    }
    function pushSetAttributeAction(pageNode, nodeId, name, value) {
        pageNode.push([
            ACTION_TYPE_SET_ATTRIBUTE,
            nodeId,
            pageNode.addDict(name),
            normalizeAttrValue(pageNode, name, value)
        ]);
    }
    function pushRemoveAttributeAction(pageNode, nodeId, name) {
        pageNode.push([ACTION_TYPE_REMOVE_ATTRIBUTE, nodeId, pageNode.addDict(name)]);
    }
    function pushSetTextAction(pageNode, nodeId, text) {
        pageNode.push([ACTION_TYPE_SET_TEXT, nodeId, pageNode.addDict(text)]);
    }
    function createPageNode(pageId, pageOptions, setup2) {
        return new UniPageNode(pageId, pageOptions, setup2);
    }
    function setupPage(component) {
        const oldSetup = component.setup;
        component.inheritAttrs = false;
        component.setup = (props, ctx) => {
            const { attrs: {
                __pageId,
                __pagePath,
                /*__pageQuery,*/
                __pageInstance
            } } = ctx;
            if (false) {
                console.log(formatLog(__pagePath, "setup"));
            }
            const instance = getCurrentInstance();
            const pageVm = instance.proxy;
            initPageVm(pageVm, __pageInstance);
            {
                addCurrentPageWithInitScope(__pageId, pageVm, __pageInstance);
                onMounted(() => {
                    nextTick(() => {
                        invokeHook(pageVm, ON_READY);
                    });
                });
                onBeforeUnmount(() => {
                    invokeHook(pageVm, ON_UNLOAD);
                });
            }
            if (oldSetup) {
                return oldSetup(props, ctx);
            }
        };
        return component;
    }
    function initScope(pageId, vm, pageInstance) {
        {
            const $getAppWebview = () => {
                return plus.webview.getWebviewById(pageId + "");
            };
            vm.$getAppWebview = $getAppWebview;
            vm.$.ctx.$scope = {
                $getAppWebview
            };
        }
        vm.getOpenerEventChannel = () => {
            if (!pageInstance.eventChannel) {
                pageInstance.eventChannel = new EventChannel(pageId);
            }
            return pageInstance.eventChannel;
        };
        return vm;
    }
    function addCurrentPageWithInitScope(pageId, pageVm, pageInstance) {
        addCurrentPage(initScope(pageId, pageVm, pageInstance));
    }
    function isVuePageAsyncComponent(component) {
        return isFunction(component);
    }
    var pagesMap = /* @__PURE__ */ new Map();
    function definePage(pagePath, asyncComponent) {
        pagesMap.set(pagePath, once(createFactory(asyncComponent)));
    }
    function createVuePage(__pageId, __pagePath, __pageQuery, __pageInstance, pageOptions) {
        const pageNode = createPageNode(__pageId, pageOptions, true);
        const app = getVueApp();
        const component = pagesMap.get(__pagePath)();
        const mountPage = (component2) => app.mountPage(component2, extend({
            __pageId,
            __pagePath,
            __pageQuery,
            __pageInstance
        }, __pageQuery), pageNode);
        if (isPromise(component)) {
            return component.then((component2) => mountPage(component2));
        }
        return mountPage(component);
    }
    function createFactory(component) {
        return () => {
            if (isVuePageAsyncComponent(component)) {
                return component().then((component2) => setupPage(component2));
            }
            return setupPage(component);
        };
    }
    function initRouteOptions(path, openType) {
        const routeOptions = JSON.parse(JSON.stringify(getRouteOptions(path)));
        routeOptions.meta = initRouteMeta(routeOptions.meta);
        if (openType !== "preloadPage" && !__uniConfig.realEntryPagePath && (openType === "reLaunch" || getCurrentPages().length === 0)) {
            routeOptions.meta.isQuit = true;
        } else if (!routeOptions.meta.isTabBar) {
            routeOptions.meta.isQuit = false;
        }
        return routeOptions;
    }
    function initWebviewStyle(webview, path, query, routeMeta) {
        const getWebviewStyle = () => parseWebviewStyle(path, routeMeta, webview);
        const webviewStyle = getWebviewStyle();
        webviewStyle.uniPageUrl = initUniPageUrl(path, query);
        const isTabBar = !!routeMeta.isTabBar;
        webviewStyle.debugRefresh = initDebugRefresh(isTabBar, path, query);
        webviewStyle.locale = weex.requireModule("plus").getLanguage();
        if (false) {
            console.log(formatLog("updateWebview", webviewStyle));
        }
        webview.setStyle(webviewStyle);
    }
    var WEBVIEW_LISTENERS = {
        pullToRefresh: ON_PULL_DOWN_REFRESH
    };
    function initWebviewEvent(webview) {
        const id2 = parseInt(webview.id);
        Object.keys(WEBVIEW_LISTENERS).forEach((name) => {
            const hook = WEBVIEW_LISTENERS[name];
            webview.addEventListener(name, (e) => {
                invokeHook(id2, hook, e);
            });
        });
        onWebviewResize(webview);
    }
    function initWebview(webview, path, query, routeMeta) {
        initWebviewStyle(webview, path, query, routeMeta);
        initWebviewEvent(webview);
    }
    function createWebview(options) {
        if (getWebviewId() === 2) {
            return plus.webview.getLaunchWebview();
        }
        return getPreloadWebview();
    }
    function getStatusbarHeight() {
        return plus.navigator.getSafeAreaInsets().top;
    }
    var lastStatusBarStyle;
    function setStatusBarStyle(statusBarStyle) {
        if (!statusBarStyle) {
            const page = getCurrentPage();
            if (!page) {
                return;
            }
            statusBarStyle = page.$page.statusBarStyle;
            if (!statusBarStyle || statusBarStyle === lastStatusBarStyle) {
                return;
            }
        }
        if (statusBarStyle === lastStatusBarStyle) {
            return;
        }
        if (false) {
            console.log(formatLog("setStatusBarStyle", statusBarStyle));
        }
        lastStatusBarStyle = statusBarStyle;
        plus.navigator.setStatusBarStyle(statusBarStyle);
    }
    function registerPage({ url, path, query, openType, webview, nvuePageVm, eventChannel }) {
        const routeOptions = initRouteOptions(path, openType);
        if (!webview) {
            webview = createWebview();
        } else {
            webview = plus.webview.getWebviewById(webview.id);
            webview.nvue = routeOptions.meta.isNVue;
        }
        routeOptions.meta.id = parseInt(webview.id);
        const isTabBar = !!routeOptions.meta.isTabBar;
        if (isTabBar) {
            tabBarInstance.append(webview);
        }
        if (false) {
            console.log(formatLog("registerPage", path, webview.id));
        }
        initWebview(webview, path, query, routeOptions.meta);
        const route = path.slice(1);
        webview.__uniapp_route = route;
        const pageInstance = initPageInternalInstance(
            openType,
            url,
            query,
            routeOptions.meta,
            eventChannel,
            // TODO theme
            "light"
        );
        const id2 = parseInt(webview.id);
        createVuePage(id2, route, query, pageInstance, initPageOptions(routeOptions));
        return webview;
    }
    function initPageOptions({ meta }) {
        const statusbarHeight = getStatusbarHeight();
        const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
        return {
            css: true,
            route: meta.route,
            version: 1,
            locale: "",
            platform,
            pixelRatio,
            windowWidth,
            disableScroll: meta.disableScroll === true,
            onPageScroll: false,
            onPageReachBottom: false,
            onReachBottomDistance: hasOwn(meta, "onReachBottomDistance") ? meta.onReachBottomDistance : ON_REACH_BOTTOM_DISTANCE,
            statusbarHeight,
            // TODO meta.navigationBar.type === 'float'
            windowTop: 0,
            // TODO tabBar.cover
            windowBottom: 0,
            nvueFlexDirection: meta.isNVueStyle && __uniConfig.nvue ? __uniConfig.nvue["flex-direction"] : void 0
        };
    }
    var isInitEntryPage = false;
    function initEntry() {
        if (isInitEntryPage) {
            return;
        }
        isInitEntryPage = true;
        let entryPagePath;
        let entryPageQuery;
        const weexPlus = weex.requireModule("plus");
        if (weexPlus.getRedirectInfo) {
            const { path, query, referrerInfo } = parseRedirectInfo();
            if (path) {
                entryPagePath = path;
                entryPageQuery = query;
            }
            __uniConfig.referrerInfo = referrerInfo;
        } else {
            const argsJsonStr = plus.runtime.arguments;
            if (!argsJsonStr) {
                return;
            }
            try {
                const args = JSON.parse(argsJsonStr);
                entryPagePath = args.path || args.pathName;
                entryPageQuery = args.query ? "?" + args.query : "";
            } catch (e) {
            }
        }
        if (!entryPagePath || entryPagePath === __uniConfig.entryPagePath) {
            if (entryPageQuery) {
                __uniConfig.entryPageQuery = entryPageQuery;
            }
            return;
        }
        const entryRoute = addLeadingSlash(entryPagePath);
        const routeOptions = getRouteOptions(entryRoute);
        if (!routeOptions) {
            return;
        }
        if (!routeOptions.meta.isTabBar) {
            __uniConfig.realEntryPagePath = __uniConfig.realEntryPagePath || __uniConfig.entryPagePath;
        }
        __uniConfig.entryPagePath = entryPagePath;
        __uniConfig.entryPageQuery = entryPageQuery;
    }
    function initAnimation(path, animationType, animationDuration) {
        const { globalStyle } = __uniConfig;
        const meta = getRouteMeta(path);
        return [
            animationType || meta.animationType || globalStyle.animationType || ANI_SHOW,
            animationDuration || meta.animationDuration || globalStyle.animationDuration || ANI_DURATION
        ];
    }
    var $navigateTo = (args, { resolve: resolve2, reject }) => {
        const { url, events, animationType, animationDuration } = args;
        const { path, query } = parseUrl(url);
        const [aniType, aniDuration] = initAnimation(path, animationType, animationDuration);
        navigate(path, () => {
            _navigateTo({
                url,
                path,
                query,
                events,
                aniType,
                aniDuration
            }).then(resolve2).catch(reject);
        }, args.openType === "appLaunch");
    };
    var navigateTo = defineAsyncApi(API_NAVIGATE_TO, $navigateTo, NavigateToProtocol, NavigateToOptions);
    function _navigateTo({ url, path, query, events, aniType, aniDuration }) {
        invokeHook(ON_HIDE);
        invokeHook(ON_HIDE);
        const eventChannel = new EventChannel(getWebviewId() + 1, events);
        return new Promise((resolve2) => {
            showWebview(registerPage({ url, path, query, openType: "navigateTo", eventChannel }), aniType, aniDuration, () => {
                resolve2({ eventChannel });
            }, 0);
            setStatusBarStyle();
        });
    }
    function closeWebview(webview, animationType, animationDuration) {
        if (webview.__preload__) {
            webview.hide(animationType, animationDuration);
        } else {
            webview.close(animationType, animationDuration);
        }
    }
    function backWebview(webview, callback) {
        const children = webview.children();
        if (!children || !children.length) {
            return callback();
        }
        const childWebview = children[0];
        childWebview.canBack(({ canBack }) => {
            if (canBack) {
                childWebview.back();
            } else {
                callback();
            }
        });
    }
    var navigateBack = defineAsyncApi(API_NAVIGATE_BACK, (args, { resolve: resolve2, reject }) => {
        const page = getCurrentPage();
        if (!page) {
            return reject(`getCurrentPages is empty`);
        }
        const from = args.from || "navigateBack";
        if (invokeHook(page, ON_BACK_PRESS, {
            from
        })) {
            return resolve2();
        }
        if (uni.hideLoading) {
            uni.hideLoading();
        }
        if (page.$page.meta.isQuit) {
            quit();
        } else if (isDirectPage(page)) {
            reLaunchEntryPage();
        } else {
            const { delta, animationType, animationDuration } = args;
            back(delta, animationType, animationDuration, from);
        }
        return resolve2();
    }, NavigateBackProtocol, NavigateBackOptions);
    var firstBackTime = 0;
    function quit() {
        initI18nAppMsgsOnce();
        if (!firstBackTime) {
            firstBackTime = Date.now();
            plus.nativeUI.toast(useI18n().t("uni.app.quit"));
            setTimeout(() => {
                firstBackTime = 0;
            }, 2e3);
        } else if (Date.now() - firstBackTime < 2e3) {
            plus.runtime.quit();
        }
    }
    function back(delta, animationType, animationDuration, from) {
        const pages2 = getCurrentPages();
        const len = pages2.length;
        const currentPage = pages2[len - 1];
        if (delta > 1) {
            pages2.slice(len - delta, len - 1).reverse().forEach((deltaPage) => {
                closeWebview(plus.webview.getWebviewById(deltaPage.$page.id + ""), "none", 0);
            });
        }
        const backPage = function(webview2) {
            if (animationType) {
                closeWebview(webview2, animationType, animationDuration || ANI_DURATION);
            } else {
                if (currentPage.$page.openType === "redirectTo") {
                    closeWebview(webview2, ANI_CLOSE, ANI_DURATION);
                } else {
                    closeWebview(webview2, "auto");
                }
            }
            pages2.slice(len - delta, len).forEach((page) => removePage(page));
            setStatusBarStyle();
            invokeHook(ON_SHOW);
        };
        const webview = plus.webview.getWebviewById(currentPage.$page.id + "");
        if (!currentPage.__uniapp_webview || from === "navigateBack") {
            return backPage(webview);
        }
        backWebview(webview, () => {
            backPage(webview);
        });
    }
    var redirectTo = defineAsyncApi(API_REDIRECT_TO, ({ url }, { resolve: resolve2, reject }) => {
        const { path, query } = parseUrl(url);
        navigate(path, () => {
            _redirectTo({
                url,
                path,
                query
            }).then(resolve2).catch(reject);
        }, false);
    }, RedirectToProtocol, RedirectToOptions);
    function _redirectTo({ url, path, query }) {
        const lastPage = getCurrentPage();
        lastPage && removePage(lastPage);
        return new Promise((resolve2) => {
            showWebview(registerPage({
                url,
                path,
                query,
                openType: "redirectTo"
            }), "none", 0, () => {
                if (lastPage) {
                    const webview = lastPage.$getAppWebview();
                    webview.close("none");
                }
                resolve2(void 0);
            });
            setStatusBarStyle();
        });
    }
    var $reLaunch = ({ url }, { resolve: resolve2, reject }) => {
        const { path, query } = parseUrl(url);
        navigate(path, () => {
            _reLaunch({
                url,
                path,
                query
            }).then(resolve2).catch(reject);
        }, false);
    };
    function _reLaunch({ url, path, query }) {
        return new Promise((resolve2) => {
            const pages2 = getAllPages().slice(0);
            const routeOptions = __uniRoutes.find((route) => route.path === path);
            if (routeOptions.meta.isTabBar) {
                tabBarInstance.switchTab(path.slice(1));
            }
            showWebview(registerPage({
                url,
                path,
                query,
                openType: "reLaunch"
            }), "none", 0, () => {
                pages2.forEach((page) => closePage(page, "none"));
                resolve2(void 0);
            });
            setStatusBarStyle();
        });
    }
    var reLaunch = defineAsyncApi(API_RE_LAUNCH, $reLaunch, ReLaunchProtocol, ReLaunchOptions);
    var $switchTab = (args, { resolve: resolve2, reject }) => {
        const { url } = args;
        const { path, query } = parseUrl(url);
        navigate(path, () => {
            _switchTab({
                url,
                path,
                query
            }).then(resolve2).catch(reject);
        }, args.openType === "appLaunch");
    };
    var switchTab = defineAsyncApi(API_SWITCH_TAB, $switchTab, SwitchTabProtocol, SwitchTabOptions);
    function _switchTab({ url, path, query }) {
        tabBarInstance.switchTab(path.slice(1));
        const pages2 = getCurrentPages();
        const len = pages2.length;
        let callOnHide = false;
        let callOnShow = false;
        let currentPage;
        if (len >= 1) {
            currentPage = pages2[len - 1];
            if (currentPage && !currentPage.$.__isTabBar) {
                callOnShow = true;
                pages2.reverse().forEach((page) => {
                    if (!page.$.__isTabBar && page !== currentPage) {
                        closePage(page, "none");
                    }
                });
                removePage(currentPage);
                if (currentPage.$page.openType === "redirectTo") {
                    closeWebview$1(currentPage.$getAppWebview(), ANI_CLOSE, ANI_DURATION);
                } else {
                    closeWebview$1(currentPage.$getAppWebview(), "auto");
                }
            } else {
                callOnHide = true;
            }
        }
        let tabBarPage;
        getAllPages().forEach((page) => {
            if (addLeadingSlash(page.route) === path) {
                if (!page.$.__isActive) {
                    callOnShow = true;
                }
                page.$.__isActive = true;
                tabBarPage = page;
            } else {
                if (page.$.__isTabBar) {
                    page.$.__isActive = false;
                }
            }
        });
        if (currentPage === tabBarPage) {
            callOnHide = false;
        }
        if (currentPage && callOnHide) {
            invokeHook(currentPage, ON_HIDE);
        }
        return new Promise((resolve2) => {
            if (tabBarPage) {
                const webview = tabBarPage.$getAppWebview();
                webview.show("none");
                if (callOnShow && !webview.__preload__) {
                    invokeHook(tabBarPage, ON_SHOW);
                }
                setStatusBarStyle();
                resolve2(void 0);
            } else {
                showWebview(registerPage({
                    url,
                    path,
                    query,
                    openType: "switchTab"
                }), "none", 0, () => {
                    setStatusBarStyle();
                    resolve2(void 0);
                }, 70);
            }
        });
    }
    var LocationPickerPage = {
        data() {
            return {
                keyword: "",
                latitude: 0,
                longitude: 0,
                loaded: false,
                channel: void 0,
                closed: false
            };
        },
        onLoad(e) {
            this.latitude = e.latitude;
            this.longitude = e.longitude;
            this.keyword = e.keyword;
            this.loaded = true;
            this.channel = this.getOpenerEventChannel();
        },
        onUnload() {
            if (this.closed) {
                return;
            }
            this.channel.emit("close", {});
        },
        methods: {
            onClose(e) {
                this.closed = true;
                this.channel.emit("close", e.detail);
                uni.navigateBack();
            }
        },
        render: function(_ctx, _cache, $props, $setup, $data, $options) {
            return $data.loaded ? (openBlock(), createElementBlock("location-picker", {
                key: 0,
                style: { width: "100%", height: "100%" },
                latitude: $data.latitude,
                longitude: $data.longitude,
                keyword: $data.keyword,
                onClose: _cache[0] || (_cache[0] = (...args) => $options.onClose && $options.onClose(...args))
            }, null, 40, ["latitude", "longitude", "keyword"])) : createCommentVNode("v-if", true);
        }
    };
    var ROUTE_LOCATION_PICKER_PAGE = "__uniappchooselocation";
    var initLocationPickerPageOnce = once(() => {
        definePage(ROUTE_LOCATION_PICKER_PAGE, LocationPickerPage);
        __uniRoutes.push({
            meta: {
                navigationBar: {
                    style: "custom"
                },
                isNVue: false,
                route: ROUTE_LOCATION_PICKER_PAGE
            },
            path: "/" + ROUTE_LOCATION_PICKER_PAGE
        });
    });
    var chooseLocation = defineAsyncApi(API_CHOOSE_LOCATION, (args, { resolve: resolve2, reject }) => {
        initLocationPickerPageOnce();
        const { keyword = "", latitude = "", longitude = "" } = args;
        uni.navigateTo({
            url: "/" + ROUTE_LOCATION_PICKER_PAGE + "?keyword=" + keyword + "&latitude=" + latitude + "&longitude=" + longitude,
            events: {
                close: (res) => {
                    if (res && res.latitude) {
                        resolve2(res);
                    } else {
                        reject("cancel");
                    }
                }
            },
            fail: (err2) => {
                reject(err2.errMsg || "cancel");
            }
        });
    }, ChooseLocationProtocol);
    var LocationViewPage = {
        data() {
            return {
                latitude: 0,
                longitude: 0,
                name: "",
                loaded: false,
                showNav: false
            };
        },
        onLoad(e) {
            this.latitude = e.latitude;
            this.longitude = e.longitude;
            this.name = e.name;
            this.loaded = true;
        },
        onBackPress() {
            if (this.showNav) {
                this.showNav = false;
                return true;
            }
        },
        methods: {
            onClose(e) {
                uni.navigateBack();
            },
            onNavChange(event) {
                this.showNav = event.detail.showNav;
            }
        },
        render: function(_ctx, _cache, $props, $setup, $data, $options) {
            return $data.loaded ? (openBlock(), createElementBlock("location-view", {
                key: 0,
                style: { width: "100%", height: "100%" },
                latitude: $data.latitude,
                longitude: $data.longitude,
                showNav: $data.showNav,
                name: $data.name,
                onClose: _cache[0] || (_cache[0] = (...args) => $options.onClose && $options.onClose(...args)),
                onNavChange: _cache[1] || (_cache[1] = (...args) => $options.onNavChange && $options.onNavChange(...args))
            }, null, 40, ["latitude", "longitude", "showNav"])) : createCommentVNode("v-if", true);
        }
    };
    var ROUTE_LOCATION_VIEW_PAGE = "__uniappopenlocation";
    var initLocationViewPageOnce = once(() => {
        definePage(ROUTE_LOCATION_VIEW_PAGE, LocationViewPage);
        __uniRoutes.push({
            meta: {
                navigationBar: {
                    style: "custom"
                },
                isNVue: false,
                route: ROUTE_LOCATION_VIEW_PAGE
            },
            path: "/" + ROUTE_LOCATION_VIEW_PAGE
        });
    });
    var openLocation = defineAsyncApi(API_OPEN_LOCATION, (args, { resolve: resolve2, reject }) => {
        initLocationViewPageOnce();
        const { latitude = "", longitude = "", name = "" } = args;
        uni.navigateTo({
            url: "/" + ROUTE_LOCATION_VIEW_PAGE + "?latitude=" + latitude + "&longitude=" + longitude + "&name=" + name,
            success: (res) => {
                resolve2();
            },
            fail: (err2) => {
                reject(err2.errMsg || "cancel");
            }
        });
    }, OpenLocationProtocol, OpenLocationOptions);
    function getLocationSuccess(type, position, resolve2) {
        const coords = position.coords;
        resolve2({
            type,
            altitude: coords.altitude || 0,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
            accuracy: coords.accuracy,
            address: position.address,
            errMsg: "getLocation:ok"
        });
    }
    var getLocation = defineAsyncApi(API_GET_LOCATION, ({ type = "wgs84", geocode = false, altitude = false, highAccuracyExpireTime, isHighAccuracy = false }, { resolve: resolve2, reject }) => {
        plus.geolocation.getCurrentPosition((position) => {
            getLocationSuccess(type, position, resolve2);
        }, (e) => {
            if (e.code === 1501) {
                getLocationSuccess(type, e, resolve2);
                return;
            }
            reject("getLocation:fail " + e.message);
        }, {
            geocode,
            enableHighAccuracy: isHighAccuracy || altitude,
            timeout: highAccuracyExpireTime,
            coordsType: type
        });
    }, GetLocationProtocol, GetLocationOptions);
    function subscribeGetLocation() {
        registerServiceMethod(API_GET_LOCATION, (args, resolve2) => {
            getLocation({
                type: args.type,
                altitude: args.altitude,
                highAccuracyExpireTime: args.highAccuracyExpireTime,
                isHighAccuracy: args.isHighAccuracy,
                success(res) {
                    resolve2({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        speed: res.speed,
                        accuracy: res.accuracy,
                        altitude: res.altitude,
                        verticalAccuracy: res.verticalAccuracy,
                        horizontalAccuracy: res.horizontalAccuracy
                    });
                },
                fail(err2) {
                    resolve2({
                        errMsg: err2.errMsg || "getLocation:fail"
                    });
                }
            });
        });
    }
    var started = false;
    var watchId = 0;
    var startLocationUpdate = defineAsyncApi(API_START_LOCATION_UPDATE, (options, { resolve: resolve2, reject }) => {
        watchId = watchId || plus.geolocation.watchPosition((res) => {
            started = true;
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE, res.coords);
        }, (error) => {
            if (!started) {
                reject(error.message);
                started = true;
            }
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE_ERROR, {
                errMsg: `onLocationChange:fail ${error.message}`
            });
        }, {
            coordsType: options?.type,
            enableHighAccuracy: true
        });
        setTimeout(resolve2, 100);
    }, StartLocationUpdateProtocol, StartLocationUpdateOptions);
    var startLocationUpdateBackground = defineAsyncApi("startLocationUpdateBackground", (options, { resolve: resolve2, reject }) => {
        watchId = watchId || plus.geolocation.watchPosition((res) => {
            started = true;
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE, res.coords);
        }, (error) => {
            if (!started) {
                reject(error.message);
                started = true;
            }
            UniServiceJSBridge.invokeOnCallback(API_ON_LOCATION_CHANGE_ERROR, {
                errMsg: `onLocationChange:fail ${error.message}`
            });
        }, {
            coordsType: options?.type,
            enableHighAccuracy: true,
            // @ts-expect-error 增加background参数
            background: true
        });
        setTimeout(resolve2, 100);
    });
    var stopLocationUpdate = defineAsyncApi(API_STOP_LOCATION_UPDATE, (_, { resolve: resolve2 }) => {
        if (watchId) {
            plus.geolocation.clearWatch(watchId);
            started = false;
            watchId = 0;
        }
        resolve2();
    });
    var onLocationChange = defineOnApi(API_ON_LOCATION_CHANGE, () => {
    });
    var offLocationChange = defineOffApi(API_OFF_LOCATION_CHANGE, () => {
    });
    var onLocationChangeError = defineOnApi(API_ON_LOCATION_CHANGE_ERROR, () => {
    });
    var offLocationChangeError = defineOffApi(API_OFF_LOCATION_CHANGE_ERROR, () => {
    });
    function operateWebView(id2, pageId, type, data, operateMapCallback2) {
        UniServiceJSBridge.invokeViewMethod("webview." + id2, {
            type,
            data
        }, pageId, operateMapCallback2);
    }
    function createWebviewContext(id2, componentInstance) {
        const pageId = getPageIdByVm(componentInstance);
        if (pageId) {
            return {
                evalJS(jsCode) {
                    operateWebView(id2, pageId, "evalJS", {
                        jsCode
                    });
                },
                evalJs(jsCode) {
                    console.warn("The method evalJs is deprecated, please use evalJS instead");
                    operateWebView(id2, pageId, "evalJS", {
                        jsCode
                    });
                },
                back() {
                    operateWebView(id2, pageId, "back");
                },
                forward() {
                    operateWebView(id2, pageId, "forward");
                },
                reload() {
                    operateWebView(id2, pageId, "reload");
                },
                stop() {
                    operateWebView(id2, pageId, "stop");
                }
            };
        } else {
            UniServiceJSBridge.emit(ON_ERROR, "createWebviewContext:fail");
        }
    }
    var pageScrollTo = defineAsyncApi(API_PAGE_SCROLL_TO, (options, { resolve: resolve2 }) => {
        const pageId = getPageIdByVm(getCurrentPageVm());
        UniServiceJSBridge.invokeViewMethod(API_PAGE_SCROLL_TO, options, pageId, resolve2);
    }, PageScrollToProtocol, PageScrollToOptions);
    var uni$1 = {
        __proto__: null,
        $emit,
        $off,
        $on,
        $once,
        addInterceptor,
        arrayBufferToBase64,
        base64ToArrayBuffer,
        canIUse,
        canvasGetImageData,
        canvasPutImageData,
        canvasToTempFilePath,
        chooseLocation,
        createAnimation,
        createCanvasContext,
        createIntersectionObserver,
        createMapContext,
        createMediaQueryObserver,
        createSelectorQuery,
        createVideoContext,
        createWebviewContext,
        getEnterOptionsSync,
        getLaunchOptionsSync,
        getLocale,
        getLocation,
        getSelectedTextRange,
        hideNavigationBarLoading,
        hideTabBar,
        hideTabBarRedDot,
        interceptors,
        loadFontFace,
        navigateBack,
        navigateTo,
        offAppHide,
        offAppShow,
        offError,
        offKeyboardHeightChange,
        offLocationChange,
        offLocationChangeError,
        offPageNotFound,
        offUnhandledRejection,
        offWindowResize,
        onAppHide,
        onAppShow,
        onCreateVueApp,
        onError,
        onKeyboardHeightChange,
        onLocaleChange,
        onLocationChange,
        onLocationChangeError,
        onPageNotFound,
        onTabBarMidButtonTap,
        onUnhandledRejection,
        onWindowResize,
        openLocation,
        pageScrollTo,
        reLaunch,
        redirectTo,
        removeInterceptor,
        removeTabBarBadge,
        setBackgroundColor,
        setBackgroundTextStyle,
        setLocale,
        setNavigationBarColor,
        setNavigationBarTitle,
        setPageMeta,
        setTabBarBadge,
        setTabBarItem,
        setTabBarStyle,
        showNavigationBarLoading,
        showTabBar,
        showTabBarRedDot,
        startLocationUpdate,
        startLocationUpdateBackground,
        stopLocationUpdate,
        switchTab,
        upx2px
    };
    var UniServiceJSBridge$1 = /* @__PURE__ */ extend(ServiceJSBridge, {
        publishHandler
    });
    function publishHandler(event, args, pageIds) {
        args = JSON.stringify(args);
        if (false) {
            console.log(formatLog("publishHandler", event, args, pageIds));
        }
        if (!isArray(pageIds)) {
            pageIds = [pageIds];
        }
        const evalJSCode = `typeof UniViewJSBridge !== 'undefined' && UniViewJSBridge.subscribeHandler("${event}",${args},__PAGE_ID__)`;
        if (false) {
            console.log(formatLog("publishHandler", "size", evalJSCode.length));
        }
        pageIds.forEach((id2) => {
            const idStr = String(id2);
            const webview = plus.webview.getWebviewById(idStr);
            const code = evalJSCode.replace("__PAGE_ID__", idStr);
            webview && webview.evalJS(code);
        });
    }
    var focusTimeout = 0;
    var keyboardHeight = 0;
    var focusTimer = null;
    function hookKeyboardEvent(event, callback) {
        if (focusTimer) {
            clearTimeout(focusTimer);
            focusTimer = null;
        }
        if (event.type === "onFocus") {
            {
                focusTimer = setTimeout(function() {
                    event.detail.height = keyboardHeight;
                    callback(event);
                }, focusTimeout);
                return;
            }
        }
        callback(event);
    }
    function onNodeEvent(nodeId, evt, pageNode) {
        const type = evt.type;
        if (type === "onFocus" || type === "onBlur") {
            hookKeyboardEvent(evt, (evt2) => {
                pageNode.fireEvent(nodeId, evt2);
            });
        } else {
            pageNode.fireEvent(nodeId, evt);
        }
    }
    function onVdSync(actions, pageId) {
        const page = getPageById(parseInt(pageId));
        if (!page) {
            if (false) {
                console.error(formatLog("onVdSync", "page", pageId, "not found"));
            }
            return;
        }
        const pageNode = page.__page_container__;
        actions.forEach((action) => {
            switch (action[0]) {
                case ACTION_TYPE_EVENT:
                    onNodeEvent(action[1], action[2], pageNode);
                    break;
            }
        });
    }
    function subscribePlusMessage({ data }) {
        if (false) {
            console.log(formatLog("plusMessage", data));
        }
        if (data && data.type) {
            UniServiceJSBridge.subscribeHandler("plusMessage." + data.type, data.args);
        }
    }
    function onPlusMessage(type, callback, once2 = false) {
        UniServiceJSBridge.subscribe("plusMessage." + type, callback, once2);
    }
    var API_ROUTE = [
        "switchTab",
        "reLaunch",
        "redirectTo",
        "navigateTo",
        "navigateBack"
    ];
    function subscribeNavigator() {
        API_ROUTE.forEach((name) => {
            registerServiceMethod(name, (args) => {
                uni[name](extend(args, {
                    fail(res) {
                        console.error(res.errMsg);
                    }
                }));
            });
        });
    }
    var isLaunchWebviewReady = false;
    function subscribeWebviewReady(_data, pageId) {
        const isLaunchWebview = pageId === "1";
        if (isLaunchWebview && isLaunchWebviewReady) {
            if (false) {
                console.log("[uni-app] onLaunchWebviewReady.prevent");
            }
            return;
        }
        let preloadWebview2 = getPreloadWebview();
        if (isLaunchWebview) {
            isLaunchWebviewReady = true;
            preloadWebview2 = setPreloadWebview(plus.webview.getLaunchWebview());
        } else if (!preloadWebview2) {
            preloadWebview2 = setPreloadWebview(plus.webview.getWebviewById(pageId));
        }
        if (!preloadWebview2.loaded) {
            if (preloadWebview2.id !== pageId) {
                return console.error(`webviewReady[${preloadWebview2.id}][${pageId}] not match`);
            }
            preloadWebview2.loaded = true;
        }
        UniServiceJSBridge.emit(ON_WEBVIEW_READY + "." + pageId);
        isLaunchWebview && onLaunchWebviewReady();
    }
    function onLaunchWebviewReady() {
        const entryPagePath = addLeadingSlash(__uniConfig.entryPagePath);
        const routeOptions = getRouteOptions(entryPagePath);
        const args = {
            url: entryPagePath + (__uniConfig.entryPageQuery || ""),
            openType: "appLaunch"
        };
        const handler = { resolve() {
        }, reject() {
        } };
        if (routeOptions.meta.isTabBar) {
            return $switchTab(args, handler);
        }
        return $navigateTo(args, handler);
    }
    function onWebviewInserted(_, pageId) {
        const page = getPageById(parseInt(pageId));
        page && (page.__uniapp_webview = true);
    }
    function onWebviewRemoved(_, pageId) {
        const page = getPageById(parseInt(pageId));
        page && delete page.__uniapp_webview;
    }
    var onWebInvokeAppService = ({ name, arg }, pageIds) => {
        if (name === "postMessage") {
            onMessage(pageIds[0], arg);
        } else {
            uni[name](extend(arg, {
                fail(res) {
                    console.error(res.errMsg);
                }
            }));
        }
    };
    function onMessage(pageId, arg) {
        const uniNode = findNodeByTagName("web-view", parseInt(pageId));
        uniNode && uniNode.dispatchEvent(createUniEvent({
            type: "onMessage",
            target: /* @__PURE__ */ Object.create(null),
            currentTarget: /* @__PURE__ */ Object.create(null),
            detail: {
                data: [arg]
            }
        }));
    }
    function onWxsInvokeCallMethod({ nodeId, ownerId, method, args }, pageId) {
        const node = findNodeById(nodeId, parseInt(pageId));
        if (!node) {
            if (false) {
                console.error(formatLog("Wxs", "CallMethod", nodeId, "not found"));
            }
            return;
        }
        const vm = resolveOwnerVm(ownerId, node.__vueParentComponent);
        if (!vm) {
            if (false) {
                console.error(formatLog("Wxs", "CallMethod", "vm not found"));
            }
            return;
        }
        if (!vm[method]) {
            if (false) {
                console.error(formatLog("Wxs", "CallMethod", method, " not found"));
            }
            return;
        }
        vm[method](args);
    }
    function resolveOwnerVm(ownerId, vm) {
        if (!vm) {
            return null;
        }
        if (vm.uid === ownerId) {
            return vm.proxy;
        }
        let parent = vm.parent;
        while (parent) {
            if (parent.uid === ownerId) {
                return parent.proxy;
            }
            parent = parent.parent;
        }
        return vm.proxy;
    }
    function initSubscribeHandlers() {
        const { subscribe, subscribeHandler, publishHandler: publishHandler2 } = UniServiceJSBridge;
        onPlusMessage("subscribeHandler", ({ type, data, pageId }) => {
            subscribeHandler(type, data, pageId);
        });
        onPlusMessage(WEB_INVOKE_APPSERVICE, ({ data, webviewIds }) => {
            onWebInvokeAppService(data, webviewIds);
        });
        subscribe(ON_WEBVIEW_READY, subscribeWebviewReady);
        subscribe(VD_SYNC, onVdSync);
        subscribeServiceMethod();
        subscribeNavigator();
        subscribe(WEBVIEW_INSERTED, onWebviewInserted);
        subscribe(WEBVIEW_REMOVED, onWebviewRemoved);
        subscribeGetLocation();
        subscribe(ON_WXS_INVOKE_CALL_METHOD, onWxsInvokeCallMethod);
        const routeOptions = getRouteOptions(addLeadingSlash(__uniConfig.entryPagePath));
        if (routeOptions) {
            publishHandler2(ON_WEBVIEW_READY, {}, 1);
        }
    }
    function initGlobalEvent() {
        const plusGlobalEvent = plus.globalEvent;
        const { emit: emit2 } = UniServiceJSBridge;
        plus.key.addEventListener(EVENT_BACKBUTTON, backbuttonListener);
        plusGlobalEvent.addEventListener("pause", () => {
            emit2(ON_APP_ENTER_BACKGROUND);
        });
        plusGlobalEvent.addEventListener("resume", () => {
            const info = parseRedirectInfo();
            if (info && info.userAction) {
                initEnterOptions(info);
            }
            emit2(ON_APP_ENTER_FOREGROUND, {});
        });
        plusGlobalEvent.addEventListener("KeyboardHeightChange", function(event) {
            emit2(ON_KEYBOARD_HEIGHT_CHANGE, {
                height: event.height
            });
        });
        plusGlobalEvent.addEventListener("plusMessage", subscribePlusMessage);
    }
    function initAppLaunch(appVm) {
        injectAppHooks(appVm.$);
        const { entryPagePath, entryPageQuery, referrerInfo } = __uniConfig;
        const args = initLaunchOptions({
            path: entryPagePath,
            query: entryPageQuery,
            referrerInfo
        });
        invokeHook(appVm, ON_LAUNCH, args);
        invokeHook(appVm, ON_SHOW, args);
    }
    function initTabBar() {
        const { tabBar: tabBar2 } = __uniConfig;
        const len = tabBar2 && tabBar2.list && tabBar2.list.length;
        if (!len) {
            return;
        }
        const { entryPagePath } = __uniConfig;
        tabBar2.selectedIndex = 0;
        const selected = tabBar2.list.findIndex((page) => page.pagePath === entryPagePath);
        tabBarInstance.init(tabBar2, (item, index2) => {
            uni.switchTab({
                url: addLeadingSlash(item.pagePath),
                openType: "switchTab",
                from: "tabBar",
                success() {
                    invokeHook(ON_TAB_ITEM_TAP, {
                        index: index2,
                        text: item.text,
                        pagePath: item.pagePath
                    });
                }
            });
        });
        if (selected !== -1) {
            tabBar2.selectedIndex = selected;
            selected !== 0 && tabBarInstance.switchTab(entryPagePath);
        }
    }
    var appCtx;
    var defaultApp = {
        globalData: {}
    };
    function getApp$1({ allowDefault = false } = {}) {
        if (appCtx) {
            return appCtx;
        }
        if (allowDefault) {
            return defaultApp;
        }
        console.error("[warn]: getApp() failed. Learn more: https://uniapp.dcloud.io/collocation/frame/window?id=getapp.");
    }
    function registerApp(appVm) {
        if (false) {
            console.log(formatLog("registerApp"));
        }
        initVueApp(appVm);
        appCtx = appVm;
        initAppVm(appCtx);
        extend(appCtx, defaultApp);
        defineGlobalData(appCtx, defaultApp.globalData);
        initService();
        initEntry();
        initTabBar();
        initGlobalEvent();
        initSubscribeHandlers();
        initAppLaunch(appVm);
        __uniConfig.ready = true;
    }
    var __uniConfig$1 = globalThis.__uniConfig;
    var index = {
        uni: uni$1,
        getApp: getApp$1,
        getCurrentPages: getCurrentPages$1,
        __definePage: definePage,
        __registerApp: registerApp,
        UniServiceJSBridge: UniServiceJSBridge$1
    };

    // ../uni-app-next/packages/uni-app-plus/dist/uni.vue.js
    function get$pageByPage2(page) {
        return page.$page;
    }
    function getCurrentPage2() {
        const pages2 = getCurrentPages();
        const len = pages2.length;
        if (len) {
            return pages2[len - 1];
        }
    }
    function getCurrentPageVm2() {
        const page = getCurrentPage2();
        if (page) {
            return page.$vm;
        }
    }
    function invokeHook2(vm, name, args) {
        if (isString(vm)) {
            args = name;
            name = vm;
            vm = getCurrentPageVm2();
        } else if (typeof vm === "number") {
            const page = getCurrentPages().find((page2) => get$pageByPage2(page2).id === vm);
            if (page) {
                vm = page.$vm;
            } else {
                vm = getCurrentPageVm2();
            }
        }
        if (!vm) {
            return;
        }
        {
            if (vm.__call_hook) {
                return vm.__call_hook(name, args);
            }
        }
        const hooks = vm.$[name];
        return hooks && invokeArrayFns2(hooks, args);
    }
    function injectLifecycleHook(name, hook, publicThis, instance) {
        if (isFunction(hook)) {
            injectHook(name, hook.bind(publicThis), instance);
        }
    }
    function initHooks(options, instance, publicThis) {
        const mpType = options.mpType || publicThis.$mpType;
        if (!mpType || mpType === "component") {
            return;
        }
        Object.keys(options).forEach((name) => {
            if (isUniLifecycleHook(name, options[name], false)) {
                const hooks = options[name];
                if (isArray(hooks)) {
                    hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
                } else {
                    injectLifecycleHook(name, hooks, publicThis, instance);
                }
            }
        });
        if (mpType === "page") {
            instance.__isVisible = true;
            try {
                let query = instance.attrs.__pageQuery;
                if (false)
                    ;
                if (false)
                    ;
                invokeHook2(publicThis, ON_LOAD, query);
                delete instance.attrs.__pageQuery;
                const $basePage = false ? publicThis.$basePage : publicThis.$page;
                if (true) {
                    if (($basePage === null || $basePage === void 0 ? void 0 : $basePage.openType) !== "preloadPage") {
                        invokeHook2(publicThis, ON_SHOW);
                    }
                }
            } catch (e) {
                console.error(e.message + LINEFEED + e.stack);
            }
        }
    }
    function initRenderjs(options, instance) {
        initModules(instance, options.$renderjs, options["$" + RENDERJS_MODULES]);
    }
    function initModules(instance, modules, moduleIds = {}) {
        if (!isArray(modules)) {
            return;
        }
        const ownerId = instance.uid;
        const $wxsModules = instance.$wxsModules || (instance.$wxsModules = []);
        const ctx = instance.ctx;
        modules.forEach((module) => {
            if (moduleIds[module]) {
                ctx[module] = proxyModule(ownerId, moduleIds[module], module);
                $wxsModules.push(module);
            } else {
                if (true) {
                    console.error(formatLog("initModules", modules, moduleIds));
                }
            }
        });
    }
    function proxyModule(ownerId, moduleId, module) {
        const target = {};
        return new Proxy(target, {
            get(_, p) {
                return target[p] || (target[p] = createModuleFunction(ownerId, moduleId, module, p));
            }
        });
    }
    function createModuleFunction(ownerId, moduleId, module, name) {
        const target = () => {
        };
        const toJSON = () => WXS_PROTOCOL + JSON.stringify([ownerId, moduleId, module + "." + name]);
        return new Proxy(target, {
            get(_, p) {
                if (p === "toJSON") {
                    return toJSON;
                }
                return target[p] || (target[p] = createModuleFunction(ownerId, moduleId, module + "." + name, p));
            },
            apply(_target, _thisArg, args) {
                return WXS_PROTOCOL + JSON.stringify([ownerId, moduleId, module + "." + name, [...args]]);
            }
        });
    }
    function initWxs(options, instance) {
        initModules(instance, options.$wxs, options["$" + WXS_MODULES]);
    }
    function applyOptions2(options, instance, publicThis) {
        {
            initWxs(options, instance);
            initRenderjs(options, instance);
        }
        initHooks(options, instance, publicThis);
    }
    function set2(target, key, val) {
        return target[key] = val;
    }
    function $callMethod(method, ...args) {
        const fn = this[method];
        if (fn) {
            return fn(...args);
        }
        console.error(`method ${method} not found`);
        return null;
    }
    function createErrorHandler(app) {
        const userErrorHandler = app.config.errorHandler;
        return function errorHandler(err2, instance, info) {
            if (userErrorHandler) {
                userErrorHandler(err2, instance, info);
            }
            const appInstance = app._instance;
            if (!appInstance || !appInstance.proxy) {
                throw err2;
            }
            if (appInstance[ON_ERROR]) {
                {
                    invokeHook2(appInstance.proxy, ON_ERROR, err2);
                }
            } else {
                logError(err2, info, instance ? instance.$.vnode : null, false);
            }
        };
    }
    function mergeAsArray2(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }
    function initOptionMergeStrategies(optionMergeStrategies) {
        UniLifecycleHooks.forEach((name) => {
            optionMergeStrategies[name] = mergeAsArray2;
        });
    }
    var realAtob;
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
    if (typeof atob !== "function") {
        realAtob = function(str) {
            str = String(str).replace(/[\t\n\f\r ]+/g, "");
            if (!b64re.test(str)) {
                throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
            }
            str += "==".slice(2 - (str.length & 3));
            var bitmap;
            var result = "";
            var r1;
            var r2;
            var i = 0;
            for (; i < str.length; ) {
                bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
                result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
            }
            return result;
        };
    } else {
        realAtob = atob;
    }
    function b64DecodeUnicode(str) {
        return decodeURIComponent(realAtob(str).split("").map(function(c2) {
            return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    }
    function getCurrentUserInfo() {
        const token = uni.getStorageSync("uni_id_token") || "";
        const tokenArr = token.split(".");
        if (!token || tokenArr.length !== 3) {
            return {
                uid: null,
                role: [],
                permission: [],
                tokenExpired: 0
            };
        }
        let userInfo;
        try {
            userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
        } catch (error) {
            throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
        }
        userInfo.tokenExpired = userInfo.exp * 1e3;
        delete userInfo.exp;
        delete userInfo.iat;
        return userInfo;
    }
    function uniIdMixin(globalProperties) {
        globalProperties.uniIDHasRole = function(roleId) {
            const { role } = getCurrentUserInfo();
            return role.indexOf(roleId) > -1;
        };
        globalProperties.uniIDHasPermission = function(permissionId) {
            const { permission } = getCurrentUserInfo();
            return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
        };
        globalProperties.uniIDTokenValid = function() {
            const { tokenExpired } = getCurrentUserInfo();
            return tokenExpired > Date.now();
        };
    }
    function initApp(app) {
        const appConfig = app.config;
        appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
        initOptionMergeStrategies(appConfig.optionMergeStrategies);
        const globalProperties = appConfig.globalProperties;
        {
            uniIdMixin(globalProperties);
        }
        {
            globalProperties.$set = set2;
            globalProperties.$applyOptions = applyOptions2;
            globalProperties.$callMethod = $callMethod;
        }
        {
            invokeCreateVueAppHook(app);
        }
    }

    // packages/uni-framework/src/runtime.ts
    var service = {
        register(name, options) {
            if (name === "uni-app-config") {
                const res = options.create?.("", {
                    weex: {
                        config: {
                            env: {
                                scale: 1,
                                deviceWidth: 0
                            }
                        }
                    }
                });
                const instance = res?.instance || {};
                globalThis.__uniConfig = instance.__uniConfig;
                globalThis.__uniRoutes = instance.__uniRoutes;
                Object.keys(instance).forEach((key) => {
                    if (!(key in globalThis)) {
                        ;
                        globalThis[key] = instance[key];
                    }
                });
            }
        }
    };

    // packages/uni-framework/src/utils.ts
    var objectToString2 = Object.prototype.toString;
    var toTypeString2 = (value) => objectToString2.call(value);
    var isPlainObject2 = (val) => toTypeString2(val) === "[object Object]";
    var hasOwn3 = (val, key) => Object.prototype.hasOwnProperty.call(val, key);

    // packages/uni-framework/src/uts.ts
    var utsProxyRegistry = new FinalizationRegistry((id2) => {
        UTSProxyObject.revoke(id2);
    });
    var UTS_PROXY_TYPE = {
        OBJECT: "UTSProxyObject",
        FUNCTION: "UTSProxyFunction"
    };
    function normalizeArgument(arg, callbacks) {
        if (Array.isArray(arg)) {
            return arg.map((item) => normalizeArgument(item, callbacks));
        } else if (isPlainObject2(arg)) {
            const keys = Object.keys(arg);
            const argsClone = {};
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                argsClone[key] = normalizeArgument(arg[key], callbacks);
            }
            return argsClone;
        } else if (typeof arg === "function") {
            const id2 = callbacks.push(arg) - 1;
            return {
                __type: UTS_PROXY_TYPE.FUNCTION,
                id: id2
            };
        } else {
            return arg;
        }
    }
    function normalizeArguments(args) {
        const callbacks = [];
        const normalizedArgs = args.map((arg) => normalizeArgument(arg, callbacks));
        return {
            args: normalizedArgs,
            callbacks
        };
    }
    function createUTSProxyObject(id2, keyInfos) {
        const proxy = new Proxy(
            {},
            {
                ownKeys() {
                    return Object.keys(keyInfos);
                },
                get(target, prop) {
                    if (typeof prop !== "string") {
                        return Reflect.get(target, prop);
                    }
                    if (prop === "toJSON") {
                        return () => {
                            const result = {};
                            for (const key in keyInfos) {
                                if (hasOwn3(keyInfos, key)) {
                                    const keyInfo2 = keyInfos[key];
                                    if (keyInfo2.type === "property" && keyInfo2.enumerable) {
                                        result[key] = wrapReturnValue(
                                            UTSProxyObject.invokeSync(id2, "__get", [key])
                                        );
                                    }
                                }
                            }
                            return result;
                        };
                    }
                    const keyInfo = keyInfos[prop];
                    if (!hasOwn3(keyInfos, prop) || !keyInfo) {
                        return Reflect.get(target, prop);
                    }
                    if (keyInfo.type === "method") {
                        return (...args) => {
                            const { args: normalizedArgs, callbacks } = normalizeArguments(args);
                            return wrapReturnValue(
                                UTSProxyObject.invokeSync(id2, "__invoke", [
                                    prop,
                                    normalizedArgs,
                                    callbacks
                                ])
                            );
                        };
                    } else {
                        return wrapReturnValue(UTSProxyObject.invokeSync(id2, "__get", [prop]));
                    }
                },
                set(target, key, value) {
                    return UTSProxyObject.invokeSync(id2, "__set", [key, value]);
                },
                deleteProperty(target, key) {
                    return UTSProxyObject.invokeSync(id2, "__delete", [key]);
                },
                getOwnPropertyDescriptor: function(target, prop) {
                    if (typeof prop !== "string") {
                        return Reflect.getOwnPropertyDescriptor(target, prop);
                    }
                    const keyInfo = keyInfos[prop];
                    if (keyInfo && hasOwn3(keyInfos, prop)) {
                        return {
                            writable: keyInfo.writable,
                            enumerable: keyInfo.enumerable,
                            configurable: keyInfo.configurable
                        };
                    }
                    return Reflect.getOwnPropertyDescriptor(target, prop);
                }
            }
        );
        utsProxyRegistry.register(proxy, id2);
        return proxy;
    }
    function wrapReturnValue(value) {
        if (Array.isArray(value)) {
            return value.map((item) => wrapReturnValue(item));
        }
        if (value && typeof value === "object" && value.__type === "UTSProxyObject") {
            return createUTSProxyObject(value.id, value.keyInfo);
        }
        return value;
    }
    var SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|rpx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting|getFacialRecognitionMetaInfo|setAppBadgeNumber/;
    var TASK_APIS = ["request", "downloadFile", "uploadFile", "connectSocket"];
    var ASYNC_API = ["createBLEConnection", "createPushMessage"];
    var ON_API_RE = /^on/;
    var OFF_API_RE = /^off/;
    function isSyncApi(name) {
        return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
    }
    function isOnApi(name) {
        return ON_API_RE.test(name);
    }
    function isOffApi(name) {
        return OFF_API_RE.test(name);
    }
    function isTaskApi(name) {
        return TASK_APIS.indexOf(name) !== -1;
    }
    var Listeners = /* @__PURE__ */ new Map();
    function startListener(name) {
        const eventName = name.replace(/^on/, "");
        if (Listeners.has(eventName)) {
            return Listeners.get(eventName);
        }
        const listener = function(event) {
            UniServiceJSBridge$1.invokeOnCallback(name, event);
        };
        Listeners.set(eventName, listener);
        UTSProxyObject.invokeUniApi(name, [listener]);
        return listener;
    }
    function stopListener(name) {
        const eventName = name.replace(/^off/, "");
        if (!Listeners.has(eventName)) {
            return;
        }
        const listener = Listeners.get(eventName);
        UTSProxyObject.invokeUniApi(name, [listener]);
        Listeners.delete(eventName);
    }
    function registerUniApis() {
        __uniApiList.forEach(registerUniApi);
    }
    function registerUniApi(name) {
        if (name in globalThis.uni) {
            return;
        }
        if (__uniExtApiList.includes(name)) {
            globalThis.uni[name] = function(...args) {
                let returnValue;
                if (typeof args[0] === "object" && args[0] !== null) {
                    const success = args[0]?.success;
                    const fail = args[0]?.fail;
                    const complete = args[0]?.complete;
                    returnValue = UTSProxyObject.invokeUniApi(name, args, [
                        success,
                        fail,
                        complete
                    ]);
                } else {
                    returnValue = UTSProxyObject.invokeUniApi(name, args);
                }
                return wrapReturnValue(returnValue);
            };
            return;
        }
        if (isSyncApi(name)) {
            globalThis.uni[name] = defineSyncApi(name, (...args) => {
                return wrapReturnValue(UTSProxyObject.invokeUniApi(name, args));
            });
        } else if (isOnApi(name)) {
            globalThis.uni[name] = defineOnApi(name, () => {
                startListener(name);
            });
        } else if (isOffApi(name)) {
            globalThis.uni[name] = defineOffApi(name, () => {
                stopListener(name);
            });
        } else {
            globalThis.uni[name] = (isTaskApi(name) ? defineTaskApi : defineAsyncApi)(
                name,
                (options, exec) => {
                    return wrapReturnValue(
                        UTSProxyObject.invokeUniApi(
                            name,
                            [options],
                            [
                                (res) => {
                                    exec.resolve(res);
                                },
                                (err2) => {
                                    exec.reject(err2);
                                },
                                // 此空函数必传，用于覆盖options内的complete
                                () => {
                                }
                            ]
                        )
                    );
                }
            );
        }
    }
    function initSdkServiceMethod() {
        globalThis.__sdkServiceMethodList.forEach((name) => {
            registerServiceMethod(name, (param, resolve2) => {
                UTSProxyObject.invokeSync("__sdkServiceMethod" /* __sdkServiceMethod */, name, [
                    param,
                    resolve2
                ]);
            });
        });
    }
    function requireNativePlugin(name) {
        return wrapReturnValue(
            UTSProxyObject.invokeSync("__NativeModule" /* __NativeModule */, "__get", [name])
        );
    }
    function requireUTSPlugin(name) {
        return wrapReturnValue(
            UTSProxyObject.invokeSync("__UTSPlugin" /* __UTSPlugin */, "__get", [name])
        );
    }

    // packages/uni-framework/src/MP.ts
    function onNativeEventReceive(callback) {
        UTSProxyObject.invokeSync("__MPBridge" /* __MPBridge */, "onNativeEventReceive", [
            callback
        ]);
    }
    function offNativeEventReceive(callback) {
        UTSProxyObject.invokeSync(
            "__MPBridge" /* __MPBridge */,
            "offNativeEventReceive",
            [callback]
        );
    }
    function sendNativeEvent(event, data, callback) {
        UTSProxyObject.invokeSync("__MPBridge" /* __MPBridge */, "sendNativeEvent", [
            event,
            // 用户数据不可信，必须序列化
            JSON.stringify(data),
            (...args) => {
                callback(...args.map((arg) => arg ? JSON.parse(arg) : arg));
            }
        ]);
    }

    // packages/uni-framework/src/console.ts
    function _toString(a) {
        try {
            let _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        } catch (error) {
            return String(a);
        }
    }
    function wrap(key) {
        const fn1 = console[key];
        let needBreak = false;
        return function(...args) {
            const fn2 = uniconsole[key];
            fn1(...args);
            if (needBreak) {
                return;
            }
            needBreak = true;
            const argsLimit = 99;
            const batchCount = Math.ceil(args.length / argsLimit);
            for (let i = 0; i < batchCount; i++) {
                const start = i * argsLimit;
                const end = start + argsLimit;
                const batch = args.slice(start, end);
                try {
                    fn2(...batch.map(_toString));
                } catch (error) {
                }
            }
            needBreak = false;
        };
    }
    function useNativeConsole() {
        const list = ["log", "warn", "error"];
        list.forEach((key) => {
            console[key] = wrap(key);
        });
    }

    // packages/uni-framework/src/setup.ts
    var plugin = {
        install(app) {
            initApp(app);
            initApp2(app);
        }
    };
    function initApp2(app) {
        const { mount } = app;
        app.mount = (rootContainer) => {
            const instance = mount(rootContainer);
            if (rootContainer === "#app") {
                index.__registerApp(instance);
            }
            return instance;
        };
    }
    var createApp2 = createApp;
    var createVueApp = function(...args) {
        const app = createApp2.apply(vue_runtime_esm_dev_exports, args);
        app.use(plugin);
        return app;
    };
    var uni2 = index.uni;
    function initUniApi(api) {
        return Object.assign(index.uni, api);
    }
    function setup() {
        useNativeConsole();
        globalThis.service = service;
        globalThis.Vue = Object.assign({}, vue_runtime_esm_dev_exports, {
            createVueApp
        });
        globalThis.uni = index.uni;
        globalThis.uni.VueShared = shared_esm_bundler_exports;
        globalThis.getApp = index.getApp;
        globalThis.getCurrentPages = index.getCurrentPages;
        globalThis.__definePage = index.__definePage;
        globalThis.UniServiceJSBridge = index.UniServiceJSBridge;
        globalThis.UTSJSONObject = index.UTSJSONObject;
        globalThis.UniError = index.UniError;
        initUniApi({
            offNativeEventReceive,
            onNativeEventReceive,
            sendNativeEvent,
            requireNativePlugin,
            requireUTSPlugin
        });
        initSdkServiceMethod();
        registerUniApis();
    }

    // packages/uni-framework/src/index.ts
    setup();
})();
/**
 * @dcloudio/uni-app-service-vue v3.4.21
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
/*! #__NO_SIDE_EFFECTS__ */
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.4.21
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.4.21
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
