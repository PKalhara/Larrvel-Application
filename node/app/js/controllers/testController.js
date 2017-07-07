myApp.controller('testController', ['$scope','$mdDialog', function($scope,$mdDialog ) {


    $scope.init = function () {
      console.log("testController started");
    }
    
//
//    $scope.user = {
//      title: 'Developer',
//      email: 'ipsum@lorem.com',
//      firstName: '',
//      lastName: '',
//      company: 'Google',
//      address: '1600 Amphitheatre Pkwy',
//      city: 'Mountain View',
//      state: 'CA',
//      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
//      postalCode: '94043'
//    };

//    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
//    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
//    'WY').split(' ').map(function(state) {
//        return {abbrev: state};
//      });

    
//     $scope.status = '  ';
//  $scope.customFullscreen = false;
//
//  $scope.showAlert = function(ev) {
//    // Appending dialog to document.body to cover sidenav in docs app
//    // Modal dialogs should fully cover application
//    // to prevent interaction outside of dialog
//    $mdDialog.show(
//      $mdDialog.alert()
//        .parent(angular.element(document.querySelector('#popupContainer')))
//        .clickOutsideToClose(true)
//        .title('This is an alert title')
//        .textContent('You can specify some description text in here.')
//        .ariaLabel('Alert Dialog Demo')
//        .ok('Got it!')
//        .targetEvent(ev)
//    );
//  };

//  $scope.showConfirm = function(ev) {
//    // Appending dialog to document.body to cover sidenav in docs app
//    var confirm = $mdDialog.confirm()
//          .title('Would you like to delete your debt?')
//          .textContent('All of the banks have agreed to forgive you your debts.')
//          .ariaLabel('Lucky day')
//          .targetEvent(ev)
//          .ok('Please do it!')
//          .cancel('Sounds like a scam');
//
//    $mdDialog.show(confirm).then(function() {
//      $scope.status = 'You decided to get rid of your debt.';
//    }, function() {
//      $scope.status = 'You decided to keep your debt.';
//    });
//  };

//  $scope.showPrompt = function(ev) {
//    // Appending dialog to document.body to cover sidenav in docs app
//    var confirm = $mdDialog.prompt()
//      .title('What would you name your dog?')
//      .textContent('Bowser is a common name.')
//      .placeholder('Dog name')
//      .ariaLabel('Dog name')
//      .initialValue('Buddy')
//      .targetEvent(ev)
//      .ok('Okay!')
//      .cancel('I\'m a cat person');
//
//    $mdDialog.show(confirm).then(function(result) {
//      $scope.status = 'You decided to name your dog ' + result + '.';
//    }, function() {
//      $scope.status = 'You didn\'t name your dog.';
//    });
//  };

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

 


  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
 
    $scope.init();




}]);
