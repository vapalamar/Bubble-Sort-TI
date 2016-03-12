var expect = chai.expect;

describe('What bubble sort function returns', function () {
  it('should return an object which allows to control the bubble sort execution', function () {
    expect(bubbleSort([5, 4, 3, 2, 1])).to.be.a('object');
  });
});

describe('Properties of returned object', function () {
  var testObj = bubbleSort([11, 32, 0, 11, -1, 7]); //random
  it('should have a loop property which is a function', function () {
    expect(testObj.loop).to.be.a('function');
  });
  it('should have a getCurrentElement property, counter of the inner loop',
  function () {
    expect(testObj.getCurrentElement()).to.be.a('number');
  });
  it('should have a getList property, the whole array',
  function () {
    expect(testObj.getList()).to.be.a('array');
  });
});

describe('Check the work of loop function', function () {
  var testObj = bubbleSort([30, 5, 7, 0, -3, 1, -10]);
  testObj.loop();
  it('should increase value of currentElement by one', function () {
    expect(testObj.getCurrentElement()).to.equal(1);
  });
});

describe('Does the getList function return correct value', function () {
  var testArr = [5, 6, 3, 2, 1];
  var testObj = bubbleSort(testArr);
  it('should be the same array that was given as argument', function () {
    expect(testObj.getList()).to.deep.equal(testArr);
  })
})
