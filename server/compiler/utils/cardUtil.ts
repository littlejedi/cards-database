/* eslint-disable sort-keys */
import pathLib from 'node:path'
import { Card, Set, SupportedLanguages, Types } from '../../../interfaces'
import { CardResume, Card as CardSingle } from '../../../meta/definitions/api'
import { getSet, setToSetSimple } from './setUtil'
import translate from './translationUtil'
import { DB_PATH, cardIsLegal, fetchRemoteFile, getDataFolder, getLastEdit, resolveText, smartGlob } from './util'
import { objectMap, objectPick } from '@dzeio/object-util'
import { variant_detailed } from "../../public/v2/api";
import { getChineseNameByDexId } from '../../../meta/translations/pokemon-names'

/**
 * Enhance a card with Chinese translation for Pokémon names
 */
function enhanceCardWithChineseName(card: Card): Card {
	// Only enhance if it's a Pokémon card with a dexId
	if (!card.dexId || !Array.isArray(card.dexId) || card.dexId.length === 0 || typeof card.name !== 'object') {
		return card
	}

	// Use the first dexId for translation
	const primaryDexId = card.dexId[0]
	const chineseName = getChineseNameByDexId(primaryDexId)
	if (!chineseName) {
		return card
	}

	// Create enhanced card with Chinese name in translations field
	return {
		...card,
		translations: {
			...card.translations,
			name: {
				...(card.translations?.name || {}),
				'zh': chineseName
			}
		}
	}
}

export async function getCardPictures(cardId: string, card: Card, lang: SupportedLanguages): Promise<string | undefined> {
	try {
		const file = await fetchRemoteFile('https://assets.tcgdex.net/datas.json')
		const fileExists = Boolean(file[lang]?.[card.set.serie.id]?.[card.set.id]?.[cardId])
		if (fileExists) {
			return `https://assets.tcgdex.net/${lang}/${card.set.serie.id}/${card.set.id}/${cardId}`
		}
	} catch {
		return undefined
	}
	return undefined
}

export async function cardToCardSimple(id: string, card: Card, lang: SupportedLanguages): Promise<CardResume> {
	// Enhance card with Chinese name if needed
	const enhancedCard = enhanceCardWithChineseName(card)
	
	const cardName = resolveText(enhancedCard.name, lang, enhancedCard.translations)
	if (!cardName) {
		throw new Error(`Card (${enhancedCard.set.id}-${id}) has no name in (${lang})`)
	}
	const img = await getCardPictures(id, enhancedCard, lang)
	return {
		id: `${enhancedCard.set.id}-${id}`,
		image: img,
		localId: id,
		name: cardName
	}
}

function variantsDetailedToVariants(variants_detailed: Array<variant_detailed>): CardSingle['variants'] {
	return {
		firstEdition: variants_detailed?.some((variant) => variant.stamp?.some((stamp) => stamp === '1st edition')) ?? false,
		holo: variants_detailed?.some((variant) => variant.type === 'holo') ?? false,
		normal: variants_detailed?.some((variant) => variant.type === 'normal') ?? false,
		reverse: variants_detailed?.some((variant) => variant.type === 'reverse') ?? false,
		wPromo: variants_detailed?.some((variant) => variant.stamp?.some((stamp) => stamp === 'w-Promo')) ?? false
	}
}

function variantsToVariantsDetailed(variants: CardSingle['variants'],lang: SupportedLanguages): Array<variant_detailed> {
	const result: Array<variant_detailed> = [];
	const addVariant = (type: string, stamps: string[] = []) => {
		result.push({
			type,
			size: translate('variantSize', "standard", lang) as any,
			stamp: stamps.length > 0 ? stamps : undefined
		});
	};

	if (typeof variants?.normal === 'boolean' ? variants.normal : true) {
		addVariant('normal');
		if (variants?.firstEdition) addVariant('normal', ['1st edition']);
		if (variants?.wPromo) addVariant('normal', ['w-Promo']);
	}
	if (typeof variants?.reverse === 'boolean' ? variants.reverse : true) {
		addVariant('reverse');
		if (variants?.firstEdition) addVariant('reverse', ['1st edition']);
	}
	if (typeof variants?.holo === 'boolean' ? variants.holo : true) {
		addVariant('holo');
		if (variants?.firstEdition) addVariant('holo', ['1st edition']);
	}

	return result.length > 0 ? result : undefined;
}

// eslint-disable-next-line max-lines-per-function
export async function cardToCardSingle(localId: string, card: Card, lang: SupportedLanguages): Promise<CardSingle> {
	// Enhance card with Chinese name if needed
	const enhancedCard = enhanceCardWithChineseName(card)
	
	const image = await getCardPictures(localId, enhancedCard, lang)

	if (!enhancedCard.name[lang]) {
		throw new Error(`Card (${localId}) dont exist in (${lang})`)
	}

	return {
		category: translate('category', enhancedCard.category, lang) as any,
		id: `${enhancedCard.set.id}-${localId}`,
		illustrator: enhancedCard.illustrator,
		image,
		localId,
		name: resolveText(enhancedCard.name, lang, enhancedCard.translations) as string,

		rarity: translate('rarity', enhancedCard.rarity, lang) as any,
		set: await setToSetSimple(enhancedCard.set, lang),

		variants : Array.isArray(enhancedCard.variants) ?
			variantsDetailedToVariants(enhancedCard.variants) : {
			firstEdition: typeof enhancedCard.variants?.firstEdition === 'boolean' ? enhancedCard.variants.firstEdition : false,
			holo: typeof enhancedCard.variants?.holo === 'boolean' ? enhancedCard.variants.holo : true,
			normal: typeof enhancedCard.variants?.normal === 'boolean' ? enhancedCard.variants.normal : true,
			reverse: typeof enhancedCard.variants?.reverse === 'boolean' ? enhancedCard.variants.reverse : true,
			wPromo: typeof enhancedCard.variants?.wPromo === 'boolean' ? enhancedCard.variants.wPromo : false
		},

		variants_detailed: Array.isArray(enhancedCard.variants) ? enhancedCard.variants?.map((variant) => {
			return {
				type: translate('variantType', variant.type, lang) as any,
				subtype: translate('variantSubtype', variant.subtype, lang) as any,
				// only include size when it's not standard
				size: variant.size && variant.size !== 'standard' ? translate('variantSize', variant.size, lang) as any : translate('variantSize', "standard", lang) as any,
				stamp: variant.stamp ? variant.stamp.map((stamp) => {
					return translate('variantStamp', stamp, lang)
				}) : undefined,
				foil: variant.foil ? translate('variantFoil', variant.foil, lang) : undefined
			}
		}) : variantsToVariantsDetailed(enhancedCard.variants,lang),

		dexId: enhancedCard.dexId,
		hp: enhancedCard.hp,
		types: enhancedCard.types?.map((t) => translate('types', t, lang)) as Array<Types>,
		evolveFrom: enhancedCard.evolveFrom && resolveText(enhancedCard.evolveFrom, lang),
		weight: enhancedCard.weight,
		description: enhancedCard.description ? resolveText(enhancedCard.description, lang) as string : undefined,
		level: enhancedCard.level,
		stage: translate('stage', enhancedCard.stage, lang) as any,
		suffix: translate('suffix', enhancedCard.suffix, lang) as any,
		item: enhancedCard.item ? {
			name: resolveText(enhancedCard.item.name, lang),
			effect: resolveText(enhancedCard.item.effect, lang)
		} : undefined,

		abilities: enhancedCard.abilities?.map((el) => ({
			type: translate('abilityType', el.type, lang) as any,
			name: resolveText(el.name, lang),
			effect: resolveText(el.effect, lang)
		})),

		attacks: enhancedCard.attacks?.map((el) => ({
			cost: el.cost?.map((t) => translate('types', t, lang)) as Array<Types>,
			name: resolveText(el.name, lang) as string,
			effect: el.effect ? resolveText(el.effect, lang) : undefined,
			damage: el.damage
		})),
		weaknesses: enhancedCard.weaknesses?.map((el) => ({
			type: translate('types', el.type, lang) as Types,
			value: el.value
		})),

		resistances: enhancedCard.resistances?.map((el) => ({
			type: translate('types', el.type, lang) as Types,
			value: el.value
		})),

		retreat: enhancedCard.retreat,

		effect: enhancedCard.effect ? resolveText(enhancedCard.effect, lang) : undefined,

		trainerType: translate('trainerType', enhancedCard.trainerType, lang) as any,
		energyType: translate('energyType', enhancedCard.energyType, lang) as any,
		regulationMark: enhancedCard.regulationMark,

		legal: {
			standard: cardIsLegal('standard', enhancedCard, localId),
			expanded: cardIsLegal('expanded', enhancedCard, localId)
		},
		boosters: enhancedCard.boosters ? objectMap(objectPick(enhancedCard.set.boosters, ...enhancedCard.boosters), (booster, id) => ({
			id: `boo_${enhancedCard.set.id}-${id}`,
			name: resolveText(booster.name, lang),
			// images will be coming soon...
		})) : undefined,
		updated: await getCardLastEdit(localId, enhancedCard, lang),

		thirdParty: enhancedCard.thirdParty,
		
		translations: enhancedCard.translations
	}
}

/**
 *
 * @param setName the setname of the card
 * @param id the local id of the card
 * @returns [the local id, the Card object]
 */
export async function getCard(set: Set, id: string, lang: SupportedLanguages): Promise<Card> {
	try {
		return (await import(`../../${DB_PATH}/${getDataFolder(lang)}/${set.serie.name.en ?? set.serie.name[lang]}/${set.name.en ?? set.name[lang]}/${id}.ts`)).default
	} catch {
		return (await import(`../../${DB_PATH}/${getDataFolder(lang)}/${set.serie.id}/${set.id}/${id}.ts`)).default
	}
}

/**
 * Get cards filtered by the language they are available in
 * @param lang the language of the cards
 * @param set the set to filter in (optional)
 * @returns An array with the 0 = localId, 1 = Card Object
 */
export async function getCards(lang: SupportedLanguages, set?: Set): Promise<Array<[string, Card]>> {
	let cards = await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${(set && (set.serie.name.en ?? set.serie.name[lang])) ?? '*'}/${(set && (set.name.en ?? set.name[lang])) ?? '*'}/*.ts`)
	if (cards.length === 0) {
		cards = await smartGlob(`${DB_PATH}/${getDataFolder(lang)}/${(set && set.serie.id) ?? '*'}/${(set && set.id) ?? '*'}/*.ts`)
	}
	const list: Array<[string, Card]> = []
	for (const path of cards) {
		let items = path.split(pathLib.sep)
		items = items.slice(items.length - 3)

		// get the card id
		let id = items[2]
		id = id.substring(0, id.lastIndexOf('.'))

		// get it's set name
		const setName = items[1]

		// get it's serie name
		const serieName = items[0]

		const set = await getSet(setName, serieName, lang)

		if (!(lang in set.name)) {
			continue
		}

		// console.log(path, id, set, lang)
		const c = await getCard(set, id, lang)
		if (!c.name[lang]) {
			continue
		}
		list.push([id, c])
	}

	// Sort by id when possible
	return list.sort(([a], [b]) => {
		const ra = parseInt(a, 10)
		const rb = parseInt(b, 10)
		if (!isNaN(ra) && !isNaN(rb)) {
			return ra - rb
		}
		return a >= b ? 1 : -1
	})
}

export async function getCardLastEdit(localId: string, card: Card, lang: SupportedLanguages): Promise<string> {
	try {
		const path = `../${getDataFolder(lang)}/${card.set.serie.name.en}/${card.set.name.en ?? card.set.name.fr}/${localId}.ts`
		return getLastEdit(path)
	} catch (e) {
		try {
			const path = `../${getDataFolder(lang)}/${card.set.serie.id}/${card.set.id}/${localId}.ts`
			return getLastEdit(path)
		} catch (e2) {
			console.error(card)
			console.error(e)
			throw e2
		}
	}
}
