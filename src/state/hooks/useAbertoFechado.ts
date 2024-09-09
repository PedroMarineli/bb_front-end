import { useState } from "react";

function useAbertoFechado () {
    const [overlayAberto, setOverlayAberto] = useState(false)
    
    const clique = () => {
        setOverlayAberto(!overlayAberto)
    }
    
    return { overlayAberto, clique }
}

export default useAbertoFechado;