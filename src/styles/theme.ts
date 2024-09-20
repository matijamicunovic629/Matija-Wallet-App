import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
    colors: {
        gray: {
            "900": "#171D1C"
        },
        yellow: {
            "400": "#fec601"
        },
        purple: {
            "300": "#5863f8"
        }
        

    },
    fonts: {
        heading: 'Roboto',
        body:'Roboto'
    },
    styles:{
        global:{
                body:{
                    bg: 'white',
                    color: 'gray.900'
                }
        }
    }
})