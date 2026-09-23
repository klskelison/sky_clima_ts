# 🌤️ Weather App (Aplicativo de Clima)

Um aplicativo moderno e responsivo para consulta meteorológica em tempo real, desenvolvido para consolidar conceitos avançados de componentização, consumo de APIs e tipagem estática no ecossistema do React.

---

## 🚀 Tecnologias Utilizadas

- **React** (com Vite para uma inicialização e build ultra-rápidos)
- **TypeScript** (garantindo tipagem estática, interfaces seguras e prevenção de bugs em tempo de desenvolvimento)
- **Tailwind CSS** (estilização moderna utilizando o conceito de Utility-First e efeito Glassmorphism)
- **OpenWeatherMap API** (integração assíncrona para consumo de dados meteorológicos globais)

---

## 🛠️ Funcionalidades Implementadas

- 🔍 **Busca Avançada:** Consulta de dados climáticos em tempo real digitando o nome de qualquer cidade.
- ⌨️ **UX Aprimorada:** Disparo de busca integrado tanto pelo clique no botão quanto pelo pressionamento da tecla **Enter**.
- ⚙️ **TypeScript Strict:** Uso de interfaces (`interface WeatherData`) para tipagem segura dos estados e respostas da API, além de tipagem correta de retornos assíncronos (`Promise<void>`) e eventos de formulário/teclado.
- 🎨 **Layout Dinâmico:** Os ícones e descrições do clima se alteram dinamicamente (em português) de acordo com a resposta da API.
- 🔐 **Segurança da Informação:** Chaves de API protegidas localmente utilizando variáveis de ambiente (`.env.local`) no padrão do Vite.

---

## 🏁 Como Executar o Projeto Localmente

Se você deseja rodar este projeto na sua máquina, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/sky_clima_ts
   ```
2. Entre na pasta do projeto:
   ```bash
   cd sky_clima_ts
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env.local` na raiz do projeto e adicione a sua chave da OpenWeather:
   ```env
   VITE_WEATHER_API_KEY=sua_chave_aqui
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
