import { Card } from "../../../interfaces"
import Set from "../SV5s"

const card: Card = {
	set: Set,

	chineseName: "榛果球",

	name: {
		id: "Pineco"
	},

	illustrator: "Midori Harada",
	category: "Pokemon",
	hp: 70,
	types: ["Grass"],

	description: {
		id: "Cairan yang dimuntahkan Pineco dari mulutnya adalah perekat untuk menempelkan kulit pohon ke tubuhnya. Cairan tersebut mengeras jika terkena udara."
	},

	stage: "Basic",

	attacks: [{
		name: {
			id: "Menyeruduk"
		},

		damage: 50,
		cost: ["Colorless", "Colorless", "Colorless"]
	}],

	weaknesses: [{
		type: "Fire",
		value: "×2"
	}],

	retreat: 2,
	regulationMark: "H"
}

export default card