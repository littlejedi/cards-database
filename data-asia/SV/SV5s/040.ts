import { Card } from "../../../interfaces"
import Set from "../SV5s"

const card: Card = {
	set: Set,

	chineseName: "凯路迪欧",

	name: {
		id: "Keldeo"
	},

	illustrator: "satoma",
	category: "Pokemon",
	hp: 110,
	types: ["Water"],

	description: {
		id: "Dengan menetapkan determinasi untuk bertarung, kekuatan meluap di seluruh tubuh Keldeo sehingga ia mengubah wujudnya."
	},

	stage: "Basic",

	attacks: [{
		name: {
			id: "Quick Draw"
		},

		effect: {
			id: "Ambil 2 kartu dari atas Deck sendiri."
		},

		damage: 20,
		cost: ["Water"]
	}, {
		name: {
			id: "Aqua Blade"
		},

		damage: 110,
		cost: ["Water", "Water", "Colorless"]
	}],

	weaknesses: [{
		type: "Lightning",
		value: "×2"
	}],

	retreat: 1,
	regulationMark: "H"
}

export default card