import { Card } from "../../../interfaces"
import Set from "../SV5s"

const card: Card = {
	set: Set,

	chineseName: "恰雷姆",

	name: {
		id: "Medicham"
	},

	illustrator: "Masako Tomii",
	category: "Pokemon",
	hp: 120,
	types: ["Fighting"],

	description: {
		id: "Medicham menghindari serangan lawannya dengan gerakan elegan yang seperti tarian, lalu ia memberikan serangan tunggal yang dahsyat ke lawannya."
	},

	stage: "Stage1",

	attacks: [{
		name: {
			id: "Low Kick"
		},

		damage: 40,
		cost: ["Fighting"]
	}, {
		name: {
			id: "Tendangan Lutut Melompat"
		},

		damage: 110,
		cost: ["Colorless", "Colorless", "Colorless"]
	}],

	weaknesses: [{
		type: "Psychic",
		value: "×2"
	}],

	retreat: 1,
	regulationMark: "H"
}

export default card