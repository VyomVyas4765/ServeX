import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ApiRole, ApiUser, Role, User } from '../types';
import api from '../lib/api';
import { loginRequest } from '../lib/auth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setTokens, setActiveRestaurantId } = useAuthStore();

  const normalizeRole = (role: ApiRole | string): Role => {
    return role.toLowerCase() === 'owner' ? 'OWNER' : 'ADMIN';
  };

  const buildDisplayName = (value: string) => {
    const prefix = value.split('@')[0]?.replace(/[._-]+/g, ' ').trim();
    if (!prefix) return 'User';
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  };

  const getRedirectPath = (role: Role) => {
    return role === 'OWNER' ? '/owner' : '/admin';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const tokens = await loginRequest(email, password);
      setTokens(tokens.access_token, tokens.refresh_token);

      const { data: me } = await api.get<ApiUser>('/api/users/me');
      const normalizedRole = normalizeRole(me.role);
      const user: User = {
        id: me.id,
        restaurant_id: me.restaurant_id,
        email: me.email,
        role: normalizedRole,
        name: buildDisplayName(me.email),
        is_active: me.is_active,
        created_at: me.created_at,
      };

      setUser(user);
      setActiveRestaurantId(me.restaurant_id);
      navigate(getRedirectPath(normalizedRole));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;
        setError(detail || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl rounded-xl overflow-hidden relative">
        <div className="p-8 text-center border-b border-border">
          <div className="flex justify-center mb-6">
            <UtensilsCrossed className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-serif italic text-foreground mb-2">ServeX</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Unified Management Terminal</p>
        </div>

        <div className="p-8 space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground pl-1">Access Email</label>
                <Input 
                  type="email" 
                  placeholder="identity@servex.com" 
                  className="bg-background border-border h-12 text-sm focus-visible:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground pl-1">Secure Key</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-background border-border h-12 text-sm focus-visible:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-[11px] uppercase tracking-[0.2em] font-bold"
            >
              {isLoading ? 'Initializing...' : 'Initialize Session'}
            </Button>
          </form>
          <div className="pt-4 border-t border-border text-center text-[11px] text-muted-foreground">
            New owner?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create your account
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
