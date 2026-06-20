-- ComparaCasa: optional per-house cover image (Supabase Storage)
-- Adds a nullable pointer on `houses` to a stored image and a private Storage
-- bucket whose objects are namespaced per user so each user only accesses their
-- own files. The feature is additive: houses with `cover_image_path = null`
-- behave exactly as before.

-- ---------------------------------------------------------------------------
-- houses.cover_image_path: path of the cover object inside the `house-covers`
-- bucket (e.g. "<user_id>/<house_id>"). NULL means "no cover image".
-- ---------------------------------------------------------------------------
alter table public.houses
  add column if not exists cover_image_path text;

-- ---------------------------------------------------------------------------
-- Private Storage bucket for house cover images.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('house-covers', 'house-covers', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Storage RLS: each user only accesses objects under their own folder.
-- Files are stored as "<user_id>/<house_id>", so the first path segment must
-- match the authenticated user's id. Mirrors the "Users manage own X" policy
-- style used for the application tables.
-- ---------------------------------------------------------------------------
create policy "Users read own house covers"
  on storage.objects for select
  using (
    bucket_id = 'house-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users insert own house covers"
  on storage.objects for insert
  with check (
    bucket_id = 'house-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users update own house covers"
  on storage.objects for update
  using (
    bucket_id = 'house-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'house-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users delete own house covers"
  on storage.objects for delete
  using (
    bucket_id = 'house-covers'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
