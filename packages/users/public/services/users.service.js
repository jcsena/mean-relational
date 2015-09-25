(function(){
'use strict';


angular
    .module('mean.users')
    .factory('MeanUser',MeanUser);

    MeanUser.$inject = ['Global','$rootScope', '$http', '$location', '$stateParams', '$q', '$timeout','$window'];

    function MeanUser (Global,$rootScope, $http, $location, $stateParams, $q, $timeout,$window) {

            var self;

            function MeanUserKlass() {
                this.name = 'users';
                this.user = {};
                this.loggedin = false;
                this.isAdmin = false;
                this.loginError = null;
                this.validationError = null;
                this.resetpassworderror = null;
                this.validationError = null;
                self = this;
            }


            var MeanUserK = new MeanUserKlass();

            //prototype methods
            MeanUserKlass.prototype.onIdentity = onIdentity;
            MeanUserKlass.prototype.login = login;
            MeanUserKlass.prototype.onIdFail = onIdFail;
            MeanUserKlass.prototype.register = register;
            MeanUserKlass.prototype.resetpassword = resetpassword;
            MeanUserKlass.prototype.forgotpassword = forgotpassword;
            MeanUserKlass.prototype.logout = logout;
            MeanUserKlass.prototype.checkLoggedin = checkLoggedin;
            MeanUserKlass.prototype.checkLoggedOut = checkLoggedOut;
            MeanUserKlass.prototype.checkAdmin = checkAdmin;


            //return meanKlass
            return MeanUserK;


            function onIdentity(response) {

                var user = response.user ? response.user : response;

                self.loggedin = true;
                self.isAdmin = false;
                self.user = user;
                self.name = user.name;

                //Global Services
                Global.user = user;
                Global.authenticated = true;

                if (response.redirect) {

                    if ($location.absUrl() === response.redirect) {
                        //This is so an admin user will get full admin page
                        $window.location.reload();
                    } else {
                    $window.location.href = response.redirect;
                    }
                }else{
                $window.location.reload();
                }
            }

            function onIdFail(response) {
                self.loginError = 'Authentication failed.';
                self.registerError = response;
                self.validationError = response.msg;
                self.resetpassworderror = response.msg;
                $rootScope.$emit('loginfailed');
                $rootScope.$emit('registerfailed');
            }


            function login(user) {
                // this is an ugly hack due to mean-admin needs
                $http.post('/api/login', {
                        email: user.email,
                        password: user.password
                    })
                    .success(function(res) {
                        self.onIdentity(res);
                    })
                    .error(function(err) {
                        self.onIdFail(err);
                    });


            }


            function register(user) {
                $http.post('/api/register', {
                        email: user.email,
                        password: user.password,
                        username: user.username,
                        name: user.name
                    })
                    .success(self.onIdentity)
                    .error(function(err) {
                        self.onIdFail(err);
                    });
            }


            function resetpassword(user) {
                $http.post('/api/reset/' + $stateParams.tokenId, {
                        password: user.password,
                        confirmPassword: user.confirmPassword
                    })
                    .success(function(res) {
                        self.onIdentity(res);
                    })
                    .error(function(err) {
                        self.onIdFail(err);
                    });
            }

            function forgotpassword(user) {
                $http.post('/api/forgot-password', {
                        text: user.email
                    })
                    .success(function(response) {
                        $rootScope.$emit('forgotmailsent', response);
                    })
                    .error(function(err) {
                        self.onIdFail(err);
                    });
            }

            function logout() {

                $http.get('/api/logout').success(function() {
                    self.user = {};
                    self.loggedin = false;
                    self.isAdmin = false;

                    //Global Services
                    Global.user = null;
                    Global.authenticated = false;

                    $rootScope.$emit('logout');
                });

            }

            function checkLoggedin() {
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('/api/loggedin').success(function(user) {
                    // Authenticated
                    if (user !== '0') {
                        $timeout(deferred.resolve);
                    }

                    // Not Authenticated
                    else {
                        $timeout(deferred.reject);
                        $location.url('/auth/login');
                    }
                });

                return deferred.promise;
            }

            function checkLoggedOut() {
                // Check if the user is not connected
                // Initialize a new promise
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('/api/loggedin').success(function(user) {
                    // Authenticated
                    if (user !== '0') {
                        $timeout(deferred.reject);
                        $location.url('/');
                    }
                    // Not Authenticated
                    else {
                        $timeout(deferred.resolve);
                    }
                });

                return deferred.promise;
            }

            function checkAdmin() {
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('/api/loggedin').success(function(user) {
                    // Authenticated
                    if (user !== '0' && user.roles.indexOf('admin') !== -1) {
                        $timeout(deferred.resolve);
                    }

                    // Not Authenticated or not Admin
                    else {
                        $timeout(deferred.reject);
                        $location.url('/');
                    }
                });

                return deferred.promise;
            }


    }


})();
