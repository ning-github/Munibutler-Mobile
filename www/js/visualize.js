angular.module('d3', [])
  .factory('d3Service', ['$document', '$window', '$q', '$rootScope',
    function($document, $window, $q, $rootScope) {
      var d = $q.defer(),
          d3service = {
            d3: function() { return d.promise; }
          };
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve($window.d3); });
    }
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript'; 
    scriptTag.async = true;
    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;
    
    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);
    
    return d3service;
}])
// for d3 visualization
.directive('changeColor', ['d3Service', function(d3Service) {
  return {
    restrict: 'E',

    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var green = "#00FF00";
        var yellowGreen = "#9ACD32";
        var brown = "#B29600";
        var red = "#FF0000";

        //unique $index for each repeat

        var colorScale = d3.scale.linear()
          .domain([0, 10, 20, 40])
          .range([green, yellowGreen, brown, red]);


        d3.selectAll('.duration')
          .each(function(d, i){

            var minutes = this.textContent.split(' ')[0];
            console.log('SCOPE: ', scope);

            // if the format comes back with 'hour' in it
            if (this.textContent.indexOf('hour') !== -1){
              // set the minutes to be max red by using 60
              minutes = 60;
            }

            d3.select(this)
              .style('color', colorScale(minutes));
          });
          // .style('color', colorScale(minutes)); 
        
      });  
    }}
}]);
