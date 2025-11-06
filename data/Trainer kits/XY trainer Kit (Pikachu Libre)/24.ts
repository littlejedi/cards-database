import { Card } from '../../../interfaces'
import Set from '../XY trainer Kit (Pikachu Libre)'

const card: Card = {
	dexId: [432],
	set: Set,

	chineseName: "东施喵",

	name: {
		en: "Purugly",
		fr: "Chaffreux",
		es: "Purugly",
		it: "Purugly",
		pt: "Purugly",
		de: "Shnurgarst"
	},

	rarity: "Uncommon",
	category: "Pokemon",
	hp: 100,
	types: ["Colorless"],

	evolveFrom: {
		en: "Glameow",
		fr: "Chaglam",
		es: "Glameow",
		it: "Glameow",
		pt: "Glameow",
		de: "Charmian"
	},

	stage: "Stage1",
	retreat: 2,

	weaknesses: [{
		type: "Fighting",
		value: "×2"
	}],

	thirdParty: {
		tcgplayer: 118825
	}
}

export default card