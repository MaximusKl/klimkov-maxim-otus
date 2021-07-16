const API_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = '69103ae190349beb90c2a773b910dde3'

export async function getWeather(city: string): Promise<any> {
	const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
	return await response.json()
}
