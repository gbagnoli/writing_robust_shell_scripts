"use strict";var applause=angular.module("applauseApp",["ngAnimate","ngSanitize","hljs","ngStorage","applauseTemplates","applauseConfig"]);!function(e){try{e=angular.module("applauseTemplates")}catch(t){e=angular.module("applauseTemplates",[])}e.run(["$templateCache",function(e){e.put("views/presentation.html",'<slide>\n  <h1>Applause</h1>\n  <h4>HTML presentations powered by Angular JS</h4>\n  <ul>\n    <li>Simple and clean</li>\n    <li>Fully customizable</li>\n    <li>Useful helpers</li>\n    <li>Keyboard shortcuts\n      <ol>\n        <li><span class="key light-keys">&#9658;</span> or <span class="key light-keys">space</span> next slide</li>\n        <li><span class="key light-keys">&#9668;</span> previous  slide</li>\n        <li><span class="key light-keys">esc</span> toggle "go to" popup</li>\n      </ol>\n    </li>\n  </ul>\n</slide>\n\n<slide>\n  <h2>Why another presentation framework?</h2>\n  <p>There are plenty of presentation frameworks made with HTML, CSS and Javascript around. So why we need another one?</p>\n  <p>We probably don\'t. I\'ve started this project just because I wanted to improve my Angular JS skills.</p>\n  <blockquote><code class="inline">blockquote</code> Lorem ipsum dolor sit amet, consectetur adipisicing elit</blockquote>\n</slide>\n\n<slide>\n  <h2>Presenter mode</h2>\n  <table>\n    <tr>\n      <th>Normal view</th>\n      <th>Presenter mode</th>\n    </tr>\n    <tr>\n      <td><img src="images/slide-single.gif" alt=""/></td>\n      <td><img src="images/slide-presenter.gif" alt=""/></td>\n    </tr>\n  </table>\n  <p>In presenter mode, you can see the current and the upcoming slide.</p>\n  <p>To enter presenter mode, you just need to attach <code class="inline">?preview</code> in your URL. <a href="?preview">Try it out!</a></p>\n  <p>Slides are synchronized between tabs.</p>\n</slide>\n\n<slide>\n  <h2>Code highlighting</h2>\n  <div hljs>\n    applause.directive(\'slide\', function (Appdata) {\n      return {\n        template: \'<section class="slide" ng-transclude=""></section>\',\n        restrict: \'EA\',\n        transclude: true,\n        replace: true,\n        scope: {}\n      };\n    });\n  </div>\n  <p>You just need to add the "hljs" attribute to your element: <code class="inline">&lt;div <strong>hljs</strong>&gt;your code here&lt;/div&gt;</code></p>\n</slide>\n\n<slide markdown>\n  ##Markdown content\n\n  write your slide in markdown if you like it\n\n- list item **one**\n- list item *two*\n\nAdd the "markdown" attribute to the slide element `<code class="inline">&lt;slide <strong>markdown</strong>&gt;</code>`\n</slide>\n\n<slide bg-img="oscar.jpg" credits="TIME & LIFE Pictures http://life.time.com/?attachment_id=11373">\n  <h2 class="left">Auto fitting images</h2>\n  <p class="light-text">Add the "bg-img" attribute to your slide element:<br><code class="inline">&lt;slide <strong>bg-img</strong>="path/to/image"&gt;</code><br>without worrying about the image size.</p>\n  <p class="light-text">You can add credits too (with autolink)<br><code class="inline">&lt;slide bg.img="..." <strong>credits</strong>="..."&gt;</code></p>\n</slide>\n\n<slide>\n  <h3 class="abs-center">Add<br>class="abs-center"<br>to an item to center it</h3>\n</slide>\n\n<slide>\n  <h1>Do you like that?</h1>\n  <img class="center media" src="images/slow-clap.gif" alt=""/>\n  <p class="center">Follow me on twitter <a href="https://twitter.com/granze">@granze</a></p>\n</slide>\n')}])}(),applause.controller("DeckCtrl",["$scope","Appdata","$localStorage",function(e,t,n){e.isProgressBarVisible=t.progressBar,e.isSlideCountVisible=t.slideCount,n.$reset(),e.$storage=n.$default({currentSlide:1}),e.$watch(function(){return t},function(t){e.lastSlide=t.slides.length},!0),e.next=function(){e.$storage.currentSlide<e.lastSlide&&(e.$storage.currentSlide=e.$storage.currentSlide+=1)},e.prev=function(){e.$storage.currentSlide>1&&(e.$storage.currentSlide=e.$storage.currentSlide-=1)},e.$parent.keyup=function(t){switch(t.keyCode){case 27:e.showGoTo=!e.showGoTo;break;case 37:e.prev();break;case 32:case 39:e.next()}}}]),applause.directive("slide",["Appdata",function(e){var t=1,n=function(n){n.n=t,n.isPreviewMode=e.isPreviewMode,e.slides.push(t),t+=1};return{template:'<section class="slide" ng-class="{previous: n === $storage.currentSlide-1, current: n === $storage.currentSlide, next: n === $storage.currentSlide+1, preview: isPreviewMode}" ng-transclude fit></section>',restrict:"E",transclude:!0,replace:!0,scope:!0,link:n}}]),applause.directive("fit",["$window","Appdata",function(e,t){var n=function(n,i){n.resizeSlide=function(){var n=e.document.querySelector(".slide"),s=e.innerWidth/n.clientWidth,r=e.innerHeight/n.clientHeight,o=Math.min(s,r);t.isPreviewMode?i.css({transformOrigin:"0 0",webkitTransformOrigin:"0 0",transform:"scale("+o/2+")",webkitTransform:"scale("+o/2+")"}):i.css({transformOrigin:"left top",webkitTransformOrigin:"left top",transform:"scale("+o+") translate(-50%, -50%)",webkitTransform:"scale("+o+") translate(-50%, -50%)"})},n.resizeSlide(),angular.element(e).bind("resize",function(){n.resizeSlide(),n.$apply()})};return{link:n}}]),applause.directive("progressBar",function(){var e=function(e,t){e.$watch(function(n){var i=(e.$storage.currentSlide/n.lastSlide*100).toFixed(2);t.css("width",i+"%")})};return{template:'<div id="progress-bar"></div>',restrict:"E",replace:!0,link:e}}),applause.factory("Appdata",["config",function(e){var t=[],n=angular.fromJson(e),i={slides:t,isPreviewMode:"?preview"===document.location.search};return angular.extend(n,i)}]),angular.module("applauseConfig",[]).constant("config",{progressBar:!0,slideCount:!0,counter:!0,startFrom:20,theme:"default"}),applause.directive("markdown",["$window",function(e){String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var t=new e.Showdown.converter,n=function(e,n){n.html(t.makeHtml(n.text().trim()))};return{restrict:"EA",link:n}}]),applause.directive("bgImg",["$filter",function(e){return function(t,n,i){var s="";if(s=/^(f|ht)tps?:\/\//i.test(i.bgImg)?i.bgImg:"images/"+i.bgImg,n.css({background:"transparent url("+s+") no-repeat 0 0","background-size":"cover"}),i.credits){var r=e("linky")(i.credits,"_blank"),o='<div class="credits">Photo credits: '+r+"</div>";n.append(o)}}}]),applause.directive("goto",["Appdata",function(e){var t=function(t){t.goTo=function(){return isNaN(parseInt(t.goToSlide))?!1:(t.$storage.currentSlide=parseInt(t.goToSlide)<=e.slides.length?parseInt(t.goToSlide):e.slides.length,t.goToSlide="",t.showGoTo=!1,void 0)}};return{restrict:"EA",template:'<form ng-submit="goTo()" ng-show="showGoTo" id="go-to" name="goto"><label>Go to: <input required ng-model="goToSlide" type="text" placeholder="slide" autofocus="autofocus"></label></form>',link:t}}]),applause.directive("flipClock",["Appdata","$timeout","$window",function(e,t,n){var i=function(i){var s,r,o=n.moment,a=function(){i.isRunning&&(i.time=s.add(1,"s").format("HHmmss"),t(a,1e3))},l=function(){i.isRunning&&i.time>0&&(i.time=s.subtract(1,"s").format("HHmmss"),t(l,1e3))};i.isRunning=!1,r=e.startFrom,i.time="000000",i.isPreviewMode=e.isPreviewMode,i.isCounterEnabled=e.counter,i.startCount=function(){s||(s=o().hours(0).minutes(r||0).seconds(0)),i.isRunning=!0,r>0?l():a()},i.stopCount=function(){i.isRunning=!1},i.resetCount=function(){i.isRunning=!1,i.time=r?"00"+r+"00":"000000",s=null},i.time=r?"00"+r+"00":"000000"};return{template:'<div class="flip" ng-show="isPreviewMode && isCounterEnabled"><div class="clock"><span id="hours0">{{time[0]}}</span><span id="hours1">{{time[1]}}</span> <b>:</b><span id="minutes0">{{time[2]}}</span><span id="minutes1">{{time[3]}}</span> <b>:</b><span id="seconds0">{{time[4]}}</span><span id="seconds1">{{time[5]}}</span></div><div class="commands"><button class="toggle btn" ng-click="startCount()" ng-disabled="isRunning">Start</button><button class="toggle btn" ng-click="stopCount()">Stop</button><button class="reset btn" ng-click="resetCount()">Reset</button></div></div>',restrict:"E",replace:!0,link:i}}]);