import { Card } from "../../../interfaces"
import Set from "../neo3"

const card: Card = {
	set: Set,

	chineseName: "小拳石",
	name: {
		ja: "ジオドード",
	},

	rarity: "Common",
	category: "Pokemon",
	dexId: [74],
	hp: 40,
	types: ["Fighting"],
	stage: "Basic",

	attacks: [
		{
			cost: ["Fighting"],
			name: {
				ja: "ナックルパンチ",
			},
			damage: 20,
		},
	],

	retreat: 1,

	variants: [
		{
			type: "normal",
		},
	],
};

export default card
