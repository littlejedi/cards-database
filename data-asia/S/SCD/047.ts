import { Card } from "../../../interfaces"
import Set from "../SCD"

const card: Card = {
	set: Set,

	chineseName: "戽斗尖梭",

	name: {
		'zh-tw': "戽斗尖梭"
	},

	illustrator: "Hideki Ishikawa",
	category: "Pokemon",
	hp: 120,
	types: ["Water"],
	stage: "Stage1",

	attacks: [{
		name: {
			'zh-tw': "突刺"
		},

		damage: 50,
		cost: ["Water"]
	}],

	weaknesses: [{
		type: "Lightning",
		value: "×2"
	}],

	retreat: 1,
	regulationMark: "E"
}

export default card