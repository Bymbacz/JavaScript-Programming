"use strict";
var expect = chai.expect;
function sum(x, y) {
  return x + y;
}
function cyfry(napis) {
  var odd = 0;
  var even = 0;
  for (let litera of napis) {
    if (isNaN(litera * 1)) continue;
    let n = parseInt(litera);
    if (n % 2 == 0) even += n;
    else odd += n;
  }
  let t = [odd, even];
  return t;
}

function litery(napis) {
  var small = 0;
  var big = 0;
  for (let litera of napis) {
    if (!isNaN(litera * 1)) continue;
    if (litera == litera.toUpperCase()) big += 1;
    else if (litera == litera.toLowerCase()) small += 1;
  }
  let t = [small, big];
  return t;
}

function suma(napis) {
  if (isNaN(parseInt(napis[0]))) return 0;
  return parseInt(napis);
}

function get() {
  var data = window.prompt("Wczytaj dane");
  var poprzedni = 0;
  while (data != null) {
    let f1 = cyfry(data);
    let f2 = litery(data);
    let f3 = poprzedni + suma(data);
    poprzedni = f3;
    console.log("\t" + f1 + "\t" + f2 + "\t" + f3);
    data = window.prompt("Wczytaj dane");
  }
}

describe("Same cyfry", function () {
  it('cyfry("123") = [4,2]', function () {
    expect(cyfry("123")).to.deep.equal([4, 2]);
  });
  it('litery("123") = [0,0]', function () {
    expect(litery("123")).to.deep.equal([0, 0]);
  });
  it('suma("123") = 123', function () {
    expect(suma("123")).to.equal(123);
  });
});

describe("Same litery", function () {
  it('cyfry("abcABC") = [0,0]', function () {
    expect(cyfry("abcABC")).to.deep.equal([0, 0]);
  });
  it('litery("abcABC") = [3,3] ', function () {
    expect(litery("abcABC")).to.deep.equal([3, 3]);
  });
  it('suma("abcABC") = 0', function () {
    expect(suma("abcABC")).to.equal(0);
  });
});

describe("Litery, a po nich cyfry", function () {
  it('cyfry("a12") = [1,2]', function () {
    expect(cyfry("a12")).to.deep.equal([1, 2]);
  });
  it('litery("a12") = [1,0]', function () {
    expect(litery("a12")).to.deep.equal([1, 0]);
  });
  it('suma("a12") = 0', function () {
    expect(suma("a12")).to.equal(0);
  });
});

describe("Cyfry, a po nich litery", function () {
  it('cyfry("1AB") = [1,0]', function () {
    expect(cyfry("1AB")).to.deep.equal([1, 0]);
  });
  it('litery("1AB") = [0,2]', function () {
    expect(litery("1AB")).to.deep.equal([0, 2]);
  });
  it('suma("1AB") = 1', function () {
    expect(suma("1AB")).to.equal(1);
  });
});

describe("Pusty napis", function () {
  it('cyfry("") = [0,0]', function () {
    expect(cyfry("")).to.deep.equal([0, 0]);
  });
  it('litery("") = [0,0]', function () {
    expect(litery("")).to.deep.equal([0, 0]);
  });
  it('suma("") = 0', function () {
    expect(suma("")).to.equal(0);
  });
});

describe("The sum() function", function () {
  it("Returns 4 for 2+2", function () {
    expect(sum(2, 2)).to.equal(4);
  });
  it("Returns 0 for -2+2", function () {
    expect(sum(-2, 2)).to.equal(0);
  });
});
