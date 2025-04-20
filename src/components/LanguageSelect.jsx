import React, { useEffect, useRef, useState } from 'react'
import uzLan from '../assets/uzLan.png'
import ruLan from '../assets/ruLan.png'
import enLan from '../assets/enLan.png'
import { useLocation, useNavigate } from 'react-router-dom'

const LanguageSelect = ({ onChange, value }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const location = useLocation()
	const navigate = useNavigate()

	const languages = [
		{ code: 'uz', name: "O'zbek", flag: uzLan },
		{ code: 'ru', name: 'Русский', flag: ruLan },
		{ code: 'en', name: 'English', flag: enLan },
	]

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleSelect = (langCode) => {
		const pathParts = location.pathname.split('/').filter(Boolean)
		if (!languages.find(lang => lang.code === pathParts[0])) {
			pathParts.unshift(langCode)
		} else {
			pathParts[0] = langCode
		}
		const newPath = '/' + pathParts.join('/')
		navigate(newPath, { replace: true })
		onChange(langCode)
		setIsOpen(false)
	}

	const selectedLanguage = languages.find(lang => lang.code === value) || languages[0]

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-2 text-white hover:text-[#ff9600] transition-colors duration-200"
			>
				<img src={selectedLanguage.flag} alt={selectedLanguage.name} className="w-5 h-5 rounded-sm" />
				<span className="text-sm font-medium">{selectedLanguage.name}</span>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => handleSelect(lang.code)}
							className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
								value === lang.code ? 'text-[#ff9600] bg-gray-800' : 'text-white hover:bg-gray-800'
							}`}
						>
							<img src={lang.flag} alt={lang.name} className="w-5 h-5 rounded-sm" />
							<span>{lang.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default LanguageSelect
