# Qui prend quoi - kentoje

## Installation

Clonez le repertoire :
```shell
git clone https://github.com/kentoje/quiprendquoi-bcalou-tp.git
```

Allez dans le dossier du projet :
```shell
cd quiprendquoi-bcalou-tp
```

```RUN``` le script pour installer les dépendances :
```shell
./install.sh
```

```RUN``` la compilation des fichiers ```public``` :
```shell
npm run rebuild
```

Quittez le processus du rebuild en faisant un :
`CTRL-C`

Lancez le projet :
```shell
npm run start
```

Allez à l'adresse :
`http://localhost:3000`

## Améliorations apportées

### Implementation totale de l'API de base :
- `feat(Party): Add PATCH and DELETE of event` - `ce9e5300adc702fcde93388d37a8744743f952fb`
- `feat(Party): Add PATCH action` - `34e6e6f0d2da19a53ff72388626fbe5d497a1c2d`
- `feat(Party): Add DELETE and POST action` - `c34a40c73eb70eac91f0846f75cc34622d638482`
- ...

### Refacto de l'architecture de l'application :
- `refacto(App): Refactor app structure` - `19ad394fcf8504d1e8b1c2cb66b262ca5baca412`
- `refacto(App): Add Middlewares` - `d70d872cd12ba952bdf9e55fc378f2000cd0d125`
- `refacto(App): Refactor async middleware` - `3cdf11c9562165863c05d50c3f1f28f2652d3d0c`

### Ajout d'un design :
- `feat(Style): Add style to pages` - `63505f1c9723d769c703100adbeee5d83fd7316a`

### Refetch des items toutes les 10 secondes :
- `feat(Party): Add refresh items action` - `8c7cd0900a611c398ecada93fc3040566d86b964`

### Ajout d'un système de donation fixé à 4.99€ :
- `feat(Party): Add payment action` - `9a6337a1371376d5ab812d906cc578a2ba8223e5`
- `feat(Style): Add interactions with donate button` - `509e39850ace51393fe2e0e87118762bd9f3bd46`

### Audit à l'épreuve des balles :
À tester sur un navigateur en mode incognito.

[Screenshot](https://imgur.com/a/P4XzseZ)


## Article personnel

### Introduction
En guise d'amélioration du projet `Qui prend quoi`, j'ai décidé de m'attaquer à une partie extrêmement importante de tout site à but lucratif, j'ai nommé les transactions. J'ai alors cherché sur Internet une solution native aux navigateurs permettant de réaliser cette fonctionnalité sans installer de *Third-party*, pour exploiter au maximum les capacités du navigateur. Et c'est ainsi que je suis tombé sur l'API `Payment Request`.
`Payment Request` est tout simplement une API permettant d'afficher directement dans la page une pop-up servant à effectuer ou non une transaction. Elle fonctionne uniquement sur les sites servant un protocole sécurisé (*ie HTTPS*) pour bien évidemment protéger au mieux les données sensibles qui transitent sur ce genre de plateforme. Malheureusement à l'heure actuelle, cette API n'est pas totalement supporté par tous les navigateurs (50% des navigateurs supportent cette fonctionnalité) et c'est probablement la raison pour laquelle nous ne voyons pas souvent cette manière d'effectuer une transaction sur les sites marchands. C'est pourquoi il est impératif si l'on veut utiliser cette solution de prévoir un autre moyen de paiement dans le cas où le navigateur ne supporte pas cette fonctionnalité. En addition à cela, l'API supporte Google Pay et a le luxe de fonctionner également sur certains navigateurs mobile.

### Implémentation
Une basique implémentation de `Payment Request API` est en réalité assez simple. Tout d'abord nous devons vérifier que le navigateur supporte bel et bien la feature. Pour se faire il nous suffit d'utiliser une simple condition :

```javascript
if (window.PaymentRequest) {
  // Alors j'exécute mon code 
} else {
  // Alors je redirige par exemple vers une page supportant un autre outil
  window.location.href = '/checkout/normal';
}
``` 

Dans le cas où tout se passe bien nous pouvons donc passer à l'étape suivante.

L'API apporte avec elle une `class PaymentRequest` qui attend lors de son instanciation trois paramètres dont un optionnel :
- Le premier paramètre permet de gérer les formats de paiement que l'on accepte (Mastercard, Visa...)

```javascript
const creditCardPaymentMethod = {
  supportedMethods: 'basic-card',
};
```
Ici `'basic-card'` permet d'accepter tous les types de carte bancaires les plus courants.


- Le deuxième paramètre gère quand à lui le total demandé, il est possible ici d'y inclure tout un système de taxes pour des calculs plus complexes

```javascript
const paymentDetails = {
  total: {
    label: 'Total',
    amount: {
      currency: 'EUR',
      value: '49.99',
    },
  },
};
```


- Le dernier paramètre peut être omis ou non. Il permet de demander à l'utilisateur lors de la transaction des informations relatives par rapport à lui, par exemple, son nom, son adresse... À utiliser avec précaution pour ne pas brusquer le client !

```javascript
const options = {
    requestPayerName: true,
  };
```

Ici grâce au booléen, on demande le nom de l'utilisateur lors du paiement.


Maintenant que nous savons ce que la `class PaymentRequest` attend, nous pouvons donc l'instancier.

```javascript
new PaymentRequest(
    creditCardPaymentMethod,
    paymentDetails,
    options
  )
```

`PaymentRequest` vient avec une méthode `.show()` qui à la demande, nous permet d'afficher la pop-up après une interaction utilisateur.

```javascript
// Au clique sur l'élément j'appelle la méthode .show()
element.addEventListener('click', _ => {
  paymentRequest.show()
});
```


Cette dernière renvoie alors une `<Promise>` qui à sa résolution nous donne des informations sur la transaction. On peut alors, si tout c'est bien passé, passer le statut de la transaction à `'success'`.

```javascript
element.addEventListener('click', _ => {
  paymentRequest.show()
    .then(paymentResponse => paymentResponse.complete('success'))
    .catch(error => console.log(error.message));
});
```

Done 🎉 ! Et c'est aussi simple que ça !


### Retour sur expérience
J'ai personnellement été agréablement surpris par la facilité d'implementation d'un outil de paiement qui est en soi un processus qui à première vu peut faire peur.
Gros point fort, l'API nous permet de gérer énormément de cas possibles répondant aux problématiques des transactions. Tout cela avec une documentation relativement claire et efficace. J'ai néanmoins rencontré un problème lors de mon implementation personnelle, si l'utilisateur ferme la pop-up, alors il ne peut plus la rouvrir car la méthode `.show()` a déjà été appelé dans le passé (sujet à creuser davantage).

### Conclusion
Finalement, grâce à cette semaine de TP, j'ai appris énormément de choses au sujet des navigateurs (PWA, Service Worker, Cache, Audit, Web APIs). J'ignorais totalement le fait qu'ils puissent implémenter autant de fonctionnalités nativement. Je pense que c'est une excellente nouvelle, cela permettra dans le futur, si la très grande majorité des navigateurs acceptent ces solutions, de réduire d'un niveau la complexité à créer des applications Webs toujours plus simples, puissantes et user friendly. Il me tarde d'expérimenter d'autres APIs Web !

### Source
[Payment Request API](https://developers.google.com/web/fundamentals/payments/merchant-guide/deep-dive-into-payment-request)
