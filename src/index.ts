import * as angular from "angular";
import * as services from "./services";

var apiModule = angular.module("baasic.api", []);
services.register(apiModule);




