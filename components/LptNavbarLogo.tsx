import svgPaths from "@/lib/lpt-navbar-logo-paths";

/**
 * Logo navbar identique à Lptsitenew (accueil) : h 40px / 50px sm, ratio 217.18:59.
 */
export function LptNavbarLogo() {
  return (
    <div
      className="h-[40px] sm:h-[50px] relative shrink-0 w-auto"
      style={{ aspectRatio: "217.18/59" }}
    >
      <svg
        className="block h-full w-auto"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 218 59"
        aria-hidden
      >
        <g>
          <path d={svgPaths.pe43880} fill="#FFC000" />
          <path d={svgPaths.p324c1d00} fill="#FFC000" />
          <path d={svgPaths.p385bf880} fill="#FFC000" />
          <path d={svgPaths.p1e502800} fill="black" />
          <path d={svgPaths.p2cd31a00} fill="black" />
          <path d={svgPaths.p3bd72780} fill="black" />
          <path d={svgPaths.p58c6c00} fill="black" />
          <path d={svgPaths.p3bbf5c80} fill="black" />
          <path d={svgPaths.p127a3f00} fill="black" />
          <path d={svgPaths.p1597ff00} fill="black" />
          <path d={svgPaths.p20843800} fill="black" />
          <path d={svgPaths.p19743600} fill="black" />
          <path d={svgPaths.p36f81800} fill="black" />
          <path d={svgPaths.p901e980} fill="black" />
          <path d={svgPaths.p1c672400} fill="black" />
          <path d={svgPaths.p4097f00} fill="black" />
          <path d={svgPaths.p25b5a100} fill="black" />
          <path d={svgPaths.p2894ff00} fill="black" />
        </g>
      </svg>
    </div>
  );
}
