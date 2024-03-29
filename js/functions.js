let gitHubAPI = angular.module('gitHubAPI', [])

gitHubAPI.controller('gitHubAPIController', function ($scope, $http) {
    $scope.prepareGitHubAPI = () => {
        $http
            .get('https://api.github.com/users/A-Naive-Dreamer')
            .then(function (response1) {
                $scope.userData = response1.data

                $http
                    .get($scope.userData.followers_url)
                    .then(function (response2) {
                        $scope.followers = response2.data
                        $scope.followerData = []
                    })

                $http
                    .get($scope.userData.url + '/following')
                    .then(function (response3) {
                        $scope.following = response3.data
                    })

                $http
                    .get($scope.userData.repos_url)
                    .then(function (response4) {
                        $scope.repos = response4.data
                    })
            })
    }

    $scope.showFollowing = function () {
        $('#followers').css('display', 'none')
        $('#following').css('display', 'block')
        $('#repos').css('display', 'none')
        $('#search-column').css('display', 'none')
    }

    $scope.showFollower = function () {
        $('#followers').css('display', 'block')
        $('#following').css('display', 'none')
        $('#repos').css('display', 'none')
        $('#search-column').css('display', 'none')
    }

    $scope.showRepos = function () {
        $('#followers').css('display', 'none')
        $('#following').css('display', 'none')
        $('#repos').css('display', 'block')
        $('#search-column').css('display', 'none')
    }

    $scope.showSearch = function () {
        $('#followers').css('display', 'none')
        $('#following').css('display', 'none')
        $('#repos').css('display', 'none')
        $('#search-column').css('display', 'block')
    }

    $scope.search = function () {
        $('#follower-result').empty()

        $scope.followers.forEach(function (follower) {
            if (
                $scope.searchKeywords !== '' &&
                follower.login
                    .toLowerCase()
                    .includes($scope.searchKeywords)
            ) {
                let followerResult = document.getElementById('follower-result'),
                    li = document.createElement('li'),
                    div1 = document.createElement('div'),
                    div2 = document.createElement('div'),
                    div3 = document.createElement('div'),
                    a1 = document.createElement('a'),
                    a2 = document.createElement('a'),
                    img = document.createElement('img'),
                    h3 = document.createElement('h3')

                li.setAttribute('class', 'list-group-item list-group-item-action')
                div1.setAttribute('class', 'row')
                div2.setAttribute('class', 'col-12 col-sm-4')
                div3.setAttribute('class', 'col-12 col-sm-8')
                a1.setAttribute('href', follower.html_url)
                a2.setAttribute('href', follower.html_url)
                img.setAttribute('src', follower.avatar_url)

                followerResult.append(li)
                li.append(div1)
                div1.append(div2)
                div2.append(a1)
                a1.append(img)
                div1.append(div3)
                div3.append(a2)
                a2.append(h3)
                h3.append(follower.login)
            }
        })

        $('#following-result').empty()

        $scope.following.forEach(function (following) {
            if (
                $scope.searchKeywords !== '' &&
                following.login
                    .toLowerCase()
                    .includes($scope.searchKeywords.toLowerCase())
            ) {
                let followingResult = document.getElementById('following-result'),
                    li = document.createElement('li'),
                    div1 = document.createElement('div'),
                    div2 = document.createElement('div'),
                    div3 = document.createElement('div'),
                    a1 = document.createElement('a'),
                    a2 = document.createElement('a'),
                    img = document.createElement('img'),
                    h3 = document.createElement('h3')

                li.setAttribute('class', 'list-group-item list-group-item-action')
                div1.setAttribute('class', 'row')
                div2.setAttribute('class', 'col-12 col-sm-4')
                div3.setAttribute('class', 'col-12 col-sm-8')
                a1.setAttribute('href', following.html_url)
                a2.setAttribute('href', following.html_url)
                img.setAttribute('src', following.avatar_url)

                followingResult.append(li)
                li.append(div1)
                div1.append(div2)
                div2.append(a1)
                a1.append(img)
                div1.append(div3)
                div3.append(a2)
                a2.append(h3)
                h3.append(following.login)
            }
        })
    }
})