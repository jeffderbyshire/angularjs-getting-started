angular.module("githubViewer").controller("RepoController", function($scope, github, $routeParams, $log) {

    var onIssueCount = function(data) {
        github.getRepoIssueCount(data, $routeParams.repo).then(onIssueCountFound, onError);
    };

    var onIssueCountFound = function(issues) {
        $scope.issues = issues;
        $log.info($scope.issues);
        github.getRepoCollaborators($routeParams.username, $routeParams.repo).then(onRepoCollaborators, onError);
    };

    var onRepoCollaborators = function(data) {
        $log.info(data);
        $scope.collaborators = data;
    };

    var onError = function(reason) {
        $scope.error = "Could not fetch the data.";
    };
    $log.info($routeParams.username)
    $scope.collaboratorsSortOrder = "+login";
    github.getUser($routeParams.username).then(onIssueCount, onError);

});
