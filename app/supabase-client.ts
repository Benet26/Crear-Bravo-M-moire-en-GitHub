type Session = { access_token: string; user: { id: string; email?: string } };

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const configured = Boolean(url && key);
const headers = (token?: string) => ({ apikey: key || "", ...(token ? { Authorization: `Bearer ${token}` } : {}) });

export type CloudSession = Session;
export const supabaseConfigured = configured;

export function readSession(): Session | null {
  if (!configured || typeof window === "undefined") return null;
  const token = new URLSearchParams(window.location.hash.slice(1)).get("access_token");
  if (token) { window.history.replaceState({}, "", window.location.pathname); localStorage.setItem("bravo-supabase-token", token); }
  const saved = localStorage.getItem("bravo-supabase-token");
  return saved ? { access_token: saved, user: { id: "" } } : null;
}

export async function identify(session: Session): Promise<Session | null> {
  if (!configured || !session.access_token) return null;
  const response = await fetch(`${url}/auth/v1/user`, { headers: headers(session.access_token) });
  if (!response.ok) { localStorage.removeItem("bravo-supabase-token"); return null; }
  const user = await response.json() as Session["user"];
  return { ...session, user };
}

export async function sendMagicLink(email: string) {
  if (!configured) throw new Error("Supabase no estÃ¡ configurado");
  const response = await fetch(`${url}/auth/v1/otp`, { method: "POST", headers: { ...headers(), "Content-Type": "application/json" }, body: JSON.stringify({ email, create_user: true, email_redirect_to: window.location.origin }) });
  if (!response.ok) throw new Error("No se pudo enviar el enlace");
}

export async function loadCloudState(session: Session) {
  const response = await fetch(`${url}/rest/v1/learning_state?select=payload&user_id=eq.${session.user.id}`, { headers: headers(session.access_token) });
  if (!response.ok) throw new Error("No se pudo leer el progreso");
  const rows = await response.json() as { payload: Record<string, string> }[];
  return rows[0]?.payload || null;
}

export async function saveCloudState(session: Session, payload: Record<string, string>) {
  const response = await fetch(`${url}/rest/v1/learning_state?on_conflict=user_id`, { method: "POST", headers: { ...headers(session.access_token), "Content-Type": "application/json", Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ user_id: session.user.id, payload, updated_at: new Date().toISOString() }) });
  if (!response.ok) throw new Error("No se pudo guardar el progreso");
}

