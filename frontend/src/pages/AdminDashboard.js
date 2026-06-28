"import { useEffect, useState } from \"react\";
import { useNavigate, Link } from \"react-router-dom\";
import { api } from \"@/lib/api\";
import { useAuth } from \"@/context/AuthContext\";
import { toast } from \"sonner\";
import { Search, Trash2, LogOut, Package, TrendingUp, Clock, CheckCircle2 } from \"lucide-react\";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from \"@/components/ui/select\";

const STATUS_COLORS = {
  Pending: \"bg-amber-100 text-amber-800 border-amber-300\",
  Packed: \"bg-blue-100 text-blue-800 border-blue-300\",
  Dispatched: \"bg-purple-100 text-purple-800 border-purple-300\",
  Delivered: \"bg-green-100 text-green-800 border-green-300\",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState(\"\");
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    try {
      const [o, s] = await Promise.all([api.get(\"/orders\"), api.get(\"/admin/stats\")]);
      setOrders(o.data);
      setStats(s.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate(\"/admin/login\");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      toast.success(`Order updated to ${status}`);
      load();
    } catch {
      toast.error(\"Update failed\");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm(\"Delete this order? This cannot be undone.\")) return;
    try {
      await api.delete(`/orders/${id}`);
      toast.success(\"Order deleted\");
      load();
    } catch {
      toast.error(\"Delete failed\");
    }
  };

  const filtered = orders.filter((o) =>
    o.dealer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=\"min-h-screen bg-secondary\">
      {/* TOPBAR */}
      <header className=\"border-b border-border bg-white\">
        <div className=\"container mx-auto px-4 md:px-8 h-16 flex items-center justify-between\">
          <div className=\"flex items-center gap-3\">
            <Link to=\"/\" className=\"flex items-center gap-2\">
              <div className=\"flex h-9 w-9 items-center justify-center rounded-sm bg-brand-jet\">
                <span className=\"font-heading text-lg font-black text-brand-orange\">D</span>
              </div>
              <div>
                <div className=\"font-heading text-base font-bold leading-none\">DIAMOND CHEM</div>
                <div className=\"label-tech text-[10px] text-muted-foreground mt-0.5\">Admin Console</div>
              </div>
            </Link>
          </div>
          <button
            data-testid=\"admin-logout-btn\"
            onClick={() => {
              logout();
              navigate(\"/admin/login\");
            }}
            className=\"inline-flex items-center gap-2 text-sm border border-border px-3 py-2 rounded-sm hover:border-brand-jet\"
          >
            <LogOut className=\"h-4 w-4\" /> Logout
          </button>
        </div>
      </header>

      <main className=\"container mx-auto px-4 md:px-8 py-10\">
        <div className=\"mb-8\">
          <div className=\"label-tech text-brand-orange mb-1\">Operations</div>
          <h1 className=\"font-heading text-3xl md:text-5xl font-black uppercase\">Orders Dashboard</h1>
        </div>

        {/* STATS */}
        {stats && (
          <div className=\"grid gap-4 grid-cols-2 lg:grid-cols-4 mb-10\" data-testid=\"stats-grid\">
            <StatCard icon={Package} label=\"Total Orders\" value={stats.total_orders} tone=\"jet\" testId=\"stat-total-orders\" />
            <StatCard icon={TrendingUp} label=\"Total Quantity\" value={stats.total_quantity} tone=\"orange\" testId=\"stat-total-quantity\" />
            <StatCard icon={Clock} label=\"Pending\" value={stats.pending_orders} tone=\"amber\" testId=\"stat-pending\" />
            <StatCard icon={CheckCircle2} label=\"Delivered\" value={stats.delivered_orders} tone=\"green\" testId=\"stat-delivered\" />
          </div>
        )}

        {/* SEARCH */}
        <div className=\"flex items-center justify-between mb-5 flex-wrap gap-3\">
          <h2 className=\"font-heading text-xl font-bold\">All Orders ({filtered.length})</h2>
          <div className=\"relative\">
            <Search className=\"absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground\" />
            <input
              data-testid=\"admin-search-input\"
              type=\"text\"
              placeholder=\"Search dealer name...\"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=\"rounded-sm border border-border pl-10 pr-4 py-2.5 text-sm w-full sm:w-80 focus:outline-none focus:border-brand-jet bg-white\"
            />
          </div>
        </div>

        {/* ORDERS */}
        {loading ? (
          <div className=\"text-center py-20 text-muted-foreground\">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className=\"border border-dashed border-border rounded-sm py-20 text-center text-muted-foreground bg-white\">
            No orders yet. Place an order from the storefront to see it here.
          </div>
        ) : (
          <div className=\"space-y-4\">
            {filtered.map((o) => (
              <article
                key={o.id}
                data-testid={`order-card-${o.id}`}
                className=\"border border-border bg-white rounded-sm p-5 grid lg:grid-cols-12 gap-4 hover:border-brand-jet transition-colors\"
              >
                <div className=\"lg:col-span-3\">
                  <div className=\"label-tech text-muted-foreground\">Dealer</div>
                  <div className=\"font-heading font-bold text-lg mt-0.5\">{o.dealer_name}</div>
                  <div className=\"text-sm text-muted-foreground mt-1\">{o.phone}</div>
                  <div className=\"text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3\">{o.address}</div>
                </div>

                <div className=\"lg:col-span-4\">
                  <div className=\"label-tech text-muted-foreground mb-1\">Products ({o.products.length})</div>
                  <ul className=\"space-y-1 text-sm\">
                    {o.products.map((p, idx) => (
                      <li key={idx} className=\"flex justify-between gap-2\">
                        <span className=\"truncate\">{p.product_name} · {p.variant_size}</span>
                        <span className=\"font-semibold whitespace-nowrap\">×{p.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className=\"lg:col-span-2\">
                  <div className=\"label-tech text-muted-foreground\">Total</div>
                  <div className=\"font-heading text-2xl font-bold mt-0.5\">₹{o.total_amount.toLocaleString()}</div>
                  <div className=\"label-tech text-muted-foreground mt-2\">{o.total_quantity} items</div>
                  <div className=\"label-tech text-muted-foreground mt-2\">{new Date(o.date).toLocaleDateString()}</div>
                </div>

                <div className=\"lg:col-span-3 flex flex-col gap-2\">
                  <div className={`label-tech border rounded-sm px-3 py-1.5 text-center ${STATUS_COLORS[o.status]}`}>
                    {o.status}
                  </div>
                  <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                    <SelectTrigger data-testid={`status-select-${o.id}`} className=\"rounded-sm\">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=\"Pending\">Pending</SelectItem>
                      <SelectItem value=\"Packed\">Packed</SelectItem>
                      <SelectItem value=\"Dispatched\">Dispatched</SelectItem>
                      <SelectItem value=\"Delivered\">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    data-testid={`delete-order-${o.id}`}
                    onClick={() => deleteOrder(o.id)}
                    className=\"inline-flex items-center justify-center gap-2 text-sm border border-destructive/40 text-destructive py-2 rounded-sm hover:bg-destructive hover:text-white transition-all\"
                  >
                    <Trash2 className=\"h-3.5 w-3.5\" /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone, testId }) {
  const tones = {
    jet: \"bg-brand-jet text-white\",
    orange: \"bg-brand-orange text-white\",
    amber: \"bg-amber-500 text-white\",
    green: \"bg-green-600 text-white\",
  };
  return (
    <div className=\"border border-border bg-white rounded-sm p-5 flex items-center gap-4\" data-testid={testId}>
      <div className={`h-12 w-12 rounded-sm flex items-center justify-center ${tones[tone]}`}>
        <Icon className=\"h-5 w-5\" />
      </div>
      <div>
        <div className=\"label-tech text-muted-foreground\">{label}</div>
        <div className=\"font-heading text-3xl font-black\">{value}</div>
      </div>
    </div>
  );
}
"