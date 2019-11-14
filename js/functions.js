let gitHubAPI = angular.module('gitHubAPI', [])

gitHubAPI.controller('gitHubAPIController', function ($scope, $http, $sce) {
    $scope.prepareGitHubAPI = () => {
        $http.get('https://api.github.com/users/A-Naive-Dreamer')
            .then(function (response1) {
                $scope.userData = response1.data

                $http.get($scope.userData.followers_url)
                    .then(function (response2) {
                        $scope.followers = response2.data
                        $scope.followerData = []

                        // for (let x = 0; x < $scope.followers.length; ++x) {
                        //     let url = $scope.followers[x].html_url,
                        //         trustedURL = $sce.trustAsResourceUrl(url)

                        //     $http({
                        //         method: 'JSONP',
                        //         url: trustedURL,
                        //         headers: {
                        //             'Cross-Origin-Allow-Control': 'https://api.github.com'
                        //         }
                        //     })
                        //         .then(function (response3) {
                        //             $scope.followerData.push(response3.data)
                        //             console.log($scope.followerData)
                        //         })
                        // }
                        // $scope.followers.forEach(function (follower) {
                        //     $http.get(follower.html_url)
                        //         .then(function (response3) {
                        //             $scope.followerData.push(response3)
                        //         })
                        // })
                    })

                $http.get($scope.userData.url + '/following')
                    .then(function (response3) {
                        $scope.following = response3.data
                    })

                $http.get($scope.userData.repos_url)
                    .then(function (response4) {
                        $scope.repos = response4.data
                    })
            })
    }

    $scope.showFollowing = function () {
        $('#followers').css('display', 'none')
        $('#following').css('display', 'block')
        $('#repos').css('display', 'none')
    }

    $scope.showFollower = function () {
        $('#followers').css('display', 'block')
        $('#following').css('display', 'none')
        $('#repos').css('display', 'none')
    }

    $scope.showRepos = function () {
        $('#followers').css('display', 'none')
        $('#following').css('display', 'none')
        $('#repos').css('display', 'block')
    }
})