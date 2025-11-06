import { Card } from '../../../interfaces'
import Set from '../XY trainer Kit (Wigglytuff)'

const card: Card = {
	dexId: [684],
	set: Set,

	chineseName: "绵绵泡芙",

	name: {
		en: "Swirlix",
		fr: "Sucroquin",
		es: "Swirlix",
		it: "Swirlix",
		pt: "Swirlix",
		de: "Flauschling"
	},

	rarity: "Common",
	category: "Pokemon",
	hp: 60,
	types: ["Fairy"],
	stage: "Basic",
	retreat: 1,

	weaknesses: [{
		type: "Metal",
		value: "×2"
	}],

	resistances: [{
		type: "Darkness",
		value: "-20"
	}],

	thirdParty: {
		tcgplayer: 98198
	}
}

export default card