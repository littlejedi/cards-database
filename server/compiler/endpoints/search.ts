import { SupportedLanguages } from '../../../interfaces'
import { FileFunction } from '../compilerInterfaces'
import { cardToCardSingle, getCards } from '../utils/cardUtil'

const fn: FileFunction = async (lang: SupportedLanguages) => {
	// For search endpoint, we need to return all cards with their full information
	// The actual filtering will happen at runtime in the server routes
	const allCards = await getCards(lang)
	
	// Convert all cards to the full card format with all details
	const cardsWithDetails = await Promise.all(
		allCards.map((card) => 
			cardToCardSingle(card[0], card[1], lang).catch((e) => {
				console.error('error compiling card for search', `${card[1].set.id}-${card[0]}`, e)
				throw e
			})
		)
	)
	
	return cardsWithDetails
}

export default fn
