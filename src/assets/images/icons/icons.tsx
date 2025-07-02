import React from 'preact/compat'

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
)

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

export const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
)

export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

export const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
)

export const Bolt = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 56 56"
  >
    <path d="M 13.1758 32.5000 L 26.4180 32.5000 L 19.4336 51.4844 C 18.5195 53.8984 21.0273 55.1875 22.6211 53.2187 L 43.9023 26.5938 C 44.3008 26.1016 44.5117 25.6328 44.5117 25.0938 C 44.5117 24.2031 43.8320 23.5000 42.8477 23.5000 L 29.5820 23.5000 L 36.5899 4.5156 C 37.4804 2.1016 34.9961 .8125 33.4023 2.8047 L 12.1211 29.4063 C 11.7226 29.9219 11.4883 30.3906 11.4883 30.9063 C 11.4883 31.8203 12.1914 32.5000 13.1758 32.5000 Z" />
  </svg>
)

export const Store = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 32 32"
    version="1.1"
  >
    <path d="M0 10.016l4-10.016h24l4 10.016q0 1.664-1.184 2.816t-2.816 1.184-2.816-1.184-1.184-2.816q0 1.664-1.184 2.816t-2.816 1.184-2.816-1.184-1.184-2.816q0 1.664-1.184 2.816t-2.816 1.184-2.816-1.184-1.184-2.816q0 1.664-1.184 2.816t-2.816 1.184-2.816-1.184-1.184-2.816zM2.016 30.016h28v1.984h-28v-1.984zM4 28v-12q2.272 0 4-1.536v9.536h16v-9.536q1.728 1.536 4 1.536v12h-24z" />
  </svg>
)

export const Products = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 52 52"
  >
    <path d="m24 35.33a.81.81 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.32 2.44h-16.42a2.45 2.45 0 0 1 -2.44-2.28v-11.57a.81.81 0 0 1 .71-.81h19.66zm23.61 0a.82.82 0 0 1 .81.71v11.52a2.44 2.44 0 0 1 -2.33 2.44h-16.42a2.44 2.44 0 0 1 -2.43-2.28v-11.57a.81.81 0 0 1 .71-.81h19.61zm-29.92 3.37-.09.07-4.6 5.06-2.11-2a.62.62 0 0 0 -.79-.07l-.08.07-.87.78a.49.49 0 0 0 -.07.71l.07.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.15 1.15 0 0 0 .87-.36l5.52-5.84a.63.63 0 0 0 .06-.72l-.06-.07-.87-.78a.61.61 0 0 0 -.85-.12zm23.61 0-.09.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.49.49 0 0 0 -.06.71l.06.08 3 2.83a1.25 1.25 0 0 0 .87.36 1.14 1.14 0 0 0 .87-.36l5.56-5.89a.65.65 0 0 0 0-.72v-.07l-.87-.78a.61.61 0 0 0 -.83-.07zm-18.76-11.52a2.36 2.36 0 0 1 2.27 2.28v2.61a.81.81 0 0 1 -.66.81h-21.39a.78.78 0 0 1 -.76-.7v-2.55a2.38 2.38 0 0 1 2.13-2.44h18.41zm25.18 0a2.36 2.36 0 0 1 2.28 2.28v2.61a.81.81 0 0 1 -.66.81h-21.4a.78.78 0 0 1 -.75-.71v-2.54a2.38 2.38 0 0 1 2.13-2.44h18.4zm-12-17a.81.81 0 0 1 .8.71v11.48a2.44 2.44 0 0 1 -2.28 2.44h-16.37a2.46 2.46 0 0 1 -2.44-2.29v-11.52a.81.81 0 0 1 .71-.8h19.62zm-6.27 3.37-.08.07-4.66 5.06-2.11-2a.61.61 0 0 0 -.78-.07l-.09.07-.87.78a.5.5 0 0 0 -.07.71l.07.08 3 2.82a1.22 1.22 0 0 0 .87.37 1.13 1.13 0 0 0 .87-.37l5.53-5.83a.65.65 0 0 0 .05-.72l-.05-.07-.87-.78a.62.62 0 0 0 -.77-.15zm6.31-11.55a2.44 2.44 0 0 1 2.43 2.28v2.61a.83.83 0 0 1 -.71.81h-22.86a.81.81 0 0 1 -.81-.7v-2.56a2.44 2.44 0 0 1 2.27-2.44z" />
  </svg>
)

export const Order = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={`h-5 w-5 ${props.className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    fill="white"
    class="icon"
    version="1.1"
  >
    <path
      d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z"
      fill=""
    />
  </svg>
)
