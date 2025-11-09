import { Card } from "../../../interfaces"
import Set from "../SV3s"

const card: Card = {
	set: Set,

	chineseName: "蓝蟾蜍",

	name: {
		id: "Palpitoad"
	},

	illustrator: "sowsow",
	category: "Pokemon",
	hp: 100,
	types: ["Water"],

	description: {
		id: "Palpitoad kadang mengorek dengan suara yang indah. Makin besar tonjolan di tubuhnya, makin luas pula jangkauan suara yang dapat dinyanyikan olehnya."
	},

	stage: "Stage1",

	attacks: [{
		name: {
			id: "Guyuran Air"
		},

		damage: 50,
		cost: ["Water", "Water"]
	}],

	weaknesses: [{
		type: "Lightning",
		value: "×2"
	}],

	retreat: 2,
	regulationMark: "G"
}

export default card