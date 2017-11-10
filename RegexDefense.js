'use strict';
const canvas = document.getElementById('field');
paper.setup(canvas);
paper.view.draw();

// const circ = new paper.Path.Circle({
// 	center: paper.view.center,
// 	radius: 100,
// 	fillColor: 'white'
// })


const goodWordList = ['peace', 'love', 'hugs', 'friendship', 'dolphins', 'teddy bear'];
const badWordList = ['peas', 'loss', 'huge', 'friendsnot', 'sharks', 'teddy bare']
const defenseBox = document.querySelector('#defenseString')
defenseBox.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
    	testDefense()
    }
});




const GOOD_MISSILE_COLOR = 'blue'
const BAD_MISSILE_COLOR = 'red'
const DEAD_MISSILE_COLOR = 'grey'

const MISSILE_FONT_SIZE = 25

const allMissiles = [];
const deadMissiles = [];
const Missile = function(startPos, string, pointValue, color) {
	this.string = string
	this.pointValue = pointValue
	this.momentum = [0, getRandomFloat(0,1)+.05]
	this.rep = new paper.PointText({
		point: startPos,
		content: string,
		fillColor: color,
		fontSize: MISSILE_FONT_SIZE
	})

	allMissiles.push(this)

	this.remove = () => {
		this.rep.remove();
		allMissiles.splice(allMissiles.indexOf(this), 1)
	}
}

const testDefense = () => {
	const regex = '^' + defenseBox.value + '$'
	defenseBox.value = ''
	for (let i = allMissiles.length-1; i>-1; i--){
		const missile = allMissiles[i]
		if (missile.string.match(regex)) {
			missile.rep.fillColor = DEAD_MISSILE_COLOR
			// missile.rep.opacity = .2
			deadMissiles.push(missile)
			allMissiles.splice(allMissiles.indexOf(missile), 1)
			// console.log('allMissiles indexOf:', allMissiles.indexOf())
		}
	}
	// console.log('testing regex:', defenseBox.value)
}


//Make all missiles
// const tMis = new Missile([paper.view.center.x, 100], 'test', -100)

const makeMissiles = function(wordlist){
	for (let word of goodWordList){
		const thisMissile = new Missile([getRandomInt(0,paper.view.bounds.width), 0], word, 100, GOOD_MISSILE_COLOR)
	}
	for (let word of badWordList){
		const thisMissile = new Missile([getRandomInt(0,paper.view.bounds.width), 0], word, 100, BAD_MISSILE_COLOR)
	}
}

const decayDeadMissiles = () => {
	for (let missile of deadMissiles){
		missile.rep.opacity -= .01;
		// console.log('dead opacity',missile.rep.opacity)
		if (missile.rep.opacity < .02){
			missile.rep.remove()
			deadMissiles.splice(deadMissiles.indexOf(missile),1)
		}
	}
}


let timer = 0
paper.view.onFrame = (event) => {
	// console.log('test')

	if (deadMissiles.length>0)
		decayDeadMissiles();


	timer += event.delta;
	if (timer>2) {
		timer = 0;
		makeMissiles(goodWordList)
	}
	for (let missile of allMissiles){
		missile.rep.position = addPoints(missile.rep.position, missile.momentum)
		if (missile.rep.position.y > paper.view.bounds.height) {
			console.log('BANG')
			missile.remove()
		}
	}
}




// makeMissiles(goodWordList)
// console.log(allMissiles[0].rep.position)



console.log('PAPER RAN',paper.view.bounds.width)


















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

