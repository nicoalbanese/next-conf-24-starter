export type WeatherData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    weathercode: string;
    relativehumidity_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weathercode: number;
    relativehumidity_2m: number;
  };
};