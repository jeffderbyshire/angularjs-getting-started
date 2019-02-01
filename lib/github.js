angular.module("githubViewer").factory("github", function($http, $log){

      var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                        .then(function(response){
                           return response.data;
                        });
      };

      var getRepos = function(user){
            return $http.get(user.repos_url)
                        .then(function(response){
                            return response.data;
                        });
      };

      var getRepoIssueCount = function(user, repo) {
          return $http.get(user.repos_url)
                      .then(function(response){
                          for (var i in response.data) {
                              if (response.data[i].name == repo) {
                                  return response.data[i].open_issues_count;
                                  break;
                              }
                          }
                      });
      };

      var getRepoCollaborators = function(username, repo) {
            return $http.get("https://api.github.com/repos/" + username +"/" + repo +"/contributors")
                        .then(function(response){
                            return response.data;
                        });
      };

      return {
          getUser: getUser,
          getRepos: getRepos,
          getRepoIssueCount: getRepoIssueCount,
          getRepoCollaborators: getRepoCollaborators
      };

  });
