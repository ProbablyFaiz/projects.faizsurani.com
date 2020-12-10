/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst format_1 = __webpack_require__(/*! ./format */ \"./src/format.ts\");\nconst convertworker_1 = __webpack_require__(/*! ./convertworker */ \"./src/convertworker.ts\");\nfunction fileToUint8Array(file) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const fileReader = new FileReader();\n        const promise = new Promise((resolve, reject) => {\n            fileReader.addEventListener('load', () => {\n                const result = fileReader.result;\n                if (result instanceof ArrayBuffer) {\n                    resolve(new Uint8Array(result));\n                }\n                else {\n                    throw new Error('readAsArrayBuffer() returns non ArrayBuffer result');\n                }\n            });\n            fileReader.addEventListener('error', (e) => reject(e));\n        });\n        fileReader.readAsArrayBuffer(file);\n        return promise;\n    });\n}\nfunction createDownloadLink(basename, data) {\n    const blob = new Blob([data]);\n    const url = URL.createObjectURL(blob);\n    const link = document.createElement('a');\n    link.href = url;\n    const suffix = format_1.getFilenameSuffix(data);\n    link.download = `${basename}.${suffix}`;\n    link.innerHTML = `Download ${basename}.${suffix}`;\n    return link;\n}\nfunction getBasename(filename) {\n    const suffixPos = filename.lastIndexOf('.');\n    if (suffixPos === -1)\n        return filename;\n    return filename.substr(0, suffixPos);\n}\nconst BYTE_SUFFIXES = [' B', ' kB', ' MB'];\nconst BYTE_MARGIN = 1024;\nfunction formatFilesize(amount) {\n    let index = 0;\n    while (amount > 1000 + BYTE_MARGIN && index < BYTE_SUFFIXES.length) {\n        amount /= 1000;\n        index += 1;\n    }\n    const suffix = BYTE_SUFFIXES[index];\n    if (amount > 100) {\n        return amount.toFixed(0) + suffix;\n    }\n    else {\n        return amount.toFixed(1) + suffix;\n    }\n}\nfunction formatProcessTime(t) {\n    if (t < 1000) {\n        return t.toFixed(0) + 'ms';\n    }\n    const sec = t / 1000;\n    return sec.toFixed(1) + 's';\n}\nfunction formatConversionRatio(before, after) {\n    const el = document.createElement('span');\n    const ratio = (after / before) * 100;\n    el.innerText = ratio.toFixed(1);\n    if (ratio < 100) {\n        el.style.color = 'green';\n        el.style.fontWeight = 'bold';\n    }\n    else if (ratio > 100) {\n        el.style.color = 'red';\n        el.style.fontWeight = 'bold';\n    }\n    return el.outerHTML;\n}\n// TODO: Avoid a god object.\nclass App {\n    constructor() {\n        const inputFileEl = document.querySelector('#input-file');\n        if (!(inputFileEl instanceof HTMLInputElement)) {\n            throw new Error('No input-file element');\n        }\n        const selectFileButton = document.querySelector('#select-file-button');\n        if (!(selectFileButton instanceof HTMLButtonElement)) {\n            throw new Error('No select-file-button element');\n        }\n        const convertResultEl = document.querySelector('#convert-result-container');\n        if (!convertResultEl) {\n            throw new Error('No convert result container');\n        }\n        const selectedFontInfoEl = document.querySelector('#selected-font-info');\n        if (!selectedFontInfoEl) {\n            throw new Error('No selected font info element');\n        }\n        const convertButton = document.querySelector('#convert-button');\n        if (!(convertButton instanceof HTMLButtonElement)) {\n            throw new Error('No convert button element');\n        }\n        const spinnerEl = document.querySelector('#spinner');\n        if (!spinnerEl) {\n            throw new Error('No spinner element');\n        }\n        const errorMessageEl = document.querySelector('#error-message-container');\n        if (!errorMessageEl) {\n            throw new Error('No error message container');\n        }\n        this.inputFileEl = inputFileEl;\n        this.selectFileButton = selectFileButton;\n        this.convertResultEl = convertResultEl;\n        this.selectedFontInfoEl = selectedFontInfoEl;\n        this.convertButton = convertButton;\n        this.spinnerEl = spinnerEl;\n        this.errorMessageEl = errorMessageEl;\n        this.convertButton.disabled = true;\n        this.selectedFiles = undefined;\n        this.selectFileButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {\n            const files = yield this.chooseFiles();\n            this.onFilesSelected(files);\n        }));\n        this.convertButton.addEventListener('click', () => {\n            this.startConversions();\n        });\n    }\n    chooseFiles() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new Promise((resolve, reject) => {\n                const listener = () => {\n                    this.inputFileEl.removeEventListener('change', listener);\n                    if (this.inputFileEl.files === null || this.inputFileEl.files.length === 0) {\n                        reject('No file specified');\n                        return;\n                    }\n                    resolve(this.inputFileEl.files);\n                };\n                this.inputFileEl.addEventListener('change', listener);\n                this.inputFileEl.click();\n            });\n        });\n    }\n    onFilesSelected(files) {\n        this.selectedFontInfoEl.innerHTML = '';\n        for (let file of files) {\n            const fileSize = formatFilesize(file.size);\n            let el = document.createElement('div');\n            el.innerHTML = `${file.name} (${fileSize})`;\n            this.selectedFontInfoEl.appendChild(el);\n        }\n        this.selectedFiles = files;\n        this.convertButton.disabled = false;\n    }\n    startConversions() {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (this.selectedFiles === undefined)\n                return;\n            const outputFormatEl = document.querySelector('input[name=output-format]:checked');\n            if (!(outputFormatEl instanceof HTMLInputElement)) {\n                throw new Error('No output format element');\n            }\n            const format = outputFormatEl.value;\n            if (!format_1.isValidFormat(format)) {\n                throw new Error(`Invalid font format: ${format}`);\n            }\n            this.convertButton.disabled = true;\n            // Clear conversion status.\n            this.convertResultEl.innerHTML = '';\n            this.errorMessageEl.innerHTML = '';\n            this.errorMessageEl.classList.add('error-message-off');\n            this.spinnerEl.classList.remove('spinner-off');\n            try {\n                for (let file of this.selectedFiles) {\n                    yield this.convertSingleFile(file, format);\n                }\n            }\n            catch (exception) {\n                console.error(exception);\n                this.errorMessageEl.innerHTML = exception.message;\n                this.errorMessageEl.classList.remove('error-message-off');\n                this.convertResultEl.innerHTML = '';\n            }\n            finally {\n                this.spinnerEl.classList.add('spinner-off');\n                this.convertButton.disabled = false;\n            }\n        });\n    }\n    convertSingleFile(file, format) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const data = yield fileToUint8Array(file);\n            const originalByteLength = data.byteLength;\n            const result = yield convertworker_1.convertOnWorker(data, format);\n            const output = result.output;\n            const originalFileSize = formatFilesize(originalByteLength);\n            const convertedFileSize = formatFilesize(output.byteLength);\n            const processTime = formatProcessTime(result.processTime);\n            const ratio = formatConversionRatio(originalByteLength, output.byteLength);\n            const summaryEl = document.createElement('div');\n            summaryEl.classList.add('convert-summary');\n            summaryEl.innerHTML = `\n    <div>Size comparison: ${originalFileSize} → ${convertedFileSize} (${ratio}%)</div>\n    <div>Process time: ${processTime}</div>\n    `;\n            this.convertResultEl.appendChild(summaryEl);\n            const basename = getBasename(file.name);\n            const link = createDownloadLink(basename, output);\n            this.convertResultEl.appendChild(link);\n        });\n    }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n    new App();\n});\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/convertworker.ts":
/*!******************************!*\
  !*** ./src/convertworker.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.convertOnWorker = void 0;\nclass ConvertWorker {\n    constructor(worker) {\n        this.worker = worker;\n        this.messageId = 0;\n        this.pendings = new Map();\n        this.timeouts = new Map();\n        this.worker.addEventListener('message', e => {\n            const messageId = e.data.messageId;\n            if (typeof messageId !== 'number') {\n                console.warn(`Received invalid message from worker: ${e}`);\n                return;\n            }\n            const timeout = this.timeouts.get(messageId);\n            if (timeout) {\n                clearTimeout(timeout);\n                this.timeouts.delete(messageId);\n            }\n            const pending = this.pendings.get(messageId);\n            if (pending) {\n                if (e.data.error) {\n                    pending.reject(new Error(e.data.error));\n                }\n                else {\n                    // TODO: Make sure response has |output|.\n                    pending.resolve(e.data.response.output);\n                }\n                this.pendings.delete(messageId);\n                return;\n            }\n            if (e.data.error) {\n                this.terminate();\n                throw new Error(e.data.error);\n            }\n        });\n    }\n    convert(data, format, timeout) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const promise = new Promise((resolve, reject) => {\n                this.worker.postMessage({\n                    messageId: this.messageId,\n                    action: 'convert',\n                    input: data,\n                    format: format\n                }, [data.buffer]);\n                this.pendings.set(this.messageId, { resolve: resolve, reject: reject });\n                if (timeout) {\n                    this.timeouts.set(this.messageId, setTimeout(() => {\n                        this.pendings.delete(this.messageId);\n                        reject(new Error('Convert time out'));\n                    }, timeout));\n                }\n                this.messageId += 1;\n            });\n            return promise;\n        });\n    }\n    terminate() {\n        this.worker.terminate();\n    }\n}\nconst WORKER_INIT_TIMEOUT_MS = 15000;\nfunction createConvertWorker() {\n    return new Promise((resolve, reject) => {\n        const worker = new Worker('worker.js');\n        const timeout = setTimeout(() => reject(new Error('Worker time out')), WORKER_INIT_TIMEOUT_MS);\n        worker.postMessage('init');\n        const listener = (e) => {\n            if (e.data === 'initialized') {\n                clearTimeout(timeout);\n                worker.removeEventListener('message', listener);\n                resolve(new ConvertWorker(worker));\n            }\n            else if (e.data.name === 'error') {\n                reject(new Error(e.data.message));\n            }\n        };\n        worker.addEventListener('message', listener);\n    });\n}\nlet defaultWorker = null;\nfunction getDefaultWorker() {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (defaultWorker)\n            return defaultWorker;\n        defaultWorker = yield createConvertWorker();\n        return defaultWorker;\n    });\n}\n/**\n * Convert a font on a worker.\n * @param data font data. This will be transferred to worker.\n * @param format output format.\n */\nfunction convertOnWorker(data, format) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const t0 = performance.now();\n        const worker = yield getDefaultWorker();\n        const output = yield worker.convert(data, format);\n        const t1 = performance.now();\n        return {\n            output: output,\n            processTime: t1 - t0\n        };\n    });\n}\nexports.convertOnWorker = convertOnWorker;\n\n\n//# sourceURL=webpack:///./src/convertworker.ts?");

/***/ }),

/***/ "./src/format.ts":
/*!***********************!*\
  !*** ./src/format.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.getFilenameSuffix = exports.isValidFormat = exports.getFontFormat = exports.isWoff2Font = exports.isWoffFont = exports.WOFF_SIGNATURE = exports.getOtfFilenameSuffix = exports.isOtfFont = void 0;\nconst SFNT_VERSION_OTTO = 0x4f54544f; // OTTO\nconst SFNT_VERSION_TYP1 = 0x74797031; // typ1\nconst SFNT_VERSION_TRUE = 0x74727565; // true\nconst SFNT_VERSION_V1 = 0x00010000;\nfunction isOtfFont(version) {\n    return (version === SFNT_VERSION_OTTO ||\n        version === SFNT_VERSION_TYP1 ||\n        version === SFNT_VERSION_TRUE ||\n        version === SFNT_VERSION_V1);\n}\nexports.isOtfFont = isOtfFont;\nfunction getOtfFilenameSuffix(version) {\n    if (version === SFNT_VERSION_OTTO)\n        return 'otf';\n    if (version === SFNT_VERSION_TYP1 || version === SFNT_VERSION_TRUE || SFNT_VERSION_V1)\n        return 'ttf';\n    throw new Error(`Invalid font version: ${version}`);\n}\nexports.getOtfFilenameSuffix = getOtfFilenameSuffix;\nexports.WOFF_SIGNATURE = 0x774f4646; // 'wOFF'\nfunction isWoffFont(version) {\n    return version === exports.WOFF_SIGNATURE;\n}\nexports.isWoffFont = isWoffFont;\nconst WOFF2_SIGNATURE = 0x774f4632; // wOF2\nfunction isWoff2Font(version) {\n    return version === WOFF2_SIGNATURE;\n}\nexports.isWoff2Font = isWoff2Font;\nfunction getVersion(data) {\n    if (data.byteLength < 4)\n        return 0; // invalid\n    const version = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];\n    return version;\n}\nfunction getFontFormat(data) {\n    const version = getVersion(data);\n    if (isOtfFont(version))\n        return \"otf\" /* OTF */;\n    if (isWoffFont(version))\n        return \"woff\" /* WOFF */;\n    if (isWoff2Font(version))\n        return \"woff2\" /* WOFF2 */;\n    return \"unsupported\" /* UNSUPPORTED */;\n}\nexports.getFontFormat = getFontFormat;\nfunction isValidFormat(s) {\n    return s === 'otf' || s === 'woff' || s === 'woff2';\n}\nexports.isValidFormat = isValidFormat;\nfunction getFilenameSuffix(data) {\n    const version = getVersion(data);\n    if (isWoffFont(version))\n        return 'woff';\n    if (isWoff2Font(version))\n        return 'woff2';\n    if (isOtfFont(version))\n        return getOtfFilenameSuffix(version);\n    throw new Error(`Invalid font version: ${version}`);\n}\nexports.getFilenameSuffix = getFilenameSuffix;\n\n\n//# sourceURL=webpack:///./src/format.ts?");

/***/ })

/******/ });