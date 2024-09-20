import {ChakraProvider} from '@chakra-ui/react'
import {theme} from "./styles/theme";

function App() {

    return (
        <ChakraProvider theme={theme}>
            <div></div>
        </ChakraProvider>
    )
}

export default App
