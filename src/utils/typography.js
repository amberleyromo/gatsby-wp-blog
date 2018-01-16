import Typography from 'typography'
import Sutro from 'typography-theme-sutro'

Sutro.headerLineHeight = 1.1
Sutro.baseFontSize = '22px'
Sutro.overrideThemeStyles = ({ rhythm }, options) => {
  return {
    h1: {
      lineHeight: 1,
      marginTop: rhythm(1 / 4),
      marginBottom: rhythm(1 / 3),
    },
    'h2,h3': {
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 3),
      lineHeight: 1.4,
    },
    p: {
      marginBottom: rhythm(2),
      lineHeight: 1.78,
    },
    a: {
      color: `rgb(0,0,0)`,
    },
  }
}
// console.log(Sutro)

const typography = new Typography(Sutro)

export default typography
