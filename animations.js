// ==================== DEBUG HELPER ====================
const DEBUG = false;
function log(...args) {
  if (DEBUG) console.log("[EJ Animation]", ...args);
}

// ==================== PRE-COMPUTED COLOR CACHE ====================
// O(1) lookup - 1.89x faster than string concatenation
// Resolution independent - just rgba strings at 101 alpha levels (0.00-1.00)
const COLOR_CACHE = {"sage":["rgba(155,170,143,0.00)","rgba(155,170,143,0.01)","rgba(155,170,143,0.02)","rgba(155,170,143,0.03)","rgba(155,170,143,0.04)","rgba(155,170,143,0.05)","rgba(155,170,143,0.06)","rgba(155,170,143,0.07)","rgba(155,170,143,0.08)","rgba(155,170,143,0.09)","rgba(155,170,143,0.10)","rgba(155,170,143,0.11)","rgba(155,170,143,0.12)","rgba(155,170,143,0.13)","rgba(155,170,143,0.14)","rgba(155,170,143,0.15)","rgba(155,170,143,0.16)","rgba(155,170,143,0.17)","rgba(155,170,143,0.18)","rgba(155,170,143,0.19)","rgba(155,170,143,0.20)","rgba(155,170,143,0.21)","rgba(155,170,143,0.22)","rgba(155,170,143,0.23)","rgba(155,170,143,0.24)","rgba(155,170,143,0.25)","rgba(155,170,143,0.26)","rgba(155,170,143,0.27)","rgba(155,170,143,0.28)","rgba(155,170,143,0.29)","rgba(155,170,143,0.30)","rgba(155,170,143,0.31)","rgba(155,170,143,0.32)","rgba(155,170,143,0.33)","rgba(155,170,143,0.34)","rgba(155,170,143,0.35)","rgba(155,170,143,0.36)","rgba(155,170,143,0.37)","rgba(155,170,143,0.38)","rgba(155,170,143,0.39)","rgba(155,170,143,0.40)","rgba(155,170,143,0.41)","rgba(155,170,143,0.42)","rgba(155,170,143,0.43)","rgba(155,170,143,0.44)","rgba(155,170,143,0.45)","rgba(155,170,143,0.46)","rgba(155,170,143,0.47)","rgba(155,170,143,0.48)","rgba(155,170,143,0.49)","rgba(155,170,143,0.50)","rgba(155,170,143,0.51)","rgba(155,170,143,0.52)","rgba(155,170,143,0.53)","rgba(155,170,143,0.54)","rgba(155,170,143,0.55)","rgba(155,170,143,0.56)","rgba(155,170,143,0.57)","rgba(155,170,143,0.58)","rgba(155,170,143,0.59)","rgba(155,170,143,0.60)","rgba(155,170,143,0.61)","rgba(155,170,143,0.62)","rgba(155,170,143,0.63)","rgba(155,170,143,0.64)","rgba(155,170,143,0.65)","rgba(155,170,143,0.66)","rgba(155,170,143,0.67)","rgba(155,170,143,0.68)","rgba(155,170,143,0.69)","rgba(155,170,143,0.70)","rgba(155,170,143,0.71)","rgba(155,170,143,0.72)","rgba(155,170,143,0.73)","rgba(155,170,143,0.74)","rgba(155,170,143,0.75)","rgba(155,170,143,0.76)","rgba(155,170,143,0.77)","rgba(155,170,143,0.78)","rgba(155,170,143,0.79)","rgba(155,170,143,0.80)","rgba(155,170,143,0.81)","rgba(155,170,143,0.82)","rgba(155,170,143,0.83)","rgba(155,170,143,0.84)","rgba(155,170,143,0.85)","rgba(155,170,143,0.86)","rgba(155,170,143,0.87)","rgba(155,170,143,0.88)","rgba(155,170,143,0.89)","rgba(155,170,143,0.90)","rgba(155,170,143,0.91)","rgba(155,170,143,0.92)","rgba(155,170,143,0.93)","rgba(155,170,143,0.94)","rgba(155,170,143,0.95)","rgba(155,170,143,0.96)","rgba(155,170,143,0.97)","rgba(155,170,143,0.98)","rgba(155,170,143,0.99)","rgba(155,170,143,1.00)"],"terracotta":["rgba(196,132,108,0.00)","rgba(196,132,108,0.01)","rgba(196,132,108,0.02)","rgba(196,132,108,0.03)","rgba(196,132,108,0.04)","rgba(196,132,108,0.05)","rgba(196,132,108,0.06)","rgba(196,132,108,0.07)","rgba(196,132,108,0.08)","rgba(196,132,108,0.09)","rgba(196,132,108,0.10)","rgba(196,132,108,0.11)","rgba(196,132,108,0.12)","rgba(196,132,108,0.13)","rgba(196,132,108,0.14)","rgba(196,132,108,0.15)","rgba(196,132,108,0.16)","rgba(196,132,108,0.17)","rgba(196,132,108,0.18)","rgba(196,132,108,0.19)","rgba(196,132,108,0.20)","rgba(196,132,108,0.21)","rgba(196,132,108,0.22)","rgba(196,132,108,0.23)","rgba(196,132,108,0.24)","rgba(196,132,108,0.25)","rgba(196,132,108,0.26)","rgba(196,132,108,0.27)","rgba(196,132,108,0.28)","rgba(196,132,108,0.29)","rgba(196,132,108,0.30)","rgba(196,132,108,0.31)","rgba(196,132,108,0.32)","rgba(196,132,108,0.33)","rgba(196,132,108,0.34)","rgba(196,132,108,0.35)","rgba(196,132,108,0.36)","rgba(196,132,108,0.37)","rgba(196,132,108,0.38)","rgba(196,132,108,0.39)","rgba(196,132,108,0.40)","rgba(196,132,108,0.41)","rgba(196,132,108,0.42)","rgba(196,132,108,0.43)","rgba(196,132,108,0.44)","rgba(196,132,108,0.45)","rgba(196,132,108,0.46)","rgba(196,132,108,0.47)","rgba(196,132,108,0.48)","rgba(196,132,108,0.49)","rgba(196,132,108,0.50)","rgba(196,132,108,0.51)","rgba(196,132,108,0.52)","rgba(196,132,108,0.53)","rgba(196,132,108,0.54)","rgba(196,132,108,0.55)","rgba(196,132,108,0.56)","rgba(196,132,108,0.57)","rgba(196,132,108,0.58)","rgba(196,132,108,0.59)","rgba(196,132,108,0.60)","rgba(196,132,108,0.61)","rgba(196,132,108,0.62)","rgba(196,132,108,0.63)","rgba(196,132,108,0.64)","rgba(196,132,108,0.65)","rgba(196,132,108,0.66)","rgba(196,132,108,0.67)","rgba(196,132,108,0.68)","rgba(196,132,108,0.69)","rgba(196,132,108,0.70)","rgba(196,132,108,0.71)","rgba(196,132,108,0.72)","rgba(196,132,108,0.73)","rgba(196,132,108,0.74)","rgba(196,132,108,0.75)","rgba(196,132,108,0.76)","rgba(196,132,108,0.77)","rgba(196,132,108,0.78)","rgba(196,132,108,0.79)","rgba(196,132,108,0.80)","rgba(196,132,108,0.81)","rgba(196,132,108,0.82)","rgba(196,132,108,0.83)","rgba(196,132,108,0.84)","rgba(196,132,108,0.85)","rgba(196,132,108,0.86)","rgba(196,132,108,0.87)","rgba(196,132,108,0.88)","rgba(196,132,108,0.89)","rgba(196,132,108,0.90)","rgba(196,132,108,0.91)","rgba(196,132,108,0.92)","rgba(196,132,108,0.93)","rgba(196,132,108,0.94)","rgba(196,132,108,0.95)","rgba(196,132,108,0.96)","rgba(196,132,108,0.97)","rgba(196,132,108,0.98)","rgba(196,132,108,0.99)","rgba(196,132,108,1.00)"],"amber":["rgba(212,165,116,0.00)","rgba(212,165,116,0.01)","rgba(212,165,116,0.02)","rgba(212,165,116,0.03)","rgba(212,165,116,0.04)","rgba(212,165,116,0.05)","rgba(212,165,116,0.06)","rgba(212,165,116,0.07)","rgba(212,165,116,0.08)","rgba(212,165,116,0.09)","rgba(212,165,116,0.10)","rgba(212,165,116,0.11)","rgba(212,165,116,0.12)","rgba(212,165,116,0.13)","rgba(212,165,116,0.14)","rgba(212,165,116,0.15)","rgba(212,165,116,0.16)","rgba(212,165,116,0.17)","rgba(212,165,116,0.18)","rgba(212,165,116,0.19)","rgba(212,165,116,0.20)","rgba(212,165,116,0.21)","rgba(212,165,116,0.22)","rgba(212,165,116,0.23)","rgba(212,165,116,0.24)","rgba(212,165,116,0.25)","rgba(212,165,116,0.26)","rgba(212,165,116,0.27)","rgba(212,165,116,0.28)","rgba(212,165,116,0.29)","rgba(212,165,116,0.30)","rgba(212,165,116,0.31)","rgba(212,165,116,0.32)","rgba(212,165,116,0.33)","rgba(212,165,116,0.34)","rgba(212,165,116,0.35)","rgba(212,165,116,0.36)","rgba(212,165,116,0.37)","rgba(212,165,116,0.38)","rgba(212,165,116,0.39)","rgba(212,165,116,0.40)","rgba(212,165,116,0.41)","rgba(212,165,116,0.42)","rgba(212,165,116,0.43)","rgba(212,165,116,0.44)","rgba(212,165,116,0.45)","rgba(212,165,116,0.46)","rgba(212,165,116,0.47)","rgba(212,165,116,0.48)","rgba(212,165,116,0.49)","rgba(212,165,116,0.50)","rgba(212,165,116,0.51)","rgba(212,165,116,0.52)","rgba(212,165,116,0.53)","rgba(212,165,116,0.54)","rgba(212,165,116,0.55)","rgba(212,165,116,0.56)","rgba(212,165,116,0.57)","rgba(212,165,116,0.58)","rgba(212,165,116,0.59)","rgba(212,165,116,0.60)","rgba(212,165,116,0.61)","rgba(212,165,116,0.62)","rgba(212,165,116,0.63)","rgba(212,165,116,0.64)","rgba(212,165,116,0.65)","rgba(212,165,116,0.66)","rgba(212,165,116,0.67)","rgba(212,165,116,0.68)","rgba(212,165,116,0.69)","rgba(212,165,116,0.70)","rgba(212,165,116,0.71)","rgba(212,165,116,0.72)","rgba(212,165,116,0.73)","rgba(212,165,116,0.74)","rgba(212,165,116,0.75)","rgba(212,165,116,0.76)","rgba(212,165,116,0.77)","rgba(212,165,116,0.78)","rgba(212,165,116,0.79)","rgba(212,165,116,0.80)","rgba(212,165,116,0.81)","rgba(212,165,116,0.82)","rgba(212,165,116,0.83)","rgba(212,165,116,0.84)","rgba(212,165,116,0.85)","rgba(212,165,116,0.86)","rgba(212,165,116,0.87)","rgba(212,165,116,0.88)","rgba(212,165,116,0.89)","rgba(212,165,116,0.90)","rgba(212,165,116,0.91)","rgba(212,165,116,0.92)","rgba(212,165,116,0.93)","rgba(212,165,116,0.94)","rgba(212,165,116,0.95)","rgba(212,165,116,0.96)","rgba(212,165,116,0.97)","rgba(212,165,116,0.98)","rgba(212,165,116,0.99)","rgba(212,165,116,1.00)"],"sageLight":["rgba(212,221,208,0.00)","rgba(212,221,208,0.01)","rgba(212,221,208,0.02)","rgba(212,221,208,0.03)","rgba(212,221,208,0.04)","rgba(212,221,208,0.05)","rgba(212,221,208,0.06)","rgba(212,221,208,0.07)","rgba(212,221,208,0.08)","rgba(212,221,208,0.09)","rgba(212,221,208,0.10)","rgba(212,221,208,0.11)","rgba(212,221,208,0.12)","rgba(212,221,208,0.13)","rgba(212,221,208,0.14)","rgba(212,221,208,0.15)","rgba(212,221,208,0.16)","rgba(212,221,208,0.17)","rgba(212,221,208,0.18)","rgba(212,221,208,0.19)","rgba(212,221,208,0.20)","rgba(212,221,208,0.21)","rgba(212,221,208,0.22)","rgba(212,221,208,0.23)","rgba(212,221,208,0.24)","rgba(212,221,208,0.25)","rgba(212,221,208,0.26)","rgba(212,221,208,0.27)","rgba(212,221,208,0.28)","rgba(212,221,208,0.29)","rgba(212,221,208,0.30)","rgba(212,221,208,0.31)","rgba(212,221,208,0.32)","rgba(212,221,208,0.33)","rgba(212,221,208,0.34)","rgba(212,221,208,0.35)","rgba(212,221,208,0.36)","rgba(212,221,208,0.37)","rgba(212,221,208,0.38)","rgba(212,221,208,0.39)","rgba(212,221,208,0.40)","rgba(212,221,208,0.41)","rgba(212,221,208,0.42)","rgba(212,221,208,0.43)","rgba(212,221,208,0.44)","rgba(212,221,208,0.45)","rgba(212,221,208,0.46)","rgba(212,221,208,0.47)","rgba(212,221,208,0.48)","rgba(212,221,208,0.49)","rgba(212,221,208,0.50)","rgba(212,221,208,0.51)","rgba(212,221,208,0.52)","rgba(212,221,208,0.53)","rgba(212,221,208,0.54)","rgba(212,221,208,0.55)","rgba(212,221,208,0.56)","rgba(212,221,208,0.57)","rgba(212,221,208,0.58)","rgba(212,221,208,0.59)","rgba(212,221,208,0.60)","rgba(212,221,208,0.61)","rgba(212,221,208,0.62)","rgba(212,221,208,0.63)","rgba(212,221,208,0.64)","rgba(212,221,208,0.65)","rgba(212,221,208,0.66)","rgba(212,221,208,0.67)","rgba(212,221,208,0.68)","rgba(212,221,208,0.69)","rgba(212,221,208,0.70)","rgba(212,221,208,0.71)","rgba(212,221,208,0.72)","rgba(212,221,208,0.73)","rgba(212,221,208,0.74)","rgba(212,221,208,0.75)","rgba(212,221,208,0.76)","rgba(212,221,208,0.77)","rgba(212,221,208,0.78)","rgba(212,221,208,0.79)","rgba(212,221,208,0.80)","rgba(212,221,208,0.81)","rgba(212,221,208,0.82)","rgba(212,221,208,0.83)","rgba(212,221,208,0.84)","rgba(212,221,208,0.85)","rgba(212,221,208,0.86)","rgba(212,221,208,0.87)","rgba(212,221,208,0.88)","rgba(212,221,208,0.89)","rgba(212,221,208,0.90)","rgba(212,221,208,0.91)","rgba(212,221,208,0.92)","rgba(212,221,208,0.93)","rgba(212,221,208,0.94)","rgba(212,221,208,0.95)","rgba(212,221,208,0.96)","rgba(212,221,208,0.97)","rgba(212,221,208,0.98)","rgba(212,221,208,0.99)","rgba(212,221,208,1.00)"],"sageLightAlt":["rgba(184,196,174,0.00)","rgba(184,196,174,0.01)","rgba(184,196,174,0.02)","rgba(184,196,174,0.03)","rgba(184,196,174,0.04)","rgba(184,196,174,0.05)","rgba(184,196,174,0.06)","rgba(184,196,174,0.07)","rgba(184,196,174,0.08)","rgba(184,196,174,0.09)","rgba(184,196,174,0.10)","rgba(184,196,174,0.11)","rgba(184,196,174,0.12)","rgba(184,196,174,0.13)","rgba(184,196,174,0.14)","rgba(184,196,174,0.15)","rgba(184,196,174,0.16)","rgba(184,196,174,0.17)","rgba(184,196,174,0.18)","rgba(184,196,174,0.19)","rgba(184,196,174,0.20)","rgba(184,196,174,0.21)","rgba(184,196,174,0.22)","rgba(184,196,174,0.23)","rgba(184,196,174,0.24)","rgba(184,196,174,0.25)","rgba(184,196,174,0.26)","rgba(184,196,174,0.27)","rgba(184,196,174,0.28)","rgba(184,196,174,0.29)","rgba(184,196,174,0.30)","rgba(184,196,174,0.31)","rgba(184,196,174,0.32)","rgba(184,196,174,0.33)","rgba(184,196,174,0.34)","rgba(184,196,174,0.35)","rgba(184,196,174,0.36)","rgba(184,196,174,0.37)","rgba(184,196,174,0.38)","rgba(184,196,174,0.39)","rgba(184,196,174,0.40)","rgba(184,196,174,0.41)","rgba(184,196,174,0.42)","rgba(184,196,174,0.43)","rgba(184,196,174,0.44)","rgba(184,196,174,0.45)","rgba(184,196,174,0.46)","rgba(184,196,174,0.47)","rgba(184,196,174,0.48)","rgba(184,196,174,0.49)","rgba(184,196,174,0.50)","rgba(184,196,174,0.51)","rgba(184,196,174,0.52)","rgba(184,196,174,0.53)","rgba(184,196,174,0.54)","rgba(184,196,174,0.55)","rgba(184,196,174,0.56)","rgba(184,196,174,0.57)","rgba(184,196,174,0.58)","rgba(184,196,174,0.59)","rgba(184,196,174,0.60)","rgba(184,196,174,0.61)","rgba(184,196,174,0.62)","rgba(184,196,174,0.63)","rgba(184,196,174,0.64)","rgba(184,196,174,0.65)","rgba(184,196,174,0.66)","rgba(184,196,174,0.67)","rgba(184,196,174,0.68)","rgba(184,196,174,0.69)","rgba(184,196,174,0.70)","rgba(184,196,174,0.71)","rgba(184,196,174,0.72)","rgba(184,196,174,0.73)","rgba(184,196,174,0.74)","rgba(184,196,174,0.75)","rgba(184,196,174,0.76)","rgba(184,196,174,0.77)","rgba(184,196,174,0.78)","rgba(184,196,174,0.79)","rgba(184,196,174,0.80)","rgba(184,196,174,0.81)","rgba(184,196,174,0.82)","rgba(184,196,174,0.83)","rgba(184,196,174,0.84)","rgba(184,196,174,0.85)","rgba(184,196,174,0.86)","rgba(184,196,174,0.87)","rgba(184,196,174,0.88)","rgba(184,196,174,0.89)","rgba(184,196,174,0.90)","rgba(184,196,174,0.91)","rgba(184,196,174,0.92)","rgba(184,196,174,0.93)","rgba(184,196,174,0.94)","rgba(184,196,174,0.95)","rgba(184,196,174,0.96)","rgba(184,196,174,0.97)","rgba(184,196,174,0.98)","rgba(184,196,174,0.99)","rgba(184,196,174,1.00)"],"sageDark":["rgba(139,155,128,0.00)","rgba(139,155,128,0.01)","rgba(139,155,128,0.02)","rgba(139,155,128,0.03)","rgba(139,155,128,0.04)","rgba(139,155,128,0.05)","rgba(139,155,128,0.06)","rgba(139,155,128,0.07)","rgba(139,155,128,0.08)","rgba(139,155,128,0.09)","rgba(139,155,128,0.10)","rgba(139,155,128,0.11)","rgba(139,155,128,0.12)","rgba(139,155,128,0.13)","rgba(139,155,128,0.14)","rgba(139,155,128,0.15)","rgba(139,155,128,0.16)","rgba(139,155,128,0.17)","rgba(139,155,128,0.18)","rgba(139,155,128,0.19)","rgba(139,155,128,0.20)","rgba(139,155,128,0.21)","rgba(139,155,128,0.22)","rgba(139,155,128,0.23)","rgba(139,155,128,0.24)","rgba(139,155,128,0.25)","rgba(139,155,128,0.26)","rgba(139,155,128,0.27)","rgba(139,155,128,0.28)","rgba(139,155,128,0.29)","rgba(139,155,128,0.30)","rgba(139,155,128,0.31)","rgba(139,155,128,0.32)","rgba(139,155,128,0.33)","rgba(139,155,128,0.34)","rgba(139,155,128,0.35)","rgba(139,155,128,0.36)","rgba(139,155,128,0.37)","rgba(139,155,128,0.38)","rgba(139,155,128,0.39)","rgba(139,155,128,0.40)","rgba(139,155,128,0.41)","rgba(139,155,128,0.42)","rgba(139,155,128,0.43)","rgba(139,155,128,0.44)","rgba(139,155,128,0.45)","rgba(139,155,128,0.46)","rgba(139,155,128,0.47)","rgba(139,155,128,0.48)","rgba(139,155,128,0.49)","rgba(139,155,128,0.50)","rgba(139,155,128,0.51)","rgba(139,155,128,0.52)","rgba(139,155,128,0.53)","rgba(139,155,128,0.54)","rgba(139,155,128,0.55)","rgba(139,155,128,0.56)","rgba(139,155,128,0.57)","rgba(139,155,128,0.58)","rgba(139,155,128,0.59)","rgba(139,155,128,0.60)","rgba(139,155,128,0.61)","rgba(139,155,128,0.62)","rgba(139,155,128,0.63)","rgba(139,155,128,0.64)","rgba(139,155,128,0.65)","rgba(139,155,128,0.66)","rgba(139,155,128,0.67)","rgba(139,155,128,0.68)","rgba(139,155,128,0.69)","rgba(139,155,128,0.70)","rgba(139,155,128,0.71)","rgba(139,155,128,0.72)","rgba(139,155,128,0.73)","rgba(139,155,128,0.74)","rgba(139,155,128,0.75)","rgba(139,155,128,0.76)","rgba(139,155,128,0.77)","rgba(139,155,128,0.78)","rgba(139,155,128,0.79)","rgba(139,155,128,0.80)","rgba(139,155,128,0.81)","rgba(139,155,128,0.82)","rgba(139,155,128,0.83)","rgba(139,155,128,0.84)","rgba(139,155,128,0.85)","rgba(139,155,128,0.86)","rgba(139,155,128,0.87)","rgba(139,155,128,0.88)","rgba(139,155,128,0.89)","rgba(139,155,128,0.90)","rgba(139,155,128,0.91)","rgba(139,155,128,0.92)","rgba(139,155,128,0.93)","rgba(139,155,128,0.94)","rgba(139,155,128,0.95)","rgba(139,155,128,0.96)","rgba(139,155,128,0.97)","rgba(139,155,128,0.98)","rgba(139,155,128,0.99)","rgba(139,155,128,1.00)"],"moon":["rgba(220,225,240,0.00)","rgba(220,225,240,0.01)","rgba(220,225,240,0.02)","rgba(220,225,240,0.03)","rgba(220,225,240,0.04)","rgba(220,225,240,0.05)","rgba(220,225,240,0.06)","rgba(220,225,240,0.07)","rgba(220,225,240,0.08)","rgba(220,225,240,0.09)","rgba(220,225,240,0.10)","rgba(220,225,240,0.11)","rgba(220,225,240,0.12)","rgba(220,225,240,0.13)","rgba(220,225,240,0.14)","rgba(220,225,240,0.15)","rgba(220,225,240,0.16)","rgba(220,225,240,0.17)","rgba(220,225,240,0.18)","rgba(220,225,240,0.19)","rgba(220,225,240,0.20)","rgba(220,225,240,0.21)","rgba(220,225,240,0.22)","rgba(220,225,240,0.23)","rgba(220,225,240,0.24)","rgba(220,225,240,0.25)","rgba(220,225,240,0.26)","rgba(220,225,240,0.27)","rgba(220,225,240,0.28)","rgba(220,225,240,0.29)","rgba(220,225,240,0.30)","rgba(220,225,240,0.31)","rgba(220,225,240,0.32)","rgba(220,225,240,0.33)","rgba(220,225,240,0.34)","rgba(220,225,240,0.35)","rgba(220,225,240,0.36)","rgba(220,225,240,0.37)","rgba(220,225,240,0.38)","rgba(220,225,240,0.39)","rgba(220,225,240,0.40)","rgba(220,225,240,0.41)","rgba(220,225,240,0.42)","rgba(220,225,240,0.43)","rgba(220,225,240,0.44)","rgba(220,225,240,0.45)","rgba(220,225,240,0.46)","rgba(220,225,240,0.47)","rgba(220,225,240,0.48)","rgba(220,225,240,0.49)","rgba(220,225,240,0.50)","rgba(220,225,240,0.51)","rgba(220,225,240,0.52)","rgba(220,225,240,0.53)","rgba(220,225,240,0.54)","rgba(220,225,240,0.55)","rgba(220,225,240,0.56)","rgba(220,225,240,0.57)","rgba(220,225,240,0.58)","rgba(220,225,240,0.59)","rgba(220,225,240,0.60)","rgba(220,225,240,0.61)","rgba(220,225,240,0.62)","rgba(220,225,240,0.63)","rgba(220,225,240,0.64)","rgba(220,225,240,0.65)","rgba(220,225,240,0.66)","rgba(220,225,240,0.67)","rgba(220,225,240,0.68)","rgba(220,225,240,0.69)","rgba(220,225,240,0.70)","rgba(220,225,240,0.71)","rgba(220,225,240,0.72)","rgba(220,225,240,0.73)","rgba(220,225,240,0.74)","rgba(220,225,240,0.75)","rgba(220,225,240,0.76)","rgba(220,225,240,0.77)","rgba(220,225,240,0.78)","rgba(220,225,240,0.79)","rgba(220,225,240,0.80)","rgba(220,225,240,0.81)","rgba(220,225,240,0.82)","rgba(220,225,240,0.83)","rgba(220,225,240,0.84)","rgba(220,225,240,0.85)","rgba(220,225,240,0.86)","rgba(220,225,240,0.87)","rgba(220,225,240,0.88)","rgba(220,225,240,0.89)","rgba(220,225,240,0.90)","rgba(220,225,240,0.91)","rgba(220,225,240,0.92)","rgba(220,225,240,0.93)","rgba(220,225,240,0.94)","rgba(220,225,240,0.95)","rgba(220,225,240,0.96)","rgba(220,225,240,0.97)","rgba(220,225,240,0.98)","rgba(220,225,240,0.99)","rgba(220,225,240,1.00)"],"moonDark":["rgba(30,40,60,0.00)","rgba(30,40,60,0.01)","rgba(30,40,60,0.02)","rgba(30,40,60,0.03)","rgba(30,40,60,0.04)","rgba(30,40,60,0.05)","rgba(30,40,60,0.06)","rgba(30,40,60,0.07)","rgba(30,40,60,0.08)","rgba(30,40,60,0.09)","rgba(30,40,60,0.10)","rgba(30,40,60,0.11)","rgba(30,40,60,0.12)","rgba(30,40,60,0.13)","rgba(30,40,60,0.14)","rgba(30,40,60,0.15)","rgba(30,40,60,0.16)","rgba(30,40,60,0.17)","rgba(30,40,60,0.18)","rgba(30,40,60,0.19)","rgba(30,40,60,0.20)","rgba(30,40,60,0.21)","rgba(30,40,60,0.22)","rgba(30,40,60,0.23)","rgba(30,40,60,0.24)","rgba(30,40,60,0.25)","rgba(30,40,60,0.26)","rgba(30,40,60,0.27)","rgba(30,40,60,0.28)","rgba(30,40,60,0.29)","rgba(30,40,60,0.30)","rgba(30,40,60,0.31)","rgba(30,40,60,0.32)","rgba(30,40,60,0.33)","rgba(30,40,60,0.34)","rgba(30,40,60,0.35)","rgba(30,40,60,0.36)","rgba(30,40,60,0.37)","rgba(30,40,60,0.38)","rgba(30,40,60,0.39)","rgba(30,40,60,0.40)","rgba(30,40,60,0.41)","rgba(30,40,60,0.42)","rgba(30,40,60,0.43)","rgba(30,40,60,0.44)","rgba(30,40,60,0.45)","rgba(30,40,60,0.46)","rgba(30,40,60,0.47)","rgba(30,40,60,0.48)","rgba(30,40,60,0.49)","rgba(30,40,60,0.50)","rgba(30,40,60,0.51)","rgba(30,40,60,0.52)","rgba(30,40,60,0.53)","rgba(30,40,60,0.54)","rgba(30,40,60,0.55)","rgba(30,40,60,0.56)","rgba(30,40,60,0.57)","rgba(30,40,60,0.58)","rgba(30,40,60,0.59)","rgba(30,40,60,0.60)","rgba(30,40,60,0.61)","rgba(30,40,60,0.62)","rgba(30,40,60,0.63)","rgba(30,40,60,0.64)","rgba(30,40,60,0.65)","rgba(30,40,60,0.66)","rgba(30,40,60,0.67)","rgba(30,40,60,0.68)","rgba(30,40,60,0.69)","rgba(30,40,60,0.70)","rgba(30,40,60,0.71)","rgba(30,40,60,0.72)","rgba(30,40,60,0.73)","rgba(30,40,60,0.74)","rgba(30,40,60,0.75)","rgba(30,40,60,0.76)","rgba(30,40,60,0.77)","rgba(30,40,60,0.78)","rgba(30,40,60,0.79)","rgba(30,40,60,0.80)","rgba(30,40,60,0.81)","rgba(30,40,60,0.82)","rgba(30,40,60,0.83)","rgba(30,40,60,0.84)","rgba(30,40,60,0.85)","rgba(30,40,60,0.86)","rgba(30,40,60,0.87)","rgba(30,40,60,0.88)","rgba(30,40,60,0.89)","rgba(30,40,60,0.90)","rgba(30,40,60,0.91)","rgba(30,40,60,0.92)","rgba(30,40,60,0.93)","rgba(30,40,60,0.94)","rgba(30,40,60,0.95)","rgba(30,40,60,0.96)","rgba(30,40,60,0.97)","rgba(30,40,60,0.98)","rgba(30,40,60,0.99)","rgba(30,40,60,1.00)"],"white":["rgba(255,255,240,0.00)","rgba(255,255,240,0.01)","rgba(255,255,240,0.02)","rgba(255,255,240,0.03)","rgba(255,255,240,0.04)","rgba(255,255,240,0.05)","rgba(255,255,240,0.06)","rgba(255,255,240,0.07)","rgba(255,255,240,0.08)","rgba(255,255,240,0.09)","rgba(255,255,240,0.10)","rgba(255,255,240,0.11)","rgba(255,255,240,0.12)","rgba(255,255,240,0.13)","rgba(255,255,240,0.14)","rgba(255,255,240,0.15)","rgba(255,255,240,0.16)","rgba(255,255,240,0.17)","rgba(255,255,240,0.18)","rgba(255,255,240,0.19)","rgba(255,255,240,0.20)","rgba(255,255,240,0.21)","rgba(255,255,240,0.22)","rgba(255,255,240,0.23)","rgba(255,255,240,0.24)","rgba(255,255,240,0.25)","rgba(255,255,240,0.26)","rgba(255,255,240,0.27)","rgba(255,255,240,0.28)","rgba(255,255,240,0.29)","rgba(255,255,240,0.30)","rgba(255,255,240,0.31)","rgba(255,255,240,0.32)","rgba(255,255,240,0.33)","rgba(255,255,240,0.34)","rgba(255,255,240,0.35)","rgba(255,255,240,0.36)","rgba(255,255,240,0.37)","rgba(255,255,240,0.38)","rgba(255,255,240,0.39)","rgba(255,255,240,0.40)","rgba(255,255,240,0.41)","rgba(255,255,240,0.42)","rgba(255,255,240,0.43)","rgba(255,255,240,0.44)","rgba(255,255,240,0.45)","rgba(255,255,240,0.46)","rgba(255,255,240,0.47)","rgba(255,255,240,0.48)","rgba(255,255,240,0.49)","rgba(255,255,240,0.50)","rgba(255,255,240,0.51)","rgba(255,255,240,0.52)","rgba(255,255,240,0.53)","rgba(255,255,240,0.54)","rgba(255,255,240,0.55)","rgba(255,255,240,0.56)","rgba(255,255,240,0.57)","rgba(255,255,240,0.58)","rgba(255,255,240,0.59)","rgba(255,255,240,0.60)","rgba(255,255,240,0.61)","rgba(255,255,240,0.62)","rgba(255,255,240,0.63)","rgba(255,255,240,0.64)","rgba(255,255,240,0.65)","rgba(255,255,240,0.66)","rgba(255,255,240,0.67)","rgba(255,255,240,0.68)","rgba(255,255,240,0.69)","rgba(255,255,240,0.70)","rgba(255,255,240,0.71)","rgba(255,255,240,0.72)","rgba(255,255,240,0.73)","rgba(255,255,240,0.74)","rgba(255,255,240,0.75)","rgba(255,255,240,0.76)","rgba(255,255,240,0.77)","rgba(255,255,240,0.78)","rgba(255,255,240,0.79)","rgba(255,255,240,0.80)","rgba(255,255,240,0.81)","rgba(255,255,240,0.82)","rgba(255,255,240,0.83)","rgba(255,255,240,0.84)","rgba(255,255,240,0.85)","rgba(255,255,240,0.86)","rgba(255,255,240,0.87)","rgba(255,255,240,0.88)","rgba(255,255,240,0.89)","rgba(255,255,240,0.90)","rgba(255,255,240,0.91)","rgba(255,255,240,0.92)","rgba(255,255,240,0.93)","rgba(255,255,240,0.94)","rgba(255,255,240,0.95)","rgba(255,255,240,0.96)","rgba(255,255,240,0.97)","rgba(255,255,240,0.98)","rgba(255,255,240,0.99)","rgba(255,255,240,1.00)"],"blue":["rgba(150,170,200,0.00)","rgba(150,170,200,0.01)","rgba(150,170,200,0.02)","rgba(150,170,200,0.03)","rgba(150,170,200,0.04)","rgba(150,170,200,0.05)","rgba(150,170,200,0.06)","rgba(150,170,200,0.07)","rgba(150,170,200,0.08)","rgba(150,170,200,0.09)","rgba(150,170,200,0.10)","rgba(150,170,200,0.11)","rgba(150,170,200,0.12)","rgba(150,170,200,0.13)","rgba(150,170,200,0.14)","rgba(150,170,200,0.15)","rgba(150,170,200,0.16)","rgba(150,170,200,0.17)","rgba(150,170,200,0.18)","rgba(150,170,200,0.19)","rgba(150,170,200,0.20)","rgba(150,170,200,0.21)","rgba(150,170,200,0.22)","rgba(150,170,200,0.23)","rgba(150,170,200,0.24)","rgba(150,170,200,0.25)","rgba(150,170,200,0.26)","rgba(150,170,200,0.27)","rgba(150,170,200,0.28)","rgba(150,170,200,0.29)","rgba(150,170,200,0.30)","rgba(150,170,200,0.31)","rgba(150,170,200,0.32)","rgba(150,170,200,0.33)","rgba(150,170,200,0.34)","rgba(150,170,200,0.35)","rgba(150,170,200,0.36)","rgba(150,170,200,0.37)","rgba(150,170,200,0.38)","rgba(150,170,200,0.39)","rgba(150,170,200,0.40)","rgba(150,170,200,0.41)","rgba(150,170,200,0.42)","rgba(150,170,200,0.43)","rgba(150,170,200,0.44)","rgba(150,170,200,0.45)","rgba(150,170,200,0.46)","rgba(150,170,200,0.47)","rgba(150,170,200,0.48)","rgba(150,170,200,0.49)","rgba(150,170,200,0.50)","rgba(150,170,200,0.51)","rgba(150,170,200,0.52)","rgba(150,170,200,0.53)","rgba(150,170,200,0.54)","rgba(150,170,200,0.55)","rgba(150,170,200,0.56)","rgba(150,170,200,0.57)","rgba(150,170,200,0.58)","rgba(150,170,200,0.59)","rgba(150,170,200,0.60)","rgba(150,170,200,0.61)","rgba(150,170,200,0.62)","rgba(150,170,200,0.63)","rgba(150,170,200,0.64)","rgba(150,170,200,0.65)","rgba(150,170,200,0.66)","rgba(150,170,200,0.67)","rgba(150,170,200,0.68)","rgba(150,170,200,0.69)","rgba(150,170,200,0.70)","rgba(150,170,200,0.71)","rgba(150,170,200,0.72)","rgba(150,170,200,0.73)","rgba(150,170,200,0.74)","rgba(150,170,200,0.75)","rgba(150,170,200,0.76)","rgba(150,170,200,0.77)","rgba(150,170,200,0.78)","rgba(150,170,200,0.79)","rgba(150,170,200,0.80)","rgba(150,170,200,0.81)","rgba(150,170,200,0.82)","rgba(150,170,200,0.83)","rgba(150,170,200,0.84)","rgba(150,170,200,0.85)","rgba(150,170,200,0.86)","rgba(150,170,200,0.87)","rgba(150,170,200,0.88)","rgba(150,170,200,0.89)","rgba(150,170,200,0.90)","rgba(150,170,200,0.91)","rgba(150,170,200,0.92)","rgba(150,170,200,0.93)","rgba(150,170,200,0.94)","rgba(150,170,200,0.95)","rgba(150,170,200,0.96)","rgba(150,170,200,0.97)","rgba(150,170,200,0.98)","rgba(150,170,200,0.99)","rgba(150,170,200,1.00)"]};

// O(1) color lookup function - alpha 0-1 maps to index 0-100
function getColor(name, alpha) {
  const idx = (alpha * 100 + 0.5) | 0;
  return COLOR_CACHE[name][idx > 100 ? 100 : idx < 0 ? 0 : idx];
}

// For dynamic RGB values not in cache (gradients with interpolated sun colors)
function rgbaColor(r, g, b, alpha) {
  const a = Math.round(alpha * 100) / 100;
  return `rgba(${r},${g},${b},${a.toFixed(2)})`;
}

// ==================== INTERACTIVE BACKGROUND ====================
class InteractiveBackground {
  constructor() {
    log("InteractiveBackground: Constructor called");

    this.canvas = document.getElementById("bgCanvas");
    if (!this.canvas) {
      log("ERROR: Canvas element #bgCanvas not found!");
      return;
    }

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) {
      log("ERROR: Could not get 2d context!");
      return;
    }

    this.config = {
      blobCount: 4,
      blobSpeedMultiplier: 10,
      dotCount: 100,
      dotConnectionDistance: 150,
      mouseConnectionDistance: 220,
      dotSpeed: 0.5,
      rippleMaxRadius: 200,
      rippleDuration: 1400
    };
    
    // Pre-compute squared distances for faster comparisons
    this.connDistSq = this.config.dotConnectionDistance * this.config.dotConnectionDistance;
    this.mouseDistSq = this.config.mouseConnectionDistance * this.config.mouseConnectionDistance;
    
    this.frameCount = 0;
    this.blobs = [];
    this.dots = [];
    this.ripples = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    this.isRunning = false;
    this.lastFrame = 0;
    this.frameInterval = 1000 / 60;

    // Color names for random selection
    this.colorNames = ['sage', 'terracotta', 'amber', 'sageLight'];

    this.resize();
    this.createBlobs();
    this.createDots();
    this.bindEvents();
    this.observeVisibility();

    this.isRunning = true;
    this.animate(0);

    log("InteractiveBackground initialized");
  }

  observeVisibility() {
    const hero = document.querySelector('.hero');
    const pageHero = document.querySelector('.page-hero');
    const ctaSection = document.querySelector('.cta');
    const footer = document.querySelector('.footer');
    const pageBody = document.querySelector('.cc-page-body');
    
    if (!hero && !pageHero && !ctaSection && !footer && !pageBody) return;

    this.visibleSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.visibleSections.add(entry.target);
          } else {
            this.visibleSections.delete(entry.target);
          }
        });

        if (this.visibleSections.size > 0) {
          if (!this.isRunning) {
            this.isRunning = true;
            this.animate(performance.now());
          }
        } else {
          this.isRunning = false;
        }
      },
      { threshold: 0, rootMargin: '200px' }
    );

    if (hero) observer.observe(hero);
    if (pageHero) observer.observe(pageHero);
    if (ctaSection) observer.observe(ctaSection);
    if (footer) observer.observe(footer);
    if (pageBody) observer.observe(pageBody);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createBlobs() {
    this.blobs = [];
    const blobConfigs = [
      { colorName: 'sage', alpha: 0.35 },
      { colorName: 'terracotta', alpha: 0.30 },
      { colorName: 'amber', alpha: 0.30 },
      { colorName: 'sageLight', alpha: 0.35 }
    ];

    for (let i = 0; i < this.config.blobCount; i++) {
      const cfg = blobConfigs[i];
      this.blobs.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 250 + Math.random() * 200,
        colorName: cfg.colorName,
        alpha: cfg.alpha,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  updateBlob(blob) {
    const s = this.config.blobSpeedMultiplier;
    blob.x += blob.vx * s;
    blob.y += blob.vy * s;
    blob.phase += 0.012 * s;

    if (blob.x < -100 || blob.x > this.canvas.width + 100) blob.vx *= -1;
    if (blob.y < -100 || blob.y > this.canvas.height + 100) blob.vy *= -1;
  }

  drawBlob(blob) {
    const ctx = this.ctx;
    const wobble = Math.sin(blob.phase) * 20;
    const x = blob.x + wobble;
    const y = blob.y + Math.cos(blob.phase * 0.7) * 20;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius);
    gradient.addColorStop(0, getColor(blob.colorName, blob.alpha));
    gradient.addColorStop(0.5, getColor(blob.colorName, blob.alpha * 0.4));
    gradient.addColorStop(1, getColor(blob.colorName, 0));

    ctx.beginPath();
    ctx.arc(x, y, blob.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  createDots() {
    this.dots = [];
    const figureCount = Math.floor(this.config.dotCount * 0.65);
    
    for (let i = 0; i < figureCount; i++) {
      this.dots.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.dotSpeed * 0.7,
        vy: (Math.random() - 0.5) * this.config.dotSpeed * 0.7,
        size: 12 + Math.random() * 10,
        colorName: this.colorNames[Math.floor(Math.random() * this.colorNames.length)],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  drawFigure(x, y, size, colorName) {
    const ctx = this.ctx;
    ctx.fillStyle = getColor(colorName, 0.5);
    
    ctx.beginPath();
    ctx.arc(x, y - size * 0.55, size * 0.22, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x, y + size * 0.1, size * 0.18, size * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  updateDots() {
    const { dotSpeed } = this.config;

    this.dots.forEach(dot => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      dot.phase += 0.02;

      if (dot.x < 20 || dot.x > this.canvas.width - 20) dot.vx *= -1;
      if (dot.y < 20 || dot.y > this.canvas.height - 20) dot.vy *= -1;

      if (this.mouse.x !== null) {
        const dx = this.mouse.x - dot.x;
        const dy = this.mouse.y - dot.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < this.mouseDistSq && distSq > 0) {
          const force = 0.0001;
          dot.vx += dx * force;
          dot.vy += dy * force;
        }
      }

      const speedSq = dot.vx * dot.vx + dot.vy * dot.vy;
      const maxSpeed = dotSpeed * 1.5;
      const maxSpeedSq = maxSpeed * maxSpeed;
      if (speedSq > maxSpeedSq) {
        const scale = maxSpeed / Math.sqrt(speedSq);
        dot.vx *= scale;
        dot.vy *= scale;
      }
    });
  }

  drawDots() {
    const ctx = this.ctx;
    const { dotConnectionDistance, mouseConnectionDistance } = this.config;

    for (let i = 0; i < this.dots.length; i++) {
      const dotA = this.dots[i];

      for (let j = i + 1; j < this.dots.length; j++) {
        const dotB = this.dots[j];
        const dx = dotA.x - dotB.x;
        const dy = dotA.y - dotB.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < this.connDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / dotConnectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(dotB.x, dotB.y);
          ctx.strokeStyle = getColor('sage', opacity);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      if (this.mouse.x !== null) {
        const dx = dotA.x - this.mouse.x;
        const dy = dotA.y - this.mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < this.mouseDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / mouseConnectionDistance) * 0.5;
          ctx.beginPath();
          ctx.moveTo(dotA.x, dotA.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.strokeStyle = getColor('terracotta', opacity);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    this.dots.forEach(dot => {
      const bobY = Math.sin(dot.phase) * 2;
      this.drawFigure(dot.x, dot.y + bobY, dot.size, dot.colorName);
    });
  }

  createRipple(x, y) {
    const colorNames = ['sage', 'terracotta', 'amber'];
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.ripples.push({
          x,
          y,
          radius: 0,
          maxRadius: this.config.rippleMaxRadius + (i * 25),
          startTime: performance.now(),
          duration: this.config.rippleDuration + (i * 150),
          colorName: colorNames[i % colorNames.length]
        });
      }, i * 80);
    }
  }

  updateAndDrawRipples() {
    const ctx = this.ctx;
    const now = performance.now();

    this.ripples = this.ripples.filter(ripple => {
      const elapsed = now - ripple.startTime;
      const progress = Math.min(elapsed / ripple.duration, 1);

      if (progress >= 1) return false;

      const eased = 1 - Math.pow(1 - progress, 3);
      const radius = ripple.maxRadius * eased;
      const opacity = (1 - progress) * 0.4;

      for (let ring = 0; ring < 2; ring++) {
        const ringRadius = radius - (ring * 12);
        if (ringRadius > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = getColor(ripple.colorName, opacity * (1 - ring * 0.4));
          ctx.lineWidth = 2 - ring * 0.5;
          ctx.stroke();
        }
      }

      const dotCount = 6;
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2 + (progress * Math.PI * 0.5);
        const dotX = ripple.x + Math.cos(angle) * radius;
        const dotY = ripple.y + Math.sin(angle) * radius;
        const dotSize = 3 * (1 - progress);

        if (dotSize > 0.5) {
          ctx.beginPath();
          ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = getColor(ripple.colorName, opacity * 0.8);
          ctx.fill();
        }
      }

      return true;
    });
  }

  animate(timestamp) {
    if (!this.isRunning) return;

    const elapsed = timestamp - this.lastFrame;
    if (elapsed < this.frameInterval) {
      this.animationId = requestAnimationFrame((t) => this.animate(t));
      return;
    }
    this.lastFrame = timestamp;
    this.frameCount++;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.globalCompositeOperation = "lighter";
    this.blobs.forEach(blob => {
      if (this.frameCount % 3 === 0) {
        this.updateBlob(blob);
      }
      this.drawBlob(blob);
    });
    ctx.globalCompositeOperation = "source-over";

    this.updateDots();
    this.drawDots();
    this.updateAndDrawRipples();

    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createBlobs();
      this.createDots();
    });

    if (window.innerWidth > 500) {
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, { passive: true });

      // Clear mouse position when cursor leaves the page
      document.addEventListener("mouseleave", () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      // Also clear on visibility change (e.g. alt-tab away)
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.mouse.x = null;
          this.mouse.y = null;
        }
      });
    }

    window.addEventListener("click", (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isInteractive = tag === 'a' || tag === 'button' || tag === 'input' || 
                           tag === 'select' || tag === 'textarea' ||
                           e.target.closest('a, button, .btn, .nav, .lang-toggle');
      
      if (!isInteractive) {
        this.createRipple(e.clientX, e.clientY);
      }
    });
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ==================== NAVIGATION ====================
function initNavigation() {
  log("initNavigation called");

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!nav) {
    log("ERROR: nav element not found");
    return;
  }

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  log("Navigation initialized");
}

// ==================== NAV DROPDOWN — ACTIVE SECTION TRACKER ====================
function initExploreSectionTracker() {
  log("initExploreSectionTracker called");

  // Only run on the landing page (index.html or /) — identified by the trigger having an id
  const trigger = document.getElementById("navExploreTrigger");
  if (!trigger) {
    log("Not on index page — skipping section tracker");
    return;
  }

  // Keep references to the SVG chevron and the translatable text span
  const chevronSvg = trigger.querySelector(".nav-dropdown-chevron");
  const triggerSpan = trigger.querySelector("[data-i18n]");

  // Map of section IDs → translation keys (from translations.js)
  const SECTION_I18N_KEYS = {
    home:       "nav.home",
    rhythm:     "nav.schedule",
    journey:    "nav.journey",
    pricing:    "nav.pricing",
    compassion: "nav.compassionCourse",
    audience:   "nav.whoIsThisFor"
  };

  // Fallback English names (used if translations unavailable)
  const SECTION_NAMES_EN = {
    home:       "Home",
    rhythm:     "Schedule",
    journey:    "The Journey",
    pricing:    "Pricing",
    compassion: "Compassion Course",
    audience:   "Who Is This For"
  };

  function getSectionName(sectionId) {
    var key = SECTION_I18N_KEYS[sectionId];
    if (!key) return SECTION_NAMES_EN[sectionId] || "Home";
    var lang = window.currentLang || 'en';
    // Try to read from the global translations if available
    if (window.setLanguage && typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return SECTION_NAMES_EN[sectionId] || "Home";
  }

  function getDefaultLabel() { return getSectionName("home"); }

  const sectionIds = Object.keys(SECTION_I18N_KEYS);
  const sections = [];
  sectionIds.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el });
  });

  if (!sections.length) {
    log("No sections found for tracker");
    return;
  }

  // Dropdown items (for highlighting the active one)
  const dropdownItems = document.querySelectorAll(".nav-explore-dropdown .nav-dropdown-item[data-section]");

  let currentSection = "home";

  // Lock the trigger width to the average label width so the nav stays stable
  function lockTriggerWidth() {
    var allLabels = sectionIds.map(getSectionName);
    var totalW = 0;
    allLabels.forEach(function(label) {
      if (triggerSpan) { triggerSpan.textContent = label; } else { trigger.childNodes[0].textContent = label + " "; }
      totalW += trigger.scrollWidth;
    });
    var avgW = Math.ceil(totalW / allLabels.length);
    trigger.style.width = avgW + "px";
    trigger.style.justifyContent = "flex-end";
    trigger.style.textAlign = "right";
    // Restore current section label
    var label = (currentSection && getSectionName(currentSection)) || getDefaultLabel();
    if (triggerSpan) { triggerSpan.textContent = label; } else { trigger.childNodes[0].textContent = label + " "; }
  }
  lockTriggerWidth();

  function updateActiveSection(sectionId) {
    if (sectionId === currentSection) return;
    currentSection = sectionId;

    // Update the span text (preserves SVG chevron)
    var label = getSectionName(sectionId) || getDefaultLabel();
    if (triggerSpan) {
      triggerSpan.textContent = label;
    } else {
      trigger.textContent = "";
      trigger.appendChild(document.createTextNode(label + " "));
      if (chevronSvg) trigger.appendChild(chevronSvg);
    }

    // Highlight the active dropdown item
    dropdownItems.forEach(function(item) {
      item.classList.toggle("is-active", item.getAttribute("data-section") === sectionId);
    });
  }

  // Scroll-based detection — find which section the user is currently viewing
  function onScroll() {
    const navH = 80;
    let active = "";

    // Walk through sections top-to-bottom; last one whose top is above navH + buffer wins
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].el.getBoundingClientRect();
      if (rect.top <= navH + 100) {
        active = sections[i].id;
      }
    }

    // If we've scrolled past all sections (at the CTA/footer), keep the last one
    // If we're at the very top (hero), show nothing
    if (window.scrollY < 200) {
      active = "home";
    }

    updateActiveSection(active);
  }

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener("scroll", function() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function() {
        onScroll();
        ticking = false;
      });
    }
  });

  // Initial check
  onScroll();

  // Re-lock width and update label when language changes
  document.addEventListener("languageChanged", function() {
    lockTriggerWidth();
    // Force label update for current section
    var saved = currentSection;
    currentSection = "";
    updateActiveSection(saved);
  });

  log("Explore section tracker initialized");
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  log("initScrollAnimations called");

  const elements = document.querySelectorAll(".animate-on-scroll:not(.scroll-observed)");
  log("Found", elements.length, "new elements to animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => {
    el.classList.add("scroll-observed");
    observer.observe(el);
  });
  log("Scroll animations initialized");
}
// Expose globally so renderers can re-init after re-rendering
window.initScrollAnimations = initScrollAnimations;

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  log("initSmoothScroll called");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (!href || href === "#" || href.length < 2) {
        return;
      }

      try {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const mobileMenu = document.getElementById('mobileMenu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.getElementById('navToggle')?.classList.remove('active');
          }
          
          const nav = document.querySelector('.nav');
          const navHeight = nav ? nav.getBoundingClientRect().height : 70;
          
          const targetRect = target.getBoundingClientRect();
          const targetPosition = targetRect.top + window.scrollY - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      } catch (err) {
        log("Error with selector:", href, err);
      }
    });
  });

  log("Smooth scroll initialized");
}

// ==================== JOURNEY PATH ANIMATION ====================
function initJourneyPath() {
  const journeySection = document.querySelector(".journey");
  if (!journeySection) return;

  const wrapper = journeySection.querySelector(".journey-wrapper");
  const svg = journeySection.querySelector("svg.journey-path");
  if (!wrapper || !svg) return;

  const pathBg = svg.querySelector(".journey-path-bg");
  const pathLine = svg.querySelector(".journey-path-line#travelPath") || svg.querySelector("#travelPath");
  const cardsAll = Array.from(wrapper.querySelectorAll(".journey-card"));
  
  cardsAll.forEach((card, i) => {
    if (!card.dataset.step) card.dataset.step = String(i + 1);
  });

  const cards = cardsAll
    .filter((c) => c.dataset.step)
    .sort((a, b) => Number(a.dataset.step) - Number(b.dataset.step));

  if (!pathBg || !pathLine || cards.length < 2) return;

  const parseLen = (raw, size) => {
    if (!raw) return null;
    const v = raw.trim();
    if (!v) return null;
    if (v.endsWith("%")) return (parseFloat(v) / 100) * size;
    return parseFloat(v);
  };

  const getAnchor = (card) => {
    const cardRect = card.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();

    const cs = getComputedStyle(card);
    const axRaw = cs.getPropertyValue("--journey-anchor-x");
    const ayRaw = cs.getPropertyValue("--journey-anchor-y");

    const ax = parseLen(axRaw, cardRect.width);
    const ay = parseLen(ayRaw, cardRect.height);

    const x = (cardRect.left - wrapRect.left) + (ax != null ? ax : cardRect.width / 2);
    const y = (cardRect.top - wrapRect.top) + (ay != null ? ay : cardRect.height / 2);

    return { x, y, step: Number(card.dataset.step) };
  };

  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

  const buildMeanderPath = (pts, wiggle) => {
    if (!pts.length) return "";

    let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;

      const ux = dx / dist;
      const uy = dy / dist;
      const nx = -uy;
      const ny = ux;

      const waves = clamp(Math.round(dist / 260), 1, 3);

      for (let w = 1; w <= waves; w++) {
        const t0 = (w - 1) / waves;
        const t1 = w / waves;

        const s = lerp(a, b, t0);
        const e = lerp(a, b, t1);

        const segDx = e.x - s.x;
        const segDy = e.y - s.y;
        const segDist = Math.hypot(segDx, segDy) || 1;

        const ampBase = clamp(segDist * 0.22, 18, wiggle);
        const dir = ((i + w) % 2 === 0) ? 1 : -1;
        const amp = ampBase * dir;

        const c1 = {
          x: s.x + segDx * 0.33 + nx * amp,
          y: s.y + segDy * 0.33 + ny * amp
        };
        const c2 = {
          x: s.x + segDx * 0.66 - nx * amp * 0.65,
          y: s.y + segDy * 0.66 - ny * amp * 0.65
        };

        d += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
      }
    }

    return d;
  };

  let raf = 0;
  const scheduleUpdate = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      updateNow(false);
    });
  };

  const updateNow = (doRestart) => {
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");

    const points = cards.map(getAnchor);

    const wiggle = clamp(Math.min(w, h) * 0.18, 40, 110);
    const d = buildMeanderPath(points, wiggle);

    pathBg.setAttribute("d", d);
    pathLine.setAttribute("d", d);

    if (doRestart && !wrapper.classList.contains("path-on")) {
      wrapper.classList.add("path-on");
    }
  };

  updateNow(false);

  const ro = new ResizeObserver(scheduleUpdate);
  ro.observe(wrapper);
  cards.forEach((c) => ro.observe(c));
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleUpdate, { passive: true });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleUpdate).catch(() => {});
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateNow(true);
          observer.unobserve(journeySection);
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(journeySection);

  log("Journey path (dynamic) initialized");
}

// ==================== SUN-MOON ARC ANIMATION ====================
class SunMoonArc {
  constructor() {
    this.canvas = document.getElementById('rhythmCanvas');
    if (!this.canvas) {
      log("SunMoonArc: No canvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.section = document.getElementById('rhythm');
    if (!this.section) return;
    
    this.timeSlots = this.section.querySelectorAll('.time-slot');
    
    this.timePosition = 0;
    this.isRunning = false;
    this.animationId = null;

    this.skyColors = [
      { time: 0.0, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 },
      { time: 0.08, bg: ['#3d3a5a', '#5a4f7a', '#2a2a3e'], text: '#f0e8f4', muted: '#c8c0d8', accent: '#b8a0c8', cardAlpha: 0.15 },
      { time: 0.15, bg: ['#ff9a56', '#ffb88c', '#ffd4a8'], text: '#3a2010', muted: '#5a4030', accent: '#b86040', cardAlpha: 0.85 },
      { time: 0.25, bg: ['#87ceeb', '#b0e0f0', '#f5f0e8'], text: '#1d2a1e', muted: '#3a4b3d', accent: '#c4846c', cardAlpha: 0.9 },
      { time: 0.5, bg: ['#5dade2', '#85c1e9', '#e8ede6'], text: '#1d2a1e', muted: '#3a4b3d', accent: '#b86040', cardAlpha: 0.9 },
      { time: 0.75, bg: ['#f4d03f', '#f8e473', '#f5f0e8'], text: '#2a2010', muted: '#4a4030', accent: '#b86040', cardAlpha: 0.88 },
      { time: 0.85, bg: ['#e74c3c', '#f39c12', '#f5c6a0'], text: '#2a1010', muted: '#4a3030', accent: '#a04020', cardAlpha: 0.85 },
      { time: 0.92, bg: ['#6c3483', '#a04080', '#e08050'], text: '#f8f0e8', muted: '#d8c8b8', accent: '#e8b888', cardAlpha: 0.2 },
      { time: 1.0, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 },
      { time: 1.25, bg: ['#0a1018', '#101820', '#0a1018'], text: '#d0d8e0', muted: '#98a8b8', accent: '#7090b0', cardAlpha: 0.1 },
      { time: 1.5, bg: ['#1a2a3a', '#243448', '#1a2a3a'], text: '#e8eef4', muted: '#b8c8d8', accent: '#8ab4d4', cardAlpha: 0.12 }
    ];

    this.sunColors = [
      { time: 0.0, color: { r: 230, g: 100, b: 60 } },
      { time: 0.15, color: { r: 250, g: 160, b: 80 } },
      { time: 0.3, color: { r: 255, g: 200, b: 100 } },
      { time: 0.5, color: { r: 255, g: 220, b: 120 } },
      { time: 0.7, color: { r: 255, g: 200, b: 100 } },
      { time: 0.85, color: { r: 250, g: 140, b: 60 } },
      { time: 1.0, color: { r: 230, g: 80, b: 50 } }
    ];

    // Cache DOM elements for faster updates
    this.cachedElements = {
      title: this.section.querySelector('.section-title'),
      subtitle: this.section.querySelector('.section-subtitle'),
      badge: this.section.querySelector('.section-badge'),
      cards: Array.from(this.section.querySelectorAll('.schedule-card')).map(card => ({
        el: card,
        title: card.querySelector('.schedule-card-title'),
        week: card.querySelector('.schedule-card-week'),
        text: card.querySelector('.schedule-card-text')
      })),
      slots: Array.from(this.section.querySelectorAll('.time-slot')).map(slot => ({
        el: slot,
        span: slot.querySelector('span'),
        svg: slot.querySelector('svg'),
        timeType: this.getSlotTimeType(slot)
      }))
    };

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("SunMoonArc initialized");
  }

  getSlotTimeType(slot) {
    const text = slot.querySelector('span')?.textContent || '';
    if (text.includes('10:30')) return 'morning';
    if (text.includes('2:30')) return 'afternoon';
    if (text.includes('6:30')) return 'evening';
    return null;
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.section.offsetWidth;
    this.canvas.height = this.section.offsetHeight;
    
    // Pre-compute arc dot positions (36 dots along the arc)
    this.arcDots = [];
    const pad = 80;
    const w = this.canvas.width - pad * 2;
    const h = this.canvas.height * 0.35;
    const baseY = this.canvas.height * 0.55;
    
    for (let i = 0; i <= 35; i++) {
      const t = i / 35;
      this.arcDots.push({
        t,
        x: pad + t * w,
        y: baseY - Math.sin(t * Math.PI) * h,
        colorName: t < 0.33 ? 'amber' : t < 0.66 ? 'terracotta' : 'sage'
      });
    }
    
    // Cache horizon Y position
    this.horizonY = this.canvas.height * 0.55;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!this.isRunning) {
              this.isRunning = true;
              this.animate();
            }
          } else {
            this.isRunning = false;
            if (this.animationId) {
              cancelAnimationFrame(this.animationId);
            }
          }
        });
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(this.section);
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  lerpColor(c1, c2, t) {
    const parse = (hex) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16)
    });
    const a = parse(c1);
    const b = parse(c2);
    const r = Math.round(this.lerp(a.r, b.r, t));
    const g = Math.round(this.lerp(a.g, b.g, t));
    const bl = Math.round(this.lerp(a.b, b.b, t));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
  }

  getSkyColorsAtTime(t) {
    for (let i = 0; i < this.skyColors.length - 1; i++) {
      if (t >= this.skyColors[i].time && t < this.skyColors[i + 1].time) {
        const range = this.skyColors[i + 1].time - this.skyColors[i].time;
        const localT = (t - this.skyColors[i].time) / range;
        const from = this.skyColors[i];
        const to = this.skyColors[i + 1];

        return {
          bg: [
            this.lerpColor(from.bg[0], to.bg[0], localT),
            this.lerpColor(from.bg[1], to.bg[1], localT),
            this.lerpColor(from.bg[2], to.bg[2], localT)
          ],
          text: this.lerpColor(from.text, to.text, localT),
          muted: this.lerpColor(from.muted, to.muted, localT),
          accent: this.lerpColor(from.accent, to.accent, localT),
          cardAlpha: this.lerp(from.cardAlpha, to.cardAlpha, localT)
        };
      }
    }
    return this.skyColors[0];
  }

  getSunColorAtTime(t) {
    for (let i = 0; i < this.sunColors.length - 1; i++) {
      if (t >= this.sunColors[i].time && t < this.sunColors[i + 1].time) {
        const range = this.sunColors[i + 1].time - this.sunColors[i].time;
        const localT = (t - this.sunColors[i].time) / range;
        const from = this.sunColors[i].color;
        const to = this.sunColors[i + 1].color;

        return {
          r: Math.round(this.lerp(from.r, to.r, localT)),
          g: Math.round(this.lerp(from.g, to.g, localT)),
          b: Math.round(this.lerp(from.b, to.b, localT))
        };
      }
    }
    return this.sunColors[0].color;
  }

  getArcPoint(t) {
    const pad = 80;
    const w = this.canvas.width - pad * 2;
    const h = this.canvas.height * 0.35;
    const baseY = this.canvas.height * 0.55;

    return {
      x: pad + t * w,
      y: baseY - Math.sin(t * Math.PI) * h
    };
  }

  getActiveTimeSlot(arcT, isSun) {
    if (!isSun) return null;
    if (arcT >= 0.12 && arcT < 0.38) return 'morning';
    if (arcT >= 0.38 && arcT < 0.62) return 'afternoon';
    if (arcT >= 0.62 && arcT < 0.88) return 'evening';
    return null;
  }

  updateUI(colors) {
    const { title, subtitle, badge, cards, slots } = this.cachedElements;
    
    this.section.style.background = `linear-gradient(180deg, ${colors.bg[0]} 0%, ${colors.bg[1]} 50%, ${colors.bg[2]} 100%)`;

    if (title) title.style.color = colors.text;
    if (subtitle) subtitle.style.color = colors.muted;
    if (badge) {
      badge.style.color = colors.accent;
      badge.style.background = colors.accent + '25';
    }

    const cardBg = `rgba(255,255,255,${colors.cardAlpha})`;
    cards.forEach(card => {
      card.el.style.background = cardBg;
      if (card.title) card.title.style.color = colors.text;
      if (card.week) card.week.style.color = colors.accent;
      if (card.text) card.text.style.color = colors.muted;
    });

    slots.forEach(slot => {
      slot.el.style.background = cardBg;
      if (slot.span) slot.span.style.color = colors.text;
      if (slot.svg) slot.svg.style.color = colors.accent;
    });
  }

  updateTimeSlotHighlights(arcT, isSun) {
    const activeSlot = this.getActiveTimeSlot(arcT, isSun);
    const { slots } = this.cachedElements;

    slots.forEach(slot => {
      if (slot.timeType === activeSlot) {
        slot.el.style.transform = 'scale(1.05)';
        slot.el.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
      } else {
        slot.el.style.transform = 'scale(1)';
        slot.el.style.boxShadow = 'none';
      }
    });
  }

  animate() {
    if (!this.isRunning) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.timePosition < 1) {
      this.timePosition += 0.00044;
    } else {
      this.timePosition += 0.00088;
    }
    if (this.timePosition >= 1.5) this.timePosition = 0;

    const isSun = this.timePosition < 1;
    const arcT = isSun ? this.timePosition : (this.timePosition - 1) * 2;

    const currentColors = this.getSkyColorsAtTime(this.timePosition);
    this.updateUI(currentColors);
    this.updateTimeSlotHighlights(arcT, isSun);

    let brightness;
    if (this.timePosition < 0.15) brightness = 0.3;
    else if (this.timePosition < 0.85) brightness = 0.8 + Math.sin((this.timePosition - 0.15) / 0.7 * Math.PI) * 0.2;
    else if (this.timePosition < 1.0) brightness = 0.3;
    else brightness = 0.2;

    ctx.beginPath();
    ctx.moveTo(60, this.horizonY);
    ctx.lineTo(this.canvas.width - 60, this.horizonY);
    ctx.strokeStyle = isSun ? getColor('sage', 0.1 + brightness * 0.2) : getColor('blue', 0.2);
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw arc dots using pre-computed positions
    for (let i = 0; i < this.arcDots.length; i++) {
      const dot = this.arcDots[i];
      const distToCelestial = Math.abs(dot.t - arcT);
      const glow = Math.max(0, 1 - distToCelestial * 5);

      let colorName, dotOpacity;
      if (isSun) {
        colorName = dot.colorName;
        dotOpacity = 0.15 + glow * 0.5 + brightness * 0.2;
      } else {
        colorName = 'blue';
        dotOpacity = 0.1 + glow * 0.4;
      }

      const dotSize = 2 + glow * 3;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
      ctx.fillStyle = getColor(colorName, dotOpacity);
      ctx.fill();
    }

    if (arcT > 0.02 && arcT < 0.98) {
      const pos = this.getArcPoint(arcT);

      if (isSun) {
        const sunColor = this.getSunColorAtTime(arcT);

        const glowSize = 50 + Math.sin(this.timePosition * 4) * 5;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
        grad.addColorStop(0, rgbaColor(sunColor.r, sunColor.g, sunColor.b, 0.6));
        grad.addColorStop(0.4, rgbaColor(sunColor.r, sunColor.g, sunColor.b, 0.2));
        grad.addColorStop(1, rgbaColor(sunColor.r, sunColor.g, sunColor.b, 0));
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = rgbaColor(sunColor.r, sunColor.g, sunColor.b, 0.95);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x - 4, pos.y - 4, 6, 0, Math.PI * 2);
        ctx.fillStyle = getColor('white', 0.5);
        ctx.fill();
      } else {
        const glowSize = 40 + Math.sin(this.timePosition * 3) * 3;
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSize);
        grad.addColorStop(0, getColor('moon', 0.4));
        grad.addColorStop(0.5, getColor('moon', 0.1));
        grad.addColorStop(1, getColor('moon', 0));
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = getColor('moon', 0.95);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pos.x + 5, pos.y - 3, 10, 0, Math.PI * 2);
        ctx.fillStyle = getColor('moonDark', 0.4);
        ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== WANDERING PATH (REFLECTION SECTION) ====================
class WanderingPath {
  constructor() {
    this.canvas = document.getElementById('reflectionCanvas');
    if (!this.canvas) {
      log("No reflectionCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    this.numDots = 60;
    this.pathPoints = [];
    this.targetPoints = [];
    this.dotPositions = [];

    this.colorNames = ['sage', 'terracotta', 'amber', 'sageDark'];

    this.resize();
    this.initPath();
    this.bindEvents();
    this.observeVisibility();

    log("WanderingPath initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;

    this.initPath();
  }

  initPath() {
    this.pathPoints = [];
    this.targetPoints = [];

    const numControlPoints = 8;
    const padding = 60;

    for (let i = 0; i < numControlPoints; i++) {
      const t = i / (numControlPoints - 1);
      const baseX = padding + t * (this.width - padding * 2);
      const baseY = this.height * 0.3 + Math.sin(t * Math.PI) * (this.height * 0.4);

      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 80;

      this.pathPoints.push({
        x: baseX + offsetX,
        y: baseY + offsetY,
        baseX: baseX,
        baseY: baseY
      });

      this.targetPoints.push({
        x: baseX + offsetX,
        y: baseY + offsetY
      });
    }

    this.dotPositions = [];
    for (let i = 0; i < this.numDots; i++) {
      const t = i / (this.numDots - 1);
      this.dotPositions.push({
        t: t,
        offset: (Math.random() - 0.5) * 20,
        size: 2 + Math.random() * 3,
        colorName: this.colorNames[Math.floor(Math.random() * this.colorNames.length)],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    return {
      x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
    };
  }

  getPointOnPath(t) {
    const points = this.pathPoints;
    const n = points.length - 1;
    const segment = Math.floor(t * n);
    const localT = (t * n) - segment;

    const i0 = Math.max(0, segment - 1);
    const i1 = segment;
    const i2 = Math.min(n, segment + 1);
    const i3 = Math.min(n, segment + 2);

    return this.catmullRom(points[i0], points[i1], points[i2], points[i3], localT);
  }

  updatePath() {
    for (let i = 0; i < this.pathPoints.length; i++) {
      const point = this.pathPoints[i];
      const target = this.targetPoints[i];

      point.x += (target.x - point.x) * 0.01;
      point.y += (target.y - point.y) * 0.01;

      if (Math.random() < 0.005) {
        const wanderRadius = 80;
        target.x = point.baseX + (Math.random() - 0.5) * wanderRadius * 2;
        target.y = point.baseY + (Math.random() - 0.5) * wanderRadius * 2;

        target.x = Math.max(40, Math.min(this.width - 40, target.x));
        target.y = Math.max(40, Math.min(this.height - 40, target.y));
      }
    }
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.016;
    this.updatePath();

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    this.dotPositions.forEach((dot, index) => {
      const waveOffset = Math.sin(this.time * 0.5 + dot.phase) * 0.02;
      const t = Math.max(0, Math.min(1, dot.t + waveOffset));

      const pathPoint = this.getPointOnPath(t);

      const nextT = Math.min(1, t + 0.01);
      const nextPoint = this.getPointOnPath(nextT);
      const dx = nextPoint.x - pathPoint.x;
      const dy = nextPoint.y - pathPoint.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;

      const perpX = -dy / len;
      const perpY = dx / len;

      const perpOffset = Math.sin(this.time * 0.8 + dot.phase * 2) * dot.offset;

      const x = pathPoint.x + perpX * perpOffset;
      const y = pathPoint.y + perpY * perpOffset;

      const pulseSize = dot.size + Math.sin(this.time * 1.5 + dot.phase) * 1;

      const alpha = 0.4 + Math.sin(this.time + dot.phase) * 0.2;

      ctx.beginPath();
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = getColor(dot.colorName, alpha);
      ctx.fill();
    });

    ctx.strokeStyle = getColor('sage', 0.1);
    ctx.lineWidth = 1;

    for (let i = 0; i < this.dotPositions.length - 1; i++) {
      const dot1 = this.dotPositions[i];
      const dot2 = this.dotPositions[i + 1];

      const t1 = Math.max(0, Math.min(1, dot1.t + Math.sin(this.time * 0.5 + dot1.phase) * 0.02));
      const t2 = Math.max(0, Math.min(1, dot2.t + Math.sin(this.time * 0.5 + dot2.phase) * 0.02));

      const p1 = this.getPointOnPath(t1);
      const p2 = this.getPointOnPath(t2);

      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== RISING BUBBLES (PRICING SECTION) ====================
class RisingBubbles {
  constructor() {
    this.canvas = document.getElementById('pricingCanvas');
    if (!this.canvas) {
      log("No pricingCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;
    this.bubbles = [];

    this.tierConfigs = [
      { spawnRate: 0.015, speed: 0.25, sizeMulti: 0.8, colorName: 'sage', glowIntensity: 0 },
      { spawnRate: 0.04, speed: 0.45, sizeMulti: 1.2, colorName: 'terracotta', glowIntensity: 0.2 },
      { spawnRate: 0.09, speed: 0.75, sizeMulti: 1.8, colorName: 'amber', glowIntensity: 0.4 }
    ];

    // Cache card bounds - refreshed on resize
    this.cardBounds = null;
    this.boundsValid = false;

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("RisingBubbles initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    
    this.boundsValid = false;
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  getCardBounds() {
    if (this.boundsValid && this.cardBounds) {
      return this.cardBounds;
    }
    
    const section = this.canvas.parentElement;
    const cards = section.querySelectorAll('.pricing-card');
    const sectionRect = section.getBoundingClientRect();

    this.cardBounds = Array.from(cards).map(card => {
      const rect = card.getBoundingClientRect();
      return {
        left: rect.left - sectionRect.left - 30,
        right: rect.right - sectionRect.left + 30,
        top: rect.top - sectionRect.top,
        bottom: rect.bottom - sectionRect.top,
        centerX: rect.left + rect.width / 2 - sectionRect.left
      };
    });
    
    this.boundsValid = true;
    return this.cardBounds;
  }

  spawnBubble(tierIndex, bounds) {
    const cfg = this.tierConfigs[tierIndex];
    return {
      x: bounds.left + Math.random() * (bounds.right - bounds.left),
      y: this.height + 15,
      tier: tierIndex,
      speed: cfg.speed + Math.random() * 0.35,
      size: (1.5 + Math.random() * 4) * cfg.sizeMulti,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 1.5 + Math.random() * 1,
      colorName: cfg.colorName,
      glowIntensity: cfg.glowIntensity
    };
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.016;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const bounds = this.getCardBounds();

    bounds.forEach((bound, tierIndex) => {
      const cfg = this.tierConfigs[tierIndex];
      if (Math.random() < cfg.spawnRate) {
        this.bubbles.push(this.spawnBubble(tierIndex, bound));
      }
    });

    if (this.bubbles.length > 300) {
      this.bubbles = this.bubbles.slice(-300);
    }

    this.bubbles = this.bubbles.filter(b => {
      b.y -= b.speed;
      b.x += Math.sin(this.time * b.wobbleSpeed + b.wobblePhase) * 0.5;

      if (b.y < -30) return false;

      const distFromBottom = this.height - b.y;
      const fadeInAlpha = Math.min(1, distFromBottom / 100);
      const fadeOutAlpha = b.y > 50 ? 1 : b.y / 50;
      const alpha = fadeInAlpha * fadeOutAlpha * 0.6;

      if (b.glowIntensity > 0) {
        const glowSize = b.size * 2.5;
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, glowSize);
        gradient.addColorStop(0, getColor(b.colorName, alpha * b.glowIntensity));
        gradient.addColorStop(1, getColor(b.colorName, 0));
        ctx.beginPath();
        ctx.arc(b.x, b.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fillStyle = getColor(b.colorName, alpha);
      ctx.fill();

      return true;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== GENTLE WAVES (AUDIENCE SECTION) ====================
class GentleWaves {
  constructor() {
    this.canvas = document.getElementById('audienceCanvas');
    if (!this.canvas) {
      log("No audienceCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    this.waves = [
      { colorName: 'sage', yOffset: 0.25, amplitude: 25, frequency: 0.008, speed: 0.8, alpha: 0.12 },
      { colorName: 'terracotta', yOffset: 0.4, amplitude: 20, frequency: 0.01, speed: 1.0, alpha: 0.10 },
      { colorName: 'amber', yOffset: 0.55, amplitude: 30, frequency: 0.006, speed: 0.6, alpha: 0.08 },
      { colorName: 'sageLightAlt', yOffset: 0.7, amplitude: 18, frequency: 0.012, speed: 1.2, alpha: 0.06 }
    ];

    this.particles = [];
    
    this.resize();
    this.initParticles();
    this.bindEvents();
    this.observeVisibility();

    log("GentleWaves initialized");
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  initParticles() {
    this.particles = [];
    const particleCount = 25;
    const colorNames = ['sage', 'terracotta', 'amber'];
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        baseY: this.height * (0.3 + Math.random() * 0.4),
        phase: Math.random() * Math.PI * 2,
        size: 2 + Math.random() * 2,
        speed: 0.5 + Math.random() * 0.5,
        colorName: colorNames[Math.floor(Math.random() * 3)]
      });
    }
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.initParticles();
      }, 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.012;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    this.waves.forEach(wave => {
      const baseY = this.height * wave.yOffset;

      ctx.beginPath();
      ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 4) {
        const y = baseY + Math.sin(x * wave.frequency + this.time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(this.width, this.height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, this.height);
      grad.addColorStop(0, getColor(wave.colorName, wave.alpha));
      grad.addColorStop(1, getColor(wave.colorName, 0));
      ctx.fillStyle = grad;
      ctx.fill();
    });

    this.particles.forEach(p => {
      p.x += p.speed * 0.3;
      if (p.x > this.width + 10) p.x = -10;

      const waveY = Math.sin(p.x * 0.008 + this.time * 0.8) * 20;
      const y = p.baseY + waveY + Math.sin(this.time + p.phase) * 5;

      const pulse = 1 + Math.sin(this.time * 2 + p.phase) * 0.2;
      const alpha = 0.25 + Math.sin(this.time + p.phase) * 0.1;

      ctx.beginPath();
      ctx.arc(p.x, y, p.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = getColor(p.colorName, alpha);
      ctx.fill();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== BREATHING MANDALA (COMPASSION SECTION) ====================
class CompassionMandala {
  constructor() {
    this.canvas = document.getElementById('compassionCanvas');
    if (!this.canvas) {
      log("No compassionCanvas found");
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.isVisible = false;
    this.animationId = null;
    this.time = 0;

    this.rings = [
      { radius: 1.4, dots: 20, colorName: 'sageLightAlt', size: 4.5 },
      { radius: 1.8, dots: 28, colorName: 'sage', size: 4 },
      { radius: 2.2, dots: 36, colorName: 'terracotta', size: 3.5 },
      { radius: 2.6, dots: 44, colorName: 'amber', size: 3 }
    ];

    // Pre-compute unit circle positions for each dot (cos/sin of base angles)
    // This is resolution-independent - just multiply by radius at draw time
    this.precomputeDotPositions();

    this.resize();
    this.bindEvents();
    this.observeVisibility();

    log("CompassionMandala initialized");
  }

  // Pre-compute unit circle positions - only needs to run once ever
  precomputeDotPositions() {
    this.dotCache = this.rings.map(ring => {
      const dots = [];
      for (let i = 0; i < ring.dots; i++) {
        const angle = (i / ring.dots) * Math.PI * 2;
        dots.push({
          cos: Math.cos(angle),  // x on unit circle
          sin: Math.sin(angle),  // y on unit circle
          pulseOffset: i * 0.3,  // for pulse animation
          alphaOffset: i * 0.2   // for alpha animation
        });
      }
      return dots;
    });
  }

  resize() {
    const section = this.canvas.parentElement;
    const rect = section.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    
    // Cache center and max radius (updated on resize)
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.maxRadius = Math.min(this.width, this.height) * 0.35;
  }

  bindEvents() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  observeVisibility() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.animate();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    observer.observe(this.canvas.parentElement);
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.time += 0.01;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const breathe = 1 + Math.sin(this.time * 0.5) * 0.1;

    for (let ri = 0; ri < this.rings.length; ri++) {
      const ring = this.rings[ri];
      const dots = this.dotCache[ri];
      const ringRadius = ring.radius * this.maxRadius * breathe;
      
      // Compute rotation sin/cos ONCE per ring (instead of per dot)
      const rotAngle = this.time * (0.08 + ri * 0.03) * (ri % 2 === 0 ? 1 : -1);
      const rotCos = Math.cos(rotAngle);
      const rotSin = Math.sin(rotAngle);
      
      const baseAlpha = 0.5 + ri * 0.05;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Rotate pre-computed unit position: x' = x*cos - y*sin, y' = x*sin + y*cos
        const rotX = dot.cos * rotCos - dot.sin * rotSin;
        const rotY = dot.cos * rotSin + dot.sin * rotCos;
        
        // Scale by radius and translate to center
        const x = this.centerX + rotX * ringRadius;
        const y = this.centerY + rotY * ringRadius;

        const pulse = 1 + Math.sin(this.time * 1.5 + dot.pulseOffset) * 0.2;
        const alpha = baseAlpha + Math.sin(this.time + dot.alphaOffset) * 0.1;

        ctx.beginPath();
        ctx.arc(x, y, ring.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = getColor(ring.colorName, alpha);
        ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ==================== INITIALIZE ====================
// ==================== LOGO DOT CONNECTOR ====================
function initLogoConnectLines() {
  document.querySelectorAll('.logo-grid--small').forEach(function (grid) {
    if (grid.querySelector('.logo-connect-lines')) return;
    var dots = grid.querySelectorAll('.logo-dot');
    if (dots.length < 3) return;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'logo-connect-lines');
    svg.setAttribute('preserveAspectRatio', 'none');

    function positionLines() {
      var gRect = grid.getBoundingClientRect();
      svg.setAttribute('viewBox', '0 0 ' + gRect.width + ' ' + gRect.height);
      var centers = [];
      for (var i = 0; i < dots.length; i++) {
        var dRect = dots[i].getBoundingClientRect();
        centers.push({
          x: (dRect.left - gRect.left + dRect.width / 2),
          y: (dRect.top - gRect.top + dRect.height / 2)
        });
      }
      var lines = svg.querySelectorAll('line');
      // line-1: dot1 → dot2, line-2: dot2 → dot3, line-3: dot3 → dot1
      var pairs = [[0,1],[1,2],[2,0]];
      for (var j = 0; j < pairs.length; j++) {
        var ln = lines[j];
        if (!ln) {
          ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          ln.setAttribute('class', 'line-' + (j + 1));
          svg.appendChild(ln);
        }
        ln.setAttribute('x1', centers[pairs[j][0]].x);
        ln.setAttribute('y1', centers[pairs[j][0]].y);
        ln.setAttribute('x2', centers[pairs[j][1]].x);
        ln.setAttribute('y2', centers[pairs[j][1]].y);
      }
    }

    grid.appendChild(svg);
    positionLines();
    window.addEventListener('resize', positionLines);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  log("DOM Content Loaded");

  log("Starting InteractiveBackground...");
  window.interactiveBg = new InteractiveBackground();

  initLogoConnectLines();
  initNavigation();
  initExploreSectionTracker();
  initScrollAnimations();
  initSmoothScroll();
  initJourneyPath();

  log("Starting SunMoonArc...");
  window.sunMoonArc = new SunMoonArc();

  log("Starting WanderingPath...");
  window.wanderingPath = new WanderingPath();

  log("Starting RisingBubbles...");
  window.risingBubbles = new RisingBubbles();

  log("Starting GentleWaves...");
  window.gentleWaves = new GentleWaves();

  log("Starting CompassionMandala...");
  window.compassionMandala = new CompassionMandala();

  log("All initializations complete");
});

/* ==================== VOYAGE OCEAN (Hero Journey Interactive) ==================== */
(() => {
    const STEPS = [
        { title: 'Arrive',    desc: 'as we are \u2014 with our tender imperfect humanity' },
        { title: 'Listen',    desc: 'deeply \u2014 to our stories, not to fix them, but to understand and integrate them' },
        { title: 'Lighten',   desc: 'the heavy bags \u2014 past patterns, old hurts, auto-pilot reactions' },
        { title: 'Renew',     desc: 'and breathe \u2014 allowing ourselves to rest and re-energise' },
        { title: 'Choose',    desc: 'to soften, to open, to attune to life' },
        { title: 'Belong',    desc: 'and reconnect with our wholeness \u2014 both our broken places and our hidden potential' },
        { title: 'Celebrate', desc: 'our return to aliveness \u2014 dance with life, love, and blossom' },
    ];

    const STEPS_I18N = {
        hi: [
            { title: 'पहुँचना',  desc: 'जैसे हम हैं — अपनी कोमल अपूर्ण मानवता के साथ' },
            { title: 'सुनना',    desc: 'गहराई से — अपनी कहानियों को, उन्हें ठीक करने के लिए नहीं, बल्कि समझने और आत्मसात करने के लिए' },
            { title: 'हल्का',    desc: 'भारी बोझ — पुरानी आदतें, पुराने ज़ख्म, स्वचालित प्रतिक्रियाएँ' },
            { title: 'नवीनता',   desc: 'और साँस लेना — खुद को आराम और पुनः ऊर्जा देना' },
            { title: 'चुनना',    desc: 'नरम होना, खुलना, जीवन के साथ तालमेल बिठाना' },
            { title: 'जुड़ना',   desc: 'और अपनी संपूर्णता से फिर से जुड़ना — हमारे टूटे हुए स्थान और हमारी छिपी क्षमता दोनों' },
            { title: 'जश्न',    desc: 'जीवंतता की ओर लौटना — जीवन, प्रेम और खिलने के साथ नृत्य करना' },
        ],
        ur: [
            { title: 'پہنچنا',   desc: 'جیسے ہم ہیں — اپنی نازک نامکمل انسانیت کے ساتھ' },
            { title: 'سننا',     desc: 'گہرائی سے — اپنی کہانیوں کو، انہیں ٹھیک کرنے کے لیے نہیں، بلکہ سمجھنے اور جذب کرنے کے لیے' },
            { title: 'ہلکا',     desc: 'بھاری بوجھ — پرانے نمونے، پرانے زخم، خودکار ردعمل' },
            { title: 'تجدید',    desc: 'اور سانس لینا — خود کو آرام اور توانائی دینا' },
            { title: 'چننا',     desc: 'نرم ہونا، کھلنا، زندگی سے ہم آہنگ ہونا' },
            { title: 'تعلق',     desc: 'اور اپنی مکمل ذات سے دوبارہ جڑنا — ہماری ٹوٹی جگہیں اور ہماری چھپی صلاحیت دونوں' },
            { title: 'جشن',      desc: 'زندگی کی طرف واپسی — زندگی، محبت اور کھلنے کے ساتھ رقص' },
        ]
    };

    function getStep(i) {
        var lang = window.currentLang || 'en';
        if (STEPS_I18N[lang] && STEPS_I18N[lang][i]) return STEPS_I18N[lang][i];
        return STEPS[i];
    }

    var PAD = (window.innerWidth <= 500) ? 0.13 : 0.07;

    const ocean = document.getElementById('voyageOcean');
    if (!ocean) return;

    const canvas = document.getElementById('voyageCanvas');
    const ctx = canvas.getContext('2d');
    const waypointsEl = document.getElementById('voyageWaypoints');
    const textEl = document.getElementById('voyageText');
    const wordEl = document.getElementById('voyageWord');
    const descEl = document.getElementById('voyageDesc');
    const progressEl = document.getElementById('voyageProgress');
    const hintEl = document.getElementById('voyageHint');

    let W, H, dpr;
    let shipX = PAD;
    let currentStep = 0;
    let dragging = false;
    let dragStartPointerX = 0;
    let dragStartShipX = 0;
    let time = 0;
    let hintDismissed = false;

    const particles = [];
    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random(), y: 0.52 + Math.random() * 0.44,
            r: 0.8 + Math.random() * 2,
            speed: 0.00015 + Math.random() * 0.0003,
            phase: Math.random() * Math.PI * 2,
            alpha: 0.06 + Math.random() * 0.12,
        });
    }

    const skyDots = [];
    for (let i = 0; i < 12; i++) {
        skyDots.push({
            x: Math.random(), y: 0.05 + Math.random() * 0.28,
            r: 0.6 + Math.random() * 1,
            phase: Math.random() * Math.PI * 2,
            alpha: 0.04 + Math.random() * 0.08,
        });
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        W = ocean.clientWidth;
        H = ocean.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function waveY(x, t, amp, freq, speed, phase) {
        return Math.sin(x * freq + t * speed + phase) * amp;
    }
    function waterlineY(xPx) {
        return H * 0.48
            + waveY(xPx, time, 9, 0.014, 1.4, 0)
            + waveY(xPx, time, 5, 0.028, 2.1, 2.2)
            + waveY(xPx, time, 3, 0.045, 3.0, 4.5);
    }

    function waypointFrac(i) { return PAD + (i / (STEPS.length - 1)) * (1 - 2 * PAD); }

    function buildWaypoints() {
        waypointsEl.innerHTML = '';
        var narrow = window.innerWidth <= 500;
        STEPS.forEach(function(step, i) {
            var el = document.createElement('div');
            el.className = 'voyage-waypoint';
            el.style.left = (waypointFrac(i) * 100) + '%';
            el.style.bottom = narrow ? (i % 2 === 0 ? '68px' : '46px') : '60px';
            el.innerHTML = '<div class="waypoint-beacon"></div><div class="waypoint-label">' + getStep(i).title + '</div>';
            waypointsEl.appendChild(el);
        });
    }

    function buildProgress() {
        if (!progressEl) return;
        progressEl.innerHTML = '';
        STEPS.forEach(function(_, i) {
            var pip = document.createElement('div');
            pip.className = 'voyage-pip';
            pip.addEventListener('click', function() { animateShipTo(waypointFrac(i)); });
            progressEl.appendChild(pip);
        });
    }

    function nearestStep() {
        var norm = (shipX - PAD) / (1 - 2 * PAD);
        return Math.max(0, Math.min(STEPS.length - 1, Math.round(norm * (STEPS.length - 1))));
    }

    function updateUI() {
        var idx = nearestStep();
        if (idx !== currentStep) {
            textEl.classList.add('fading');
            setTimeout(function() {
                currentStep = idx;
                if (wordEl) wordEl.textContent = getStep(idx).title;
                descEl.textContent = ' ' + getStep(idx).desc;
                if (wordEl) descEl.prepend(wordEl);
                textEl.classList.remove('fading');
            }, 200);
        }
        document.querySelectorAll('.voyage-waypoint').forEach(function(el, i) {
            el.classList.toggle('active', i === idx);
            el.classList.toggle('passed', i < idx);
        });
    }

    function drawSky() {
        var grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#F0D4A8');
        grad.addColorStop(0.15, '#F4E0BF');
        grad.addColorStop(0.30, '#F8EDE0');
        grad.addColorStop(0.42, '#FDF8F3');
        grad.addColorStop(0.50, '#E8E0D4');
        grad.addColorStop(0.58, '#9AB8A8');
        grad.addColorStop(0.72, '#78B0A6');
        grad.addColorStop(1.0, '#4F8F85');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        skyDots.forEach(function(s) {
            var twinkle = 0.5 + 0.5 * Math.sin(time * 1.2 + s.phase);
            ctx.beginPath();
            ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + (s.alpha * twinkle) + ')';
            ctx.fill();
        });
    }

    function drawWaves() {
        var layers = [
            { yBase: 0.60, amp: 7,  freq: 0.011, speed: 1.0, phase: 1.0, color: 'rgba(65,130,120,0.18)' },
            { yBase: 0.55, amp: 8,  freq: 0.016, speed: 1.5, phase: 0.0, color: 'rgba(80,145,132,0.15)' },
            { yBase: 0.48, amp: 10, freq: 0.014, speed: 1.4, phase: 0.0, color: 'rgba(100,165,150,0.12)' },
        ];
        layers.forEach(function(l) {
            ctx.beginPath();
            ctx.moveTo(0, H);
            for (var x = 0; x <= W; x += 2)
                ctx.lineTo(x, H * l.yBase + waveY(x, time, l.amp, l.freq, l.speed, l.phase));
            ctx.lineTo(W, H);
            ctx.closePath();
            ctx.fillStyle = l.color;
            ctx.fill();
        });
        for (var x = 10; x < W; x += 50) {
            var fx = x + Math.sin(time * 0.7 + x * 0.04) * 10;
            var fy = waterlineY(fx) - 1;
            ctx.beginPath();
            ctx.ellipse(fx, fy, 12 + Math.sin(time + x * 0.07) * 6, 1.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
            ctx.fill();
        }
        // Light sparkles on water surface
        for (var x = 30; x < W; x += 80) {
            var shimmer = Math.sin(time * 1.8 + x * 0.05);
            if (shimmer > 0.3) {
                var sx = x + Math.sin(time * 0.5 + x * 0.03) * 15;
                var sy = waterlineY(sx) - 2;
                ctx.beginPath();
                ctx.ellipse(sx, sy, 8 + shimmer * 6, 1, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,' + (shimmer * 0.12) + ')';
                ctx.fill();
            }
        }
    }

    function drawFgWaves() {
        var layers = [
            { yBase: 0.68, amp: 5, freq: 0.02, speed: 2.4, phase: 3.5, color: 'rgba(55,115,105,0.14)' },
            { yBase: 0.75, amp: 4, freq: 0.025, speed: 2.8, phase: 5.0, color: 'rgba(45,100,92,0.11)' },
        ];
        layers.forEach(function(l) {
            ctx.beginPath();
            ctx.moveTo(0, H);
            for (var x = 0; x <= W; x += 2)
                ctx.lineTo(x, H * l.yBase + waveY(x, time, l.amp, l.freq, l.speed, l.phase));
            ctx.lineTo(W, H);
            ctx.closePath();
            ctx.fillStyle = l.color;
            ctx.fill();
        });
    }

    function drawParticles() {
        particles.forEach(function(p) {
            ctx.beginPath();
            ctx.arc(p.x * W, p.y * H + Math.sin(time * 1.3 + p.phase) * 5, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + p.alpha + ')';
            ctx.fill();
            p.x += p.speed;
            if (p.x > 1.06) p.x = -0.06;
        });
    }

    function drawWaypointBeams() {
        var idx = nearestStep();
        var shipPx = shipX * W;

        // ── Connect-the-dots line along waterline from first waypoint to ship ──
        var firstX = waypointFrac(0) * W;
        if (shipPx > firstX + 2) {
            // Glow behind the line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(firstX, waterlineY(firstX));
            for (var px = firstX; px <= shipPx; px += 3) {
                ctx.lineTo(px, waterlineY(px));
            }
            ctx.lineTo(shipPx, waterlineY(shipPx));
            ctx.strokeStyle = 'rgba(196,132,108,0.12)';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();

            // Main line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(firstX, waterlineY(firstX));
            for (var px = firstX; px <= shipPx; px += 3) {
                ctx.lineTo(px, waterlineY(px));
            }
            ctx.lineTo(shipPx, waterlineY(shipPx));
            ctx.strokeStyle = 'rgba(196,132,108,0.45)';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
        }

        // ── Dotted path ahead of ship (upcoming route) ──
        var lastX = waypointFrac(STEPS.length - 1) * W;
        if (shipPx < lastX - 2) {
            ctx.save();
            ctx.setLineDash([3, 8]);
            ctx.beginPath();
            ctx.moveTo(shipPx, waterlineY(shipPx));
            for (var px = shipPx; px <= lastX; px += 3) {
                ctx.lineTo(px, waterlineY(px));
            }
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        // ── Waypoint dots ──
        STEPS.forEach(function(_, i) {
            var x = waypointFrac(i) * W;
            var wy = waterlineY(x);

            if (i === idx) {
                // Active: glowing ring + filled dot
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, wy, 16, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(196,132,108,0.1)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, wy, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(196,132,108,0.85)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, wy, 6, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.8)';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            } else if (i < idx) {
                // Passed: filled sage dot
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, wy, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(155,170,143,0.75)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, wy, 5, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();
            } else {
                // Upcoming: hollow dot
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, wy, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, wy, 4, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();
            }
        });
    }

    function drawShip() {
        var sx = shipX * W;
        var sy = waterlineY(sx);
        var dx = 4;
        var slope = (waterlineY(sx + dx) - waterlineY(sx - dx)) / (dx * 2);
        var angle = Math.atan(slope) * 0.6;
        var bob = Math.sin(time * 2.2) * 2;

        ctx.save();
        ctx.translate(sx, sy - 4 + bob);
        ctx.rotate(angle);

        // Hull
        ctx.beginPath();
        ctx.moveTo(-16, 0);
        ctx.lineTo(-12, 6);
        ctx.quadraticCurveTo(0, 9, 12, 6);
        ctx.lineTo(18, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(166,107,84,0.9)';
        ctx.fill();

        // Mast
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, -30);
        ctx.strokeStyle = 'rgba(80,70,62,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Sail
        ctx.beginPath();
        ctx.moveTo(1, -28);
        ctx.lineTo(14, -10);
        ctx.lineTo(1, -6);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fill();

        // Flag
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(-7, -33);
        ctx.lineTo(0, -36);
        ctx.fillStyle = 'rgba(196,132,108,0.9)';
        ctx.fill();

        ctx.restore();

        // Wake
        for (var i = 1; i <= 25; i++) {
            var wx = sx - i * 5;
            if (wx < 0) break;
            var r = 1.8 * (1 - i / 28);
            if (r <= 0) break;
            ctx.beginPath();
            ctx.arc(wx, waterlineY(wx) + 3 + i * 0.4, r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + (0.16 * (1 - i / 25)) + ')';
            ctx.fill();
        }
    }

    function frame() {
        time += 0.016;
        ctx.clearRect(0, 0, W, H);
        drawSky();
        drawWaves();
        drawParticles();
        drawWaypointBeams();
        drawShip();
        drawFgWaves();
        requestAnimationFrame(frame);
    }

    function ptrFrac(e) {
        var ev = e.touches ? e.touches[0] : e;
        return (ev.clientX - ocean.getBoundingClientRect().left) / ocean.clientWidth;
    }

    function onStart(e) {
        e.preventDefault();
        dragging = true;
        dragStartPointerX = ptrFrac(e);
        dragStartShipX = shipX;
        if (!hintDismissed) { hintDismissed = true; hintEl.classList.add('hidden'); }
    }
    function onMove(e) {
        if (!dragging) return;
        e.preventDefault();
        shipX = Math.max(0.03, Math.min(0.97, dragStartShipX + ptrFrac(e) - dragStartPointerX));
        updateUI();
    }
    function onEnd() {
        if (!dragging) return;
        dragging = false;
        animateShipTo(waypointFrac(nearestStep()));
    }

    ocean.addEventListener('mousedown', onStart);
    ocean.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    var snapRaf = null;
    function animateShipTo(target) {
        if (snapRaf) cancelAnimationFrame(snapRaf);
        var start = shipX, t0 = performance.now();
        function tick(now) {
            var p = Math.min(1, (now - t0) / 350);
            shipX = start + (target - start) * (1 - Math.pow(1 - p, 3));
            updateUI();
            if (p < 1) snapRaf = requestAnimationFrame(tick);
        }
        snapRaf = requestAnimationFrame(tick);
    }

    resize();
    buildWaypoints();
    buildProgress();
    updateUI();
    frame();
    window.addEventListener('resize', function() { PAD = (window.innerWidth <= 500) ? 0.13 : 0.07; resize(); buildWaypoints(); });

    // Re-render voyage text when language changes
    document.addEventListener('languageChanged', function() {
        buildWaypoints();
        // Force text update
        var idx = nearestStep();
        if (wordEl) wordEl.textContent = getStep(idx).title;
        descEl.textContent = ' ' + getStep(idx).desc;
        if (wordEl) descEl.prepend(wordEl);
    });
})();

/* ==================== EVENTS DRAWER (loads from events.js) ==================== */
(function() {
    var tab = document.getElementById('eventsTab');
    var glanceList = document.getElementById('eventsGlanceList');
    var drawer = document.getElementById('eventsDrawer');
    var overlay = document.getElementById('eventsOverlay');
    var closeBtn = document.getElementById('eventsClose');
    var upcomingEl = document.getElementById('eventsUpcoming');
    var persistentEl = document.getElementById('eventsPersistent');
    var sectionDivider = document.getElementById('eventsSectionDivider');
    if (!drawer) return;

    var MONTHS_SHORT = {
        en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        hi: ['जन','फ़र','मार्च','अप्रै','मई','जून','जुल','अग','सित','अक्टू','नव','दिस'],
        ur: ['جنو','فرو','مارچ','اپری','مئی','جون','جول','اگس','ستم','اکتو','نوم','دسم']
    };
    var DAYS_SHORT = {
        en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        hi: ['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
        ur: ['اتوار','پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ']
    };
    var EVENTS_STRINGS = {
        en: { ongoing: 'Ongoing', noEvents: 'No upcoming events — check back soon!', learnMore: 'Learn more' },
        hi: { ongoing: 'चालू', noEvents: 'कोई आगामी कार्यक्रम नहीं — जल्द वापस आएं!', learnMore: 'और जानें' },
        ur: { ongoing: 'جاری', noEvents: 'کوئی آنے والے پروگرام نہیں — جلد واپس آئیں!', learnMore: 'مزید جانیں' }
    };

    function getLang() { return window.currentLang || 'en'; }
    function months() { return MONTHS_SHORT[getLang()] || MONTHS_SHORT.en; }
    function days() { return DAYS_SHORT[getLang()] || DAYS_SHORT.en; }
    function str() { return EVENTS_STRINGS[getLang()] || EVENTS_STRINGS.en; }

    function evField(ev, field) {
        var lang = getLang();
        if (lang !== 'en' && ev.i18n && ev.i18n[lang] && ev.i18n[lang][field]) {
            return ev.i18n[lang][field];
        }
        return ev[field] || '';
    }

    function formatDate(iso) {
        var d = new Date(iso + 'T00:00:00');
        return days()[d.getDay()] + ', ' + d.getDate() + ' ' + months()[d.getMonth()];
    }
    function shortDate(iso) {
        var d = new Date(iso + 'T00:00:00');
        return months()[d.getMonth()].toUpperCase() + ' ' + d.getDate();
    }

    function openDrawer(e) {
        if (e) e.preventDefault();
        drawer.classList.add('open');
        overlay.classList.add('visible');
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
    }

    if (tab) {
        tab.addEventListener('click', openDrawer);
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDrawer(); }
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    function renderUpcoming(events) {
        var now = new Date();
        now.setHours(0,0,0,0);
        var future = (events || []).filter(function(ev) {
            if (!ev.date) return true;
            return new Date(ev.date + 'T23:59:59') >= now;
        });
        if (future.length === 0) {
            upcomingEl.innerHTML = '<div class="event-card" style="justify-content:center;align-items:center;min-height:60px;"><p class="event-desc" style="text-align:center;opacity:0.6;">' + str().noEvents + '</p></div>';
            return;
        }
        upcomingEl.innerHTML = future.map(function(ev) {
            var tag = evField(ev, 'tag');
            var hasTag = tag && tag.trim();
            return '<div class="event-card' + (hasTag ? '' : ' no-tag') + '">'
                + (hasTag ? '<span class="event-tag">' + tag + '</span>' : '')
                + (ev.date ? '<div class="event-date"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' + formatDate(ev.date) + '</div>' : '')
                + (evField(ev, 'time') ? '<div class="event-time">' + evField(ev, 'time') + '</div>' : '')
                + (evField(ev, 'title') ? '<div class="event-title">' + evField(ev, 'title') + '</div>' : '')
                + (evField(ev, 'subtitle') ? '<div class="event-subtitle">' + evField(ev, 'subtitle') + '</div>' : '')
                + (evField(ev, 'description') ? '<div class="event-desc">' + evField(ev, 'description') + '</div>' : '')
                + '</div>';
        }).join('');
    }

    function renderPersistent(events) {
        if (!events || events.length === 0) return;
        persistentEl.innerHTML = events.map(function(ev) {
            var tag = evField(ev, 'tag');
            var hasTag = tag && tag.trim();
            return '<div class="event-card event-card--persistent' + (hasTag ? '' : ' no-tag') + '">'
                + (hasTag ? '<span class="event-tag">' + tag + '</span>' : '')
                + (evField(ev, 'title') ? '<div class="event-title">' + evField(ev, 'title') + '</div>' : '')
                + (evField(ev, 'subtitle') ? '<div class="event-subtitle">' + evField(ev, 'subtitle') + '</div>' : '')
                + (evField(ev, 'description') ? '<div class="event-desc">' + evField(ev, 'description') + '</div>' : '')
                + (ev.link ? '<a href="' + ev.link + '" class="event-link">' + str().learnMore + ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' : '')
                + '</div>';
        }).join('');
    }

    function renderGlance(data) {
        if (!glanceList) return;
        var now = new Date();
        now.setHours(0,0,0,0);
        var rows = [];
        (data.upcoming || []).forEach(function(ev) {
            if (ev.date && new Date(ev.date + 'T23:59:59') < now) return;
            var tag = evField(ev, 'tag');
            var tagClass = '', tagText = '';
            if (tag) {
                tagClass = (ev.tag || '').toLowerCase() === 'free' ? 'free' : 'paid';
                tagText = tag;
            }
            rows.push('<div class="events-glance-row"><span class="events-glance-date">' + (ev.date ? shortDate(ev.date) : '') + '</span><span class="events-glance-name">' + evField(ev, 'title') + '</span>' + (tagText ? '<span class="events-glance-tag ' + tagClass + '">' + tagText + '</span>' : '') + '</div>');
        });
        (data.persistent || []).forEach(function(ev) {
            var tag = evField(ev, 'tag');
            rows.push('<div class="events-glance-row"><span class="events-glance-date ongoing">' + str().ongoing + '</span><span class="events-glance-name">' + evField(ev, 'title') + '</span>' + (tag ? '<span class="events-glance-tag paid">' + tag + '</span>' : '') + '</div>');
        });
        glanceList.innerHTML = rows.join('');
    }

    function renderAll() {
        var data = window.EVENTS_DATA || {};
        renderUpcoming(data.upcoming || []);
        renderPersistent(data.persistent || []);
        renderGlance(data);

        var hasUpcoming = upcomingEl && upcomingEl.children.length > 0;
        var hasPersistent = persistentEl && persistentEl.children.length > 0;
        if (hasUpcoming && hasPersistent && sectionDivider) {
            sectionDivider.classList.add('visible');
        }
    }

    renderAll();

    // Re-render events when language changes
    document.addEventListener('languageChanged', renderAll);
})();
