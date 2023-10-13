import './styles.css'

export const metadata = {
  title: 'Weather App',
  description: 'Weather app with react',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
