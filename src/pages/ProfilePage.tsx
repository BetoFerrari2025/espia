import { useState, useEffect, useRef } from "react";
import { User, Camera, Save, ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setDisplayName(data.display_name || "");
        setAvatarUrl(data.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Arquivo inválido", description: "Selecione uma imagem.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "O tamanho máximo é 2MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Erro no upload", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const urlWithCacheBust = `${publicUrl}?t=${Date.now()}`;
    setAvatarUrl(urlWithCacheBust);

    // Save avatar URL to profile immediately
    await supabase.from("profiles").update({ avatar_url: urlWithCacheBust }).eq("user_id", user.id);

    toast({ title: "Avatar atualizado!", description: "Sua foto foi salva com sucesso." });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, avatar_url: avatarUrl })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas com sucesso." });
    }
    setSaving(false);
  };

  const initials = displayName
    ? displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card gap-3">
            <SidebarTrigger className="mr-2" />
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1.5 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Button>
            <h1 className="font-display font-semibold text-foreground">Meu Perfil</h1>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <div className="max-w-lg mx-auto space-y-6">
              {/* Avatar Card */}
              <Card>
                <CardHeader className="items-center text-center">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Avatar className="w-24 h-24 mb-3 ring-4 ring-primary/20">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={displayName} />
                      ) : null}
                      <AvatarFallback className="text-2xl font-display font-bold bg-primary/10 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 mb-3 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Camera className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                    />
                  </div>
                  <CardTitle className="text-xl">{displayName || "Usuário"}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-1">Clique na foto para alterar</p>
                </CardHeader>
              </Card>

              {/* Edit Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Informações do Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nome de exibição</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Seu nome"
                      className="bg-secondary border-border"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input value={user?.email || ""} disabled className="bg-muted border-border opacity-60" />
                    <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado.</p>
                  </div>
                  <Button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="w-full gradient-gold text-primary-foreground font-semibold hover:opacity-90 gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
