# Architecture proposee - Espace client e-commerce

## 1. Frontend

- Stack recommandee: React + Vite (base actuelle), Tailwind CSS, React Router pour les pages `connexion`, `inscription`, `mot-de-passe-oublie`, `compte`, `mes-commandes`, `fidelite`.
- Etat client: TanStack Query ou equivalent pour recuperer le profil, les commandes, la fidelite et les factures.
- Authentification:
  - Email/mot de passe avec JWT httpOnly cookie ou session serveur.
  - OAuth Google et Apple via un provider comme Auth.js, Clerk, Supabase Auth ou backend maison.
- Pages principales:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/account/dashboard`
  - `/account/orders`
  - `/account/loyalty`

## 2. Backend

- Stack recommandee:
  - Node.js + NestJS ou Express/Fastify
  - API REST ou GraphQL
  - Service PDF facture
  - Worker pour synchroniser les statuts de livraison
- Modules principaux:
  - `auth`
  - `users`
  - `orders`
  - `invoices`
  - `loyalty`
  - `notifications`
- Endpoints minimum:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`
  - `GET /api/customer/me`
  - `GET /api/customer/orders`
  - `GET /api/customer/orders/:id`
  - `GET /api/customer/invoices/:orderId/download`
  - `GET /api/customer/loyalty`
  - `GET /api/customer/loyalty/history`

## 3. Base de donnees

- Base conseillee: PostgreSQL
- Tables de base:
  - `users`
  - `password_reset_tokens`
  - `orders`
  - `order_items`
  - `invoices`
  - `loyalty_accounts`
  - `loyalty_transactions`
- Les adresses sont stockees en `JSONB` pour garder de la souplesse au depart.
- Les statuts de commande sont normalises via un `CHECK`.

## 4. Regle de fidelite proposee

- Attribution:
  - `1 EUR depense = 1 point`
- Recompense:
  - `100 points = coupon de 10 EUR`
- Bonnes pratiques:
  - Crediter les points seulement sur commande payee.
  - Passer les points en statut definitif une fois la commande non annulee.
  - Debiter les points uniquement a la consommation reelle du coupon.

## 5. Etapes de developpement

1. Mettre en place la base PostgreSQL et les migrations.
2. Construire le module `auth` avec inscription, connexion, reset mot de passe et verification email.
3. Ajouter les providers Google et Apple.
4. Construire les endpoints `customer/me`, `orders`, `loyalty`, `invoices`.
5. Integrer la generation de facture PDF et le stockage des fichiers.
6. Brancher le frontend React sur l'API avec gestion de session.
7. Ajouter les webhooks ou cron jobs pour mettre a jour les statuts de livraison.
8. Ajouter les emails transactionnels: bienvenue, reset password, expedition, livraison.
9. Ajouter les tests E2E pour auth, commandes, fidelite et factures.
