const Button = ({ title, id, rightIcon, leftIcon, containerClass, onClick }) => {
  /* Heat bloom follows the cursor: expose its position as CSS vars
     consumed by .btn-heat::after in index.css */
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--heat-x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--heat-y", `${e.clientY - r.top}px`);
  };

  return (
    <button
      id={id}
      onClick={onClick}
      onMouseMove={handleMove}
      className={`btn-heat group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-[#e8a33d] px-5 py-3 text-black ${containerClass}`}
    >
      {leftIcon && <span className="relative z-10">{leftIcon}</span>}
      <span className="relative z-10 inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon && <span className="relative z-10">{rightIcon}</span>}
    </button>
  );
};

export default Button;
