import { Card } from '../../../interfaces'
import Set from '../XY trainer Kit (Bisharp)'

const card: Card = {
	dexId: [625],
	set: Set,

	chineseName: "劈斩司令",

	name: {
		en: "Bisharp",
		fr: "Scalproie",
		es: "Bisharp",
		it: "Bisharp",
		pt: "Bisharp",
		de: "Caesurio"
	},

	rarity: "Rare",
	category: "Pokemon",
	hp: 90,
	types: ["Metal"],

	evolveFrom: {
		en: "Pawniard",
		fr: "Scalpion",
		es: "Pawniard",
		it: "Pawniard",
		pt: "Pawniard",
		de: "Gladiantri"
	},

	stage: "Stage1",
	retreat: 1,

	weaknesses: [{
		type: "Fire",
		value: "×2"
	}],

	resistances: [{
		type: "Psychic",
		value: "-20"
	}],

	thirdParty: {
		tcgplayer: 98176
	}
}

export default card