import { Card } from "../../../interfaces"
import Set from "../SVP Black Star Promos"

const card: Card = {
	dexId: [181],
	set: Set,

	chineseName: "电龙",

	name: {
		en: "Ampharos",
		fr: "Pharamp",
		es: "Ampharos",
		it: "Ampharos",
		pt: "Ampharos",
		de: "Ampharos"
	},

	rarity: "None",
	category: "Pokemon",
	hp: 160,
	types: ["Lightning"],
	stage: "Stage2",

	attacks: [{
		cost: ["Lightning", "Colorless"],

		name: {
			en: "Electric Ball",
			fr: "Boule de Foudre",
			es: "Bola Eléctrica",
			it: "Lamposfera",
			pt: "Bola de Eletricidade",
			de: "Stromball"
		},

		damage: 110
	}],

	retreat: 2,
	regulationMark: "H",
	illustrator: "GIDORA"
}

export default card