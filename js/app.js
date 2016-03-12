var buttonApply = document.getElementById('button_apply');
var buttonNext = document.getElementById('button_next');
var buttonAutoPlay = document.getElementById('button_autoplay');
var buttonClear = document.getElementById('button_clear');
var executionSection = document.getElementById('execution_section');
var errorMessage = document.getElementById('error_message');
var viewSection = document.getElementById('nums_list');
var bubbleSortObject;
var inputField;

var checkUserInput = function checkUserInputF (input) {
  if (!input) return false;
  if (input.constructor !== Array || input.length == 0) return false;
  for (var i = 0; i < input.length; i++) {
      if (!(!isNaN(parseFloat(input[i])) && isFinite(input[i]))) {
        return false;
      }
  }
  return true;
}

var setListView = function setListViewF (input) {
  input.forEach(function (item) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    viewSection.appendChild(li);
  });
}

var setClass = function setClassF (element, cls) {
  element.className = cls || "";
}

var setDisplayValue = function setDisplayValue (element, value) {
  element.style.display = value;
}

Array.prototype.convertToNumsArray = function convertToNumsArrayF () {
  return this.map(function (item) {
    return parseInt(item, 10);
  });
}

Array.prototype.removeSpaces = function removeSpacesF () {
  return this.filter(function (item) {
    return /\S/.test(item);
  });
}

var createBubbleSortObject = function createBubbleSortObjectF (object, array) {
  object = bubbleSort(array);
  return object;
}

var respondToUserInput = function respondToUserInputF() {
  var input;
  inputField = document.getElementById('nums_input');
  input = inputField.value.trim().split(" ").removeSpaces().convertToNumsArray();
  if (checkUserInput(input)) {
    bubbleSortObject = createBubbleSortObject(bubbleSortObject, input);
    button_apply.disabled = true;
    setListView(input);
    setDisplayValue(executionSection, 'block');
    setDisplayValue(errorMessage, 'none');
  } else {
    setDisplayValue(errorMessage, 'block');
    inputField.value = "";
  }
}

var updateList = function updateListF (listOfNodes, values) {
  for (var i = 0; i < values.length; i++) {
    if (i == listOfNodes.length) {
      return;
    }
    listOfNodes[i].innerHTML = values[i];
  }
}

var controlListChanges = function controlListChangesF () {
  var listOfNodes = viewSection.getElementsByTagName('li');
  var current = bubbleSortObject.getCurrentElement();
  var next = current + 1;
  var currentNode = listOfNodes[current];
  var nextNode = listOfNodes[next];
  var nums = bubbleSortObject.getList();

  if (current != 0) {
    //убирает класс у пройденного элемента
    setClass(listOfNodes[current - 1]);
  }

  if (nums[current] > nums[next]) {
    //для понимания читать от последнего условия к первому
    if (currentNode.className == "swapped") {
      //выполнить итерацию и идти дальше
      makeAStep(listOfNodes);
    }
    if (nextNode.className == "current") {
      //затем показать, что текущий больше следующего
      setClass(currentNode, "swapped");
      setClass(nextNode, "swapped");
    }
    else {
      //просто подсветить текущие элементы
      setClass(currentNode, "current");
      setClass(nextNode, "current");
      return;
    }
  }

  else {
    if (!nextNode || nextNode.className == "final") {
      setClass(currentNode, "final");
    } else {
      setClass(currentNode, "current");
      setClass(nextNode, "current");
    }
  }

  if (currentNode.className == "current" || currentNode.className == "final") {
    makeAStep(listOfNodes);
  }
}

var makeAStep = function makeAStepF (listOfNodes) {
  bubbleSortObject.loop();
  updateList(listOfNodes, bubbleSortObject.getList());
}

var ifDone = function ifDoneF(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].className != "final") {
      return false;
    }
  }
  return true;
}

var autoPlay = function autoPlayF () {
  var nodes = viewSection.getElementsByTagName('li');
  controlListChanges();
  buttonAutoPlay.disabled = true;
  if (!ifDone(nodes)) {
    setTimeout(function () {
      autoPlay();
    }, 1000);
  }
}

var clear = function clearF () {
  viewSection.innerHTML = "";
  setDisplayValue(executionSection, "none");
  buttonApply.disabled = false;
  inputField = document.getElementById('nums_input');
  inputField.value = "";
}

buttonApply.onclick = respondToUserInput;
buttonNext.onclick = controlListChanges;
buttonAutoPlay.onclick = autoPlay;
buttonClear.onclick = clear;
