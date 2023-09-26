const getStakeLayerColors = (r, g, b) => {
  const opacityLow = 0.1;
  const opacityMiddle = 0.15;
  const opacityHight = 0.2;

  return {
    low: `rgba(${r},${g},${b},${opacityLow})`,
    middle: `rgba(${r},${g},${b},${opacityMiddle})`,
    hight: `rgba(${r},${g},${b},${opacityHight})`,
    none: `rgba(${r},${g},${b},0)`
  };
};

const colors = {
  transparent: "transparent",

  primary: "#B8722A",
  "primary-sl": getStakeLayerColors(255, 255, 255),
  "on-primary": "#FEFEFD",
  "on-primary-sl": getStakeLayerColors(184, 114, 42),
  "primary-container": "#F4EADF",
  "primary-container-sl": getStakeLayerColors(90, 56, 21),
  "on-primary-container": "#5A3815",
  "on-primary-container-sl": getStakeLayerColors(244, 234, 223),

  secondary: "#222E42",
  "secondary-sl": getStakeLayerColors(253, 253, 253),
  "on-secondary": "#FDFDFD",
  "on-secondary-sl": getStakeLayerColors(34, 46, 66),
  "secondary-container": "#DEE0E3",
  "secondary-container-sl": getStakeLayerColors(17, 23, 32),
  "on-secondary-container": "#111720",
  "on-secondary-container-sl": getStakeLayerColors(222, 224, 227),

  tertiary: "#229AB9",
  "tertiary-sl": getStakeLayerColors(253, 254, 254),
  "on-tertiary": "#FDFEFE",
  "on-tertiary-sl": getStakeLayerColors(34, 154, 185),
  "tertiary-container": "#D9ECF1",
  "tertiary-container-sl": getStakeLayerColors(17, 75, 91),
  "on-tertiary-container": "#114B5B",
  "on-tertiary-container-sl": getStakeLayerColors(217, 236, 241),

  error: "#EF5B1B",
  "error-sl": getStakeLayerColors(255, 253, 253),
  "on-error": "#FFFDFD",
  "on-error-sl": getStakeLayerColors(239, 91, 27),
  "error-container": "#F8D1C0",
  "error-container-sl": getStakeLayerColors(117, 45, 13),
  "on-error-container": "#752D0D",
  "on-error-container-sl": getStakeLayerColors(248, 209, 192),

  success: "#0A8463",
  "success-sl": getStakeLayerColors(253, 254, 253),
  "on-success": "#FDFEFD",
  "on-success-sl": getStakeLayerColors(10, 132, 99),
  "success-container": "#CEE6E0",
  "success-container-sl": getStakeLayerColors(5, 65, 49),
  "on-success-container": "#054131",
  "on-success-container-sl": getStakeLayerColors(206, 230, 224),

  background: "#F6F4F1",
  "background-sl": getStakeLayerColors(48, 47, 46),
  "on-background": "#302F2E",
  "on-background-sl": getStakeLayerColors(246, 244, 241),

  surface: "#EEEAE4",
  "surface+1": "#F2EFEA",
  "surface+2": "#F6F4F1",
  "surface+3": "#FAF9F7",
  "surface+4": "#FEFEFE",
  "surface-sl": getStakeLayerColors(48, 47, 46),
  "on-surface": "#302F2E",
  "on-surface-sl": getStakeLayerColors(238, 234, 228),

  "surface-variant": "#E8E2DA",
  "surface-variant-sl": getStakeLayerColors(93, 90, 87),
  "on-surface-variant": "#5D5A57",
  "on-surface-variant-sl": getStakeLayerColors(232, 226, 218),

  outline: "#B0ACA6",
  "outline-sl": getStakeLayerColors(93, 90, 87),

  "outline-variant": "#CCC7C0",
  "outline-variant-sl": getStakeLayerColors(93, 90, 87),

  backdrop: "rgba(7, 9, 13, 0.6)",
  blue: "#3B7FE5",
  mono: {
    3: "rgba(0, 0, 0, 0.03)",
    50: "rgba(16, 39, 52, 0.05)",
    75: "rgba(16, 39, 52, 0.075)",
    100: "rgba(0, 0, 0, 0.1)",
    200: "rgba(0, 0, 0, 0.2)",
    300: "rgba(0, 0, 0, 0.3)",
    450: "rgba(0, 0, 0, 0.45)",
    750: "rgba(0, 0, 0, 0.75)",
    black: "#000000",
    white: "#FFFFFF",
    primary: "#B8722A",
    primaryLight: "rgba(184, 114, 42, 0.85)",
    secondary: "rgba(184, 114, 42, 0.2)",
    tertiary: "#F2EFEA"
  },
  warning: "#FFCC18"
};

const sizes = {
  auto: "auto",
  0: "0px",
  "1px": "1px",
  "2px": "2px",
  "3px": "3px",
  "4px": "4px",
  "5px": "5px",
  "6px": "6px",
  "7px": "7px",
  "8px": "8px",
  "9px": "9px",
  "10px": "10px",
  "11px": "11px",
  "12px": "12px",
  "13px": "13px",
  "14px": "14px",
  "15px": "15px",
  "16px": "16px",
  "18px": "18px",
  "19px": "19px",
  "20px": "20px",
  "21px": "21px",
  "22px": "22px",
  "23px": "23px",
  "24px": "24px",
  "26px": "26px",
  "27px": "27px",
  "28px": "28px",
  "30px": "30px",
  "32px": "32px",
  "34px": "34px",
  "36px": "36px",
  "38px": "38px",
  "40px": "40px",
  "42px": "42px",
  "44px": "44px",
  "46px": "46px",
  "47px": "47px",
  "48px": "48px",
  "50px": "50px",
  "52px": "52px",
  "53px": "53px",
  "54px": "54px",
  "56px": "56px",
  "59px": "59px",
  "60px": "60px",
  "63px": "63px",
  "64px": "64px",
  "66px": "66px",
  "68px": "68px",
  "72px": "72px",
  "73px": "73px",
  "77px": "77px",
  "80px": "80px",
  "88px": "88px",
  "100px": "100px",
  "110px": "110px",
  "120px": "120px",
  "125px": "125px",
  "134px": "134px",
  "140px": "140px",
  "141px": "141px",
  "146px": "146px",
  "150px": "150px",
  "165px": "165px",
  "166px": "166px",
  "168px": "168px",
  "170px": "170px",
  "178px": "178px",
  "180px": "180px",
  "185px": "185px",
  "192px": "192px",
  "200px": "200px",
  "222px": "222px",
  "240px": "240px",
  "256px": "256px",
  "290px": "290px",
  "295px": "295px",
  "297px": "297px",
  "300px": "300px",
  "320px": "320px",
  "326px": "326px",
  "350px": "350px",
  "354px": "354px",
  "375px": "375px",
  "400px": "400px",
  "424px": "424px",
  "450px": "450px",
  "480px": "480px",
  "486px": "486px",
  "487px": "487px",
  "550px": "550px",
  "630px": "630px",
  "714px": "714px",
  "720px": "720px",
  "768px": "768px",
  "1200px": "1200px",
  "20%": "20%",
  "30%": "30%",
  "33%": "33%",
  "45%": "45%",
  "47%": "47%",
  "50%": "50%",
  "100%": "100%",
  "80vh": "80vh",
  "95vh": "95vh",
  "100vh": "100vh",
  "100vw": "100vw"
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      borderRadius: {
        0: "0px",
        DEFAULT: "0.5rem",
        "1/2": "50%",
        "2px": "2px",
        "4px": "4px",
        "6px": "6px",
        "8px": "8px",
        "16px": "16px",
        "20px": "20px",
        "30px": "30px",
        "100px": "100px"
      },
      boxShadow: {
        none: "none",
        "evaluation-1":
          "0px 1px 2px rgba(48, 47, 46, 0.3), 0px 1px 3px 1px rgba(48, 47, 46, 0.15)",
        "evaluation-2":
          "0px 1px 2px rgba(48, 47, 46, 0.3), 0px 2px 6px 2px rgba(48, 47, 46, 0.15)",
        "evaluation-3":
          "0px 4px 8px 3px rgba(48, 47, 46, 0.15), 0px 1px 3px rgba(48, 47, 46, 0.3)",
        "evaluation-4":
          "0px 6px 10px 4px rgba(48, 47, 46, 0.15), 0px 2px 3px rgba(48, 47, 46, 0.3)",
        "evaluation-5":
          "0px 8px 12px 6px rgba(48, 47, 46, 0.15), 0px 4px 4px rgba(48, 47, 46, 0.3)"
      },
      colors: {
        ...colors
      },
      flex: {
        1: "1 1 0%",
        2: "2 1 0%",
        3: "3 1 0%",
        4: "4 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none"
      },
      flexGrow: {
        0: "0",
        1: "1",
        3: "3",
        4: "4",
        DEFAULT: "1"
      },
      fontFamily: {
        optima: ["Optima", "Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
      fontSize: {
        base: ["1rem", "1.5rem"],
        "caption-sm": ["11px", "16px"],
        "caption-lg": ["12px", "18px"],
        "button-sm": ["13px", "18px"],
        "body-sm": ["14px", "21px"],
        "button-lg": ["15px", "24px"],
        "body-lg": ["16px", "24px"],
        "3xs": ["12px", "16px"],
        "2xs": ["13px", "21px"],
        xs: ["18px", "24px"],
        sm: ["21px", "27px"],
        md: ["24px", "30px"],
        lg: ["30px", "38px"],
        xl: ["32px", "40px"],
        "2xl": ["36px", "42px"],
        "3xl": ["40px", "48px"],
        "4xl": ["48px", "60px"]
      },
      height: {
        ...sizes
      },
      letterSpacing: {
        "005em": "0.05em",
        "0002em": "0.002em",
        "0005em": "0.005em"
      },
      maxWidth: {
        ...sizes
      },
      minHeight: {
        ...sizes
      },
      minWidth: {
        ...sizes
      },
      opacity: {
        0: "0",
        40: "0.4",
        45: "0.45",
        100: "1"
      },
      scale: {
        75: ".75",
        80: ".80",
        85: ".85",
        100: "1",
        200: "2",
        250: "2.5"
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
      },
      spacing: {
        ...sizes
      },
      translate: {
        ...sizes
      },
      width: {
        ...sizes
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        99998: "99998",
        99999: "99999"
      },
      keyframes: {
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        appear: "appear 0.75s ease-in"
      }
    }
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false
  },
  plugins: []
};
