![logo_c](https://github.com/Ali-Doggaz/TP1-test/assets/62618334/d1bc8d53-af70-44e1-8d84-43d9fcb1dbfb)
# TP1 Tests Logiciel 

Réalisé par: Ali Doggaz, Achref Saidi, Mahdi Ghorbel, Tassnim Dakhli
(Ce repo contient uniquement le travail à rendre, les exercices sont sur l'autre repo)

# Documentation du Projet Node

Ce document décrit notre approche pour créer une application Node démontrant les divers aspects des tests unitaires et d'intégration avec Vitest. Nous avons choisis de partir de 0 et de créer notre propre application, afin de gagner en flexibilité et de pouvoir illustrer les méthodologies de test sur la plupart des cas d'utilisation testables et courants dans le développement web moderne (routing, API calls, forms, etc...)

## Structure de l'Application

L'application inclut une page d'accueil, des boutons de navigation, une liste d'utilisateurs (`UserList`), et un formulaire d'enregistrement (`RegistrationForm`). Elle est construite avec React et utilise Vitest pour les tests. Bien que simple, elle permet de tester avec simplicité et avec un code clair, les divers aspects de test communs dans le monde du dev. web, ce qui nous semblait etre le but principal de ce TP.

### Tests de Routage

Les tests de routage vérifient la fonctionnalité de navigation entre les différentes pages de l'application à partir du composant `App`. Nous utilisons `MemoryRouter` pour simuler les interactions de navigation dans un environnement de test, ce qui nous permet de s'assurer que les liens mènent aux bonnes routes sans nécessiter un serveur ou un navigateur.

#### Exemple de Test de Routage
```javascript
it('navigue vers la page des utilisateurs et affiche le contenu', async () => {
    render(<App />, { wrapper: MemoryRouter });
    const usersLink = screen.getByText('Utilisateurs');
    expect(usersLink).toBeInTheDocument();
    await userEvent.click(usersLink);
    expect(screen.getByRole('heading', { name: 'Liste des utilisateurs' })).toBeInTheDocument();
});
```

### Tests de Gestion d'API
Ces tests simulent des scénarios de succès et d'échec des appels API. Nous utilisons des mocks pour simuler les réponses de l'API, permettant de tester le comportement de nos composants en réponse à différentes situations, comme la réception de données ou la gestion d'erreurs.

### Exemple de Test d'Échec d'API (d'autres tests sont presents dans la codebase)
```javascript
it('affiche un message d'erreur lorsque l'appel API échoue', async () => {
    fetch.mockRejectedValue(new Error('Échec de l'appel API'));
    render(<UserList />);
    await waitFor(() => {
        expect(screen.getByText('Erreur: Échec de l'appel API')).toBeInTheDocument();
    });
});
```

### Tests de Formulaire
Nous testons le formulaire d'enregistrement pour s'assurer que les entrées de l'utilisateur sont correctement capturées et que le formulaire réagit comme prévu lors de la soumission. Les tests vérifient également que des messages appropriés sont affichés en réponse à l'action de l'utilisateur.

### Exemple de Test de Formulaire
Nous testons le formulaire d'enregistrement pour s'assurer que les entrées de l'utilisateur sont correctement capturées et que le formulaire réagit comme prévu lors de la soumission. Les tests vérifient également que des messages appropriés sont affichés en réponse à l'action de l'utilisateur.


### Exemple de Test d'Échec d'API (d'autres tests sont presents dans la codebase)
```javascript
it('permet à l'utilisateur de remplir le formulaire et de soumettre les données', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByLabelText('Nom d\'utilisateur:'), { target: { value: 'nouvel_utilisateur' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'utilisateur@example.com' } });
    fireEvent.click(screen.getByText('S\'enregistrer'));
    await waitFor(() => {
        expect(screen.getByText('Inscription réussie!')).toBeInTheDocument();
    });
});

```

### Couverture des Tests
Pour vérifier la couverture des tests sur notre code, nous avons ajouté une commande dans notre configuration NPM:
```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
}
```

Cette commande test:coverage nous permet d'exécuter les tests tout en générant un rapport de couverture, ce qui nous aide à identifier les parties du code qui ne sont pas testées.



