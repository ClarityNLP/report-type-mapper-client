"use strict";angular.module("myApp.users.all",[]).controller("UsersAllCtrl",["$scope","$http","userProfile","Services","toastr",function(t,e,s,i,n){t.userProfile=s,t.activateUser=function(e){console.log("user: ",e),i.activateUser(e).then(function(s){console.log("response: ",s),t.users.forEach(function(t){t.id==e.id&&(t.roles=s.data.roles)}),e.activated?n.success("User has been activated and notified via email."):n.success("User has been deactivated and notified via email.")}).catch(function(t){}).finally(function(){})},i.getUsers().then(function(e){var s=e.data;s.forEach(function(t){t.activated=t.roles.indexOf("ROLE_PENDING_USER")<0}),t.users=s}).catch(function(t){}).finally(function(){})}]),angular.module("myApp.users.delete",[]).controller("UsersDeleteCtrl",["$scope","$http","userProfile","Services","$stateParams","$state",function(t,e,s,i,n,a){t.userProfile=s,t.userId=n.userId,t.deleteUser=function(t){console.log("userId: ",t),i.deleteUser(t).then(function(t){a.go("app.users.all")}).catch(function(t){}).finally(function(){})}}]),angular.module("myApp.list.edit",[]).controller("ListEditCtrl",["$scope","$http","$stateParams",function(t,e,s){}]),angular.module("myApp.list.delete",[]).controller("ListDeleteCtrl",["$scope","$http","$stateParams",function(t,e,s){}]),angular.module("myApp.list.create",["bootstrap.fileField"]).controller("ListCreateCtrl",["$scope","$http","$state","$stateParams","userProfile","Services","EnvironmentConfig",function(t,e,s,i,n,a,l){t.userProfile=n,t.instituteId=i.instituteId,a.getInstituteName(i.instituteId).then(function(e){t.instituteName=e.data,console.log("response: ",e)}).catch(function(t){console.log("problem getting institute name.")}).finally(function(){}),t.createList=function(){var n=new FormData;n.append("name",t.list.name),n.append("reportTypes",t.list.reportTypes),e.post(l.API_URL+"/institutes/"+i.instituteId+"/lists",n,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(t){s.go("app.list.all",{instituteId:i.instituteId})})}}]).directive("fileread",[function(){return{scope:{fileread:"="},link:function(t,e,s){e.bind("change",function(e){var s=new FileReader;s.onload=function(e){t.$apply(function(){t.fileread=e.target.result})},s.readAsDataURL(e.target.files[0])})}}}]),angular.module("myApp.list.all",[]).controller("ListAllCtrl",["$scope","$http","$stateParams","userProfile","Services","EnvironmentConfig",function(t,e,s,i,n,a){t.userProfile=i,t.instituteId=s.instituteId,n.getInstituteName(s.instituteId).then(function(e){t.instituteName=e.data,console.log("response: ",e)}).catch(function(t){console.log("problem getting institute name.")}).finally(function(){}),e.get(a.API_URL+"/institutes/"+s.instituteId+"/lists").then(function(e){t.lists=e.data}).catch(function(t){toastr.error("An unexpected error occurred, please try again","Error",{closeButton:!0})}).finally(function(){})}]),angular.module("myApp.institutes.delete",[]).controller("InstitutesDeleteCtrl",["$scope","$stateParams","userProfile","Services","$state",function(t,e,s,i,n){t.userProfile=s,t.deleteInstitute=function(){i.deleteInstitute(e.instituteId).then(function(t){n.go("app.institute")}).catch(function(t){console.log("problem deleting institute...")}).finally(function(){})}}]),angular.module("myApp.institutes.edit",[]).controller("InstitutesEditCtrl",["$scope","$stateParams","Services","$state","userProfile",function(t,e,s,i,n){t.userProfile=n,t.instituteAlreadyExists=!1,s.getInstitute(e.instituteId).then(function(e){t.instituteName=e.data.name}).catch(function(t){console.log("problem getting institute")}).finally(function(){}),t.editInstitute=function(){s.editInstitute({name:t.instituteName,instituteId:e.instituteId}).then(function(t){i.go("app.institutes.all")}).catch(function(e){t.instituteAlreadyExists=!0}).finally(function(){})}}]),angular.module("myApp.institutes.create",["bootstrap.fileField"]).controller("InstitutesCreateCtrl",["$scope","$state","userProfile","Services",function(t,e,s,i){t.userProfile=s,t.instituteAlreadyExists=!1,t.createInstitute=function(){i.createInstitute(t.instituteName).then(function(s){t.instituteAlreadyExists=!1,t.instituteName="",e.go("app.institutes.all")}).catch(function(e){t.instituteAlreadyExists=!0}).finally(function(){})}}]),angular.module("myApp.institutes.all",[]).controller("InstitutesAllCtrl",["$scope","userProfile","Services",function(t,e,s){t.userProfile=e,s.getInstitutes().then(function(e){console.log("success getting institutes..."),t.institutes=e.data}).catch(function(t){console.log("error")}).finally(function(){})}]),angular.module("myApp.users",["myApp.users.all","myApp.users.delete"]),angular.module("myApp.token",[]).controller("TokenCtrl",["$scope","$http","userProfile","Services",function(t,e,s,i){t.userProfile=s,i.getToken().then(function(e){t.apiToken=e.data}).catch(function(t){}).finally(function(){})}]),angular.module("myApp.register",[]).controller("RegisterCtrl",["$scope","Services","Auth","userProfile","$state",function(t,e,s,i,n){e.getInstitutes().then(function(e){t.institutes=e.data,t.registerForm.selectedInstitute=e.data[0]}).catch(function(t){console.log("error: ",t)}).finally(function(){}),t.registerForm={},t.register=function(){s.signUp(t.registerForm).then(function(t){return i.$refresh()}).then(function(){n.go("app.pending")}).catch(function(e){400==e.status?t.registerForm.errors="Please enter all required fields":t.registerForm.errors="There was an unexpected problem. Please try again."})}}]),angular.module("myApp.tag",[]).controller("TagCtrl",["$scope","$http","userProfile","Services","EnvironmentConfig",function(t,e,s,i,n){t.userProfile=s,t.tagAlreadyExists=!1,t.fileFormat="simple",t.createTags=function(){var s=new FormData;s.append("tagFile",t.tagFile),s.append("fileFormat",t.fileFormat),e.post(n.API_URL+"/uploadLoincDocumentOntologyCSV",s,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).then(function(t){console.log("upload success..."),console.log("response: ",t)})},t.createTag=function(){i.createTag(t.tagName).then(function(e){t.numTags=t.numTags+1,t.tagAlreadyExists=!1,t.tagName=""}).catch(function(e){t.tagAlreadyExists=!0}).finally(function(){})},i.getTagCount().then(function(e){console.log("tag count: ",e),t.numTags=e.data.count}).catch(function(t){console.log("problem getting tag count")}).finally(function(){})}]),angular.module("myApp.pending",[]).controller("PendingCtrl",["$scope","$http","toastr","$state","userProfile","Auth",function(t,e,s,i,n,a){console.log("loading pending ctrl.")}]),angular.module("myApp.nav",[]).controller("NavCtrl",["$scope","userProfile",function(t,e){t.userProfile=e}]),angular.module("myApp.map",["ngLodash"]).controller("MapCtrl",["$scope","lodash","$stateParams","userProfile","Services",function(t,e,s,i,n){var a,l;t.userProfile=i,t.reportTypePage=0,t.showLoader=!1,t.isUntaggedOnlySelected=!1,a={instituteId:s.instituteId,listId:s.listId,reportTypePage:t.reportTypePage,reportTypeQuery:"",untaggedOnly:t.isUntaggedOnlySelected?t.isUntaggedOnlySelected:""},n.getReportTypes(a).then(function(e){t.numReportTypeResults=e.data.numResults,console.log("response: ",e),t.report_types=e.data.reportTypes,30==e.data.reportTypes.length?t.showLoader=!0:t.showLoader=!1}).catch(function(t){console.log("error")}).finally(function(){}),l={instituteId:s.instituteId,listId:s.listId,tagQuery:""},n.getTags(l).then(function(e){t.numTagResults=e.data.numResults,t.tags=e.data.tags}).catch(function(t){console.log("problem getting tags.")}).finally(function(){}),t.searchReportType=function(e){t.isAllSelected=!1,t.isUntaggedOnlySelected=!1,t.reportTypePage=0;var i={instituteId:s.instituteId,listId:s.listId,reportTypePage:t.reportTypePage,reportTypeQuery:t.reportTypeQuery,untaggedOnly:t.isUntaggedOnlySelected?t.isUntaggedOnlySelected:""};n.getReportTypes(i).then(function(e){t.numReportTypeResults=e.data.numResults,t.report_types=e.data.reportTypes,30==e.data.reportTypes.length?t.showLoader=!0:t.showLoader=!1}).catch(function(t){console.log("error")}).finally(function(){console.log("either way...")})},t.searchTag=function(e){var i={instituteId:s.instituteId,listId:s.listId,tagQuery:t.tagQuery};n.getTags(i).then(function(e){t.numTagResults=e.data.numResults,t.tags=e.data.tags}).catch(function(t){console.log("error")}).finally(function(){console.log("either way...")})},t.addTag=function(e){if(t.isAllSelected){_.forEach(t.report_types,function(t){var s=_.some(t.tags,{id:e.id});t.selected&&!s&&t.tags.push(e)});var i={instituteId:s.instituteId,listId:s.listId,tagId:e.id,reportTypeQuery:t.reportTypeQuery};n.allSelectedAddTag(i).then(function(t){}).catch(function(t){console.log("error")}).finally(function(){})}else _.forEach(t.report_types,function(t){var i=_.some(t.tags,{id:e.id});if(t.selected&&!i){t.tags.push(e);var a={instituteId:s.instituteId,listId:s.listId,tagId:e.id,reportTypeId:t.id};n.addTag(a).then(function(t){}).catch(function(t){console.log("error")}).finally(function(){})}})},t.bulkRemoveTag=function(e){if(t.isAllSelected){_.forEach(t.report_types,function(t){var s=_.some(t.tags,{id:e.id});t.selected&&s&&_.remove(t.tags,{id:e.id})});var i={instituteId:s.instituteId,listId:s.listId,tagId:e.id,reportTypeQuery:t.reportTypeQuery};n.allSelectedRemoveTag(i).then(function(t){}).catch(function(t){console.log("error")}).finally(function(){})}else _.forEach(t.report_types,function(t){var i=_.some(t.tags,{id:e.id});if(t.selected&&i){_.remove(t.tags,{id:e.id});var a={instituteId:s.instituteId,listId:s.listId,tagId:e.id,reportTypeId:t.id};n.removeTag(a).then(function(t){}).catch(function(t){console.log("error")}).finally(function(){})}})},t.selectReportType=function(e){e.selected&&_.forEach(t.tags,function(t){t.selected=!1})},t.deleteTag=function(e,i){_.forEach(t.report_types,function(t){if(t.id==e&&_.some(t.tags,{id:i})){_.remove(t.tags,{id:i});var a={instituteId:s.instituteId,listId:s.listId,tagId:i,reportTypeId:e};n.removeTag(a).then(function(t){}).catch(function(t){console.log("error")}).finally(function(){})}})},t.instituteId=s.instituteId,n.getInstituteName(s.instituteId).then(function(e){t.instituteName=e.data}).catch(function(t){console.log("problem getting institute name.")}).finally(function(){}),t.toggleAllReportTypes=function(){var e=t.isAllSelected;angular.forEach(t.report_types,function(t){t.selected=e})},t.reportTypeToggled=function(){t.isAllSelected=t.report_types.every(function(t){return t.selected})},t.toggleHideTags=function(){console.log("hiding tags...")},t.toggleUntaggedOnly=function(){t.isAllSelected=!1,t.reportTypePage=0;var e={instituteId:s.instituteId,listId:s.listId,reportTypePage:t.reportTypePage,reportTypeQuery:t.reportTypeQuery?t.reportTypeQuery:"",untaggedOnly:t.isUntaggedOnlySelected?t.isUntaggedOnlySelected:""};n.getReportTypes(e).then(function(e){t.numReportTypeResults=e.data.numResults,t.report_types=e.data.reportTypes,console.log("response: ",e),e.data.reportTypes.length>0?t.showLoader=!0:t.showLoader=!1}).catch(function(t){console.log("error")}).finally(function(){console.log("either way...")})},t.loaderInView=function(e,i,a){var l=a.parts;if(l&&l.bottom&&l.left&&l.right&&l.top){t.reportTypePage=t.reportTypePage+1;var o={instituteId:s.instituteId,listId:s.listId,reportTypePage:t.reportTypePage,reportTypeQuery:t.reportTypeQuery?t.reportTypeQuery:"",untaggedOnly:t.isUntaggedOnlySelected?t.isUntaggedOnlySelected:""};n.getReportTypes(o).then(function(e){_.forEach(e.data.reportTypes,function(e){t.report_types.push(Object.assign({},e,{selected:t.isAllSelected}))}),30==e.data.reportTypes.length?t.showLoader=!0:t.showLoader=!1}).catch(function(t){console.log("error")}).finally(function(){console.log("either way...")})}}}]),angular.module("myApp.logout",[]).controller("LogoutCtrl",["$scope","userProfile","Auth",function(t,e,s){s.logout().then(function(){return e.$refresh()})}]),angular.module("myApp.login",[]).controller("LoginCtrl",["$scope","$state","$stateParams","userProfile","Auth",function(t,e,s,i,n){t.loginForm={loading:!1},t.message=s.message,t.submitLoginForm=function(){t.loginForm.loading=!0,n.signIn(t.loginForm.credentials).then(function(){return i.$refresh()}).then(function(){i.$hasRole("ROLE_ADMIN")?(console.log("is admin..."),e.go("app.institutes.all")):(console.log("is not admin..."),e.go("app.lists.all",{instituteId:i.institute.id}))}).catch(function(){t.loginForm.loading=!1,t.loginForm.errors="Please enter correct email/password"})}}]),angular.module("myApp.list",["myApp.list.all","myApp.list.create","myApp.list.delete","myApp.list.edit"]),angular.module("myApp.institutes",["myApp.institutes.all","myApp.institutes.create","myApp.institutes.delete","myApp.institutes.edit"]),angular.module("myApp.services",[]).service("Services",["$http","EnvironmentConfig",function(t,e){this.getReportTypes=function(s){return t.get(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/reportTypes?page="+s.reportTypePage+"&query="+s.reportTypeQuery+"&untaggedOnly="+s.untaggedOnly)},this.getToken=function(){return t.get(e.API_URL+"/getToken")},this.getTags=function(s){return t.get(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/tags?query="+s.tagQuery)},this.addTag=function(s){var i={reportTypeId:s.reportTypeId,tagId:s.tagId};return t.post(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/addTag",i)},this.allSelectedAddTag=function(s){var i={reportTypeQuery:s.reportTypeQuery,tagId:s.tagId};return t.post(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/allSelectedAddTag",i)},this.removeTag=function(s){var i={reportTypeId:s.reportTypeId,tagId:s.tagId};return t.post(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/removeTag",i)},this.allSelectedRemoveTag=function(s){var i={reportTypeQuery:s.reportTypeQuery,tagId:s.tagId};return t.post(e.API_URL+"/institutes/"+s.instituteId+"/lists/"+s.listId+"/allSelectedRemoveTag",i)},this.createTag=function(s){return t.post(e.API_URL+"/tags",{name:s})},this.getTagCount=function(){return t.get(e.API_URL+"/tags/count")},this.getInstitutes=function(){return t.get(e.API_URL+"/institutes")},this.createInstitute=function(s){return t.post(e.API_URL+"/institutes",{name:s})},this.getInstitute=function(s){return t.get(e.API_URL+"/institutes/"+s)},this.editInstitute=function(s){return t.post(e.API_URL+"/institutes/"+s.instituteId,{name:s.name})},this.deleteInstitute=function(s){return t.delete(e.API_URL+"/institutes/"+s)},this.getInstituteName=function(s){return t.get(e.API_URL+"/institutes/"+s+"/name")},this.getUsers=function(){return t.get(e.API_URL+"/users")},this.activateUser=function(s){return t.post(e.API_URL+"/users/"+s.id+"/activate",{activate:s.activated})},this.deleteUser=function(s){return t.delete(e.API_URL+"/users/"+s)}}]),angular.module("myApp.config",[]).constant("EnvironmentConfig",{API_URL:"http://report-type-mapper.hdap.gatech.edu:1338"}),angular.module("myApp.UserProfile",[]).factory("UserProfile",["Auth",function(t){var e={},s=function(){return t.getProfile().then(function(t){return function(){for(var t in e)e.hasOwnProperty(t)&&delete e[t]}(),angular.extend(e,t.data,{$refresh:s,$hasRole:function(t){return!!e.roles&&e.roles.indexOf(t)>=0},$hasAnyRole:function(t){return!!e.roles.filter(function(e){return t.indexOf(e)>=0}).length},$isAnonymous:function(){return e.anonymous},$isAuthenticated:function(){return e.userId},$isPending:function(){return!!e.roles&&e.roles.indexOf("ROLE_PENDING_USER")>=0}})})};return s()}]),angular.module("myApp.Auth",[]).service("Auth",["$http","EnvironmentConfig",function(t,e){this.getProfile=function(){return t.get(e.API_URL+"/me")},this.signIn=function(s){return t.post(e.API_URL+"/login",s).then(function(t){})},this.signUp=function(s){return t.post(e.API_URL+"/signup",s)},this.logout=function(){return t.get(e.API_URL+"/logout")}}]),angular.module("myApp.Access",[]).factory("Access",["$q","UserProfile",function(t,e){var s={OK:200,UNAUTHORIZED:401,FORBIDDEN:403,hasRole:function(i){return e.then(function(e){return e.$hasRole(i)?s.OK:e.$isAnonymous()?t.reject(s.UNAUTHORIZED):t.reject(s.FORBIDDEN)})},hasAnyRole:function(i){return e.then(function(e){return e.$hasAnyRole(i)?s.OK:e.$isAnonymous()?t.reject(s.UNAUTHORIZED):t.reject(s.FORBIDDEN)})},isAnonymous:function(){return e.then(function(e){return e.$isAnonymous()?s.OK:t.reject(s.FORBIDDEN)})},isAuthenticated:function(){return e.then(function(e){return e.$isAuthenticated()&&!e.$isPending()?s.OK:e.$isPending()?t.reject(s.PENDING_ADMIN_APPROVAL):t.reject(s.UNAUTHORIZED)})}};return s}]),angular.module("app",["ui.router","toastr","ngAnimate","LocalStorageModule","myApp.config","myApp.map","myApp.tag","myApp.token","myApp.users","myApp.login","myApp.logout","myApp.register","myApp.list","myApp.pending","myApp.institutes","myApp.Access","myApp.Auth","myApp.services","myApp.UserProfile","myApp.nav"]).config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("app",{abstract:!0,templateUrl:"app/views/app.html",resolve:{userProfile:"UserProfile"}}).state("app.login",{url:"/login",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/login/login.html",controller:"LoginCtrl"}},params:{message:null}}).state("app.register",{url:"/register",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/register/register.html",controller:"RegisterCtrl"}}}).state("app.logout",{url:"/logout",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html"},"main@app":{templateUrl:"app/views/logout/logout.html",controller:"LogoutCtrl"}}}).state("app.users",{abstract:!0}).state("app.users.all",{url:"/users",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/users/all/all.html",controller:"UsersAllCtrl"}},resolve:{access:["Access",function(t){return t.hasRole("ROLE_ADMIN")}]}}).state("app.users.delete",{url:"/users/:userId/delete",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/users/delete/delete.html",controller:"UsersDeleteCtrl"}},resolve:{access:["Access",function(t){return t.hasRole("ROLE_ADMIN")}]}}).state("app.institutes",{abstract:!0}).state("app.institutes.all",{url:"/institutes",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/institutes/all/all.html",controller:"InstitutesAllCtrl"}},resolve:{access:["Access",function(t){return t.hasRole("ROLE_ADMIN")}]}}).state("app.institutes.create",{url:"/institutes/create",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/institutes/create/create.html",controller:"InstitutesCreateCtrl"}}}).state("app.institutes.delete",{url:"/institutes/:instituteId/delete",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/institutes/delete/delete.html",controller:"InstitutesDeleteCtrl"}}}).state("app.institutes.edit",{url:"/institutes/:instituteId/edit",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/institutes/edit/edit.html",controller:"InstitutesEditCtrl"}}}).state("app.map",{url:"/institutes/:instituteId/lists/:listId/map",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/map/map.html",controller:"MapCtrl"}},resolve:{access:["Access",function(t){return t.isAuthenticated()}]}}).state("app.tags",{url:"/tags",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/tag/tag.html",controller:"TagCtrl"}},resolve:{access:["Access",function(t){return t.isAuthenticated()}]}}).state("app.token",{url:"/token",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/token/token.html",controller:"TokenCtrl"}},resolve:{access:["Access",function(t){return t.isAuthenticated()}]}}).state("app.list",{abstract:!0}).state("app.list.all",{url:"/institutes/:instituteId/lists",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/list/all/all.html",controller:"ListAllCtrl"}},resolve:{access:["Access",function(t){return t.isAuthenticated()}]}}).state("app.list.create",{url:"/institutes/:instituteId/lists/create",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/list/create/create.html",controller:"ListCreateCtrl"}},resolve:{access:["Access",function(t){return t.isAuthenticated()}]}}).state("app.list.delete",{url:"/institute/:instituteId/list/:listId/delete",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/list/delete/delete.html",controller:"ListDeleteCtrl"}}}).state("app.list.edit",{url:"/institute/:instituteId/list/:listId/edit",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/list/edit/edit.html",controller:"ListEditCtrl"}}}).state("app.pending",{url:"/pending",views:{"nav@app":{templateUrl:"app/views/nav/main-nav.html",controller:"NavCtrl"},"main@app":{templateUrl:"app/views/pending/pending.html",controller:"PendingCtrl"}}}),e.otherwise("/login")}]).config(["$locationProvider","$httpProvider",function(t,e){t.hashPrefix("!"),e.defaults.withCredentials=!0}]).run(["$rootScope","Access","$state","$log",function(t,e,s,i){t.$on("$stateChangeError",function(t,n,a,l,o,r){switch(console.log("state error triggered!!!"),r){case e.UNAUTHORIZED:console.log("unauth!!!"),s.go("app.login",{message:"You are unauthorized to do that."});break;case e.FORBIDDEN:console.log("forbidden!!!"),s.go("app.login",{message:"You lack privileges to do that."});break;case e.PENDING_ADMIN_APPROVAL:s.go("app.pending");break;default:i.warn("$stateChangeError event catched")}})}]),angular.module("app").run(["$templateCache",function(t){t.put("app/views/app.html","<div ui-view=nav></div><div ui-view=main class=main></div>"),t.put("app/views/login/login.html",'<section class=section><div class=container><div class="columns is-centered"><div class="column is-half"><nav class=panel><p class=panel-heading>Login</p><div class=panel-block style=display:block><div class="notification is-warning login-warning" ng-show=message>{{message}}</div><div class=field><p class="control has-icons-left has-icons-right"><input class=input type=email placeholder=Email ng-model=loginForm.credentials.email> <span class="icon is-small is-left"><i class="fa fa-envelope"></i> </span><span class="icon is-small is-right"><i class="fa fa-check"></i></span></p></div><div class=field><p class="control has-icons-left"><input class=input type=password placeholder=Password ng-model=loginForm.credentials.password> <span class="icon is-small is-left"><i class="fa fa-lock"></i></span></p></div><div class=field><p class=control><button class="button is-link is-large is-outlined is-fullwidth" ng-class="loginForm.loading ? \'is-loading\' : \'\'" ng-click=submitLoginForm()>Login</button></p></div><div class="notification is-danger" ng-show=loginForm.errors>{{loginForm.errors}}</div></div></nav></div></div></div></section>'),t.put("app/views/logout/logout.html",'<section class=section><div class=container><div class="notification is-link">You have been logged out.</div></div></section>'),t.put("app/views/map/map.html",'<section class=section><div class=container><nav class="breadcrumb has-arrow-separator" aria-label=breadcrumbs><ul><li><a href=#>{{instituteName}}</a></li><li><a href=/#!/institutes/{{instituteId}}/lists>Lists</a></li><li class=is-active><a href=# aria-current=page>Map</a></li></ul></nav><div class=columns><div class="column report-type-list"><nav class=panel><p class=panel-heading>Report Types <span class="tag is-light">{{numReportTypeResults}}&nbsp;results</span></p><div class=panel-block><p class="control has-icons-left"><input class="input is-small" type=text placeholder=search ng-model=reportTypeQuery ng-keyup=searchReportType($event)> <span class="icon is-small is-left"><i class="fa fa-search"></i></span></p></div><div class=panel-block><input type=checkbox ng-model=isAllSelected ng-click=toggleAllReportTypes()> <span class=modifier>Select All</span> <input type=checkbox ng-model=isUntaggedOnlySelected ng-click=toggleUntaggedOnly()> <span class=modifier>Untagged Only</span> <input type=checkbox ng-model=isHideTagsSelected ng-click=toggleHideTags()> <span class=modifier>Hide Tags</span></div><div id=report-type-list in-view-container><div class="panel-block report_type-panel-block" data-id={{report_type.id}} ng-repeat="report_type in report_types"><div class=report_type-info ng-class="{\'hide-tags\': isHideTagsSelected}"><input type=checkbox ng-model=report_type.selected ng-click=selectReportType(report_type) ng-change=reportTypeToggled()> <span>{{report_type.name}}</span> <span class="tag is-danger just-tag-count" ng-show="isHideTagsSelected && report_type.tags.length > 0">{{report_type.tags.length}}</span></div><div class="field is-grouped is-grouped-multiline tag-list" ng-if=!isHideTagsSelected><div class=control data-id={{tag.id}} ng-repeat="tag in report_type.tags"><div class="tags has-addons"><span class=tag>{{tag.documentSubjectMatterDomain}}</span> <span class="tag is-danger cross" ng-click=deleteTag(report_type.id,tag.id)><i class="fa fa-times"></i></span></div></div></div></div><div class="panel-block report-types-loader-block" in-view=loaderInView($index,$inview,$inviewInfo) in-view-options="{ generateParts: true }" ng-if=showLoader><div class=loader-text><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;<span>Loading...</span></div></div></div></nav></div><div class=column><nav id=tags class=panel><p class=panel-heading>Tags <span class="tag is-light">{{numTagResults}}&nbsp;results</span></p><div class=panel-block><p class="control has-icons-left"><input class="input is-small" type=text placeholder="search tags" ng-model=tagQuery ng-keyup=searchTag($event)> <span class="icon is-small is-left"><i class="fa fa-search"></i></span></p></div><div id=tag-list><div class=panel-block data-id={{tag.id}} ng-repeat="tag in tags"><a class="button is-info is-outlined is-small" ng-click=addTag(tag)>Add Tag</a>&nbsp;&nbsp; <a class="button is-danger is-outlined is-small" ng-click=bulkRemoveTag(tag)>Remove Tag</a>&nbsp;&nbsp; <span>{{tag.documentSubjectMatterDomain}}</span></div></div></nav></div></div></div></section>'),t.put("app/views/nav/main-nav.html",'\x3c!-- NAV --\x3e<nav id=navbar class="navbar is-fixed-top" style="transform: translateY(0px);"><div id=specialShadow class=bd-special-shadow style="opacity: 1; transform: scaleY(1);"></div><div class=container><div class=navbar-brand><a class=navbar-item href=/ ><span>Report Type Mapper</span></a><div id=navbarBurger class="navbar-burger burger" data-target=navMenuDocumentation><span></span> <span></span> <span></span></div></div><div id=navMenuDocumentation class=navbar-menu><div class=navbar-end><a class=navbar-item href=/#!/users ng-show="userProfile.$hasRole(\'ROLE_ADMIN\')">Users </a><a class=navbar-item><span class="tag is-danger is-medium" ng-show="userProfile.$hasRole(\'ROLE_ADMIN\')">Admin</span> </a><a class=navbar-item href=/#!/institutes ng-show="userProfile.$hasRole(\'ROLE_ADMIN\')">Institutes </a><a class=navbar-item href=/#!/tags ng-show="userProfile.$hasRole(\'ROLE_ADMIN\')">Tags</a><div class="navbar-item has-dropdown is-hoverable" ng-show=userProfile.$isAuthenticated()><a class=navbar-link href=/#!/token>Settings</a><div class=navbar-dropdown><a class=navbar-item href=/#!/token>API Token </a><a class=navbar-item href=/#!/logout>Logout</a></div></div><div class=navbar-item ng-hide=userProfile.$isAuthenticated()><div class="field is-grouped"><p class=control><a class="is-link is-outlined button" href=#!/register><span class=icon><i class="fa fa-user-plus"></i> </span><span>Register</span></a></p><p class=control><a class="button is-primary" href=#!/login><span class=icon><i class="fa fa-sign-in"></i> </span><span>Login</span></a></p></div></div></div></div></div></nav>'),t.put("app/views/pending/pending.html",'<section class=section><div class=container><div class="notification is-success">Thank you for registering. Your account activation is pending admin approval. After approval, you will be emailed and you will then be able to login and access your account.</div></div></section>'),t.put("app/views/register/register.html",'<section class=section><div class=container><div class="columns is-centered"><div class="column is-half"><nav class=panel><p class=panel-heading>Register</p><div class=panel-block style=display:block><div class=field><div class=control><input class=input type=text placeholder="First name" ng-model=registerForm.firstName></div></div><div class=field><div class=control><input class=input type=text placeholder="Last name" ng-model=registerForm.lastName></div></div><div class=field><div class=control><div class=select style=display:block;><select style=width:100%; ng-model=registerForm.selectedInstitute ng-options="institute.name for institute in institutes track by institute.id">\x3c!-- <option ng-repeat="institute in institutes" ng-value="{{institute.id}}">{{institute.name}}</option> --\x3e</select></div></div></div><div class=field><p class="control has-icons-left has-icons-right"><input class=input type=email placeholder=Email ng-model=registerForm.email> <span class="icon is-small is-left"><i class="fa fa-envelope"></i> </span><span class="icon is-small is-right"><i class="fa fa-check"></i></span></p></div><div class=field><p class="control has-icons-left"><input class=input type=password placeholder=Password ng-model=registerForm.password> <span class="icon is-small is-left"><i class="fa fa-lock"></i></span></p></div><div class=field><p class=control><button class="button is-link is-large is-outlined is-fullwidth" ng-click=register()>Register</button></p></div><div class="notification is-danger" ng-show=registerForm.errors>{{registerForm.errors}}</div></div></nav></div></div></div></section>'),t.put("app/views/token/token.html","<section class=section><div class=container><div class=columns><div class=column><p>Token: <b>{{apiToken}}</b></p></div><div class=column></div></div></div></section>"),t.put("app/views/tag/tag.html",'<section class=section><div class=container><div class=columns><div class=column><h3 class="title is-3">Add Tags <span class="tag is-light">Total: {{numTags}}</span></h3>\x3c!-- <div class="field is-grouped">\n          <p class="control is-expanded">\n            <input class="input" type="text" placeholder="Add a tag" ng-model="tagName"/>\n          </p>\n          <p class="control">\n            <a class="button is-primary" ng-click="createTag()">\n              Create\n            </a>\n          </p>\n        </div>\n        <p class="help is-danger" ng-show="tagAlreadyExists">The tag already exists.</p> --\x3e<form ng-submit=createTags()><div class=field><label class=label>Upload LOINC Ontology Document</label>\x3c!-- <div class="control">\n              <div class="file has-name">\n                <label class="file-label">\n                  <input class="file-input" type="file" fileread="list.reportTypes">\n                  <span class="file-cta">\n                    <span class="file-icon">\n                      <i class="fa fa-upload"></i>\n                    </span>\n                    <span class="file-label">\n                      Choose a file…\n                    </span>\n                  </span>\n                </label>\n              </div>\n            </div> --\x3e\x3c!-- <p class="help">Select a csv file to upload report types</p> --\x3e\x3c!-- <div class="control"> --\x3e<file-field class=button ng-model=tagFile>Select file</file-field>\x3c!-- </div> --\x3e</div><div class=field><label class=label>File Format</label><div class=control><label class=radio><input type=radio ng-model=fileFormat value=simple> Simple</label> <label class=radio><input type=radio ng-model=fileFormat value=complex> Complex</label></div></div><div class=field><div class=control><input type=submit class="button is-link"></div></div></form></div><div class=column></div></div></div></section>'),t.put("app/views/institutes/all/all.html",'<section class=section><div class=container><h3 class="title is-3">Institutes</h3><table class="table is-bordered is-fullwidth is-narrow is-striped" ng-show="institutes.length > 0"><thead><tr><th>Name</th><th># of Lists</th><th>Action</th></tr></thead><tbody><tr ng-repeat="institute in institutes"><td>{{institute.name}}</td><td>{{institute.lists.length}}</td><td><a class="button is-small is-info is-outlined" href=/#!/institutes/{{institute.id}}/lists>View Lists</a> <a class="button is-small is-info is-outlined" href=/#!/institutes/{{institute.id}}/edit>Edit</a> <a class="button is-small is-info is-outlined" href=/#!/institutes/{{institute.id}}/delete>Delete</a></td></tr></tbody></table><div class="notification is-warning" ng-show="institutes.length == 0">The are currently no institutes to show. <strong>Try creating an institute below.</strong> The institute will then become available to choose during user registration.</div><a class="button is-success" href=/#!/institutes/create>Create Institute</a></div></section>'),t.put("app/views/institutes/create/create.html",'<section class=section><div class=container><div class=columns><div class=column><h3 class="title is-3">Institutes</h3><div class="field is-grouped"><p class="control is-expanded"><input class=input type=text placeholder="Enter institute name" ng-model=instituteName></p><p class=control><a class="button is-primary" ng-click=createInstitute()>Create</a></p></div><p class="help is-danger" ng-show=instituteAlreadyExists>The institute already exists.</p></div><div class=column></div></div></div></section>'),t.put("app/views/institutes/delete/delete.html",'<section class=section><div class=container><div class=columns><div class=column><h3 class="title is-6">Are you sure you want to delete this institute?</h3><a class="button is-danger" ng-click=deleteInstitute()>Delete</a></div><div class=column></div></div></div></section>'),t.put("app/views/institutes/edit/edit.html",'<section class=section><div class=container><div class=columns><div class=column><h3 class="title is-3">Edit Institute</h3><div class="field is-grouped"><p class="control is-expanded"><input class=input type=text placeholder="Edit institute name" ng-model=instituteName></p><p class=control><a class="button is-primary" ng-click=editInstitute()>Edit</a></p></div><p class="help is-danger" ng-show=instituteAlreadyExists>The institute already exists.</p></div><div class=column></div></div></div></section>'),t.put("app/views/list/all/all.html",'<section class=section><div class=container><nav class="breadcrumb has-arrow-separator" aria-label=breadcrumbs><ul><li><a>{{instituteName}}</a></li><li class=is-active><a href=/#!/institutes/{{instituteId}}/lists>Lists</a></li></ul></nav><table class="table is-bordered is-fullwidth is-narrow is-striped" ng-show="lists.length > 0"><thead><tr><th>Name</th><th># of Report Types</th><th>Action</th></tr></thead><tbody><tr ng-repeat="list in lists"><td>{{list.name}}</td><td>{{list.numOfReportTypes}}</td><td><a class="button is-small is-info is-outlined" href=/#!/institutes/{{list.institute}}/lists/{{list.id}}/map>Map</a> <a class="button is-small is-info is-outlined" href=/#!/institutes/{{list.institute}}/lists/{{list.id}}/edit>Edit</a> <a class="button is-small is-info is-outlined" href=/#!/institutes/{{list.institute}}/lists/{{list.id}}/delete>Delete</a></td></tr></tbody></table><div class="notification is-warning" ng-show="lists.length == 0">The are currently no lists to show. <strong>Try creating a list below.</strong></div><a class="button is-success" href=/#!/institutes/{{instituteId}}/lists/create>Create List</a></div></section>'),t.put("app/views/list/create/create.html",'<section class=section><div class=container><nav class="breadcrumb has-arrow-separator" aria-label=breadcrumbs><ul><li><a>{{instituteName}}</a></li><li><a href=/#!/institutes/{{instituteId}}/lists>Lists</a></li><li class=is-active><a href=# aria-current=page>Create</a></li></ul></nav><div class=columns><div class="column is-one-third"><form ng-submit=createList()><div class=field><label class=label>Name</label><div class=control><input class=input type=text placeholder="List Name" ng-model=list.name></div></div><div class=field><label class=label>Report Type File</label>\x3c!-- <div class="control">\n              <div class="file has-name">\n                <label class="file-label">\n                  <input class="file-input" type="file" fileread="list.reportTypes">\n                  <span class="file-cta">\n                    <span class="file-icon">\n                      <i class="fa fa-upload"></i>\n                    </span>\n                    <span class="file-label">\n                      Choose a file…\n                    </span>\n                  </span>\n                </label>\n              </div>\n            </div> --\x3e\x3c!-- <p class="help">Select a csv file to upload report types</p> --\x3e\x3c!-- <div class="control"> --\x3e<file-field class=button ng-model=list.reportTypes>Select file</file-field>\x3c!-- </div> --\x3e</div><div class=field><div class=control><input type=submit class="button is-link"></div></div></form></div></div></div></section>'),t.put("app/views/list/delete/delete.html",""),t.put("app/views/list/edit/edit.html",""),t.put("app/views/users/all/all.html",'<section class=section><div class=container><table class="table table-user"><thead><tr><th>Name</th><th>Email</th><th>Roles</th><th>Institute</th><th>Activate</th><th>Actions</th></tr></thead><tbody><tr ng-repeat="user in users"><td>{{user.firstName}}&nbsp;{{user.lastName}}</td><td>{{user.email}}</td><td><span class="tag is-info role-tag" ng-repeat="role in user.roles track by $index">{{role}}</span></td><td>{{user.institute.name}}</td><td><input type=checkbox ng-model=user.activated ng-change=activateUser(user) ng-disabled="user.roles.indexOf(\'ROLE_ADMIN\') > 0"></td><td><a href=/#!/users/{{user.id}}/delete class="button is-small is-outlined is-danger" ng-disabled="user.roles.indexOf(\'ROLE_ADMIN\') > 0">Delete</a></td></tr></tbody></table></div></section>'),t.put("app/views/users/delete/delete.html",'<section class=section><div class=container><h5 class="title is-5">Are you sure you want to delete this user?</h5><div class="field is-grouped"><p class=control><a class="button is-danger" ng-click=deleteUser(userId)>Yes, delete the user.</a></p><p class=control><a class=button href=/#!/users>No, go back.</a></p></div></div></section>')}]);
//# sourceMappingURL=../maps/scripts/app-9c005d6bf6.js.map