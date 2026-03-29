const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-[#4fb7dd] px-5 py-3 text-black ${containerClass}`}
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
