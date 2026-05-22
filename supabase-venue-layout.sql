create unique index if not exists venue_tables_table_number_idx
  on public.venue_tables (table_number);

insert into public.venue_tables
  (table_number, zone, capacity, is_vip, map_left, map_top, is_active)
values
  ('1', 'Sank', 2, false, '14%', '14%', true), ('2', 'Sank', 2, false, '14%', '23%', true),
  ('3', 'Sank', 2, false, '14%', '32%', true), ('4', 'Sank', 2, false, '14%', '41%', true),
  ('5', 'Sank', 2, false, '25%', '48%', true), ('6', 'Sank', 2, false, '34%', '48%', true),
  ('7', 'Sank', 2, false, '43%', '48%', true), ('8', 'Sank', 2, false, '52%', '48%', true),
  ('9', 'Sank', 2, false, '61%', '48%', true), ('10', 'Sank', 2, false, '70%', '48%', true),
  ('11', 'Donji deo', 4, false, '25%', '88%', true), ('12', 'Donji deo', 4, false, '35%', '88%', true),
  ('13', 'Donji deo', 4, false, '45%', '88%', true), ('14', 'Donji deo', 4, false, '55%', '88%', true),
  ('15', 'Sprat', 4, false, '68%', '84%', true), ('16', 'Sprat', 4, false, '42%', '84%', true),
  ('17', 'Sprat', 4, false, '10%', '84%', true), ('18', 'Sprat', 4, false, '11%', '53%', true),
  ('19', 'Sprat', 4, false, '35%', '10%', true), ('20', 'Sprat', 4, false, '46%', '10%', true),
  ('21', 'Sprat', 4, false, '58%', '10%', true), ('22', 'Sprat', 4, false, '70%', '10%', true),
  ('23', 'Sprat', 4, false, '82%', '10%', true), ('24', 'Sprat', 4, false, '88%', '37%', true),
  ('25', 'Sprat', 4, false, '88%', '54%', true), ('26', 'Sprat', 4, false, '88%', '70%', true)
on conflict (table_number) do update set
  zone = excluded.zone,
  capacity = excluded.capacity,
  is_vip = excluded.is_vip,
  map_left = excluded.map_left,
  map_top = excluded.map_top,
  is_active = excluded.is_active;
