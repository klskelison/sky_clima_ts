import { useState } from 'react';

interface ClimaData {
  cidade: string;
  temperatura: number;
  descricao: string;
  umidade: number;
  vento: number;
  icon: string;
}

// Dicionário de ícones baseado nos códigos oficiais do OpenWeatherMap
const climaIcons: Record<string, string> = {
  "01d": "☀️", // céu limpo (dia)
  "01n": "🌙", // céu limpo (noite)
  "02d": "⛅", // poucas nuvens (dia)
  "02n": "☁️", // poucas nuvens (noite)
  "03d": "☁️", // nuvens dispersas
  "03n": "☁️",
  "04d": "☁️", // nublado
  "04n": "☁️",
  "09d": "🌧️", // chuva forte / chuvisco
  "09n": "🌧️",
  "10d": "🌦️", // chuva (dia)
  "10n": "🌧️", // chuva (noite)
  "11d": "⛈️", // tempestade
  "11n": "⛈️",
  "13d": "❄️", // neve
  "13n": "❄️",
  "50d": "🌫️", // névoa / nevoeiro
  "50n": "🌫️",
};



function App() {
  const [clima, setClima] = useState<ClimaData | null>(null);

  const [search, setSearch] = useState<string>('');

  const fetchClima = async (cityName: string): Promise<void> => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${apiKey}`);
      
      if (!response.ok) {
        throw new Error("Cidade não encontrada!");
      }
 
      const data = await response.json();

      setClima({
        cidade: data.name,
        temperatura: Math.round(data.main.temp),
        descricao: data.weather[0].description,
        umidade: data.main.humidity,
        vento: Math.round(data.wind.speed *3.6), // Convertendo de m/s para km/h
        icon: data.weather[0].icon
      })
    } catch (error) {
      alert("Erro ao buscar clima. Verifique o nome da cidade!");
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = (): void => {
    if (!search.trim()) {
      alert('Digite o nome de uma cidade para buscar o clima.');

      return;
    }
    
    fetchClima(search);

    setSearch('');
  }

  

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-blue-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 text-white flex flex-col">
        <h1 className="text-xl font-bold text-center mb-4">Clima App</h1>
        <div className="flex items-center gap-2 mb-4">
          <input type="text" placeholder="Digite o nome da cidade..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/10 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-400 transition-all border border-white/10" />
          <button onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-colors shadow-lg" title="Buscar cidade">Buscar</button>
        </div>
      </header>


        {clima === null ? (
          // Mensagem exibida antes de qualquer busca
          <div className="text-center py-8 text-white/60">
            <span className="text-4xl block mb-2">🌤️</span>
            <p className="text-sm font-medium">Digite uma cidade para ver as condições climáticas.</p>
          </div>
        ) : (
          // Blocos de Clima
          <div className="flex flex-col gap-6">
            
            {/* Bloco do Clima Principal */}
            <div className="flex flex-col items-center text-center mt-3">
              <h2 className="text-3xl text-white font-bold tracking-wide">{clima.cidade}</h2>
              
              <div className="text-7xl font-extrabold my-4 flex items-start justify-center">
                <span className="text-white">{clima.temperatura}</span>
                <span className="text-3xl font-medium text-emerald-400">°C</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                <span className="text-xl">{climaIcons[clima.icon] || "❓"}</span>
                <span className="text-sm font-medium tracking-wide uppercase">{clima.descricao}</span>
              </div>
            </div>

            {/* Bloco de Detalhes do Clima */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              
              {/* Card de Umidade */}
              <div className="flex flex-col items-center text-center gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="text-2xl">💧</span>
                <div>
                  <p className="text-xs text-white/50 font-medium">Umidade</p>
                  <p className="text-lg font-bold">{clima.umidade}%</p>
                </div>
              </div>

              {/* Card de Vento */}
              <div className="flex flex-col items-center text-center gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="text-2xl">💨</span>
                <div>
                  <p className="text-xs text-white/50 font-medium">Vento</p>
                  <p className="text-lg font-bold">{clima.vento} km/h</p>
                </div>
              </div>

            </div>

          </div>
        )}

    </div>
  )};
        
  


export default App;
