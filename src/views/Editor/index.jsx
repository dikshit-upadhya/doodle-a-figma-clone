import Canvas from "./components/Canvas"
import DesignPropertiesMenu from "./components/DesignPropertiesMenu"
import LayersList from "./components/LayersList"
import Toolbar from "./components/Toolbar"



function Editor() {
  return (<>
    <LayersList />
    <Toolbar />
    <Canvas />
    <DesignPropertiesMenu />
    </>
  )
}

export default Editor