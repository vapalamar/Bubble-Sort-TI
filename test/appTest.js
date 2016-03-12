var expect = chai.expect;
var viewSection = document.getElementById('nums_list');

describe('Test of checking user input function', function () {
  it('should return false if array is empty', function () {
    expect(checkUserInput([])).to.equal(false);
    expect(checkUserInput(new Array())).to.equal(false);
  });
  it('should return true if all array items are nums', function () {
    expect(checkUserInput([12, 5.5, -3, 0, 20, 7])).to.equal(true);
  });
  it('should return false if there is at least one not numerical item',
  function() {
    expect(checkUserInput(["I", "love", "JS"])).to.equal(false);
  });
  it('should return false if argument is not an array', function () {
    expect(checkUserInput("new Array()")).to.equal(false);
    expect(checkUserInput(undefined)).to.equal(false);
    expect(checkUserInput(NaN)).to.equal(false);
    expect(checkUserInput(null)).to.equal(false);
    expect(checkUserInput(15)).to.equal(false);
  });
  it('should return false if there is no argument at all', function () {
    expect(checkUserInput()).to.equal(false);
  });
});

describe('Array', function () {
  describe('#removeSpaces', function() {
    var arrWithSpaces = [" ", 5, "hey", " ", "chai"];
    var arrWithoutSpaces = [5, "hey", "chai"];
    it('should remove spaces from array', function () {
      expect(arrWithSpaces.removeSpaces()).to.deep.equal(arrWithoutSpaces);
    });
  });
  describe('#convertToNumsArray', function () {
    var testArr = ["5", "you can't", "-1", null];
    var probRes = [5, NaN, -1, NaN];
    it('should convert given array to array of numbers', function () {
      expect(testArr.convertToNumsArray()).to.deep.equal(probRes);
    });
  });
});

describe('Function which creates li element from array', function () {
  var testArr = [7, 9, 0, 6, 2, 5];
  setListView(testArr);
  var nodes = viewSection.getElementsByTagName('li');
  it('should have the same size', function () {
    expect(nodes.length).to.equal(testArr.length);
  });
  it('should have the same value at each index', function () {
    for (var i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).to.equal(testArr[i].toString());
    }
  });
});

describe('Function which sets display property value', function () {
  it('should set display property value to "none"', function () {
    setDisplayValue(viewSection, "none");
    expect(viewSection.style.display).to.equal('none');
  });
  it('should set display property value to "block"', function () {
    setDisplayValue(viewSection, "block");
    expect(viewSection.style.display).to.equal('block');
  });
});

describe('Bubble sort object creating', function () {
  it('should create an object which would allow us to manipulate the loop',
  function () {
    expect(createBubbleSortObject(testObj, [3, 12, 5, 15])).to.be.a('object');
  });
  var testObj = createBubbleSortObject(testObj, [3, 12, 5, 15]);
  it('should have a loop property', function () {
    expect(testObj).to.have.property('loop');
  });
  it('should have a getCurrentElement property', function () {
    expect(testObj).to.have.property('getCurrentElement');
  });
  it('should have a getList property', function () {
    expect(testObj).to.have.property('getList');
  });
});

describe('Set class function', function () {
  it('should set a class to the element', function () {
    setClass(viewSection, 'works');
    expect(viewSection.className).to.equal('works');
  });
  it('should set empty string as class if class was not given', function () {
    setClass(viewSection);
    expect(viewSection.className).to.equal('');
  });
});

describe('Check if all li elements have class called "final"', function () {
  var nodes = viewSection.getElementsByTagName('li');
  it('should return false because not all elements have such class name',
  function () {
    expect(ifDone(nodes)).to.equal(false);
  });
  it('should return true if all elements have such class', function () {
    for (var i = 0; i < nodes.length; i++) {
      setClass(nodes[i], 'final');
    }
    expect(ifDone(nodes)).to.equal(true);
  });
});

describe('Update list function', function () {
  var nodes = viewSection.getElementsByTagName('li');
  it('should set li values until it reaches array length', function () {
    var newValues = [1, 2, 2];
    updateList(nodes, newValues);
    for (var i = 0; i < newValues.length; i++) {
      expect(nodes[i].innerHTML).to.equal(newValues[i].toString());
    }
  });
  it('should stop setting new values if array is longer than ul', function () {
    var newValues = [5, 7, 3, 1, 8, 16, 23, 34];
    updateList(nodes, newValues);
    for (var i = 0; i < nodes.length; i++) {
      expect(nodes[i].innerHTML).to.equal(newValues[i].toString());
    }
  });
});
