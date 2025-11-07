import { Card } from "../../../interfaces"
import Set from "../SI"

const card: Card = {
	set: Set,

	chineseName: "泳圈鼬",

	name: {
		'zh-tw': "泳圈鼬"
	},

	illustrator: "ryoma uratsuka",
	category: "Pokemon",
	hp: 70,
	types: ["Water"],
	stage: "Basic",

	attacks: [{
		name: {
			'zh-tw': "潑水"
		},

		damage: 20,
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