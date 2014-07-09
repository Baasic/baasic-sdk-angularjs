# Baasic AngularJS Client Library

The Baasic AngularJS library provides integration access to the Baasic Service [REST API](https://api.baasic.com). Library will provide 

## Dependencies

Baasic AngularJS library has the following dependencies 

* [AngularJS](http://www.angularjs.org/)(>= 1.2.16)
* [HAL Parser](https://github.com/jasonaden/angular-hal)
* [URI Template](https://github.com/fxa/uritemplate-js)

## Usage

This section will describe how to add the Baasic AngularJS library to your project. If you learn best by example please move forward to the [Demo Section](#demo)

### Add the Library to Your Project

It is recommended to server the library from the CDN (Content Delivery Network) but note that this isn't requred. Please add the following lines of code after loading the AngularJS. 

    <script src='//cdn.net/js/hal-parser.js'></script>
    <script src='//cdn.net/js/uritemplate-min.js'></script>
	<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>

### Initialize

To use the library you need to add the Baasic (_baasic.baasicApi_) dependency to your Angular module. This will allow you to use library services described in the [Services Section](#services).

	 angular.module('my-module', ["baasic.baasicApi"])		

### Application Configuration

Baasic AngularJS library allows you to use multiple Baasic applications in your AngularJS modules. To initialize Baasic application you need to add the following code to you module configuration.

		module.config(["baasicAppProvider",
			function (baasicAppProvider) {
				var app = baasicAppProvider.create("my-app-identifier", {
                    apiRootUrl: "api.baasic.com",
                    apiVersion: "production"
                });
			}]);


**Note:** _To obtain Baasic Application Identifier please create your application on [Baasic Registration](https://dashboard.baasic.com/register/) page._

## Services

### Baasic Module Architecture

* Route Service
* Main Service
* Options - Params
* HAL links

### Membership

* Login Service
* Password Recovery Service
* Authorization Service

### Key Value Module

### Value Set Module

### Key Value Module

### General Services, Directives etc.

## Quick Start Guide

## Demo

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder 
3. Run __npm install__
4. Install gulp globally: __npm install -g gulp__ 
5. Run __gulp__