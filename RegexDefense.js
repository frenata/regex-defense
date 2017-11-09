'use strict';
const canvas = document.getElementById('field');
paper.setup(canvas);
paper.view.draw();

// const circ = new paper.Path.Circle({
// 	center: paper.view.center,
// 	radius: 100,
// 	fillColor: 'white'
// })


const wordList = ['aword', 'another', 'donut', 'toothfairy'];



const MISSILE_COLOR = 'black'
const MISSILE_FONT_SIZE = 25

const allMissiles = [];
const Missile = function(startPos, string, pointValue) {
	this.string = string
	this.pointValue = pointValue
	this.momentum = [0, getRandomFloat(1,3)]
	console.log(this.momentum)
	this.rep = new paper.PointText({
		point: startPos,
		content: string,
		fillColor: MISSILE_COLOR,
		fontSize: MISSILE_FONT_SIZE
	})

	allMissiles.push(this)
}


//Make all missiles
// const tMis = new Missile([paper.view.center.x, 100], 'test', -100)

const makeMissiles = function(wordlist){
	for (let word of wordlist){
		const thisMissile = new Missile([100, -100], word, -100)
	}
}



paper.view.onFrame = (event) => {
	// console.log('test')
	for (let missile of allMissiles){
		missile.rep.position = addPoints(missile.rep.position, missile.momentum)
	}
}




makeMissiles(wordList)
console.log(allMissiles[0].rep.position)



console.log('PAPER RAN')


















//PointHelpers.js
//Helper functions to easy point maths

function pointify(pointOrArray) {
    if (pointOrArray instanceof Array)
        return { x: pointOrArray[0], y: pointOrArray[1] };
    else return pointOrArray;
}

function addPoints(p1, p2) {
    // console.log('p1', p1, 'p2', p2)
    p1 = pointify(p1);
    p2 = pointify(p2);

    return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function subPoints(p1, p2) {
    p1 = pointify(p1);
    p2 = pointify(p2);

    return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomFloat(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function coinToss(){
  return getRandomInt(0,2);
}

