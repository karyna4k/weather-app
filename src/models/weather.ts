export type Weather = {
  coord: Coord
  weather: WeatherDetail[]
  base: string
  main: WeatherMain
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: SystemData
  id: number
  name: string
  cod: number
}

export type Coord = {
  lon: number
  lat: number
}

export type Wind = {
  speed: number
  deg: number
}

export type Clouds = {
  all: number
}

export type WeatherDetail = {
  id: number
  main: string
  description: string
  icon: string
}

export type WeatherMain = {
  temp: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
}

export type SystemData = {
  type: number
  id: number
  message: number
  country: string
  sunrise: number
  sunset: number
}
