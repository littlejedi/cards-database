import { Card } from '../../../interfaces'
import Set from '../EX trainer Kit 2 (Minun).ts'

const card: Card = {
	dexId: [5],
	set: Set,

	chineseName: "火恐龙",

	name: {
		en: "Charmeleon"
	},

	illustrator: "Kouki Saitou",
	rarity: "None",
	category: "Pokemon",
	stage: "Stage1",

	hp: 70,

	types: [
		"Fire",
	],

	evolveFrom: {
		en: "Charmander",
	},

	attacks: [{
		cost: [
			"Fire",
			"Colorless"
		],
		name: {
			en: "Flare"
		},
		damage: 30
	}, {
		cost: [
			"Fire",
			"Colorless",
			"Colorless"
		],
		name: {
			en: "Damage Burn"
		},
		effect: {
			en: "If the Defending Pokémon already has any damage counters on it, this attack does 40 damage plus 20 more damage."
		},
		damage: "40+"
	}],

	weaknesses: [
		{
			type: "Water",
			value: "2x"
		},
	],

	retreat: 1,
}

export default card
