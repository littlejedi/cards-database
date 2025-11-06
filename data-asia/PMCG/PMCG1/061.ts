import { Card } from "../../../interfaces"
import Set from "../PMCG1"

const card: Card = {
	set: Set,

	chineseName: "嘟嘟",
	name: {
		ja: "ドドゥオ",
	},

	rarity: "Common",
	category: "Pokemon",
	dexId: [84],
	hp: 50,
	types: ["Colorless"],
	stage: "Basic",

	attacks: [
		{
			cost: ["Colorless"],
			name: {
				ja: "怒り攻撃",
			},
			effect: {
				ja: "2つのコインをフリップします。この攻撃は、ヘッド数の10倍のダメージを与えます。",
			},

		},
	],


	variants: [
		{
			type: "normal",
		},
	],
};

export default card
