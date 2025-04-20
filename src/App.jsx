import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ComingSoon from './components/Coming-soon'
import Navbar from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'

// Sahifalar uchun placeholder komponentlar
const Tournaments = () => <ComingSoon />
const Articles = () => <ComingSoon />
const News = () => <ComingSoon />
const Rating = () => <ComingSoon />
const Profile = () => <ComingSoon />

const App = () => {
	return (
		<LanguageProvider>
			<Router>
				<div className="min-h-screen bg-gray-900">
					<Navbar />
					<Routes>
						{/* Asosiy sahifalar */}
						<Route path="/" element={<ComingSoon />} />
						<Route path="/:lang" element={<ComingSoon />} />
						
						{/* Turnirlar sahifasi va uning o'yinlari */}
						<Route path="/:lang/turnirlar" element={<Tournaments />} />
						<Route path="/:lang/turnirlar/:game" element={<Tournaments />} />
						
						{/* Maqolalar sahifasi va uning bo'limlari */}
						<Route path="/:lang/articles" element={<Articles />} />
						<Route path="/:lang/articles/tips" element={<Articles />} />
						<Route path="/:lang/articles/interviews" element={<Articles />} />
						<Route path="/:lang/articles/tournament-reviews" element={<Articles />} />
						
						{/* Yangiliklar sahifasi va uning bo'limlari */}
						<Route path="/:lang/news" element={<News />} />
						<Route path="/:lang/news/site-updates" element={<News />} />
						<Route path="/:lang/news/esports" element={<News />} />
						<Route path="/:lang/news/game-updates" element={<News />} />
						
						{/* Reyting sahifasi va uning bo'limlari */}
						<Route path="/:lang/rating" element={<Rating />} />
						<Route path="/:lang/rating/teams" element={<Rating />} />
						<Route path="/:lang/rating/players" element={<Rating />} />
						
						{/* Profil sahifasi */}
						<Route path="/:lang/profile" element={<Profile />} />
					</Routes>
				</div>
			</Router>
		</LanguageProvider>
	)
}

export default App