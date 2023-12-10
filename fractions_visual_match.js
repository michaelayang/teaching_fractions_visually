fractionsApp.controller("mainController", function($scope, $filter, $http, $q)
  {
    var canvas = document.getElementById("myCanvas");
    var canvas_context = canvas.getContext("2d");
    var canvas_aspect_ratio = 1/1;

    var circle_width = canvas.width/4;
    var circle_height = canvas.height/4;

    // Initialization
    $scope.visualNumerator = 0;
    $scope.visualDenominator = 1;
    $scope.numberNumerator = 1;
    $scope.numberDenominator = 8;
    
    // Utility functions

    var polarToCartesianX = function(originX, originY, thetaInRadians, radius) {

      var returnX = originX + (radius*Math.cos(thetaInRadians));

      return returnX;
    }

    var polarToCartesianY = function(originX, originY, thetaInRadians, radius) {

      var returnY = originY + (radius*Math.sin(thetaInRadians));

      return returnY;
    }

    var drawFractionVisual = function(numPartitions, numPartitionsToFill, color)
    {
      var effective_drawing_width = canvas.width - (circle_width*2);
      var effective_drawing_height = canvas.height - (circle_height*2);

      canvas_context.beginPath();

      canvas_context.strokeStyle = "black";
      canvas_context.fillStyle = color;

      var x = (canvas.width/2);
      var y = (canvas.height/2);

      canvas_context.arc(x, y,
                         circle_width*canvas_aspect_ratio,
                         -Math.PI/2.0,
                         (-Math.PI/2.0)+(2*Math.PI*(numPartitionsToFill/numPartitions))
                        );
      if (numPartitions != numPartitionsToFill && numPartitions > 1) {
        canvas_context.lineTo(x, y);
      }

      canvas_context.fill();

      canvas_context.stroke();

      return true;

    };

    var drawPieBorders = function(numPartitions, color) {

      var effective_drawing_width  = canvas.width - (circle_width*2);
      var effective_drawing_height = canvas.height - (circle_height*2);

      canvas_context.beginPath();

      var x  = (canvas.width/2);
      var y  = (canvas.height/2);

      if (numPartitions > 1) {
        canvas_context.lineWidth = 2;
        canvas_context.arc(x, y,
                           circle_width*canvas_aspect_ratio, 0, 2*Math.PI);
  
        for (var i = 0; i < numPartitions; i++)
        {
          var endX = polarToCartesianX(x, y, 2*Math.PI*(i/numPartitions)-(Math.PI/2.0), circle_width);
          var endY = polarToCartesianY(x, y, 2*Math.PI*(i/numPartitions)-(Math.PI/2.0), circle_width);
  
          canvas_context.moveTo(x, y);
          canvas_context.lineWidth = 2;
          canvas_context.lineTo(endX, endY);
        }
  
        canvas_context.strokeStyle = "black";
        canvas_context.stroke();
      }
    };

    var drawMatchText = function(visualNumerator, numberNumerator, visualDenominator, numberDenominator) {

      var x  = (canvas.width/20);
      var y  = (canvas.height-10);

      canvas_context.fillStyle = "black";
      canvas_context.font="40px Helvetica";

      canvas_context.fillText("Matching!", x, y);

      canvas_context.stroke();

      return true;
    }

    $scope.paintIt = function () {
      var color = "white";

      canvas_context.clearRect(0, 0, canvas.width, canvas.height);

//      if ($scope.visualDenominator > $scope.numberDenominator)  {
//        color = "orange";
//      } else if ($scope.visualDenominator < $scope.numberDenominator) {
//        color = "cyan";
//      }
      drawFractionVisual($scope.visualDenominator, $scope.visualDenominator, color);

      color = "gray";
//      if ($scope.visualNumerator > $scope.numberNumerator)  {
//        color = "red";
//      } else if ($scope.visualNumerator < $scope.numberNumerator) {
//        color = "blue";
//      }

      if ($scope.visualNumerator/$scope.visualDenominator == $scope.numberNumerator/$scope.numberDenominator) {
        drawMatchText($scope.visualNumerator, $scope.numberNumerator, $scope.visualDenominator, $scope.numberDenominator);
        color = "blue";
      }
      drawFractionVisual($scope.visualDenominator, $scope.visualNumerator, color);

      drawPieBorders($scope.visualDenominator, "black");

      return;
    };

    $scope.incrementDisplayNumerator = function () {
      $scope.visualNumerator ++;
      if ($scope.visualNumerator > $scope.visualDenominator) {
        $scope.visualNumerator = $scope.visualDenominator;
      }
      $scope.paintIt();
  
      return;
    };
  
    $scope.decrementDisplayNumerator = function () {
      if ($scope.visualNumerator > $scope.visualDenominator) {
        $scope.visualNumerator = $scope.visualDenominator;
      }
      if ($scope.visualNumerator > 0) {
        $scope.visualNumerator --; 
      }
      $scope.paintIt();
  
      return;
    };

    $scope.incrementDisplayDenominator = function () {
      $scope.visualDenominator ++; 
      $scope.paintIt();
  
      return;
    };
  
    $scope.decrementDisplayDenominator = function () {
      if ($scope.visualDenominator > 1) {
        $scope.visualDenominator --; 
      }
      $scope.paintIt();
  
      return;
    };

    $scope.paintIt();
  
  }

)
