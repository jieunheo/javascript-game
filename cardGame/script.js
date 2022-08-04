// upyr, chort, povitruya, poludnytsya, polyovyk, chugaister, mavka, wandering_fier, nichnytsya, vovkulaka
// 카드 정보
const CHARACTERS = [
	{
		name: "Upyr",
		code: "upyr",
		description:
			"Dead man that rises up from the grave and feeds on human or animal blood. Is a prototype of modern vampires. In Ukrainian mythology witches, sorcerers and other people who weren't accepted by church could become an Upyr after death. The characteristic features of Upyrs are blushing and rage."
	},
	{
		name: "Chort",
		code: "chort",
		description:
			"Evil spirit, generalization of vicious powers. The Guid between human and Devil. Chort is blamed in small harm, demages, fraud, temptation, often acussed in any failure or misfortune. Traditional image of Chort is humanlike creature with horns, goat legs and tail. In Ukrainian language the name of Chort is considered to be a curse word. Also there are a lot of idioms with this character."
	},
	{
		name: "Povitruya",
		code: "povitruya",
		description:
			"The daugter of mountain winds. Extremely beautiful, kind, joyful and playful. But if Povitrulya gets mad she can make a small whirlwind or twist a tree. Can fly, aware of herbs properties, helps lovers with their affairs and doesn't mind to charm some shepherds herself. Usually pictured dressed in flowers from head to toes, with long red hair and wings. It was believed that to marry Povitrulyua you need to steal her wings, however if she finds them again, she'll disappear in unknown direction."
	},
	{
		name: "Poludnytsya",
		code: "poludnytsya",
		description:
			"Female spirit that appears in midday usually in summer and haunts those who are still working or walking on a field. Is a representation of sunstroke. To those who don't rest in shade at the middle of the day she sends vertigo, can tickle to death or cut off the head. Poludnytsyas were pictured as young girls in white dresses or the old women with long grey hair. The sickle or scythe were important attributes. It also was considered that Poludnytsyas guard crops fields."
	},
	{
		name: "Polyovyk",
		code: "polyovyk",
		description:
			"Male patron spirit of fields, steppes and meadows. Polunytsya's husband. Appears to people in animal form, can change his height, in humanlike form may have horns, goat ears anfd tail, different colored eyes. Polyovyk leads astray, to dangerous places but is favorable to those who leave him treats. In this case he is really helpful : leads out children and cattle lost in the crops, protects field from hail and leads away rain on harvesting days."
	},
	{
		name: "Chugaister",
		code: "chugaister",
		description:
			"It was believed that it is a cursed by sorcerers man. Joyful, cheerful, big and overgrown with wool woodman with bright blue eyes. Likes to sing and dance. In general haunts the dangerous for humans female spirits and eats them. But is not really safe for people either - he can lead into the woods and dance one's to death."
	},
	{
		name: "Mavka",
		code: "mavka",
		description:
			"Spirit into wich the drowned or unbaptized dead girls turn. The most common image of Mavka is greenhaired naked girl without back so the guts are seen. Mavkas lure people into thickets and tickle them to death. Also the role of planting flowers and dancing on so - called playgrounds ( places were grass doesn't grow ) were given to them. Usually Mavkas live in forests near water."
	},
	{
		name: "Wandering fier",
		code: "wandering_fier",
		description:
			"Soul of a restles human that levitates over it's grave or place of death May be flashing or constant, in shape of sphere or candle fire. Burn in typical blue color. It was considered that Fires lure people to death so to see such phenomenon meant nothing good. Sometimes it was believed that Fires point to the places where treasures were hidden, however those who find it will be cursed. Most often can be find in cemeteries and swamps."
	},
	{
		name: "Nichnytsya",
		code: "nichnytsya",
		description:
			"Night demoness that sneaks into the house and disturbes children's sleep or steal them. Can send nightmeres, insomnia or unwakened sleep, drive crazy. Nichnytsyas depicted as bat- or birdlike female apparition with long dark hair. It was believed that they are driven by emotions so they can be casted out with words. Witches that haven't got their own children or women who killed their mother after death could become Nichnytsyas."
	},
	{
		name: "Vovkulaka",
		code: "vovkulaka",
		description:
			"Man who can become a wolf, werewolf. people could be born this way or forcefully become ones by turning in. Vovkulaka is born if pregnant with boy woman sees a wolf or if a boy is conceived against holiday or fast. Turned Vovkulakas can return their human apperance, however born ones can't. Man turns into a wolf at night. Vovkulaka can be recognized among other wolf by it's red eyes."
	}
];

// 게임 레벨
const LEVELS = {
	easier: 2,
	easy: 4,
	normal: 5,
	hard: 7,
	harder: 10
};

// 템플릿 가져오기
const getTemplate = (creature, fliped = true, disabled = false) => {
	let flipedClass = fliped ? "fliped" : "";
	let disabledAttr = disabled ? "disabled" : "";
	return `<div class="card-place"><button ${disabledAttr} style="--deg: ${getRandomArbitrary(
		-1.5,
		1.5
	)}deg;" data-code="${creature.code}" class="card ${flipedClass} ${
		creature.code
	}">
    <div class="card__side_back"></div>
    <div class="card__side_front"></div>
</button></div>`;
};

const getTemplateArticle = (creature) => {
	return `<article><button disabled style="--deg: 0deg;" class="card ${creature.code}">
    <div class="card__side_back"></div>
    <div class="card__side_front"></div>
</button><div><h2 style="color: var(--${creature.code}-tcap-color)">${creature.name}</h2><p>${creature.description}</p></div></article>`;
};

// 승리 이벤트
const victoryEvent = new Event("victory");

// 승리한 경우
window.addEventListener(
	"victory",
	(e) => {
		let html = ``;

    // 사용한 카드 보여주기
		openPairs.forEach((p) => {
			html += getTemplateArticle(p, true, false);
		});
		html += "</div>";
		victoryBlock.innerHTML = html;

    // 카드 테이블 비우기
		cardTable.innerHTML = ``;
	},
	false
);

let cardTable    = document.querySelector("#cardTable"); // 카드 테이블
let victoryBlock = document.querySelector(".victory");   // 게임 영역
let statsBlock   = document.querySelector("#stats");     // 진행결과
let allPairs = 0;
let openPairs = [];
let moves = 0;

// 리셋
function resetStats() {
	allPairs = 0;
	openPairs = [];
	moves = 0;
}

// 해당 카드 가져오기
function getCharacterByCode(code) {
	for (let i = 0; i < CHARACTERS.length; i++) {
		const ch = CHARACTERS[i];
		if (ch.code == code) return ch;
	}

	return null;
}

// start()
startScreen();

function startScreen() {
	let html = ``;

  // 모든 카드 정보
	CHARACTERS.forEach((p) => {
		html += getTemplate(p, false, true);
	});
	cardTable.innerHTML = html; // 모든 카드 뿌려주기
}

let opened = []; // 열린 카드

// 카드 뒤집기
function openCard(card) {
	if (opened.length >= 2) return;

	card.style.setProperty("--deg", `${getRandomArbitrary(-1.5, 1.5)}deg`);
	card.classList.remove("fliped");
	card.disabled = true;
	card.blur();
	opened.push(card);

	if (opened.length == 2) {
		moves++;

    // 캍은 카드인지
		if (opened[0].dataset["code"] == opened[1].dataset["code"]) {
			openPairs.push(getCharacterByCode(opened[0].dataset["code"]));
			opened = [];
		} else {
			setTimeout(() => {
				// console.log("WRONG :(");
				opened[0].classList.add("fliped"); // 다시 뒤집기
				opened[1].classList.add("fliped");
				opened[0].disabled = false; // 비활성화
				opened[1].disabled = false;
				opened = [];
			}, 1000); // 1초 후 진행
		}

		updateStats();

    // 끝난 경우
		if (allPairs == openPairs.length) {
      setTimeout(() => {
        window.dispatchEvent(victoryEvent);
      }, 1000);
		}
	}
}

// 진행도 수정
function updateStats() {
	statsBlock.innerText = `Open: ${openPairs.length}/${allPairs} pairs by ${moves} moves`;
}

// 초기화
function init() {
	let cards = document.querySelectorAll(".card");

	cards.forEach((card) => {
		card.addEventListener("click", (e) => {
			openCard(card);
		});
	});
}

// 게임 시작
function start(e) {
	resetStats();

	victoryBlock.innerHTML = ``;
	e.innerText = "ReStart";

	opened = [];

  // 레벨 값 가져오기
	let l = document.querySelector('input[name="level"]:checked').value;

	cardTable.className = "";
	cardTable.classList.add("card_table", l);


	let pairs = createArray(LEVELS[l]);
	allPairs = LEVELS[l];
	pairs = shuffle(shuffle(shuffle(pairs)));
	let html = ``;

	pairs.forEach((p) => {
		html += getTemplate(p, true, false);
	});
	cardTable.innerHTML = html;
	init();
}

// 카드 리스트 만들기
function createArray(pairCount = 5) {
	if (pairCount > CHARACTERS.length) {
		throw new Error(`Pair count more ${CHARACTERS.length}`);
	}

	let source = [];
	source.push(...CHARACTERS);
	let result = [];

	for (let i = 0; i < pairCount; i++) {
		let randomIndex = Math.floor(Math.random() * source.length);
		let removed = source.splice(randomIndex, 1);
		result.push(removed[0]);
		result.push(removed[0]);
	}

	return result;
}

// 카드 섞기
function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex]
		];
	}

	return array;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
