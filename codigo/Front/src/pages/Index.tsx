import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Car, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Sistema de Locadora
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gerencie clientes, veículos e locações de forma simples e eficiente
          </p>
        </div>

        {/* Cards de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link to="/clientes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/50 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Cadastro e gerenciamento de clientes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/veiculos">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/50 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Veículos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Cadastro e gerenciamento de veículos
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/alugueis">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/50 hover:border-primary/50">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Alugueis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Gerenciamento de pedidos de aluguel
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border/50 hover:border-primary/50 opacity-60">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-muted-foreground">Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Em desenvolvimento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Principais */}
        <div className="text-center">
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Bem-vindo ao Sistema de Locadora
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Sistema completo para controlar todas as operações da sua locadora de veículos.
              Gerencie clientes, veículos e alugueis de forma integrada.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/clientes">
                <Button size="lg" className="text-lg px-8">
                  <Users className="mr-2 h-5 w-5" />
                  Gerenciar Clientes
                </Button>
              </Link>
              <Link to="/veiculos">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Car className="mr-2 h-5 w-5" />
                  Gerenciar Veículos
                </Button>
              </Link>
              <Link to="/alugueis">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <FileText className="mr-2 h-5 w-5" />
                  Gerenciar Alugueis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
