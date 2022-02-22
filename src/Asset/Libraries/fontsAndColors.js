import { Dimensions } from 'react-native'
import { wp, hp } from '.'

const { width, height } = Dimensions.get("window")

const fontsize = {
    tiny: hp("1.5%"),
    Small: hp("1.8%"), 
    mediumSmall: hp("2%"),
    medium: hp("2.2%"),
    largeSmall:hp("2.5%"),
    large: hp("2.9%"),
}

const fontfamily = {
    garamondAllFont: "garamond_[allfont.ru]",
    garamondRegular: "GaramondRegular",
    garamondNarrowBold: "GARMNDB",
    garmond: "garmond",
    garamondNormalBold: "GARNARB",
    garamondNormalItalic: "GARNARI",
}

const color = {
    app_color: "#fec722",
    drawer_color: "#616060",
    drawer_color1: "#667485",
    button_color: "#a674f9",
    line_color: "#f379a6",
    border_color: "#f07da8",
    header_background: "#2d4059",
}

export { fontsize, fontfamily, color, width, height, wp, hp }