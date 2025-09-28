import React, { useEffect, useState } from 'react'
import { ThemeContext, type Theme } from './theme-context'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setTheme] = useState<Theme>('light')

 useEffect(() => {
  // Apply theme to document
  document.documentElement.setAttribute('data-theme', theme)
 }, [theme])

 const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light')
 }

 return (
  <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
   {children}
  </ThemeContext.Provider>
 )
}

