import { Card } from "../../../interfaces"
import Set from "../Stellar Crown"

const card: Card = {
	dexId: [965],
	set: Set,

	chineseName: "噗隆隆",

	name: {
		en: "Varoom",
		fr: "Vrombi",
		es: "Varoom",
		it: "Varoom",
		pt: "Varoom",
		de: "Knattox"
	},

	rarity: "Common",
	category: "Pokemon",
	hp: 80,
	types: ["Metal"],
	stage: "Basic",

	attacks: [{
		cost: ["Colorless", "Colorless"],

		name: {
			en: "Ram",
			fr: "Collision",
			es: "Apisonar",
			it: "Carica",
			pt: "Aríete",
			de: "Ramme"
		},

		damage: 30
	}],

	retreat: 2,
	regulationMark: "H",

	variants: {
		holo: false
	},

	illustrator: "Shiburingaru",

	thirdParty: {
		cardmarket: 785962
	}
}

export default card
