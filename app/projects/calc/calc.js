let calculator = (function(){
  let _calc = "0"; //base string for calculation and screen
  let _multiple=""; //multiple line of calcutaion
  let _ready=false;
  let _unit ="";
  let _score = 0;
  const _buttons = document.querySelectorAll(".butt");
  const _screenOne = document.querySelector("#screenOne");

  let _typeOfButton = function(butt){
    if(butt<10 && butt>=0 || butt=="."){
      return "number";
    } else if(butt=="CE"||butt=="C" || butt=="BACKSPACE"){
      return "edition";
    } else if(butt=="%"||butt=="SQRT"|| butt=="+/-"|| butt=="PI" || butt == "="){
      return "special";
    } else {
      return "operation";
    }
  }
  //creating a string with calculations: _calc
  let _calculate = function(){
    switch(_typeOfButton(this.title)){
      case "number":
        if(_calc.length==1 && _calc[0]==0) {
          _calc = this.title} else{
          _calc +=this.title;
          }
        break;
      case "edition":
        _edition(this.title);
        break;
      case "special":
        if(this.title=="="){
          _score =_equal();
          _showOnScreen();
          } else{
          _special(this.title);
          }
        break;
      case "operation":
        if(_calc[_calc.length-1]!=" "){
            _calc +=" "+this.title+" ";
        }
        break;
    }
  };
  //reduce 3 fields of array to one (depending on mathematical operator)
  let _operation = function(operation, array, index){
    if(operation=="*" || operation=="/" || operation=="+" || operation=="-"){
      let result;
      switch (operation){
        case "*":
          result = array[index-1]*array[index+1];
          return array.splice(index-1, 3, result);
          break;
        case "/":
          result = array[index-1]/array[index+1];
          return array.splice(index-1, 3, result);
          break;
        case "+":
          result = +array[index-1]+ +array[index+1];
          return array.splice(index-1, 3, result);
          break;
        case "-":
          result = array[index-1]-array[index+1];
          return array.splice(index-1, 3, result);
          break;
      }
    }
  };

  // after clicking "=" on keyboard
  let _equal = function(){
    console.log(_calc+", calc: " + typeof _calc);
    console.log(_calc+", score: " + typeof _score);
    if(typeof _calc ==="number"){
      return _calc;
    } else if(_calc.length>1){
      let score = _calc.split(" ");
      let i = 0;

      for(i;i<score.length; i++){
        if(score[i]=="*"||score[i]=="/"){
          _operation(score[i], score, i);
          i--;
        }
      }
      for(i=0;i<score.length; i++){
        if(score[i]=="+"||score[i]=="-"){
          _operation(score[i], score, i);
          i--;
        }
      }
      _ready=true;
      return score;
    } else{
      _ready=true;
      return _calc[0];
    }
  };

  let _backspace = function(){
    let score = _calc.split(" ");
    if($.isNumeric( score[score.length-1] )){
      _calc = _calc.slice(0, _calc.length-1);
    } else{
        _calc = _calc.slice(0, _calc.length-3);
    }
  }

  let _edition = function(sign){
    switch(sign){
    case "BACKSPACE":
      _backspace();
      break;
    case "C":
      _calc = "0";
      _multiple = "";
      _unit ="";
      break;
    case "CE":
      _calc = "0";
      break;
    }
  }

  let _special = function(sign){

    switch (sign){
      case "+/-":
        _calc +=" * -1";
        break;
      case "PI":
        if(_calc[_calc.length-1]==" "){
          _calc +="3.14";
        } else if(_calc.length===1 && _calc[0]==="0"){
          _calc = "3.14";
        }
        break;
      case "%":
        if(!_calc[_calc.length-1]==" " && _unit==""){
          _unit = "%";
        } else if(!_calc[_calc.length-1]==" " && _unit=="%"){
            _unit = "";
        }
        break;
      case "SQRT":
        if(_score >= 0){
          _score = _equal();
          _score = Math.sqrt(_score);
          _ready=true;
          _showOnScreen();
        }
    }
  }

  let _showOnScreen = function(){
    if (_ready==true) {
      _multiple = _multiple.concat(_calc + " =" + "<br>"  );
      if(_unit==""){
         _calc = _score;
      }else {_calc = _score*100;}
      _ready=false;
      _screenOne.innerHTML = _multiple;
    } else _screenOne.innerHTML = _multiple+ _calc +_unit;

  };

  let _init = function(){
    _buttons.forEach(function(el, i){
      el.addEventListener('click',_calculate);
      el.addEventListener('click',_showOnScreen);
    });
  };

  return{
    init: _init,
    calc: _calc
  }
})();

$(function(){
  calculator.init();
});
