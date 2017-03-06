﻿/* exported module */
/** 
 * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.  An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.article` module functionality it must be added as a dependency to your app.
 * @copyright (c) 2017 Mono Ltd
 * @license MIT
 * @author Mono Ltd
 * @module baasic.article
 * @example
(function (Main) {
  'use strict';
  var dependencies = [
    'baasic.api',
    'baasic.membership',
    'baasic.security',
    'baasic.appSettings',
    'baasic.article',
    'baasic.dynamicResource',
    'baasic.keyValue',
    'baasic.valueSet'
  ];
  Main.module = angular.module('myApp.Main', dependencies);
}
  (MyApp.Modules.Main = {})); 
*/
var module = angular.module('baasic.article', ['baasic.api']);
