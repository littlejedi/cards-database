import { Card } from "../../../interfaces"
import Set from "../Stellar Crown"

const card: Card = {
	dexId: [150],
	set: Set,

	chineseName: "超梦",

	name: {
		en: "Mewtwo",
		fr: "Mewtwo",
		es: "Mewtwo",
		it: "Mewtwo",
		pt: "Mewtwo",
		de: "Mewtu"
	},

	rarity: "Uncommon",
	category: "Pokemon",
	hp: 130,
	types: ["Psychic"],
	stage: "Basic",

	attacks: [{
		cost: ["Psychic", "Psychic", "Colorless"],

		name: {
			en: "Super Psy Bolt",
			fr: "Super Psy",
			es: "Superrayo Psi",
			it: "Superpsico",
			pt: "Super-raio Psíquico",
			de: "Super-Psischlag"
		},

		damage: 100
	}],

	retreat: 2,
	regulationMark: "H",

	variants: {
		holo: false
	},

	illustrator: "kantaro",

	thirdParty: {
		cardmarket: 785913
	}
}

export default card
