let ticTac = (function(){
  const x = "<div>x</div>";
  const o = "<div>o</div>";
  const empty = "<div></div>";
  let current = x;
  let _whoWon = "";
  //notation of games
  let games = {
    game1:[0,0,0,0,0,0,0,0,0]
  };
  let gameFinished = false;

  let _changeMark = function(curr) {
    if(curr===x){return o;} else{return x;}
  };

  let _addMove = function(num){
    if(current===x){
      games.game1[num-1]="x";
    }else{
      games.game1[num-1]="o";
    }
  }

  let _playTicTac = function(){
        $(".field").on('click',function(){
          if(!gameFinished){
            let field = "#"+$(this).attr('id');
            if($(field).html()===empty){
              $(field).html(current);
              _addMove(field[2]);
              if(gameFinished=_isFinished(games.game1)){
                    $(".screen").html(_whoWon+" won the Game!");
                return 0;
              }
              current = _changeMark(current);
              $(field).removeClass("pointer");
              $(field).addClass("blocked");
            }
          }
        });
  };

  let _compare = function(a,b,c){
    if(a===b && b===c && c!=0){
      if(a==="x"){_whoWon = "x";} else{_whoWon = "o";}
      return true;
    }else {
      return false;
    }
  }

  let _isFinished = function(arr){
    if(_compare(arr[0],arr[1],arr[2])|| _compare(arr[3],arr[4],arr[5])|| _compare(arr[6],arr[7],arr[8])||
      _compare(arr[0],arr[3],arr[6]) || _compare(arr[1],arr[4],arr[7]) || _compare(arr[2],arr[5],arr[8]) ||
      _compare(arr[0],arr[4],arr[8]) || _compare(arr[2],arr[4],arr[6])){
        return true;
      }else if(arr.indexOf(0)===-1){
        _whoWon="Nobody";
        return true;
      } else {
        return false;
      }
  }
  let _clear = function(el, index, array){
    array[index] = 0;
  }

  var _reset = function(){
    current = x;
    games.game1.forEach(_clear);
    gameFinished = false;
    $(".field").html(empty);
    $(".field").removeClass("blocked");
    $(".field").addClass("pointer");
    $(".screen").html("");
  };


  let _init = function(){
    $(function(){
      _playTicTac();
      $(".reset").click(_reset);
      $('.button-wrap').on("click", function(){
      $(this).toggleClass('button-active');
      });

    });
  }

  return {
    init: _init,
    game: games.game1
  }
})();

  ticTac.init();
