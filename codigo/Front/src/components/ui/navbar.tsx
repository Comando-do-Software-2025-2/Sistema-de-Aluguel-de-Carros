import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Car, Users, FileText, Home, ScrollText } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Início',
      icon: Home,
    },
    {
      path: '/clientes',
      label: 'Clientes',
      icon: Users,
    },
    {
      path: '/veiculos',
      label: 'Veículos',
      icon: Car,
    },
    {
      path: '/alugueis',
      label: 'Aluguéis',
      icon: FileText,
    },
    {
      path: '/contratos',
      label: 'Contratos',
      icon: ScrollText,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Sistema de Locadora
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive 
                        ? "text-primary border-b-2 border-primary pb-2" 
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;