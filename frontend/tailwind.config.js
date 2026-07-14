/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			card: '24px',
  			hero: '32px'
  		},
  		fontFamily: {
  			heading: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
  			marathi: ['"Noto Sans Devanagari"', 'sans-serif']
  		},
  		maxWidth: {
  			container: '1280px'
  		},
  		transitionTimingFunction: {
  			standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
  			emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)'
  		},
  		transitionDuration: {
  			350: '350ms'
  		},
  		spacing: {
  			'section-sm': '6rem',
  			section: '7.5rem',
  			'section-lg': '8.75rem'
  		},
  		boxShadow: {
  			soft: '0 10px 40px -12px rgba(16, 20, 24, 0.12)',
  			glass: '0 20px 60px -20px rgba(16, 20, 24, 0.35)',
  			glow: '0 0 0 1px rgba(93, 187, 99, 0.35), 0 12px 40px -12px rgba(31, 122, 61, 0.45)'
  		},
  		colors: {
  			brand: {
  				green: '#1F7A3D',
  				greenDark: '#13452C',
  				greenAccent: '#5DBB63',
  				ink: '#171717',
  				muted: '#6B7280',
  				bgDark: '#101418',
  				bgLight: '#F6FAF7',
  				white: '#FFFFFF'
  			},
  			// Editorial "farm" palette — derived from the Behance reference.
  			farm: {
  				cream: '#F5F1E8',
  				sand: '#E9E2D2',
  				beige: '#D8CEB8',
  				olive: '#8A8B5C',
  				oliveDeep: '#5C5D39',
  				forest: '#1E3A2A',
  				forestDeep: '#122017',
  				moss: '#3C5A41',
  				gold: '#E6D48C',
  				goldSoft: '#F0E7C4',
  				clay: '#C0805A',
  				ink: '#1B1A16'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-up': {
  				from: { opacity: '0', transform: 'translateY(24px)' },
  				to: { opacity: '1', transform: 'translateY(0)' }
  			},
  			'blur-reveal': {
  				from: { opacity: '0', filter: 'blur(12px)', transform: 'translateY(16px)' },
  				to: { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' }
  			},
  			'image-scale': {
  				from: { transform: 'scale(1)' },
  				to: { transform: 'scale(1.06)' }
  			},
  			'ken-burns': {
  				from: { transform: 'scale(1)' },
  				to: { transform: 'scale(1.05)' }
  			},
  			'light-rays': {
  				'0%, 100%': { opacity: '0.45', transform: 'translate3d(0, 0, 0) scale(1)' },
  				'50%': { opacity: '0.7', transform: 'translate3d(-2%, 1%, 0) scale(1.04)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
  			'blur-reveal': 'blur-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
  			'light-rays': 'light-rays 12s ease-in-out infinite',
  			'ken-burns': 'ken-burns 30s ease-in-out infinite alternate'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};