import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

const translations = {
	uz: {
		home: 'BOSH SAHIFA',
		tournaments: 'TURNIRLAR',
		articles: 'MAQOLALAR',
		news: 'YANGILIKLAR',
		rating: 'REYTING',
		tips: 'MASLAHATLAR',
		interviews: 'INTERVYULAR',
		tournamentReviews: 'TURNIR SHARHLARI',
		siteUpdates: 'SAYTDAGI O\'ZGARISHLAR',
		esportsNews: 'ESPORT YANGILIKLARI',
		gameUpdates: 'O\'YIN YANGILANISHLARI',
		topTeams: 'ENG YAXSHI JAMOALAR',
		topPlayers: 'ENG YAXSHI O\'YINCHILAR',
		createAccount: 'AKKAUNT YARATISH',
		login: 'KIRISH'
	},
	ru: {
		home: 'ГЛАВНАЯ',
		tournaments: 'ТУРНИРЫ',
		articles: 'СТАТЬИ',
		news: 'НОВОСТИ',
		rating: 'РЕЙТИНГ',
		tips: 'СОВЕТЫ',
		interviews: 'ИНТЕРВЬЮ',
		tournamentReviews: 'ОБЗОРЫ ТУРНИРОВ',
		siteUpdates: 'ИЗМЕНЕНИЯ НА САЙТЕ',
		esportsNews: 'НОВОСТИ КИБЕРСПОРТА',
		gameUpdates: 'ОБНОВЛЕНИЯ ИГР',
		topTeams: 'ЛУЧШИЕ КОМАНДЫ',
		topPlayers: 'ЛУЧШИЕ ИГРОКИ',
		createAccount: 'СОЗДАТЬ АККАУНТ',
		login: 'ВОЙТИ'
	},
	en: {
		home: 'HOME',
		tournaments: 'TOURNAMENTS',
		articles: 'ARTICLES',
		news: 'NEWS',
		rating: 'RATING',
		tips: 'TIPS',
		interviews: 'INTERVIEWS',
		tournamentReviews: 'TOURNAMENT REVIEWS',
		siteUpdates: 'SITE UPDATES',
		esportsNews: 'ESPORTS NEWS',
		gameUpdates: 'GAME UPDATES',
		topTeams: 'TOP TEAMS',
		topPlayers: 'TOP PLAYERS',
		createAccount: 'CREATE ACCOUNT',
		login: 'LOGIN'
	}
}

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('uz')

	const changeLanguage = (lang) => {
		setLanguage(lang)
	}

	const t = (key) => {
		return translations[language]?.[key] || key
	}

	return (
		<LanguageContext.Provider value={{ language, changeLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	)
} 