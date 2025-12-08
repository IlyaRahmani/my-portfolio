"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/lib/useUser";
import AppButton from "@/components/AppButton";

export default function UserProfile() {
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Load profile
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFullName(data.full_name ?? "");
        setAge(data.age ?? "");
        setBio(data.bio ?? "");
        setAvatarUrl(data.avatar_url ?? null);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  if (!user) {
    return <div className="p-6">Please log in.</div>;
  }

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  // Save profile
  const saveProfile = async () => {
    setSaving(true);

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      age: age === "" ? null : age,
      bio,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
  };

  // Upload avatar
  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;

    await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setAvatarUrl(data.publicUrl);
  };

  // Delete avatar
  const deleteAvatar = async () => {
    if (!avatarUrl) return;

    const path = avatarUrl.split("/avatars/")[1];
    await supabase.storage.from("avatars").remove([path]);
    setAvatarUrl(null);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300" />
        )}

        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && uploadAvatar(e.target.files[0])
            }
          />

          {avatarUrl && (
            <AppButton type="secondary" onClick={deleteAvatar}>
              Remove photo
            </AppButton>
          )}
        </div>
      </div>

      {/* Info */}
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full name"
        className="w-full p-3 border rounded"
      />

      <input
        type="number"
        value={age}
        onChange={(e) =>
          setAge(e.target.value === "" ? "" : Number(e.target.value))
        }
        placeholder="Age"
        className="w-full p-3 border rounded"
      />

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        rows={4}
        className="w-full p-3 border rounded"
      />

      <AppButton type="primary" onClick={saveProfile} disabled={saving}>
        {saving ? "Saving..." : "Save profile"}
      </AppButton>
      
    </div>
  );
}