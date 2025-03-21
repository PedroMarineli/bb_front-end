import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import InicioSistema from './pages/InicioSistema'
import ReservaDeMesas from './pages/ReservaDeMesas'
import Cozinha from './pages/Cozinha'
import CadastroDePedidos from './pages/CadastroDePedidos'
import AlterarCardapio from './pages/AlterarCardapio'
import Caixa from './pages/Caixa'
import PaginaPadrao from './components/PaginaPadrao'
import Usuarios from './pages/Usuarios'
import Relatorios from './pages/Relatorios'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path='/' element={<Inicio />}/>
            <Route path='/' element={<PaginaPadrao />}>
              <Route path='/bb' element={<InicioSistema />}/>
              <Route path='/bb-reservas' element={<ReservaDeMesas />}/>
              <Route path='/bb-cozinha' element={<Cozinha />}/>
              <Route path='/bb-cadastro-pedidos' element={<CadastroDePedidos />}/>
              <Route path='/bb-alterar-cardapio' element={<AlterarCardapio />}/>
              <Route path='/bb-caixa' element={<Caixa />}/>
              <Route path='/bb-usuarios' element={<Usuarios />}/>
              <Route path='/bb-relatorios' element={<Relatorios />}/>
            </Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
