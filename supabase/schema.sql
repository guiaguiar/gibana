-- Rode este SQL no SQL Editor do Supabase (Project > SQL Editor > New query)

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- Itens do portfólio (galeria de obras)
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('oleo', 'guache')),
  image_url text not null,
  description text,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- Produtos avulsos (loja: print, pintura, adesivo)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null check (category in ('print', 'pintura', 'adesivo')),
  price_cents integer not null,
  image_url text not null,
  stripe_price_id text,
  stock integer,
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Índices úteis
create index if not exists idx_portfolio_items_category on portfolio_items(category);
create index if not exists idx_products_category on products(category);

-- Row Level Security: leitura pública só de itens visíveis;
-- escrita só pelo backend (service role key), nunca pelo navegador.
alter table portfolio_items enable row level security;
alter table products enable row level security;

create policy "Leitura pública de itens visíveis do portfólio"
  on portfolio_items for select
  using (visible = true);

create policy "Leitura pública de produtos visíveis"
  on products for select
  using (visible = true);

-- Bucket de storage para as imagens (crie manualmente em Storage > New bucket
-- com o nome "gibana-media" e marque como público, ou rode:)
insert into storage.buckets (id, name, public)
values ('gibana-media', 'gibana-media', true)
on conflict (id) do nothing;

create policy "Leitura pública do bucket gibana-media"
  on storage.objects for select
  using (bucket_id = 'gibana-media');
