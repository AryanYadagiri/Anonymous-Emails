// import { useEffect, useState } from "react";

// const Lab = () => {
//   const heartSquares = document.getElementsByClassName("heart-square");

//   for (let i = 0; i < heartSquares.length; i++) {
//     const heartSquare = heartSquares[i];

//     heartSquare.addEventListener("animationend", (_event) => {
//       heartSquare.classList.remove("animated");
//     });

//     heartSquare.addEventListener("mouseover", (_event) => {
//       heartSquare.classList.add("animated");
//     });
//   }

//   return (
//     <div className="lovely-wrapper">
//       <svg
//         className="lovely-heart"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 198 162"
//       >
//         <g>
//           <polygon
//             className="background-heart"
//             points="180 18 180 0 162 0 144 0 126 0 126 18 108 18 108 36 90 36 90 18 72 18 72 0 54 0 36 0 18 0 18 18 0 18 0 36 0 54 0 72 18 72 18 90 36 90 36 108 54 108 54 126 72 126 72 144 90 144 90 162 108 162 108 144 126 144 126 126 144 126 144 108 162 108 162 90 180 90 180 72 198 72 198 54 198 36 198 18 180 18"
//           />
//         </g>
//         <g>
//           <rect
//             className="heart-square primary"
//             x="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="18"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="36"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="54"
//             y="108"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="72"
//             y="126"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="90"
//             y="144"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="90"
//             y="126"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="108"
//             y="126"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="72"
//             y="108"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="90"
//             y="108"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="108"
//             y="108"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="126"
//             y="108"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="54"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="72"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="90"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="108"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="126"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="144"
//             y="90"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="36"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="54"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="72"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="90"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="108"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="126"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="144"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="162"
//             y="72"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="18"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="36"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="54"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="72"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="90"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="108"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="126"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="144"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="162"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="180"
//             y="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="18"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="36"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="54"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="72"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="90"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="108"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square tertiary"
//             x="126"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="144"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="162"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="180"
//             y="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="18"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="36"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="54"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="72"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="108"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="126"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square secondary"
//             x="144"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="162"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="180"
//             y="18"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="36"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="54"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="126"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="144"
//             width="18"
//             height="18"
//           />
//           <rect
//             className="heart-square primary"
//             x="162"
//             width="18"
//             height="18"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default Lab;
