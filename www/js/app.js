// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova']).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    ionic.Platform.fullScreen(true, true);
    //本应为false，因messenger对windowSoftInputMode有配置，此处特定为true
    ionic.Platform.isFullScreen = true;
  })
}).config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {
  //路由配置
  $ionicConfigProvider.templates.maxPrefetch(0);
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider
  //test
    .state('demo', {
      url: '/demo',
      templateUrl: 'templates/demo/demo.html'
    })
    .state('homePage', {
      url: '/homePage',
      templateUrl: 'templates/homePage/homePage.html'
    })
    .state('lightExam', {
      url: '/lightExam',
      templateUrl: 'templates/exam/lightExam.html'
    })
    .state('drivingExam', {
      url: '/drivingExam',
      templateUrl: 'templates/exam/drivingExam.html'
    });
  $urlRouterProvider.otherwise('/homePage');
}).factory('notification', [function () {
  var notification = {};
  var optDefault = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  toastr.options = optDefault;
  var beforeShow = function (obj) {
    toastr.remove();
    toastr.options = angular.extend({}, optDefault, obj.opts);
  };
  notification.warning = function (obj) {
    beforeShow(obj);
    toastr.warning(obj.msg, obj.title);
  };
  notification.success = function (obj) {
    beforeShow(obj);
    toastr.success(obj.msg, obj.title);
  };
  notification.error = function (obj) {
    beforeShow(obj);
    toastr.error(obj.msg, obj.title);
  };
  notification.clear = function () {
    toastr.clear();
  };
  return notification;
}]).controller('testCtrl', ['$scope', "notification", function ($scope, notification) {
  //调试用
  //提示组件Demo
  $scope.notifyTest1 = function () {
    notification.success({msg: '成功提示'});
  };
  $scope.notifyTest2 = function () {
    notification.error({msg: '成功提示'});
  };
  $scope.notifyTest3 = function () {
    notification.warning({msg: '成功提示'});
  };
  $scope.notifyTest4 = function () {
    notification.success({msg: '你已学会提示组件用法', title: '设置标题'});
  };
  $scope.notifyTest5 = function () {
    notification.success({msg: '设置延迟500ms', opts: {timeOut: 500}});
  };
  $scope.notifyTest6 = function () {
    notification.clear();
  }
}])
  .controller('homePageCtrl', ['$scope', "notification", "$http", "$location", function ($scope, notification, $http, $location) {

    //灯光测试
    $scope.lightExam = function () {
      notification.success({msg: '灯光测试'});
      $location.path("/lightExam");
    };

    //行车测试
    $scope.drivingExam = function () {
      notification.success({msg: '行车测试'});
      $location.path("/drivingExam");
    }
  }])

  .controller('lightExamCtrl', ['$scope', "notification", "$http", function ($scope, notification, $http) {

    //灯光测试
    $scope.lightExam = function () {
      notification.success({msg: '灯光测试'});
      $location.path("/attendance_people").search("id",$scope.callBackId);
    };

    //行车测试
    $scope.turnLeft = function () {
      notification.success({msg: '行车测试'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

  }])


  .controller('drivingExamCtrl', ['$scope', "notification", "$http", function ($scope, notification, $http) {

    //起步
    $scope.getStart = function () {
      notification.success({msg: '起步'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //左转
    $scope.turnLeft = function () {
      notification.success({msg: '左转'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //右转
    $scope.turnRight = function () {
      notification.error({msg: '右转'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //掉头
    $scope.turnOver = function () {
      notification.warning({msg: '掉头'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //变道
    $scope.changeRoad = function () {
      notification.warning({msg: '变道'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //通过路口
    $scope.crossing = function () {
      notification.warning({msg: '通过路口'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };

    //靠边停车
    $scope.stop = function () {
      notification.warning({msg: '靠边停车'});
      $http.post(originBaseUrl + '/third/onecard/queryEcardInfo.htm').success(function (data) {//这里通过串口去获取返回的信息1为成功 0 为失败
        if (data.result == 1) {
          $scope.result = data.result;
        }
      }).error(function () {
        $scope.loadErrorMsg = '加载失败，请重试！';
      });
    };
  }]);
