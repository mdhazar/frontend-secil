export const DragDropIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        fillRule="nonzero"
        d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
      ></path>
    </g>
  </svg>
);

export const TrashCanIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export const FilterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
    />
  </svg>
);

export const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const Grid2x2Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" stroke="currentColor" fill="none" />
    <rect x="9" y="1" width="6" height="6" stroke="currentColor" fill="none" />
    <rect x="1" y="9" width="6" height="6" stroke="currentColor" fill="none" />
    <rect x="9" y="9" width="6" height="6" stroke="currentColor" fill="none" />
  </svg>
);

export const Grid3x2Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="4" height="6" stroke="currentColor" fill="none" />
    <rect x="6" y="1" width="4" height="6" stroke="currentColor" fill="none" />
    <rect x="11" y="1" width="4" height="6" stroke="currentColor" fill="none" />
    <rect x="1" y="9" width="4" height="6" stroke="currentColor" fill="none" />
    <rect x="6" y="9" width="4" height="6" stroke="currentColor" fill="none" />
    <rect x="11" y="9" width="4" height="6" stroke="currentColor" fill="none" />
  </svg>
);

export const Grid4x4Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="5" y="1" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="9" y="1" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="13" y="1" width="2" height="3" stroke="currentColor" fill="none" />
    <rect x="1" y="5" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="5" y="5" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="9" y="5" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="13" y="5" width="2" height="3" stroke="currentColor" fill="none" />
    <rect x="1" y="9" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="5" y="9" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="9" y="9" width="3" height="3" stroke="currentColor" fill="none" />
    <rect x="13" y="9" width="2" height="3" stroke="currentColor" fill="none" />
    <rect x="1" y="13" width="3" height="2" stroke="currentColor" fill="none" />
    <rect x="5" y="13" width="3" height="2" stroke="currentColor" fill="none" />
    <rect x="9" y="13" width="3" height="2" stroke="currentColor" fill="none" />
    <rect
      x="13"
      y="13"
      width="2"
      height="2"
      stroke="currentColor"
      fill="none"
    />
  </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 8v8m-4-4h8"></path>
  </svg>
);

export const ImagePlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <path d="M21 15l-5-5L5 21"></path>
  </svg>
);
