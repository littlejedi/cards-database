import { Card } from "../../../interfaces"
import Set from "../Brilliant Stars"

const card: Card = {
	dexId: [329],
	set: Set,

	chineseName: "超音波幼虫",

	name: {
		en: "Vibrava",
		fr: "Vibraninf",
		es: "Vibrava",
		it: "Vibrava",
		pt: "Vibrava",
		de: "Vibrava"
	},

	rarity: "Uncommon",
	category: "Pokemon",
	hp: 90,
	types: ["Fighting"],

	evolveFrom: {
		en: "Trapinch",
		fr: "Kraknoix",
		es: "Trapinch",
		it: "Trapinch",
		pt: "Trapinch",
		de: "Knacklion"
	},

	stage: "Stage1",

	attacks: [{
		cost: ["Fighting"],

		name: {
			en: "Razor Wing",
			fr: "Aile Tranchante",
			es: "Ala Cortante",
			it: "Ala Tagliente",
			pt: "Asa Cortante",
			de: "Rasierflügel"
		},

		damage: 30
	}],

	retreat: 1,
	regulationMark: "F",

	variants: {
		normal: true,
		reverse: true,
		holo: false,
		firstEdition: false
	},

	thirdParty: {
		cardmarket: 608525,
		tcgplayer: 263791
	}
}

export default card