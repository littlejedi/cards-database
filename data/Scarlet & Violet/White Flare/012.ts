import { Card } from "../../../interfaces"
import Set from "../White Flare"

const card: Card = {
	dexId: [499],
	set: Set,

	chineseName: "炒炒猪",

	name: {
		en: "Pignite",
		fr: "Grotichon",
		de: "Ferkokel",
		it: "Pignite",
		pt: "Pignite",
		es: "Pignite",
		'es-mx': "Pignite"
	},

	rarity: "Common",
	category: "Pokemon",
	hp: 110,
	types: ["Fire"],
	stage: "Stage1",

	attacks: [{
		cost: ["Fire"],

		name: {
			en: "Combustion",
			fr: "Fournaise",
			de: "Glühen",
			it: "Fuoco Continuo",
			pt: "Combustão",
			es: "Combustión",
			'es-mx': "Combustión"
		},

		damage: 30
	}, {
		cost: ["Fire", "Fire", "Colorless"],

		name: {
			en: "Heat Crash",
			fr: "Tacle Feu",
			de: "Brandstempel",
			it: "Marchiafuoco",
			pt: "Choque de Calor",
			es: "Golpe Calor",
			'es-mx': "Golpe de Calor"
		},

		damage: 80
	}],

	retreat: 3,
	regulationMark: "I",

	thirdParty: {
		cardmarket: 835924
	}
}

export default card