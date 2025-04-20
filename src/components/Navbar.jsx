import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoTitle from '../assets/logo-title.png'
import Logo from '../assets/Logo.png'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelect from './LanguageSelect'

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState(null)
	const { t, changeLanguage, language } = useLanguage()
	const location = useLocation()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('')

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (activeDropdown && !event.target.closest('.dropdown-container')) {
				setActiveDropdown(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [activeDropdown])

	useEffect(() => {
		// Set active section based on current path
		const path = location.pathname
		if (path.includes('/turnirlar') || path.includes('/tournaments')) {
			setActiveSection('turnirlar')
		} else if (path.includes('/profile')) {
			setActiveSection('profile')
		} else {
			setActiveSection('')
		}
	}, [location])

	const handleLanguageChange = (lang) => {
		changeLanguage(lang)
		
		// Get the current path without the language prefix
		const pathSegments = location.pathname.split('/').filter(Boolean)
		const hasLanguagePrefix = ['uz', 'ru', 'en'].includes(pathSegments[0])
		
		let newPath
		if (hasLanguagePrefix) {
			// Replace the language prefix
			newPath = `/${lang}/${pathSegments.slice(1).join('/')}`
		} else if (location.pathname === '/' || location.pathname === '') {
			// If we're at the root, just add the language prefix
			newPath = `/${lang}`
		} else {
			// Add the language prefix to the current path
			newPath = `/${lang}${location.pathname}`
		}
		
		// Navigate to the new path
		navigate(newPath)
	}

	// Memoize navLinks to prevent unnecessary re-renders
	const navLinks = useMemo(() => [
		{ 
			name: t('home'), 
			path: `/${language}`, 
			key: 'home',
			dropdownItems: []
		},
		{ 
			name: t('tournaments'), 
			path: `/${language}/turnirlar`, 
			key: 'tournaments',
			dropdownItems: [
				{ name: 'PUBGM', path: `/${language}/turnirlar?game=pubgm` },
				{ name: 'DOTA 2', path: `/${language}/turnirlar?game=dota2` },
				{ name: 'CS 2', path: `/${language}/turnirlar?game=cs2` },
				{ name: 'MLBB', path: `/${language}/turnirlar?game=mlbb` },
				{ name: 'DOTA 1', path: `/${language}/turnirlar?game=dota1` },
				{ name: 'VALORANT', path: `/${language}/turnirlar?game=valorant` },
				{ name: 'FREE FIRE', path: `/${language}/turnirlar?game=freefire` }
			]
		},
		{ 
			name: t('articles'), 
			path: `/${language}/articles`, 
			key: 'articles',
			dropdownItems: [
				{ name: t('tips'), path: `/${language}/articles/tips` },
				{ name: t('interviews'), path: `/${language}/articles/interviews` },
				{ name: t('tournamentReviews'), path: `/${language}/articles/tournament-reviews` }
			]
		},
		{ 
			name: t('news'), 
			path: `/${language}/news`, 
			key: 'news',
			dropdownItems: [
				{ name: language === 'uz' ? 'SAYTDAGI O\'ZGARISHLARI' : (language === 'ru' ? 'ИЗМЕНЕНИЯ НА САЙТЕ' : (language === 'en' ? 'SITE UPDATES' : t('siteUpdates'))), path: `/${language}/news/site-updates` },
				{ name: t('esportsNews'), path: `/${language}/news/esports` },
				{ name: t('gameUpdates'), path: `/${language}/news/game-updates` }
			]
		},
		{ 
			name: t('rating'), 
			path: `/${language}/rating`, 
			key: 'rating',
			dropdownItems: [
				{ name: t('topTeams'), path: `/${language}/rating/teams` },
				{ name: t('topPlayers'), path: `/${language}/rating/players` }
			]
		}
	], [t, language])

	const toggleDropdown = (key) => {
		setActiveDropdown(activeDropdown === key ? null : key)
	}

	const getTournamentsText = () => {
		switch(language) {
			case 'uz':
				return "TURNIRLAR"
			case 'ru':
				return "ТУРНИРЫ"
			case 'en':
				return "TOURNAMENTS"
			default:
				return "TURNIRLAR"
		}
	}

	const getProfileText = () => {
		switch(language) {
			case 'uz':
				return "PROFIL"
			case 'ru':
				return "ПРОФИЛЬ"
			case 'en':
				return "PROFILE"
			default:
				return "PROFIL"
		}
	}

	const handleTournamentsClick = () => {
		navigate(`/${language}/turnirlar`)
		setIsOpen(false)
	}

	const handleProfileClick = () => {
		navigate(`/${language}/profile`)
		setIsOpen(false)
	}

	return (
		<nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[90px] font-kanit font-normal text-2xl bg-gray-900/95 backdrop-blur-sm shadow-lg">
			<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
				<div className="flex items-center justify-between h-full">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link to={`/${language}`} className="flex items-center">
							<img src={Logo} alt="Logo" className="h-12 w-auto" />
						</Link>
					</div>

				

					{/* Right side buttons */}
					<div className="hidden md:flex items-center space-x-4">
						<LanguageSelect onChange={handleLanguageChange} value={language} />
						
						
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<LanguageSelect onChange={handleLanguageChange} value={language} />
						
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div className={`md:hidden transition-all duration-300 ease-in-out ${
				isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
			} overflow-hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm">
					{navLinks.map((link) => (
						<div key={link.key} className="dropdown-container">
							{link.dropdownItems.length > 0 ? (
								<button
									onClick={() => toggleDropdown(link.key)}
									className={`w-full text-left text-white hover:text-[#ff9600] block px-3 py-2 rounded-md text-2xl font-kanit font-normal transition-colors duration-200 flex items-center justify-between ${
										activeDropdown === link.key ? 'text-[#ff9600]' : ''
									}`}
								>
									{link.name}
									<svg
										className={`w-5 h-5 transition-transform duration-200 ${
											activeDropdown === link.key ? 'rotate-180' : ''
										}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
							) : (
								<Link
									to={link.path}
									className="text-white hover:text-[#ff9600] block px-3 py-2 rounded-md text-2xl font-kanit font-normal transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.name}
								</Link>
							)}
							{link.dropdownItems.length > 0 && (
								<div className={`pl-4 space-y-1 transition-all duration-300 ${
									activeDropdown === link.key ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
								} overflow-hidden`}>
									{link.dropdownItems.map((item, index) => (
										<Link
											key={index}
											to={item.path}
											className="text-white hover:text-[#ff9600] block px-3 py-2 rounded-md text-xl font-kanit font-normal transition-colors duration-200 flex items-center gap-2"
											onClick={() => {
												setIsMobileMenuOpen(false)
												setActiveDropdown(null)
											}}
										>
											<img
												src={logoTitle}
												alt="Icon"
												className="w-5 h-5"
											/>
											{item.name}
										</Link>
									))}
								</div>
							)}
						</div>
					))}
					<div className="pt-4 space-y-2">
						<button className="w-full bg-[#ff9600] text-white px-4 py-2 rounded-md text-base font-kanit font-normal hover:bg-[#ff9600]/90 transition-colors duration-200">
							{t('createAccount')}
						</button>
						<button className="w-full bg-gray-700 text-white px-4 py-2 rounded-md text-base font-kanit font-normal hover:bg-gray-600 transition-colors duration-200">
							{t('login')}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<motion.div 
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className="md:hidden bg-[#0D0D0D] border-t border-gray-800"
				>
					<div className="px-4 py-3 space-y-3">
						<button 
							onClick={handleTournamentsClick}
							className={`block w-full text-left text-white hover:text-[#FF9600] transition-colors duration-300 font-medium ${
								activeSection === 'turnirlar' ? 'text-[#FF9600]' : ''
							}`}
						>
							{getTournamentsText()}
						</button>
						<button 
							onClick={handleProfileClick}
							className={`block w-full text-left text-white hover:text-[#FF9600] transition-colors duration-300 font-medium ${
								activeSection === 'profile' ? 'text-[#FF9600]' : ''
							}`}
						>
							{getProfileText()}
						</button>
					</div>
				</motion.div>
			)}
		</nav>
	)
}

export default Navbar 