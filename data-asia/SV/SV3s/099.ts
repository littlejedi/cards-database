import { Card } from "../../../interfaces"
import Set from "../SV3s"

const card: Card = {
	set: Set,

	chineseName: "鬼斯",

	name: {
		id: "Gastly"
	},

	illustrator: "Nobuhiro Imagawa",
	category: "Pokemon",
	hp: 50,
	types: ["Darkness"],

	description: {
		id: "Gastly melekat pada mangsanya dengan tubuh gasnya, lalu melemahkan mereka dengan mengirimkan racun sedikit demi sedikit melalui kulit mereka."
	},

	stage: "Basic",

	attacks: [{
		name: {
			id: "Mengambil"
		},

		effect: {
			id: "Ambil 1 kartu dari atas Deck sendiri."
		},

		cost: ["Colorless"]
	}, {
		name: {
			id: "Api Hantu"
		},

		damage: 20,
		cost: ["Darkness", "Colorless"]
	}],

	weaknesses: [{
		type: "Fighting",
		value: "×2"
	}],

	retreat: 1,
	regulationMark: "G"
}

export default card