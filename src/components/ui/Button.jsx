export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-amber-500/20',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-zinc-900 shadow-transparent',
    white: 'bg-zinc-100 text-zinc-950 hover:bg-white'
  };

  return (
    <button 
      className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};