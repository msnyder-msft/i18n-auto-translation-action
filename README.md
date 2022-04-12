# i18n-auto-translation-action

This action uses the i18n-auto-translation package to do auto translation using various translation APIs

## Inputs

## provider: 'azure-official'

**Required** The provider to use

options:

- google-official
- azure-official
- azure-rapid
- deep-rapid
- just-rapid
- lecto-rapid
- lingvanex-rapid
- nlp-rapid

## subscriptionKey

**Required** The subscription key to whichever API you are using.

## location

Required only if using Azure official provider. Use the region your service is deployed in. Ex: 'westus2'

## filePath

The path to a specific file to use as the input.
Ex: './src/Resources/Locales/en.json'
NOTE: Either `filePath` or `dirPath` is required.

## from

**Required** language the source values are in
Ex: 'en'

## to

**Required** CSV list of language codes to translate into.
Ex: 'cs,de,es'

## debug

Flag to print additional log lines to the console. NOTE: this will include all inputs including the subscription key.
Ex: false

## Outputs

none

## Example usage

```yml
translate-files:
    name: Translate localization files
    runs-on: ubuntu-latest
    steps:
        - name: 'Checkout repo'
          uses: actions/checkout@v2

        - name: Install localization package
          run: npm install -g i18n-auto-translation

        - name: Translate files
          id: translate
          uses: msnyder-msft/i18n-auto-translation-action@v1.0.0-alpha.7
          with:
              provider: 'azure-official'
              subscriptionKey: '${{ secrets.TRANSLATOR_SUBSCRIPTION_KEY }}'
              location: 'westus2'
              filePath: './src/Resources/Locales/en.json'
              from: 'en'
              to: 'cs,de,es'
              debug: false

        - name: Get current branch name
          id: branch_name
          run: echo ::set-output name=current_branch::${GITHUB_REF#refs/*/}

        - name: Commit changes
          uses: devops-infra/action-commit-push@master
          with:
              github_token: '${{ secrets.GITHUB_TOKEN }}'
              commit_prefix: '[Auto] '
              commit_message: 'Adding updated localization files'
              force: false
              target_branch: ${{steps.vars.branch_name.current_branch}}
```