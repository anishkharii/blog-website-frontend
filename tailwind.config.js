

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
   darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',     
        secondary: 'var(--color-secondary)', 
        accent: 'var(--color-accent)', 
        dark_accent: 'var(--color-dark-accent)' ,
        light_accent: 'var(--color-light-accent)' ,
        bg_light: 'var(--color-bg-light)',    
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        shadow: 'var(--color-shadow)',
      },
      fontFamily:{
        sans:['Montserrat', 'sans-serif'],
        heading:['Poppins', 'sans-serif'],
        
      }
    },
   
  },
  plugins: [],
}


