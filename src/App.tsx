import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import InicioSistema from './pages/InicioSistema'
import ReservaDeMesas from './pages/ReservaDeMesas'
import Cozinha from './pages/Cozinha'
import CadastroDePedidos from './pages/CadastroDePedidos'
import AlterarCardapio from './pages/AlterarCardapio'
import Caixa from './pages/Caixa'
import PaginaPadrao from './components/PaginaPadrao'
import { RecoilRoot } from 'recoil'

function App() {
  return (
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
          </Route>
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
