import test_svg from './extensions/cells-medical.svg';
import test_favicon from './extensions/favicon.svg';
const config = {
  locales: ['sv'],
//   translations: {
    // sv: {
    //     "global.marketplace": "MarketPlats",
    // }
//   }
    auth: {
        logo: test_svg
    },
    menu: {
        logo: test_svg
    },
    head: {
        favicon: test_favicon
    },
    // theme: {
    //     colors: {
    //         buttonPrimary600: '#32324D',
    //         primary600: '#32324D',
    //         buttonPrimary500: '#8E8EA9',
    //         primary500: '#8E8EA9',
    //     }
    // }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
