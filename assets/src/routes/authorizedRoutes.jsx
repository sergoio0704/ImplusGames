import { AccountProvider } from "../context/accountContext"
import { GameCatalog } from "../pages/game/game_catalog/gameCatalog"
import { Header } from "../components/header/header"

const { Routes, Route } = require("react-router")

export const AuthorizedRoutes = () => {
  return (
    <AccountProvider>
        <div className="container auth-container-background">
            <Header />
            <div className="content">
                <Routes>
                  <Route path='/' element={<GameCatalog />} />
                  <Route path='*' element={<GameCatalog />} />
              </Routes>
            </div>
        </div>
    </AccountProvider>
  )
}
