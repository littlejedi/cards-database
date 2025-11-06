import { Card } from "../../../interfaces"
import Set from "../SVP Black Star Promos"

const card: Card = {
	dexId: [576],
	set: Set,

	chineseName: "哥德小姐",

	name: {
		en: "Gothitelle",
	},

	rarity: "None",
	category: "Pokemon",
	hp: 150,
	types: ["Colorless"],
	stage: "Stage2",
	illustrator: "IKEDA Saki",

	attacks: [
		{
			cost: ["Psychic","Colorless"],

			name: {
				en: "Synchro Shot",
			},

			effect: {
				en: "If you have the same number of cards in your hand as your opponent, this attack does 90 more damage.",
			},
			damage: "90+"
		}
	],

	weaknesses: [
		{
			type: "Darkness",
			value: "×2"
		}
	],

	resistances: [
		{
			type: "Fighting",
			value: "-30"
		}
	],

	retreat: 2,
	regulationMark: "I",

	variants: [
		{
			type: "holo"
		},
	],

	thirdParty: {
		cardmarket: 836659,
		tcgplayer: 647306,
	}
}

export default card
