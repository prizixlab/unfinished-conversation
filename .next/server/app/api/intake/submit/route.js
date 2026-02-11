"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/intake/submit/route";
exports.ids = ["app/api/intake/submit/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "async_hooks":
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("async_hooks");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fintake%2Fsubmit%2Froute&page=%2Fapi%2Fintake%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintake%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fintake%2Fsubmit%2Froute&page=%2Fapi%2Fintake%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintake%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_mariavinnik_unfinished_conversation_app_api_intake_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/intake/submit/route.ts */ \"(rsc)/./app/api/intake/submit/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/intake/submit/route\",\n        pathname: \"/api/intake/submit\",\n        filename: \"route\",\n        bundlePath: \"app/api/intake/submit/route\"\n    },\n    resolvedPagePath: \"/Users/mariavinnik/unfinished-conversation/app/api/intake/submit/route.ts\",\n    nextConfigOutput,\n    userland: _Users_mariavinnik_unfinished_conversation_app_api_intake_submit_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/intake/submit/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZpbnRha2UlMkZzdWJtaXQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmludGFrZSUyRnN1Ym1pdCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmludGFrZSUyRnN1Ym1pdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hcmlhdmlubmlrJTJGdW5maW5pc2hlZC1jb252ZXJzYXRpb24lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbWFyaWF2aW5uaWslMkZ1bmZpbmlzaGVkLWNvbnZlcnNhdGlvbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDeUI7QUFDdEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bmZpbmlzaGVkLWNvbnZlcnNhdGlvbi8/OWQzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFyaWF2aW5uaWsvdW5maW5pc2hlZC1jb252ZXJzYXRpb24vYXBwL2FwaS9pbnRha2Uvc3VibWl0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9pbnRha2Uvc3VibWl0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvaW50YWtlL3N1Ym1pdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvaW50YWtlL3N1Ym1pdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9tYXJpYXZpbm5pay91bmZpbmlzaGVkLWNvbnZlcnNhdGlvbi9hcHAvYXBpL2ludGFrZS9zdWJtaXQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2ludGFrZS9zdWJtaXQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fintake%2Fsubmit%2Froute&page=%2Fapi%2Fintake%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintake%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/intake/submit/route.ts":
/*!****************************************!*\
  !*** ./app/api/intake/submit/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_resend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/resend */ \"(rsc)/./lib/resend.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { session_id, senderName, recipientName, recipientEmail, message } = body;\n        if (!session_id || !senderName || !recipientEmail || !message) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        console.log(\"INTAKE RECEIVED:\", body);\n        const baseUrl = \"http://localhost:3000\" || 0;\n        const intakeLink = `${baseUrl}/intake?session_id=${encodeURIComponent(session_id)}`;\n        // Send confirmation email (THIS IS JUST A TEST EMAIL FOR NOW)\n        const emailResult = await _lib_resend__WEBPACK_IMPORTED_MODULE_0__.resend.emails.send({\n            from: \"Verba Non Dicta <onboarding@resend.dev>\",\n            to: recipientEmail,\n            subject: \"Your space is open\",\n            html: `\n        <div style=\"font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5\">\n          <h2 style=\"margin:0 0 12px 0;\">Your space is open.</h2>\n          <p style=\"margin:0 0 12px 0;\">We received your words${recipientName ? ` for <b>${recipientName}</b>` : \"\"}.</p>\n          <p style=\"margin:0 0 12px 0;\">\n            If you closed the page, you can return using this link (valid for 24 hours):\n            <br/>\n            <a href=\"${intakeLink}\">${intakeLink}</a>\n          </p>\n          <hr style=\"border:none;border-top:1px solid #333; margin:16px 0;\" />\n          <p style=\"margin:0; color:#999; font-size: 13px;\">\n            From: ${senderName}\n          </p>\n        </div>\n      `\n        });\n        console.log(\"RESEND RESULT:\", emailResult);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"INTAKE ERROR:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2ludGFrZS9zdWJtaXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXNDO0FBQ0s7QUFFcEMsZUFBZUUsS0FBS0MsR0FBWTtJQUNuQyxJQUFJO1FBQ0EsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJO1FBRTNCLE1BQU0sRUFBRUMsVUFBVSxFQUFFQyxVQUFVLEVBQUVDLGFBQWEsRUFBRUMsY0FBYyxFQUFFQyxPQUFPLEVBQUUsR0FBR047UUFFM0UsSUFBSSxDQUFDRSxjQUFjLENBQUNDLGNBQWMsQ0FBQ0Usa0JBQWtCLENBQUNDLFNBQVM7WUFDM0QsT0FBT1QscURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRU0sT0FBTztZQUEwQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDakY7UUFFQUMsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQlY7UUFFaEMsTUFBTVcsVUFBVUMsdUJBQWdDLElBQUksQ0FBdUI7UUFDM0UsTUFBTUcsYUFBYSxDQUFDLEVBQUVKLFFBQVEsbUJBQW1CLEVBQUVLLG1CQUFtQmQsWUFBWSxDQUFDO1FBRW5GLDhEQUE4RDtRQUM5RCxNQUFNZSxjQUFjLE1BQU1yQiwrQ0FBTUEsQ0FBQ3NCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDO1lBQ3pDQyxNQUFNO1lBQ05DLElBQUloQjtZQUNKaUIsU0FBUztZQUNUQyxNQUFNLENBQUM7Ozs4REFHMkMsRUFBRW5CLGdCQUFnQixDQUFDLFFBQVEsRUFBRUEsY0FBYyxJQUFJLENBQUMsR0FBRyxHQUFHOzs7O3FCQUkvRixFQUFFVyxXQUFXLEVBQUUsRUFBRUEsV0FBVzs7OztrQkFJL0IsRUFBRVosV0FBVzs7O01BR3pCLENBQUM7UUFDQztRQUVBTSxRQUFRQyxHQUFHLENBQUMsa0JBQWtCTztRQUU5QixPQUFPcEIscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFdUIsU0FBUztRQUFLLEdBQUc7WUFBRWhCLFFBQVE7UUFBSTtJQUM5RCxFQUFFLE9BQU9ELE9BQU87UUFDWkUsUUFBUUYsS0FBSyxDQUFDLGlCQUFpQkE7UUFDL0IsT0FBT1YscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFTSxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdEU7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3VuZmluaXNoZWQtY29udmVyc2F0aW9uLy4vYXBwL2FwaS9pbnRha2Uvc3VibWl0L3JvdXRlLnRzP2U5OWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVzZW5kIH0gZnJvbSBcIkAvbGliL3Jlc2VuZFwiO1xuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgICAgIGNvbnN0IHsgc2Vzc2lvbl9pZCwgc2VuZGVyTmFtZSwgcmVjaXBpZW50TmFtZSwgcmVjaXBpZW50RW1haWwsIG1lc3NhZ2UgfSA9IGJvZHk7XG5cbiAgICAgICAgaWYgKCFzZXNzaW9uX2lkIHx8ICFzZW5kZXJOYW1lIHx8ICFyZWNpcGllbnRFbWFpbCB8fCAhbWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiTWlzc2luZyByZXF1aXJlZCBmaWVsZHNcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJTlRBS0UgUkVDRUlWRUQ6XCIsIGJvZHkpO1xuXG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TSVRFX1VSTCB8fCBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xuICAgICAgICBjb25zdCBpbnRha2VMaW5rID0gYCR7YmFzZVVybH0vaW50YWtlP3Nlc3Npb25faWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2Vzc2lvbl9pZCl9YDtcblxuICAgICAgICAvLyBTZW5kIGNvbmZpcm1hdGlvbiBlbWFpbCAoVEhJUyBJUyBKVVNUIEEgVEVTVCBFTUFJTCBGT1IgTk9XKVxuICAgICAgICBjb25zdCBlbWFpbFJlc3VsdCA9IGF3YWl0IHJlc2VuZC5lbWFpbHMuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiBcIlZlcmJhIE5vbiBEaWN0YSA8b25ib2FyZGluZ0ByZXNlbmQuZGV2PlwiLFxuICAgICAgICAgICAgdG86IHJlY2lwaWVudEVtYWlsLFxuICAgICAgICAgICAgc3ViamVjdDogXCJZb3VyIHNwYWNlIGlzIG9wZW5cIixcbiAgICAgICAgICAgIGh0bWw6IGBcbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtZmFtaWx5OiBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIEFyaWFsOyBsaW5lLWhlaWdodDogMS41XCI+XG4gICAgICAgICAgPGgyIHN0eWxlPVwibWFyZ2luOjAgMCAxMnB4IDA7XCI+WW91ciBzcGFjZSBpcyBvcGVuLjwvaDI+XG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46MCAwIDEycHggMDtcIj5XZSByZWNlaXZlZCB5b3VyIHdvcmRzJHtyZWNpcGllbnROYW1lID8gYCBmb3IgPGI+JHtyZWNpcGllbnROYW1lfTwvYj5gIDogXCJcIn0uPC9wPlxuICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOjAgMCAxMnB4IDA7XCI+XG4gICAgICAgICAgICBJZiB5b3UgY2xvc2VkIHRoZSBwYWdlLCB5b3UgY2FuIHJldHVybiB1c2luZyB0aGlzIGxpbmsgKHZhbGlkIGZvciAyNCBob3Vycyk6XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiR7aW50YWtlTGlua31cIj4ke2ludGFrZUxpbmt9PC9hPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8aHIgc3R5bGU9XCJib3JkZXI6bm9uZTtib3JkZXItdG9wOjFweCBzb2xpZCAjMzMzOyBtYXJnaW46MTZweCAwO1wiIC8+XG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46MDsgY29sb3I6Izk5OTsgZm9udC1zaXplOiAxM3B4O1wiPlxuICAgICAgICAgICAgRnJvbTogJHtzZW5kZXJOYW1lfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJFU0VORCBSRVNVTFQ6XCIsIGVtYWlsUmVzdWx0KTtcblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0sIHsgc3RhdHVzOiAyMDAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIklOVEFLRSBFUlJPUjpcIiwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJTZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJyZXNlbmQiLCJOZXh0UmVzcG9uc2UiLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJzZXNzaW9uX2lkIiwic2VuZGVyTmFtZSIsInJlY2lwaWVudE5hbWUiLCJyZWNpcGllbnRFbWFpbCIsIm1lc3NhZ2UiLCJlcnJvciIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NJVEVfVVJMIiwiaW50YWtlTGluayIsImVuY29kZVVSSUNvbXBvbmVudCIsImVtYWlsUmVzdWx0IiwiZW1haWxzIiwic2VuZCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJodG1sIiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/intake/submit/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/resend.ts":
/*!***********************!*\
  !*** ./lib/resend.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   resend: () => (/* binding */ resend)\n/* harmony export */ });\n/* harmony import */ var resend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resend */ \"(rsc)/./node_modules/resend/dist/index.mjs\");\n\nconst resendKey = process.env.RESEND_API_KEY;\nif (!resendKey) {\n    throw new Error(\"RESEND_API_KEY is not set\");\n}\nconst resend = new resend__WEBPACK_IMPORTED_MODULE_0__.Resend(resendKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcmVzZW5kLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLFlBQVlDLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYztBQUU1QyxJQUFJLENBQUNILFdBQVc7SUFDZCxNQUFNLElBQUlJLE1BQU07QUFDbEI7QUFFTyxNQUFNQyxTQUFTLElBQUlOLDBDQUFNQSxDQUFDQyxXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdW5maW5pc2hlZC1jb252ZXJzYXRpb24vLi9saWIvcmVzZW5kLnRzPzA0NzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzZW5kIH0gZnJvbSAncmVzZW5kJztcblxuY29uc3QgcmVzZW5kS2V5ID0gcHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVk7XG5cbmlmICghcmVzZW5kS2V5KSB7XG4gIHRocm93IG5ldyBFcnJvcignUkVTRU5EX0FQSV9LRVkgaXMgbm90IHNldCcpO1xufVxuXG5leHBvcnQgY29uc3QgcmVzZW5kID0gbmV3IFJlc2VuZChyZXNlbmRLZXkpO1xuIl0sIm5hbWVzIjpbIlJlc2VuZCIsInJlc2VuZEtleSIsInByb2Nlc3MiLCJlbnYiLCJSRVNFTkRfQVBJX0tFWSIsIkVycm9yIiwicmVzZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/resend.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/js-beautify","vendor-chunks/htmlparser2","vendor-chunks/peberminta","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/selderee","vendor-chunks/resend","vendor-chunks/parseley","vendor-chunks/leac","vendor-chunks/html-to-text","vendor-chunks/domelementtype","vendor-chunks/@selderee","vendor-chunks/@react-email","vendor-chunks/deepmerge"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fintake%2Fsubmit%2Froute&page=%2Fapi%2Fintake%2Fsubmit%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fintake%2Fsubmit%2Froute.ts&appDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmariavinnik%2Funfinished-conversation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();