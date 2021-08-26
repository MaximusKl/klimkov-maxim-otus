const API_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = '06d6d3f83ad452277e6b3d5ac0668f72'

export async function getWeather(city: string): Promise<any> {
	const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
	return await response.json()
}
