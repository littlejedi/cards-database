import { Card } from "../../../interfaces"
import Set from "../neo3"

const card: Card = {
	set: Set,

	chineseName: "角金鱼",
	name: {
		ja: "ゴールデン",
	},

	rarity: "Common",
	category: "Pokemon",
	dexId: [118],
	hp: 40,
	types: ["Water"],
	stage: "Basic",

	attacks: [
		{
			cost: ["Colorless"],
			name: {
				ja: "フィンスマック",
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
