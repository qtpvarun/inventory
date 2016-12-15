/**
 * Created by: dhayes on 4/2/14.
 * Filename: routes.spec.js
 */
describe("Routes test", function() {
    beforeEach(module('app'));

    var location, state, rootScope, timeout;

    beforeEach(inject(function(_$location_, _$state_, _$rootScope_, _$timeout_, Auth){
        rootScope = _$rootScope_;
        location = _$location_;
        state = _$state_;
        timeout = _$timeout_;
        Auth.setUser({_id: '1', email: 'test@test.com', firstName: 'Test', lastUser: 'User', roles: ['admin']});
    }));

    describe('profile route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/profile/profile')
                .respond(200, 'Profile HTML');
        }));

        it('should change states', function(){
            location.path('/profile');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('profile');
            });
        });

        it('should respond to URL', function() {
            expect(state.href('profile')).toEqual('/profile');
        });

    });

    describe('settings route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/settings/settings')
                .respond(200, 'Settings HTML');
        }));

        it('should change states', function(){
            location.path('/settings');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('settings');
            });
        });

        it('should respond to URL', function() {
            expect(state.href('settings')).toEqual('/settings');
        });

    });

    describe('help route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/help/help')
                .respond(200, 'Help HTML');
        }));

        it('should change states', function(){
            location.path('/help');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('help');
            });
        });

        it('should respond to URL', function() {
            expect(state.href('help')).toEqual('/help');
        });

    });

    describe('dashboard route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/dashboard/index')
                .respond(200, 'Dashboard html');
        }));

        it('should change states', function(){
            location.path('/dashboard');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('dashboard');
            });
        });

        it('should have activeNav set', function() {
            location.path('/dashboard');
            rootScope.$digest();
            timeout(function(){
                expect(state.activeNav).toBe('dashboard');
            })
        });

        it('should resolve to URL', function() {
            expect(state.href('dashboard')).toEqual('/dashboard');
        });
    });

    describe('default route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/dashboard/index')
                .respond(200, 'Dashboard html');
        }));

        it('should change states', function(){
            location.path('/');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('dashboard');
            });
        });
    });

    describe('assets route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/am/layout')
                .respond(200, 'Layout html');
            $httpBackend.expectGET('/partials/am/assets')
                .respond(200, 'Assets html');
        }));

        it('should change states', function(){
            location.path('/am/assets');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('assets');
            });
        });

        it('should have activeNav set', function() {
            location.path('/am/assets');
            rootScope.$digest();
            timeout(function(){
                expect(state.activeNav).toBe('am');
            })
        });

        it('should resolve to URL', function() {
            expect(state.href('am.assets')).toEqual('/am/assets');
        });

    });

    describe('locations route', function(){
        beforeEach(inject(function($httpBackend){
            $httpBackend.expectGET('/partials/app')
                .respond(200, 'App Layout HTML');
            $httpBackend.expectGET('/partials/am/layout')
                .respond(200, 'Layout html');
            $httpBackend.expectGET('/partials/am/locations')
                .respond(200, 'Locations html');
        }));

        it('should change states', function(){
            location.path('/am/locations');
            rootScope.$digest();
            timeout(function(){
                expect(state.current.name).toBe('locations');
            });
        });

        it('should have activeNav set', function() {
            location.path('/am/locations');
            rootScope.$digest();
            timeout(function(){
                expect(state.activeNav).toBe('am');
            })
        });

        it('should resolve to URL', function() {
            expect(state.href('am.locations')).toEqual('/am/locations');
        });

    });

});