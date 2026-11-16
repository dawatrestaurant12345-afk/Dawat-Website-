-- Restores the original photo for "Veg. Dawat Special Soup".
-- A logo image (not food) was uploaded for this dish in the admin panel.
-- Run once: Supabase Dashboard → SQL Editor → New query → paste → Run.

update public.menu_items
set image = '/images/menu/veg-dawat-special-soup.jpg'
where name = 'Veg. Dawat Special Soup';
