"import { useState } from \"react\";
import { Link, useNavigate } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import { useAuth } from \"@/context/AuthContext\";
import { toast } from \"sonner\";
import { Lock } from \"lucide-react\";

export default function AdminLogin() {
  const [creds, setCreds] = useState({ username: \"\", password: \"\" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post(\"/auth/login\", creds);
      login(r.data.token);
      toast.success(\"Welcome back, admin\");
      navigate(\"/admin\");
    } catch (err) {
      toast.error(\"Invalid credentials\");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=\"min-h-screen flex bg-brand-jet text-white\">
      <div className=\"hidden lg:flex flex-1 relative overflow-hidden\">
        <img
          src=\"https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?crop=entropy&cs=srgb&fm=jpg&q=85\"
          alt=\"Industrial\"
          className=\"absolute inset-0 h-full w-full object-cover opacity-40\"
        />
        <div className=\"absolute inset-0 bg-gradient-to-br from-brand-jet via-brand-jet/90 to-transparent\" />
        <div className=\"relative p-16 flex flex-col justify-between\">
          <Link to=\"/\" data-testid=\"admin-back-home\" className=\"label-tech text-brand-orange\">← Diamond Chem India</Link>
          <div>
            <div className=\"label-tech text-brand-orange mb-3\">Internal Access</div>
            <h1 className=\"font-heading text-5xl font-black uppercase leading-[1.05]\">
              Order Control<br />Room
            </h1>
            <p className=\"mt-6 text-white/60 max-w-md\">Manage incoming dealer orders, dispatch status and inventory pipeline from a single dashboard.</p>
          </div>
          <div className=\"label-tech text-white/40\">Restricted · Authorised personnel only</div>
        </div>
      </div>

      <div className=\"flex-1 flex items-center justify-center p-6 lg:p-12 bg-white text-brand-jet\">
        <div className=\"w-full max-w-md\">
          <div className=\"flex items-center gap-2 mb-8 lg:hidden\">
            <Link to=\"/\" className=\"label-tech text-brand-orange\">← Back</Link>
          </div>

          <div className=\"inline-flex items-center justify-center h-12 w-12 bg-brand-jet rounded-sm mb-6\">
            <Lock className=\"h-5 w-5 text-brand-orange\" />
          </div>
          <h2 className=\"font-heading text-3xl md:text-4xl font-black uppercase\">Admin Login</h2>
          <p className=\"text-muted-foreground mt-2 text-sm\">Sign in to manage dealer orders.</p>

          <form onSubmit={submit} className=\"mt-8 space-y-5\">
            <div>
              <label className=\"label-tech text-muted-foreground mb-2 block\">Username</label>
              <input
                data-testid=\"admin-username-input\"
                required
                value={creds.username}
                onChange={(e) => setCreds({ ...creds, username: e.target.value })}
                placeholder=\"admin\"
                className=\"w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet\"
              />
            </div>
            <div>
              <label className=\"label-tech text-muted-foreground mb-2 block\">Password</label>
              <input
                data-testid=\"admin-password-input\"
                required
                type=\"password\"
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                placeholder=\"••••••••\"
                className=\"w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet\"
              />
            </div>
            <button
              type=\"submit\"
              disabled={loading}
              data-testid=\"admin-login-btn\"
              className=\"w-full bg-brand-orange text-white py-3.5 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-orangeDark transition-all disabled:opacity-50\"
            >
              {loading ? \"Signing in...\" : \"Sign In\"}
            </button>
          </form>

          <div className=\"mt-8 border border-dashed border-border rounded-sm p-4 bg-secondary\">
            <div className=\"label-tech text-muted-foreground\">Demo Credentials</div>
            <div className=\"text-sm mt-1\">Username: <code className=\"font-mono font-semibold\">admin</code></div>
            <div className=\"text-sm\">Password: <code className=\"font-mono font-semibold\">admin123</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
"