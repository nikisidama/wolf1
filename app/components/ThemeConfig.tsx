"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { FaEyeDropper } from "react-icons/fa"

export function ModeToggle() {
  const { setTheme } = useTheme();

  const storedColor = typeof window !== 'undefined' ? localStorage.getItem('accentColor') : null;
  const defaultColor = '#ff0000';
  const [color, setColor] = useState(storedColor || defaultColor);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', color);
    if (typeof window !== 'undefined') localStorage.setItem('accentColor', color);
  }, [color]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setColor(event.target.value);

  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive" size="lg" className="p-3 z-10 hover:text-foreground">
          <Sun className="h-[1.2em] w-[1.2em] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2em] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button variant="destructive" size="lg" className="p-3 relative z-10 hover:text-foreground">
      <FaEyeDropper className="h-5 w-5" />
      <Input
        type="color"
        value={color}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </Button>
  </>
}

export default ModeToggle
