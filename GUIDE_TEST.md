# Guide de test - Saisie des résultats mobile

## ✅ Checklist de test

### 1. Affichage initial

- [ ] Les 4 épreuves s'affichent en grille (1 colonne sur mobile)
- [ ] Les emojis sont bien visibles : ⚡ 🏃 🦘 🎯
- [ ] Les informations s'affichent : nom, unité, nombre de résultats
- [ ] Les cartes sans barème affichent l'avertissement

### 2. Navigation mobile (< 640px)

- [ ] Les cartes s'affichent sur 1 colonne
- [ ] Les cartes sont cliquables (doigt)
- [ ] Cliquer sur une carte affiche la vue de saisie
- [ ] Le bouton "Retour" ramène à la sélection d'épreuves
- [ ] Les espaces de clic sont confortables (pas besoin de viser précisément)

### 3. Navigation tablette (640px - 1024px)

- [ ] Les cartes s'affichent sur 2 colonnes
- [ ] La mise en page est équilibrée
- [ ] Le comportement au clic est identique

### 4. Navigation desktop (≥ 1024px)

- [ ] Les cartes s'affichent sur 4 colonnes
- [ ] Tous les éléments sont visibles sans scroll horizontal
- [ ] Le design est proportionné

### 5. Saisie de résultats

- [ ] Le bouton "Ajouter un résultat" ajoute une nouvelle carte
- [ ] La liste des participants est remplie correctement
- [ ] Les participants déjà saisis n'apparaissent pas dans la liste
- [ ] Le champ "Performance" accepte les nombres décimaux
- [ ] Les points se calculent automatiquement en temps réel
- [ ] Le bouton "Valider" est désactivé si :
  - [ ] Aucun participant n'est sélectionné
  - [ ] La performance est à 0

### 6. Actions

- [ ] "Valider" sauvegarde le résultat
- [ ] "Supprimer" retire le résultat de la liste
- [ ] Les boutons sont désactivés pendant le chargement
- [ ] Les messages d'erreur s'affichent correctement

### 7. Validation des données

- [ ] Le système empêche les doublons (même participant + même épreuve)
- [ ] La performance ne peut pas être nulle
- [ ] Le participant ne peut pas être vide
- [ ] Les points sont correctement calculés selon le barème

### 8. Responsive CSS

**Mobile:**

- [ ] Padding `20px` pour confort tactile
- [ ] Buttons empilés verticalement (`.result-card-actions`)
- [ ] Inputs pleine largeur
- [ ] Texte lisible (taille minimum 14px)

**Tablette (640px+):**

- [ ] Grille 2 colonnes pour les épreuves
- [ ] Buttons côte à côte
- [ ] Meilleur spacing

**Desktop (1024px+):**

- [ ] Grille 4 colonnes pour les épreuves
- [ ] Max-width `1200px`

### 9. Accessibilité

- [ ] Les cartes sont navigables au clavier (Tab)
- [ ] Entrée/Espace activent les cartes
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Les inputs ont des labels associés
- [ ] Contraste suffisant (WCAG AA minimum)

### 10. Mode sombre

- [ ] Les couleurs s'adaptent (si `prefers-color-scheme: dark`)
- [ ] Le contraste reste acceptable
- [ ] Les emojis restent visibles

### 11. États désactivés

- [ ] Les cartes d'épreuves sans barème :
  - [ ] Ont une opacité réduite (0.6)
  - [ ] Ne sont pas cliquables
  - [ ] Affichent un curseur "not-allowed"

- [ ] Le bouton "Ajouter un résultat" est désactivé si :
  - [ ] Aucun barème défini
  - [ ] Aucun participant disponible
  - [ ] Chargement en cours

### 12. Intégration

- [ ] Les données sauvegardées restent après rechargement
- [ ] Le contexte `CompetitionContext` se met à jour
- [ ] Les résultats antérieurs restent visibles

---

## 🧪 Scénarios de test

### Scénario 1 : Saisie simple

1. Ouvrir l'app
2. Cliquer sur "Vitesse"
3. Cliquer "Ajouter un résultat"
4. Sélectionner un participant
5. Entrer une performance (ex: 12.34)
6. Vérifier que les points s'affichent
7. Cliquer "Valider"
8. Revenir à la sélection

**Résultat attendu** : Le résultat est sauvegardé et visible dans la liste

### Scénario 2 : Mobile en portrait

1. Accéder sur un téléphone (ou en responsive design)
2. Vérifier que :
   - Les cartes utilisent toute la largeur
   - Les inputs sont confortables à remplir
   - Les buttons ne s'enfoncent pas les uns sur les autres
   - Aucun scroll horizontal n'est nécessaire

### Scénario 3 : Mode déconnecté

1. Ouvrir les DevTools (F12)
2. Aller à Network, sélectionner "Offline"
3. Tenter une sauvegarde
4. Vérifier que l'erreur s'affiche correctement
5. Remettre en ligne et réessayer

### Scénario 4 : Navigateur ancien

1. Tester sur Firefox (< version 60)
2. Vérifier que :
   - Les bordures arrondies fonctionnent
   - Les shadows s'affichent
   - Les transitions sont fluides
   - Les CSS Grid se dégradent correctement

### Scénario 5 : Stress test

1. Ajouter 20+ résultats
2. Vérifier que la performance reste acceptable
3. Vérifier que le scroll fonctionne bien
4. Vérifier que le calcul des points reste rapide

---

## 🐛 Rapports de bug

Si un test échoue, vérifier :

1. **Éléments manquants** :
   - Les imports dans le fichier
   - Les types TypeScript
   - Les fichiers CSS

2. **CSS non appliquées** :
   - Vérifier dans DevTools qu'aucun CSS plus spécifique n'écrase
   - Vérifier que les classes sont présentes dans le HTML

3. **Logique défaillante** :
   - Vérifier les états React
   - Vérifier les appels async
   - Vérifier les validations

4. **Responsive non fonctionnel** :
   - Vérifier le viewport dans DevTools
   - Vérifier que les media queries se déclenchent
   - Tester sur de vrais appareils

---

## 📊 Outils de test

```bash
# Test d'accessibilité
npm install -D @axe-core/react

# Test de responsive
npm install -D jest-axe

# Test de performance
npm install -D lighthouse
```

## 🎥 Enregistrement des tests

Utiliser :

- Chrome DevTools (Elements, Responsive Design Mode)
- Lighthouse (F12 → Lighthouse)
- axe DevTools (extension Chrome)

## ✨ Checklist avant production

- [ ] Tous les tests passent
- [ ] Pas d'erreurs en console
- [ ] Responsive OK sur mobile/tablette/desktop
- [ ] Accessibilité OK (tab, focus, contrast)
- [ ] Mode sombre OK
- [ ] Pas de fuite mémoire
- [ ] Performance acceptable (< 3s chargement)
- [ ] SEO considéré (si applicable)
