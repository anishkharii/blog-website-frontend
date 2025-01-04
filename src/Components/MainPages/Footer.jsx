import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#09090b] text-white py-6 text-center border-t border-white/20">
        <p>&copy; {new Date().getFullYear()} TechTales. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>
          <a href="#/" className="text-blue-400 hover:underline">Terms of Service</a>
        </div>
      </footer>
  )
}

export default Footer